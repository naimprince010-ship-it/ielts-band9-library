DROP POLICY IF EXISTS "Users can insert their own payments" ON public.payment_requests;
DROP POLICY IF EXISTS "Admins can update payments" ON public.payment_requests;
DROP POLICY IF EXISTS "Admins can view all payments" ON public.payment_requests;
DROP POLICY IF EXISTS "Users can view their own payments" ON public.payment_requests;

REVOKE INSERT, UPDATE, DELETE ON public.payment_requests FROM anon, authenticated;
GRANT SELECT ON public.payment_requests TO authenticated;

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS target_band numeric(2,1),
  ADD COLUMN IF NOT EXISTS exam_date date,
  ADD COLUMN IF NOT EXISTS weak_skill text,
  ADD COLUMN IF NOT EXISTS daily_study_minutes integer,
  ADD COLUMN IF NOT EXISTS onboarding_completed_at timestamptz;

ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_target_band_range;
ALTER TABLE public.users ADD CONSTRAINT users_target_band_range
  CHECK (target_band IS NULL OR target_band BETWEEN 4.0 AND 9.0);

ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_weak_skill_check;
ALTER TABLE public.users ADD CONSTRAINT users_weak_skill_check
  CHECK (weak_skill IS NULL OR weak_skill IN ('listening', 'reading', 'writing', 'speaking', 'not_sure'));

ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_daily_study_minutes_range;
ALTER TABLE public.users ADD CONSTRAINT users_daily_study_minutes_range
  CHECK (daily_study_minutes IS NULL OR daily_study_minutes BETWEEN 10 AND 240);
