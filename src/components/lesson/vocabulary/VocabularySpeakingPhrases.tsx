import { Mic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SpeakButton } from '@/components/ui/SpeakButton';
import { CopyableBadge } from '@/components/ui/CopyButton';

interface VocabularySpeakingPhrasesProps {
  speakingLines?: string[];
}

/**
 * "Speaking Phrases" section for the vocabulary workspace template. There's
 * no writing-template equivalent of this — `speakingLines` is a
 * vocabulary-flavored `LessonContent` field (present on effectively all 281
 * vocabulary lessons per the data audit). Based directly on the block this
 * replaces in `LessonPage.tsx`'s generic branch (green-accented
 * SpeakButton + CopyableBadge list). Hides itself when the field is empty.
 */
export function VocabularySpeakingPhrases({ speakingLines }: VocabularySpeakingPhrasesProps) {
  if (!speakingLines?.length) return null;

  return (
    <Card className="mb-6 overflow-hidden border-emerald-100 bg-white shadow-sm" id="speaking-phrases">
      <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-white via-emerald-50/50 to-teal-50/70">
        <CardTitle className="flex items-center gap-2 text-slate-950">
          <Mic className="h-5 w-5 text-emerald-600" />
          Speaking Phrases
        </CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">Click the speaker to hear it, click the phrase to copy it.</p>
      </CardHeader>
      <CardContent className="p-5">
        <ul className="space-y-3">
          {speakingLines.map((line, index) => (
            <li key={index} className="flex items-start gap-2">
              <SpeakButton text={line} size="sm" className="mt-0.5 flex-shrink-0" />
              <CopyableBadge text={line} className="whitespace-normal text-left text-emerald-700 hover:bg-emerald-100 bg-emerald-50" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
