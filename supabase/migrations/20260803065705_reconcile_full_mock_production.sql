BEGIN;

-- Keep authorization helpers outside the exposed public schema.
CREATE SCHEMA IF NOT EXISTS app_private;
REVOKE ALL ON SCHEMA app_private FROM PUBLIC, anon;
GRANT USAGE ON SCHEMA app_private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION app_private.is_staff()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.users
      WHERE id = auth.uid()
        AND role IN ('admin', 'instructor')
    );
$$;

REVOKE ALL ON FUNCTION app_private.is_staff() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION app_private.is_staff() TO authenticated, service_role;

-- Bring the legacy result table up to the shape used by FullMockTestPage.
ALTER TABLE public.mock_test_results
  ADD COLUMN IF NOT EXISTS overall_band numeric(3,1),
  ADD COLUMN IF NOT EXISTS listening_band numeric(3,1),
  ADD COLUMN IF NOT EXISTS reading_band numeric(3,1),
  ADD COLUMN IF NOT EXISTS writing_band numeric(3,1),
  ADD COLUMN IF NOT EXISTS speaking_band numeric(3,1),
  ADD COLUMN IF NOT EXISTS listening_test_id uuid REFERENCES public.mock_tests(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS reading_test_id uuid REFERENCES public.mock_tests(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS writing_test_id uuid REFERENCES public.mock_tests(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS speaking_test_id uuid REFERENCES public.mock_tests(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS review_data jsonb,
  ADD COLUMN IF NOT EXISTS writing_feedback jsonb,
  ADD COLUMN IF NOT EXISTS speaking_feedback jsonb;

CREATE INDEX IF NOT EXISTS idx_mock_test_results_user_completed
  ON public.mock_test_results (user_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_mock_test_results_user_listening
  ON public.mock_test_results (user_id, listening_test_id)
  WHERE listening_test_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_mock_test_results_user_reading
  ON public.mock_test_results (user_id, reading_test_id)
  WHERE reading_test_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_mock_test_results_user_writing
  ON public.mock_test_results (user_id, writing_test_id)
  WHERE writing_test_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_mock_test_results_user_speaking
  ON public.mock_test_results (user_id, speaking_test_id)
  WHERE speaking_test_id IS NOT NULL;

DROP POLICY IF EXISTS "Users can update own mock results" ON public.mock_test_results;
CREATE POLICY "Users can update own mock results"
  ON public.mock_test_results FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Replace broad authenticated write access with staff-only management.
DROP POLICY IF EXISTS "Authenticated users can insert mock tests" ON public.mock_tests;
DROP POLICY IF EXISTS "Authenticated users can update mock tests" ON public.mock_tests;
DROP POLICY IF EXISTS "Authenticated users can delete mock tests" ON public.mock_tests;
DROP POLICY IF EXISTS "Authenticated users can read all mock tests" ON public.mock_tests;

DROP POLICY IF EXISTS "Staff can read all mock tests" ON public.mock_tests;
CREATE POLICY "Staff can read all mock tests"
  ON public.mock_tests FOR SELECT TO authenticated
  USING (app_private.is_staff());

DROP POLICY IF EXISTS "Staff can insert mock tests" ON public.mock_tests;
CREATE POLICY "Staff can insert mock tests"
  ON public.mock_tests FOR INSERT TO authenticated
  WITH CHECK (app_private.is_staff());

DROP POLICY IF EXISTS "Staff can update mock tests" ON public.mock_tests;
CREATE POLICY "Staff can update mock tests"
  ON public.mock_tests FOR UPDATE TO authenticated
  USING (app_private.is_staff())
  WITH CHECK (app_private.is_staff());

DROP POLICY IF EXISTS "Staff can delete mock tests" ON public.mock_tests;
CREATE POLICY "Staff can delete mock tests"
  ON public.mock_tests FOR DELETE TO authenticated
  USING (app_private.is_staff());

DROP POLICY IF EXISTS "Staff can view all users" ON public.users;
CREATE POLICY "Staff can view all users"
  ON public.users FOR SELECT TO authenticated
  USING (app_private.is_staff());

DROP POLICY IF EXISTS "Staff can update users" ON public.users;
CREATE POLICY "Staff can update users"
  ON public.users FOR UPDATE TO authenticated
  USING (app_private.is_staff())
  WITH CHECK (app_private.is_staff());

ALTER TABLE public.mock_tests DROP CONSTRAINT IF EXISTS mock_tests_module_type_check;
ALTER TABLE public.mock_tests
  ADD CONSTRAINT mock_tests_module_type_check
  CHECK (module_type IN ('reading', 'listening', 'writing', 'speaking'));

ALTER TABLE public.mock_tests DROP CONSTRAINT IF EXISTS mock_tests_test_data_not_empty;
ALTER TABLE public.mock_tests
  ADD CONSTRAINT mock_tests_test_data_not_empty
  CHECK (
    test_data IS NOT NULL
    AND jsonb_typeof(test_data) = 'object'
    AND test_data <> '{}'::jsonb
  );

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

REVOKE ALL ON FUNCTION public.is_listening_mock_production_ready(jsonb)
  FROM PUBLIC, anon, authenticated;

-- Existing incomplete tests must not remain visible after the release gate lands.
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

REVOKE ALL ON FUNCTION public.enforce_published_listening_readiness()
  FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS enforce_published_listening_readiness ON public.mock_tests;
CREATE TRIGGER enforce_published_listening_readiness
BEFORE INSERT OR UPDATE OF module_type, test_data, is_published
ON public.mock_tests
FOR EACH ROW
EXECUTE FUNCTION public.enforce_published_listening_readiness();

-- Public playback; only staff (or service-role, which bypasses RLS) can mutate audio.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'audio', 'audio', true, 52428800,
  ARRAY['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public can read listening audio" ON storage.objects;
CREATE POLICY "Public can read listening audio"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'audio');

DROP POLICY IF EXISTS "Staff can upload listening audio" ON storage.objects;
CREATE POLICY "Staff can upload listening audio"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'audio' AND app_private.is_staff());

DROP POLICY IF EXISTS "Staff can update listening audio" ON storage.objects;
CREATE POLICY "Staff can update listening audio"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'audio' AND app_private.is_staff())
  WITH CHECK (bucket_id = 'audio' AND app_private.is_staff());

DROP POLICY IF EXISTS "Staff can delete listening audio" ON storage.objects;
CREATE POLICY "Staff can delete listening audio"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'audio' AND app_private.is_staff());

COMMIT;
