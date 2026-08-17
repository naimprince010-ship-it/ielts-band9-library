import { ArrowRight, CheckCircle, Sparkles, XCircle, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SentenceUpgradeLabProps {
  sentenceUpgrade?: { basic: string; upgraded: string }[];
}

/**
 * "Sentence Upgrade Lab" — before/after comparison grid. Renders nothing
 * when `content.sentenceUpgrade` is absent or empty.
 */
export function SentenceUpgradeLab({ sentenceUpgrade }: SentenceUpgradeLabProps) {
  if (!sentenceUpgrade || sentenceUpgrade.length === 0) return null;

  return (
    <Card className="mb-6 overflow-hidden border-emerald-100 bg-white shadow-sm" id="sentence-upgrades">
      <CardHeader className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-blue-50">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Upgrade lab</p>
            <CardTitle className="mt-1 flex items-center gap-2 text-slate-950">
              <Zap className="h-5 w-5 text-emerald-600" />
              Sentence Upgrade Lab
            </CardTitle>
            <p className="mt-1 text-sm text-slate-600">Compare basic control with a cleaner, more precise Band 8+ version.</p>
          </div>
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            {sentenceUpgrade.length} upgrade drills
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid gap-4 lg:grid-cols-2">
          {sentenceUpgrade.map((upgrade, index) => {
            const basicText = upgrade.basic.replace(/^Error-filled:\s*/i, '').replace(/^Basic:\s*/i, '');

            return (
              <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="rounded-full bg-slate-950 px-2.5 py-1 text-xs font-bold text-white">Upgrade {index + 1}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </div>
                <div className="grid gap-3 p-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
                  <div className="rounded-xl border border-red-100 bg-red-50/70 p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <XCircle className="h-4 w-4 flex-shrink-0 text-red-500" />
                      <span className="text-xs font-bold uppercase tracking-wide text-red-600">Before</span>
                    </div>
                    <p className="text-sm leading-6 text-red-700 line-through decoration-red-300">{basicText}</p>
                  </div>
                  <div className="hidden items-center justify-center md:flex">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white shadow-sm">
                      <ArrowRight className="h-4 w-4 text-slate-500" />
                    </span>
                  </div>
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/80 p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                      <span className="text-xs font-bold uppercase tracking-wide text-emerald-700">After (Band 8+)</span>
                    </div>
                    <p className="text-sm font-medium leading-6 text-emerald-800">{upgrade.upgraded}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
