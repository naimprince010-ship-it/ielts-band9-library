import { describe, expect, it } from 'vitest';
import { isGenericQuestionText, isQuestionTypeInvalid, normalizeQuestionType } from './mockQuestionNormalization';

describe('mock question normalization', () => {
  it('maps common AI aliases to supported canonical types', () => {
    expect(normalizeQuestionType('multiple-choice', '', ['mcq', 'fill-blank'])).toBe('mcq');
    expect(normalizeQuestionType('note-completion', '', ['mcq', 'fill-blank'])).toBe('fill-blank');
    expect(isQuestionTypeInvalid('unknown', 'Complete the table below', ['mcq', 'fill-blank'])).toBe(false);
  });

  it('identifies generic instructions that need a specific prompt', () => {
    expect(isGenericQuestionText('Complete the table below.')).toBe(true);
    expect(isGenericQuestionText('What caused the decline in 2019?')).toBe(false);
  });
});
