import { BookMarked, CheckCircle, Layers3, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { GrammarFormItem } from '@/types';

interface GrammarControlMapProps {
  grammarForm?: string;
  grammarFormItems?: GrammarFormItem[];
}

const extractGrammarStructures = (grammarForm: string) =>
  grammarForm
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^\d+\.\s+/.test(line))
    .map((line) => line.replace(/^\d+\.\s*/, ''));

/**
 * "Grammar Control Map" — renders `grammarFormItems` as a comparison
 * accordion when present (takes priority, matching the original
 * LessonPage.tsx behavior), otherwise falls back to the plain-text
 * `grammarForm` block. Renders nothing when both are absent so the
 * section (and its TOC entry, handled by the parent template) disappears
 * for lessons that don't define either field.
 */
export function GrammarControlMap({ grammarForm, grammarFormItems }: GrammarControlMapProps) {
  if (grammarFormItems && grammarFormItems.length > 0) {
    return (
      <Card className="mb-6 overflow-hidden border-blue-100 bg-white shadow-sm" id="grammar-form">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-950">
            <BookMarked className="h-5 w-5 text-blue-600" />
            Grammar Control Map
          </CardTitle>
          <p className="mt-1 text-sm text-blue-700">Open each structure and compare Band 7 control with Band 8 precision.</p>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {grammarFormItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`grammar-form-${index}`}
                className="overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-r from-white to-blue-50/40"
              >
                <AccordionTrigger className="px-4 py-3 hover:bg-blue-50 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-slate-950">{item.name}</span>
                    <div className="flex gap-1">
                      {item.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="bg-violet-50 text-xs text-violet-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-4">
                    <div>
                      <p className="mb-1 text-sm font-medium text-muted-foreground">Definition</p>
                      <p className="text-foreground">{item.definition}</p>
                    </div>
                    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-bold text-slate-700">Band 7 → Band 8 comparison</p>
                      <div className="flex items-start gap-2">
                        <XCircle className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground/70" />
                        <p className="text-muted-foreground">{item.comparison.standard}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                        <p className="font-semibold text-green-700">{item.comparison.band8}</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    );
  }

  if (grammarForm) {
    const structures = extractGrammarStructures(grammarForm);

    return (
      <Card className="mb-6 overflow-hidden border-blue-100 bg-white shadow-sm" id="grammar-form">
        <CardHeader className="border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-violet-50">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Structure map</p>
              <CardTitle className="mt-1 flex items-center gap-2 text-slate-950">
                <BookMarked className="h-5 w-5 text-blue-600" />
                Grammar Control Map
              </CardTitle>
            </div>
            <Badge className="bg-blue-600">
              <Layers3 className="mr-1 h-3.5 w-3.5" />
              {Math.max(structures.length, 1)} control point{Math.max(structures.length, 1) > 1 ? 's' : ''}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-5">
          {structures.length > 0 && (
            <div className="grid gap-3 md:grid-cols-2">
              {structures.map((structure, index) => (
                <div
                  key={`${structure}-${index}`}
                  className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-4 shadow-sm"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-600 text-sm font-black text-white">
                      {index + 1}
                    </span>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">Control point</p>
                  </div>
                  <p className="font-semibold leading-6 text-slate-900">{structure}</p>
                </div>
              ))}
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500">Detailed form notes</p>
            <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-800">{grammarForm}</pre>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
