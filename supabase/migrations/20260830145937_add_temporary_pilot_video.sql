-- Do not ship the Google Developers embed that was used during local player testing.
-- Clear only that known test value; a real IELTS video added later is preserved.
UPDATE public.lessons
SET "videoUrl" = NULL,
    updated_at = now()
WHERE id = 'speaking-part1-fluency-confidence'
  AND "videoUrl" = 'https://www.youtube.com/watch?v=M7lc1UVf-VE';

COMMENT ON COLUMN public.lessons."videoUrl" IS
  'Optional HTTPS IELTS lesson video URL. Non-course demo embeds must not be published.';
