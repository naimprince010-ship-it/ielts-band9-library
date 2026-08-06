BEGIN;

CREATE TABLE public.ai_generation_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_id uuid REFERENCES public.full_mock_bundles(id) ON DELETE SET NULL,
  generated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL DEFAULT auth.uid(),
  topic text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  provider text NOT NULL DEFAULT 'openai',
  status text NOT NULL CHECK (status IN ('succeeded', 'failed', 'blocked_duplicate', 'blocked_quality')),
  quality_score numeric(5,2) CHECK (quality_score IS NULL OR quality_score BETWEEN 0 AND 100),
  quality_report jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(quality_report) = 'object'),
  error_message text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_ai_generation_runs_created ON public.ai_generation_runs (created_at DESC);
CREATE INDEX idx_ai_generation_runs_status ON public.ai_generation_runs (status, created_at DESC);

ALTER TABLE public.ai_generation_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can read AI generation history"
  ON public.ai_generation_runs FOR SELECT TO authenticated
  USING (app_private.is_staff());

CREATE POLICY "Staff can insert AI generation history"
  ON public.ai_generation_runs FOR INSERT TO authenticated
  WITH CHECK (app_private.is_staff());

GRANT SELECT, INSERT ON public.ai_generation_runs TO authenticated;

ALTER TABLE public.full_mock_bundles
  ADD CONSTRAINT full_mock_bundle_minimum_quality
  CHECK (NOT is_published OR quality_score >= 85);

COMMIT;
