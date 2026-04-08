-- Fix: "infinite recursion detected in policy for relation users"
-- Cause: RLS policies on public.users used EXISTS (SELECT ... FROM public.users ...),
-- which re-evaluates RLS on the same table.
-- Run this in Supabase SQL Editor (do NOT re-run create_users_table.sql DROP on production).

-- 1) Helper: runs as definer so the inner SELECT bypasses RLS on public.users
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

COMMENT ON FUNCTION public.is_admin() IS 'RLS-safe admin check for policies on public.users (avoids recursive policy)';

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO service_role;
-- anon: required so RLS policies that use (published OR is_admin()) work for the anon API key;
-- is_admin() returns false when auth.uid() is null.

-- 2) Replace recursive policies
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
CREATE POLICY "Admins can view all users"
ON public.users
FOR SELECT
USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
CREATE POLICY "Admins can update all users"
ON public.users
FOR UPDATE
USING (public.is_admin());
