import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from './button';
import { unlockIOSAudio, toBlobUrl, createAudioElement } from '@/lib/iosAudio';

interface SpeakButtonProps {
  text: string;
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  useProfessionalTTS?: boolean;
}

const audioCache = new Map<string, string>();

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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window || useProfessionalTTS);
  }, [useProfessionalTTS]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
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
    window.speechSynthesis.speak(utterance);
  }, [text]);

  const speakWithProfessionalTTS = useCallback(async () => {
    try {
      setIsLoading(true);

      // Check cache first
      const cachedUrl = audioCache.get(text);
      if (cachedUrl) {
        const audio = createAudioElement(cachedUrl);
        audioRef.current = audio;
        audio.onplay = () => { setIsLoading(false); setIsSpeaking(true); };
        audio.onended = () => setIsSpeaking(false);
        audio.onerror = () => { setIsSpeaking(false); setIsLoading(false); };
        await audio.play();
        return;
      }

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'en-GB-Neural2-B', languageCode: 'en-GB' }),
      });

      if (!response.ok) throw new Error('TTS API failed');

      const data = await response.json();

      let audioUrl: string;
      if (data.audioContent) {
        // Base64 → blob URL (works everywhere, including iOS)
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
          { type: 'audio/mpeg' }
        );
        audioUrl = URL.createObjectURL(audioBlob);
      } else if (data.audioUrl) {
        // Fetch external URL as blob so iOS Safari can stream it reliably
        audioUrl = await toBlobUrl(data.audioUrl);
      } else {
        throw new Error('No audio data received');
      }

      audioCache.set(text, audioUrl);

      const audio = createAudioElement(audioUrl);
      audioRef.current = audio;
      audio.onplay = () => { setIsLoading(false); setIsSpeaking(true); };
      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => {
        setIsSpeaking(false);
        setIsLoading(false);
        speakWithWebSpeechAPI();
      };
      await audio.play();

    } catch {
      setIsLoading(false);
      speakWithWebSpeechAPI();
    }
  }, [text, speakWithWebSpeechAPI]);

  const handleSpeak = useCallback(() => {
    // iOS audio session unlock — must happen synchronously in the click handler
    unlockIOSAudio();

    if (isSpeaking) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }

    if (useProfessionalTTS) {
      speakWithProfessionalTTS();
    } else {
      speakWithWebSpeechAPI();
    }
  }, [isSpeaking, useProfessionalTTS, speakWithProfessionalTTS, speakWithWebSpeechAPI]);

  if (!isSupported) return null;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSpeak}
      disabled={isLoading}
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
