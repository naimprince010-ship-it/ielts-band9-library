import { describe, expect, it } from 'vitest';
import {
  buildAuthPath,
  captureFunnelAttribution,
  consumeOAuthReturnPath,
  getFunnelAttribution,
  readNextPath,
  sanitizeInternalPath,
  storeOAuthReturnPath,
} from './funnel';

class MemoryStorage implements Storage {
  private values = new Map<string, string>();
  get length() { return this.values.size; }
  clear() { this.values.clear(); }
  getItem(key: string) { return this.values.get(key) ?? null; }
  key(index: number) { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string) { this.values.delete(key); }
  setItem(key: string, value: string) { this.values.set(key, value); }
}

describe('funnel path safety', () => {
  it('keeps valid internal destinations', () => {
    expect(sanitizeInternalPath('/payment?package=yearly')).toBe('/payment?package=yearly');
  });

  it('blocks external and protocol-relative redirects', () => {
    expect(sanitizeInternalPath('https://evil.example')).toBe('/dashboard');
    expect(sanitizeInternalPath('//evil.example')).toBe('/dashboard');
  });

  it('builds and reads encoded auth destinations', () => {
    const url = buildAuthPath('/signup', '/payment?package=yearly', { offer: 'band7' });
    expect(url).toContain('/signup?');
    expect(readNextPath(url.slice(url.indexOf('?')))).toBe('/payment?package=yearly');
  });
});
describe('funnel attribution', () => {
  it('captures first-touch campaign data and merges later details', () => {
    const storage = new MemoryStorage();
    captureFunnelAttribution('?utm_source=facebook&utm_campaign=launch', '/offer/band7', storage);
    captureFunnelAttribution('?utm_content=video-2&offer=yearly', '/pricing', storage);

    expect(getFunnelAttribution(storage)).toMatchObject({
      utmSource: 'facebook',
      utmCampaign: 'launch',
      utmContent: 'video-2',
      offer: 'yearly',
      firstLandingPath: '/offer/band7',
    });
  });

  it('stores OAuth return destinations for one-time consumption', () => {
    const storage = new MemoryStorage();
    storeOAuthReturnPath('/pricing?plan=yearly', storage);
    expect(consumeOAuthReturnPath(storage)).toBe('/pricing?plan=yearly');
    expect(consumeOAuthReturnPath(storage)).toBe('/dashboard');
  });
});
