import { BookMarked } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CopyableBadge } from '@/components/ui/CopyButton';

interface WritingVocabularyBankProps {
  collocations?: string[];
  synonyms?: { word: string; synonyms: string[] }[];
}

/**
 * Collocations / synonyms section for the writing workspace template.
 * Many writing lessons carry `content.collocations` and `content.synonyms`
 * data (e.g. `writing-task2-opinion-1`, `writing-task1-informal-letter`),
 * but the previous generic LessonPage.tsx rendering only ever showed these
 * sections `when lesson.type === 'vocabulary'` — so this real content was
 * silently dropped for every writing lesson. This component fixes that by
 * rendering whichever of the two fields is present, and hides itself
 * entirely (returns null) when neither is present, matching the
 * hide-when-missing pattern used across the grammar template.
 */
export function WritingVocabularyBank({ collocations, synonyms }: WritingVocabularyBankProps) {
  const hasCollocations = Boolean(collocations?.length);
  const hasSynonyms = Boolean(synonyms?.length);

  if (!hasCollocations && !hasSynonyms) return null;

  return (
    <Card className="mb-6 overflow-hidden border-violet-100 bg-white shadow-sm" id="vocabulary-bank">
      <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-white via-violet-50/50 to-blue-50/70">
        <CardTitle className="flex items-center gap-2 text-slate-950">
          <BookMarked className="h-5 w-5 text-violet-600" />
          Vocabulary Bank
        </CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">Precise words and word-partners to lift your Lexical Resource score.</p>
      </CardHeader>
      <CardContent className="space-y-5 p-5">
        {hasCollocations && (
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.12em] text-violet-700">Collocations · click to copy</p>
            <div className="flex flex-wrap gap-2">
              {collocations!.map((collocation, index) => (
                <CopyableBadge key={index} text={collocation} />
              ))}
            </div>
          </div>
        )}

        {hasSynonyms && (
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.12em] text-blue-700">Synonyms</p>
            <div className="space-y-2">
              {synonyms!.map((item, index) => (
                <div key={index} className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/70 px-3 py-2">
                  <Badge variant="outline" className="border-blue-200 bg-blue-50 font-semibold text-blue-700">{item.word}</Badge>
                  <span className="text-slate-400">=</span>
                  <span className="text-sm text-slate-700">{item.synonyms.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
