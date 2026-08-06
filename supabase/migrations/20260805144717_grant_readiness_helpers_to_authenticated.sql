-- These immutable validators are called by readiness triggers while staff
-- inserts draft mock-test rows. They inspect only the supplied JSON payload
-- and do not read tables or expose privileged data.
GRANT EXECUTE ON FUNCTION public.is_listening_mock_production_ready(jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_reading_mock_production_ready(jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_writing_mock_production_ready(jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_speaking_mock_production_ready(jsonb) TO authenticated;
