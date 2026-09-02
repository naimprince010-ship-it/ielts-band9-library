-- Listening Studio owns its audio, transcript and question configuration.
-- public.lessons remains the registry for URL, course access and publishing.

create table if not exists public.listening_lesson_data (
  lesson_id text primary key references public.lessons(id) on delete cascade,
  schema_version integer not null default 1 check (schema_version >= 1),
  lesson_format text not null check (lesson_format in ('skill_lesson', 'section_practice')),
  section_number smallint check (section_number between 1 and 4),
  section_type text not null,
  audio_status text not null default 'pending' check (audio_status in ('pending', 'ready')),
  audio_url text,
  transcript_status text not null default 'draft' check (transcript_status in ('draft', 'reviewed')),
  transcript_cues jsonb not null default '[]'::jsonb check (jsonb_typeof(transcript_cues) = 'array'),
  questions jsonb not null default '[]'::jsonb check (jsonb_typeof(questions) = 'array'),
  quality_report jsonb not null default '{}'::jsonb check (jsonb_typeof(quality_report) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (audio_status <> 'ready' or audio_url ~ '^https://'),
  check (transcript_status <> 'reviewed' or jsonb_array_length(transcript_cues) > 0),
  check (jsonb_array_length(questions) > 0)
);

create index if not exists listening_lesson_data_readiness_idx
  on public.listening_lesson_data (audio_status, transcript_status, updated_at desc);

alter table public.listening_lesson_data enable row level security;

grant select on public.listening_lesson_data to anon, authenticated;
grant insert, update, delete on public.listening_lesson_data to authenticated;

drop policy if exists "Published listening materials are publicly readable" on public.listening_lesson_data;
create policy "Published listening materials are publicly readable"
  on public.listening_lesson_data for select to anon, authenticated
  using (
    exists (
      select 1 from public.lessons
      where lessons.id = listening_lesson_data.lesson_id
        and lessons.is_published = true
    )
  );

drop policy if exists "Staff can manage listening studio data" on public.listening_lesson_data;
create policy "Staff can manage listening studio data"
  on public.listening_lesson_data for all to authenticated
  using (app_private.is_staff())
  with check (app_private.is_staff());

create table if not exists public.listening_lesson_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null references public.lessons(id) on delete cascade,
  question_id text not null,
  submitted_answer text not null check (length(btrim(submitted_answer)) > 0),
  duration_seconds integer not null default 0 check (duration_seconds between 0 and 14400),
  submitted_at timestamptz not null default now()
);

create index if not exists listening_lesson_attempts_user_lesson_idx
  on public.listening_lesson_attempts (user_id, lesson_id, submitted_at desc);

alter table public.listening_lesson_attempts enable row level security;

grant select, insert on public.listening_lesson_attempts to authenticated;

drop policy if exists "Students read their own listening attempts" on public.listening_lesson_attempts;
create policy "Students read their own listening attempts"
  on public.listening_lesson_attempts for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Students create their own listening attempts" on public.listening_lesson_attempts;
create policy "Students create their own listening attempts"
  on public.listening_lesson_attempts for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Staff read listening attempts" on public.listening_lesson_attempts;
create policy "Staff read listening attempts"
  on public.listening_lesson_attempts for select to authenticated
  using (app_private.is_staff());

create or replace function public.enforce_published_listening_lesson_readiness()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.type = 'listening'
     and new.is_published = true
     and (tg_op = 'INSERT' or old.is_published is distinct from new.is_published) then
    if not exists (
      select 1
      from public.listening_lesson_data as data
      where data.lesson_id = new.id
        and data.audio_status = 'ready'
        and data.transcript_status = 'reviewed'
        and jsonb_array_length(data.questions) > 0
        and coalesce((data.quality_report->>'contentReviewed')::boolean, false)
        and coalesce((data.quality_report->>'answersChecked')::boolean, false)
    ) then
      raise exception 'Published Listening lessons require ready HTTPS audio, a reviewed transcript, questions, and completed quality checks.';
    end if;
  end if;
  return new;
end;
$$;

revoke all on function public.enforce_published_listening_lesson_readiness() from public, anon, authenticated;

drop trigger if exists enforce_published_listening_lesson_readiness on public.lessons;
create trigger enforce_published_listening_lesson_readiness
before insert or update of is_published on public.lessons
for each row execute function public.enforce_published_listening_lesson_readiness();

comment on table public.listening_lesson_data is 'Isolated Listening Studio source of truth for audio, transcript, question data and quality evidence.';
comment on table public.listening_lesson_attempts is 'Immutable student submissions for Listening lesson analytics; correctness is evaluated server-side in a later grading step.';
