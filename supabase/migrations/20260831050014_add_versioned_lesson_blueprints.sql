-- Add an explicit lifecycle around versioned JSONB lesson blueprints.
-- Existing lessons remain readable as legacy content until individually migrated.
alter table public.lessons
  add column if not exists blueprint_version integer,
  add column if not exists content_status text not null default 'legacy',
  add column if not exists quality_report jsonb not null default '{}'::jsonb,
  add column if not exists reviewed_at timestamptz,
  add column if not exists reviewed_by uuid references auth.users(id) on delete set null;

alter table public.lessons drop constraint if exists lessons_content_status_check;
alter table public.lessons add constraint lessons_content_status_check
  check (content_status in ('legacy', 'draft', 'in_review', 'approved', 'published', 'archived'));

alter table public.lessons drop constraint if exists lessons_blueprint_version_check;
alter table public.lessons add constraint lessons_blueprint_version_check
  check (blueprint_version is null or blueprint_version >= 1);

create index if not exists lessons_content_status_idx
  on public.lessons (content_status, updated_at desc);

comment on column public.lessons.blueprint_version is 'Version of content.studyBlueprint; null means legacy content.';
comment on column public.lessons.content_status is 'Editorial lifecycle; publishing must follow review and approval.';
comment on column public.lessons.quality_report is 'Machine validation and human review evidence for the current blueprint.';
