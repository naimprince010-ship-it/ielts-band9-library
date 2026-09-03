import { useState } from 'react';
import { BookOpenCheck, CheckCircle2, CircleAlert, FileText, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { ReadingLessonData } from '@/modules/reading/readingLesson';

const normalise = (value: string) => value.trim().toLocaleLowerCase().replace(/\s+/g, ' ');

export function ReadingLessonExperience({ lessonId, data }: { lessonId: string; data: ReadingLessonData }) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const checkAnswer = async (questionId: string, acceptedAnswers: string[]) => {
    void acceptedAnswers;
    const answer = answers[questionId]?.trim();
    if (!answer) return;
    setSubmitted((current) => ({ ...current, [questionId]: true }));
    if (user && isSupabaseConfigured() && supabase) await supabase.from('reading_lesson_attempts').insert({ user_id: user.id, lesson_id: lessonId, question_id: questionId, submitted_answer: answer, duration_seconds: 0 });
  };

  return <section id="reading-lab" className="scroll-mt-28">
    <Card className="overflow-hidden border-emerald-200 bg-white shadow-sm">
      <CardHeader className="border-b border-emerald-100 bg-[linear-gradient(120deg,#ecfdf5,#eff6ff)]"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white"><FileText className="h-5 w-5" /></span><div><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Reading lab</p><CardTitle className="mt-1 text-xl">Read, locate, then answer</CardTitle></div></div><Badge variant="outline" className="border-emerald-200 bg-white text-emerald-800"><BookOpenCheck className="mr-1.5 h-3.5 w-3.5" /> {data.passageFormat === 'academic' ? 'Academic' : 'General Training'}</Badge></div></CardHeader>
      <CardContent className="space-y-6 p-5 sm:p-6">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7"><h2 className="text-2xl font-black text-slate-950">{data.passageTitle}</h2><div className="mt-6 space-y-5 leading-8 text-slate-700">{data.paragraphs.map((paragraph) => <p key={paragraph.label}><span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-800">{paragraph.label}</span>{paragraph.content}</p>)}</div></article>
        <div className="space-y-5">{data.questionGroups.map((group, groupIndex) => <div key={group.id} className="rounded-2xl border border-slate-200 p-4 sm:p-5"><div className="mb-4"><p className="text-xs font-black uppercase tracking-widest text-emerald-700">Question set {groupIndex + 1}</p><p className="mt-1 font-bold text-slate-900">{group.instructions}</p></div>{group.strategy && <aside className="mb-4 rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm text-sky-950"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-black">Strategy: {group.strategy.focus.map((focus) => focus.replaceAll('_', ' ')).join(' + ')}</p><Badge className="bg-sky-700">Suggested time: {Math.ceil(group.strategy.suggestedSeconds / 60)} min</Badge></div><ol className="mt-2 list-decimal space-y-1 pl-5">{group.strategy.steps.map((step) => <li key={step}>{step}</li>)}</ol></aside>}<div className="space-y-4">{group.questions.map((question, index) => { const answer = answers[question.id] || ''; const isSubmitted = submitted[question.id]; const isCorrect = isSubmitted && question.acceptedAnswers.map(normalise).includes(normalise(answer)); return <div key={question.id} className="rounded-xl bg-slate-50 p-4"><p className="font-bold text-slate-900">{index + 1}. {question.prompt}</p>{question.options?.length ? <div className="mt-3 grid gap-2">{question.options.map((option) => <label key={option} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"><input type="radio" name={question.id} checked={answer === option} disabled={isSubmitted} onChange={() => setAnswers((current) => ({ ...current, [question.id]: option }))} />{option}</label>)}</div> : <Input className="mt-3 bg-white" value={answer} disabled={isSubmitted} placeholder="Type your answer" onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))} />}{isSubmitted ? <div className={isCorrect ? 'mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-950' : 'mt-3 rounded-lg bg-rose-50 p-3 text-sm text-rose-950'}><p className="flex items-center gap-2 font-bold">{isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}{isCorrect ? 'Correct' : `Check: ${question.acceptedAnswers.join(' / ')}`}</p><p className="mt-1 leading-6">{question.explanation}</p></div> : <Button type="button" size="sm" className="mt-3 bg-emerald-600 font-bold hover:bg-emerald-700" disabled={!answer.trim()} onClick={() => checkAnswer(question.id, question.acceptedAnswers)}>Check answer</Button>}</div>; })}</div></div>)}</div>
        {!user && <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950"><CircleAlert className="h-5 w-5 shrink-0 text-amber-600" />Sign in to save your answers and progress.</div>}
      </CardContent>
    </Card>
  </section>;
}
