import { Flame, Star, Target } from 'lucide-react';

interface QuizBrowseHeroProps {
  currentStreak: number;
  todayQuestions: number;
  todayGoal: number;
}

/**
 * Browse-screen hero for /quiz. Matches the navy → blue → indigo gradient
 * used by the grammar lesson workspace so the quiz section feels like the
 * same product. Streak/goal chips are shown in full on desktop and as a
 * compact row on mobile (previously hidden entirely below `md`).
 */
export function QuizBrowseHero({ currentStreak, todayQuestions, todayGoal }: QuizBrowseHeroProps) {
  return (
    <div className="border-b border-blue-100 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 py-12 text-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Target className="h-8 w-8" />
              <h1 className="text-3xl font-bold">Interactive Quiz Practice</h1>
            </div>
            <p className="max-w-2xl text-white/80">
              Test your IELTS knowledge with timed fill-in-the-blank quizzes. Get instant feedback, track your
              score, and build toward a higher Band with every session.
            </p>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            {currentStreak > 0 && (
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <Flame className="h-5 w-5 text-amber-300" />
                <span className="font-semibold">{currentStreak} day streak</span>
              </div>
            )}
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Star className="h-5 w-5 text-amber-300" />
              <span className="font-semibold">
                {todayQuestions}/{todayGoal} today
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 md:hidden">
          {currentStreak > 0 && (
            <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm backdrop-blur-sm">
              <Flame className="h-4 w-4 text-amber-300" />
              <span className="font-semibold">{currentStreak}d streak</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm backdrop-blur-sm">
            <Star className="h-4 w-4 text-amber-300" />
            <span className="font-semibold">
              {todayQuestions}/{todayGoal} today
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
