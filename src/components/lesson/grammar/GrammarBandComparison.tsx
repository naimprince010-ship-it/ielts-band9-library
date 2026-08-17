import { ArrowUpRight, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GrammarBandComparisonProps {
  targetLevel: string;
}

const comparisonRows = [
  {
    focus: 'Range',
    band7: 'Uses some complex grammar, but often repeats safe sentence patterns.',
    band8: 'Uses varied structures naturally because the idea needs them.',
  },
  {
    focus: 'Accuracy',
    band7: 'Meaning is clear, but small article, tense, or preposition errors remain.',
    band8: 'Errors are rare and do not distract from precision or fluency.',
  },
  {
    focus: 'Control',
    band7: 'Tries longer sentences even when they become heavy or unclear.',
    band8: 'Controls clauses, contrast, condition, and emphasis with clear purpose.',
  },
];

export function GrammarBandComparison({ targetLevel }: GrammarBandComparisonProps) {
  return (
    <Card className="mb-6 overflow-hidden border-indigo-100 bg-white shadow-sm" id="band-comparison">
      <CardHeader className="border-b border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-violet-50">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">Band upgrade lens</p>
            <CardTitle className="mt-1 flex items-center gap-2 text-slate-950">
              Band 7 vs Band 8 grammar control
              <ArrowUpRight className="h-5 w-5 text-violet-600" />
            </CardTitle>
          </div>
          <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
            Goal: {targetLevel}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid border-b border-slate-100 bg-slate-50 text-xs font-black uppercase tracking-[0.12em] text-slate-500 md:grid-cols-[140px_1fr_1fr]">
          <div className="border-r border-slate-100 px-4 py-3">Focus</div>
          <div className="border-r border-slate-100 px-4 py-3">Band 7 pattern</div>
          <div className="px-4 py-3">Band 8 pattern</div>
        </div>
        {comparisonRows.map((row) => (
          <div key={row.focus} className="grid border-b border-slate-100 last:border-b-0 md:grid-cols-[140px_1fr_1fr]">
            <div className="border-r border-slate-100 bg-white px-4 py-4 font-black text-slate-900">{row.focus}</div>
            <div className="border-r border-slate-100 bg-red-50/30 px-4 py-4">
              <div className="flex items-start gap-2">
                <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                <p className="text-sm leading-6 text-slate-700">{row.band7}</p>
              </div>
            </div>
            <div className="bg-emerald-50/35 px-4 py-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <p className="text-sm font-medium leading-6 text-slate-800">{row.band8}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
