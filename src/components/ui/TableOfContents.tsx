import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { List, ChevronDown } from 'lucide-react';
import { Button } from './button';

interface TOCItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
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

  return (
    <nav className={cn("space-y-1", className)}>
      <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">
        <List className="h-4 w-4" />
        Contents
      </div>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={cn(
            "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-2",
            activeId === item.id
              ? "bg-indigo-100 text-indigo-700 font-medium"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          )}
        >
          {item.icon}
          {item.title}
        </button>
      ))}
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
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
        className="w-full justify-between"
      >
        <span className="flex items-center gap-2">
          <List className="h-4 w-4" />
          {activeItem ? activeItem.title : 'Jump to section'}
        </span>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform",
          isOpen && "rotate-180"
        )} />
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-2 border-b last:border-0",
                activeId === item.id
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {item.icon}
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
