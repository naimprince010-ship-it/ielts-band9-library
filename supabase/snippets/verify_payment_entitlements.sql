-- Rollback-only production verification for payment approval entitlements.
BEGIN;

DO $$
DECLARE
  test_user_id uuid;
  test_email text;
  test_course_id text;
  monthly_payment_id uuid;
  course_payment_id uuid;
BEGIN
  SELECT u.id, u.email INTO test_user_id, test_email
  FROM public.users u
  WHERE EXISTS (SELECT 1 FROM auth.users au WHERE au.id = u.id)
  LIMIT 1;

  SELECT c.id INTO test_course_id FROM public.courses c LIMIT 1;
  IF test_user_id IS NULL OR test_course_id IS NULL THEN
    RAISE EXCEPTION 'Verification requires one existing user and course';
  END IF;

  INSERT INTO public.payment_requests (
    user_id, user_email, package_type, package_name, amount, base_amount, discount_amount,
    transaction_id, sender_number, status
  ) VALUES (
    test_user_id, test_email, 'monthly', 'Rollback verification', 1, 1, 0,
    upper(substr(md5(random()::text), 1, 12)), '01700000000', 'pending'
  ) RETURNING id INTO monthly_payment_id;

  INSERT INTO public.payment_requests (
    user_id, user_email, package_type, package_name, course_id, amount, base_amount, discount_amount,
    transaction_id, sender_number, status
  ) VALUES (
    test_user_id, test_email, 'course', 'Rollback verification', test_course_id, 1, 1, 0,
    upper(substr(md5(random()::text), 1, 12)), '01700000000', 'pending'
  ) RETURNING id INTO course_payment_id;

  UPDATE public.payment_requests SET status = 'approved' WHERE id IN (monthly_payment_id, course_payment_id);

  IF NOT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = test_user_id
      AND subscription_status = 'premium'
      AND premium_until > now()
  ) THEN
    RAISE EXCEPTION 'Premium entitlement verification failed';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.user_courses
    WHERE user_id = test_user_id
      AND course_id = test_course_id
      AND access_status = 'active'
      AND payment_request_id = course_payment_id
  ) THEN
    RAISE EXCEPTION 'Course entitlement verification failed';
  END IF;
END;
$$;

SELECT
  NOT has_table_privilege('anon', 'public.payment_requests', 'SELECT') AS anon_payment_read_revoked,
  NOT has_table_privilege('authenticated', 'public.payment_requests', 'INSERT,UPDATE,DELETE') AS browser_payment_write_revoked,
  has_table_privilege('authenticated', 'public.user_courses', 'SELECT') AS enrollment_read_granted,
  NOT has_table_privilege('authenticated', 'public.user_courses', 'INSERT,UPDATE,DELETE') AS enrollment_write_revoked;

ROLLBACK;
