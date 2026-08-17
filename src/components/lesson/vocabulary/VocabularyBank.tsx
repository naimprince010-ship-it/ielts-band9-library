import { BookMarked } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CopyableBadge } from '@/components/ui/CopyButton';

interface VocabularyBankProps {
  collocations?: string[];
  synonyms?: { word: string; synonyms: string[] }[];
}

/**
 * Collocations / synonyms section for the vocabulary workspace template.
 * Same shape and visual treatment as `WritingVocabularyBank.tsx` — both
 * lesson types share this exact `LessonContent` shape for these two
 * optional fields — kept as its own file per the established per-domain
 * convention (grammar/writing don't share sibling components either, even
 * when byte-for-byte similar). Hides itself entirely when neither field is
 * present.
 */
export function VocabularyBank({ collocations, synonyms }: VocabularyBankProps) {
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
        <p className="mt-1 text-sm text-muted-foreground">Word-partners and near-synonyms to widen how naturally you use this word.</p>
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
