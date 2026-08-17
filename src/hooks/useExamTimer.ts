import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Format a countdown in total seconds to MM:SS or H:MM:SS.
 * Pure utility — safe to test without a DOM.
 */
export function formatTimerDisplay(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

interface UseExamTimerOptions {
  /** Starting duration in seconds. */
  initialSeconds: number;
  /** Seconds remaining at which `warning` becomes true. Default: 300 (5 min). */
  warningThreshold?: number;
  /** Called once when the timer reaches 0. Stable ref — safe to pass inline. */
  onExpire?: () => void;
}

interface UseExamTimerResult {
  /** Current remaining seconds. */
  seconds: number;
  /** Formatted string ready for display (MM:SS or H:MM:SS). */
  display: string;
  /** True when remaining time is below `warningThreshold`. */
  warning: boolean;
  /** True when the timer has reached 0. */
  expired: boolean;
  /** Pause the countdown. */
  stop: () => void;
  /** Resume the countdown (also called internally on mount). */
  start: () => void;
  /** Reset seconds to `initialSeconds` and stop the timer. */
  reset: () => void;
}

/**
 * Reusable countdown timer for exam modules.
 *
 * The timer starts automatically on mount. Call `stop()` before navigating
 * away or when the exam is submitted to prevent stale callbacks.
 */
export function useExamTimer({
  initialSeconds,
  warningThreshold = 300,
  onExpire,
}: UseExamTimerOptions): UseExamTimerResult {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(true);

  // Keep a stable ref to onExpire so callers can pass inline arrow functions
  // without triggering the timer useEffect on every render.
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds(prev => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(id);
          setRunning(false);
          // Defer so React state updates (isSubmitted etc.) don't race the callback.
          setTimeout(() => onExpireRef.current?.(), 0);
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const stop = useCallback(() => setRunning(false), []);
  const start = useCallback(() => setRunning(true), []);
  const reset = useCallback(() => {
    setRunning(false);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  return {
    seconds,
    display: formatTimerDisplay(seconds),
    warning: seconds > 0 && seconds <= warningThreshold,
    expired: seconds === 0,
    stop,
    start,
    reset,
  };
}
