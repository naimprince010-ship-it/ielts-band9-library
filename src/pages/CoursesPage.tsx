import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Check,
  Headphones,
  Loader2,
  MessageCircle,
  Mic2,
  PenLine,
  Sparkles,
} from 'lucide-react';
import { courseService } from '@/services/courseService';
import type { Course } from '@/types';

type Filter = 'all' | 'complete' | 'writing' | 'speaking' | 'reading';

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All programs' },
  { id: 'complete', label: 'Complete IELTS' },
  { id: 'writing', label: 'Writing' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'reading', label: 'Reading & Listening' },
];

const courseStyle = (course: Course) => {
  const id = `${course.id} ${course.title}`.toLowerCase();
  if (id.includes('writing')) return { filter: 'writing' as Filter, label: 'Writing', icon: PenLine, color: 'sky' };
  if (id.includes('speaking')) return { filter: 'speaking' as Filter, label: 'Speaking', icon: Mic2, color: 'emerald' };
  if (id.includes('reading') || id.includes('listening')) {
    return { filter: 'reading' as Filter, label: 'Reading + Listening', icon: Headphones, color: 'amber' };
  }
  return { filter: 'complete' as Filter, label: 'Complete IELTS', icon: Sparkles, color: 'violet' };
};

const colors = {
  violet: { bar: 'bg-violet-600', icon: 'bg-violet-600', text: 'text-violet-700' },
  sky: { bar: 'bg-sky-600', icon: 'bg-sky-600', text: 'text-sky-700' },
  emerald: { bar: 'bg-emerald-600', icon: 'bg-emerald-600', text: 'text-emerald-700' },
  amber: { bar: 'bg-amber-500', icon: 'bg-amber-500', text: 'text-amber-700' },
};

export function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    let active = true;
    courseService
      .getCourses()
      .then((data) => active && setCourses(data))
      .catch((error) => console.error('Error fetching courses:', error))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const visibleCourses = useMemo(
    () => courses.filter((course) => filter === 'all' || courseStyle(course).filter === filter),
    [courses, filter],
  );

  const scrollToCourses = () => document.getElementById('course-list')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f7fb] pb-28 text-slate-950 sm:pb-16 lg:pb-12">
      <section className="mx-auto max-w-[1440px] px-3 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[26px] bg-[linear-gradient(120deg,#080b25_0%,#18104f_60%,#3b1f91_100%)] px-6 py-9 text-white shadow-[0_24px_70px_rgba(25,17,86,0.18)] sm:px-10 sm:py-12 lg:min-h-[430px] lg:px-16 lg:py-14">
          <div className="absolute -right-20 top-4 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.55fr_0.75fr]">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-violet-300">IELTS programs</p>
              <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[54px]">
                Choose the right path to your target band.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-indigo-100/85 sm:text-lg">
                Focused courses, practical lessons and expert strategies—built to help you improve the skills that matter most.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={scrollToCourses}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white transition hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#18104f]"
                >
                  Explore courses <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  to="/pricing"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  View Premium plans
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-violet-400/50 bg-[#11102f]/90 p-6 shadow-2xl backdrop-blur sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-300">Your study plan</p>
              <h2 className="mt-3 text-2xl font-bold">4 skills. One clear path.</h2>
              <div className="mt-6 space-y-4">
                {['Reading & Listening', 'Writing Task 1 & 2', 'Speaking confidence'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-indigo-50">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-violet-600"><Check className="h-4 w-4" /></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="course-list" className="mx-auto max-w-[1376px] scroll-mt-28 px-4 pb-8 pt-14 sm:px-6 sm:pt-16 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700">Explore programs</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Courses designed for focused progress</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Choose a complete program or strengthen one IELTS skill at a time.
        </p>

        <div className="mt-7 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={`shrink-0 rounded-xl border px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
                filter === item.id
                  ? 'border-violet-600 bg-violet-600 text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:text-violet-700'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="mt-8 grid min-h-72 place-items-center rounded-3xl border border-slate-200 bg-white">
            <div className="text-center text-slate-500"><Loader2 className="mx-auto mb-3 h-7 w-7 animate-spin text-violet-600" />Loading courses…</div>
          </div>
        ) : visibleCourses.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-600">No courses found in this category.</div>
        ) : (
          <div className="mt-7 grid gap-5 lg:grid-cols-2 lg:gap-6">
            {visibleCourses.map((course) => {
              const style = courseStyle(course);
              const palette = colors[style.color];
              const Icon = style.icon;
              const lessonCount = course.curriculum?.reduce((sum, module) => sum + module.lessons.length, 0);
              return (
                <article key={course.id} className="group relative flex min-h-[286px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(76,29,149,0.10)] sm:p-7">
                  <span className={`absolute inset-y-0 left-0 w-1.5 ${palette.bar}`} />
                  <div className="flex items-start gap-4">
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white ${palette.icon}`}><Icon className="h-5 w-5" /></span>
                    <div className="min-w-0">
                      <p className={`text-[11px] font-bold uppercase tracking-[0.12em] ${palette.text}`}>{style.label}</p>
                      <h3 className="mt-1 text-xl font-bold leading-tight sm:text-2xl">{course.title}</h3>
                    </div>
                  </div>
                  <p className="mt-5 line-clamp-2 min-h-12 text-sm leading-6 text-slate-600">{course.description}</p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500 sm:text-sm">
                    <span>{lessonCount ? `${lessonCount} lessons` : course.duration}</span>
                    <span>•</span>
                    <span>{course.type === 'recorded' ? 'Self-paced' : course.type === 'hybrid' ? 'Hybrid learning' : 'Live program'}</span>
                  </div>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-7">
                    <div>
                      <p className="text-2xl font-bold">৳{course.price.toLocaleString()}</p>
                      {course.originalPrice && <p className="mt-0.5 text-xs text-slate-400 line-through">৳{course.originalPrice.toLocaleString()}</p>}
                    </div>
                    <Link to={`/courses/${course.id}`} className="inline-flex h-11 items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 text-sm font-semibold text-violet-700 transition hover:border-violet-600 hover:bg-violet-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">
                      View course <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-[1376px] space-y-5 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-violet-100 text-violet-700"><MessageCircle className="h-5 w-5" /></span>
            <div><h2 className="text-xl font-bold">Not sure which course fits your goal?</h2><p className="mt-1 text-sm leading-6 text-slate-600">Tell us your target band and strongest challenge—we’ll help you choose a focused study path.</p></div>
          </div>
          <Link to="/contact" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white transition hover:bg-violet-500">Get course guidance <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="flex flex-col gap-6 rounded-3xl bg-[linear-gradient(115deg,#080b25,#261168_75%,#43219b)] p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div className="flex gap-4"><BookOpen className="mt-1 h-7 w-7 shrink-0 text-violet-300" /><div><h2 className="text-2xl font-bold">Want access to the complete IELTS Tree library?</h2><p className="mt-2 text-sm text-indigo-100/80">Compare Monthly and Yearly Premium plans.</p></div></div>
          <Link to="/pricing" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-violet-700 transition hover:bg-violet-50">View Premium plans <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  );
}
