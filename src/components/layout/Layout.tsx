import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileNav } from './MobileNav';

interface LayoutProps {
  children: ReactNode;
  hideNavFooter?: boolean;
  hideFooter?: boolean;
}

export function Layout({ children, hideNavFooter = false, hideFooter = false }: LayoutProps) {
  const showFooter = !hideNavFooter && !hideFooter;
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
        {children}
      </main>
      {showFooter && <Footer />}
      {!hideNavFooter && <MobileNav />}
    </div>
  );
}
