import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { courseService } from '@/services/courseService';
import type { Course, CurriculumLesson } from '@/types';

interface CourseLessonNavigationProps {
  courseId?: string;
  lessonId: string;
}

const isLinkedLesson = (lesson: string | CurriculumLesson): lesson is CurriculumLesson =>
  typeof lesson !== 'string' && Boolean(lesson.lessonId);

export function CourseLessonNavigation({ courseId, lessonId }: CourseLessonNavigationProps) {
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    let active = true;
    if (!courseId) return;
    void courseService.getCourseById(courseId).then((result) => {
      if (active) setCourse(result);
    });
    return () => { active = false; };
  }, [courseId]);

  const orderedLessons = useMemo(
    () => course?.curriculum?.flatMap((module) => module.lessons).filter(isLinkedLesson) ?? [],
    [course],
  );
  const currentIndex = orderedLessons.findIndex((lesson) => lesson.lessonId === lessonId);

  if (!courseId || !course || currentIndex < 0) return null;

  const previous = orderedLessons[currentIndex - 1];
  const next = orderedLessons[currentIndex + 1];

  return (
    <nav aria-label="Course lesson navigation" className="mb-6 grid gap-3 sm:grid-cols-2">
      <Link
        to={previous?.lessonId ? `/lesson/${previous.lessonId}` : `/courses/${courseId}`}
        className="group flex min-h-24 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-violet-300 hover:shadow-md"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-violet-100 group-hover:text-violet-700"><ArrowLeft className="h-4 w-4" /></span>
        <span className="min-w-0"><span className="text-xs font-bold uppercase tracking-wider text-slate-400">{previous ? 'Previous lesson' : 'Course overview'}</span><span className="mt-1 block line-clamp-2 text-sm font-bold leading-5 text-slate-800">{previous?.title ?? course.title}</span></span>
      </Link>

      <Link
        to={next?.lessonId ? `/lesson/${next.lessonId}` : `/courses/${courseId}`}
        className="group flex min-h-24 items-center justify-between gap-3 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 p-4 shadow-sm transition hover:border-violet-400 hover:shadow-md"
      >
        <span className="min-w-0"><span className="text-xs font-bold uppercase tracking-wider text-violet-600">{next ? 'Next lesson' : 'Course complete'}</span><span className="mt-1 block line-clamp-2 text-sm font-bold leading-5 text-slate-900">{next?.title ?? 'Return to course overview'}</span></span>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-600 text-white">{next ? <ArrowRight className="h-4 w-4" /> : <CheckCircle2 className="h-5 w-5" />}</span>
      </Link>

      <Link to={`/courses/${courseId}`} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-violet-700 sm:col-span-2 sm:justify-center"><BookOpen className="h-4 w-4" />View full course curriculum</Link>
    </nav>
  );
}
