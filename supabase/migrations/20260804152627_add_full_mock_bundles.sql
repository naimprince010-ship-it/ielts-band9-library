BEGIN;

CREATE TABLE public.full_mock_bundles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (btrim(title) <> ''),
  theme text NOT NULL DEFAULT '',
  difficulty text NOT NULL DEFAULT 'medium'
    CHECK (difficulty IN ('easy', 'medium', 'hard')),
  listening_test_id uuid NOT NULL UNIQUE REFERENCES public.mock_tests(id) ON DELETE RESTRICT,
  reading_test_id uuid NOT NULL UNIQUE REFERENCES public.mock_tests(id) ON DELETE RESTRICT,
  writing_test_id uuid NOT NULL UNIQUE REFERENCES public.mock_tests(id) ON DELETE RESTRICT,
  speaking_test_id uuid NOT NULL UNIQUE REFERENCES public.mock_tests(id) ON DELETE RESTRICT,
  review_status text NOT NULL DEFAULT 'draft'
    CHECK (review_status IN ('draft', 'in_review', 'approved', 'rejected')),
  quality_score numeric(5,2) CHECK (quality_score IS NULL OR quality_score BETWEEN 0 AND 100),
  generation_metadata jsonb NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(generation_metadata) = 'object'),
  review_notes text NOT NULL DEFAULT '',
  reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at timestamptz,
  is_published boolean NOT NULL DEFAULT false,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (NOT is_published OR review_status = 'approved')
);

CREATE INDEX idx_full_mock_bundles_published
  ON public.full_mock_bundles (is_published, created_at DESC);
CREATE INDEX idx_full_mock_bundles_review
  ON public.full_mock_bundles (review_status, created_at DESC);

ALTER TABLE public.full_mock_bundles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published full mock bundles are readable"
  ON public.full_mock_bundles FOR SELECT
  USING (is_published = true);

CREATE POLICY "Staff can read all full mock bundles"
  ON public.full_mock_bundles FOR SELECT TO authenticated
  USING (app_private.is_staff());

CREATE POLICY "Staff can insert full mock bundles"
  ON public.full_mock_bundles FOR INSERT TO authenticated
  WITH CHECK (app_private.is_staff());

CREATE POLICY "Staff can update full mock bundles"
  ON public.full_mock_bundles FOR UPDATE TO authenticated
  USING (app_private.is_staff())
  WITH CHECK (app_private.is_staff());

CREATE POLICY "Staff can delete full mock bundles"
  ON public.full_mock_bundles FOR DELETE TO authenticated
  USING (app_private.is_staff());

GRANT SELECT ON public.full_mock_bundles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.full_mock_bundles TO authenticated;

CREATE OR REPLACE FUNCTION app_private.validate_full_mock_bundle()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  valid_modules integer;
  published_modules integer;
BEGIN
  SELECT count(*), count(*) FILTER (WHERE is_published)
  INTO valid_modules, published_modules
  FROM public.mock_tests
  WHERE (id = NEW.listening_test_id AND module_type = 'listening')
     OR (id = NEW.reading_test_id AND module_type = 'reading')
     OR (id = NEW.writing_test_id AND module_type = 'writing')
     OR (id = NEW.speaking_test_id AND module_type = 'speaking');

  IF valid_modules <> 4 THEN
    RAISE EXCEPTION 'A full mock bundle requires one valid test from each IELTS module.';
  END IF;

  IF NEW.is_published AND published_modules <> 4 THEN
    RAISE EXCEPTION 'Publish all four module tests before publishing their full mock bundle.';
  END IF;

  IF NEW.review_status = 'approved' AND NEW.reviewed_by IS NULL THEN
    NEW.reviewed_by := auth.uid();
    NEW.reviewed_at := now();
  ELSIF NEW.review_status <> 'approved' THEN
    NEW.reviewed_by := NULL;
    NEW.reviewed_at := NULL;
    NEW.is_published := false;
  END IF;

  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION app_private.validate_full_mock_bundle() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION app_private.validate_full_mock_bundle() TO service_role;

CREATE TRIGGER validate_full_mock_bundle_before_write
BEFORE INSERT OR UPDATE ON public.full_mock_bundles
FOR EACH ROW EXECUTE FUNCTION app_private.validate_full_mock_bundle();

ALTER TABLE public.mock_test_results
  ADD COLUMN full_mock_bundle_id uuid REFERENCES public.full_mock_bundles(id) ON DELETE SET NULL;

CREATE INDEX idx_mock_test_results_user_bundle
  ON public.mock_test_results (user_id, full_mock_bundle_id, completed_at DESC)
  WHERE full_mock_bundle_id IS NOT NULL;

COMMIT;
