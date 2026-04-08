/**
 * iOS Safari Audio Utilities
 *
 * iOS Safari problems solved here:
 *   1. Hardware mute switch silences HTMLAudioElement — fixed by routing
 *      audio through AudioContext (createMediaElementSource).
 *   2. async audio.play() blocked outside user-gesture — fixed by calling
 *      play() synchronously AND/OR using AudioContext (which persists after
 *      first user-gesture resume).
 *   3. Supabase streaming/range-request issues — fixed by pre-fetching as
 *      blob URL before the tap, so play() gets a same-origin blob.
 *
 * Strategy per use-case:
 *   FullMockTestPage (long MP3s, streaming):
 *     - Pre-fetch as blob URL in background when listening phase starts
 *     - On tap: unlockIOSAudio() sync → play blob URL sync
 *     - createAudioElement() routes through AudioContext via MediaElementSource
 *       so mute switch is bypassed regardless of whether it's blob or direct URL
 *
 *   SpeakButton (short vocabulary TTS clips):
 *     - unlockIOSAudio() sync on tap
 *     - Fetch from /api/tts, decode with decodeAudioData, play via AudioContext
 *     - No user-gesture lock since AudioContext already running
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
 * Once done, AudioContext-based playback works from async code too.
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
 * Blob URLs bypass iOS streaming / range-request issues AND allow
 * createMediaElementSource to work without CORS headers.
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
 * Works on iOS even when called from async code — no user-gesture lock needed
 * after unlockIOSAudio() has been called at least once.
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

// ── HTMLAudioElement factory (with AudioContext routing) ──────────────────────
/**
 * Create an <audio> element configured for iOS playback.
 *
 * Key enhancement: connect the element to the shared AudioContext via
 * createMediaElementSource(). This routes audio through the AudioContext
 * output, which runs in "playback" session mode and bypasses the iOS
 * hardware mute switch — the same mechanism used by music apps.
 *
 * Requirements:
 *   - unlockIOSAudio() must have been called (synchronously) in the same
 *     user-gesture handler before play() is invoked.
 *   - For non-blob URLs, the server must send CORS headers (Supabase public
 *     storage does this by default).  Blob URLs are always same-origin.
 */
export function createAudioElement(url: string): HTMLAudioElement {
  const audio = new Audio();

  // crossOrigin must be set BEFORE src for non-blob URLs so the browser
  // sends the CORS preflight/request and the AudioContext can decode it.
  const isBlob = url.startsWith('blob:') || url.startsWith('data:');
  if (!isBlob) audio.crossOrigin = 'anonymous';

  audio.src = url;
  audio.volume = 1;
  audio.preload = 'auto';
  audio.setAttribute('playsinline', '');
  audio.setAttribute('webkit-playsinline', '');
  (audio as HTMLAudioElement & { playsInline: boolean }).playsInline = true;

  // Route through AudioContext so iOS mute switch is bypassed.
  try {
    const ctx = getAudioContext();
    if (ctx && ctx.state !== 'closed') {
      const source = ctx.createMediaElementSource(audio);
      source.connect(ctx.destination);
    }
  } catch {
    // createMediaElementSource can throw if the element is already connected
    // or if the context is closed; audio will still play through default output.
  }

  return audio;
}
