import type { VercelRequest, VercelResponse } from '@vercel/node';

export interface RateLimitOptions {
  max: number;
  windowSec: number;
  label?: string;
}

export const LIMITS = {
  heavy: { max: 20, windowSec: 3600, label: 'AI generation' },
  tts:   { max: 60, windowSec: 3600, label: 'TTS generation' },
  medium:{ max: 30, windowSec: 3600, label: 'AI request' },
  light: { max: 60, windowSec: 3600, label: 'request' },
  batch: { max: 5,  windowSec: 3600, label: 'batch AI job' },
};

// Simple per-instance store — no module-level side effects
const _store: Record<string, number[]> = {};

export function checkRateLimit(
  req: VercelRequest,
  res: VercelResponse,
  opts: RateLimitOptions,
  keySuffix = '',
): boolean {
  try {
    const fwd = req.headers['x-forwarded-for'];
    const ip = (Array.isArray(fwd) ? fwd[0] : fwd ?? '').split(',')[0].trim() || 'unknown';
    const key = `${ip}::${keySuffix || opts.label || 'default'}`;
    const now = Date.now();
    const windowMs = opts.windowSec * 1000;

    if (!_store[key]) _store[key] = [];
    _store[key] = _store[key].filter(t => t > now - windowMs);

    res.setHeader('X-RateLimit-Limit', opts.max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, opts.max - _store[key].length - 1));

    if (_store[key].length >= opts.max) {
      const retryAfter = Math.ceil((_store[key][0] + windowMs - now) / 1000);
      res.setHeader('Retry-After', retryAfter);
      res.status(429).json({ error: `Rate limit exceeded. Try again in ${Math.ceil(retryAfter / 60)} min.` });
      return false;
    }

    _store[key].push(now);
    return true;
  } catch {
    // Never block a request due to rate-limiter bugs
    return true;
  }
}
