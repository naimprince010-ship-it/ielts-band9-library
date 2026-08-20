import { useMemo } from 'react';
import {
  ArrowLeft, ArrowRight, CheckCircle, CheckCircle2, Circle, FileText,
  Lightbulb, Lock, Star, XCircle, BookMarked, AlertTriangle, Type,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MobileTableOfContents } from '@/components/ui/TableOfContents';
import { ReadingProgressBar } from '@/components/ui/ReadingProgressBar';
import { LessonWorkspaceHeader } from '@/components/lesson/LessonWorkspaceHeader';
import { LessonHeaderActions } from '@/components/lesson/LessonHeaderActions';
import { useNavConfig } from '@/contexts/NavContext';
import type { Lesson, LessonContent } from '@/types';
import { WritingHero } from './WritingHero';
import { WritingOverviewCard } from './WritingOverviewCard';
import { WritingCoreExplanation } from './WritingCoreExplanation';
import { WritingExamples } from './WritingExamples';
import { WritingPracticeStudio } from './WritingPracticeStudio';
import { WritingVocabularyBank } from './WritingVocabularyBank';
import { WritingPracticePanel } from './WritingPracticePanel';

interface WritingLessonTemplateProps {
  lesson: Lesson;
  content: LessonContent;
  estimatedTime: number;
  canAccessContent: boolean;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  showCompletionCard: boolean;
  isCompleted: boolean;
  onProgressToggle: () => void;
}

/**
 * Universal, data-driven template for every lesson where
 * `lesson.type === 'writing'`. Mirrors `GrammarLessonTemplate`'s structure
 * (fixed navy dashboard header, hero, left-rail sections nav, main
 * content column, right-rail step panel) via the shared
 * `LessonWorkspaceHeader`, but swaps out the grammar-only sections
 * (grammar form / when-to-use / sentence upgrades) for the fields writing
 * lessons actually use: a Vocabulary Bank section that only appears when
 * `collocations`/`synonyms` are present. Nothing here keys off `slug`, so
 * every current and future `type: 'writing'` lesson gets this layout
 * automatically.
 */
