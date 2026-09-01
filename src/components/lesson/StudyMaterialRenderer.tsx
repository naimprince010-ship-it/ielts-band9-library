import {
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  Lightbulb,
  MessageSquareText,
  Mic2,
  Sparkles,
} from "lucide-react";
import type { StudyLessonBlueprint } from "@/lib/lessonBlueprint";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sectionIcons = {
  concept: Lightbulb,
  "worked-example": Sparkles,
  "phrase-bank": MessageSquareText,
  "guided-practice": BookOpenCheck,
  "speaking-drill": Mic2,
  "self-check": ClipboardCheck,
  assignment: CheckCircle2,
};

export function StudyMaterialRenderer({
  blueprint,
}: {
  blueprint: StudyLessonBlueprint;
}) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-violet-200 bg-gradient-to-br from-white to-violet-50/60">
        <CardContent className="grid gap-5 p-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-violet-600">
              Lesson objective
            </p>
            <p className="mt-2 font-semibold leading-7 text-slate-900">
              {blueprint.objective}
            </p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-emerald-600">
              You will be able to
            </p>
            <p className="mt-2 font-semibold leading-7 text-slate-900">
              {blueprint.outcome}
            </p>
          </div>
        </CardContent>
      </Card>

      {blueprint.sections.map((section, index) => {
        const Icon = sectionIcons[section.type];
        return (
          <Card
            key={section.id}
            id={section.id}
            className="scroll-mt-28 border-slate-200 shadow-sm"
          >
            <CardHeader className="border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Step {index + 1}
                  </p>
                  <CardTitle className="mt-1 text-xl">
                    {section.title}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {section.type === "concept" && (
                <>
                  <p className="leading-7 text-slate-700">{section.summary}</p>
                  <ul className="mt-4 space-y-3">
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {section.type === "worked-example" && (
                <div className="space-y-4">
                  <div className="rounded-xl bg-slate-100 p-4 font-semibold">
                    {section.prompt}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                      <Badge variant="destructive">Weak</Badge>
                      <p className="mt-3 leading-7">{section.weakAnswer}</p>
                    </div>
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                      <Badge className="bg-emerald-600">Improved</Badge>
                      <p className="mt-3 leading-7">{section.strongAnswer}</p>
                    </div>
                  </div>
                  <ol className="space-y-2">
                    {section.breakdown.map((item, i) => (
                      <li key={item} className="flex gap-3">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-violet-600 text-xs font-bold text-white">
                          {i + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {section.type === "phrase-bank" && (
                <div className="grid gap-4 md:grid-cols-2">
                  {section.groups.map((group) => (
                    <div
                      key={group.label}
                      className="rounded-xl border border-slate-200 p-4"
                    >
                      <h3 className="font-bold text-violet-700">
                        {group.label}
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-lg bg-slate-50 px-3 py-2"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              {section.type === "guided-practice" && (
                <div>
                  <p className="mb-4 text-slate-600">{section.instructions}</p>
                  <div className="space-y-4">
                    {section.items.map((item, i) => (
                      <details
                        key={item.prompt}
                        className="group rounded-xl border border-slate-200 p-4"
                      >
                        <summary className="cursor-pointer font-semibold">
                          {i + 1}. {item.prompt}
                        </summary>
                        <div className="mt-4 border-l-4 border-violet-300 pl-4">
                          <p className="font-semibold">{item.modelAnswer}</p>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {item.explanation}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}
              {section.type === "speaking-drill" && (
                <div>
                  <p className="leading-7 text-slate-600">
                    {section.instructions}
                  </p>
                  <div className="my-4 flex gap-2">
                    <Badge variant="outline">
                      Prepare {section.preparationSeconds}s
                    </Badge>
                    <Badge variant="outline">
                      Speak {section.responseSeconds}s
                    </Badge>
                  </div>
                  <ol className="space-y-3">
                    {section.questions.map((q, i) => (
                      <li
                        key={q}
                        className="rounded-xl border border-violet-100 bg-violet-50/60 p-4 font-semibold"
                      >
                        {i + 1}. {q}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {section.type === "self-check" && (
                <ul className="space-y-3">
                  {section.criteria.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-xl border border-slate-200 p-3"
                    >
                      <span className="mt-0.5 h-5 w-5 shrink-0 rounded border-2 border-slate-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.type === "assignment" && (
                <div className="space-y-4">
                  <p className="text-lg font-semibold leading-8">
                    {section.task}
                  </p>
                  <div className="rounded-xl bg-violet-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
                      Deliverable
                    </p>
                    <p className="mt-2">{section.deliverable}</p>
                  </div>
                  <ul className="space-y-2">
                    {section.successCriteria.map((item) => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
      <p className="text-xs leading-5 text-slate-500">
        Academic basis: {blueprint.sourceNotes.join(" • ")}
      </p>
    </div>
  );
}
