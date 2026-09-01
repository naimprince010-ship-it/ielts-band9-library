import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Headphones,
  Layers3,
  Loader2,
  LockKeyhole,
  MessageCircle,
  Mic2,
  PenLine,
  PlayCircle,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { courseService } from '@/services/courseService';
import type { Course, CurriculumLesson } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import { supabase } from '@/lib/supabase';

const getCourseTheme = (course: Course) => {
  const value = `${course.id} ${course.title}`.toLowerCase();
  if (value.includes('writing')) return { label: 'Writing', Icon: PenLine, accent: 'sky' } as const;
  if (value.includes('speaking')) return { label: 'Speaking', Icon: Mic2, accent: 'emerald' } as const;
  if (value.includes('reading') || value.includes('listening')) {
    return { label: 'Reading + Listening', Icon: Headphones, accent: 'amber' } as const;
  }
  return { label: 'Complete IELTS', Icon: Sparkles, accent: 'violet' } as const;
};

const accentClasses = {
  violet: { icon: 'bg-violet-600', text: 'text-violet-300', soft: 'bg-violet-50 text-violet-700', border: 'border-violet-200' },
  sky: { icon: 'bg-sky-600', text: 'text-sky-300', soft: 'bg-sky-50 text-sky-700', border: 'border-sky-200' },
  emerald: { icon: 'bg-emerald-600', text: 'text-emerald-300', soft: 'bg-emerald-50 text-emerald-700', border: 'border-emerald-200' },
  amber: { icon: 'bg-amber-500', text: 'text-amber-300', soft: 'bg-amber-50 text-amber-700', border: 'border-amber-200' },
};

const lessonTitle = (lesson: string | CurriculumLesson) => (typeof lesson === 'string' ? lesson : lesson.title);
const lessonId = (lesson: string | CurriculumLesson) => (typeof lesson === 'string' ? undefined : lesson.lessonId);

