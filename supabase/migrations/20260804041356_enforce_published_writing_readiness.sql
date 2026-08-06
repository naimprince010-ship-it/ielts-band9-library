BEGIN;

CREATE OR REPLACE FUNCTION public.is_writing_mock_production_ready(data jsonb)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path = ''
AS $$
  SELECT COALESCE((
    jsonb_typeof(data) = 'object'
    AND jsonb_typeof(data->'tasks') = 'array'
    AND jsonb_array_length(data->'tasks') = 2
    AND (
      SELECT count(*) = 2
      FROM jsonb_array_elements(data->'tasks') AS task
      WHERE NULLIF(btrim(task->>'prompt'), '') IS NOT NULL
    )
    AND EXISTS (
      SELECT 1
      FROM jsonb_array_elements(data->'tasks') WITH ORDINALITY AS entry(task, position)
      WHERE (entry.position = 1 OR task->>'taskNumber' = '1' OR task->>'taskType' = 'task1' OR task->>'task_type' = 'task1')
        AND (
          NULLIF(btrim(task->>'imageUrl'), '') IS NOT NULL
          OR NULLIF(btrim(task->>'image_url'), '') IS NOT NULL
          OR COALESCE(jsonb_typeof(task->'chartData') = 'object', false)
          OR COALESCE(jsonb_typeof(task->'chart_data') = 'object', false)
          OR COALESCE(jsonb_typeof(task->'tableData') = 'object', false)
          OR COALESCE(jsonb_typeof(task->'table_data') = 'object', false)
          OR COALESCE(jsonb_typeof(task->'processData') = 'object', false)
          OR COALESCE(jsonb_typeof(task->'process_data') = 'object', false)
          OR COALESCE(jsonb_typeof(task->'mapData') = 'object', false)
          OR COALESCE(jsonb_typeof(task->'map_data') = 'object', false)
        )
    )
  ), false);
$$;

REVOKE ALL ON FUNCTION public.is_writing_mock_production_ready(jsonb)
  FROM PUBLIC, anon, authenticated;

UPDATE public.mock_tests
SET is_published = false,
    updated_at = now()
WHERE module_type = 'writing'
  AND is_published = true
  AND NOT public.is_writing_mock_production_ready(test_data);

CREATE OR REPLACE FUNCTION public.enforce_published_writing_readiness()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.module_type = 'writing'
     AND NEW.is_published = true
     AND NOT public.is_writing_mock_production_ready(NEW.test_data) THEN
    RAISE EXCEPTION 'Published Writing tests require two prompted tasks and one renderable Task 1 visual.';
  END IF;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.enforce_published_writing_readiness()
  FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS enforce_published_writing_readiness ON public.mock_tests;
CREATE TRIGGER enforce_published_writing_readiness
BEFORE INSERT OR UPDATE OF module_type, test_data, is_published
ON public.mock_tests
FOR EACH ROW
EXECUTE FUNCTION public.enforce_published_writing_readiness();

COMMIT;
