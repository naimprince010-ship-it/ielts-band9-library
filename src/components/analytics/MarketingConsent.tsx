import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const CONSENT_KEY = 'marketing_consent';

function initializeMetaPixel() {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID?.trim();
  if (!pixelId || document.querySelector(`script[data-meta-pixel="${pixelId}"]`)) return;

  const metaWindow = window as Window & { fbq?: (...args: unknown[]) => void; _fbq?: unknown };
  const queue = function (...args: unknown[]) {
    if (queue.callMethod) queue.callMethod(...args);
    else queue.queue.push(args);
  } as ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue: unknown[]; loaded: boolean; version: string };
  queue.queue = [];
  queue.loaded = true;
  queue.version = '2.0';
  metaWindow.fbq = metaWindow.fbq || queue;
  metaWindow._fbq = metaWindow._fbq || metaWindow.fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  script.dataset.metaPixel = pixelId;
  document.head.appendChild(script);
  metaWindow.fbq('init', pixelId);
  metaWindow.fbq('track', 'PageView');
}

export function MarketingConsent() {
  const [choice, setChoice] = useState<string | null>(() => window.localStorage.getItem(CONSENT_KEY));

  useEffect(() => {
    if (choice === 'granted') initializeMetaPixel();
  }, [choice]);

  if (choice) return null;

  const choose = (value: 'granted' | 'essential_only') => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setChoice(value);
  };

  return (
    <aside className="fixed inset-x-3 bottom-3 z-[100] mx-auto w-[calc(100%-1.5rem)] max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:flex sm:items-center sm:gap-5" aria-label="Privacy choices">
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-950">Your privacy choices</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">We use essential storage for sign-in and progress. With your permission, marketing analytics helps us measure which campaigns are useful.</p>
      </div>
      <div className="mt-3 flex gap-2 sm:mt-0">
        <Button variant="outline" size="sm" onClick={() => choose('essential_only')}>Essential only</Button>
        <Button size="sm" className="bg-indigo-700 hover:bg-indigo-800" onClick={() => choose('granted')}>Allow analytics</Button>
      </div>
    </aside>
  );
}
