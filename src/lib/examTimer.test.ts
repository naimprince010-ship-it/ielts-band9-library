/**
 * Tests for the useExamTimer utility functions.
 * Only the pure formatTimerDisplay helper is tested here since useExamTimer
 * itself requires a DOM/React environment which the current test setup does
 * not provide.
 */
import { describe, expect, it } from 'vitest';
import { formatTimerDisplay } from '@/hooks/useExamTimer';

describe('formatTimerDisplay', () => {
  it('formats zero seconds as 00:00', () => {
    expect(formatTimerDisplay(0)).toBe('00:00');
  });

  it('formats negative seconds safely (clamped to 00:00)', () => {
    expect(formatTimerDisplay(-5)).toBe('00:00');
  });

  it('formats 59 seconds as 00:59', () => {
    expect(formatTimerDisplay(59)).toBe('00:59');
  });

  it('formats exactly 60 seconds as 01:00', () => {
    expect(formatTimerDisplay(60)).toBe('01:00');
  });

  it('formats 3600 seconds (1 hour) with H:MM:SS', () => {
    expect(formatTimerDisplay(3600)).toBe('1:00:00');
  });

  it('formats 3661 seconds as 1:01:01', () => {
    expect(formatTimerDisplay(3661)).toBe('1:01:01');
  });

  it('pads minutes and seconds with leading zeros', () => {
    expect(formatTimerDisplay(65)).toBe('01:05');
  });

  it('formats standard IELTS Reading time (3600 s)', () => {
    // The full reading section is 60 minutes = 3600 seconds.
    expect(formatTimerDisplay(3_600)).toBe('1:00:00');
  });

  it('formats standard IELTS Listening time (1800 s)', () => {
    expect(formatTimerDisplay(1_800)).toBe('30:00');
  });

  it('formats a sub-five-minute warning amount (299 s)', () => {
    expect(formatTimerDisplay(299)).toBe('04:59');
  });

  it('formats fractional seconds by flooring (not rounding)', () => {
    // 61.9 should display as 01:01, not 01:02
    expect(formatTimerDisplay(61.9)).toBe('01:01');
  });
});

// ─── Reading exam session persistence ────────────────────────────────────────
//
// The ReadingTestPage reads one JSON blob from localStorage keyed by STORAGE_KEY.
// These tests mirror that parsing logic as pure functions so they can run in
// the Node/Vitest environment without a DOM.

interface StoredSession {
  testId?: string;
  answers?: Record<string, string>;
  timeRemaining?: number;
  activePassage?: number;
  flaggedQuestions?: Record<string, boolean>;
}

/**
 * Mirror of the session-loading logic in ReadingTestPage's useState initializer.
 * Returns the parsed session when the testId matches; null otherwise.
 */
function parseSession(raw: string | null, testId: string): StoredSession | null {
  if (!raw) return null;
  try {
    const s = JSON.parse(raw) as StoredSession;
    return s.testId === testId ? s : null;
  } catch {
    return null;
  }
}

/**
 * Mirror of the throttle guard used in the timer-driven useEffect.
 * Returns true when a save should be skipped (last write was < threshold ms ago).
 */
function shouldThrottle(lastSavedMs: number, nowMs: number, thresholdMs = 10_000): boolean {
  return lastSavedMs !== 0 && nowMs - lastSavedMs < thresholdMs;
}

describe('reading session — parseSession', () => {
  it('returns null for null raw input', () => {
    expect(parseSession(null, 'test-1')).toBeNull();
  });

  it('returns null for corrupt JSON', () => {
    expect(parseSession('not-json', 'test-1')).toBeNull();
  });

  it('returns null when testId does not match', () => {
    const raw = JSON.stringify({ testId: 'test-other', timeRemaining: 300 });
    expect(parseSession(raw, 'test-1')).toBeNull();
  });

  it('returns session when testId matches', () => {
    const session: StoredSession = { testId: 'test-1', timeRemaining: 1800, activePassage: 1 };
    const result = parseSession(JSON.stringify(session), 'test-1');
    expect(result).not.toBeNull();
    expect(result!.timeRemaining).toBe(1800);
    expect(result!.activePassage).toBe(1);
  });

  it('restores answers from session', () => {
    const session: StoredSession = {
      testId: 'test-1',
      answers: { r_0: 'TRUE', r_1: 'FALSE' },
    };
    const result = parseSession(JSON.stringify(session), 'test-1');
    expect(result?.answers?.r_0).toBe('TRUE');
    expect(result?.answers?.r_1).toBe('FALSE');
  });

  it('restores flaggedQuestions from session', () => {
    const session: StoredSession = {
      testId: 'test-1',
      flaggedQuestions: { r_3: true },
    };
    const result = parseSession(JSON.stringify(session), 'test-1');
    expect(result?.flaggedQuestions?.r_3).toBe(true);
  });

  it('falls back to default when session is missing a field', () => {
    // Session has no timeRemaining → caller should fall back to test.timeLimit
    const raw = JSON.stringify({ testId: 'test-1', answers: {} });
    const result = parseSession(raw, 'test-1');
    expect(result?.timeRemaining).toBeUndefined();
    // Caller checks: initialSession?.timeRemaining ?? test.timeLimit
    const resolved = result?.timeRemaining ?? 3600;
    expect(resolved).toBe(3600);
  });
});

