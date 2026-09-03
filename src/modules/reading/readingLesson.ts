import { z } from 'zod';

const nonEmpty = z.string().trim().min(1);

export const readingQuestionTypeSchema = z.enum([
  'multiple_choice',
  'true_false_not_given',
  'yes_no_not_given',
  'matching_headings',
  'matching_information',
  'matching_features',
  'summary_completion',
  'sentence_completion',
  'short_answer',
]);

export const readingLessonDataSchema = z.object({
  schemaVersion: z.literal(1),
  passageFormat: z.enum(['academic', 'general_training']),
  passageTitle: nonEmpty,
  passageContent: nonEmpty,
  paragraphs: z.array(z.object({ label: z.string().trim().regex(/^[A-Z]$/), content: nonEmpty })).min(1),
  questionGroups: z.array(z.object({
    id: nonEmpty,
    type: readingQuestionTypeSchema,
    instructions: nonEmpty,
    questions: z.array(z.object({
      id: nonEmpty,
      prompt: nonEmpty,
      options: z.array(nonEmpty).min(2).optional(),
      acceptedAnswers: z.array(nonEmpty).min(1),
      explanation: nonEmpty,
      paragraphRefs: z.array(z.string().trim().regex(/^[A-Z]$/)).optional(),
    })).min(1),
  })).min(1),
  quality: z.object({
    passageReviewed: z.boolean(),
    questionsReviewed: z.boolean(),
    answersChecked: z.boolean(),
    copyrightConfirmed: z.boolean(),
  }),
});

export type ReadingLessonData = z.infer<typeof readingLessonDataSchema>;

export function toReadingLessonRow(data: ReadingLessonData) {
  return {
    schema_version: data.schemaVersion,
    passage_format: data.passageFormat,
    passage_title: data.passageTitle,
    passage_content: data.passageContent,
    paragraphs: data.paragraphs,
    question_groups: data.questionGroups,
    quality_report: data.quality,
    updated_at: new Date().toISOString(),
  };
}

export function fromReadingLessonRow(row: Record<string, unknown>): ReadingLessonData | null {
  const parsed = readingLessonDataSchema.safeParse({
    schemaVersion: row.schema_version,
    passageFormat: row.passage_format,
    passageTitle: row.passage_title,
    passageContent: row.passage_content,
    paragraphs: row.paragraphs,
    questionGroups: row.question_groups,
    quality: row.quality_report,
  });
  return parsed.success ? parsed.data : null;
}
