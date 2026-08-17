import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { parseRichTextBlocks } from '@/components/lesson/lessonContentParsers';

interface VocabularyCoreExplanationProps {
  coreExplanation: string;
}

/**
 * "Core Explanation" section for the vocabulary workspace template. Renders
 * via the shared `parseRichTextBlocks` parser (same one used by
 * `WritingCoreExplanation` and `WritingExamples`) rather than any new
 * parsing logic — no vocabulary-specific formatting was found in the data
 * audit that this generic structural parser doesn't already handle.
 * Always rendered — `coreExplanation` is a required `LessonContent` field.
 */
export function VocabularyCoreExplanation({ coreExplanation }: VocabularyCoreExplanationProps) {
  return (
    <Card className="mb-6 overflow-hidden border-blue-100 bg-white shadow-sm" id="core-explanation">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-950">
          <FileText className="h-5 w-5 text-blue-600" />
          Core Explanation
        </CardTitle>
      </CardHeader>
      <CardContent>{parseRichTextBlocks(coreExplanation)}</CardContent>
    </Card>
  );
}
