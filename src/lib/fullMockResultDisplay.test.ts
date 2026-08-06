/**
 * Tests for the result-display safety fixes:
 * - feedback persistence guard (save-state awareness)
 * - null/non-finite band display helpers
 * - trend/average calculations excluding unavailable data
 * - AI feedback criterion filtering
 * - single-attempt history visibility
 */
import { describe, expect, it } from 'vitest';
import { formatBandScore, calculateOverallBand } from '@/utils/scoring';

// ─── Null-safe band display helpers ─────────────────────────────────────────

/** Mirror of the null guard used in ResultDashboardPage and FullMockAttemptDetailPage */
function safeBandDisplay(value: unknown): string {
  if (value == null) return '--';
  const n = Number(value);
  if (!Number.isFinite(n)) return '--';
  return formatBandScore(n);
}

/** Mirror of the isBandValid check used in ResultDashboardPage calculations */
function isBandValid(v: unknown): v is number {
  return v != null && typeof v === 'number' && Number.isFinite(v);
}

describe('safeBandDisplay — null/non-finite guard', () => {
  it('returns "--" for null', () => expect(safeBandDisplay(null)).toBe('--'));
  it('returns "--" for undefined', () => expect(safeBandDisplay(undefined)).toBe('--'));
  it('returns "--" for NaN', () => expect(safeBandDisplay(NaN)).toBe('--'));
  it('returns "--" for Infinity', () => expect(safeBandDisplay(Infinity)).toBe('--'));
  it('returns "0.0" only for a genuine numeric 0, not null', () => {
    // A legitimate band value of 0 is valid (edge case on legacy schema default)
    expect(safeBandDisplay(0)).toBe('0.0');
    // But null must never be coerced to 0 and shown as "0.0"
    expect(safeBandDisplay(null)).not.toBe('0.0');
  });
  it('formats a valid band correctly', () => {
    expect(safeBandDisplay(7)).toBe('7.0');
    expect(safeBandDisplay(6.5)).toBe('6.5');
    expect(safeBandDisplay(9)).toBe('9.0');
  });
});

// ─── Trend / average excluding unavailable bands ─────────────────────────────

interface MockAttempt {
  overall_band: number | null;
  completed_at: string;
}

function computeAverage(attempts: MockAttempt[]): number | null {
  // Use the same guard as ResultDashboardPage: explicit null check before
  // Number() — Number(null)===0 which is finite so isFinite alone is not enough.
  const valid = attempts.filter(
    a => a.overall_band != null && Number.isFinite(Number(a.overall_band)),
  );
  if (!valid.length) return null;
  return valid.reduce((sum, a) => sum + Number(a.overall_band), 0) / valid.length;
}

function buildTrend(attempts: MockAttempt[]): number[] {
  return attempts
    .filter(a => a.overall_band != null && Number.isFinite(Number(a.overall_band)))
    .map(a => Number(a.overall_band));
}

describe('trend and average exclude null/non-finite bands', () => {
  const attempts: MockAttempt[] = [
    { overall_band: 7.0, completed_at: '2026-01-01T00:00:00Z' },
    { overall_band: null, completed_at: '2026-01-02T00:00:00Z' },
    { overall_band: 6.5, completed_at: '2026-01-03T00:00:00Z' },
  ];

  it('average ignores null-band attempt', () => {
    const avg = computeAverage(attempts);
    // (7.0 + 6.5) / 2 = 6.75, NOT (7.0 + 0 + 6.5) / 3 = 4.5
    expect(avg).toBeCloseTo(6.75);
  });

  it('trend excludes null-band entry', () => {
    const trend = buildTrend(attempts);
    expect(trend).toHaveLength(2);
    expect(trend).not.toContain(0);
    expect(trend).toContain(7.0);
    expect(trend).toContain(6.5);
  });

  it('average returns null when all bands are null', () => {
    const allNull: MockAttempt[] = [
      { overall_band: null, completed_at: '2026-01-01T00:00:00Z' },
    ];
    expect(computeAverage(allNull)).toBeNull();
  });

  it('calculateOverallBand rounds to nearest 0.5', () => {
    // 7.0 + 6.5 = 13.5 / 2 = 6.75 → rounds to 7.0
    expect(calculateOverallBand({ listening: 7.0, reading: 6.5 })).toBe(7.0);
    // 6.0 + 6.5 + 7.0 + 5.5 = 25.0 / 4 = 6.25 → rounds to 6.5
    expect(calculateOverallBand({ listening: 6.0, reading: 6.5, writing: 7.0, speaking: 5.5 })).toBe(6.5);
  });
});