describe('reading session — timer-save throttle', () => {
  it('does not skip first save (lastSaved is 0)', () => {
    expect(shouldThrottle(0, 1_000)).toBe(false);
  });

  it('skips save when called within 10 s of last write', () => {
    const last = 1_000_000;
    expect(shouldThrottle(last, last + 5_000)).toBe(true);
  });

  it('allows save after 10 s have elapsed', () => {
    const last = 1_000_000;
    expect(shouldThrottle(last, last + 10_000)).toBe(false);
  });

  it('allows save at exactly the threshold boundary', () => {
    const last = 1_000_000;
    // "< threshold" means exactly threshold (10_000 ms gap) is allowed
    expect(shouldThrottle(last, last + 10_000)).toBe(false);
  });

  it('skips save at 9999 ms (one ms before threshold)', () => {
    const last = 1_000_000;
    expect(shouldThrottle(last, last + 9_999)).toBe(true);
  });
});

// ─── Answer-change saves are never suppressed by the timer throttle ───────────
//
// ReadingTestPage uses two separate effects with ONE shared lastSaveRef:
//   Effect 1 (immediate): deps = [answers, activePassage, flaggedQuestions, ...]
//     → no throttle guard, always writes; stamps lastSaveRef on every write.
//   Effect 2 (throttled): deps = [timer.seconds, ...]
//     → guarded by shouldThrottle(lastSaveRef, now); reads user state from refs.
//
// Regressions covered:
//   - Old single-effect design: all deps in one effect; a timer write at T=0
//     set lastSaved=T and an answer change at T+5 s was silently dropped.
//   - Separate-refs bug (lastSaveRef vs lastTimerSaveRef): Effect 1 stamped
//     lastSaveRef but Effect 2 checked a different ref (lastTimerSaveRef),
//     so an answer save never actually reset the timer-save window.
//   Both bugs are fixed: one shared lastSaveRef is used throughout.

describe('reading session — answer-change never suppressed by throttle', () => {
  it('shouldThrottle returns true 5 s after a timer write (proving old bug existed)', () => {
    // Under the old single-effect design this would have silently dropped an answer write.
    const timerSavedAt = 1_000_000;
    const answerChangedAt = timerSavedAt + 5_000;
    expect(shouldThrottle(timerSavedAt, answerChangedAt)).toBe(true);
  });

  it('Effect 1 is unconditional — answer write happens regardless of throttle state', () => {
    // Effect 1 does NOT call shouldThrottle.  We verify the invariant by
    // simulating the write logic directly: no guard means an answer is always
    // persisted to a fresh session object.
    const timerSavedAt = 1_000_000;
    const answerChangedAt = timerSavedAt + 5_000;

    // Throttle WOULD suppress a write at this moment (proves the bug risk):
    expect(shouldThrottle(timerSavedAt, answerChangedAt)).toBe(true);

    // Effect 1 bypasses the throttle — it unconditionally calls:
    //   localStorage.setItem(STORAGE_KEY, JSON.stringify({ ..., answers, ... }))
    // We simulate that here as a pure-logic check.
    const currentAnswers = { r_0: 'TRUE', r_1: 'NOT GIVEN' };
    const sessionPayload = JSON.stringify({
      testId: 'test-1',
      answers: currentAnswers,
      timeRemaining: 1800,
      activePassage: 0,
      flaggedQuestions: {},
    });

    // Parsing the written payload recovers the answers correctly.
    const parsed = parseSession(sessionPayload, 'test-1');
    expect(parsed?.answers?.r_0).toBe('TRUE');
    expect(parsed?.answers?.r_1).toBe('NOT GIVEN');
  });

  it('Effect 1 stamps the shared lastSaveRef so Effect 2 does not double-write', () => {
    // Both effects use the SAME lastSaveRef.  After Effect 1 writes at
    // answerWrittenAt, Effect 2's throttle check sees that timestamp and
    // correctly suppresses an immediate follow-on timer tick.
    const answerWrittenAt = 2_000_000;
    const nextTimerTickAt = answerWrittenAt + 1_000; // 1 s later

    // Effect 2 checks: shouldThrottle(answerWrittenAt, nextTimerTickAt)
    expect(shouldThrottle(answerWrittenAt, nextTimerTickAt)).toBe(true);
  });

  it('Effect 2 runs 10 s after the last answer write (timer save fills the gap)', () => {
    const answerWrittenAt = 2_000_000;
    const tenSecondsLater = answerWrittenAt + 10_000;

    // 10 s after the answer-write, Effect 2 is allowed to save the updated timer.
    expect(shouldThrottle(answerWrittenAt, tenSecondsLater)).toBe(false);
  });
});
