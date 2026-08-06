import { describe, expect, it } from 'vitest';
import { getFullMockReadiness, isUsableFullMockTest } from './fullMockReadiness';

const questions = (count: number) => Array.from({ length: count }, (_, index) => ({ questionNumber: index + 1, correctAnswer: `answer-${index + 1}` }));
const listeningSections = () => Array.from({ length: 4 }, (_, index) => ({
  transcript: `Section ${index + 1} transcript`,
  sectionAudioUrl: `https://example.com/section-${index + 1}.mp3`,
  questions: questions(10),
}));

describe('full mock readiness', () => {
  it('rejects a partial listening test even when it has at least 10 questions', () => {
    const test = { test_data: { sections: [{ questions: questions(10) }] } };
    expect(isUsableFullMockTest(test, 'listening')).toBe(false);
    expect(getFullMockReadiness(test, 'listening').reason).toContain('4 sections');
  });

  it('accepts listening only with four sections and forty questions', () => {
    const test = { test_data: { sections: listeningSections() } };
    expect(isUsableFullMockTest(test, 'listening')).toBe(true);
  });

  it('rejects a structurally complete listening test without persistent audio', () => {
    const sections = listeningSections().map(section => ({ ...section, sectionAudioUrl: undefined }));
    expect(isUsableFullMockTest({ test_data: { sections } }, 'listening')).toBe(false);
  });

  it('accepts reading only with three passages and forty questions', () => {
    const test = { test_data: { passages: [
      { textContent: 'Passage one', questions: questions(13) },
      { textContent: 'Passage two', questions: questions(13) },
      { textContent: 'Passage three', questions: questions(14) },
    ] } };
    expect(isUsableFullMockTest(test, 'reading')).toBe(true);
  });

  it('rejects reading without passage text or answer keys', () => {
    const test = { test_data: { passages: [
      { textContent: '', questions: questions(13) },
      { textContent: 'Passage two', questions: questions(13) },
      { textContent: 'Passage three', questions: Array.from({ length: 14 }, () => ({})) },
    ] } };
    expect(isUsableFullMockTest(test, 'reading')).toBe(false);
  });

  it('rejects partial writing and speaking structures', () => {
    expect(isUsableFullMockTest({ test_data: { tasks: [{}] } }, 'writing')).toBe(false);
    expect(isUsableFullMockTest({ test_data: { parts: [{}, {}] } }, 'speaking')).toBe(false);
  });

  it('requires prompts and a renderable Task 1 visual for writing', () => {
    const incomplete = { test_data: { tasks: [{ taskNumber: 1, prompt: 'Describe the chart.' }, { taskNumber: 2, prompt: 'Write an essay.' }] } };
    expect(isUsableFullMockTest(incomplete, 'writing')).toBe(false);
    const complete = { test_data: { tasks: [{ taskNumber: 1, prompt: 'Describe the chart.', chartData: { type: 'line' } }, { taskNumber: 2, prompt: 'Write an essay.' }] } };
    expect(isUsableFullMockTest(complete, 'writing')).toBe(true);
  });

  it('accepts speaking only with interview questions, cue card, and discussion questions', () => {
    const incomplete = { test_data: { parts: [{ questions: [{ text: 'Where do you live?' }] }, {}, { questions: [{ text: 'Why do cities grow?' }] }] } };
    expect(isUsableFullMockTest(incomplete, 'speaking')).toBe(false);
    const complete = { test_data: { parts: [
      { questions: [{ text: 'Where do you live?' }] },
      { cueCard: { topic: 'Describe your hometown', bulletPoints: ['where it is', 'why you like it'] } },
      { questions: [{ text: 'Why do cities grow?' }] },
    ] } };
    expect(isUsableFullMockTest(complete, 'speaking')).toBe(true);
  });
});
