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
        and jsonb_array_length(data.question_groups) >= 2
        and coalesce((data.quality_report->>'passageReviewed')::boolean, false)
        and coalesce((data.quality_report->>'questionsReviewed')::boolean, false)
        and coalesce((data.quality_report->>'answersChecked')::boolean, false)
        and coalesce((data.quality_report->>'copyrightConfirmed')::boolean, false)
        and coalesce((data.quality_report->>'skillAlignmentReviewed')::boolean, false)
        and coalesce((data.quality_report->>'difficultyReviewed')::boolean, false)
    ) then
      raise exception 'Published Reading lessons require reviewed passage, questions, answers, originality, skill-topic alignment, and level suitability.';
    end if;
  end if;
  return new;
end;
$$;
