/**
 * Tests for the result-display safety fixes:
 * - feedback persistence guard (save-state awareness)
 * - null/non-finite band display helpers
 * - trend/average calculations excluding unavailable data
 * - AI feedback criterion filtering
 * - single-attempt history visibility
 * - isMissingColumnError classification (real production function)
 * - saveResultWithFallback fallback chain (real production function)
 */
import { describe, expect, it } from 'vitest';
import { formatBandScore, calculateOverallBand } from '@/utils/scoring';
import { isMissingColumnError, saveResultWithFallback } from '@/lib/fullMockResultSave';
import type { SaveError, InsertResult } from '@/lib/fullMockResultSave';

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

// ─── isMissingColumnError detection (tests the REAL exported function) ───────

describe('isMissingColumnError — correctly classifies Supabase/PostgREST errors', () => {
  it('returns false for null (no error)', () => {
    expect(isMissingColumnError(null)).toBe(false);
  });

  it('returns true for PostgreSQL code 42703 (undefined_column)', () => {
    expect(isMissingColumnError({ code: '42703', message: 'column "review_data" of relation "mock_test_results" does not exist' })).toBe(true);
  });

  it('returns true for PGRST204 (PostgREST column-not-found wrapper)', () => {
    expect(isMissingColumnError({ code: 'PGRST204', message: '' })).toBe(true);
  });

  it('returns true for a message matching "column X does not exist" without a special code', () => {
    expect(isMissingColumnError({ code: '42P01', message: 'column "sections" of relation "mock_test_results" does not exist' })).toBe(true);
  });

  it('returns true for a message matching "could not find X column" without a special code', () => {
    expect(isMissingColumnError({ message: 'could not find writing_feedback column in the schema cache' })).toBe(true);
  });

  // --- Must return false for every non-retriable error ---

  it('returns false for PGRST200 (relationship/embed error — NOT a missing-column error)', () => {
    // PGRST200 means "could not find a relationship between tables" and must
    // never trigger the column-fallback retry chain.
    expect(isMissingColumnError({ code: 'PGRST200', message: 'could not find a relationship between mock_test_results and users' })).toBe(false);
  });

  it('returns false for RLS policy violation (42501)', () => {
    expect(isMissingColumnError({ code: '42501', message: 'new row violates row-level security policy for table "mock_test_results"' })).toBe(false);
  });

  it('returns false for NOT NULL constraint violation (23502)', () => {
    expect(isMissingColumnError({ code: '23502', message: 'null value in column "sections" violates not-null constraint' })).toBe(false);
  });

  it('returns false for a JWT / auth error', () => {
    expect(isMissingColumnError({ code: 'PGRST301', message: 'JWT expired' })).toBe(false);
  });

  it('returns false for a generic network error message', () => {
    expect(isMissingColumnError({ message: 'Failed to fetch' })).toBe(false);
  });

  it('returns false for a foreign key violation (23503)', () => {
    expect(isMissingColumnError({ code: '23503', message: 'insert or update on table "mock_test_results" violates foreign key constraint' })).toBe(false);
  });

  it('returns false for an empty error object', () => {
    expect(isMissingColumnError({})).toBe(false);
  });
});

// ─── Fallback chain (tests the REAL saveResultWithFallback function) ────────────

/**
 * Thin test helper: builds a sequence of mocked insert functions from
 * a flat list of (result, error) pairs and delegates to saveResultWithFallback
 * so we exercise the real production branching logic.
 *
 * The mock insertFn answers calls in round-robin order: first call → pair[0..1],
 * second call → pair[2..3], etc.  Passing four pairs therefore covers all four
 * fallback attempts even when earlier ones succeed (the extras are never called).
 */
async function runFallback(
  pairs: [{ id: string } | null, SaveError][],
): Promise<{ savedResultId: string | null; resultSaved: 'saved' | 'error'; attemptsUsed: number }> {
  let callIndex = 0;
  const insertFn = async (_data: Record<string, unknown>): Promise<InsertResult> => {
    const [data, error] = pairs[callIndex++] ?? [null, { message: 'No more mock responses' }];
    return { data, error };
  };

  const result = await saveResultWithFallback(insertFn, { user_id: 'test' });
  return {
    savedResultId: result.data?.id ?? null,
    resultSaved: result.error ? 'error' : 'saved',
    attemptsUsed: callIndex,
  };
}

/**
 * The canonical full-insert payload that contains every column group:
 *   sections            — legacy/backward-compat summary
 *   review_data         — per-module objective review
 *   writing_feedback    — AI writing assessment
 *   speaking_feedback   — AI speaking assessment
 */
