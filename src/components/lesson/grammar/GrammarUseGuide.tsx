import { Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GrammarUseGuideProps {
  grammarUse?: string;
}

/**
 * "When to Use It Under Exam Pressure" — a proofreading-checklist style
 * parser for `content.grammarUse` (bold headers, numbered steps, bullet
 * lines, plain paragraphs). Renders nothing when the field is absent.
 */
export function GrammarUseGuide({ grammarUse }: GrammarUseGuideProps) {
  if (!grammarUse) return null;

  return (
    <Card className="mb-6 overflow-hidden border-violet-100 bg-white shadow-sm" id="grammar-use">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-950">
          <Zap className="h-5 w-5 text-violet-600" />
          When to Use It Under Exam Pressure
        </CardTitle>
        <p className="mt-1 text-sm text-violet-700">Use this as a proofreading checklist before you submit Writing Task 2.</p>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none">
          {grammarUse.split('\n\n').map((section, sectionIndex) => {
            const lines = section.split('\n');

            return (
              <div key={sectionIndex} className={sectionIndex > 0 ? 'mt-4 border-t border-border pt-4' : ''}>
                {lines.map((line, lineIndex) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return (
                      <h4 key={lineIndex} className="mb-2 font-semibold text-foreground">
                        {line.replace(/\*\*/g, '')}
                      </h4>
                    );
                  } else if (line.match(/^\d+\./)) {
                    return (
                      <div key={lineIndex} className="flex items-start gap-2 py-1">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">
                          {line.match(/^\d+/)?.[0]}
                        </span>
                        <span className="text-muted-foreground">{line.replace(/^\d+\.\s*/, '')}</span>
                      </div>
                    );
                  } else if (line.startsWith('-')) {
                    return (
                      <div key={lineIndex} className="flex items-start gap-2 py-1 pl-2">
                        <span className="text-accent">•</span>
                        <span className="text-muted-foreground">{line.replace(/^-\s*/, '')}</span>
                      </div>
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
          })}
        </div>
      </CardContent>
    </Card>
  );
}
