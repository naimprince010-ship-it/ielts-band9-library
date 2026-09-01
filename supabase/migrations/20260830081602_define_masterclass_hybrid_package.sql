-- Define the sellable Masterclass package using bounded, verifiable delivery promises.
UPDATE public.courses
SET
  description = 'A complete hybrid IELTS program combining 24 structured prerecorded lessons with weekly live support, guided practice, and limited individual feedback.',
  next_batch = 'Registration open',
  price = 5500,
  original_price = NULL,
  duration = '3 Months',
  type = 'hybrid',
  features = jsonb_build_array(
    '24 Structured Prerecorded Lessons',
    'Weekly Live Group Clinic',
    '4 Personalized Writing Reviews',
    '2 Individual Speaking Mock Tests',
    'Guided Practice Materials and Final Mock Review'
  ),
  updated_at = now()
WHERE id = 'ielts-masterclass';
