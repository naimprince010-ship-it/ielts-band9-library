-- Track which specific mock tests were used in each result row.
-- This lets the system rotate tests so repeat users get fresh questions.

ALTER TABLE public.mock_test_results
  ADD COLUMN IF NOT EXISTS listening_test_id  uuid REFERENCES public.mock_tests(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS reading_test_id    uuid REFERENCES public.mock_tests(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS writing_test_id    uuid REFERENCES public.mock_tests(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS speaking_test_id   uuid REFERENCES public.mock_tests(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS review_data        jsonb,
  ADD COLUMN IF NOT EXISTS writing_feedback   jsonb;

-- Index so we can quickly find which tests a user has already attempted
CREATE INDEX IF NOT EXISTS idx_mock_test_results_user_listening
  ON public.mock_test_results (user_id, listening_test_id)
  WHERE listening_test_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_mock_test_results_user_reading
  ON public.mock_test_results (user_id, reading_test_id)
  WHERE reading_test_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_mock_test_results_user_writing
  ON public.mock_test_results (user_id, writing_test_id)
  WHERE writing_test_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_mock_test_results_user_speaking
  ON public.mock_test_results (user_id, speaking_test_id)
  WHERE speaking_test_id IS NOT NULL;
