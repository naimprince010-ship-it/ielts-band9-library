import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Bell,
  BookOpen,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type StudentAppHeaderUser = {
  name?: string;
  email?: string;
} | null;

type StudentAppHeaderProps = {
  user: StudentAppHeaderUser;
  isAdmin: boolean;
  onSignOut: () => Promise<void> | void;
};

const studentNavItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Lessons', path: '/vocabulary' },
  { label: 'Practice', path: '/practice' },
  { label: 'Mock Tests', path: '/full-mock-test' },
  { label: 'Progress', path: '/progress' },
];

const practiceChildPaths = [
  '/daily-plan',
  '/grammar-exercises',
  '/essay-bank',
  '/practice/typing',
  '/speaking-practice',
  '/mock-test',
];

export function StudentAppHeader({ user, isAdmin, onSignOut }: StudentAppHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/vocabulary') {
      return location.pathname.startsWith('/lesson') || location.pathname.startsWith('/vocabulary');
    }

    if (path === '/practice') {
      return (
        location.pathname === '/practice' ||
        location.pathname.startsWith('/practice/') ||
        practiceChildPaths.some((practicePath) => location.pathname === practicePath || location.pathname.startsWith(`${practicePath}/`))
      );
    }

    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleSignOut = async () => {
    await onSignOut();
    navigate('/');
  };

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950 text-white shadow-lg shadow-slate-950/15">
        <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-5">
            <Link to="/dashboard" className="flex shrink-0 items-center gap-3">
              <img loading="eager" src="/icon.png" alt="IELTS Tree Logo" className="h-9 w-9 rounded-md object-contain" />
              <span className="text-lg font-black leading-tight tracking-tight">
                IELTS
                <span className="ml-1 font-medium tracking-[0.28em] text-white/80">TREE</span>
              </span>
            </Link>

            <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
              {studentNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    isActive(item.path)
                      ? 'bg-white/12 text-white shadow-sm'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-11 gap-3 rounded-full px-2 pr-3 text-white hover:bg-white/10 hover:text-white">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-indigo-400 to-blue-600">
                        <User className="h-4 w-4 text-white" />
                      </span>
                      <span className="max-w-28 truncate text-sm font-semibold">Hello, {user.name || 'Student'}</span>
                      <ChevronDown className="h-4 w-4 text-white/60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="border-b border-border px-2 py-2">
                      <p className="truncate text-sm font-medium">{user.name || 'Student'}</p>
                      {user.email && <p className="truncate text-xs text-muted-foreground">{user.email}</p>}
                    </div>
                    <DropdownMenuItem onClick={() => navigate('/profile')} className="gap-2.5 py-2">
                      <User className="h-4 w-4" />
                      My Profile
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => navigate('/admin')} className="gap-2.5 py-2">
                        <Settings className="h-4 w-4" />
                        Admin Panel
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="gap-2.5 py-2 text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="h-10 px-4 font-medium text-white hover:bg-white/10 hover:text-white">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="h-10 rounded-xl bg-blue-600 px-5 font-semibold text-white hover:bg-blue-500">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-lg text-white hover:bg-white/10 lg:hidden"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm transition lg:hidden ${
          mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div
        className={`fixed left-4 right-4 top-20 z-50 rounded-2xl border border-white/10 bg-slate-950 p-3 shadow-2xl transition lg:hidden ${
          mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-1">
          {studentNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${
                isActive(item.path) ? 'bg-white/12 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
