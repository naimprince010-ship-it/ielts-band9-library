create or replace function public.is_speaking_mock_production_ready(payload jsonb)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select
    jsonb_typeof(payload -> 'parts') = 'array'
    and jsonb_array_length(payload -> 'parts') = 3
    and jsonb_typeof(payload #> '{parts,0,questions}') = 'array'
    and jsonb_array_length(payload #> '{parts,0,questions}') > 0
    and not exists (
      select 1 from jsonb_array_elements(payload #> '{parts,0,questions}') question
      where coalesce(nullif(btrim(question ->> 'text'), ''), nullif(btrim(question ->> 'questionText'), '')) is null
    )
    and nullif(btrim(payload #>> '{parts,1,cueCard,topic}'), '') is not null
    and jsonb_typeof(payload #> '{parts,1,cueCard,bulletPoints}') = 'array'
    and jsonb_array_length(payload #> '{parts,1,cueCard,bulletPoints}') > 0
    and jsonb_typeof(payload #> '{parts,2,questions}') = 'array'
    and jsonb_array_length(payload #> '{parts,2,questions}') > 0
    and not exists (
      select 1 from jsonb_array_elements(payload #> '{parts,2,questions}') question
      where coalesce(nullif(btrim(question ->> 'text'), ''), nullif(btrim(question ->> 'questionText'), '')) is null
    );
$$;

revoke all on function public.is_speaking_mock_production_ready(jsonb) from public, anon, authenticated;

update public.mock_tests
set is_published = false
where module_type = 'speaking'
  and is_published = true
  and not public.is_speaking_mock_production_ready(test_data);

create or replace function public.enforce_published_speaking_readiness()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.module_type = 'speaking'
     and new.is_published = true
     and not public.is_speaking_mock_production_ready(new.test_data) then
    raise exception 'Published Speaking tests require Part 1 questions, a Part 2 cue card, and Part 3 questions.';
  end if;
  return new;
end;
$$;

revoke all on function public.enforce_published_speaking_readiness() from public, anon, authenticated;

drop trigger if exists enforce_published_speaking_readiness on public.mock_tests;
create trigger enforce_published_speaking_readiness
before insert or update of module_type, is_published, test_data on public.mock_tests
for each row execute function public.enforce_published_speaking_readiness();
