import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getBaseSiteSettings,
  getRouteSeoConfig,
  resolveRouteTitle,
} from '@/hooks/useSiteSettings';

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

/**
 * Automatically sets document.title on every route change based on ROUTE_TITLES map.
 * Dynamic pages (LessonPage, CourseDetailPage, etc.) can override with usePageTitle().
 * Mount once inside <Router> in App.tsx.
 */
export function PageTitleManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const applyForPath = () => {
      const base = getBaseSiteSettings();
      const routeSeo = getRouteSeoConfig(pathname);
      const fallbackRouteTitle = resolveRouteTitle(pathname);
      const chosenTitle = routeSeo?.title || fallbackRouteTitle;
      document.title = chosenTitle ? `${chosenTitle} | ${base.site_title}` : base.site_title;

      const chosenDesc = routeSeo?.description || base.site_description;
      setMeta('description', chosenDesc);
      setMeta('og:title', chosenTitle || base.site_title, true);
      setMeta('og:description', chosenDesc, true);
      setMeta('twitter:title', chosenTitle || base.site_title);
      setMeta('twitter:description', chosenDesc);
    };

    applyForPath();
    const onSettingsUpdated = () => applyForPath();
    window.addEventListener('site-settings-updated', onSettingsUpdated);
    return () => window.removeEventListener('site-settings-updated', onSettingsUpdated);
  }, [pathname]);

  return null;
}
