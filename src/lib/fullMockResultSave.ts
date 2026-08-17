/**
 * Helpers for persisting full mock test results to Supabase with a multi-attempt
 * fallback chain that handles schema variations across production deployments.
 *
 * Keeping this logic in a standalone module lets tests import and exercise the
 * real production functions rather than maintaining mirror copies.
 */

export type SaveError = { code?: string; message?: string } | null;
export type InsertResult = { data: { id: string } | null; error: SaveError };
export type InsertAttemptFn = (data: Record<string, unknown>) => Promise<InsertResult>;

/**
 * Returns true only when PostgREST / Postgres reports that a *column is absent*
 * from the schema — the one case where retrying with fewer fields is safe.
 *
 * Deliberately narrow so that every other error (RLS policy violations,
 * NOT-NULL constraint violations, auth failures, network errors, etc.) is
 * treated as fatal and surfaced immediately to the caller.
 *
 * Error taxonomy:
 *   42703    – PostgreSQL SQLSTATE for "undefined_column" (column does not exist)
 *   PGRST204 – Supabase/PostgREST can surface this for column-not-found
 *
 * PGRST200 is intentionally excluded: it means "could not find a relationship
 * between tables" (a schema-cache embedding error) which is unrelated to a
 * missing column and must NOT trigger a retry.
 */
export function isMissingColumnError(e: SaveError): boolean {
  if (!e) return false;
  if (e.code === '42703' || e.code === 'PGRST204') return true;
  const msg = e.message ?? '';
  return (
    /column .+ does not exist/i.test(msg) ||
    /could not find .+ column/i.test(msg)
  );
}

/**
 * Executes up to four insert attempts against mock_test_results, each with
 * progressively fewer columns, stopping as soon as one succeeds or a
 * non-missing-column error occurs.
 *
 * Attempt 1 – canonical new schema: all columns including review_data,
 *             writing_feedback, speaking_feedback, sections.
 * Attempt 2 – legacy schema with sections but without JSON-feedback columns.
 * Attempt 3 – migration schema: JSON-feedback columns present, no sections.
 * Attempt 4 – minimal schema: neither sections nor JSON-feedback columns.
 *
 * A non-missing-column error at any attempt is returned immediately so that
 * auth failures, RLS violations, and constraint errors are never hidden.
 */
export async function saveResultWithFallback(
  insertFn: InsertAttemptFn,
  fullData: Record<string, unknown>,
): Promise<InsertResult> {
  // Attempt 1 — full canonical (all known columns)
  let result = await insertFn(fullData);
  if (!isMissingColumnError(result.error)) return result;

  // Attempt 2 — legacy (sections present, JSON feedback columns absent)
  const legacyData: Record<string, unknown> = { ...fullData };
  delete legacyData.review_data;
  delete legacyData.writing_feedback;
  delete legacyData.speaking_feedback;
  result = await insertFn(legacyData);
  if (!isMissingColumnError(result.error)) return result;

  // Attempt 3 — migration (JSON feedback columns present, sections absent)
  const migrationData: Record<string, unknown> = { ...fullData };
  delete migrationData.sections;
  result = await insertFn(migrationData);
  if (!isMissingColumnError(result.error)) return result;

  // Attempt 4 — minimal (neither sections nor JSON feedback columns)
  const minimalData: Record<string, unknown> = { ...legacyData };
  delete minimalData.sections;
  return insertFn(minimalData);
}
