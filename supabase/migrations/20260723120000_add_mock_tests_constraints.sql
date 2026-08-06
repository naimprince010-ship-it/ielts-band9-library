-- Add constraints to ensure mock_tests data integrity

BEGIN;

-- Fail with a clear message before changing constraints if legacy rows are invalid.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM public.mock_tests
    WHERE module_type IS NULL
       OR module_type NOT IN ('reading', 'listening', 'writing', 'speaking')
       OR test_data IS NULL
       OR jsonb_typeof(test_data) <> 'object'
       OR test_data = '{}'::jsonb
  ) THEN
    RAISE EXCEPTION 'mock_tests contains invalid legacy rows; repair module_type/test_data before applying this migration';
  END IF;
END
$$;

-- 1. Ensure module_type is strictly one of the 4 allowed values
ALTER TABLE public.mock_tests
  DROP CONSTRAINT IF EXISTS mock_tests_module_type_check;

ALTER TABLE public.mock_tests
  ADD CONSTRAINT mock_tests_module_type_check
  CHECK (module_type IN ('reading', 'listening', 'writing', 'speaking'));

-- 2. Ensure test_data is not empty and is a valid JSON object
ALTER TABLE public.mock_tests
  DROP CONSTRAINT IF EXISTS mock_tests_test_data_not_empty;

ALTER TABLE public.mock_tests
  ADD CONSTRAINT mock_tests_test_data_not_empty
  CHECK (
    test_data IS NOT NULL AND
    jsonb_typeof(test_data) = 'object' AND
    test_data != '{}'::jsonb
  );

COMMIT;
