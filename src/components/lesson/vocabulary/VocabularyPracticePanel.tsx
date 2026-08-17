import { AlertTriangle, CheckCircle2, ListChecks, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MistakeFlipCard } from '@/components/ui/FlipCard';
import { InteractivePractice } from '@/components/ui/InteractivePractice';

interface VocabularyPracticePanelProps {
  commonMistakes: { mistake: string; correction: string; explanation: string }[];
  miniPractice: { question: string; options?: string[]; type: 'fill-blank' | 'multiple-choice' | 'rewrite' }[];
  answerKey: string[];
  quickRecap: string;
}

/**
 * "Practice & Recap" accordion for the vocabulary workspace template — same
 * structure as `WritingPracticePanel`/`GrammarPracticePanel`
 * (MistakeFlipCard grid, InteractivePractice wired to answerKey by index,
 * closing recap card), since `commonMistakes`/`miniPractice`/`answerKey`/
 * `quickRecap` are identical required `LessonContent` shapes for every
 * lesson type. Always rendered.
 */
export function VocabularyPracticePanel({ commonMistakes, miniPractice, answerKey, quickRecap }: VocabularyPracticePanelProps) {
  return (
    <Accordion type="single" collapsible defaultValue="extra-practice" className="mb-6">
      <AccordionItem value="extra-practice" className="scroll-mt-28 overflow-hidden rounded-2xl border border-amber-100 bg-white px-0 shadow-sm">
        <AccordionTrigger className="bg-gradient-to-r from-amber-50 via-white to-blue-50 px-5 py-4 text-left hover:no-underline">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-100 text-amber-700">
              <ListChecks className="h-5 w-5" />
            </span>
            <div>
              <p className="text-base font-black text-slate-900">Practice & Recap</p>
              <p className="mt-1 text-sm font-normal text-slate-500">Fix the common mistakes, answer the mini practice, then review the recap.</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pt-5">
          <Card className="mb-6 border-red-200 bg-red-50/20" id="common-mistakes">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <XCircle className="h-5 w-5" />
                Common Mistakes ({commonMistakes.length})
              </CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Tap each card to reveal the correction</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                {commonMistakes.map((mistake, index) => (
                  <MistakeFlipCard
                    key={index}
                    mistake={mistake.mistake}
                    correction={mistake.correction}
                    explanation={mistake.explanation}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <InteractivePractice
            questions={miniPractice.map((q, index) => ({
              ...q,
              correctAnswer: answerKey[index] || '',
            }))}
            title={`Mini Practice (${miniPractice.length} questions)`}
          />

          <Card className="mb-6 overflow-hidden border-blue-100 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white shadow-sm" id="quick-recap">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                Vocabulary Recap
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-[1fr_260px]">
              <p className="leading-7 text-indigo-100">{quickRecap}</p>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-amber-200">
                  <AlertTriangle className="h-4 w-4" />
                  Exam reminder
                </p>
                <p className="mt-2 text-sm leading-6 text-indigo-100">
                  A word used naturally in one accurate sentence beats five words used awkwardly. Precision over quantity.
                </p>
              </div>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
