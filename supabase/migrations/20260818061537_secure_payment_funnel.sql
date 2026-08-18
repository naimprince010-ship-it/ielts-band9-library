CREATE TABLE IF NOT EXISTS public.payment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email text NOT NULL,
  package_type text NOT NULL CHECK (package_type IN ('monthly', 'yearly', 'course')),
  package_name text NOT NULL,
  course_id text,
  amount integer NOT NULL CHECK (amount > 0),
  transaction_id text NOT NULL UNIQUE,
  sender_number text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  processed_at timestamptz,
  processed_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.payment_requests
  ADD COLUMN IF NOT EXISTS campaign_attribution jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS offer text,
  ADD COLUMN IF NOT EXISTS return_path text,
  ADD COLUMN IF NOT EXISTS processed_at timestamptz,
  ADD COLUMN IF NOT EXISTS processed_by uuid REFERENCES auth.users(id);

ALTER TABLE public.payment_requests ENABLE ROW LEVEL SECURITY;

CREATE SCHEMA IF NOT EXISTS app_private;
REVOKE ALL ON SCHEMA app_private FROM PUBLIC, anon;
GRANT USAGE ON SCHEMA app_private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION app_private.is_payment_staff()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.users
      WHERE id = auth.uid()
        AND role IN ('admin', 'instructor')
    );
$$;

REVOKE ALL ON FUNCTION app_private.is_payment_staff() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION app_private.is_payment_staff() TO authenticated, service_role;

DROP POLICY IF EXISTS "Users can view own payment requests" ON public.payment_requests;
CREATE POLICY "Users can view own payment requests"
  ON public.payment_requests FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own payment requests" ON public.payment_requests;
DROP POLICY IF EXISTS "Admins can manage all payment requests" ON public.payment_requests;
DROP POLICY IF EXISTS "Staff can view all payment requests" ON public.payment_requests;
CREATE POLICY "Staff can view all payment requests"
  ON public.payment_requests FOR SELECT TO authenticated
  USING (app_private.is_payment_staff());

-- Creation and mutation are intentionally server-only so package price, status,
-- user identity and attribution cannot be forged by the browser.
GRANT SELECT ON public.payment_requests TO authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.payment_requests FROM anon, authenticated;
GRANT ALL ON public.payment_requests TO service_role;

CREATE INDEX IF NOT EXISTS idx_payment_requests_user_created
  ON public.payment_requests (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payment_requests_status_created
  ON public.payment_requests (status, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_payment_requests_transaction_id
  ON public.payment_requests (transaction_id);

COMMENT ON TABLE public.payment_requests IS
  'Server-created bKash verification requests with campaign attribution and user-visible status.';
