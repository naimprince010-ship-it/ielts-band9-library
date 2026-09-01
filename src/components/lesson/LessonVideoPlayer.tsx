import { Clock3, Lock, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface LessonVideoPlayerProps {
  url?: string;
  title: string;
  canAccess: boolean;
}

function getEmbedUrl(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0];
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const parts = url.pathname.split('/').filter(Boolean);
      const id = url.searchParams.get('v') || (['embed', 'shorts', 'live'].includes(parts[0]) ? parts[1] : null);
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }

    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const id = url.pathname.split('/').filter(Boolean).findLast(part => /^\d+$/.test(part));
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export function LessonVideoPlayer({ url, title, canAccess }: LessonVideoPlayerProps) {
  if (!canAccess) {
    return (
      <section className="overflow-hidden rounded-2xl border border-violet-200 bg-slate-950 px-6 py-10 text-center text-white shadow-xl shadow-violet-100/60">
        <Lock className="mx-auto h-9 w-9 text-violet-300" />
        <h2 className="mt-3 text-lg font-black">Video lesson is locked</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-slate-300">Enroll in this course to watch the lesson video and access the complete materials.</p>
        <Button asChild className="mt-5 bg-violet-600 text-white hover:bg-violet-500"><Link to="/courses">View courses</Link></Button>
      </section>
    );
  }

  const isTemporaryPilotVideo = url?.includes('M7lc1UVf-VE');
  const lessonVideoUrl = isTemporaryPilotVideo ? undefined : url;

  if (!lessonVideoUrl) {
    return (
      <section aria-label="Video lesson coming soon" className="overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 text-white shadow-xl shadow-violet-100/60">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-sm font-bold">
          <PlayCircle className="h-5 w-5 text-violet-300" /> IELTS Speaking video lesson
        </div>
        <div className="flex min-h-52 flex-col items-center justify-center px-6 py-10 text-center sm:min-h-64">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
            <Clock3 className="h-7 w-7 text-violet-200" />
          </span>
          <h2 className="mt-4 text-xl font-black">Lesson video coming soon</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
            The recorded IELTS lesson for “{title}” is being prepared. You can continue with the complete notes, examples, and practice activities below.
          </p>
        </div>
      </section>
    );
  }

  const embedUrl = getEmbedUrl(lessonVideoUrl);
  return (
    <section aria-label="Video lesson" className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-300/40">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-sm font-bold text-white">
        <PlayCircle className="h-5 w-5 text-violet-400" /> Video lesson
      </div>
      <div className="aspect-video w-full bg-black">
        {embedUrl ? (
          <iframe className="h-full w-full" src={embedUrl} title={`${title} video lesson`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        ) : (
          <video className="h-full w-full" src={lessonVideoUrl} controls preload="metadata">Your browser does not support HTML video.</video>
        )}
      </div>
    </section>
  );
}
