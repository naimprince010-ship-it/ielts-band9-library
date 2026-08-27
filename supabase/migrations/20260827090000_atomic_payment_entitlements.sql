CREATE TABLE IF NOT EXISTS public.user_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id text NOT NULL,
  access_status text NOT NULL DEFAULT 'active' CHECK (access_status IN ('active', 'revoked')),
  payment_request_id uuid REFERENCES public.payment_requests(id) ON DELETE SET NULL,
  enrolled_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_id)
);

ALTER TABLE public.user_courses
  ADD COLUMN IF NOT EXISTS access_status text NOT NULL DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS payment_request_id uuid REFERENCES public.payment_requests(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS enrolled_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own course enrollments" ON public.user_courses;
CREATE POLICY "Users can read own course enrollments"
  ON public.user_courses FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

REVOKE ALL ON public.user_courses FROM anon, authenticated;
GRANT SELECT ON public.user_courses TO authenticated;
GRANT ALL ON public.user_courses TO service_role;

CREATE OR REPLACE FUNCTION app_private.apply_approved_payment_entitlement()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  current_expiry timestamptz;
BEGIN
  IF NEW.status <> 'approved' OR OLD.status = 'approved' THEN
    RETURN NEW;
  END IF;

  IF NEW.package_type = 'course' THEN
    IF NEW.course_id IS NULL OR btrim(NEW.course_id) = '' THEN
      RAISE EXCEPTION 'Approved course payment requires course_id';
    END IF;

    INSERT INTO public.user_courses (user_id, course_id, access_status, payment_request_id, enrolled_at, updated_at)
    VALUES (NEW.user_id, NEW.course_id, 'active', NEW.id, now(), now())
    ON CONFLICT (user_id, course_id) DO UPDATE
      SET access_status = 'active', payment_request_id = EXCLUDED.payment_request_id, updated_at = now();
  ELSE
    SELECT premium_until INTO current_expiry
      FROM public.users WHERE id = NEW.user_id FOR UPDATE;

    UPDATE public.users
      SET subscription_status = 'premium',
          package_type = NEW.package_type,
          premium_until = GREATEST(COALESCE(current_expiry, now()), now())
            + CASE NEW.package_type WHEN 'yearly' THEN interval '1 year' ELSE interval '1 month' END,
          updated_at = now()
      WHERE id = NEW.user_id;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Payment user profile not found';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION app_private.apply_approved_payment_entitlement() FROM PUBLIC, anon, authenticated;
DROP TRIGGER IF EXISTS apply_approved_payment_entitlement ON public.payment_requests;
CREATE TRIGGER apply_approved_payment_entitlement
AFTER UPDATE OF status ON public.payment_requests
FOR EACH ROW
WHEN (NEW.status = 'approved' AND OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION app_private.apply_approved_payment_entitlement();

COMMENT ON FUNCTION app_private.apply_approved_payment_entitlement() IS
  'Atomically grants subscription or course access when staff approves a payment request.';
