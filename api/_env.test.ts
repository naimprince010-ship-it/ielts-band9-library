import { describe, expect, it } from 'vitest';
import { cleanEnv } from './_env';

describe('cleanEnv', () => {
  it('removes whitespace and an actual BOM', () => {
    expect(cleanEnv(` \uFEFFsecret-value `)).toBe('secret-value');
  });

  it('removes a pasted literal BOM escape marker', () => {
    expect(cleanEnv('\\uFEFFsecret-value')).toBe('secret-value');
  });
});
