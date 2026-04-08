import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Sliding-window in-memory rate limiter for Vercel serverless functions.
 *
 * NOTE: Each serverless instance has its own Map, so limits are per-instance,
 * not globally across all instances. This still provides strong protection
 * against single-client abuse (a single IP hitting the same warm instance).
 * For global enforcement, replace the store with Upstash Redis.
 */

interface WindowEntry {
  timestamps: number[];
}

const store = new Map<string, WindowEntry>();

// Lazy cleanup: prune stale entries on each request instead of using
// setInterval (setInterval at module level can cause issues in serverless
// environments like Vercel where the runtime may not support long-lived timers).
let lastCleanup = Date.now();
function maybePruneStore(): void {
  const now = Date.now();
  if (now - lastCleanup < 5 * 60 * 1000) return;
  lastCleanup = now;
  const cutoff = now - 60 * 60 * 1000;
  for (const [key, entry] of store.entries()) {
    entry.timestamps = entry.timestamps.filter(t => t > cutoff);
    if (entry.timestamps.length === 0) store.delete(key);
  }
}

export interface RateLimitOptions {
  /** Max requests allowed in the window */
  max: number;
  /** Window size in seconds */
  windowSec: number;
  /** Human-readable label for error messages */
  label?: string;
}

/**
 * Preset limits for different endpoint classes.
 */
export const LIMITS = {
  /** Heavy AI generation (IELTS content) */
  heavy: { max: 20, windowSec: 60 * 60, label: 'AI generation' },
  /** TTS audio generation — admin generates 4+ sections per test */
  tts: { max: 60, windowSec: 60 * 60, label: 'TTS generation' },
  /** Medium AI calls (vocabulary generation, design audit) */
  medium: { max: 30, windowSec: 60 * 60, label: 'AI request' },
  /** Light calls (topic suggestions, synonym check) */
  light: { max: 60, windowSec: 60 * 60, label: 'request' },
  /** Batch enrichment / categorization — very expensive */
  batch: { max: 5, windowSec: 60 * 60, label: 'batch AI job' },
} satisfies Record<string, RateLimitOptions>;

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  if (Array.isArray(forwarded)) return forwarded[0].trim();
  return (req.socket?.remoteAddress) ?? 'unknown';
}

/**
 * Check rate limit. Returns `true` if the request is allowed, `false` if blocked.
 * When blocked, it automatically sends a 429 response.
 *
 * Usage:
 * ```ts
 * if (!checkRateLimit(req, res, LIMITS.heavy)) return;
 * ```
 */
export function checkRateLimit(
  req: VercelRequest,
  res: VercelResponse,
  opts: RateLimitOptions,
  /** Optional extra key suffix (e.g. endpoint name) to namespace limits */
  keySuffix = '',
): boolean {
  maybePruneStore();
  const ip = getClientIp(req);
  const key = `${ip}::${keySuffix || opts.label ?? 'default'}`;
  const now = Date.now();
  const windowMs = opts.windowSec * 1000;
  const cutoff = now - windowMs;

  let entry = store.get(key);
  if (!entry) {
    entry = { timestamps: [] };
    store.set(key, entry);
  }

  // Remove timestamps outside the window
  entry.timestamps = entry.timestamps.filter(t => t > cutoff);

  const remaining = opts.max - entry.timestamps.length;
  const resetAt = entry.timestamps.length > 0
    ? Math.ceil((entry.timestamps[0] + windowMs) / 1000)
    : Math.ceil((now + windowMs) / 1000);

  res.setHeader('X-RateLimit-Limit', opts.max);
  res.setHeader('X-RateLimit-Remaining', Math.max(0, remaining - 1));
  res.setHeader('X-RateLimit-Reset', resetAt);

  if (entry.timestamps.length >= opts.max) {
    const retryAfter = Math.ceil((entry.timestamps[0] + windowMs - now) / 1000);
    res.setHeader('Retry-After', retryAfter);
    res.status(429).json({
      error: `Too many requests. You have exceeded the ${opts.label ?? ''} rate limit (${opts.max} per ${opts.windowSec / 60} min). Please try again in ${Math.ceil(retryAfter / 60)} minute(s).`,
      retryAfterSeconds: retryAfter,
    });
    return false;
  }

  entry.timestamps.push(now);
  return true;
}
