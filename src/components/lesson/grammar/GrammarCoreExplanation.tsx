import { FileText, Lightbulb, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GrammarCoreExplanationProps {
  coreExplanation: string;
}

/**
 * "Core Explanation" section. Reuses the same paragraph / numbered-list /
 * bold-header parsing behavior that LessonPage.tsx has always used for
 * this field (extracted verbatim, not redesigned) — always rendered since
 * coreExplanation is a required LessonContent field.
 */
export function GrammarCoreExplanation({ coreExplanation }: GrammarCoreExplanationProps) {
  return (
    <Card className="mb-6 overflow-hidden border-blue-100 bg-white shadow-sm" id="core-explanation">
      <CardHeader className="border-b border-blue-100 bg-gradient-to-r from-white via-blue-50/60 to-indigo-50">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Grammar concept</p>
            <CardTitle className="mt-1 flex items-center gap-2 text-slate-950">
              <FileText className="h-5 w-5 text-blue-600" />
              Core Explanation
            </CardTitle>
          </div>
          <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            Accuracy first
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div className="space-y-4">
          {coreExplanation.split('\n\n').map((paragraph, paragraphIndex) => {
            const lines = paragraph.split('\n');
            const hasNumberedList = lines.some((line) => /^\d+\./.test(line.trim()));
            const isBoldHeader = paragraph.startsWith('**') && paragraph.includes('**');
            const isKeyPrinciple = paragraph.toLowerCase().includes('key principle');

            if (isBoldHeader && !hasNumberedList) {
              const cleanText = paragraph.replace(/\*\*/g, '');
              return (
                <div key={paragraphIndex} className="rounded-2xl border border-indigo-100 border-l-4 border-l-indigo-500 bg-indigo-50/70 p-4">
                  <p className="font-semibold leading-7 text-slate-900">{cleanText}</p>
                </div>
              );
            }

            if (isKeyPrinciple) {
              const cleanText = paragraph.replace(/\*\*/g, '');
              return (
                <div key={paragraphIndex} className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                  <p className="font-medium text-amber-900">{cleanText}</p>
                </div>
              );
            }

            if (hasNumberedList) {
              return (
                <div key={paragraphIndex} className="space-y-2">
                  {lines.map((line, lineIndex) => {
                    const numberedMatch = line.trim().match(/^(\d+)\.\s*(.+)/);
                    if (numberedMatch) {
                      const [, num, text] = numberedMatch;
                      return (
                        <div key={lineIndex} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition-colors hover:bg-blue-50/70">
                          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                            {num}
                          </span>
                          <span className="pt-0.5 font-medium leading-6 text-slate-800">{text}</span>
                        </div>
                      );
                    } else if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <p key={lineIndex} className="mb-2 font-semibold text-foreground">
                          {line.replace(/\*\*/g, '')}
                        </p>
                      );
                    } else if (line.trim()) {
                      return (
                        <p key={lineIndex} className="text-muted-foreground">
                          {line}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              );
            }

            const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
            return (
              <p key={paragraphIndex} className="leading-7 text-slate-700">
                {parts.map((part, partIndex) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                      <strong key={partIndex} className="font-semibold text-foreground">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return part;
                })}
              </p>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
