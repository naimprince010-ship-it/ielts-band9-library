-- Keep the public package claim aligned with the currently available text-based lessons.
-- This can be upgraded to prerecorded video lessons after video fields, players, and assets ship.
UPDATE public.courses
SET
  description = 'A complete hybrid IELTS program combining 24 structured self-paced lessons with weekly live support, guided practice, and limited individual feedback.',
  features = jsonb_set(
    COALESCE(features, '[]'::jsonb),
    '{0}',
    to_jsonb('24 Structured Self-Paced Lessons'::text),
    true
  ),
  updated_at = now()
WHERE id = 'ielts-masterclass';
