import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { parseRichTextBlocks } from '@/components/lesson/lessonContentParsers';

interface WritingCoreExplanationProps {
  coreExplanation: string;
}

/**
 * "Core Explanation" section for the writing workspace template. Writing
 * lesson `coreExplanation` text mixes task prompts, structure outlines,
 * numbered/bulleted checklists, and bold callouts far more than grammar's
 * does, so this renders via the generic `parseRichTextBlocks` parser
 * (shared with `WritingExamples`) rather than a bespoke writing-only
 * regex, keeping it correct for any future lesson's formatting choices.
 * Always rendered — `coreExplanation` is a required LessonContent field.
 */
export function WritingCoreExplanation({ coreExplanation }: WritingCoreExplanationProps) {
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
