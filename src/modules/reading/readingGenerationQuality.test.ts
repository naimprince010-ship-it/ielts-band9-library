import { describe, expect, it } from 'vitest';
import type { ReadingLessonData } from './readingLesson';
import { assessReadingGenerationQuality } from './readingGenerationQuality';

const paragraphs = ['A', 'B', 'C', 'D', 'E'].map((label, index) => ({
  label,
  content: Array.from({ length: 125 }, (_, word) => `word${index}-${word}`).join(' '),
}));

const lesson = (): ReadingLessonData => ({
  schemaVersion: 1,
  passageFormat: 'academic',
  passageTitle: 'Urban water systems',
  passageContent: paragraphs.map((paragraph) => paragraph.content).join('\n'),
  paragraphs,
  questionGroups: [
    {
      id: 'skim', type: 'matching_headings', instructions: 'Match headings.',
      strategy: { focus: ['skimming', 'main_idea'], steps: ['Read first sentences.', 'Choose the main idea.'], suggestedSeconds: 180 },
      questions: ['A', 'B', 'C', 'D'].map((ref) => ({ id: `s-${ref}`, prompt: `Heading for ${ref}`, acceptedAnswers: ['i'], explanation: `Paragraph ${ref} gives the central idea.`, paragraphRefs: [ref] })),
    },
    {
      id: 'scan', type: 'short_answer', instructions: 'Find the detail.',
      strategy: { focus: ['scanning', 'detail'], steps: ['Predict a keyword.', 'Find its synonym.'], suggestedSeconds: 180 },
      questions: ['B', 'C', 'D', 'E'].map((ref) => ({ id: `c-${ref}`, prompt: `Detail in ${ref}`, acceptedAnswers: ['answer'], explanation: `Paragraph ${ref} contains the required detail.`, paragraphRefs: [ref] })),
    },
  ],
  quality: { passageReviewed: false, questionsReviewed: false, answersChecked: false, copyrightConfirmed: false, skillAlignmentReviewed: false, difficultyReviewed: false },
});

describe('Reading generation quality gate', () => {
  it('accepts a complete skill-based skimming and scanning draft', () => {
    expect(assessReadingGenerationQuality('Skimming and scanning', lesson())).toEqual({ passed: true, blockingReasons: [] });
  });

  it('blocks inconsistent passage content and missing evidence explanations', () => {
    const draft = lesson();
    draft.passageContent = 'Different passage';
    draft.questionGroups[0].questions[0].explanation = 'It is correct.';
    expect(assessReadingGenerationQuality('Skimming and scanning', draft).blockingReasons).toEqual(expect.arrayContaining([
      'Passage content must match the labelled paragraphs in the same order.',
      'Question “s-A” needs an explanation that identifies its evidence paragraph.',
    ]));
  });

  it('blocks merged skimming and scanning into the same question group', () => {
    const draft = lesson();
    draft.questionGroups = [
      { ...draft.questionGroups[0], strategy: { ...draft.questionGroups[0].strategy!, focus: ['skimming', 'scanning'] }, questions: [...draft.questionGroups[0].questions, ...draft.questionGroups[1].questions] },
    ];
    expect(assessReadingGenerationQuality('Skimming and scanning', draft).blockingReasons).toContain('Skimming and scanning must be practised in separate question groups.');
  });
});