export function WritingLessonTemplate({
  lesson,
  content,
  estimatedTime,
  canAccessContent,
  isBookmarked,
  onBookmarkToggle,
  showCompletionCard,
  isCompleted,
  onProgressToggle,
}: WritingLessonTemplateProps) {
  const hasVocabularyBank = Boolean(content.collocations?.length) || Boolean(content.synonyms?.length);

  // Publishes this lesson's title and Bookmark/Mark Complete buttons into
  // NavContext. LessonWorkspaceHeader (rendered below) reads them straight
  // back out — memoized on the four values it actually depends on, so this
  // doesn't republish on every unrelated re-render, only when the bookmark
  // or completion state actually flips.
  const navActions = useMemo(
    () => (
      <LessonHeaderActions
        isBookmarked={isBookmarked}
        onBookmarkToggle={onBookmarkToggle}
        isCompleted={isCompleted}
        onProgressToggle={onProgressToggle}
      />
    ),
    [isBookmarked, onBookmarkToggle, isCompleted, onProgressToggle]
  );
  useNavConfig({ mode: 'focused', title: content.title, actions: navActions });

  const tocItems = [
    { id: 'what-you-will-learn', title: 'What You Will Learn', icon: <Lightbulb className="h-4 w-4" /> },
    { id: 'core-explanation', title: 'Core Explanation', icon: <FileText className="h-4 w-4" /> },
    { id: 'examples', title: `Examples (${content.examples.length})`, icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'practice-studio', title: 'Practice Studio', icon: <Type className="h-4 w-4" /> },
    ...(hasVocabularyBank ? [{ id: 'vocabulary-bank', title: 'Vocabulary Bank', icon: <BookMarked className="h-4 w-4" /> }] : []),
    { id: 'common-mistakes', title: `Common Mistakes (${content.commonMistakes.length})`, icon: <XCircle className="h-4 w-4" /> },
    { id: 'mini-practice', title: `Mini Practice (${content.miniPractice.length})`, icon: <AlertTriangle className="h-4 w-4" /> },
    { id: 'quick-recap', title: 'Quick Recap' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const topOffset = 92;
    const targetTop = element.getBoundingClientRect().top + window.scrollY - topOffset;
    window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' });
  };

  const contentBlurClass = !canAccessContent ? 'pointer-events-none select-none blur-sm' : '';
  const leftRailProgress = isCompleted ? 100 : 38;

  return (
    <div className="-mt-16 min-h-screen bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.10),_transparent_38%),linear-gradient(180deg,_#fffaf8_0%,_#ffffff_45%,_#fdf7f4_100%)] pt-16">
      <LessonWorkspaceHeader />
      <ReadingProgressBar estimatedMinutes={5} />

      <WritingHero
        title={content.title}
        description={lesson.description}
        topic={lesson.topic}
        level={lesson.level}
        targetLevel={content.targetLevel}
        estimatedTime={estimatedTime}
        isPremium={lesson.is_premium}
        isBookmarked={isBookmarked}
        onBookmarkToggle={onBookmarkToggle}
        onScrollToSection={scrollToSection}
        learningOutcomes={content.whatYouWillLearn}
      />

      <div className="mx-auto grid max-w-[96rem] gap-6 px-4 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8 xl:grid-cols-[260px_minmax(0,1fr)_320px] xl:gap-7">
        <div className="hidden w-56 flex-shrink-0 lg:block xl:w-60">
          <div className="sticky top-20 space-y-4 py-6">
            <div className="rounded-2xl border border-rose-100 bg-white/95 p-4 shadow-sm shadow-rose-100/70 backdrop-blur-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-600">Lesson focus</p>
              <h2 className="mt-2 line-clamp-3 text-lg font-black leading-tight text-slate-950">{content.title}</h2>
              <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-500">{lesson.description}</p>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Lesson progress</span>
                  <span>{leftRailProgress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 via-violet-500 to-indigo-600 transition-all"
                    style={{ width: `${leftRailProgress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">{isCompleted ? 'Lesson complete' : 'Keep going — finish the guided flow.'}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-rose-100 bg-white/95 p-3 shadow-sm shadow-rose-100/60 backdrop-blur-sm">
              <p className="px-1 pb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-400">Sections</p>
              <div className="space-y-1">
                {tocItems.map((item, index) => {
                  const isEarlyStep = index < 3;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className="group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-300"
                    >
                      <span
                        className={`grid h-6 w-6 flex-shrink-0 place-items-center rounded-full text-[11px] font-black ${
                          isEarlyStep || isCompleted
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-500 group-hover:bg-rose-100 group-hover:text-rose-700'
                        }`}
                      >
                        {isEarlyStep || isCompleted ? '✓' : index + 1}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-600 group-hover:text-rose-700">
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 shadow-sm shadow-emerald-100/50">
              <p className="text-sm font-black text-emerald-900">Band 8 checklist</p>
              <ul className="mt-3 space-y-2 text-xs leading-5 text-emerald-800">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Address every part of the task.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  One clear idea per paragraph.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Proofread for small, repeated slips.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="min-w-0 py-8">
          <div className="sticky top-16 z-40 mb-3 rounded-xl border border-slate-200/70 bg-white/92 px-1.5 py-1.5 shadow-sm shadow-slate-200/60 backdrop-blur lg:hidden">
            <MobileTableOfContents items={tocItems} />
          </div>

          {!canAccessContent && (
            <Card className="mb-8 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 shadow-sm shadow-amber-100/60">
              <CardContent className="py-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                    <Lock className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-900">Premium Content</h3>
                    <p className="text-amber-700">Upgrade to access this lesson and all premium materials.</p>
                  </div>
                  <Link to="/pricing">
                    <Button className="bg-amber-600 text-white hover:bg-amber-700">Upgrade Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          <div className={contentBlurClass}>
            <WritingOverviewCard targetLevel={content.targetLevel} whatYouWillLearn={content.whatYouWillLearn} />
            <WritingCoreExplanation coreExplanation={content.coreExplanation} />
            <WritingExamples examples={content.examples} />
            <WritingPracticeStudio topic={lesson.topic} />
            <WritingVocabularyBank collocations={content.collocations} synonyms={content.synonyms} />
            <WritingPracticePanel
              commonMistakes={content.commonMistakes}
              miniPractice={content.miniPractice}
              answerKey={content.answerKey}
              quickRecap={content.quickRecap}
            />
          </div>

          {showCompletionCard && (
            <Card className={`mb-6 shadow-sm ${isCompleted ? 'border-green-500 bg-green-500/5 shadow-green-100/60' : 'border-slate-200 bg-white shadow-slate-200/60'}`}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    ) : (
                      <Circle className="h-8 w-8 text-muted-foreground/50" />
                    )}
                    <div>
                      <p className={`font-medium ${isCompleted ? 'text-green-700' : 'text-foreground'}`}>
                        {isCompleted ? 'Lesson Completed!' : 'Mark this lesson as complete'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isCompleted ? 'Great job! You can mark it as incomplete if needed.' : 'Track your progress by marking lessons as complete.'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={isCompleted ? 'outline' : 'default'}
                    onClick={onProgressToggle}
                    className={isCompleted ? 'border-green-500 text-green-700 hover:bg-green-100' : 'bg-rose-600 hover:bg-rose-700'}
                  >
                    {isCompleted ? (
                      <>
                        <XCircle className="mr-2 h-4 w-4" />
                        Mark Incomplete
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Mark Complete
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/writing" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-rose-200 bg-white text-rose-700 hover:bg-rose-50">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Library
              </Button>
            </Link>

            {!canAccessContent && (
              <Link to="/pricing" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700">
                  <Star className="mr-2 h-4 w-4" />
                  Upgrade to Premium
                </Button>
              </Link>
            )}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-[linear-gradient(135deg,#301126_0%,#431936_52%,#5f2344_100%)] text-white shadow-lg shadow-rose-950/25">
            <div className="grid gap-5 p-5 md:grid-cols-[1fr_320px] md:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">Stay sharp with IELTS writing</p>
                <h3 className="mt-2 text-xl font-black">Review this lesson, then apply it to your next practice essay.</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                  Strong writing is not about impressive vocabulary everywhere. It is about addressing the task clearly, then proofreading the small mistakes that cap your score.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm font-bold text-white">Next best action</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">Write one paragraph using today&apos;s method, then compare it with the model answer above.</p>
                <Button className="mt-4 w-full bg-rose-600 hover:bg-rose-700" onClick={() => scrollToSection('practice-studio')}>
                  Continue Practice
                </Button>
              </div>
            </div>
          </div>
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-20 space-y-4 py-6">
            <div className="overflow-hidden rounded-2xl border border-rose-100 bg-white/95 shadow-sm shadow-rose-100/60 backdrop-blur-sm">
              <div className="border-b border-rose-100 bg-gradient-to-r from-rose-50 to-orange-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-600">Step 1 · Learn</p>
                <h3 className="mt-1 font-black text-slate-950">Understand the method</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">Read the explanation, then see how it applies to the task type.</p>
              </div>
              <div className="p-4">
                <Button className="w-full bg-rose-600 hover:bg-rose-700" onClick={() => scrollToSection('core-explanation')}>
                  Go to Learn <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white/95 shadow-sm shadow-violet-100/60 backdrop-blur-sm">
              <div className="border-b border-violet-100 bg-gradient-to-r from-violet-50 to-fuchsia-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-600">Step 2 · Check</p>
                <h3 className="mt-1 font-black text-slate-950">Study the model answers</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">See exactly why each example earns a high band score.</p>
              </div>
              <div className="p-4">
                <Button variant="outline" className="w-full border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100" onClick={() => scrollToSection('examples')}>
                  Review Examples <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white/95 shadow-sm shadow-emerald-100/60 backdrop-blur-sm">
              <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Step 3 · Apply</p>
                <h3 className="mt-1 font-black text-slate-950">Practice and self-correct</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">Write in the Practice Studio, then fix your own common mistakes.</p>
              </div>
              <div className="p-4">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => scrollToSection('practice-studio')}>
                  Start Practice <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm shadow-slate-200/60 backdrop-blur-sm">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-black text-slate-950">Lesson progress</p>
                <span className="text-sm font-black text-rose-700">{leftRailProgress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-gradient-to-r from-rose-500 via-violet-500 to-indigo-600" style={{ width: `${leftRailProgress}%` }} />
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                Complete the sections, then mark the lesson complete when you are ready.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[linear-gradient(135deg,#301126_0%,#431936_52%,#5f2344_100%)] p-4 text-white shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">Band 8 rule</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-100">
                A well-developed, on-task answer beats an impressive one that drifts off the question.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
