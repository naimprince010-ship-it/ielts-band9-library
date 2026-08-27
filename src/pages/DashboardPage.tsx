import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  FileText,
  MessageCircle,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Zap,
  Flame,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import { SAMPLE_LESSONS } from '@/data/sampleLessons';

const quickPracticeItems = [
  {
    title: 'Daily Plan',
    description: "Follow today's structured IELTS study routine.",
    path: '/daily-plan',
    icon: Clock3,
    accent: 'indigo',
  },
  {
    title: 'Grammar Exercises',
    description: 'Sharpen grammar accuracy with focused drills.',
    path: '/grammar-exercises',
    icon: FileText,
    accent: 'violet',
  },
  {
    title: 'Speaking Practice',
    description: 'Practice fluency with guided speaking prompts.',
    path: '/speaking-practice',
    icon: MessageCircle,
    accent: 'blue',
  },
] as const;

const QUICK_PRACTICE_ACCENTS = {
  indigo: { bg: 'bg-gradient-to-br from-indigo-50/80 to-blue-50/80', iconBox: 'bg-white text-indigo-600 shadow-sm', border: 'border-indigo-100 hover:border-indigo-300', glow: 'hover:shadow-indigo-200/50', arrow: 'text-indigo-600' },
  violet: { bg: 'bg-gradient-to-br from-violet-50/80 to-purple-50/80', iconBox: 'bg-white text-violet-600 shadow-sm', border: 'border-violet-100 hover:border-violet-300', glow: 'hover:shadow-violet-200/50', arrow: 'text-violet-600' },
  blue: { bg: 'bg-gradient-to-br from-blue-50/80 to-cyan-50/80', iconBox: 'bg-white text-blue-600 shadow-sm', border: 'border-blue-100 hover:border-blue-300', glow: 'hover:shadow-blue-200/50', arrow: 'text-blue-600' },
} as const;

