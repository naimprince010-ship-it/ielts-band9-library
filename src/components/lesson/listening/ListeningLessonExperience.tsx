import { useEffect, useRef, useState } from 'react';
import { AudioLines, CheckCircle2, Clock3, Headphones, Play, Square, Volume2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { ListeningLessonData } from '@/modules/listening/listeningLesson';

function normalise(value: string) {
  return value.trim().toLocaleLowerCase().replace(/\s+/g, ' ');
}

export function ListeningLessonExperience({ lessonId, data }: { lessonId: string; data: ListeningLessonData }) {
  const { user } = useAuth();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [isSavingAttempt, setIsSavingAttempt] = useState<string | null>(null);
  const [isBrowserReading, setIsBrowserReading] = useState(false);
  const [browserCueIndex, setBrowserCueIndex] = useState<number | null>(null);
  const supportsBrowserAudio = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const hasApprovedAudio = data.audio.status === 'ready' && Boolean(data.audio.url);

  const activeCue = browserCueIndex !== null
    ? data.transcript.cues[browserCueIndex]
    : data.transcript.cues.find((cue) => currentTime >= cue.startSeconds && currentTime < cue.endSeconds);

  useEffect(() => () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  const stopBrowserReading = () => {
    window.speechSynthesis.cancel();
    setIsBrowserReading(false);
    setBrowserCueIndex(null);
  };

  const readTranscriptFrom = (index: number) => {
    const cue = data.transcript.cues[index];
    if (!cue) {
      setIsBrowserReading(false);
      setBrowserCueIndex(null);
      return;
    }
    setIsBrowserReading(true);
    setBrowserCueIndex(index);
    setCurrentTime(cue.startSeconds);
    const utterance = new SpeechSynthesisUtterance(`${cue.speaker ? `${cue.speaker}. ` : ''}${cue.text}`);
    utterance.lang = 'en-GB';
    utterance.rate = 0.88;
    utterance.onend = () => readTranscriptFrom(index + 1);
    utterance.onerror = () => {
      setIsBrowserReading(false);
      setBrowserCueIndex(null);
    };
    window.speechSynthesis.speak(utterance);
  };

  const submitAnswer = async (questionId: string) => {
    const submittedAnswer = answers[questionId]?.trim();
    if (!submittedAnswer) return;
    setSubmitted((previous) => ({ ...previous, [questionId]: true }));
    if (!user || !isSupabaseConfigured() || !supabase) return;
    setIsSavingAttempt(questionId);
    await supabase.from('listening_lesson_attempts').insert({
      user_id: user.id,
      lesson_id: lessonId,
      question_id: questionId,
      submitted_answer: submittedAnswer,
      duration_seconds: Math.round(audioRef.current?.currentTime || 0),
    });
    setIsSavingAttempt(null);
  };

  return (
    <section id="listening-lab" className="scroll-mt-28">
      <Card className="overflow-hidden border-sky-200 bg-white shadow-sm">
        <CardHeader className="border-b border-sky-100 bg-[linear-gradient(120deg,#eff6ff,#f5f3ff)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-600 text-white"><Headphones className="h-5 w-5" /></span><div><p className="text-xs font-black uppercase tracking-[0.16em] text-sky-700">Listening lab</p><CardTitle className="mt-1 text-xl">Listen, predict, then answer</CardTitle></div></div>
            <Badge variant="outline" className="border-sky-200 bg-white text-sky-800"><Clock3 className="mr-1.5 h-3.5 w-3.5" /> Section {data.sectionNumber ?? 'skill'}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-5 sm:p-6">
          {hasApprovedAudio ? (
            <div className="rounded-2xl bg-slate-950 p-4 text-white sm:p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold"><AudioLines className="h-4 w-4 text-sky-300" /> Approved lesson audio</div>
              <audio ref={audioRef} controls className="w-full" src={data.audio.url} onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)} />
              <p className="mt-3 text-xs text-slate-300">Use the transcript only to check meaning after you have attempted the question.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4 text-violet-950 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex gap-3"><Volume2 className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" /><div><p className="font-black">Browser audio practice</p><p className="mt-1 max-w-2xl text-sm leading-6">This lesson uses your browser’s English voice to read the reviewed transcript. A recorded instructor audio file can be added later for the final Listening experience.</p></div></div>
                {supportsBrowserAudio ? (
                  <Button type="button" onClick={() => isBrowserReading ? stopBrowserReading() : readTranscriptFrom(0)} className="shrink-0 bg-violet-600 font-bold hover:bg-violet-700">
                    {isBrowserReading ? <><Square className="mr-2 h-4 w-4" /> Stop audio</> : <><Play className="mr-2 h-4 w-4" /> Play browser audio</>}
                  </Button>
                ) : <p className="text-sm font-semibold text-violet-800">Browser voice is not available on this device.</p>}
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-2"><Play className="h-4 w-4 text-violet-600" /><p className="text-sm font-black text-slate-900">Live transcript cue</p></div>
            {activeCue ? <p className="leading-7 text-slate-700">{activeCue.speaker && <span className="mr-2 font-black text-violet-700">{activeCue.speaker}:</span>}{activeCue.text}</p> : <p className="text-sm leading-6 text-slate-500">Start the audio to see the current transcript cue. This prevents reading ahead.</p>}
          </div>

          <div className="space-y-4">
            {data.questions.map((question, index) => {
              const answer = answers[question.id] || '';
              const isSubmitted = submitted[question.id];
              const isCorrect = isSubmitted && question.acceptedAnswers.map(normalise).includes(normalise(answer));
              return <div key={question.id} className="rounded-2xl border border-slate-200 p-4 sm:p-5"><div className="flex items-start gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-violet-100 text-xs font-black text-violet-700">{index + 1}</span><div className="min-w-0 flex-1"><p className="font-bold leading-6 text-slate-900">{question.prompt}</p>{question.options?.length ? <div className="mt-3 grid gap-2">{question.options.map((option) => <label key={option} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium"><input type="radio" name={question.id} value={option} checked={answer === option} disabled={Boolean(isSubmitted)} onChange={() => setAnswers((previous) => ({ ...previous, [question.id]: option }))} />{option}</label>)}</div> : <Input value={answer} disabled={Boolean(isSubmitted)} onChange={(event) => setAnswers((previous) => ({ ...previous, [question.id]: event.target.value }))} className="mt-3" placeholder="Type your answer" />}{isSubmitted ? <div className={isCorrect ? 'mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-950' : 'mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-950'}><div className="flex items-center gap-2 font-bold">{isCorrect ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <XCircle className="h-4 w-4 text-rose-600" />}{isCorrect ? 'Correct' : `Check: ${question.acceptedAnswers.join(' / ')}`}</div><p className="mt-2 leading-6">{question.explanation}</p></div> : <Button type="button" size="sm" disabled={!answer.trim() || isSavingAttempt === question.id} onClick={() => submitAnswer(question.id)} className="mt-4 bg-violet-600 font-bold hover:bg-violet-700">{isSavingAttempt === question.id ? 'Saving…' : 'Check answer'}</Button>}</div></div></div>;
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
