-- Reconcile the legacy production table with the secure payment contract.
ALTER TABLE public.payment_requests
  ADD COLUMN IF NOT EXISTS course_id text REFERENCES public.courses(id),
  ADD COLUMN IF NOT EXISTS rejection_reason text;

ALTER TABLE public.payment_requests
  ALTER COLUMN user_id SET NOT NULL,
  ALTER COLUMN user_email SET NOT NULL,
  ALTER COLUMN package_type SET NOT NULL,
  ALTER COLUMN package_name SET NOT NULL,
  ALTER COLUMN amount SET NOT NULL,
  ALTER COLUMN transaction_id SET NOT NULL,
  ALTER COLUMN sender_number SET NOT NULL,
  ALTER COLUMN status SET NOT NULL,
  ALTER COLUMN status SET DEFAULT 'pending',
  ALTER COLUMN created_at SET NOT NULL,
  ALTER COLUMN created_at SET DEFAULT now();

ALTER TABLE public.payment_requests DROP CONSTRAINT IF EXISTS payment_requests_package_type_check;
ALTER TABLE public.payment_requests ADD CONSTRAINT payment_requests_package_type_check
  CHECK (package_type IN ('monthly', 'yearly', 'course'));
ALTER TABLE public.payment_requests DROP CONSTRAINT IF EXISTS payment_requests_status_check;
ALTER TABLE public.payment_requests ADD CONSTRAINT payment_requests_status_check
  CHECK (status IN ('pending', 'approved', 'rejected'));
ALTER TABLE public.payment_requests DROP CONSTRAINT IF EXISTS payment_requests_amount_check;
ALTER TABLE public.payment_requests ADD CONSTRAINT payment_requests_amount_check CHECK (amount > 0);

CREATE UNIQUE INDEX IF NOT EXISTS user_courses_user_id_course_id_key
  ON public.user_courses (user_id, course_id);

-- The table's UNIQUE constraint already supplies this index.
DROP INDEX IF EXISTS public.idx_payment_requests_transaction_id;
