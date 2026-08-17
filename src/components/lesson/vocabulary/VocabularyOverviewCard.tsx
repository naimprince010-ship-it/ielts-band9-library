import { ArrowRight, BookOpen, CheckCircle, Lightbulb, Mic, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VocabularyOverviewCardProps {
  targetLevel: string;
  whatYouWillLearn: string[];
}

/**
 * "What You Will Learn" section for the vocabulary workspace template.
 * Same layout as `WritingOverviewCard`/`GrammarOverviewCard`, with a
 * vocabulary-flavored path strip: Learn -> Apply -> Speak -> Master,
 * matching the same four sections `VocabularyHero`'s path strip points to.
 * Always rendered — `whatYouWillLearn` and `targetLevel` are required
 * `LessonContent` fields.
 */
export function VocabularyOverviewCard({ targetLevel, whatYouWillLearn }: VocabularyOverviewCardProps) {
  const pathSteps = [
    { label: 'Learn', hint: 'Understand the meaning and usage', icon: BookOpen, tone: 'from-blue-500 to-indigo-500' },
    { label: 'Apply', hint: 'See it used in real IELTS sentences', icon: Sparkles, tone: 'from-indigo-500 to-violet-500' },
    { label: 'Speak', hint: 'Practice saying it out loud', icon: Mic, tone: 'from-violet-500 to-fuchsia-500' },
    { label: 'Master', hint: 'Fix common mistakes, then recap', icon: CheckCircle, tone: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <Card className="mb-6 overflow-hidden border-blue-100 bg-white shadow-sm" id="what-you-will-learn">
      <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-white via-blue-50/50 to-violet-50/70">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Section 01</p>
            <CardTitle className="mt-1 flex items-center gap-2 text-slate-950">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Your learning path
            </CardTitle>
          </div>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            Target: {targetLevel}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 p-5">
        <div className="grid gap-3 md:grid-cols-4">
          {pathSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="relative rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <div className={`mb-3 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br ${step.tone} text-white shadow-sm`}>
                  <Icon className="h-4 w-4" />
                </div>
                <p className="font-black text-slate-950">{step.label}</p>
                <p className="mt-1 text-sm leading-5 text-slate-600">{step.hint}</p>
                {index < pathSteps.length - 1 && (
                  <ArrowRight className="absolute right-3 top-4 hidden h-4 w-4 text-slate-300 md:block" />
                )}
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.12em] text-blue-700">By the end of this lesson</p>
          <ul className="grid gap-2 md:grid-cols-2">
            {whatYouWillLearn.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                <span className="text-sm leading-6 text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
