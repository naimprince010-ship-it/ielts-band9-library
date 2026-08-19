import { useEffect, useRef, useState } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReadingProgressBarProps {
  className?: string;
  showEstimate?: boolean;
  estimatedMinutes?: number;
}

export function ReadingProgressBar({
  className,
  showEstimate = true,
  estimatedMinutes = 5,
}: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const calculateProgress = () => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        const scrollProgress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
        setProgress(Math.min(100, Math.max(0, scrollProgress)));
      });
    };

    calculateProgress();
    window.addEventListener('scroll', calculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, []);

  const roundedProgress = Math.round(progress);
  const minutesLeft = Math.max(0, Math.ceil(estimatedMinutes * (1 - progress / 100)));

  return (
    <div className={cn('fixed left-0 right-0 top-0 z-50', className)}>
      <div className="h-1 bg-gray-200">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${progress}%` }} />
      </div>
      {showEstimate && (
        <div className="absolute right-3 top-2 flex h-8 min-w-[148px] items-center justify-end gap-1.5 rounded-full border bg-white/90 px-2.5 py-1.5 text-xs text-gray-600 shadow-sm backdrop-blur-sm sm:right-4 sm:min-w-[178px] sm:gap-2 sm:px-3">
          <Clock className="h-3 w-3 shrink-0" />
          <span className="min-w-[62px] tabular-nums sm:min-w-[76px]">{roundedProgress}% complete</span>
          <span className="min-w-[56px] text-gray-400 tabular-nums sm:min-w-[68px]">
            {progress < 100 ? `- ~${minutesLeft} min left` : 'complete'}
          </span>
        </div>
      )}
    </div>
  );
}
