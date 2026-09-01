-- Keep stable course IDs and URLs while standardizing public display names.
UPDATE public.courses
SET title = CASE id
  WHEN 'ielts-masterclass' THEN 'IELTS Band 8+ Masterclass'
  WHEN 'writing-intensive' THEN 'IELTS Writing Task 1 & 2 Intensive'
  WHEN 'speaking-club' THEN 'IELTS Speaking Confidence Program'
  WHEN 'reading-listening-suite' THEN 'IELTS Reading & Listening Intensive'
  ELSE title
END,
updated_at = now()
WHERE id IN (
  'ielts-masterclass',
  'writing-intensive',
  'speaking-club',
  'reading-listening-suite'
);
