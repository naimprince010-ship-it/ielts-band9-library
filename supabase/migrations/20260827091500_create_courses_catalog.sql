CREATE TABLE IF NOT EXISTS public.courses (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  instructor text NOT NULL DEFAULT '',
  next_batch text NOT NULL DEFAULT '',
  price integer NOT NULL CHECK (price >= 0),
  original_price integer CHECK (original_price IS NULL OR original_price >= price),
  duration text NOT NULL DEFAULT '',
  level text NOT NULL DEFAULT 'Any',
  type text NOT NULL DEFAULT 'recorded' CHECK (type IN ('live', 'recorded', 'hybrid')),
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_popular boolean NOT NULL DEFAULT false,
  accent_color text NOT NULL DEFAULT 'indigo',
  bg_gradient text NOT NULL DEFAULT 'from-blue-500 to-indigo-600',
  curriculum jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Courses are publicly readable" ON public.courses;
CREATE POLICY "Courses are publicly readable"
  ON public.courses FOR SELECT TO anon, authenticated
  USING (true);
DROP POLICY IF EXISTS "Staff can manage courses" ON public.courses;
CREATE POLICY "Staff can manage courses"
  ON public.courses FOR ALL TO authenticated
  USING (app_private.is_payment_staff())
  WITH CHECK (app_private.is_payment_staff());

GRANT SELECT ON public.courses TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.courses TO authenticated;
GRANT ALL ON public.courses TO service_role;

INSERT INTO public.courses (
  id, title, description, instructor, next_batch, price, original_price,
  duration, level, type, features, is_popular, accent_color, bg_gradient
) VALUES
  (
    'ielts-masterclass', 'IELTS Band 8+ Masterclass',
    'Our most comprehensive program covering all 4 modules (Reading, Writing, Listening, Speaking) with personal feedback.',
    'Arefin Shovo', 'Registration open', 5500, 8000, '3 Months', 'Any', 'live',
    '["24 Interactive Live Classes","Daily Practice Materials","Personalized Writing Feedback","1-on-1 Speaking Mock Tests","Life-time Access to Recorded Classes"]'::jsonb,
    true, 'indigo', 'from-blue-500 to-indigo-600'
  ),
  (
    'writing-intensive', 'Writing Task 1 & 2 Intensive',
    'Master Task 1 and Task 2 with advanced templates and weekly scoring. Focus on high-band grammar & vocabulary.',
    'Sharmin Alam', 'Registration open', 2500, 3500, '1 Month', 'Intermediate+', 'live',
    '["12 Special Writing Sessions","Band 8+ Grammar Templates","Daily Homework Tasks","Weekly Essay Feedback","IELTS Writing Handbook"]'::jsonb,
    false, 'rose', 'from-rose-500 to-pink-600'
  ),
  (
    'speaking-club', 'IELTS Speaking Confidence Club',
    'Overcome your speaking fear. Daily 30-minute practice sessions with peers and expert feedback.',
    'James Rodger', 'Ongoing', 1500, 2000, '1 Month', 'Any', 'live',
    '["Daily 1-on-1 Practice","Cue-card Strategy Lessons","Pronunciation Workshops","Idioms and Phrasal Verbs","Weekly Speaking Mocks"]'::jsonb,
    false, 'amber', 'from-amber-400 to-orange-500'
  ),
  (
    'reading-listening-suite', 'Rapid Reading & Listening Suite',
    'Speed up your reading and sharpen your ears. Focused practice on tricky question types and keywords.',
    'Sifat Hasan', 'Self-paced', 1200, 1800, 'Lifetime', 'Any', 'recorded',
    '["50+ High-quality Mock Tests","Strategy Video Explanations","Vocabulary for Reading","Keyword Mapping Techniques","Instant Result Tracking"]'::jsonb,
    false, 'emerald', 'from-emerald-400 to-teal-600'
  )
ON CONFLICT (id) DO NOTHING;

COMMENT ON TABLE public.courses IS 'Canonical sellable course catalog used by the UI and server-side payment validation.';