export default function DashboardPage() {
  const { user } = useAuth();
  const { getCompletedLessonsCount, getRecentLessons, getTodayProgress, streakData, userPreferences } = useProgress();
  const studentName = user?.name || user?.email?.split('@')[0] || 'Student';
  const completedLessons = getCompletedLessonsCount();
  const recentProgress = getRecentLessons();
  const latestLesson = recentProgress[0]
    ? SAMPLE_LESSONS.find((lesson) => lesson.id === recentProgress[0].lessonId || lesson.slug === recentProgress[0].lessonId)
    : null;
  const focusArea = userPreferences.focusAreas[0] || 'vocabulary';
  const recommendedPath = focusArea === 'reading' ? '/reading-practice' : focusArea === 'grammar' ? '/grammar' : '/vocabulary';
  const recommendedLabel = focusArea === 'reading' ? 'Reading practice' : focusArea === 'grammar' ? 'Grammar practice' : 'Vocabulary practice';
  const primaryPath = latestLesson ? `/lesson/${latestLesson.slug}` : recommendedPath;
  const todayProgress = getTodayProgress();
  const examDays = user?.exam_date
    ? Math.max(0, Math.ceil((new Date(`${user.exam_date}T00:00:00`).getTime() - Date.now()) / 86_400_000))
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header — premium gradient banner, matches the navy/indigo/violet
            brand language already used across the lesson workspace heroes. */}
        <header className="relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,#0d1437_0%,#1b1d54_54%,#39218a_100%)] p-6 text-white shadow-2xl shadow-indigo-950/20 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-violet-400/20 blur-2xl" />
          <div className="relative flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-indigo-100">
                <Sparkles className="h-3.5 w-3.5" />
                Student Dashboard
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Welcome back, {studentName}</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                Stay consistent today and keep building toward your IELTS target band.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <Target className="h-5 w-5 text-violet-200" />
                <div><p className="text-lg font-black">Band {user?.target_band || userPreferences.targetBand}</p><p className="text-[11px] text-indigo-200">Target</p></div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <CalendarDays className="h-5 w-5 text-sky-200" />
                <div><p className="text-lg font-black">{examDays === null ? 'Set date' : `${examDays} days`}</p><p className="text-[11px] text-indigo-200">Until exam</p></div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-emerald-400/20 text-emerald-300">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-black leading-none">{completedLessons}</p>
                <p className="mt-1 text-xs font-semibold text-indigo-200">Lessons completed</p>
              </div>
              </div>
            </div>
          </div>
        </header>

        {/* Actionable section: the two big next-step CTAs. Distinct colored
            accents (indigo vs amber) so the two primary actions don't
            visually compete, plus a lift + glow on hover so the whole card
            reads as clickable, not just the button. */}
        <section className="rounded-3xl border border-indigo-100/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm sm:p-6">
          <p className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-600">
            <Zap className="h-3.5 w-3.5" />
            Jump back in
          </p>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="group rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/95 to-violet-50/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-200/40 lg:col-span-2">
              <CardHeader>
                <p className="inline-flex w-fit items-center rounded-full bg-indigo-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-indigo-700">
                  Primary Action
                </p>
                <CardTitle className="text-slate-900">{latestLesson ? 'Continue Learning' : "Today's recommended task"}</CardTitle>
                <CardDescription>{latestLesson ? 'Resume your latest saved lesson.' : `Start with ${recommendedLabel.toLowerCase()} from your diagnostic focus.`}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border border-indigo-100/50 bg-white/60 p-4 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/80">
                  <p className="text-sm font-semibold text-indigo-900">{latestLesson?.title || recommendedLabel}</p>
                  <p className="mt-1 text-sm text-indigo-800">{latestLesson?.description || `Your current focus area is ${focusArea}. Complete one focused session today.`}</p>
                </div>
                <Button
                  asChild
                  className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-white shadow-md transition-all duration-300 hover:scale-105 hover:from-indigo-500 hover:to-violet-500 hover:shadow-lg hover:shadow-indigo-300/50"
                >
                  <Link to={primaryPath}>
                    {latestLesson ? 'Resume lesson' : 'Start recommended task'}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50/95 to-orange-50/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-200/40">
              <CardHeader>
                <p className="inline-flex w-fit items-center rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-amber-700">
                  High Focus
                </p>
                <CardTitle className="text-slate-900">Full Mock Test</CardTitle>
                <CardDescription>Simulate test day and measure your readiness.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 rounded-xl border border-amber-100/50 bg-white/60 p-3 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/80">
                  <Target className="h-5 w-5 flex-shrink-0 text-amber-600" />
                  <p className="text-sm text-amber-900">Timed sections and instant result analysis.</p>
                </div>
                <Button
                  asChild
                  className="h-11 w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md transition-all duration-300 hover:scale-105 hover:from-amber-400 hover:to-orange-400 hover:shadow-lg hover:shadow-amber-300/50"
                >
                  <Link to="/full-mock-test">
                    Start Mock Test
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Practice — every tile is a full-card link. Border color,
            background tint, lift, and a sliding arrow all confirm
            clickability on hover, addressing the "no click affordance"
            complaint directly. */}
        <section className="rounded-3xl border border-indigo-100/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm sm:p-6">
          <p className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-600">
            <Zap className="h-3.5 w-3.5" />
            Quick Practice
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {quickPracticeItems.map((item) => {
              const Icon = item.icon;
              const accent = QUICK_PRACTICE_ACCENTS[item.accent];
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${accent.bg} ${accent.border} ${accent.glow}`}
                >
                  <span className="mb-3 inline-flex rounded-full bg-white/75 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-600">
                    Quick Task
                  </span>
                  <div className={`grid h-10 w-10 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${accent.iconBox}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 pr-6 text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 pr-6 text-xs leading-5 text-slate-600">{item.description}</p>
                  <ArrowRight
                    className={`absolute right-5 top-5 h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${accent.arrow}`}
                  />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Informational section — deliberately calmer, non-elevating
            styling (no hover lift, no glow) so it reads as "read this,"
            not "click this," distinguishing it from the actionable
            sections above. The one real action inside each card (the
            "View full progress" link) still gets its own hover affordance
            so it doesn't get lost in an otherwise static card. */}
        <section className="rounded-3xl border border-slate-200/90 bg-white/70 p-4 shadow-sm backdrop-blur-sm sm:p-6">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-slate-400">Your overview</p>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="rounded-2xl border border-slate-200 bg-white/85 shadow-sm backdrop-blur-sm">
              <CardHeader>
                <p className="inline-flex w-fit items-center rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-600">
                  Info Card
                </p>
                <CardTitle className="text-slate-900">Progress Summary</CardTitle>
                <CardDescription>Track your momentum at a glance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50/50 p-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                    Lessons completed
                  </span>
                  <span className="text-sm font-semibold text-slate-900">{completedLessons}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-violet-100 bg-violet-50/50 p-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <TrendingUp className="h-4 w-4 text-indigo-600" />
                    Today
                  </span>
                  <span className="text-sm font-semibold text-slate-900">{todayProgress.percentage}%</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-orange-100 bg-orange-50/50 p-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-700"><Flame className="h-4 w-4 text-orange-600" />Current streak</span>
                  <span className="text-sm font-semibold text-slate-900">{streakData.currentStreak} days</span>
                </div>
                <Link
                  to="/progress"
                  className="group inline-flex h-10 items-center gap-1.5 rounded-xl px-0 text-sm font-semibold text-indigo-700 transition-colors duration-300 hover:text-indigo-600"
                >
                  View full progress
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-slate-200 bg-white/85 shadow-sm backdrop-blur-sm lg:col-span-2">
              <CardHeader>
                <p className="inline-flex w-fit items-center rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-600">
                  Timeline
                </p>
                <CardTitle className="text-slate-900">Recent Activity</CardTitle>
                <CardDescription>Your latest saved lesson activity.</CardDescription>
              </CardHeader>
              <CardContent>
                {latestLesson ? (
                  <Link to={`/lesson/${latestLesson.slug}`} className="flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50/60 p-5 transition hover:border-indigo-300">
                    <div><p className="font-semibold text-slate-900">{latestLesson.title}</p><p className="mt-1 text-xs text-slate-500">Last opened {new Date(recentProgress[0].lastOpenedAt).toLocaleDateString()}</p></div>
                    <ArrowRight className="h-4 w-4 text-indigo-600" />
                  </Link>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-6 text-center">
                  <Trophy className="mx-auto h-6 w-6 text-slate-400" />
                  <p className="mt-2 text-sm font-medium text-slate-700">No recent activity yet</p>
                  <p className="mt-1 text-xs text-slate-500">Complete a lesson or practice session to start building your timeline.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
