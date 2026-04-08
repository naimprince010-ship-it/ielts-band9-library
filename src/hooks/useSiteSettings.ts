import { useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const FALLBACK = {
  site_title: 'IELTS Band 9 Materials Library',
  site_description:
    'Master IELTS vocabulary and grammar with our curated, AI-enhanced lessons. Self-study resources designed for Band 7+ success.',
  favicon_url: '/icon.png',
  og_image_url:
    'https://fjzqtzqflsqjevrurgbm.supabase.co/storage/v1/object/public/site-assets/site-assets/og-1766730300872.png',
};

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setFavicon(url: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = url;
}

async function applySettings() {
  const settings: Record<string, string> = { ...FALLBACK };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data } = await supabase.from('site_settings').select('key,value');
      if (data) {
        data.forEach((row: { key: string; value: string }) => {
          if (row.key && row.value) settings[row.key] = row.value;
        });
      }
    } catch {
      // Fall back silently
    }
  }

  const title = settings.site_title || FALLBACK.site_title;
  const desc = settings.site_description || FALLBACK.site_description;
  const favicon = settings.favicon_url || FALLBACK.favicon_url;
  const ogImage = settings.og_image_url || FALLBACK.og_image_url;

  // Document title & meta
  document.title = title;
  setMeta('description', desc);
  setFavicon(favicon);

  // Open Graph
  setMeta('og:title', title, true);
  setMeta('og:description', desc, true);
  setMeta('og:image', ogImage, true);

  // Twitter Card
  setMeta('twitter:title', title);
  setMeta('twitter:description', desc);
  setMeta('twitter:image', ogImage);
}

/**
 * Call once at app root to apply DB site_settings to document meta tags, title, and favicon.
 */
export function useSiteSettings() {
  useEffect(() => {
    applySettings();
  }, []);
}

/**
 * Set the document title for a specific page (overrides global site title).
 * e.g. usePageTitle('Pricing') → "Pricing | IELTS Band 9 Materials Library"
 */
export function usePageTitle(pageTitle: string | null) {
  useEffect(() => {
    if (!pageTitle) return;
    const base = FALLBACK.site_title;
    document.title = `${pageTitle} | ${base}`;
    return () => { document.title = base; };
  }, [pageTitle]);
}

/** Route → Page title mapping used by PageTitleManager */
export const ROUTE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/vocabulary': 'Vocabulary Library',
  '/grammar': 'Grammar Library',
  '/writing': 'Writing Library',
  '/speaking': 'Speaking Library',
  '/pricing': 'Pricing',
  '/courses': 'Courses',
  '/mock-test': 'Mock Tests',
  '/full-mock-test': 'Full Mock Test',
  '/reading-test': 'IELTS Reading Test',
  '/writing-test': 'IELTS Writing Test',
  '/listening-test': 'IELTS Listening Test',
  '/speaking-test': 'IELTS Speaking Test',
  '/profile': 'My Profile',
  '/login': 'Sign In',
  '/signup': 'Create Account',
  '/forgot-password': 'Forgot Password',
  '/reset-password': 'Reset Password',
  '/faq': 'FAQ',
  '/contact': 'Contact Us',
  '/terms': 'Terms of Service',
  '/privacy': 'Privacy Policy',
  '/bookmarks': 'Bookmarks',
  '/progress': 'My Progress',
  '/achievements': 'Achievements',
  '/essay-bank': 'Essay Bank',
  '/daily-plan': 'Daily Study Plan',
  '/diagnostic': 'Diagnostic Test',
  '/flashcards': 'Flashcards',
  '/quiz': 'Practice Quiz',
  '/natural-grammar': 'Natural Grammar',
  '/grammar-exercises': 'Grammar Exercises',
  '/collections': 'Collections',
  '/practice/typing': 'Typing Practice',
  '/reading-practice': 'Reading Practice',
  '/speaking-practice': 'Speaking Practice',
  '/writing-checker': 'Writing Checker',
  '/results': 'Test Results',
  '/payment': 'Payment',
  '/certificate': 'Certificate',
  '/admin': 'Admin Panel',
};
