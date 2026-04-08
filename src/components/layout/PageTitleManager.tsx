import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTE_TITLES } from '@/hooks/useSiteSettings';

const SITE_NAME = 'IELTS Band 9 Materials Library';

/**
 * Automatically sets document.title on every route change based on ROUTE_TITLES map.
 * Dynamic pages (LessonPage, CourseDetailPage, etc.) can override with usePageTitle().
 * Mount once inside <Router> in App.tsx.
 */
export function PageTitleManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Exact match first
    if (ROUTE_TITLES[pathname]) {
      document.title = `${ROUTE_TITLES[pathname]} | ${SITE_NAME}`;
      return;
    }

    // Prefix match for dynamic routes (e.g. /lesson/some-slug, /courses/123)
    const prefix = Object.keys(ROUTE_TITLES)
      .filter(k => k !== '/')
      .sort((a, b) => b.length - a.length) // longest first
      .find(k => pathname.startsWith(k + '/'));

    if (prefix) {
      document.title = `${ROUTE_TITLES[prefix]} | ${SITE_NAME}`;
    }
    // Dynamic pages (lesson, course detail) will call usePageTitle() themselves
    // and override this — that's fine.
  }, [pathname]);

  return null;
}