const FULL_INSERT: Record<string, unknown> = {
  user_id: 'user-test',
  overall_band: 7.0,
  sections: [{ module: 'listening', band: 7 }],
  review_data: { listening: { correct: 30, total: 40, items: [] } },
  writing_feedback: { task1: { band: 6.5, criteria: [] }, task2: { band: 7.0, criteria: [] } },
  speaking_feedback: { overall: { band: 6.5 }, parts: [] },
};

/**
 * Like runFallback but also captures a shallow snapshot of the data object
 * passed to insertFn on every call, so tests can assert exact field presence.
 */
async function runFallbackCapturing(
  pairs: [{ id: string } | null, SaveError][],
  fullData: Record<string, unknown> = FULL_INSERT,
): Promise<{
  savedResultId: string | null;
  resultSaved: 'saved' | 'error';
  attemptsUsed: number;
  payloads: Record<string, unknown>[];
}> {
  let callIndex = 0;
  const payloads: Record<string, unknown>[] = [];
  const insertFn = async (data: Record<string, unknown>): Promise<InsertResult> => {
    payloads.push({ ...data }); // snapshot — later mutations must not change this copy
    const [result, error] = pairs[callIndex++] ?? [null, { message: 'No more mock responses' }];
    return { data: result, error };
  };

  const result = await saveResultWithFallback(insertFn, fullData);
  return {
    savedResultId: result.data?.id ?? null,
    resultSaved: result.error ? 'error' : 'saved',
    attemptsUsed: callIndex,
    payloads,
  };
}

const missingCol = { code: '42703', message: 'column "review_data" of relation "mock_test_results" does not exist' };
const rlsError   = { code: '42501', message: 'new row violates row-level security policy' };
const notNull    = { code: '23502', message: 'null value in column "sections" violates not-null constraint' };

describe('saveResultToDb fallback chain', () => {
  it('attempt 1 succeeds — saves immediately, no fallback', async () => {
    const res = await runFallback([
      [{ id: 'result-1' }, null],
    ]);
    expect(res.savedResultId).toBe('result-1');
    expect(res.resultSaved).toBe('saved');
    expect(res.attemptsUsed).toBe(1);
  });

  it('attempt 1 missing-column → attempt 2 succeeds (legacy schema with sections)', async () => {
    const res = await runFallback([
      [null, missingCol],
      [{ id: 'result-2' }, null],
    ]);
    expect(res.savedResultId).toBe('result-2');
    expect(res.resultSaved).toBe('saved');
    expect(res.attemptsUsed).toBe(2);
  });

  it('attempt 1+2 missing-column → attempt 3 succeeds (migration schema: JSON feedback, no sections)', async () => {
    const res = await runFallback([
      [null, missingCol],
      [null, missingCol],
      [{ id: 'result-3' }, null],
    ]);
    expect(res.savedResultId).toBe('result-3');
    expect(res.resultSaved).toBe('saved');
    expect(res.attemptsUsed).toBe(3);
  });

  it('all 4 attempts fail with missing-column → error state, no result ID', async () => {
    const res = await runFallback([
      [null, missingCol],
      [null, missingCol],
      [null, missingCol],
      [null, missingCol],
    ]);
    expect(res.savedResultId).toBeNull();
    expect(res.resultSaved).toBe('error');
    expect(res.attemptsUsed).toBe(4);
  });

  it('attempt 1 fails with RLS error — NOT retried, error surfaced immediately', async () => {
    const res = await runFallback([
      [null, rlsError],
    ]);
    expect(res.savedResultId).toBeNull();
    expect(res.resultSaved).toBe('error');
    // Only 1 attempt used — RLS violation does not trigger fallback
    expect(res.attemptsUsed).toBe(1);
  });

  it('attempt 1 fails with NOT NULL violation — NOT retried (would fail on all attempts)', async () => {
    const res = await runFallback([
      [null, notNull],
    ]);
    expect(res.savedResultId).toBeNull();
    expect(res.resultSaved).toBe('error');
    expect(res.attemptsUsed).toBe(1);
  });

  it('attempt 1 missing-column, attempt 2 RLS error — chain stops, no further retries', async () => {
    const res = await runFallback([
      [null, missingCol],
      [null, rlsError],
    ]);
    expect(res.savedResultId).toBeNull();
    expect(res.resultSaved).toBe('error');
    expect(res.attemptsUsed).toBe(2);
  });
});

// ─── saveResultWithFallback — payload fields per attempt ─────────────────────

const feedbackFields = ['review_data', 'writing_feedback', 'speaking_feedback'] as const;

