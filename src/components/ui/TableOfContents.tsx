import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { List, ChevronDown, CheckCircle2, Circle } from 'lucide-react';
import { Button } from './button';

interface TOCItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  group?: 'learning' | 'practice' | 'review';
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
  completedSections?: string[];
}

// Group items by category
function groupItems(items: TOCItem[]): { learning: TOCItem[]; practice: TOCItem[]; review: TOCItem[] } {
  const learning: TOCItem[] = [];
  const practice: TOCItem[] = [];
  const review: TOCItem[] = [];

  items.forEach((item) => {
    if (item.group) {
      if (item.group === 'learning') learning.push(item);
      if (item.group === 'practice') practice.push(item);
      if (item.group === 'review') review.push(item);
      return;
    }
    const id = item.id.toLowerCase();
    if (id.includes('overview') || id.includes('what-you-will-learn') || id.includes('compare') || id.includes('learn') || id.includes('explanation') || id.includes('grammar') || id.includes('use')) {
      learning.push({ ...item, group: 'learning' });
    } else if (id.includes('example') || id.includes('check') || id.includes('practice') || id.includes('collocation') || id.includes('synonym') || id.includes('speaking') || id.includes('sentence') || id.includes('apply')) {
      practice.push({ ...item, group: 'practice' });
    } else {
      review.push({ ...item, group: 'review' });
    }
  });

  return { learning, practice, review };
}

export function TableOfContents({ items, className, completedSections = [] }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [viewedSections, setViewedSections] = useState<Set<string>>(new Set(completedSections));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            // Mark section as viewed when scrolled into view
            setViewedSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const grouped = groupItems(items);
  const groupLabels = {
    learning: 'Learning',
    practice: 'Practice',
    review: 'Review'
  };
  const progress = items.length ? Math.round((viewedSections.size / items.length) * 100) : 0;

  const renderItem = (item: TOCItem) => {
    const isActive = activeId === item.id;
    const isViewed = viewedSections.has(item.id) && !isActive;

    return (
      <button
        key={item.id}
        onClick={() => scrollToSection(item.id)}
        className={cn(
          'group flex min-h-10 w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
          isActive && 'bg-indigo-50/80 text-indigo-700 shadow-[inset_2px_0_0_#4f46e5]',
          isViewed && 'text-slate-500 hover:bg-slate-50 hover:text-slate-700',
          !isActive && !isViewed && 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
        )}
      >
        <span className={cn(
          'grid h-6 w-6 shrink-0 place-items-center rounded-md transition-colors duration-200',
          isActive ? 'bg-white text-indigo-700' : 'bg-slate-50 text-slate-500 group-hover:text-slate-700',
        )}>
          {item.icon || <Circle className="h-3 w-3" />}
        </span>

        <span className="min-w-0 flex-1 truncate">{item.title}</span>

        <span className="grid h-4 w-4 shrink-0 place-items-center">
          {isViewed && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
          {isActive && <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />}
        </span>
      </button>
    );
  };

  return (
    <nav className={cn('rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm', className)} aria-label="Lesson contents">
      <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-50 text-indigo-700">
            <List className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Contents</p>
            <p className="min-w-16 text-[11px] font-medium tabular-nums text-slate-400">{progress}% viewed</p>
          </div>
        </div>
      </div>

      {grouped.learning.length > 0 && (
        <div className="mb-3.5">
          <div className="mb-1 px-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            {groupLabels.learning}
          </div>
          <div className="space-y-0.5">
            {grouped.learning.map(renderItem)}
          </div>
        </div>
      )}

      {grouped.practice.length > 0 && (
        <div className="mb-3.5 border-t border-slate-100 pt-2.5">
          <div className="mb-1 px-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            {groupLabels.practice}
          </div>
          <div className="space-y-0.5">
            {grouped.practice.map(renderItem)}
          </div>
        </div>
      )}

      {grouped.review.length > 0 && (
        <div className="border-t border-slate-100 pt-2.5">
          <div className="mb-1 px-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            {groupLabels.review}
          </div>
          <div className="space-y-0.5">
            {grouped.review.map(renderItem)}
          </div>
        </div>
      )}

      <div className="mt-3.5 border-t border-slate-100 px-2 pt-2.5">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
          <span>Viewed</span>
          <span className="min-w-8 text-right tabular-nums">{viewedSections.size}/{items.length}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </nav>
  );
}

interface MobileTableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export function MobileTableOfContents({ items, className }: MobileTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const [viewedSections, setViewedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            setViewedSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  const activeItem = items.find(item => item.id === activeId);
  const progress = items.length ? Math.round((viewedSections.size / items.length) * 100) : 0;

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 w-full justify-between border-slate-200 bg-white shadow-sm"
      >
        <span className="flex min-w-0 items-center gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-indigo-50 text-indigo-700">
            <List className="h-4 w-4" />
          </span>
          <span className="truncate">
          {activeItem ? activeItem.title : 'Jump to section'}
          </span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">{progress}%</span>
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )} />
        </div>
      </Button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
          {items.map((item) => {
            const isActive = activeId === item.id;
            const isViewed = viewedSections.has(item.id) && !isActive;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors duration-150',
                  isActive && 'bg-indigo-50 text-indigo-700',
                  isViewed && 'text-slate-500',
                  !isActive && !isViewed && 'text-slate-700 hover:bg-slate-50',
                )}
              >
                <span className={cn(
                  'grid h-7 w-7 shrink-0 place-items-center rounded-md',
                  isActive ? 'bg-white text-indigo-700' : 'bg-slate-50 text-slate-500',
                )}>
                  {item.icon || <Circle className="h-3.5 w-3.5" />}
                </span>
                <span className="min-w-0 flex-1 truncate">{item.title}</span>
                {isViewed && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />}
                {isActive && <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-600" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
