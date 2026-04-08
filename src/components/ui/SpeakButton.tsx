import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from './button';
import { unlockIOSAudio, getAudioContext, playWithAudioContext } from '@/lib/iosAudio';

interface SpeakButtonProps {
  text: string;
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  useProfessionalTTS?: boolean;
}

// Cache audio data by text → base64 or URL (avoid re-fetching the same word)
const audioCache = new Map<string, { type: 'base64'; data: string } | { type: 'url'; data: string }>();

export function SpeakButton({ 
  text, 
  className,
  variant = 'ghost',
  size = 'icon',
  useProfessionalTTS = true
}: SpeakButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window || useProfessionalTTS);
  }, [useProfessionalTTS]);

  useEffect(() => {
    return () => { stopRef.current?.(); };
  }, []);

  const speakWithWebSpeechAPI = useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.lang = 'en-GB';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    stopRef.current = () => window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [text]);

  /**
   * Play audio via AudioContext (decodeAudioData).
   * This approach works on iOS even when called asynchronously, because the
   * AudioContext was already resumed synchronously in handleSpeak (user gesture).
   */
  const playViaAudioContext = useCallback(async (url: string): Promise<boolean> => {
    const ctx = getAudioContext();
    if (!ctx) return false;
    try {
      if (ctx.state === 'suspended') await ctx.resume();
      const resp = await fetch(url);
      if (!resp.ok) return false;
      const arrayBuf = await resp.arrayBuffer();
      const audioBuf = await ctx.decodeAudioData(arrayBuf);
      const src = ctx.createBufferSource();
      src.buffer = audioBuf;
      src.connect(ctx.destination);
      src.onended = () => { setIsSpeaking(false); setIsLoading(false); };
      src.start(0);
      stopRef.current = () => { try { src.stop(); } catch { /* already stopped */ } };
      setIsLoading(false);
      setIsSpeaking(true);
      return true;
    } catch {
      return false;
    }
  }, []);

  const speakWithProfessionalTTS = useCallback(async () => {
    try {
      setIsLoading(true);

      const cached = audioCache.get(text);

      if (cached?.type === 'url') {
        const ok = await playViaAudioContext(cached.data);
        if (ok) return;
      }

      if (cached?.type === 'base64') {
        // Base64 → blob URL → AudioContext
        const bytes = Uint8Array.from(atob(cached.data), c => c.charCodeAt(0));
        const blob = new Blob([bytes], { type: 'audio/mpeg' });
        const blobUrl = URL.createObjectURL(blob);
        const ok = await playViaAudioContext(blobUrl);
        URL.revokeObjectURL(blobUrl);
        if (ok) return;
      }

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'en-GB-Neural2-B', languageCode: 'en-GB' }),
      });

      if (!response.ok) throw new Error('TTS API failed');
      const data = await response.json();

      if (data.audioContent) {
        // Base64 MP3 — decode directly via AudioContext
        audioCache.set(text, { type: 'base64', data: data.audioContent });
        const bytes = Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0));
        const blob = new Blob([bytes], { type: 'audio/mpeg' });
        const blobUrl = URL.createObjectURL(blob);
        const ok = await playViaAudioContext(blobUrl);
        URL.revokeObjectURL(blobUrl);
        if (ok) return;
        throw new Error('AudioContext playback failed');
      }

      if (data.audioUrl) {
        audioCache.set(text, { type: 'url', data: data.audioUrl });
        const handle = await playWithAudioContext(data.audioUrl, () => {
          setIsSpeaking(false);
          setIsLoading(false);
        });
        if (handle) {
          stopRef.current = handle.stop;
          setIsLoading(false);
          setIsSpeaking(true);
          return;
        }
        throw new Error('AudioContext playback failed');
      }

      throw new Error('No audio data received');
    } catch {
      setIsLoading(false);
      speakWithWebSpeechAPI();
    }
  }, [text, speakWithWebSpeechAPI, playViaAudioContext]);

  const handleSpeak = useCallback(() => {
    // MUST be synchronous — this unlocks iOS audio session for subsequent
    // async AudioContext playback calls.
    unlockIOSAudio();

    if (isSpeaking || isLoading) {
      stopRef.current?.();
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      setIsLoading(false);
      return;
    }

    if (useProfessionalTTS) {
      speakWithProfessionalTTS();
    } else {
      speakWithWebSpeechAPI();
    }
  }, [isSpeaking, isLoading, useProfessionalTTS, speakWithProfessionalTTS, speakWithWebSpeechAPI]);

  if (!isSupported) return null;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSpeak}
      disabled={false}
      className={cn(
        "transition-colors",
        isSpeaking && "text-indigo-600",
        isLoading && "opacity-70",
        className
      )}
      title={isLoading ? "Loading audio..." : isSpeaking ? "Stop speaking" : "Listen to pronunciation"}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isSpeaking ? (
        <VolumeX className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </Button>
  );
}
