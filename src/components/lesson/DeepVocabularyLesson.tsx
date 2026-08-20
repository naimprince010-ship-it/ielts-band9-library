import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Check, CheckCircle2, CircleHelp, Copy, Lightbulb, PenLine, RotateCcw, Sparkles, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SpeakButton } from '@/components/ui/SpeakButton';
import { useNavConfig } from '@/contexts/NavContext';
import { cn } from '@/lib/utils';

import { DeepVocabularyLessonData } from '@/data/deepVocabularyLessons';

export type DeepVocabularyLessonProps = {
  title: string;
  targetLevel: string;
  learningPoints: string[];
  data: DeepVocabularyLessonData;
};

function LessonChip({ complete, label }: { complete: boolean; label: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold',
        complete
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-slate-200 bg-white text-slate-600',
      )}
    >
      {complete ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="h-2 w-2 rounded-full bg-slate-300" />}
      {label}
    </span>
  );
}

function CopyPhrase({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        copied
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-indigo-100 bg-white text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50',
      )}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copied' : text}
    </button>
  );
}

function LearningPathStep({
  number,
  title,
  description,
  complete,
  tone,
}: {
  number: number;
  title: string;
  description: string;
  complete: boolean;
  tone: string;
}) {
  return (
    <div className="relative flex min-w-0 items-start gap-3">
      <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-black text-white shadow-sm', tone)}>
        {complete ? <Check className="h-4 w-4" /> : number}
      </span>
      <div>
        <p className="text-sm font-black uppercase tracking-wide text-white">{title}</p>
        <p className="mt-1 text-sm leading-5 text-indigo-100">{description}</p>
      </div>
    </div>
  );
}

