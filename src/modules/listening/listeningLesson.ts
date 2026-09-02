import { z } from 'zod';

const nonEmpty = z.string().trim().min(1);

export const listeningQuestionTypeSchema = z.enum([
  'form_completion',
  'note_completion',
  'multiple_choice',
  'matching',
  'map_labelling',
  'sentence_completion',
  'short_answer',
]);

export const listeningLessonDataSchema = z.object({
  schemaVersion: z.literal(1),
  lessonFormat: z.enum(['skill_lesson', 'section_practice']),
  sectionNumber: z.number().int().min(1).max(4).nullable(),
  sectionType: listeningQuestionTypeSchema,
  audio: z.object({
    status: z.enum(['pending', 'ready', 'browser_tts']),
    url: z.string().url().refine((value) => value.startsWith('https://'), 'Audio must use HTTPS').optional(),
  }).superRefine((audio, context) => {
    if (audio.status === 'ready' && !audio.url) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: 'Ready audio requires an HTTPS URL', path: ['url'] });
    }
    if (audio.status === 'browser_tts' && audio.url) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: 'Browser TTS does not use an audio URL', path: ['url'] });
    }
  }),
  transcript: z.object({
    status: z.enum(['draft', 'reviewed']),
    cues: z.array(z.object({
      startSeconds: z.number().min(0),
      endSeconds: z.number().positive(),
      speaker: z.string().trim().min(1).optional(),
      text: nonEmpty,
    }).refine((cue) => cue.endSeconds > cue.startSeconds, 'Cue end must be after its start')).min(1),
  }),
  questions: z.array(z.object({
    id: nonEmpty,
    type: listeningQuestionTypeSchema,
    prompt: nonEmpty,
    options: z.array(nonEmpty).min(2).optional(),
    acceptedAnswers: z.array(nonEmpty).min(1),
    explanation: nonEmpty,
  })).min(1),
  quality: z.object({
    contentReviewed: z.boolean(),
    transcriptChecked: z.boolean(),
    answersChecked: z.boolean(),
  }),
});

export type ListeningLessonData = z.infer<typeof listeningLessonDataSchema>;

export function toListeningLessonRow(data: ListeningLessonData) {
  return {
    schema_version: data.schemaVersion,
    lesson_format: data.lessonFormat,
    section_number: data.sectionNumber,
    section_type: data.sectionType,
    audio_status: data.audio.status,
    audio_url: data.audio.url ?? null,
    transcript_status: data.transcript.status,
    transcript_cues: data.transcript.cues,
    questions: data.questions,
    quality_report: data.quality,
    updated_at: new Date().toISOString(),
  };
}

export function fromListeningLessonRow(row: Record<string, unknown>): ListeningLessonData | null {
  const parsed = listeningLessonDataSchema.safeParse({
    schemaVersion: row.schema_version,
    lessonFormat: row.lesson_format,
    sectionNumber: row.section_number ?? null,
    sectionType: row.section_type,
    audio: { status: row.audio_status, ...(typeof row.audio_url === 'string' ? { url: row.audio_url } : {}) },
    transcript: { status: row.transcript_status, cues: row.transcript_cues },
    questions: row.questions,
    quality: row.quality_report,
  });
  return parsed.success ? parsed.data : null;
}
