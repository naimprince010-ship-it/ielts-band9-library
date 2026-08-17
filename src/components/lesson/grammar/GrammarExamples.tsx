import { CheckCircle, Lightbulb, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SpeakButton } from '@/components/ui/SpeakButton';
import { parseMarkdownText } from '@/components/lesson/lessonContentParsers';

interface GrammarExample {
  sentence: string;
  explanation: string;
}

interface GrammarExamplesProps {
  examples: GrammarExample[];
}

/**
 * "Precision Examples" section. Grammar lesson data only ever uses two
 * sentence shapes: the "Error: ... → Correct: ..." comparison format, or a
 * plain sentence with a plain-text explanation — grammar examples never
 * use the Question/Band, Writing Task, or vocabulary-list formats that the
 * shared vocabulary example renderer also has to handle, so this
 * component only implements the two shapes that actually occur.
 */
export function GrammarExamples({ examples }: GrammarExamplesProps) {
  return (
    <Card className="mb-6 overflow-hidden border-blue-100 bg-white shadow-sm" id="examples">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-blue-600" />
          Precision Examples ({examples.length})
        </CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">Study why each sentence sounds controlled, natural, and Band 8-ready.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {examples.map((example, index) => {
            const hasErrorFormat = example.sentence.includes('Error:') && example.sentence.includes('Correct:');
            let errorPart = '';
            let correctPart = '';

            if (hasErrorFormat) {
              const parts = example.sentence.split('→');
              errorPart = parts[0]?.replace('Error:', '').trim() || '';
              correctPart = parts[1]?.replace('Correct:', '').trim() || '';
            }

            return (
              <div key={index} className="overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-b from-white to-blue-50/30 shadow-sm">
                <div className="flex items-center justify-between border-b border-blue-100 bg-blue-50/80 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white">Example {index + 1}</span>
                    <SpeakButton text={example.sentence.replace(/\*\*/g, '')} size="sm" />
                  </div>
                </div>

                <div className="space-y-4 p-4">
                  {hasErrorFormat ? (
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
                        <div className="mb-2 flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="text-xs font-semibold uppercase text-red-600 dark:text-red-400">Incorrect</span>
                        </div>
                        <p className="text-red-700 line-through dark:text-red-300">{errorPart}</p>
                      </div>
                      <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
                        <div className="mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-xs font-semibold uppercase text-green-600 dark:text-green-400">Correct</span>
                        </div>
                        <p className="font-medium text-green-700 dark:text-green-300">{correctPart}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-blue-100 bg-white p-4">
                      <p className="text-base leading-8 text-slate-950">{parseMarkdownText(example.sentence)}</p>
                    </div>
                  )}

                  {example.explanation && (
                    <div className="rounded-r-xl border-l-4 border-emerald-500 bg-emerald-50/60 py-3 pl-4 pr-3">
                      <div className="mb-1 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-emerald-600" />
                        <span className="text-xs font-semibold uppercase text-emerald-700">Why this is Band 8</span>
                      </div>
                      <p className="leading-relaxed text-muted-foreground">{parseMarkdownText(example.explanation)}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
