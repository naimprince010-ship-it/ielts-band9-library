import { describe, expect, it } from 'vitest';
import { deepVocabularyLessons, hasDeepVocabularyLesson } from './deepVocabularyLessons';

describe('deepVocabularyLessons', () => {
  it('registers influence-impact-vocabulary as a deep lesson', () => {
    expect(hasDeepVocabularyLesson('influence-impact-vocabulary')).toBe(true);
  });

  it('registers quality-standards-vocabulary as a deep lesson', () => {
    expect(hasDeepVocabularyLesson('quality-standards-vocabulary')).toBe(true);
  });

  it('registers cause-effect-vocabulary as a deep lesson', () => {
    expect(hasDeepVocabularyLesson('cause-effect-vocabulary')).toBe(true);
  });

  it('registers comparison-vocabulary as a deep lesson', () => {
    expect(hasDeepVocabularyLesson('comparison-vocabulary')).toBe(true);
  });

  it('registers academic-collocations-verb-noun as a deep lesson', () => {
    expect(hasDeepVocabularyLesson('academic-collocations-verb-noun')).toBe(true);
  });

  it('registers band-7-to-8-precision-vocabulary as a deep lesson', () => {
    expect(hasDeepVocabularyLesson('band-7-to-8-precision-vocabulary')).toBe(true);
  });

  it('keeps quality-standards-vocabulary aligned to the 4 reference words', () => {
    const lesson = deepVocabularyLessons['quality-standards-vocabulary'];
    expect(lesson.words.map((word) => word.word)).toEqual(['quality', 'standard', 'criteria', 'criterion']);
  });

  it('keeps cause-effect-vocabulary aligned to the curated word set', () => {
    const lesson = deepVocabularyLessons['cause-effect-vocabulary'];
    expect(lesson.words.map((word) => word.word)).toEqual(['cause', 'factor', 'impact', 'consequence']);
  });

  it('keeps comparison-vocabulary aligned to the curated word set', () => {
    const lesson = deepVocabularyLessons['comparison-vocabulary'];
    expect(lesson.words.map((word) => word.word)).toEqual(['similar', 'comparable', 'contrast', 'outperform']);
  });

  it('keeps academic-collocations-verb-noun aligned to the curated word set', () => {
    const lesson = deepVocabularyLessons['academic-collocations-verb-noun'];
    expect(lesson.words.map((word) => word.word)).toEqual([
      'make progress',
      'address concerns',
      'pose a challenge',
      'achieve goals',
    ]);
  });

  it('keeps band-7-to-8-precision-vocabulary aligned to the curated word set', () => {
    const lesson = deepVocabularyLessons['band-7-to-8-precision-vocabulary'];
    expect(lesson.words.map((word) => word.word)).toEqual([
      'significant',
      'substantial',
      'marginal',
      'considerable',
    ]);
  });

  it('keeps each deep lesson in 4-word comparison format', () => {
    Object.values(deepVocabularyLessons).forEach((lesson) => {
      expect(lesson.words).toHaveLength(4);
      expect(lesson.checks.length).toBeGreaterThan(0);
      expect(new Set(lesson.words.map((word) => word.word)).size).toBe(4);
    });
  });

  it('keeps check answer keys aligned with options', () => {
    Object.values(deepVocabularyLessons).forEach((lesson) => {
      lesson.checks.forEach((check) => {
        expect(check.options).toContain(check.correct);
      });
    });
  });
});
