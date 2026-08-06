import { describe, expect, it } from 'vitest';
import { buildObjectiveReview, getObjectiveAcceptedAnswers, isObjectiveAnswerCorrect } from './fullMockScoring';
import { calculateBandScore } from '@/utils/scoring';

describe('full mock objective scoring', () => {
  it('accepts normalized text and alternative answers', () => {
    const question = { correctAnswer: 'city centre', acceptedAnswers: ['city center'] };
    expect(isObjectiveAnswerCorrect(' City Center! ', question)).toBe(true);
    expect(getObjectiveAcceptedAnswers(question)).toContain('city centre');
  });

  it('scores letter answer keys against the selected option text', () => {
    const question = { options: ['Alpha', 'Beta', 'Gamma'], correctAnswer: 'B' };
    expect(isObjectiveAnswerCorrect('Beta', question)).toBe(true);
    expect(isObjectiveAnswerCorrect('B', question)).toBe(true);
    expect(isObjectiveAnswerCorrect('Alpha', question)).toBe(false);
  });

  it('keeps global reading keys aligned across forty questions', () => {
    const questions = Array.from({ length: 40 }, (_, index) => ({ correctAnswer: `answer ${index + 1}` }));
    const answers = Object.fromEntries(questions.map((_question, index) => [`r_${index}`, `answer ${index + 1}`]));
    const review = buildObjectiveReview(questions, answers, 'r');
    expect(review.total).toBe(40);
    expect(review.correct).toBe(40);
    expect(review.items[39].questionNumber).toBe(40);
  });
});

describe('IELTS official band score tables', () => {
  // These cases verify the official IELTS raw-score lookup tables that
  // FullMockTestPage now delegates to for reading and listening scoring.
  it('reading: 23/40 gives band 6.0 (official table, not percentage estimate 5.5)', () => {
    expect(calculateBandScore(23, 'reading')).toBe(6.0);
  });

  it('reading: 30/40 gives band 7.0', () => {
    expect(calculateBandScore(30, 'reading')).toBe(7.0);
  });

  it('reading: 39/40 gives band 9.0', () => {
    expect(calculateBandScore(39, 'reading')).toBe(9.0);
  });

  it('listening: 23/40 gives band 6.0 (official table, not percentage estimate 5.5)', () => {
    expect(calculateBandScore(23, 'listening')).toBe(6.0);
  });

  it('listening: 30/40 gives band 7.0', () => {
    expect(calculateBandScore(30, 'listening')).toBe(7.0);
  });

  it('listening: 39/40 gives band 9.0', () => {
    expect(calculateBandScore(39, 'listening')).toBe(9.0);
  });

  it('reading and listening diverge at the same raw score (26/40)', () => {
    // Reading 26/40 → 6.0 (range 23-26); Listening 26/40 → 6.5 (range 26-29)
    // The old shared-percentage table gave both the same value — reading was wrong.
    expect(calculateBandScore(26, 'reading')).toBe(6.0);
    expect(calculateBandScore(26, 'listening')).toBe(6.5);
  });

  it('edge: 0 correct returns band 0.0', () => {
    expect(calculateBandScore(0, 'reading')).toBe(0.0);
    expect(calculateBandScore(0, 'listening')).toBe(0.0);
  });
});
