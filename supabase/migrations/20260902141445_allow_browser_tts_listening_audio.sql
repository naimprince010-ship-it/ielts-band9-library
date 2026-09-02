-- Browser Text-to-Speech is an intentional, reviewable audio delivery mode.
-- It lets early-stage Listening lessons use a reviewed transcript without a hosted audio URL.

alter table public.listening_lesson_data
  drop constraint if exists listening_lesson_data_audio_status_check,
  drop constraint if exists listening_lesson_data_check;

alter table public.listening_lesson_data
  add constraint listening_lesson_data_audio_status_check
    check (audio_status in ('pending', 'ready', 'browser_tts')),
  add constraint listening_lesson_data_ready_url_check
    check (audio_status <> 'ready' or audio_url ~ '^https://'),
  add constraint listening_lesson_data_browser_tts_no_url_check
    check (audio_status <> 'browser_tts' or audio_url is null);

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
        and (
          (data.audio_status = 'ready' and data.audio_url ~ '^https://')
          or data.audio_status = 'browser_tts'
        )
        and data.transcript_status = 'reviewed'
        and jsonb_array_length(data.questions) > 0
        and coalesce((data.quality_report->>'contentReviewed')::boolean, false)
        and coalesce((data.quality_report->>'answersChecked')::boolean, false)
    ) then
      raise exception 'Published Listening lessons require approved recorded audio or Browser TTS, a reviewed transcript, questions, and completed quality checks.';
    end if;
  end if;
  return new;
end;
$$;
