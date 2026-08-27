REVOKE ALL ON public.diagnostic_attempts FROM anon, authenticated;
GRANT SELECT, INSERT ON public.diagnostic_attempts TO authenticated;
