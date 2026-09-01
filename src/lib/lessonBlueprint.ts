import { z } from "zod";

const nonEmpty = z.string().trim().min(1);

const conceptSection = z.object({
  id: nonEmpty,
  type: z.literal("concept"),
  title: nonEmpty,
  summary: nonEmpty,
  points: z.array(nonEmpty).min(2),
});

const workedExampleSection = z.object({
  id: nonEmpty,
  type: z.literal("worked-example"),
  title: nonEmpty,
  prompt: nonEmpty,
  weakAnswer: nonEmpty,
  strongAnswer: nonEmpty,
  breakdown: z.array(nonEmpty).min(2),
});

const phraseBankSection = z.object({
  id: nonEmpty,
  type: z.literal("phrase-bank"),
  title: nonEmpty,
  groups: z
    .array(z.object({ label: nonEmpty, items: z.array(nonEmpty).min(2) }))
    .min(1),
});

const guidedPracticeSection = z.object({
  id: nonEmpty,
  type: z.literal("guided-practice"),
  title: nonEmpty,
  instructions: nonEmpty,
  items: z
    .array(
      z.object({
        prompt: nonEmpty,
        modelAnswer: nonEmpty,
        explanation: nonEmpty,
      }),
    )
    .min(2),
});

const speakingDrillSection = z.object({
  id: nonEmpty,
  type: z.literal("speaking-drill"),
  title: nonEmpty,
  instructions: nonEmpty,
  preparationSeconds: z.number().int().min(0).max(60),
  responseSeconds: z.number().int().min(15).max(120),
  questions: z.array(nonEmpty).min(3),
});

const selfCheckSection = z.object({
  id: nonEmpty,
  type: z.literal("self-check"),
  title: nonEmpty,
  criteria: z.array(nonEmpty).min(3),
});

const assignmentSection = z.object({
  id: nonEmpty,
  type: z.literal("assignment"),
  title: nonEmpty,
  task: nonEmpty,
  deliverable: nonEmpty,
  successCriteria: z.array(nonEmpty).min(3),
});

export const studyLessonBlueprintSchema = z.object({
  schemaVersion: z.literal(1),
  objective: nonEmpty,
  outcome: nonEmpty,
  estimatedMinutes: z.number().int().min(10).max(180),
  sourceNotes: z.array(nonEmpty).min(1),
  sections: z
    .array(
      z.discriminatedUnion("type", [
        conceptSection,
        workedExampleSection,
        phraseBankSection,
        guidedPracticeSection,
        speakingDrillSection,
        selfCheckSection,
        assignmentSection,
      ]),
    )
    .min(5),
});

export type StudyLessonBlueprint = z.infer<typeof studyLessonBlueprintSchema>;

export function validateStudyLessonBlueprint(value: unknown) {
  return studyLessonBlueprintSchema.safeParse(value);
}
