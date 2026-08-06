BEGIN;

CREATE OR REPLACE FUNCTION public.is_listening_mock_production_ready(data jsonb)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path = ''
AS $$
  SELECT
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
      NULLIF(btrim(data->>'audioUrl'), '') ~ '^https://'
      OR (
        SELECT count(*) = 4
        FROM jsonb_array_elements(data->'sections') AS section
        WHERE NULLIF(btrim(section->>'sectionAudioUrl'), '') ~ '^https://'
      )
    )
    AND (
      SELECT count(*) = 40
      FROM jsonb_array_elements(data->'sections') AS section
      CROSS JOIN LATERAL jsonb_array_elements(section->'questions') AS question
      WHERE NULLIF(btrim(question->>'correctAnswer'), '') IS NOT NULL
    );
$$;

REVOKE ALL ON FUNCTION public.is_listening_mock_production_ready(jsonb) FROM PUBLIC, anon, authenticated;

-- Existing partial or audio-less rows must not remain visible as production tests.
UPDATE public.mock_tests
SET is_published = false,
    updated_at = now()
WHERE module_type = 'listening'
  AND is_published = true
  AND NOT public.is_listening_mock_production_ready(test_data);

CREATE OR REPLACE FUNCTION public.enforce_published_listening_readiness()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.module_type = 'listening'
     AND NEW.is_published = true
     AND NOT public.is_listening_mock_production_ready(NEW.test_data) THEN
    RAISE EXCEPTION 'Published Listening tests require 4 sections, 10 questions per section, transcripts, correct answers, and persistent HTTPS audio.';
  END IF;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.enforce_published_listening_readiness() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS enforce_published_listening_readiness ON public.mock_tests;
CREATE TRIGGER enforce_published_listening_readiness
BEFORE INSERT OR UPDATE OF module_type, test_data, is_published
ON public.mock_tests
FOR EACH ROW
EXECUTE FUNCTION public.enforce_published_listening_readiness();

COMMIT;
