-- Fix: "infinite recursion detected in policy for relation users"
-- Cause: RLS policies on public.users used EXISTS (SELECT ... FROM public.users ...),
-- which re-evaluates RLS on the same table.
-- Run this in Supabase SQL Editor (do NOT re-run create_users_table.sql DROP on production).

-- 1) Helper: runs as definer so the inner SELECT bypasses RLS on public.users
--    Matches app logic: AuthContext treats role admin OR instructor OR BUILTIN_FULL_ACCESS_EMAILS as staff.
--    Keep the email array in sync with AuthContext.tsx BUILTIN_FULL_ACCESS_EMAILS (and add env-only staff via role).
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    auth.uid() IS NOT NULL
    AND (
      EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid() AND role IN ('admin', 'instructor')
      )
      OR EXISTS (
        SELECT 1
        FROM unnest(ARRAY[
          'naimprince010@gmail.com'
        ]::text[]) AS allowlisted(raw_email)
        WHERE lower(trim(COALESCE(
          NULLIF(auth.jwt() ->> 'email', ''),
          (SELECT au.email FROM auth.users au WHERE au.id = auth.uid()),
          ''
        ))) = lower(trim(allowlisted.raw_email))
      )
    );
$$;

COMMENT ON FUNCTION public.is_admin() IS 'RLS-safe staff check: public.users role admin/instructor, or built-in allowlist email (sync with AuthContext BUILTIN_FULL_ACCESS_EMAILS)';

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
