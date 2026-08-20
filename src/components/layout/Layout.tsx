import { ReactNode, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileNav } from './MobileNav';
import { getRouteSeoConfig, resolveRouteTitle } from '@/hooks/useSiteSettings';
import { useNavContext, useNavExitGuard, type NavMode } from '@/contexts/NavContext';

interface LayoutProps {
  children: ReactNode;
  /**
   * Replaces the old `hideNavFooter` / `hideFooter` booleans. Defaults to
   * 'browse' (full chrome — Navbar, Footer, MobileNav all shown).
   *
   * A page rendered inside this Layout can still go further and override
   * the active mode — plus add a title/actions/centerContent — by calling
   * useNavConfig() itself (see src/contexts/NavContext.tsx). That override
   * always wins over whatever this prop says.
   */
  mode?: NavMode;
}

export function Layout({ children, mode = 'browse' }: LayoutProps) {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const [settingsVersion, setSettingsVersion] = useState(0);
  const { navConfig, setNavConfig } = useNavContext();

  // Publish this route's default mode into context. useLayoutEffect (not
  // useEffect) matters here: React runs every layout effect in the tree —
  // parents included — before any passive effect fires, regardless of
  // nesting order. So this always lands before a nested page's
  // useNavConfig() call (a passive effect), which means the page's richer
  // config always wins, never gets clobbered back to the route default.
  useLayoutEffect(() => {
    setNavConfig({ mode });
  }, [mode, setNavConfig]);

  const activeMode = navConfig.mode;
  const hideNavFooter = activeMode === 'exam';
  const showFooter = activeMode === 'browse';

  // Any page that sets onExitAttempt via useNavConfig gets browser-level
  // back-button/refresh/close protection automatically — see the comment
  // on useNavExitGuard for why this lives here instead of in each page.
  useNavExitGuard(navConfig.onExitAttempt);

  useEffect(() => {
    const onSettingsUpdated = () => setSettingsVersion((v) => v + 1);
    window.addEventListener('site-settings-updated', onSettingsUpdated);
    return () => window.removeEventListener('site-settings-updated', onSettingsUpdated);
  }, []);

  // Ensure forward navigations open from the top. Without this, SPA route
  // changes can keep the previous page's scroll position, which makes short
  // pages appear to jump straight to the footer.
  useEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname, navigationType]);

  const seoHeadings = useMemo(() => {
    const routeSeo = getRouteSeoConfig(pathname);
    const fallbackTitle = resolveRouteTitle(pathname) || 'IELTS Tree';
    const h1 = routeSeo?.h1?.trim() || routeSeo?.title?.trim() || fallbackTitle;
    const h2 =
      routeSeo?.h2?.trim() ||
      routeSeo?.description?.trim() ||
      `${fallbackTitle} page details`;
    return { h1, h2 };
  }, [pathname, settingsVersion]);

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-foreground">
      {/* Skip navigation for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:font-medium focus:shadow-lg"
      >
        Skip to main content
      </a>

      {!hideNavFooter && <Navbar />}
      <main
        id="main-content"
        tabIndex={-1}
        className={`flex-1 ${!hideNavFooter ? 'pt-24 pb-20 md:pb-0' : 'h-screen overflow-y-auto'}`}
      >
        <h1 className="sr-only">{seoHeadings.h1}</h1>
        <h2 className="sr-only">{seoHeadings.h2}</h2>
        <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-5 lg:px-8">{children}</div>
      </main>
      {showFooter && <Footer />}
      {!hideNavFooter && <MobileNav />}
    </div>
  );
}
