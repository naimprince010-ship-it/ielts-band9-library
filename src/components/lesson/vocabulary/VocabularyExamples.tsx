import { CheckCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SpeakButton } from '@/components/ui/SpeakButton';
import { parseMarkdownText } from '@/components/lesson/lessonContentParsers';

interface VocabularyExample {
  sentence: string;
  explanation: string;
}

interface VocabularyExamplesProps {
  examples: VocabularyExample[];
}

/**
 * "Examples" section for the vocabulary workspace template. Unlike writing
 * lesson examples (model answers, examiner breakdowns, phrase banks — see
 * `WritingExamples.tsx`), the data audit found vocabulary lesson examples
 * are uniformly plain "sentence + explanation" pairs with no header
 * markup, error/correct comparisons, or quoted model answers anywhere
 * across all 281 lessons. So this renderer skips the header/quote
 * extraction machinery entirely and just renders the sentence (with inline
 * **bold** parsing) plus the explanation in the same emerald "Why this
 * matters" callout style used by `GrammarExamples`/`WritingExamples`.
 */
export function VocabularyExamples({ examples }: VocabularyExamplesProps) {
  return (
    <Card className="mb-6 overflow-hidden border-blue-100 bg-white shadow-sm" id="examples">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-950">
          <CheckCircle className="h-5 w-5 text-blue-600" />
          Examples ({examples.length})
        </CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">See the word used naturally, then why it works.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {examples.map((example, index) => (
            <div key={index} className="overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-b from-white to-blue-50/30 shadow-sm">
              <div className="flex items-center justify-between border-b border-blue-100 bg-blue-50/80 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white">Example {index + 1}</span>
                  <SpeakButton text={example.sentence.replace(/\*\*/g, '')} size="sm" />
                </div>
              </div>

              <div className="space-y-4 p-4">
                <div className="rounded-xl border border-blue-100 bg-white p-4">
                  <p className="text-base leading-8 text-slate-950">{parseMarkdownText(example.sentence)}</p>
                </div>

                {example.explanation && (
                  <div className="rounded-r-xl border-l-4 border-emerald-500 bg-emerald-50/60 py-3 pl-4 pr-3">
                    <div className="mb-1 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-emerald-600" />
                      <span className="text-xs font-semibold uppercase text-emerald-700">Why this matters</span>
                    </div>
                    <p className="leading-relaxed text-muted-foreground">{parseMarkdownText(example.explanation)}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
