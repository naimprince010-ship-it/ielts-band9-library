-- ============================================================
-- Migration: Create mock_test_results table
-- Run this in your Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS public.mock_test_results (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  overall_band  NUMERIC(3,1) NOT NULL,
  listening_band NUMERIC(3,1),
  reading_band   NUMERIC(3,1),
  writing_band   NUMERIC(3,1),
  speaking_band  NUMERIC(3,1),
  listening_test_id UUID REFERENCES public.mock_tests(id) ON DELETE SET NULL,
  reading_test_id   UUID REFERENCES public.mock_tests(id) ON DELETE SET NULL,
  writing_test_id   UUID REFERENCES public.mock_tests(id) ON DELETE SET NULL,
  speaking_test_id  UUID REFERENCES public.mock_tests(id) ON DELETE SET NULL,
  review_data JSONB,
  writing_feedback JSONB,
  speaking_feedback JSONB,
  completed_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.mock_test_results
  ADD COLUMN IF NOT EXISTS listening_test_id UUID REFERENCES public.mock_tests(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS reading_test_id   UUID REFERENCES public.mock_tests(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS writing_test_id   UUID REFERENCES public.mock_tests(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS speaking_test_id  UUID REFERENCES public.mock_tests(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS review_data JSONB,
  ADD COLUMN IF NOT EXISTS writing_feedback JSONB,
  ADD COLUMN IF NOT EXISTS speaking_feedback JSONB;

-- Indexes for fast user lookups
CREATE INDEX IF NOT EXISTS idx_mock_test_results_user_id
  ON public.mock_test_results (user_id);

CREATE INDEX IF NOT EXISTS idx_mock_test_results_completed_at
  ON public.mock_test_results (completed_at DESC);

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

-- Row Level Security: users can only see their own results
ALTER TABLE public.mock_test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own results"
  ON public.mock_test_results
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own results"
  ON public.mock_test_results
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all results (service role bypasses RLS anyway)
-- No special admin policy needed since service role is used from API

COMMENT ON TABLE public.mock_test_results IS
  'Stores completed Full Mock Test results with per-module band scores';
