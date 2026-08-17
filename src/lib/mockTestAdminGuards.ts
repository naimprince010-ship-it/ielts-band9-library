export interface LinkedBundle {
  id: string;
  title: string;
  is_published: boolean;
  listening_test_id: string;
  reading_test_id: string;
  writing_test_id: string;
  speaking_test_id: string;
}

const linkedModuleIds = (bundle: LinkedBundle): string[] => [
  bundle.listening_test_id,
  bundle.reading_test_id,
  bundle.writing_test_id,
  bundle.speaking_test_id,
];

export const findBundleForModule = (
  bundles: LinkedBundle[],
  mockTestId: string,
): LinkedBundle | undefined => bundles.find(bundle => linkedModuleIds(bundle).includes(mockTestId));

export const isBundleManagedModule = (
  bundles: LinkedBundle[],
  mockTestId: string,
): boolean => Boolean(findBundleForModule(bundles, mockTestId));

export const bulkMaintenanceEligibility = <T extends { id: string; is_published: boolean }>(
  tests: T[],
  bundles: LinkedBundle[],
): { eligible: T[]; protected: T[] } => {
  const eligible: T[] = [];
  const protectedTests: T[] = [];

  for (const test of tests) {
    if (test.is_published || isBundleManagedModule(bundles, test.id)) protectedTests.push(test);
    else eligible.push(test);
  }

  return { eligible, protected: protectedTests };
};
