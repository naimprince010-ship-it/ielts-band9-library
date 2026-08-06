BEGIN;

CREATE TABLE public.ai_question_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_id uuid NOT NULL REFERENCES public.full_mock_bundles(id) ON DELETE CASCADE,
  mock_test_id uuid NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
  module_type text NOT NULL CHECK (module_type IN ('listening', 'reading', 'writing', 'speaking')),
  question_key text NOT NULL,
  question_text_snapshot text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  review_notes text NOT NULL DEFAULT '',
  reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (bundle_id, question_key)
);

CREATE INDEX idx_ai_question_reviews_bundle_status
  ON public.ai_question_reviews (bundle_id, status, module_type);

ALTER TABLE public.ai_question_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can read question reviews"
  ON public.ai_question_reviews FOR SELECT TO authenticated
  USING (app_private.is_staff());
CREATE POLICY "Staff can insert question reviews"
  ON public.ai_question_reviews FOR INSERT TO authenticated
  WITH CHECK (app_private.is_staff());
CREATE POLICY "Staff can update question reviews"
  ON public.ai_question_reviews FOR UPDATE TO authenticated
  USING (app_private.is_staff()) WITH CHECK (app_private.is_staff());
CREATE POLICY "Staff can delete question reviews"
  ON public.ai_question_reviews FOR DELETE TO authenticated
  USING (app_private.is_staff());

GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_question_reviews TO authenticated;

CREATE OR REPLACE FUNCTION app_private.stamp_question_review()
RETURNS trigger LANGUAGE plpgsql SET search_path = '' AS $$
BEGIN
  NEW.updated_at := now();
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    NEW.reviewed_by := CASE WHEN NEW.status = 'pending' THEN NULL ELSE auth.uid() END;
    NEW.reviewed_at := CASE WHEN NEW.status = 'pending' THEN NULL ELSE now() END;
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION app_private.stamp_question_review() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER stamp_question_review_before_update
BEFORE UPDATE ON public.ai_question_reviews
FOR EACH ROW EXECUTE FUNCTION app_private.stamp_question_review();

