-- Database-backed lesson drafts and publishing for the staff admin panel.
CREATE TABLE IF NOT EXISTS public.lessons (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  type text NOT NULL CHECK (type IN ('vocabulary', 'grammar', 'writing', 'speaking', 'reading', 'listening')),
  level text NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  topic text NOT NULL,
  description text NOT NULL DEFAULT '',
  content jsonb NOT NULL,
  is_premium boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT false,
  view_count integer NOT NULL DEFAULT 0 CHECK (view_count >= 0),
  "courseId" text,
  "moduleName" text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON TABLE public.lessons TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.lessons TO authenticated;

DROP POLICY IF EXISTS "Published lessons are publicly readable" ON public.lessons;
CREATE POLICY "Published lessons are publicly readable"
  ON public.lessons FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

DROP POLICY IF EXISTS "Staff can read all lessons" ON public.lessons;
CREATE POLICY "Staff can read all lessons"
  ON public.lessons FOR SELECT
  TO authenticated
  USING (app_private.is_staff());

DROP POLICY IF EXISTS "Staff can create lessons" ON public.lessons;
CREATE POLICY "Staff can create lessons"
  ON public.lessons FOR INSERT
  TO authenticated
  WITH CHECK (app_private.is_staff());

DROP POLICY IF EXISTS "Staff can update lessons" ON public.lessons;
CREATE POLICY "Staff can update lessons"
  ON public.lessons FOR UPDATE
  TO authenticated
  USING (app_private.is_staff())
  WITH CHECK (app_private.is_staff());

DROP POLICY IF EXISTS "Staff can delete lessons" ON public.lessons;
CREATE POLICY "Staff can delete lessons"
  ON public.lessons FOR DELETE
  TO authenticated
  USING (app_private.is_staff());

CREATE INDEX IF NOT EXISTS lessons_published_type_created_idx
  ON public.lessons (is_published, type, created_at DESC);

COMMENT ON TABLE public.lessons IS 'Admin-managed lesson drafts and published IELTS lesson content.';
