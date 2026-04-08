/**
 * iOS Safari Audio Utilities
 *
 * Problems this solves:
 * 1. Silent/mute switch — iOS HTML5 Audio respects the hardware mute switch
 *    by default. Playing a 1-sample AudioContext buffer "unlocks" the audio
 *    session and switches iOS into playback mode (bypasses mute switch).
 * 2. Supabase / external URLs not streaming on iOS Safari — iOS requires HTTP
 *    206 Partial Content (range requests) for audio streaming. Some CDN/storage
 *    configs don't support this. Fetching the full file as a Blob and creating a
 *    local object URL sidesteps the issue completely.
 */

let _unlocked = false;

/**
 * Unlock iOS audio session. MUST be called inside a synchronous user-gesture
 * handler (onClick). Safe to call multiple times.
 */
export function unlockIOSAudio(): void {
  if (_unlocked) return;
  try {
    type W = Window & { webkitAudioContext?: typeof AudioContext };
    const Ctx = window.AudioContext ?? (window as W).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
    ctx.resume().catch(() => undefined);
    _unlocked = true;
  } catch {
    // Non-critical
  }
}

/**
 * Fetch an audio URL and return a same-origin blob URL.
 * Blob URLs bypass iOS Safari's streaming/range-request requirements and
 * play reliably even from cross-origin sources.
 *
 * Falls back to the original URL if fetch fails.
 */
export async function toBlobUrl(url: string): Promise<string> {
  // blob: or data: URLs are already local — nothing to do
  if (url.startsWith('blob:') || url.startsWith('data:')) return url;
  try {
    const res = await fetch(url, { cache: 'force-cache' });
    if (!res.ok) return url;
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch {
    return url; // silently fall back to direct URL
  }
}

/**
 * Create an HTMLAudioElement configured for reliable iOS playback.
 */
export function createAudioElement(url: string): HTMLAudioElement {
  const audio = new Audio(url);
  audio.volume = 1;
  audio.preload = 'auto';
  audio.setAttribute('playsinline', '');
  audio.setAttribute('webkit-playsinline', '');
  (audio as HTMLAudioElement & { playsInline: boolean }).playsInline = true;
  return audio;
}
