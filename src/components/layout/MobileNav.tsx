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
    <nav className="lg:hidden fixed bottom-3 left-1/2 z-50 w-[calc(100%-1rem)] max-w-md -translate-x-1/2 rounded-[20px] border border-slate-200/80 bg-white/80 p-2 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.45)] backdrop-blur-xl safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center justify-center flex-1 h-full min-w-[64px] rounded-xl py-2 transition-all duration-200 touch-target ${
              isActive(path)
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-500 active:scale-95 hover:bg-slate-50'
            }`}
          >
            <div className="relative flex items-center justify-center h-7 w-7">
              <Icon className={`h-5 w-5 transition-all ${
                isActive(path) 
                  ? 'stroke-[2.5]' 
                  : 'stroke-[1.5]'
              }`} />
            </div>
            <span className={`text-[11px] mt-1 font-semibold transition-colors ${
              isActive(path) 
                ? 'text-indigo-700' 
                : 'text-slate-500'
            }`}>
              {label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
