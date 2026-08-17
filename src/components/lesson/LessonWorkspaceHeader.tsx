import { Bell, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavContext } from '@/contexts/NavContext';

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Lessons', to: '/vocabulary' },
  { label: 'Practice', to: '/practice' },
  { label: 'Mock Tests', to: '/full-mock-test' },
  { label: 'Progress', to: '/progress' },
];

/**
 * Fixed navy dashboard header used by the full-workspace lesson templates
 * (grammar, writing). Extracted from GrammarLessonTemplate's original
 * private `GrammarDashboardHeader` so both templates share one
 * implementation instead of forking it — purely a lift-and-share, no
 * behavior change from the original grammar-only version.
 *
 * Also a NavContext consumer, same as the standard Navbar — this is a
 * second "skin" over the same shared `title`/`actions` data, not a
 * separate system. A lesson template calls useNavConfig({ mode: 'focused',
 * title, actions }) once; whichever header is actually mounted (this one,
 * because the route is still under the plain <Navbar/> physically hidden
 * behind this fixed overlay) picks up the same values.
 */
export function LessonWorkspaceHeader() {
  const { navConfig } = useNavContext();
  const { title, actions } = navConfig;

  return (
    <header className="fixed inset-x-0 top-0 z-[70] border-b border-white/10 bg-[linear-gradient(90deg,#08102f_0%,#101944_55%,#17205a_100%)] text-white shadow-lg shadow-slate-950/20">
      <div className="mx-auto flex h-16 max-w-[96rem] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 shrink items-center gap-3">
          <Link to="/dashboard" className="flex shrink-0 items-center gap-3">
            <img loading="eager" src="/icon.png" alt="IELTS Tree Logo" className="h-9 w-9 rounded-md bg-white object-contain p-0.5" />
            <span className="text-lg font-black leading-tight tracking-tight">
              IELTS
              <span className="ml-1 font-medium tracking-[0.28em] text-white/80">TREE</span>
            </span>
          </Link>
          {title && (
            <span className="hidden truncate border-l border-white/15 pl-3 text-sm font-semibold text-white/80 md:inline-block md:max-w-[16rem]">
              {title}
            </span>
          )}
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Lesson navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                item.label === 'Lessons'
                  ? 'bg-white/12 text-white shadow-sm'
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {actions && (
            <div className="flex items-center gap-2 border-r border-white/10 pr-2 mr-1">
              {actions}
            </div>
          )}
          <button
            type="button"
            className="hidden h-10 w-10 place-items-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 sm:grid"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="hidden h-10 w-10 place-items-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 sm:grid"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-2 py-1.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-indigo-400 to-blue-600">
              <User className="h-4 w-4 text-white" />
            </span>
            <span className="hidden max-w-28 truncate text-sm font-semibold sm:inline">Hello, Student</span>
          </div>
        </div>
      </div>
    </header>
  );
}
