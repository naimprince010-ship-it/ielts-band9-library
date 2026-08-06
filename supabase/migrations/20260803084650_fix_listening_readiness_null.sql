BEGIN;

CREATE OR REPLACE FUNCTION public.is_listening_mock_production_ready(data jsonb)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path = ''
AS $$
  SELECT COALESCE((
    jsonb_typeof(data) = 'object'
    AND jsonb_typeof(data->'sections') = 'array'
    AND jsonb_array_length(data->'sections') = 4
    AND (
      SELECT count(*) = 4
      FROM jsonb_array_elements(data->'sections') AS section
      WHERE jsonb_typeof(section->'questions') = 'array'
        AND jsonb_array_length(section->'questions') = 10
        AND NULLIF(btrim(section->>'transcript'), '') IS NOT NULL
    )
    AND (
      COALESCE(NULLIF(btrim(data->>'audioUrl'), '') ~ '^https://', false)
      OR (
        SELECT count(*) = 4
        FROM jsonb_array_elements(data->'sections') AS section
        WHERE COALESCE(NULLIF(btrim(section->>'sectionAudioUrl'), '') ~ '^https://', false)
      )
    )
    AND (
      SELECT count(*) = 40
      FROM jsonb_array_elements(data->'sections') AS section
      CROSS JOIN LATERAL jsonb_array_elements(section->'questions') AS question
      WHERE NULLIF(btrim(question->>'correctAnswer'), '') IS NOT NULL
    )
  ), false);
$$;

REVOKE ALL ON FUNCTION public.is_listening_mock_production_ready(jsonb)
  FROM PUBLIC, anon, authenticated;

UPDATE public.mock_tests
SET is_published = false,
    updated_at = now()
WHERE module_type = 'listening'
  AND is_published = true
  AND NOT public.is_listening_mock_production_ready(test_data);

COMMIT;
