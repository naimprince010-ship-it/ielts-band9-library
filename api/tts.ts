import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { checkRateLimit, LIMITS } from './_rateLimit.js';
import { cleanEnv } from './_env.js';

const GOOGLE_TTS_API_KEY = process.env.GOOGLE_TTS_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const CANONICAL_SUPABASE_URL = 'https://fjzqtzqflsqjevrurgbm.supabase.co';
const LEGACY_SUPABASE_PROJECT_REF = 'yzeiloqctrgpzuzkciiv';
const configuredSupabaseUrl = cleanEnv(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL);
const SUPABASE_URL = !configuredSupabaseUrl || configuredSupabaseUrl.includes(LEGACY_SUPABASE_PROJECT_REF)
  ? CANONICAL_SUPABASE_URL
  : configuredSupabaseUrl;
const SUPABASE_SERVICE_KEY = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);

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

  if (!SUPABASE_SERVICE_KEY) {
    return res.status(500).json({ error: 'TTS storage is not configured on the server.' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const token = authHeader.slice('Bearer '.length);
  const { data: { user }, error: authError } = await adminClient.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: 'Invalid token' });

  const { data: callerRow, error: callerError } = await adminClient
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();
  if (callerError || !callerRow || !['admin', 'instructor'].includes(callerRow.role)) {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const { data: audioBucket, error: bucketError } = await adminClient.storage.getBucket('audio');
  if (bucketError || !audioBucket) {
    return res.status(503).json({ error: 'Supabase Storage bucket "audio" is unavailable.' });
  }
  if (!audioBucket.public) {
    return res.status(503).json({ error: 'Supabase Storage bucket "audio" must be public for persisted mock-test audio URLs.' });
  }

  // TTS is admin-only heavy generation — allow up to 50 per hour per IP
  if (!checkRateLimit(req, res, LIMITS.tts, 'tts')) return;

  const { text, voice, languageCode = 'en-GB', provider } = req.body as TTSRequest;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid text field.' });
  }

  // OpenAI TTS hard limit: 4096 characters per request.
  if (text.length > 4096) {
    return res.status(400).json({
      error: `Text too long (${text.length} chars). Max 4096 chars per request. Split into sections.`,
    });
  }

  const useOpenAI = provider === 'openai' || (!GOOGLE_TTS_API_KEY && !!OPENAI_API_KEY);
  const useGoogle = provider === 'google' || (!!GOOGLE_TTS_API_KEY && !useOpenAI);

  if (!OPENAI_API_KEY && !GOOGLE_TTS_API_KEY) {
    return res.status(500).json({ error: 'No TTS API key configured on the server.' });
  }

  const effectiveVoice = voice || (useOpenAI ? 'alloy' : 'en-GB-Neural2-B');
  const cacheKey = generateCacheKey(text, effectiveVoice, languageCode);
  const audioFileName = `tts/${cacheKey}.mp3`;

  // ── Step 1: Cache check ──────────────────────────────────────────────────────
  if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
      const { data: existingFile, error: checkError } = await supabase.storage
        .from('audio')
        .createSignedUrl(audioFileName, 60);
      if (!checkError && existingFile?.signedUrl) {
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/audio/${audioFileName}`;
        return res.status(200).json({ audioUrl: publicUrl, cached: true });
      }
    } catch (cacheErr) {
      // Cache check failure is non-fatal — continue to generate
      console.warn('TTS cache check failed (non-fatal):', cacheErr);
    }
  }

  // ── Step 2: Generate audio ───────────────────────────────────────────────────
  let audioBuffer: Buffer;

  try {
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
        let details = '';
        try {
          const errJson = await openaiResponse.json();
          details = errJson?.error?.message || JSON.stringify(errJson);
        } catch {
          details = `HTTP ${openaiResponse.status}`;
        }
        console.error('OpenAI TTS Error:', details);
        return res.status(502).json({ error: 'OpenAI TTS failed', details });
      }

      const arrayBuffer = await openaiResponse.arrayBuffer();
      audioBuffer = Buffer.from(arrayBuffer);

    } else if (useGoogle && GOOGLE_TTS_API_KEY) {
      const ttsResponse = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_TTS_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text },
            voice: { languageCode, name: effectiveVoice },
            audioConfig: { audioEncoding: 'MP3', speakingRate: 0.9, pitch: 0 },
          }),
        }
      );

      if (!ttsResponse.ok) {
        const details = await ttsResponse.text().catch(() => `HTTP ${ttsResponse.status}`);
        console.error('Google TTS Error:', details);
        return res.status(502).json({ error: 'Google TTS failed', details });
      }

      const ttsData = await ttsResponse.json();
      audioBuffer = Buffer.from(ttsData.audioContent, 'base64');

    } else {
      return res.status(500).json({ error: 'No TTS provider available. Check server environment variables.' });
    }
  } catch (genErr) {
    const msg = genErr instanceof Error ? genErr.message : String(genErr);
    console.error('TTS generation exception:', msg);
    return res.status(500).json({ error: 'TTS generation failed', details: msg });
  }

  // ── Step 3: Upload to Supabase Storage ────────────────────────────────────────
  if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
      const { error: uploadError } = await supabase.storage
        .from('audio')
        .upload(audioFileName, audioBuffer, { contentType: 'audio/mpeg', upsert: true });

      if (uploadError) {
        console.warn('Supabase upload failed (non-fatal), returning base64:', uploadError.message);
      } else {
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/audio/${audioFileName}`;
        return res.status(200).json({ audioUrl: publicUrl, cached: false });
      }
    } catch (uploadErr) {
      console.warn('Supabase upload exception (non-fatal):', uploadErr);
    }
  }

  // ── Step 4: Fallback — return raw base64 if Supabase not configured or failed ─
  return res.status(503).json({
    error: 'Audio was generated but could not be persisted to Supabase Storage.',
    details: 'Verify the audio bucket and SUPABASE_SERVICE_ROLE_KEY configuration, then retry.',
  });
}

