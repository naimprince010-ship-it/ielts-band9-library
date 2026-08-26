import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  GraduationCap,
  Mic,
  PenTool,
  Search,
  Star,
  Target,
  Trophy,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ContinueLearning } from '@/components/dashboard/ContinueLearning';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import { SAMPLE_LESSONS } from '@/data/sampleLessons';
import { courseService } from '@/services/courseService';
import { Course } from '@/types';

const TRUST_ITEMS = [
  'Structured IELTS study path',
  'Focused practice for vocabulary, grammar, writing and speaking',
  'Progress tracking built into each lesson',
  'Responsive learning for mobile and desktop',
];

const LEARNING_PATHS = [
  {
    icon: BookOpen,
    title: 'Vocabulary',
    desc: 'Build topic-based academic language and natural collocations.',
    href: '/vocabulary',
    accent: 'bg-indigo-600 text-white',
  },
  {
    icon: GraduationCap,
    title: 'Grammar',
    desc: 'Learn high-impact structures for clear, accurate IELTS answers.',
    href: '/grammar',
    accent: 'bg-violet-600 text-white',
  },
  {
    icon: PenTool,
    title: 'Writing',
    desc: 'Improve structure, ideas and clarity for Task 1 and Task 2.',
    href: '/writing',
    accent: 'bg-rose-500 text-white',
  },
  {
    icon: Mic,
    title: 'Speaking',
    desc: 'Practice clear fluency and natural responses across parts 1–3.',
    href: '/speaking',
    accent: 'bg-emerald-600 text-white',
  },
];

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getTodayProgress, streakData } = useProgress();

  const todayProgress = getTodayProgress();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/vocabulary?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getCourses();
        setCourses(data.filter((course) => course.isPopular).slice(0, 2));
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const featuredLessons = SAMPLE_LESSONS.filter((lesson) => lesson.is_published).slice(0, 3);
  const primaryCtaHref = user ? '/dashboard' : '/signup';

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {user && <ContinueLearning />}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
            <div className="max-w-2xl">
              <Badge className="border border-indigo-200 bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                IELTS study system
              </Badge>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Build a more consistent IELTS study routine with clear daily practice.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Improve vocabulary, grammar, writing and speaking through structured lessons, real IELTS practice and guided progress.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-xl bg-indigo-600 px-6 text-base font-semibold text-white hover:bg-indigo-700">
                  <Link to={primaryCtaHref}>Start Your Free Study Plan</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 rounded-xl border-slate-200 bg-white px-6 text-base font-semibold text-slate-700 hover:bg-slate-50">
                  <Link to="/vocabulary">Explore Free Lessons</Link>
                </Button>
              </div>

              <form onSubmit={handleSearch} className="mt-7 max-w-xl rounded-2xl border border-slate-200 bg-slate-50 p-2.5 sm:p-3">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="text"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search lessons, topics or skills"
                      className="h-12 rounded-xl border-slate-200 bg-white pl-11 text-sm text-slate-700 placeholder:text-slate-400 sm:text-base"
                    />
                  </div>
                  <Button type="submit" className="h-12 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800 sm:px-6">
                    Search
                  </Button>
                </div>
              </form>

              <div className="mt-6 flex flex-wrap gap-2">
                {TRUST_ITEMS.map((item) => (
                  <span key={item} className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Study plan</p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-900">{user ? 'Your study path' : 'Example study path'}</h2>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                  <Target className="h-5 w-5" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-indigo-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Priority</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {user ? 'Continue with your current IELTS focus.' : 'Vocabulary and writing focus'}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {user ? 'Current streak' : 'Starter step'}
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {user ? `${streakData.currentStreak || 0} day streak` : 'Start with one free lesson and build momentum.'}
                  </p>
                </div>
                {user ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Today’s progress</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full bg-indigo-600"
                          style={{ width: `${Math.min(100, todayProgress.percentage)}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{todayProgress.percentage}%</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      {todayProgress.questions}/{todayProgress.goal} question goal today
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Example flow</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">Practice one vocabulary lesson, then review a short grammar task.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50/80 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">Learning paths</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Choose your focus</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {LEARNING_PATHS.map((path) => (
              <Link key={path.title} to={path.href} className="group rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-indigo-200 hover:bg-indigo-50/40">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${path.accent}`}>
                  <path.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{path.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{path.desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {(courses.length > 0 || featuredLessons.length > 0) && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">Popular learning</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Recommended next steps</h2>
              </div>
              <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-700">
                View all courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="grid gap-5 md:grid-cols-2">
                {courses.map((course) => (
                  <Link key={course.id} to={`/courses/${course.id}`} className="group block rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-indigo-200 hover:bg-indigo-50/30">
                    <div className={`mb-4 h-2 rounded-full bg-gradient-to-r ${course.bgGradient}`} />
                    <div className="flex items-center justify-between gap-3">
                      <Badge className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700">
                        {course.type}
                      </Badge>
                      <span className="text-xs font-medium text-slate-500">{course.level}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-slate-900">{course.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{course.description}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Instructor</p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">{course.instructor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Next batch</p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">{course.nextBatch}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="space-y-4">
                {featuredLessons.map((lesson) => (
                  <Link key={lesson.id} to={`/lesson/${lesson.slug}`} className="group block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 hover:bg-indigo-50/40">
                    <div className="flex items-center justify-between gap-3">
                      <Badge className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700">
                        {lesson.type}
                      </Badge>
                      {lesson.is_premium ? (
                        <Badge className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-700">
                          Premium
                        </Badge>
                      ) : null}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900">{lesson.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{lesson.description}</p>
                    <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                      <span className="inline-flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-indigo-600" />
                        {lesson.level}
                      </span>
                      <span className="inline-flex items-center gap-2 text-slate-700">
                        Learn more
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-slate-900 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-200">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to build a stronger IELTS study routine?
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
            Follow a clear path through vocabulary, grammar, writing and speaking with realistic practice and consistent progress.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-xl bg-indigo-600 px-6 text-base font-semibold text-white hover:bg-indigo-500">
              <Link to={primaryCtaHref}>Start Your Free Study Plan</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-xl border-slate-600 bg-white/5 px-6 text-base font-semibold text-white hover:bg-white/10">
              <Link to="/vocabulary">Explore Free Lessons</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
