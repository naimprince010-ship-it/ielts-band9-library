import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileNav } from './MobileNav';
import { getRouteSeoConfig, resolveRouteTitle } from '@/hooks/useSiteSettings';

interface LayoutProps {
  children: ReactNode;
  hideNavFooter?: boolean;
  hideFooter?: boolean;
}

export function Layout({ children, hideNavFooter = false, hideFooter = false }: LayoutProps) {
  const { pathname } = useLocation();
  const [settingsVersion, setSettingsVersion] = useState(0);
  const showFooter = !hideNavFooter && !hideFooter;
  useEffect(() => {
    const onSettingsUpdated = () => setSettingsVersion((v) => v + 1);
    window.addEventListener('site-settings-updated', onSettingsUpdated);
    return () => window.removeEventListener('site-settings-updated', onSettingsUpdated);
  }, []);

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
    <div className="min-h-screen flex flex-col bg-background">
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
        className={`flex-1 ${!hideNavFooter ? 'pt-16 pb-16 md:pb-0' : 'h-screen overflow-y-auto'}`}
      >
        <h1 className="sr-only">{seoHeadings.h1}</h1>
        <h2 className="sr-only">{seoHeadings.h2}</h2>
        {children}
      </main>
      {showFooter && <Footer />}
      {!hideNavFooter && <MobileNav />}
    </div>
  );
}
