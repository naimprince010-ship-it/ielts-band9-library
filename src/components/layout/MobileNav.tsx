import { Link, useLocation } from 'react-router-dom';
import { BookOpen, GraduationCap, Target, User, Home } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function MobileNav() {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/vocabulary', icon: BookOpen, label: 'Vocab' },
    { path: '/grammar', icon: GraduationCap, label: 'Grammar' },
    { path: '/quiz', icon: Target, label: 'Quiz' },
    { path: user ? '/profile' : '/login', icon: User, label: user ? 'Profile' : 'Login' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center justify-center flex-1 h-full min-w-[64px] py-2 transition-all duration-200 touch-target ${
              isActive(path)
                ? 'text-foreground'
                : 'text-muted-foreground active:scale-95'
            }`}
          >
            <div className="relative flex items-center justify-center h-7 w-7">
              <Icon className={`h-5 w-5 transition-all ${
                isActive(path) 
                  ? 'stroke-[2.5]' 
                  : 'stroke-[1.5]'
              }`} />
              {isActive(path) && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
              )}
            </div>
            <span className={`text-[11px] mt-1 font-medium transition-colors ${
              isActive(path) 
                ? 'text-foreground' 
                : 'text-muted-foreground'
            }`}>
              {label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
