/**
 * iOS Safari Audio Utilities
 *
 * Core iOS Safari constraint:
 *   HTMLAudioElement.play() MUST be called synchronously inside a user-gesture
 *   handler (onClick). Any async gap (fetch, await, Promise.then) breaks the
 *   association and iOS silently blocks the play.
 *
 * Strategy:
 *   1. FullMockTestPage (long MP3s): pre-fetch all section audio as blob URLs
 *      BEFORE the user taps — then play() is called synchronously with a blob URL.
 *   2. SpeakButton (short words): use AudioContext.decodeAudioData() which plays
 *      via AudioContext and does NOT require user-gesture context after the
 *      AudioContext has been resumed once.
 */

// ── Persistent AudioContext ────────────────────────────────────────────────────
type W = Window & { webkitAudioContext?: typeof AudioContext };
let _ctx: AudioContext | null = null;

export function getAudioContext(): AudioContext | null {
  try {
    const Ctor = window.AudioContext ?? (window as W).webkitAudioContext;
    if (!Ctor) return null;
    if (!_ctx || _ctx.state === 'closed') _ctx = new Ctor();
    return _ctx;
  } catch {
    return null;
  }
}

/**
 * Resume the AudioContext and play a 1-sample silent buffer.
 * MUST be called synchronously inside a user-gesture handler.
 * Once called, AudioContext-based playback works even from async code.
 */
export function unlockIOSAudio(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(() => undefined);
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
  } catch {
    // Non-critical
  }
}

// ── Blob URL pre-fetch (for FullMockTestPage) ─────────────────────────────────
/**
 * Fetch an audio URL and return a same-origin blob URL.
 * Blob URLs bypass iOS streaming/range-request issues.
 * Falls back to the original URL on network error.
 */
export async function toBlobUrl(url: string): Promise<string> {
  if (url.startsWith('blob:') || url.startsWith('data:')) return url;
  try {
    const res = await fetch(url, { cache: 'force-cache' });
    if (!res.ok) return url;
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch {
    return url;
  }
}

// ── AudioContext-based playback (for SpeakButton / short clips) ───────────────
export interface AudioHandle {
  stop: () => void;
  onended: (() => void) | null;
}

/**
 * Fetch audio from URL, decode with AudioContext, and play.
 * Works on iOS even when called from async code — no user-gesture lock.
 * Requires unlockIOSAudio() to have been called at least once first.
 */
export async function playWithAudioContext(
  url: string,
  onEnd?: () => void,
): Promise<AudioHandle | null> {
  try {
    const ctx = getAudioContext();
    if (!ctx) return null;
    if (ctx.state === 'suspended') await ctx.resume();

    const resp = await fetch(url);
    if (!resp.ok) return null;
    const arrayBuf = await resp.arrayBuffer();
    const audioBuf = await ctx.decodeAudioData(arrayBuf);

    const src = ctx.createBufferSource();
    src.buffer = audioBuf;
    src.connect(ctx.destination);
    let _onended: (() => void) | null = onEnd ?? null;
    src.onended = () => { _onended?.(); };
    src.start(0);

    return {
      stop: () => { try { src.stop(); } catch { /* already stopped */ } },
      get onended() { return _onended; },
      set onended(fn) { _onended = fn; },
    };
  } catch {
    return null;
  }
}

// ── HTMLAudioElement factory ──────────────────────────────────────────────────
/**
 * Create an <audio> element configured for iOS playback.
 * play() MUST still be called synchronously from a user-gesture handler.
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
