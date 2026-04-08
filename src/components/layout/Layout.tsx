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
      {!hideNavFooter && <Navbar />}
      <main className={`flex-1 ${!hideNavFooter ? 'pt-16 pb-16 md:pb-0' : 'h-screen overflow-y-auto'}`}>
        {children}
      </main>
      {showFooter && <Footer />}
      {!hideNavFooter && <MobileNav />}
    </div>
  );
}
