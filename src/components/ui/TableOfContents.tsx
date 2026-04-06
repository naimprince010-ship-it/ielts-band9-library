import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { List, ChevronDown, CheckCircle2 } from 'lucide-react';
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
    const id = item.id.toLowerCase();
    if (id.includes('learn') || id.includes('explanation') || id.includes('grammar') || id.includes('use')) {
      learning.push({ ...item, group: 'learning' });
    } else if (id.includes('example') || id.includes('practice') || id.includes('collocation') || id.includes('synonym') || id.includes('speaking') || id.includes('sentence')) {
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

  const renderItem = (item: TOCItem) => {
    const isActive = activeId === item.id;
    const isViewed = viewedSections.has(item.id) && !isActive;

    return (
      <button
        key={item.id}
        onClick={() => scrollToSection(item.id)}
        className={cn(
          "group w-full text-left py-2.5 px-3 text-sm rounded-lg transition-all duration-200 flex items-center gap-3 relative",
          // Active state with left border
          isActive && "bg-accent/10 border-l-[3px] border-accent font-semibold text-accent rounded-l-none",
          // Viewed/completed state
          isViewed && "text-muted-foreground",
          // Default state
          !isActive && !isViewed && "text-foreground/70 hover:bg-muted/50 hover:text-foreground"
        )}
      >
        {/* Icon with color states */}
        <span className={cn(
          "flex-shrink-0 transition-colors duration-200",
          isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground/70"
        )}>
          {item.icon}
        </span>
        
        {/* Title */}
        <span className="flex-1 truncate">{item.title}</span>
        
        {/* Viewed indicator */}
        {isViewed && (
          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
        )}
        
        {/* Active indicator dot */}
        {isActive && (
          <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0 animate-pulse" />
        )}
      </button>
    );
  };

  return (
    <nav className={cn("space-y-1", className)}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
        <List className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contents</span>
      </div>

      {/* Learning Section */}
      {grouped.learning.length > 0 && (
        <div className="mb-4">
          <div className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-wider px-3 mb-1.5">
            {groupLabels.learning}
          </div>
          <div className="space-y-0.5">
            {grouped.learning.map(renderItem)}
          </div>
        </div>
      )}

      {/* Practice Section */}
      {grouped.practice.length > 0 && (
        <div className="mb-4 pt-2 border-t border-border/50">
          <div className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-wider px-3 mb-1.5">
            {groupLabels.practice}
          </div>
          <div className="space-y-0.5">
            {grouped.practice.map(renderItem)}
          </div>
        </div>
      )}

      {/* Review Section */}
      {grouped.review.length > 0 && (
        <div className="pt-2 border-t border-border/50">
          <div className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-wider px-3 mb-1.5">
            {groupLabels.review}
          </div>
          <div className="space-y-0.5">
            {grouped.review.map(renderItem)}
          </div>
        </div>
      )}

      {/* Progress indicator */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
          <span>Progress</span>
          <span className="font-medium">{viewedSections.size}/{items.length}</span>
        </div>
        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden mx-2">
          <div 
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${(viewedSections.size / items.length) * 100}%` }}
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

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between shadow-sm"
      >
        <span className="flex items-center gap-2">
          <List className="h-4 w-4" />
          {activeItem ? activeItem.title : 'Jump to section'}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{viewedSections.size}/{items.length}</span>
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )} />
        </div>
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {items.map((item) => {
            const isActive = activeId === item.id;
            const isViewed = viewedSections.has(item.id) && !isActive;
            
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "w-full text-left px-4 py-3 text-sm transition-all duration-200 flex items-center gap-3 border-b last:border-0",
                  isActive && "bg-accent/10 border-l-[3px] border-l-accent font-semibold text-accent",
                  isViewed && "text-muted-foreground",
                  !isActive && !isViewed && "text-foreground hover:bg-muted/50"
                )}
              >
                <span className={cn(
                  "flex-shrink-0",
                  isActive ? "text-accent" : "text-muted-foreground"
                )}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.title}</span>
                {isViewed && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                {isActive && <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
