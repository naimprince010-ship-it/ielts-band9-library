BEGIN;

CREATE OR REPLACE FUNCTION public.is_reading_mock_production_ready(data jsonb)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path = ''
AS $$
  SELECT COALESCE((
    jsonb_typeof(data) = 'object'
    AND jsonb_typeof(data->'passages') = 'array'
    AND jsonb_array_length(data->'passages') = 3
    AND (
      SELECT count(*) = 3
      FROM jsonb_array_elements(data->'passages') AS passage
      WHERE NULLIF(btrim(passage->>'textContent'), '') IS NOT NULL
        AND jsonb_typeof(passage->'questions') = 'array'
        AND jsonb_array_length(passage->'questions') > 0
    )
    AND (
      SELECT count(*) = 40
      FROM jsonb_array_elements(data->'passages') AS passage
      CROSS JOIN LATERAL jsonb_array_elements(passage->'questions') AS question
      WHERE NULLIF(btrim(question->>'correctAnswer'), '') IS NOT NULL
    )
  ), false);
$$;

REVOKE ALL ON FUNCTION public.is_reading_mock_production_ready(jsonb)
  FROM PUBLIC, anon, authenticated;

UPDATE public.mock_tests
SET is_published = false,
    updated_at = now()
WHERE module_type = 'reading'
  AND is_published = true
  AND NOT public.is_reading_mock_production_ready(test_data);

CREATE OR REPLACE FUNCTION public.enforce_published_reading_readiness()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.module_type = 'reading'
     AND NEW.is_published = true
     AND NOT public.is_reading_mock_production_ready(NEW.test_data) THEN
    RAISE EXCEPTION 'Published Reading tests require 3 passages, 40 questions, passage text, and correct answers.';
  END IF;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.enforce_published_reading_readiness()
  FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS enforce_published_reading_readiness ON public.mock_tests;
CREATE TRIGGER enforce_published_reading_readiness
BEFORE INSERT OR UPDATE OF module_type, test_data, is_published
ON public.mock_tests
FOR EACH ROW
EXECUTE FUNCTION public.enforce_published_reading_readiness();

COMMIT;
