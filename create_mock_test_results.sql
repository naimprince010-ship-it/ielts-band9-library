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
  completed_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for fast user lookups
CREATE INDEX IF NOT EXISTS idx_mock_test_results_user_id
  ON public.mock_test_results (user_id);

CREATE INDEX IF NOT EXISTS idx_mock_test_results_completed_at
  ON public.mock_test_results (completed_at DESC);

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
