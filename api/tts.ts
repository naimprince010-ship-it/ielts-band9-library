import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { checkRateLimit, LIMITS } from './_rateLimit';

const GOOGLE_TTS_API_KEY = process.env.GOOGLE_TTS_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

interface TTSRequest {
  text: string;
  voice?: string;
  languageCode?: string;
  provider?: 'google' | 'openai';
}

function generateCacheKey(text: string, voice: string, languageCode: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(`${languageCode}|${voice}|${text}`);
  return hash.digest('hex').substring(0, 32);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!checkRateLimit(req, res, LIMITS.heavy, 'tts')) return;

  const { text, voice, languageCode = 'en-GB', provider } = req.body as TTSRequest;
  
  const useOpenAI = provider === 'openai' || (!GOOGLE_TTS_API_KEY && OPENAI_API_KEY);
  const useGoogle = provider === 'google' || (GOOGLE_TTS_API_KEY && !useOpenAI);
  
  if (!GOOGLE_TTS_API_KEY && !OPENAI_API_KEY) {
    return res.status(500).json({ error: 'No TTS API key configured. Please add GOOGLE_TTS_API_KEY or OPENAI_API_KEY to your environment variables.' });
  }
  
  const effectiveVoice = voice || (useOpenAI ? 'alloy' : 'en-GB-Neural2-B');

  // OpenAI TTS hard limit: 4096 characters per request.
  // Admin now generates audio per section (each section stays well under 4096 chars).
  if (!text || text.length > 4096) {
    return res.status(400).json({
      error: `Text too long (${text?.length ?? 0} chars). Max 4096 chars per request. Split into sections.`,
    });
  }

  const cacheKey = generateCacheKey(text, effectiveVoice, languageCode);
  const audioFileName = `tts/${cacheKey}.mp3`;

  try {
    if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
      
      // Check if file already exists by trying to get its public URL metadata
      const { data: existingFile } = await supabase.storage
        .from('audio')
        .list('tts', { search: `${cacheKey}.mp3` });

      if (existingFile && existingFile.length > 0) {
        // Use permanent public URL instead of signed URL (which expires after 1 hour)
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/audio/${audioFileName}`;
        return res.status(200).json({ 
          audioUrl: publicUrl,
          cached: true 
        });
      }
    }

    let audioBuffer: Buffer;
    
    if (useOpenAI && OPENAI_API_KEY) {
      const openaiResponse = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'tts-1',
          input: text,
          voice: effectiveVoice,
          response_format: 'mp3',
          speed: 0.9,
        }),
      });

      if (!openaiResponse.ok) {
        const errorData = await openaiResponse.json().catch(() => ({}));
        console.error('OpenAI TTS Error:', errorData);
        return res.status(500).json({ error: 'TTS generation failed', details: errorData.error?.message });
      }

      const arrayBuffer = await openaiResponse.arrayBuffer();
      audioBuffer = Buffer.from(arrayBuffer);
    } else if (useGoogle && GOOGLE_TTS_API_KEY) {
      const ttsResponse = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_TTS_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: { text },
            voice: {
              languageCode,
              name: effectiveVoice,
            },
            audioConfig: {
              audioEncoding: 'MP3',
              speakingRate: 0.9,
              pitch: 0,
            },
          }),
        }
      );

      if (!ttsResponse.ok) {
        const errorData = await ttsResponse.json();
        console.error('Google TTS Error:', errorData);
        return res.status(500).json({ error: 'TTS generation failed' });
      }

      const ttsData = await ttsResponse.json();
      audioBuffer = Buffer.from(ttsData.audioContent, 'base64');
    } else {
      return res.status(500).json({ error: 'No TTS provider available' });
    }

    if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

      await supabase.storage
        .from('audio')
        .upload(audioFileName, audioBuffer, {
          contentType: 'audio/mpeg',
          upsert: true,
        });

      // Use permanent public URL — no expiry, works for all users
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/audio/${audioFileName}`;
      return res.status(200).json({ 
        audioUrl: publicUrl,
        cached: false 
      });
    }

    return res.status(200).json({ 
      audioContent: audioBuffer.toString('base64'),
      cached: false 
    });

  } catch (error) {
    console.error('TTS Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
