import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit, LIMITS } from './_rateLimit.js';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface TranscribeSpeakingRequest {
  audioBase64?: string;
  audioUrl?: string;
  mimeType?: string;
  fileName?: string;
}

function extensionForMime(mimeType: string): string {
  if (mimeType.includes('mp4') || mimeType.includes('m4a')) return 'm4a';
  if (mimeType.includes('ogg')) return 'ogg';
  if (mimeType.includes('wav')) return 'wav';
  return 'webm';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!checkRateLimit(req, res, LIMITS.heavy, 'transcribe-speaking')) return;

  if (!OPENAI_API_KEY) {
    return res.status(500).json({
      success: false,
      error: 'OPENAI_API_KEY is not configured.',
      hint: 'Add OPENAI_API_KEY in Vercel environment variables.',
    });
  }

  try {
    const body = typeof req.body === 'string'
      ? JSON.parse(req.body || '{}') as TranscribeSpeakingRequest
      : (req.body || {}) as TranscribeSpeakingRequest;

    const mimeType = body.mimeType || 'audio/webm';
    let bytes: Uint8Array | null = null;

    if (body.audioBase64) {
      bytes = Buffer.from(body.audioBase64, 'base64');
    } else if (body.audioUrl) {
      const audioResponse = await fetch(body.audioUrl);
      if (!audioResponse.ok) {
        return res.status(400).json({ success: false, error: 'Could not fetch uploaded audio for transcription.' });
      }
      bytes = new Uint8Array(await audioResponse.arrayBuffer());
    }

    if (!bytes || bytes.byteLength === 0) {
      return res.status(400).json({ success: false, error: 'No audio was provided for transcription.' });
    }

    const fileName = body.fileName || `speaking.${extensionForMime(mimeType)}`;
    const form = new FormData();
    form.append('model', 'gpt-4o-mini-transcribe');
    form.append('language', 'en');
    form.append('file', new Blob([bytes], { type: mimeType }), fileName);

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: form,
    });

    const responseText = await response.text();
    if (!response.ok) {
      let message = `OpenAI transcription error: ${response.status}`;
      try {
        const parsed = JSON.parse(responseText);
        message = parsed.error?.message || message;
      } catch {
        message = responseText.slice(0, 200) || message;
      }
      return res.status(500).json({ success: false, error: message });
    }

    const data = JSON.parse(responseText);
    return res.status(200).json({ success: true, transcript: data.text || '' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to transcribe speaking audio.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