export function CourseDetailPage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const { lessonProgress } = useProgress();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    let active = true;
    if (!courseId) {
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      setIsEnrolled(false);
      try {
        const result = await courseService.getCourseById(courseId);
        if (!active) return;
        setCourse(result);
        if (user && result) {
          const { data } = await supabase
            .from('user_courses')
            .select('course_id')
            .eq('user_id', user.id)
            .eq('course_id', courseId)
            .eq('access_status', 'active')
            .maybeSingle();
          if (active) setIsEnrolled(Boolean(data));
        }
      } catch (error) {
        console.error(`Error fetching course ${courseId}:`, error);
        if (active) setCourse(null);
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [courseId, user]);

  useEffect(() => {
    if (!course?.title) return;
    const previousTitle = document.title;
    document.title = `${course.title} | IELTS Tree`;
    return () => {
      document.title = previousTitle;
    };
  }, [course?.title]);

  const lessonCount = useMemo(
    () => course?.curriculum?.reduce((count, module) => count + module.lessons.length, 0) ?? 0,
    [course],
  );
  const curriculumLessonIds = useMemo(
    () => course?.curriculum?.flatMap((module) => module.lessons).map(lessonId).filter((id): id is string => Boolean(id)) ?? [],
    [course],
  );
  const completedLessonCount = useMemo(
    () => curriculumLessonIds.filter((id) => lessonProgress[id]?.status === 'completed').length,
    [curriculumLessonIds, lessonProgress],
  );
  const nextLessonId = useMemo(() => {
    const activeLesson = curriculumLessonIds
      .filter((id) => lessonProgress[id]?.status === 'in_progress')
      .sort((a, b) => new Date(lessonProgress[b].lastOpenedAt).getTime() - new Date(lessonProgress[a].lastOpenedAt).getTime())[0];
    return activeLesson
      ?? curriculumLessonIds.find((id) => lessonProgress[id]?.status !== 'completed')
      ?? curriculumLessonIds[0];
  }, [curriculumLessonIds, lessonProgress]);
  const courseProgress = curriculumLessonIds.length
    ? Math.round((completedLessonCount / curriculumLessonIds.length) * 100)
    : 0;

  if (loading) {
    return <div className="grid min-h-[70vh] place-items-center bg-[#f6f7fb]"><Loader2 className="h-9 w-9 animate-spin text-violet-600" /></div>;
  }

  if (!course) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-[#f6f7fb] px-5 text-center">
        <div><h1 className="text-3xl font-bold text-slate-950">Course not found</h1><p className="mt-3 text-slate-600">This course may have been removed or is not available yet.</p><Link to="/courses" className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white"><ArrowLeft className="h-4 w-4" />Back to courses</Link></div>
      </main>
    );
  }

  const theme = getCourseTheme(course);
  const palette = accentClasses[theme.accent];
  const paymentUrl = `/payment?package=course&courseId=${course.id}&name=${encodeURIComponent(course.title)}&price=${course.price}`;
  const primaryUrl = isEnrolled && nextLessonId ? `/lesson/${nextLessonId}` : isEnrolled ? '/dashboard' : paymentUrl;
  const primaryLabel = isEnrolled ? (nextLessonId ? (completedLessonCount ? 'Continue course' : 'Start course') : 'Go to dashboard') : 'Get full course access';

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f7fb] pb-28 text-slate-950 lg:pb-14">
      <section className="mx-auto max-w-[1440px] px-3 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-[linear-gradient(120deg,#080b25_0%,#17104d_58%,#382088_100%)] px-6 pb-12 pt-7 text-white shadow-[0_24px_70px_rgba(25,17,86,0.18)] sm:px-10 sm:pb-14 lg:px-16 lg:pb-20 lg:pt-9">
          <div className="absolute -right-24 top-12 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
          <Link to="/courses" className="relative inline-flex items-center gap-2 text-sm font-semibold text-indigo-100/75 transition hover:text-white"><ArrowLeft className="h-4 w-4" />All courses</Link>
          <div className="relative mt-8 grid items-end gap-9 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,.55fr)]">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`grid h-11 w-11 place-items-center rounded-2xl text-white ${palette.icon}`}><theme.Icon className="h-5 w-5" /></span>
                <span className={`text-xs font-bold uppercase tracking-[0.16em] ${palette.text}`}>{theme.label}</span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold capitalize text-indigo-50">{course.type}</span>
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[58px]">{course.title}</h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-indigo-100/85 sm:text-lg">{course.description}</p>
              <div className="mt-8 grid gap-3 text-sm text-indigo-50 sm:flex sm:flex-wrap sm:gap-x-7 sm:gap-y-3">
                <span className="flex items-center gap-2"><UserRound className="h-4 w-4 text-violet-300" />{course.instructor}</span>
                <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-violet-300" />{course.duration}</span>
                {course.nextBatch && <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-violet-300" />{course.nextBatch}</span>}
              </div>
            </div>
            <div className="rounded-3xl border border-white/15 bg-[#11102f]/85 p-6 backdrop-blur sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-300">Course overview</p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div><p className="text-2xl font-bold">{course.curriculum?.length ?? 0}</p><p className="mt-1 text-xs text-indigo-100/65">Modules</p></div>
                <div><p className="text-2xl font-bold">{isEnrolled ? `${courseProgress}%` : (lessonCount || '—')}</p><p className="mt-1 text-xs text-indigo-100/65">{isEnrolled ? 'Completed' : 'Lessons'}</p></div>
                <div><p className="text-lg font-bold capitalize">{course.level}</p><p className="mt-1 text-xs text-indigo-100/65">Level</p></div>
                <div><p className="text-lg font-bold capitalize">{course.type}</p><p className="mt-1 text-xs text-indigo-100/65">Format</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1376px] gap-7 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_370px] lg:items-start lg:px-8 lg:py-12">
        <div className="space-y-7">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.05)] sm:p-8">
            <div className="flex items-center gap-3"><span className={`grid h-10 w-10 place-items-center rounded-xl ${palette.soft}`}><CheckCircle2 className="h-5 w-5" /></span><h2 className="text-2xl font-bold">What you’ll get</h2></div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {course.features.map((feature) => <div key={feature} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-sm font-medium leading-6 text-slate-700"><span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg ${palette.soft}`}><Check className="h-3.5 w-3.5" /></span>{feature}</div>)}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.05)] sm:p-8">
            <div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><span className={`grid h-10 w-10 place-items-center rounded-xl ${palette.soft}`}><Layers3 className="h-5 w-5" /></span><div><h2 className="text-2xl font-bold">Course curriculum</h2><p className="mt-1 text-sm text-slate-500">{course.curriculum?.length ?? 0} modules{lessonCount ? ` • ${lessonCount} lessons` : ''}</p></div></div></div>
            {course.curriculum?.length ? (
              <div className="mt-7 space-y-3">
                {course.curriculum.map((module, moduleIndex) => (
                  <details key={`${module.module}-${moduleIndex}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60" open={moduleIndex === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500"><div className="flex min-w-0 items-center gap-3"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-bold ${palette.soft}`}>{moduleIndex + 1}</span><h3 className="font-bold leading-5">{module.module}</h3></div><div className="flex shrink-0 items-center gap-2 text-xs font-semibold text-slate-500"><span className="hidden sm:inline">{module.lessons.length} lessons</span><ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></div></summary>
                    <div className="border-t border-slate-200 bg-white px-5 py-3 sm:px-6">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const id = lessonId(lesson);
                        const status = id ? lessonProgress[id]?.status : undefined;
                        const isCompleted = status === 'completed';
                        const row = <div className="flex min-w-0 items-center gap-3"><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[11px] font-bold ${isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{isCompleted ? <Check className="h-3.5 w-3.5" /> : String(lessonIndex + 1).padStart(2, '0')}</span><span className={`text-sm leading-5 ${isCompleted ? 'text-slate-500' : 'text-slate-700'}`}>{lessonTitle(lesson)}</span></div>;
                        return <div key={`${lessonTitle(lesson)}-${lessonIndex}`} className="flex items-center justify-between gap-3 border-b border-slate-100 py-3.5 last:border-0">{isEnrolled && id ? <Link to={`/lesson/${id}`} className="min-w-0 flex-1 transition hover:text-violet-700">{row}</Link> : row}{id && (isEnrolled ? (isCompleted ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> : <PlayCircle className="h-4 w-4 shrink-0 text-violet-600" />) : <LockKeyhole className="h-4 w-4 shrink-0 text-slate-300" />)}</div>;
                      })}
                    </div>
                  </details>
                ))}
              </div>
            ) : <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">Curriculum details will be added soon.</div>}
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.10)]">
            <div className={`h-1.5 ${palette.icon}`} />
            <div className="p-6 sm:p-7">
              <p className="text-sm font-medium text-slate-500">Full course access</p>
              <div className="mt-2 flex items-baseline gap-2"><span className="text-4xl font-bold">৳{course.price.toLocaleString()}</span>{course.originalPrice && <span className="text-lg text-slate-400 line-through">৳{course.originalPrice.toLocaleString()}</span>}</div>
              <Link to={primaryUrl} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-semibold leading-5 text-white shadow-lg shadow-violet-600/15 transition hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">{isEnrolled && <CheckCircle2 className="h-4 w-4" />}{primaryLabel}<ArrowRight className="h-4 w-4" /></Link>
              {isEnrolled && curriculumLessonIds.length > 0 && (
                <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600"><span>Course progress</span><span>{completedLessonCount}/{curriculumLessonIds.length} lessons</span></div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all" style={{ width: `${courseProgress}%` }} /></div>
                </div>
              )}
              <Link to="/contact" className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:text-violet-700"><MessageCircle className="h-4 w-4" />Ask about this course</Link>
              <div className="mt-6 space-y-3 border-t border-slate-100 pt-6 text-sm text-slate-600"><p className="flex items-center gap-3"><BookOpen className="h-4 w-4 text-violet-600" />Course learning materials</p><p className="flex items-center gap-3"><Clock3 className="h-4 w-4 text-violet-600" />{course.duration}</p><p className="flex items-center gap-3"><PlayCircle className="h-4 w-4 text-violet-600" /><span className="capitalize">{course.type} learning</span></p></div>
            </div>
          </div>
          <p className="px-3 text-center text-xs leading-5 text-slate-500">Access is activated according to the selected course and payment status.</p>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(15,23,42,0.10)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3"><div className="min-w-0 flex-1"><p className="truncate text-xs text-slate-500">{course.title}</p><p className="text-lg font-bold">৳{course.price.toLocaleString()}</p></div><Link to={primaryUrl} className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white">{isEnrolled ? 'Continue' : 'Get access'}<ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </main>
  );
}
