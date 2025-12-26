import { useCallback, useRef } from 'react';

const STORAGE_KEY = 'ielts_sound_enabled';

export function useSoundEffects() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const isSoundEnabled = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored !== 'false';
    } catch {
      return true;
    }
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(enabled));
    } catch {
      // Ignore storage errors
    }
  }, []);

  const playSound = useCallback((type: 'correct' | 'incorrect' | 'complete') => {
    if (!isSoundEnabled()) return;
    
    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const audio = new Audio();
      audioRef.current = audio;
      
      // Use Web Audio API for better sound generation
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      if (type === 'correct') {
        // Happy ascending tone
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
      } else if (type === 'incorrect') {
        // Descending tone
        oscillator.frequency.setValueAtTime(349.23, audioContext.currentTime); // F4
        oscillator.frequency.setValueAtTime(293.66, audioContext.currentTime + 0.15); // D4
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } else if (type === 'complete') {
        // Victory fanfare
        const playNote = (freq: number, startTime: number, duration: number) => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.frequency.setValueAtTime(freq, audioContext.currentTime + startTime);
          gain.gain.setValueAtTime(0.2, audioContext.currentTime + startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + startTime + duration);
          osc.start(audioContext.currentTime + startTime);
          osc.stop(audioContext.currentTime + startTime + duration);
        };
        
        playNote(523.25, 0, 0.15);    // C5
        playNote(659.25, 0.15, 0.15); // E5
        playNote(783.99, 0.3, 0.15);  // G5
        playNote(1046.5, 0.45, 0.4);  // C6
      }
    } catch (e) {
      console.log('Sound playback not supported');
    }
  }, [isSoundEnabled]);

  const playCorrect = useCallback(() => playSound('correct'), [playSound]);
  const playIncorrect = useCallback(() => playSound('incorrect'), [playSound]);
  const playComplete = useCallback(() => playSound('complete'), [playSound]);

  return {
    playCorrect,
    playIncorrect,
    playComplete,
    isSoundEnabled,
    setSoundEnabled,
  };
}
