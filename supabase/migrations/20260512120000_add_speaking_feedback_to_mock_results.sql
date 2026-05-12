-- Store AI Speaking feedback for completed full mock attempts.

ALTER TABLE public.mock_test_results
  ADD COLUMN IF NOT EXISTS speaking_feedback jsonb;
