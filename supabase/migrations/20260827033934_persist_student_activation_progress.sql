CREATE TABLE IF NOT EXISTS public.user_preferences (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  target_band numeric(2,1) NOT NULL DEFAULT 7.0 CHECK (target_band BETWEEN 4 AND 9),
  daily_goal_questions integer NOT NULL DEFAULT 10 CHECK (daily_goal_questions BETWEEN 1 AND 100),
  focus_areas text[] NOT NULL DEFAULT ARRAY['vocabulary','grammar']::text[],
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.student_lesson_progress (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id text NOT NULL,
  status text NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','completed')),
  last_opened_at timestamptz NOT NULL DEFAULT now(),
  time_spent_seconds integer NOT NULL DEFAULT 0 CHECK (time_spent_seconds >= 0),
  completed_at timestamptz,
  PRIMARY KEY (user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS public.student_daily_activity (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_date date NOT NULL DEFAULT current_date,
  questions_answered integer NOT NULL DEFAULT 0 CHECK (questions_answered >= 0),
  lesson_time_seconds integer NOT NULL DEFAULT 0 CHECK (lesson_time_seconds >= 0),
  lessons_completed integer NOT NULL DEFAULT 0 CHECK (lessons_completed >= 0),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, activity_date)
);

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_daily_activity ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.user_preferences, public.student_lesson_progress, public.student_daily_activity FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_preferences, public.student_lesson_progress, public.student_daily_activity TO authenticated;

DROP POLICY IF EXISTS "Users manage own preferences" ON public.user_preferences;
CREATE POLICY "Users manage own preferences" ON public.user_preferences
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own lesson progress" ON public.student_lesson_progress;
CREATE POLICY "Users manage own lesson progress" ON public.student_lesson_progress
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own daily activity" ON public.student_daily_activity;
CREATE POLICY "Users manage own daily activity" ON public.student_daily_activity
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS student_lesson_progress_recent_idx
  ON public.student_lesson_progress (user_id, last_opened_at DESC);
CREATE INDEX IF NOT EXISTS student_daily_activity_recent_idx
  ON public.student_daily_activity (user_id, activity_date DESC);