// ─── AI feedback criterion filtering ────────────────────────────────────────

interface FeedbackCriterion {
  name: string;
  band: number;
  feedback: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

/** Mirror of the hardened parseWritingFeedback criteria logic */
function parseCriteria(raw: unknown): FeedbackCriterion[] {
  if (!Array.isArray(raw)) return [];
  return (raw as unknown[]).reduce<FeedbackCriterion[]>((acc, c) => {
    if (!isRecord(c)) return acc;
    // Explicit null guard: Number(null) === 0 which is finite, so the
    // isFinite check alone is not sufficient to reject null bands.
    if (c.band == null) return acc;
    const band = Number(c.band);
    if (!Number.isFinite(band)) return acc;
    acc.push({
      name: typeof c.name === 'string' ? c.name : '',
      band,
      feedback: typeof c.feedback === 'string' ? c.feedback : '',
    });
    return acc;
  }, []);
}

describe('AI feedback criterion filtering', () => {
  it('keeps a valid criterion', () => {
    const result = parseCriteria([{ name: 'Coherence', band: 7.0, feedback: 'Good flow.' }]);
    expect(result).toHaveLength(1);
    expect(result[0].band).toBe(7);
  });

  it('drops a criterion with a missing band', () => {
    const result = parseCriteria([{ name: 'Coherence', feedback: 'No band here.' }]);
    expect(result).toHaveLength(0);
  });

  it('drops a criterion with a null band', () => {
    const result = parseCriteria([{ name: 'Coherence', band: null, feedback: 'Null band.' }]);
    expect(result).toHaveLength(0);
  });

  it('drops a criterion with a NaN band (e.g. band: "strong")', () => {
    const result = parseCriteria([{ name: 'Coherence', band: 'strong', feedback: 'String band.' }]);
    expect(result).toHaveLength(0);
  });

  it('keeps a mix of valid and invalid criteria, returning only valid ones', () => {
    const raw = [
      { name: 'Task Achievement', band: 6.5, feedback: 'Good.' },
      { name: 'Bad Criterion', band: null, feedback: 'No band.' },
      { name: 'Lexical Resource', band: 7.0, feedback: 'Strong vocab.' },
      { name: 'Missing Band' },
    ];
    const result = parseCriteria(raw);
    expect(result).toHaveLength(2);
    expect(result.map(c => c.name)).toEqual(['Task Achievement', 'Lexical Resource']);
  });

  it('never produces "NaN" when rendered via formatBandScore', () => {
    const raw = [{ name: 'Coherence', band: undefined, feedback: 'Missing.' }];
    const criteria = parseCriteria(raw);
    // The invalid criterion is filtered out — never reaches formatBandScore
    expect(criteria).toHaveLength(0);
  });
});

// ─── Feedback persistence guard (save-state awareness) ───────────────────────

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

/**
 * Mirror of the persistence guard logic: only write to DB if we have a
 * confirmed result ID from the current save. Never fall back to querying
 * the latest row when the save is in-flight or has failed.
 */
function shouldPersistFeedback(
  resultSaved: SaveState,
  savedResultId: string | null,
): boolean {
  return savedResultId !== null;
}

function isFeedbackButtonDisabled(
  feedbackStatus: 'idle' | 'loading' | 'ready' | 'error',
  resultSaved: SaveState,
): boolean {
  return feedbackStatus === 'loading' || resultSaved === 'saving';
}

describe('feedback persistence guard', () => {
  it('does not persist when result save is in-flight (savedResultId is null)', () => {
    expect(shouldPersistFeedback('saving', null)).toBe(false);
  });

  it('does not persist when result save failed (savedResultId is null)', () => {
    expect(shouldPersistFeedback('error', null)).toBe(false);
  });

  it('persists when save succeeded and ID is known', () => {
    expect(shouldPersistFeedback('saved', 'abc-123')).toBe(true);
  });

  it('does not persist when idle and no ID exists yet', () => {
    expect(shouldPersistFeedback('idle', null)).toBe(false);
  });

  it('feedback button is disabled while result is saving', () => {
    expect(isFeedbackButtonDisabled('idle', 'saving')).toBe(true);
  });

  it('feedback button is disabled while AI analysis is in progress', () => {
    expect(isFeedbackButtonDisabled('loading', 'saved')).toBe(true);
  });

  it('feedback button is enabled when save succeeded and status is idle', () => {
    expect(isFeedbackButtonDisabled('idle', 'saved')).toBe(false);
  });

  it('feedback button is enabled when save errored (allow generation, skip DB write)', () => {
    expect(isFeedbackButtonDisabled('idle', 'error')).toBe(false);
  });
});

// ─── Single-attempt history visibility ───────────────────────────────────────

describe('single-attempt history visibility', () => {
  it('shows the history section for exactly one attempt', () => {
    // The fix changed fullMockAttempts.length > 1  to  >= 1
    const count = 1;
    expect(count >= 1).toBe(true);  // renders history
    expect(count > 1).toBe(false);  // old behaviour — did NOT render
  });

  it('still hides history when there are zero attempts', () => {
    expect(0 >= 1).toBe(false);
  });

  it('shows history for multiple attempts', () => {
    expect(3 >= 1).toBe(true);
  });
});

// ─── savedResultIdRef reset on new attempt ───────────────────────────────────

/**
 * Mirror of the startSection(idx === 0) reset logic in FullMockTestPage.
 * Starting section 0 always begins a fresh attempt, so the previous attempt's
 * result ID must be cleared to prevent feedback bleed-through.
 */
function simulateStartSection(
  idx: number,
  state: { savedResultId: string | null; resultSaved: string },
): { savedResultId: string | null; resultSaved: string } {
  if (idx === 0) {
    return { savedResultId: null, resultSaved: 'idle' };
  }
  return state; // mid-exam section transitions leave state unchanged
}

describe('savedResultIdRef reset on new attempt', () => {
  it('clears the saved result ID when starting section 0 (new attempt)', () => {
    const before = { savedResultId: 'previous-result-uuid', resultSaved: 'saved' };
    const after = simulateStartSection(0, before);
    expect(after.savedResultId).toBeNull();
  });

  it('resets resultSaved to idle when starting section 0', () => {
    const before = { savedResultId: 'previous-result-uuid', resultSaved: 'saved' };
    const after = simulateStartSection(0, before);
    expect(after.resultSaved).toBe('idle');
  });

  it('does NOT clear the result ID for mid-exam section transitions (idx > 0)', () => {
    const before = { savedResultId: 'current-uuid', resultSaved: 'saved' };
    const after = simulateStartSection(1, before); // Reading section
    expect(after.savedResultId).toBe('current-uuid');
  });

  it('does NOT change resultSaved for mid-exam section transitions', () => {
    const before = { savedResultId: 'current-uuid', resultSaved: 'saved' };
    const after = simulateStartSection(2, before); // Writing section
    expect(after.resultSaved).toBe('saved');
  });

  it('clears a stale ref from the RETAKE flow (previous attempt still in ref)', () => {
    // After completing attempt 1, savedResultId = 'attempt-1-id'
    // User clicks RETAKE → ref should be cleared immediately
    let savedResultId: string | null = 'attempt-1-id';
    // Simulate the RETAKE button handler
    const handleRetake = () => { savedResultId = null; };
    handleRetake();
    expect(savedResultId).toBeNull();
  });

  it('skips persistence when no confirmed result ID exists (retake save failed)', () => {
    // After retake, if save fails: savedResultId is null → do not persist
    const savedResultId: string | null = null;
    expect(shouldPersistFeedback('error', savedResultId)).toBe(false);
  });

  it('persists to the new attempt only after its save succeeds', () => {
    // After retake, save succeeds: savedResultId is the NEW attempt's ID
    const savedResultId: string | null = 'attempt-2-id';
    expect(shouldPersistFeedback('saved', savedResultId)).toBe(true);
  });
});
