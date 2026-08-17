import { describe, expect, it } from 'vitest';
import { NEW_GRAMMAR_LESSONS } from './newGrammarLessons';

const REQUIRED_GRAMMAR_FIELDS = [
  'whatYouWillLearn',
  'coreExplanation',
  'grammarUse',
  'examples',
  'sentenceUpgrade',
  'commonMistakes',
  'miniPractice',
  'answerKey',
  'quickRecap',
] as const;

const batchOneSlugs = [
  'passive-voice-mastery',
  'relative-clauses-complex-sentences',
  'articles-a-an-the-zero',
  'modal-verbs-academic-writing',
  'reported-speech-academic-writing',
  'comparatives-superlatives',
  'subject-verb-agreement',
  'gerunds-infinitives',
  'noun-clauses-complex-ideas',
  'adverbial-clauses-cohesion',
];

describe('newGrammarLessons', () => {
  it('keeps the grammar library at the expected 28 published grammar lessons', () => {
    expect(NEW_GRAMMAR_LESSONS).toHaveLength(28);
    expect(NEW_GRAMMAR_LESSONS.every((lesson) => lesson.type === 'grammar')).toBe(true);
    expect(NEW_GRAMMAR_LESSONS.every((lesson) => lesson.is_published)).toBe(true);
  });

  it('keeps batch 1 lesson order stable for rollout QA', () => {
    expect(NEW_GRAMMAR_LESSONS.slice(0, 10).map((lesson) => lesson.slug)).toEqual(batchOneSlugs);
  });

  it('keeps every grammar lesson compatible with the shared grammar template', () => {
    NEW_GRAMMAR_LESSONS.forEach((lesson) => {
      const content = lesson.content;
      expect(content, `${lesson.slug} content`).toBeTruthy();
      expect(content.title, `${lesson.slug} title`).toBeTruthy();
      expect(content.targetLevel, `${lesson.slug} targetLevel`).toBeTruthy();
      expect(content.grammarForm || content.grammarFormItems?.length, `${lesson.slug} grammar structure`).toBeTruthy();

      REQUIRED_GRAMMAR_FIELDS.forEach((field) => {
        const value = content[field];
        expect(value, `${lesson.slug} missing ${field}`).toBeTruthy();
        if (Array.isArray(value)) {
          expect(value.length, `${lesson.slug} empty ${field}`).toBeGreaterThan(0);
        }
      });
    });
  });

  it('keeps mini practice answer keys aligned for every grammar lesson', () => {
    NEW_GRAMMAR_LESSONS.forEach((lesson) => {
      expect(lesson.content.answerKey.length, `${lesson.slug} answerKey length`).toBe(lesson.content.miniPractice.length);
    });
  });
});
