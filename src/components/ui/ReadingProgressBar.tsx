import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface ReadingProgressBarProps {
  className?: string;
  showEstimate?: boolean;
  estimatedMinutes?: number;
}

export function ReadingProgressBar({ 
  className,
  showEstimate = true,
  estimatedMinutes = 5
}: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const scrollProgress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollProgress)));
    };

    calculateProgress();
    window.addEventListener('scroll', calculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, []);

  return (
    <div className={cn("fixed top-0 left-0 right-0 z-50", className)}>
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {showEstimate && (
        <div className="absolute top-2 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border text-xs text-gray-600">
          <Clock className="h-3 w-3" />
          <span>{Math.round(progress)}% complete</span>
          {progress < 100 && (
            <span className="text-gray-400">
              · ~{Math.ceil(estimatedMinutes * (1 - progress / 100))} min left
            </span>
          )}
        </div>
      )}
    </div>
  );
}
