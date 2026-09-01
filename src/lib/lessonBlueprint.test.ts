import { describe, expect, it } from 'vitest';
import { studyLessonBlueprintSchema } from './lessonBlueprint';
import { SPEAKING_LESSONS } from '@/data/speakingLessons';

describe('studyLessonBlueprintSchema', () => {
  it('accepts the approved Speaking Part 1 pilot blueprint', () => {
    const pilot = SPEAKING_LESSONS.find(lesson => lesson.id === 'speaking-part1-fluency-confidence');
    expect(studyLessonBlueprintSchema.safeParse(pilot?.content.studyBlueprint).success).toBe(true);
  });

  it('rejects shallow generated lessons with too few learning sections', () => {
    const result = studyLessonBlueprintSchema.safeParse({
      schemaVersion: 1,
      objective: 'Learn fluency',
      outcome: 'Speak better',
      estimatedMinutes: 10,
      sourceNotes: ['Draft'],
      sections: [],
    });
    expect(result.success).toBe(false);
  });
});
