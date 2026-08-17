import { describe, expect, it } from 'vitest';
import {
  bulkMaintenanceEligibility,
  findBundleForModule,
  isBundleManagedModule,
} from './mockTestAdminGuards';

const bundles = [{
  id: 'bundle-1',
  title: 'Full mock 1',
  is_published: true,
  listening_test_id: 'l-1',
  reading_test_id: 'r-1',
  writing_test_id: 'w-1',
  speaking_test_id: 's-1',
}];

describe('mock test admin safeguards', () => {
  it('locates every module linked to a bundle', () => {
    expect(findBundleForModule(bundles, 'r-1')?.id).toBe('bundle-1');
    expect(isBundleManagedModule(bundles, 's-1')).toBe(true);
    expect(findBundleForModule(bundles, 'standalone')).toBeUndefined();
  });

  it('excludes published and bundle-managed content from bulk maintenance', () => {
    const result = bulkMaintenanceEligibility([
      { id: 'draft', is_published: false },
      { id: 'l-1', is_published: false },
      { id: 'published', is_published: true },
    ], bundles);

    expect(result.eligible.map(test => test.id)).toEqual(['draft']);
    expect(result.protected.map(test => test.id)).toEqual(['l-1', 'published']);
  });
});
