BEGIN;

ALTER TABLE IF EXISTS public.site_settings_backup ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.site_settings_backup FROM anon, authenticated;

COMMIT;