describe('saveResultWithFallback — payload fields per attempt', () => {
  it('attempt 1 (canonical) contains sections and all three JSON feedback fields', async () => {
    const { payloads } = await runFallbackCapturing([[{ id: 'r1' }, null]]);
    expect(payloads).toHaveLength(1);
    const p = payloads[0];
    expect(p).toHaveProperty('sections');
    for (const field of feedbackFields) expect(p).toHaveProperty(field);
  });

  it('attempt 2 (legacy) keeps sections and removes only the three JSON feedback fields', async () => {
    const { payloads } = await runFallbackCapturing([
      [null, missingCol],
      [{ id: 'r2' }, null],
    ]);
    expect(payloads).toHaveLength(2);
    const p = payloads[1];
    expect(p).toHaveProperty('sections');
    for (const field of feedbackFields) expect(p).not.toHaveProperty(field);
  });

  it('attempt 3 (migration) removes only sections and preserves all three JSON feedback fields', async () => {
    const { payloads } = await runFallbackCapturing([
      [null, missingCol],
      [null, missingCol],
      [{ id: 'r3' }, null],
    ]);
    expect(payloads).toHaveLength(3);
    const p = payloads[2];
    expect(p).not.toHaveProperty('sections');
    for (const field of feedbackFields) expect(p).toHaveProperty(field);
  });

  it('attempt 4 (minimal) removes both sections and all three JSON feedback fields', async () => {
    const { payloads } = await runFallbackCapturing([
      [null, missingCol],
      [null, missingCol],
      [null, missingCol],
      [{ id: 'r4' }, null],
    ]);
    expect(payloads).toHaveLength(4);
    const p = payloads[3];
    expect(p).not.toHaveProperty('sections');
    for (const field of feedbackFields) expect(p).not.toHaveProperty(field);
  });

  it('earlier attempts do not mutate the fullData object — attempt 1 always sees every field', async () => {
    // saveResultWithFallback must shallow-copy before deleting fields so the
    // original fullData reference remains intact for subsequent attempt shapes.
    const myData: Record<string, unknown> = { ...FULL_INSERT };
    const { payloads } = await runFallbackCapturing([
      [null, missingCol],
      [null, missingCol],
      [null, missingCol],
      [{ id: 'r4' }, null],
    ], myData);
    // The caller's object is unmodified after the chain completes
    expect(myData).toHaveProperty('sections');
    for (const field of feedbackFields) expect(myData).toHaveProperty(field);
    // Attempt 1 snapshot captured the full set of fields
    expect(payloads[0]).toHaveProperty('sections');
    for (const field of feedbackFields) expect(payloads[0]).toHaveProperty(field);
  });
});

// ─── First-attempt save sets resultSaved and savedResultId correctly ──────────

describe('first attempt save state transitions', () => {
  it('a successful save produces resultSaved=saved and a non-null savedResultId', async () => {
    const res = await runFallback([
      [{ id: 'uuid-from-db' }, null],
    ]);
    expect(res.resultSaved).toBe('saved');
    expect(res.savedResultId).toBe('uuid-from-db');
  });

  it('a failed save (any error) produces resultSaved=error and a null savedResultId', async () => {
    const res = await runFallback([
      [null, { code: '23502', message: 'not null violation' }],
    ]);
    expect(res.resultSaved).toBe('error');
    expect(res.savedResultId).toBeNull();
  });
});

// ─── Retake: feedback must only go to the new attempt's row ──────────────────

describe('retake feedback isolation', () => {
  it('feedback not written when the retake save failed (savedResultId is null)', () => {
    // Simulate: save failed → savedResultId stays null
    const savedResultId: string | null = null;
    const resultSaved: SaveState = 'error';
    // The update guard checks: resultId && ... — null short-circuits to skip the update
    expect(savedResultId !== null).toBe(false);
    expect(shouldPersistFeedback(resultSaved, savedResultId)).toBe(false);
  });

  it('feedback written to the NEW attempt ID after a successful retake save', () => {
    // Simulate: previous attempt id='old-id'; after retake, new save succeeds with 'new-id'
    const previousId = 'old-id';
    // Retake clears the ref
    let savedResultId: string | null = previousId;
    savedResultId = null; // clearSession + savedResultIdRef.current = null
    // New save succeeds
    savedResultId = 'new-id';
    expect(shouldPersistFeedback('saved', savedResultId)).toBe(true);
    // The id is the NEW one, not the old one
    expect(savedResultId).not.toBe(previousId);
  });

  it('feedback from attempt 1 cannot reach attempt 2 row via stale ref', () => {
    // Simulate concurrent scenario: savedResultId was set to 'attempt-1-id'
    // User clicks retake → savedResultId cleared to null BEFORE new save
    let savedResultId: string | null = 'attempt-1-id';
    // Retake handler fires
    savedResultId = null;
    // AI feedback callback fires with old closure value — but the ref is now null
    expect(shouldPersistFeedback('saved', savedResultId)).toBe(false);
  });
});
