ALTER TABLE public.lessons
  ADD COLUMN IF NOT EXISTS "videoUrl" text;

COMMENT ON COLUMN public.lessons."videoUrl" IS
  'Optional HTTPS URL for a YouTube, Vimeo, or directly hosted lesson video.';
