CREATE TABLE IF NOT EXISTS public.diagnostic_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vocabulary_score integer NOT NULL CHECK (vocabulary_score BETWEEN 0 AND 100),
  grammar_score integer NOT NULL CHECK (grammar_score BETWEEN 0 AND 100),
  reading_score integer NOT NULL CHECK (reading_score BETWEEN 0 AND 100),
  overall_score integer NOT NULL CHECK (overall_score BETWEEN 0 AND 100),
  estimated_band numeric(2,1) NOT NULL CHECK (estimated_band BETWEEN 1 AND 9),
  target_band numeric(2,1) NOT NULL CHECK (target_band BETWEEN 4 AND 9),
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.diagnostic_attempts ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON public.diagnostic_attempts TO authenticated;
REVOKE ALL ON public.diagnostic_attempts FROM anon;

DROP POLICY IF EXISTS "Users can read own diagnostic attempts" ON public.diagnostic_attempts;
CREATE POLICY "Users can read own diagnostic attempts"
  ON public.diagnostic_attempts FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own diagnostic attempts" ON public.diagnostic_attempts;
CREATE POLICY "Users can create own diagnostic attempts"
  ON public.diagnostic_attempts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS diagnostic_attempts_user_created_idx
  ON public.diagnostic_attempts (user_id, created_at DESC);

COMMENT ON TABLE public.diagnostic_attempts IS
  'Authenticated student diagnostic results used to create personalized onboarding plans.';
