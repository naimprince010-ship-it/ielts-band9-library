import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const GOOGLE_TTS_API_KEY = process.env.GOOGLE_TTS_API_KEY;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

interface TTSRequest {
  text: string;
  voice?: string;
  languageCode?: string;
}

function generateCacheKey(text: string, voice: string, languageCode: string): string {
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256');
  hash.update(`${languageCode}|${voice}|${text}`);
  return hash.digest('hex').substring(0, 32);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!GOOGLE_TTS_API_KEY) {
    return res.status(500).json({ error: 'TTS API key not configured' });
  }

  const { text, voice = 'en-GB-Neural2-B', languageCode = 'en-GB' } = req.body as TTSRequest;

  if (!text || text.length > 5000) {
    return res.status(400).json({ error: 'Invalid text (max 5000 characters)' });
  }

  const cacheKey = generateCacheKey(text, voice, languageCode);
  const audioFileName = `tts/${cacheKey}.mp3`;

  try {
    if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
      
      const { data: existingFile } = await supabase.storage
        .from('audio')
        .createSignedUrl(audioFileName, 3600);

      if (existingFile?.signedUrl) {
        return res.status(200).json({ 
          audioUrl: existingFile.signedUrl,
          cached: true 
        });
      }
    }

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
            name: voice,
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
    const audioContent = ttsData.audioContent;

    if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
      const audioBuffer = Buffer.from(audioContent, 'base64');

      await supabase.storage
        .from('audio')
        .upload(audioFileName, audioBuffer, {
          contentType: 'audio/mpeg',
          upsert: true,
        });

      const { data: signedUrl } = await supabase.storage
        .from('audio')
        .createSignedUrl(audioFileName, 3600);

      if (signedUrl?.signedUrl) {
        return res.status(200).json({ 
          audioUrl: signedUrl.signedUrl,
          cached: false 
        });
      }
    }

    return res.status(200).json({ 
      audioContent,
      cached: false 
    });

  } catch (error) {
    console.error('TTS Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
