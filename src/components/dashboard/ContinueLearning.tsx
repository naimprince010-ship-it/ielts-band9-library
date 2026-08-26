import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Clock3, Flame, Target, TrendingUp } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { SAMPLE_LESSONS } from '@/data/sampleLessons';
import { NEW_VOCABULARY_LESSONS } from '@/data/newVocabularyLessons';
import { NEW_GRAMMAR_LESSONS } from '@/data/newGrammarLessons';

const ALL_LESSONS = [...SAMPLE_LESSONS, ...NEW_VOCABULARY_LESSONS, ...NEW_GRAMMAR_LESSONS];

export function ContinueLearning() {
  const {
    getRecentLessons,
    getCompletedLessonsCount,
    streakData,
    getTodayProgress,
    lessonProgress,
    userPreferences,
  } = useProgress();

  const recentLessons = getRecentLessons();
  const completedCount = getCompletedLessonsCount();
  const todayProgress = getTodayProgress();

  const lastLessonProgress = recentLessons[0];
  const lastLesson = lastLessonProgress
    ? ALL_LESSONS.find((lesson) => lesson.id === lastLessonProgress.lessonId || lesson.slug === lastLessonProgress.lessonId)
    : null;

  const starterLesson = ALL_LESSONS.find((lesson) => lesson.type === 'vocabulary') ?? ALL_LESSONS[0];

  const nextIncompleteLesson = ALL_LESSONS.find((lesson) => {
    const saved = lessonProgress[lesson.id] || lessonProgress[lesson.slug];
    const isStarterLesson = !!starterLesson && (lesson.id === starterLesson.id || lesson.slug === starterLesson.slug);
    const isLastLesson = !!lastLesson && (lesson.id === lastLesson.id || lesson.slug === lastLesson.slug);

    if (!lastLessonProgress && isStarterLesson) {
      return false;
    }

    if (lastLessonProgress && isLastLesson) {
      return false;
    }

    return !saved || saved.status !== 'completed';
  });

  const getLessonByIdOrSlug = (id: string) =>
    ALL_LESSONS.find((lesson) => lesson.id === id || lesson.slug === id);

  return (
    <section className="border-b border-indigo-100 bg-indigo-50/60">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">Your study flow</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900 sm:text-2xl">Continue learning</h2>
          </div>
          {streakData.currentStreak > 0 && (
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700">
              <Flame className="h-4 w-4" />
              {streakData.currentStreak} day streak
            </div>
          )}
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {lastLesson ? (
            <Link to={`/lesson/${lastLesson.slug}`} className="group rounded-2xl border border-indigo-200 bg-white p-4 shadow-sm transition-colors hover:border-indigo-300">
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-700">
                  <BookOpen className="h-3.5 w-3.5" />
                  Continue
                </span>
                <ArrowRight className="h-4 w-4 text-indigo-600 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="text-sm font-medium text-slate-500">Last lesson</p>
              <p className="mt-2 line-clamp-2 text-base font-semibold text-slate-900">{lastLesson.title}</p>
            </Link>
          ) : (
            <Link to={starterLesson ? `/lesson/${starterLesson.slug}` : '/vocabulary'} className="group rounded-2xl border border-indigo-200 bg-white p-4 shadow-sm transition-colors hover:border-indigo-300">
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-700">
                  <BookOpen className="h-3.5 w-3.5" />
                  Start
                </span>
                <ArrowRight className="h-4 w-4 text-indigo-600 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="text-sm font-medium text-slate-500">First lesson</p>
              <p className="mt-2 line-clamp-2 text-base font-semibold text-slate-900">{starterLesson ? starterLesson.title : 'Explore free lessons'}</p>
            </Link>
          )}

          {Boolean(nextIncompleteLesson) ? (
            <Link to={`/lesson/${nextIncompleteLesson.slug}`} className="group rounded-2xl border border-violet-200 bg-white p-4 shadow-sm transition-colors hover:border-violet-300">
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-700">
                  <Target className="h-3.5 w-3.5" />
                  Next
                </span>
                <ArrowRight className="h-4 w-4 text-violet-600 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="text-sm font-medium text-slate-500">Next incomplete lesson</p>
              <p className="mt-2 line-clamp-2 text-base font-semibold text-slate-900">{nextIncompleteLesson.title}</p>
            </Link>
          ) : null}

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                <TrendingUp className="h-3.5 w-3.5" />
                Today
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500">Today’s progress</p>
            <p className="mt-2 text-2xl font-bold text-emerald-600">{todayProgress.percentage}%</p>
            <p className="mt-1 text-xs text-slate-600">{todayProgress.questions}/{userPreferences.dailyGoalQuestions} focus questions</p>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-700">
                <Flame className="h-3.5 w-3.5" />
                Streak
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500">Current streak</p>
            <p className="mt-2 text-2xl font-bold text-orange-600">{streakData.currentStreak || 0} days</p>
          </div>
        </div>

        {(lastLessonProgress || completedCount > 0) && (
          <div className="mt-5 flex items-center justify-between rounded-2xl border border-indigo-200 bg-white/80 px-4 py-3 text-sm text-slate-600">
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-indigo-600" />
              <span>
                {lastLessonProgress
                  ? `Last saved progress: ${getLessonByIdOrSlug(lastLessonProgress.lessonId)?.title ?? 'Lesson'}`
                  : `${completedCount} lessons completed`}
              </span>
            </div>
            {lastLessonProgress && (
              <span>{Math.max(1, Math.round(lastLessonProgress.timeSpentSeconds / 60))} min</span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
