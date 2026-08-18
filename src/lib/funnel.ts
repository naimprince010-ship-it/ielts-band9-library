export const FUNNEL_ATTRIBUTION_KEY = 'ielts_tree_funnel_attribution';
export const OAUTH_RETURN_PATH_KEY = 'ielts_tree_oauth_return_path';

export interface FunnelAttribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  offer?: string;
  referral?: string;
  firstLandingPath: string;
  capturedAt: string;
}
const readStorage = (storage: Storage | undefined, key: string): string | null => {
  if (!storage) return null;
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
};

const writeStorage = (storage: Storage | undefined, key: string, value: string): void => {
  if (!storage) return;
  try {
    storage.setItem(key, value);
  } catch {
    // Storage can be unavailable in private browsing or embedded browsers.
  }
};

export function sanitizeInternalPath(value: string | null | undefined, fallback = '/dashboard'): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return fallback;
  if (/^[a-z][a-z\d+.-]*:/i.test(value.slice(1))) return fallback;
  return value;
}

export function getFunnelAttribution(storage: Storage | undefined = globalThis.localStorage): FunnelAttribution | null {
  const raw = readStorage(storage, FUNNEL_ATTRIBUTION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as FunnelAttribution;
    return parsed?.firstLandingPath && parsed?.capturedAt ? parsed : null;
  } catch {
    return null;
  }
}

export function captureFunnelAttribution(
  search: string,
  pathname: string,
  storage: Storage | undefined = globalThis.localStorage,
): FunnelAttribution | null {
  const params = new URLSearchParams(search);
  const existing = getFunnelAttribution(storage);
  const hasCampaignData = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'offer', 'ref',
  ].some((key) => params.has(key));

  if (!hasCampaignData) return existing;

  const attribution: FunnelAttribution = {
    utmSource: params.get('utm_source') || existing?.utmSource || undefined,
    utmMedium: params.get('utm_medium') || existing?.utmMedium || undefined,
    utmCampaign: params.get('utm_campaign') || existing?.utmCampaign || undefined,
    utmContent: params.get('utm_content') || existing?.utmContent || undefined,
    utmTerm: params.get('utm_term') || existing?.utmTerm || undefined,
    offer: params.get('offer') || existing?.offer || undefined,
    referral: params.get('ref') || existing?.referral || undefined,
    firstLandingPath: existing?.firstLandingPath || pathname,
    capturedAt: existing?.capturedAt || new Date().toISOString(),
  };

  writeStorage(storage, FUNNEL_ATTRIBUTION_KEY, JSON.stringify(attribution));
  return attribution;
}

export function buildAuthPath(route: '/login' | '/signup', nextPath: string, extras?: Record<string, string | undefined>): string {
  const params = new URLSearchParams({ next: sanitizeInternalPath(nextPath) });
  Object.entries(extras || {}).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  return `${route}?${params.toString()}`;
}

export function readNextPath(search: string, fallback = '/dashboard'): string {
  return sanitizeInternalPath(new URLSearchParams(search).get('next'), fallback);
}

export function storeOAuthReturnPath(path: string, storage: Storage | undefined = globalThis.sessionStorage): void {
  writeStorage(storage, OAUTH_RETURN_PATH_KEY, sanitizeInternalPath(path));
}

export function consumeOAuthReturnPath(storage: Storage | undefined = globalThis.sessionStorage): string {
  const path = sanitizeInternalPath(readStorage(storage, OAUTH_RETURN_PATH_KEY));
  try {
    storage?.removeItem(OAUTH_RETURN_PATH_KEY);
  } catch {
    // Ignore unavailable storage.
  }
  return path;
}

type FunnelEventProperties = Record<string, string | number | boolean | null | undefined>;

export function trackFunnelEvent(name: string, properties: FunnelEventProperties = {}): void {
  if (typeof window === 'undefined') return;

  const payload = {
    event: name,
    ...properties,
    timestamp: new Date().toISOString(),
  };

  const dataLayerWindow = window as Window & { dataLayer?: Array<Record<string, unknown>> };
  dataLayerWindow.dataLayer = dataLayerWindow.dataLayer || [];
  dataLayerWindow.dataLayer.push(payload);

  // Meta events are emitted only after explicit marketing consent.
  if (window.localStorage.getItem('marketing_consent') !== 'granted') return;
  const metaWindow = window as Window & { fbq?: (...args: unknown[]) => void };
  metaWindow.fbq?.('trackCustom', name, properties);
}
