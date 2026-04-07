-- Fix: Admin cannot UPDATE mock_tests (save fails) or students cannot read published tests.
-- Requires public.is_admin() from fix_users_rls_infinite_recursion.sql first.
--
-- Run in Supabase → SQL Editor.

-- Create table if missing (skip if you already have mock_tests)
CREATE TABLE IF NOT EXISTS public.mock_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT 'Untitled',
  module_type TEXT NOT NULL,
  test_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Optional: keep updated_at fresh (ignore if trigger already exists)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS mock_tests_set_updated_at ON public.mock_tests;
CREATE TRIGGER mock_tests_set_updated_at
  BEFORE UPDATE ON public.mock_tests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "mock_tests_select" ON public.mock_tests;
DROP POLICY IF EXISTS "mock_tests_admin_insert" ON public.mock_tests;
DROP POLICY IF EXISTS "mock_tests_admin_update" ON public.mock_tests;
DROP POLICY IF EXISTS "mock_tests_admin_delete" ON public.mock_tests;

-- Anyone (including anon) can read published tests; admins see all rows
CREATE POLICY "mock_tests_select"
ON public.mock_tests FOR SELECT
TO anon, authenticated
USING (COALESCE(is_published, false) = true OR public.is_admin());

-- Only admins can create/update/delete
CREATE POLICY "mock_tests_admin_insert"
ON public.mock_tests FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "mock_tests_admin_update"
ON public.mock_tests FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "mock_tests_admin_delete"
ON public.mock_tests FOR DELETE
TO authenticated
USING (public.is_admin());

GRANT SELECT ON public.mock_tests TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.mock_tests TO authenticated;
