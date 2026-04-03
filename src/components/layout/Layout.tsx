import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileNav } from './MobileNav';

interface LayoutProps {
  children: ReactNode;
  hideNavFooter?: boolean;
}

export function Layout({ children, hideNavFooter = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideNavFooter && <Navbar />}
      <main className={`flex-1 ${!hideNavFooter ? 'pt-16 pb-16 md:pb-0' : 'h-screen overflow-y-auto'}`}>
        {children}
      </main>
      {!hideNavFooter && <Footer />}
      {!hideNavFooter && <MobileNav />}
    </div>
  );
}