export function DeepVocabularyLesson({ title, targetLevel, learningPoints, data }: DeepVocabularyLessonProps) {
  const { words, quickDecisionRules, checks, modelAnswer, modelAnswerSegments, modelBreakdown, memoryTip, contrastTip, applyPrompt, applyHint } = data;
  const [activeWord, setActiveWord] = useState(0);
  const [activeCheck, setActiveCheck] = useState(0);
  const [choice, setChoice] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [studentResponse, setStudentResponse] = useState('');
  const [showModel, setShowModel] = useState(false);

  const word = words[activeWord];
  const completedChecks = Object.keys(checked).length;
  const correctChecks = useMemo(
    () => checks.filter((item, index) => checked[index] && choice[index] === item.correct).length,
    [checked, choice],
  );
  const progress = Math.round(
    ((activeWord + 1 + completedChecks + (showModel ? 1 : 0)) / (words.length + checks.length + 1)) * 100,
  );

  const currentCheck = checks[activeCheck];
  const currentChoice = choice[activeCheck];
  const currentChecked = Boolean(checked[activeCheck]);
  const isCorrect = currentChoice === currentCheck.correct;

  const resetPractice = () => {
    setChoice({});
    setChecked({});
    setActiveCheck(0);
    setShowModel(false);
    setStudentResponse('');
  };

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Same "call useNavConfig from inside the component" pattern every other
  // lesson template (Grammar/Writing/Vocabulary) already uses — this is what
  // lets Navbar drop its old pathname-sniffing stand-in for this one lesson.
  useNavConfig({ mode: 'focused', title, headerVariant: 'studentApp' });

  return (
    <div className="mb-8 min-w-0 space-y-5 sm:space-y-6">
        <section className="scroll-mt-28 overflow-hidden rounded-2xl border border-indigo-100/80 bg-white shadow-sm shadow-indigo-100/30" id="what-you-will-learn">
          <div className="bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_30%),radial-gradient(circle_at_top_right,#e0e7ff,transparent_36%),linear-gradient(135deg,#ffffff_0%,#f8fbff_46%,#eef2ff_100%)] p-4 sm:p-6">
          <div className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#0b122e_0%,#181c4d_56%,#33217a_100%)] p-4 shadow-xl shadow-indigo-900/20 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-300">Your learning path</p>
              <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-100">Focused lesson</span>
            </div>
            <div className="mt-4 grid gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
              <LearningPathStep number={1} title="Learn" description="Understand the meaning, grammar and usage." complete={activeWord === words.length - 1} tone="bg-blue-600" />
              <div className="hidden h-px bg-indigo-300/40 md:block" />
              <LearningPathStep number={2} title="Check" description="Test yourself with an interactive quiz." complete={completedChecks === checks.length} tone="bg-violet-600" />
              <div className="hidden h-px bg-indigo-300/40 md:block" />
              <LearningPathStep number={3} title="Apply" description="Use the words in an IELTS-style task." complete={showModel} tone="bg-emerald-600" />
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-indigo-200">Overall progress</p>
                <p className="mt-1 text-lg font-black text-white">{progress}%</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-indigo-200">Quiz score</p>
                <p className="mt-1 text-lg font-black text-white">{correctChecks}/{checks.length}</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-indigo-200">Active word</p>
                <p className="mt-1 text-lg font-black capitalize text-white">{word.word}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-3.5 shadow-inner shadow-black/10 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-sky-200">Today&apos;s focus</p>
                  <p className="mt-1 text-sm leading-6 text-indigo-50">Compare 4 words, solve the quiz, then write one precise Band 8 sentence.</p>
                </div>
                <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-indigo-100">
                  <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1">4 words</span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1">3 steps</span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1">8-12 min</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:mt-5 sm:gap-3">
            <Button className="h-10 rounded-xl bg-indigo-600 px-4 font-semibold shadow-sm shadow-indigo-600/20 hover:bg-indigo-700" onClick={() => jumpTo('core-explanation')}>
              Go to Learn <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-10 rounded-xl border-slate-200 bg-white text-slate-700 hover:bg-slate-50" onClick={() => jumpTo('examples')}>
              Start Quiz
            </Button>
            <span className="text-xs font-medium text-slate-500">Step 1 leads into the compare grid below.</span>
          </div>
          </div>
        </section>

        <nav
          aria-label="Lesson steps"
          className="sticky top-16 z-30 flex items-center gap-1 overflow-x-auto rounded-xl border border-slate-200/90 bg-white/95 p-1.5 shadow-sm backdrop-blur lg:hidden"
        >
          {[
            { href: '#core-explanation', label: 'Learn', complete: activeWord === words.length - 1 },
            { href: '#examples', label: `Check ${completedChecks ? `${correctChecks}/${completedChecks}` : ''}`, complete: completedChecks === checks.length },
            { href: '#mini-practice', label: 'Apply', complete: showModel },
          ].map((step) => (
            <a
              key={step.href}
              href={step.href}
              className="flex min-h-10 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700"
            >
              {step.complete ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <span className="h-2 w-2 rounded-full bg-slate-300" />}
              {step.label}
            </a>
          ))}
        </nav>

        <section className="scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm" id="compare-four-words" aria-labelledby="compare-four-words-title">
          <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50/90 via-white to-indigo-50/45 p-4 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">Compare first</p>
                <span className="rounded-full border border-indigo-100 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-700">4-word matrix</span>
                <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700">Quick distinction</span>
              </div>
              <h2 id="compare-four-words" className="mt-2 text-xl font-black tracking-tight text-slate-950 sm:text-[1.35rem]">
                Compare the 4 words
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-[0.95rem]">
                Start with the big picture, then use the matrix to compare grammar, patterns, examples and common confusion.
              </p>
            </div>
            <Button variant="outline" className="rounded-xl border-indigo-100 bg-white text-indigo-700 hover:bg-indigo-50 lg:shrink-0" onClick={() => jumpTo('core-explanation')}>
              Go to Learn <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          </div>

          <div className="grid gap-3 border-b border-slate-100 p-4 sm:p-6 lg:grid-cols-4">
            {words.map((item, index) => (
              <article
                key={`instant-${item.word}`}
                className={cn('rounded-2xl border bg-gradient-to-b from-white to-slate-50/60 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md', item.accent.border)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                        {index + 1}/4
                      </span>
                      <p className={cn('text-xs font-black uppercase tracking-[0.16em]', item.accent.heading)}>{item.word}</p>
                    </div>
                    <h3 className="mt-3 text-xl font-black leading-tight text-slate-950">{item.instant}</h3>
                  </div>
                  <span className={cn('rounded-full px-2.5 py-1 text-xs font-bold shadow-sm', item.accent.badge)}>{item.grammarRole}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{item.meaning}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-3 p-4 sm:p-6 lg:hidden">
            {words.map((item) => (
              <article
                key={item.word}
                className={cn(
                  'overflow-hidden rounded-2xl border shadow-sm ring-1 transition hover:-translate-y-0.5 hover:shadow-md',
                  item.accent.border,
                  item.accent.surface,
                  item.accent.ring,
                )}
              >
                <div className="flex items-start justify-between gap-3 border-b border-white/80 bg-white/70 p-4">
                  <div>
                    <span className="inline-flex rounded-full border border-white/70 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      {words.indexOf(item) + 1}/4
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{item.word}</h3>
                    <span className={cn('mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-bold', item.accent.badge)}>
                      {item.grammarRole}
                    </span>
                  </div>
                  <SpeakButton text={`${item.word}. ${item.example}`} size="sm" className="rounded-full bg-white text-slate-700 hover:bg-slate-100" />
                </div>

                <dl className="contents text-sm leading-6 text-slate-700">
                  <div className="border-b border-white/80 p-4">
                    <dt className={cn('text-[11px] font-bold uppercase tracking-[0.15em]', item.accent.heading)}>When to use it</dt>
                    <dd className="mt-1">{item.clue}</dd>
                  </div>
                  <div className="border-b border-white/80 bg-white/35 p-4">
                    <dt className={cn('text-[11px] font-bold uppercase tracking-[0.15em]', item.accent.heading)}>Common pattern</dt>
                    <dd className="mt-1 font-mono text-xs text-slate-800">{item.pattern}</dd>
                  </div>
                  <div className="border-b border-white/80 p-4">
                    <dt className={cn('text-[11px] font-bold uppercase tracking-[0.15em]', item.accent.heading)}>IELTS example</dt>
                    <dd className="mt-1 rounded-lg bg-white/60 p-3 text-slate-800">{item.example}</dd>
                  </div>
                  <div className="bg-white/35 p-4">
                    <dt className={cn('text-[11px] font-bold uppercase tracking-[0.15em]', item.accent.heading)}>Do not confuse with</dt>
                    <dd className="mt-1">{item.warning}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="hidden p-4 sm:p-6 lg:block">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="grid grid-cols-4 divide-x divide-slate-200">
                {words.map((item, index) => (
                  <div key={item.word} className={cn('p-4 transition-colors hover:bg-white', item.accent.surface)}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="inline-flex rounded-full border border-white/70 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                          {index + 1}/4
                        </span>
                        <h3 className="text-lg font-bold text-slate-900">{item.word}</h3>
                        <span className={cn('mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-bold', item.accent.badge)}>
                          {item.grammarRole}
                        </span>
                      </div>
                      <SpeakButton text={`${item.word}. ${item.example}`} size="sm" className="rounded-full bg-white text-slate-700 hover:bg-slate-100" />
                    </div>
                  </div>
                ))}
              </div>

              {[
                {
                  label: 'When to use it',
                  value: (item: typeof words[number]) => item.clue,
                  cellClass: '',
                },
                {
                  label: 'Common pattern',
                  value: (item: typeof words[number]) => item.pattern,
                  cellClass: 'font-mono text-xs text-slate-800',
                },
                {
                  label: 'IELTS example',
                  value: (item: typeof words[number]) => item.example,
                  cellClass: 'rounded-lg bg-white/65 p-3 text-slate-800',
                },
                {
                  label: 'Do not confuse with',
                  value: (item: typeof words[number]) => item.warning,
                  cellClass: '',
                },
              ].map((row, rowIndex) => (
                <div
                  key={row.label}
                  className={cn(
                    'grid grid-cols-4 divide-x divide-slate-200 border-t border-slate-200',
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/60',
                  )}
                >
                  {words.map((item) => (
                    <div key={`${row.label}-${item.word}`} className={cn('p-4', item.accent.surface)}>
                      <p className={cn('text-[11px] font-bold uppercase tracking-[0.15em]', item.accent.heading)}>{row.label}</p>
                      <p className={cn('mt-2 text-sm leading-6 text-slate-700', row.cellClass)}>{row.value(item)}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 border-t border-slate-100 p-4 sm:p-6 md:grid-cols-2">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-200 text-amber-900">
                  <Lightbulb className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.15em] text-amber-800">{memoryTip.title}</p>
                  <p className="mt-2 text-sm leading-6 text-amber-950" dangerouslySetInnerHTML={{ __html: memoryTip.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-indigo-100 text-indigo-700">
                  <BookOpen className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.15em] text-indigo-700">{contrastTip.title}</p>
                  <p className="mt-2 text-sm leading-6 text-indigo-950" dangerouslySetInnerHTML={{ __html: contrastTip.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="scroll-mt-28 overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm shadow-indigo-100/30" id="core-explanation">
          <div className="h-2 bg-gradient-to-r from-indigo-600 via-violet-500 to-sky-500" />
          <div className="bg-gradient-to-b from-indigo-50/80 to-white p-4 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm">
                <BookOpen className="h-5 w-5" />
              </span>
              <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">Step 1 of 3 - Learn the distinction</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">Choose one word at a time</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Each word has a different grammar role. Tap a tab, read the decision clue, then listen to the example.
              </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label="Vocabulary words">
            {words.map((item, index) => (
              <button
                type="button"
                role="tab"
                key={item.word}
                aria-selected={activeWord === index}
                onClick={() => setActiveWord(index)}
                className={cn(
                  'rounded-lg border px-3 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                  activeWord === index
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50',
                )}
              >
                <span className="block text-base font-bold">{item.word}</span>
                <span className={cn('mt-1 block text-xs', activeWord === index ? 'text-indigo-100' : 'text-slate-500')}>{item.part}</span>
              </button>
            ))}
          </div>

          <article className={cn('mt-4 overflow-hidden rounded-2xl border shadow-sm shadow-slate-200/60', word.accent.border, word.accent.surface)}>
            <div className="border-b border-white/80 bg-white/75 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className={cn('text-xs font-bold uppercase tracking-[0.14em]', word.accent.heading)}>{word.part}</p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">{word.word}</h3>
              </div>
              <SpeakButton text={`${word.word}. ${word.example}`} size="sm" className="rounded-full bg-white text-indigo-700 hover:bg-indigo-100" />
            </div>
            </div>
            <div className="p-4 sm:p-5">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white/80 bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Use it when you mean</p>
                <p className="mt-2 font-medium leading-6 text-slate-800">{word.meaning}</p>
              </div>
              <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Decision clue</p>
                <p className="mt-2 leading-6 text-amber-950">{word.clue}</p>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-white/80 bg-white/80 p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">When IELTS students use it</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {word.useCases.map((item) => (
                  <span key={item} className={cn('rounded-full px-3 py-1.5 text-xs font-bold', word.accent.badge)}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-white/80 bg-white/80 p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Grammar pattern</p>
              <p className="mt-2 font-mono text-sm text-slate-800">{word.pattern}</p>
            </div>
            <p className="mt-4 rounded-xl border-l-4 border-indigo-400 bg-white/75 p-3.5 font-serif text-base italic leading-7 text-slate-800 sm:p-4 sm:text-lg sm:leading-8">{word.example}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/80 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Why this works</p>
                <p className="mt-2 text-sm leading-6 text-emerald-950">{word.why}</p>
              </div>
              <div className="rounded-xl border border-rose-100 bg-rose-50/80 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-rose-700">Common mistake</p>
                <p className="mt-2 text-sm leading-6 text-rose-950">
                  <span className="font-semibold">Wrong:</span> {word.mistake.wrong}
                </p>
                <p className="mt-1 text-sm leading-6 text-emerald-950">
                  <span className="font-semibold">Right:</span> {word.mistake.right}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <CopyPhrase text={word.phrase} />
            </div>
            </div>
          </article>
          <div className="mt-5 flex justify-end">
            <Button className="h-10 rounded-xl bg-indigo-600 px-4 font-semibold hover:bg-indigo-700" onClick={() => jumpTo('examples')}>
              Continue to Check <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          </div>
        </section>

        <section className="scroll-mt-28 overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm shadow-violet-100/30" id="examples">
          <div className="h-2 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-500" />
          <div className="bg-gradient-to-b from-violet-50/80 to-white p-4 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-600 text-white shadow-sm">
                <CircleHelp className="h-5 w-5" />
              </span>
              <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-violet-600">Step 2 of 3 - Check your choice</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">Do not memorise. Decide.</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Pick an answer first. The feedback explains the grammar logic, not just the correct option.
              </p>
              </div>
            </div>
            <span className="rounded-full bg-violet-50 px-3 py-1.5 text-sm font-bold text-violet-700">
              Question {activeCheck + 1} of {checks.length}
            </span>
          </div>

          <article
            className={cn(
              'mt-5 rounded-xl border p-4 sm:mt-6 sm:p-6',
              currentChecked && isCorrect
                ? 'border-emerald-200 bg-emerald-50/60'
                : currentChecked
                  ? 'border-rose-200 bg-rose-50/60'
                  : 'border-slate-200 bg-slate-50/40',
            )}
          >
            <p className="font-semibold leading-7 text-slate-800">
              <span className="mr-2 text-indigo-600">{activeCheck + 1}.</span>
              {currentCheck.prompt}
            </p>
            <div className="mt-4 grid gap-2" role="radiogroup" aria-label={currentCheck.prompt}>
              {currentCheck.options.map((option) => {
                const selected = currentChoice === option;
                const optionCorrect = option === currentCheck.correct;
                return (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    key={option}
                    disabled={currentChecked}
                    onClick={() => setChoice((current) => ({ ...current, [activeCheck]: option }))}
                    className={cn(
                      'flex min-h-11 items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:px-4 sm:py-3',
                      currentChecked && optionCorrect && 'border-emerald-500 bg-emerald-100 text-emerald-950 shadow-sm shadow-emerald-100/70',
                      currentChecked && selected && !optionCorrect && 'border-rose-400 bg-rose-100 text-rose-950 shadow-sm shadow-rose-100/70',
                      !currentChecked && selected && 'border-indigo-500 bg-indigo-50 text-indigo-950 shadow-sm shadow-indigo-100/70',
                      !currentChecked && !selected && 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40',
                    )}
                  >
                    {currentChecked && optionCorrect ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    ) : currentChecked && selected ? (
                      <XCircle className="h-4 w-4 shrink-0 text-rose-700" />
                    ) : (
                      <span className={cn('grid h-4 w-4 shrink-0 place-items-center rounded-full border', selected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300')}>
                        {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </span>
                    )}
                    {option}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                className="h-10 rounded-xl bg-indigo-600 px-4 font-semibold hover:bg-indigo-700"
                size="sm"
                disabled={!currentChoice || currentChecked}
                onClick={() => setChecked((current) => ({ ...current, [activeCheck]: true }))}
              >
                Check answer
              </Button>
              {currentChecked && activeCheck < checks.length - 1 && (
                <Button variant="outline" size="sm" className="h-10 rounded-xl border-indigo-200 bg-white px-4 text-indigo-700 hover:bg-indigo-50" onClick={() => setActiveCheck(activeCheck + 1)}>
                  Next question <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
            {currentChecked && (
              <div className={cn('mt-4 flex gap-3 rounded-lg p-3 text-sm leading-6', isCorrect ? 'bg-emerald-100 text-emerald-950' : 'bg-rose-100 text-rose-950')}>
                <CircleHelp className="mt-0.5 h-4 w-4 shrink-0" />
                {currentCheck.explanation}
              </div>
            )}
          </article>

          <div className="mt-4 flex gap-2" aria-label="Practice question navigation">
            {checks.map((item, index) => (
              <button
                type="button"
                key={item.prompt}
                onClick={() => setActiveCheck(index)}
                className={cn(
                  'h-9 min-w-9 rounded-lg border text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                  index === activeCheck
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : checked[index]
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-300',
                )}
              >
                {index + 1}
              </button>
            ))}
          </div>
          {completedChecks === checks.length && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[linear-gradient(135deg,#0f172a_0%,#1e1b4b_100%)] p-4 text-white shadow-lg shadow-slate-900/20">
              <p className="text-sm">
                You scored <strong>{correctChecks}/{checks.length}</strong>. Review any red feedback, then use the phrase in your own sentence.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="secondary" onClick={resetPractice}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Try again
                </Button>
                <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700" onClick={() => jumpTo('mini-practice')}>
                  Continue to Apply
                </Button>
              </div>
            </div>
          )}
          </div>
        </section>

        <section className="scroll-mt-28 overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm shadow-emerald-100/40" id="mini-practice">
          <div className="h-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-500" />
          <div className="bg-gradient-to-b from-emerald-50/80 to-white p-4 sm:p-7">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <PenLine className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">Step 3 of 3 - Apply it in IELTS</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">Write one precise Band 8 style sentence</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
                Use one precise noun or verb and one strong collocation. Reveal the model only after trying your own answer.
              </p>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="font-semibold text-slate-900">Prompt: {applyPrompt}</p>
            <p className="mt-3 text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: applyHint.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            <textarea
              value={studentResponse}
              onChange={(event) => setStudentResponse(event.target.value)}
              className="mt-4 min-h-32 w-full resize-y rounded-xl border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              placeholder="Write your sentence here..."
              aria-label="Your IELTS practice sentence"
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                className="h-10 rounded-xl border-emerald-300 bg-white px-4 font-semibold text-emerald-800 hover:bg-emerald-100"
                onClick={() => setShowModel((value) => !value)}
              >
                {showModel ? 'Hide model response' : 'Reveal a Band 8 model'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <span className="text-xs font-medium text-slate-500">{studentResponse.trim().split(/\s+/).filter(Boolean).length} words written</span>
            </div>
            {showModel && (
              <div className="mt-4 rounded-xl border border-emerald-200 border-l-4 bg-emerald-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Band 8 model</p>
                    <p className="mt-2 font-serif text-lg leading-8 text-slate-800">
                      {modelAnswerSegments.map((segment, idx) => (
                        segment.highlightClass ? (
                          <mark key={idx} className={segment.highlightClass}>{segment.text}</mark>
                        ) : (
                          <span key={idx}>{segment.text}</span>
                        )
                      ))}
                    </p>
                  </div>
                  <SpeakButton text={modelAnswer} size="sm" className="rounded-full bg-white text-emerald-700 hover:bg-emerald-100" />
                </div>
                <div className="mt-4 grid gap-2 text-sm leading-6 text-emerald-950 md:grid-cols-3">
                  {modelBreakdown.map((item, idx) => (
                    <div key={idx} className="rounded-lg bg-white/80 p-3">
                      <strong>{item.term}</strong> = {item.text}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {showModel && (
            <div className="mt-5 rounded-xl border border-emerald-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">Next step</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Now open the extra practice below only if you want more examples. Otherwise, mark the lesson complete.
              </p>
            </div>
          )}
          </div>
        </section>
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <span>Lesson progress</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-slate-100">
          <div className="h-2 rounded-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
