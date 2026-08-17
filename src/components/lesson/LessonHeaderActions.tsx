import { Bookmark, CheckCircle2 } from 'lucide-react';

interface LessonHeaderActionsProps {
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  isCompleted: boolean;
  onProgressToggle: () => void;
}

/**
 * The two contextual buttons a lesson page publishes into NavContext as
 * `actions` — shared by GrammarLessonTemplate and WritingLessonTemplate so
 * the two templates don't fork this. Styled for the navy LessonWorkspaceHeader
 * background (white/translucent buttons, matching its existing Search/Bell
 * button treatment) since that's the header these templates render through
 * today. If a future page renders this via the light Navbar instead, this
 * styling would need a light-background variant — not needed yet.
 */
export function LessonHeaderActions({
  isBookmarked,
  onBookmarkToggle,
  isCompleted,
  onProgressToggle,
}: LessonHeaderActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onBookmarkToggle}
        aria-pressed={isBookmarked}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this lesson'}
        className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/50 ${
          isBookmarked
            ? 'bg-amber-400/90 text-slate-950 hover:bg-amber-400'
            : 'bg-white/7 text-white/85 hover:bg-white/15'
        }`}
      >
        <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
        <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
      </button>
      <button
        type="button"
        onClick={onProgressToggle}
        aria-pressed={isCompleted}
        aria-label={isCompleted ? 'Mark lesson incomplete' : 'Mark lesson complete'}
        className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/50 ${
          isCompleted
            ? 'bg-emerald-400/90 text-slate-950 hover:bg-emerald-400'
            : 'bg-white/7 text-white/85 hover:bg-white/15'
        }`}
      >
        <CheckCircle2 className="h-4 w-4" />
        <span className="hidden sm:inline">{isCompleted ? 'Completed' : 'Mark Complete'}</span>
      </button>
    </div>
  );
}
