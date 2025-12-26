import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  frontClassName?: string;
  backClassName?: string;
}

export function FlipCard({ 
  front, 
  back, 
  className,
  frontClassName,
  backClassName 
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <div 
      className={cn(
        "perspective-1000 cursor-pointer",
        className
      )}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
      aria-label="Click to flip card"
    >
      <div 
        className={cn(
          "relative w-full transition-transform duration-500 transform-style-3d",
          isFlipped && "rotate-y-180"
        )}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        <div 
          className={cn(
            "w-full backface-hidden",
            frontClassName
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
        </div>
        <div 
          className={cn(
            "absolute inset-0 w-full backface-hidden rotate-y-180",
            backClassName
          )}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}

interface MistakeFlipCardProps {
  mistake: string;
  correction: string;
  explanation: string;
}

export function MistakeFlipCard({ mistake, correction, explanation }: MistakeFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer min-h-[120px]"
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
    >
      <div
        className="relative w-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        <div
          className="w-full bg-red-50 rounded-lg p-4 border-2 border-red-200"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-red-500 text-lg">✗</span>
            <span className="text-xs font-medium text-red-600 uppercase tracking-wide">Incorrect</span>
          </div>
          <p className="text-red-700 font-medium">{mistake}</p>
          <p className="text-sm text-red-500 mt-3 flex items-center gap-1">
            <span className="animate-pulse">👆</span> Tap to see correction
          </p>
        </div>
        <div
          className="absolute inset-0 w-full bg-green-50 rounded-lg p-4 border-2 border-green-200"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-500 text-lg">✓</span>
            <span className="text-xs font-medium text-green-600 uppercase tracking-wide">Correct</span>
          </div>
          <p className="text-green-700 font-medium mb-2">{correction}</p>
          <p className="text-gray-600 text-sm">{explanation}</p>
          <p className="text-sm text-green-500 mt-2 flex items-center gap-1">
            <span>👆</span> Tap to see mistake again
          </p>
        </div>
      </div>
    </div>
  );
}
