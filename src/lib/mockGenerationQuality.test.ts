import { describe, expect, it } from 'vitest';
import { findDuplicateMatch, textSimilarity } from './mockGenerationQuality';
import type { ReadingTest } from '@/types';

const reading = (text: string, questionText = 'What is the main finding?'): ReadingTest => ({
  id: 'reading-test',
  title: 'Reading',
  testType: 'academic',
  totalQuestions: 1,
  timeLimit: 3600,
  passages: [{
    id: 'p1', passageNumber: 1, title: 'Passage', textContent: text,
    questions: [{ id: 'q1', questionNumber: 1, type: 'short-answer', questionText, correctAnswer: 'result' }],
    questionRange: { start: 1, end: 1 },
  }],
});

describe('mock generation quality', () => {
  it('detects copied source material despite punctuation and case changes', () => {
    const original = 'Urban forests reduce summer heat and improve air quality for residents living near busy roads.';
    const copied = 'URBAN forests reduce summer heat, and improve air quality for residents living near busy roads!';
    expect(textSimilarity(original, copied)).toBeGreaterThan(0.8);
  });

  it('does not flag unrelated source material', () => {
    const candidate = reading('Marine biologists tracked whale migration across the southern ocean.', 'Where did the whales migrate?');
    const existing = reading('Architects designed modular housing to reduce construction waste.', 'What reduced waste?');
    expect(findDuplicateMatch('reading', candidate, [{ id: 'old', module_type: 'reading', test_data: existing }])).toBeNull();
  });

  it('flags repeated question sets even when source wording differs', () => {
    const candidate = reading('A completely new passage about solar power adoption.');
    const existing = reading('A different passage about public transport investment.');
    const match = findDuplicateMatch('reading', candidate, [{ id: 'old', module_type: 'reading', test_data: existing }]);
    expect(match?.questionOverlap).toBe(1);
  });

});
