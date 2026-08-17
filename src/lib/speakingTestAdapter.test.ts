/**
 * Tests for the toSpeakingPaperParts adapter.
 * This pure function converts the typed SpeakingTest.parts array into the
 * SpeakingPaperPart[] format expected by FullMockSpeakingPaper.
 */
import { describe, expect, it } from 'vitest';
import { toSpeakingPaperParts } from '@/pages/SpeakingTestPage';
import type { SpeakingTest } from '@/types';

const SAMPLE_PARTS: SpeakingTest['parts'] = [
  {
    id: 'p1',
    partNumber: 1,
    partType: 'part1',
    title: 'Part 1: Introduction',
    instructions: 'Answer the following questions.',
    questions: [
      { id: 'q1', questionNumber: 1, text: 'Where are you from?', thinkTime: 3, recordTime: 30 },
      { id: 'q2', questionNumber: 2, text: 'What do you do?', thinkTime: 3, recordTime: 45 },
    ],
  },
  {
    id: 'p2',
    partNumber: 2,
    partType: 'part2',
    title: 'Part 2: Long Turn',
    instructions: 'Prepare and speak.',
    cueCard: {
      id: 'cue1',
      topic: 'Describe a memorable trip',
      bulletPoints: ['where you went', 'who you went with', 'what you did'],
      prepTime: 60,
      recordTime: 120,
    },
  },
  {
    id: 'p3',
    partNumber: 3,
    partType: 'part3',
    title: 'Part 3: Discussion',
    instructions: 'Discuss these ideas.',
    questions: [
      { id: 'q3', questionNumber: 1, text: 'Why do people travel?', thinkTime: 5, recordTime: 60 },
    ],
  },
];

describe('toSpeakingPaperParts — adapter', () => {
  it('returns the same number of parts', () => {
    const result = toSpeakingPaperParts(SAMPLE_PARTS);
    expect(result).toHaveLength(3);
  });

  it('preserves part titles and instructions', () => {
    const result = toSpeakingPaperParts(SAMPLE_PARTS);
    expect(result[0].title).toBe('Part 1: Introduction');
    expect(result[0].instructions).toBe('Answer the following questions.');
  });

  it('maps Part 1 questions — preserves text and recordTime', () => {
    const result = toSpeakingPaperParts(SAMPLE_PARTS);
    expect(result[0].questions).toHaveLength(2);
    expect(result[0].questions![0].text).toBe('Where are you from?');
    expect(result[0].questions![0].recordTime).toBe(30);
    expect(result[0].questions![1].recordTime).toBe(45);
  });

  it('maps Part 2 cueCard — no questions array', () => {
    const result = toSpeakingPaperParts(SAMPLE_PARTS);
    expect(result[1].cueCard).not.toBeNull();
    expect(result[1].cueCard?.topic).toBe('Describe a memorable trip');
    expect(result[1].cueCard?.bulletPoints).toHaveLength(3);
    expect(result[1].cueCard?.prepTime).toBe(60);
    expect(result[1].cueCard?.recordTime).toBe(120);
    // questions may be undefined for Part 2
    expect(result[1].questions).toBeUndefined();
  });

  it('maps Part 3 questions — preserves text and recordTime', () => {
    const result = toSpeakingPaperParts(SAMPLE_PARTS);
    expect(result[2].questions).toHaveLength(1);
    expect(result[2].questions![0].text).toBe('Why do people travel?');
    expect(result[2].questions![0].recordTime).toBe(60);
  });

  it('does not include cueCard on Part 1 or Part 3', () => {
    const result = toSpeakingPaperParts(SAMPLE_PARTS);
    expect(result[0].cueCard).toBeUndefined();
    expect(result[2].cueCard).toBeUndefined();
  });

  it('does not leak SpeakingTest-specific fields (id, partNumber, etc.)', () => {
    const result = toSpeakingPaperParts(SAMPLE_PARTS);
    // SpeakingPaperPart only has title, instructions, questions, cueCard
    expect((result[0] as Record<string, unknown>).id).toBeUndefined();
    expect((result[0] as Record<string, unknown>).partNumber).toBeUndefined();
    expect((result[0] as Record<string, unknown>).partType).toBeUndefined();
  });

  it('handles a part with neither questions nor cueCard gracefully', () => {
    const minimal: SpeakingTest['parts'] = [
      { id: 'p', partNumber: 1, partType: 'part1', title: 'Part 1', instructions: '' },
      { id: 'p2', partNumber: 2, partType: 'part2', title: 'Part 2', instructions: '' },
      { id: 'p3', partNumber: 3, partType: 'part3', title: 'Part 3', instructions: '' },
    ];
    const result = toSpeakingPaperParts(minimal);
    expect(result[0].questions).toBeUndefined();
    expect(result[0].cueCard).toBeUndefined();
  });
});
