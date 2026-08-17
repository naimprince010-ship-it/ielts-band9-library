import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Star,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PATH_STEPS: [string, string, string, string][] = [
  ['Learn', 'DONE', 'w-full', 'core-explanation'],
  ['Apply', 'DONE', 'w-full', 'examples'],
  ['Speak', 'NOW', 'w-1/2', 'speaking-phrases'],
  ['Master', 'LOCKED', 'w-0', 'mini-practice'],
];

interface VocabularyHeroProps {
  title: string;
  description: string;
  topic: string;
  level: string;
  targetLevel: string;
  estimatedTime: number;
  isPremium: boolean;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  onScrollToSection: (id: string) => void;
  learningOutcomes: string[];
}

/**
 * Vocabulary workspace hero: same navy -> indigo gradient banner as
 * `WritingHero`/`GrammarHero`, with a Learn -> Apply -> Speak -> Master
 * study path (mapped to `core-explanation` / `examples` /
 * `speaking-phrases` / `mini-practice`) instead of writing's
 * Plan -> Draft -> Upgrade -> Proofread. `onScrollToSection` already
 * no-ops when a target id isn't present on the page (e.g. a lesson with no
 * `speakingLines`), same as the writing template.
 */
export function VocabularyHero({
  title,
  description,
  topic,
  level,
  targetLevel,
  estimatedTime,
  isPremium,
  isBookmarked,
  onBookmarkToggle,
  onScrollToSection,
  learningOutcomes,
}: VocabularyHeroProps) {
  return (
    <div className="border-b border-blue-100 bg-slate-50 py-3 text-background">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <Link to="/vocabulary" className="mb-2 inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to vocabulary library
        </Link>

        <div className="overflow-hidden rounded-[1.45rem] bg-[linear-gradient(135deg,#0d1437_0%,#1b1d54_54%,#39218a_100%)] p-4 text-white shadow-2xl shadow-indigo-950/20 sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-start">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-white/20 bg-white/10 text-white">
                  <BookOpen className="mr-1 h-3.5 w-3.5" />
                  {topic}
                </Badge>
                <Badge variant="outline" className="border-emerald-300/40 bg-emerald-400/15 text-emerald-100">
                  {targetLevel}
                </Badge>
                <Badge variant="outline" className="border-white/20 bg-white/10 text-white/80 capitalize">
                  {level}
                </Badge>
                {isPremium && (
                  <Badge className="bg-amber-500 text-slate-950">
                    <Star className="mr-1 h-3 w-3" /> Premium
                  </Badge>
                )}
                <Badge variant="outline" className="border-white/20 bg-white/10 text-white/80">
                  <Zap className="mr-1 h-3.5 w-3.5" /> {estimatedTime} min
                </Badge>
              </div>
              <h1 className="max-w-3xl text-3xl font-black tracking-tight sm:text-4xl lg:text-[2.9rem] lg:leading-[1.05]">{title}</h1>
              <p className="mt-2 max-w-2xl text-base leading-6 text-indigo-100 sm:text-lg">{description}</p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button className="h-10 rounded-xl bg-white px-5 font-black text-slate-950 hover:bg-indigo-50" onClick={() => onScrollToSection('what-you-will-learn')}>
                  Resume lesson
                </Button>
                <Button
                  variant="outline"
                  className="h-10 rounded-xl border-white/25 bg-white/10 px-5 font-black text-white hover:bg-white/15 hover:text-white"
                  onClick={() => onScrollToSection('examples')}
                >
                  Study examples <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={onBookmarkToggle}
                  className="h-10 rounded-xl border-white/20 bg-white/10 px-5 text-white hover:bg-white/15 hover:text-white"
                >
                  {isBookmarked ? <BookmarkCheck className="mr-2 h-4 w-4" /> : <Bookmark className="mr-2 h-4 w-4" />}
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                {PATH_STEPS.map(([label, status, width, targetId]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => onScrollToSection(targetId)}
                    className="rounded-xl border border-white/15 bg-white/10 p-2.5 text-left transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-black text-white">{label}</p>
                      <span className={`text-[10px] font-black ${status === 'LOCKED' ? 'text-white/40' : status === 'NOW' ? 'text-indigo-100' : 'text-emerald-200'}`}>
                        {status}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
                      <div className={`h-full rounded-full ${status === 'LOCKED' ? 'bg-white/20' : 'bg-emerald-300'} ${width}`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[1.1rem] border border-white/15 bg-white/10 p-3.5 shadow-xl backdrop-blur-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-200">You will leave able to</p>
              <ul className="mt-2.5 space-y-2.5">
                {(learningOutcomes.length ? learningOutcomes : [
                  'Use this word accurately in IELTS Writing and Speaking',
                  'Avoid the most common mistake learners make with it',
                  'Recognize natural collocations and synonyms',
                ]).slice(0, 3).map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2.5 text-sm font-semibold leading-5 text-indigo-50">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
