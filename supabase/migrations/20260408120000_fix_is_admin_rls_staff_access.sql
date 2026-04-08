-- Align is_admin() with AuthContext: instructors + built-in staff emails (not only users.role = admin).
-- Fixes: "new row violates row-level security policy for table mock_tests" when UI shows admin via email allowlist.

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