CREATE OR REPLACE FUNCTION app_private.seed_question_reviews_for_bundle(target_bundle_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  bundle public.full_mock_bundles%ROWTYPE;
BEGIN
  SELECT * INTO bundle FROM public.full_mock_bundles WHERE id = target_bundle_id;
  IF NOT FOUND THEN RETURN; END IF;

  INSERT INTO public.ai_question_reviews (bundle_id, mock_test_id, module_type, question_key, question_text_snapshot)
  SELECT bundle.id, bundle.reading_test_id, 'reading',
         format('reading:p%s:q%s', passage_number, question_number),
         COALESCE(question->>'questionText', '')
  FROM public.mock_tests test
  CROSS JOIN LATERAL jsonb_array_elements(test.test_data->'passages') WITH ORDINALITY passage_item(passage, passage_number)
  CROSS JOIN LATERAL jsonb_array_elements(passage->'questions') WITH ORDINALITY question_item(question, question_number)
  WHERE test.id = bundle.reading_test_id
  ON CONFLICT (bundle_id, question_key) DO NOTHING;

  INSERT INTO public.ai_question_reviews (bundle_id, mock_test_id, module_type, question_key, question_text_snapshot)
  SELECT bundle.id, bundle.listening_test_id, 'listening',
         format('listening:s%s:q%s', section_number, question_number),
         COALESCE(question->>'questionText', '')
  FROM public.mock_tests test
  CROSS JOIN LATERAL jsonb_array_elements(test.test_data->'sections') WITH ORDINALITY section_item(section, section_number)
  CROSS JOIN LATERAL jsonb_array_elements(section->'questions') WITH ORDINALITY question_item(question, question_number)
  WHERE test.id = bundle.listening_test_id
  ON CONFLICT (bundle_id, question_key) DO NOTHING;

  INSERT INTO public.ai_question_reviews (bundle_id, mock_test_id, module_type, question_key, question_text_snapshot)
  SELECT bundle.id, bundle.writing_test_id, 'writing',
         format('writing:task%s', task_number), COALESCE(task->>'prompt', '')
  FROM public.mock_tests test
  CROSS JOIN LATERAL jsonb_array_elements(test.test_data->'tasks') WITH ORDINALITY task_item(task, task_number)
  WHERE test.id = bundle.writing_test_id
  ON CONFLICT (bundle_id, question_key) DO NOTHING;

  INSERT INTO public.ai_question_reviews (bundle_id, mock_test_id, module_type, question_key, question_text_snapshot)
  SELECT bundle.id, bundle.speaking_test_id, 'speaking',
         format('speaking:p%s:q%s', part_number, question_number), COALESCE(question->>'text', question->>'questionText', '')
  FROM public.mock_tests test
  CROSS JOIN LATERAL jsonb_array_elements(test.test_data->'parts') WITH ORDINALITY part_item(part, part_number)
  CROSS JOIN LATERAL jsonb_array_elements(COALESCE(part->'questions', '[]'::jsonb)) WITH ORDINALITY question_item(question, question_number)
  WHERE test.id = bundle.speaking_test_id
  ON CONFLICT (bundle_id, question_key) DO NOTHING;

  INSERT INTO public.ai_question_reviews (bundle_id, mock_test_id, module_type, question_key, question_text_snapshot)
  SELECT bundle.id, bundle.speaking_test_id, 'speaking', 'speaking:p2:cue', COALESCE(part->'cueCard'->>'topic', '')
  FROM public.mock_tests test
  CROSS JOIN LATERAL jsonb_array_elements(test.test_data->'parts') part
  WHERE test.id = bundle.speaking_test_id AND COALESCE((part->>'partNumber')::int, 0) = 2
  ON CONFLICT (bundle_id, question_key) DO NOTHING;
END;
$$;

REVOKE ALL ON FUNCTION app_private.seed_question_reviews_for_bundle(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION app_private.seed_question_reviews_for_bundle(uuid) TO service_role;

CREATE OR REPLACE FUNCTION app_private.seed_question_reviews_after_bundle_insert()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  PERFORM app_private.seed_question_reviews_for_bundle(NEW.id);
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION app_private.seed_question_reviews_after_bundle_insert() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER seed_question_reviews_after_bundle_insert
AFTER INSERT ON public.full_mock_bundles
FOR EACH ROW EXECUTE FUNCTION app_private.seed_question_reviews_after_bundle_insert();

DO $$ DECLARE bundle_id uuid; BEGIN
  FOR bundle_id IN SELECT id FROM public.full_mock_bundles LOOP
    PERFORM app_private.seed_question_reviews_for_bundle(bundle_id);
  END LOOP;
END $$;

CREATE OR REPLACE FUNCTION app_private.refresh_question_reviews_after_test_update()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE affected_bundle_id uuid;
BEGIN
  FOR affected_bundle_id IN
    SELECT id FROM public.full_mock_bundles
    WHERE listening_test_id = NEW.id OR reading_test_id = NEW.id
       OR writing_test_id = NEW.id OR speaking_test_id = NEW.id
  LOOP
    DELETE FROM public.ai_question_reviews WHERE bundle_id = affected_bundle_id;
    PERFORM app_private.seed_question_reviews_for_bundle(affected_bundle_id);
    UPDATE public.full_mock_bundles
      SET review_status = 'in_review', is_published = false, reviewed_by = NULL, reviewed_at = NULL
      WHERE id = affected_bundle_id;
  END LOOP;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION app_private.refresh_question_reviews_after_test_update() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER refresh_question_reviews_after_test_update
AFTER UPDATE OF test_data ON public.mock_tests
FOR EACH ROW WHEN (OLD.test_data IS DISTINCT FROM NEW.test_data)
EXECUTE FUNCTION app_private.refresh_question_reviews_after_test_update();

CREATE OR REPLACE FUNCTION app_private.enforce_completed_question_review()
RETURNS trigger LANGUAGE plpgsql SET search_path = '' AS $$
DECLARE total_count integer; approved_count integer;
BEGIN
  IF NEW.is_published THEN
    SELECT count(*), count(*) FILTER (WHERE status = 'approved')
    INTO total_count, approved_count
    FROM public.ai_question_reviews WHERE bundle_id = NEW.id;
    IF total_count = 0 OR approved_count <> total_count THEN
      RAISE EXCEPTION 'Every question and task must be approved before publishing this bundle.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION app_private.enforce_completed_question_review() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER enforce_completed_question_review_before_publish
BEFORE INSERT OR UPDATE OF is_published ON public.full_mock_bundles
FOR EACH ROW EXECUTE FUNCTION app_private.enforce_completed_question_review();

COMMIT;
