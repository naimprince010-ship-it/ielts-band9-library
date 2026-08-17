-- Keep full-mock release state consistent. This function is deliberately
-- SECURITY INVOKER and executable only by service_role; the staff-authenticated
-- API is the sole caller, and PostgreSQL executes every branch atomically.
CREATE OR REPLACE FUNCTION public.review_full_mock_bundle(
  target_bundle_id uuid,
  target_action text,
  target_reviewer_id uuid
)
RETURNS void
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  bundle public.full_mock_bundles%ROWTYPE;
  module_ids uuid[];
  review_total integer;
  review_approved integer;
  valid_modules integer;
BEGIN
  IF target_action NOT IN ('publish', 'reject') THEN
    RAISE EXCEPTION 'Unsupported bundle review action.';
  END IF;

  SELECT * INTO bundle
  FROM public.full_mock_bundles
  WHERE id = target_bundle_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Full mock bundle was not found.';
  END IF;

  module_ids := ARRAY[
    bundle.listening_test_id,
    bundle.reading_test_id,
    bundle.writing_test_id,
    bundle.speaking_test_id
  ];

  IF target_action = 'reject' THEN
    UPDATE public.mock_tests SET is_published = false WHERE id = ANY(module_ids);
    UPDATE public.full_mock_bundles
      SET review_status = 'rejected', is_published = false,
          reviewed_by = NULL, reviewed_at = NULL
      WHERE id = target_bundle_id;
    RETURN;
  END IF;

  SELECT count(*), count(*) FILTER (WHERE status = 'approved')
    INTO review_total, review_approved
  FROM public.ai_question_reviews
  WHERE bundle_id = target_bundle_id;

  IF review_total = 0 OR review_approved <> review_total THEN
    RAISE EXCEPTION 'Every question and task must be approved before publishing this bundle.';
  END IF;

  IF bundle.quality_score IS NULL OR bundle.quality_score < 85 THEN
    RAISE EXCEPTION 'Bundle quality must be at least 85 before publishing.';
  END IF;

  SELECT count(*) INTO valid_modules
  FROM public.mock_tests
  WHERE (id = bundle.listening_test_id AND module_type = 'listening')
     OR (id = bundle.reading_test_id AND module_type = 'reading')
     OR (id = bundle.writing_test_id AND module_type = 'writing')
     OR (id = bundle.speaking_test_id AND module_type = 'speaking');

  IF valid_modules <> 4 THEN
    RAISE EXCEPTION 'A full mock bundle requires one valid module of each IELTS type.';
  END IF;

  UPDATE public.mock_tests SET is_published = true WHERE id = ANY(module_ids);
  UPDATE public.full_mock_bundles
    SET review_status = 'approved', is_published = true,
        reviewed_by = target_reviewer_id, reviewed_at = now()
    WHERE id = target_bundle_id;
END;
$$;

REVOKE ALL ON FUNCTION public.review_full_mock_bundle(uuid, text, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.review_full_mock_bundle(uuid, text, uuid) TO service_role;
