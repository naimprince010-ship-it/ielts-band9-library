-- Reading Studio is intentionally isolated from legacy reading_passages and
-- full mock-test data. public.lessons remains only the registry/access layer.

create table if not exists public.reading_lesson_data (
  lesson_id text primary key references public.lessons(id) on delete cascade,
  schema_version integer not null default 1 check (schema_version >= 1),
  passage_format text not null check (passage_format in ('academic', 'general_training')),
  passage_title text not null check (length(btrim(passage_title)) > 0),
  passage_content text not null check (length(btrim(passage_content)) > 0),
  paragraphs jsonb not null default '[]'::jsonb check (jsonb_typeof(paragraphs) = 'array'),
  question_groups jsonb not null default '[]'::jsonb check (jsonb_typeof(question_groups) = 'array'),
  quality_report jsonb not null default '{}'::jsonb check (jsonb_typeof(quality_report) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (jsonb_array_length(paragraphs) > 0),
  check (jsonb_array_length(question_groups) > 0)
);

create index if not exists reading_lesson_data_updated_idx
  on public.reading_lesson_data (updated_at desc);

alter table public.reading_lesson_data enable row level security;

grant select on public.reading_lesson_data to anon, authenticated;
grant insert, update, delete on public.reading_lesson_data to authenticated;

drop policy if exists "Published reading materials are publicly readable" on public.reading_lesson_data;
create policy "Published reading materials are publicly readable"
  on public.reading_lesson_data for select to anon, authenticated
  using (
    exists (
      select 1
      from public.lessons
      where lessons.id = reading_lesson_data.lesson_id
        and lessons.is_published = true
    )
  );

drop policy if exists "Staff can manage reading studio data" on public.reading_lesson_data;
create policy "Staff can manage reading studio data"
  on public.reading_lesson_data for all to authenticated
  using (app_private.is_staff())
  with check (app_private.is_staff());

create table if not exists public.reading_lesson_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null references public.lessons(id) on delete cascade,
  question_id text not null check (length(btrim(question_id)) > 0),
  submitted_answer text not null check (length(btrim(submitted_answer)) > 0),
  duration_seconds integer not null default 0 check (duration_seconds >= 0),
  created_at timestamptz not null default now()
);

create index if not exists reading_lesson_attempts_user_lesson_created_idx
  on public.reading_lesson_attempts (user_id, lesson_id, created_at desc);
create index if not exists reading_lesson_attempts_lesson_question_idx
  on public.reading_lesson_attempts (lesson_id, question_id);

alter table public.reading_lesson_attempts enable row level security;

grant select, insert on public.reading_lesson_attempts to authenticated;

drop policy if exists "Students can read own reading attempts" on public.reading_lesson_attempts;
create policy "Students can read own reading attempts"
  on public.reading_lesson_attempts for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Students can record own reading attempts" on public.reading_lesson_attempts;
create policy "Students can record own reading attempts"
  on public.reading_lesson_attempts for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Staff can read reading attempts" on public.reading_lesson_attempts;
create policy "Staff can read reading attempts"
  on public.reading_lesson_attempts for select to authenticated
  using (app_private.is_staff());

create or replace function public.enforce_published_reading_lesson_readiness()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.type = 'reading'
     and new.is_published = true
     and (tg_op = 'INSERT' or old.is_published is distinct from new.is_published) then
    if not exists (
      select 1
      from public.reading_lesson_data as data
      where data.lesson_id = new.id
        and jsonb_array_length(data.paragraphs) > 0
        and jsonb_array_length(data.question_groups) > 0
        and coalesce((data.quality_report->>'passageReviewed')::boolean, false)
        and coalesce((data.quality_report->>'questionsReviewed')::boolean, false)
        and coalesce((data.quality_report->>'answersChecked')::boolean, false)
        and coalesce((data.quality_report->>'copyrightConfirmed')::boolean, false)
    ) then
      raise exception 'Published Reading lessons require a reviewed passage, question groups, checked answers, and copyright confirmation.';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists enforce_published_reading_lesson_readiness on public.lessons;
create trigger enforce_published_reading_lesson_readiness
before insert or update of is_published on public.lessons
for each row execute function public.enforce_published_reading_lesson_readiness();

comment on table public.reading_lesson_data is 'Isolated Reading Studio source of truth for passages, question groups and quality evidence.';
comment on table public.reading_lesson_attempts is 'Immutable student reading-practice submissions.';
