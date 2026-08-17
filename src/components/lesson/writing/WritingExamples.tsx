import { CheckCircle, Lightbulb, Quote } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SpeakButton } from '@/components/ui/SpeakButton';
import { parseMarkdownText, parseRichTextBlocks } from '@/components/lesson/lessonContentParsers';

interface WritingExample {
  sentence: string;
  explanation: string;
}

interface WritingExamplesProps {
  examples: WritingExample[];
}

// Matches a leading "**Some Header:**" line, e.g. "**BAND 9 MODEL ANSWER
// (Introduction):**", "**EXAMINER PERSPECTIVE - Task Response (Band 9):**",
// "**WORD COUNT CHECK:**". Deliberately structural (bold + trailing colon),
// not keyed to specific header wording, so any header a lesson author
// invents is picked up the same way.
const HEADER_PATTERN = /^\*\*(.+?):\*\*\s*\n*/;

function splitExample(sentence: string): { label: string | null; body: string } {
  const match = sentence.match(HEADER_PATTERN);
  if (!match) {
    return { label: null, body: sentence.trim() };
  }
  return { label: match[1].trim(), body: sentence.slice(match[0].length).trim() };
}

function isQuotedModelAnswer(body: string): boolean {
  return body.length > 2 && body.startsWith('"') && body.endsWith('"');
}

/**
 * "Examples" section for the writing workspace template. Writing example
 * data is far more varied than grammar's (model answer excerpts, examiner
 * breakdowns, phrase banks, word-count checks, comparison tables — see
 * the plan's audit notes), and new header text keeps appearing lesson to
 * lesson. Instead of matching specific keywords (the approach
 * `parseWritingExample`/`parseExampleContent` in LessonPage.tsx take,
 * which is why those are effectively dead code against the real data),
 * this generically extracts any leading `**Header:**` as the card's label
 * and renders everything else through `parseRichTextBlocks` — the same
 * structural parser used for `WritingCoreExplanation`. A body that is a
 * single fully-quoted paragraph (an actual essay excerpt) gets a
 * distinguishing "Model Answer" quote treatment; everything else renders
 * as normal rich-text blocks.
 */
export function WritingExamples({ examples }: WritingExamplesProps) {
  return (
    <Card className="mb-6 overflow-hidden border-blue-100 bg-white shadow-sm" id="examples">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-950">
          <CheckCircle className="h-5 w-5 text-blue-600" />
          Examples ({examples.length})
        </CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">Model answers, examiner breakdowns, and phrase banks for this lesson.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {examples.map((example, index) => {
            const { label, body } = splitExample(example.sentence);
            const quoted = isQuotedModelAnswer(body);
            const displayBody = quoted ? body.slice(1, -1).trim() : body;

            return (
              <div key={index} className="overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-b from-white to-blue-50/30 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-100 bg-blue-50/80 px-4 py-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white">
                      {label || `Example ${index + 1}`}
                    </span>
                    <SpeakButton text={example.sentence.replace(/\*\*/g, '')} size="sm" />
                  </div>
                </div>

                <div className="space-y-4 p-4">
                  {quoted ? (
                    <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Quote className="h-4 w-4 text-amber-600" />
                        <span className="text-xs font-semibold uppercase text-amber-700">Model Answer</span>
                      </div>
                      <p className="text-base italic leading-8 text-slate-950">{parseMarkdownText(displayBody)}</p>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-blue-100 bg-white p-4">
                      {parseRichTextBlocks(displayBody)}
                    </div>
                  )}

                  {example.explanation && (
                    <div className="rounded-r-xl border-l-4 border-emerald-500 bg-emerald-50/60 py-3 pl-4 pr-3">
                      <div className="mb-1 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-emerald-600" />
                        <span className="text-xs font-semibold uppercase text-emerald-700">Why this works</span>
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
