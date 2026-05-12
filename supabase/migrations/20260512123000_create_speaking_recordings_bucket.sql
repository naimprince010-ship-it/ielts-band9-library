-- Public bucket for optional full mock speaking recordings.
-- Object paths include the authenticated user id and RLS limits writes/reads to that prefix.

INSERT INTO storage.buckets (id, name, public)
VALUES ('speaking-recordings', 'speaking-recordings', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Users can upload own speaking recordings"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'speaking-recordings'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can read own speaking recordings"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'speaking-recordings'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update own speaking recordings"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'speaking-recordings'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own speaking recordings"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'speaking-recordings'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
