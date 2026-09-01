import { useMemo } from 'react';
import {
  AlertTriangle, ArrowLeft, ArrowRight, CheckCircle, CheckCircle2, Circle, FileText,
  Lightbulb, Lock, Star, XCircle, Zap, BookMarked,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MobileTableOfContents } from '@/components/ui/TableOfContents';
import { ReadingProgressBar } from '@/components/ui/ReadingProgressBar';
import { LessonWorkspaceHeader } from '@/components/lesson/LessonWorkspaceHeader';
import { LessonVideoPlayer } from '@/components/lesson/LessonVideoPlayer';
import { CourseLessonNavigation } from '@/components/lesson/CourseLessonNavigation';
import { LessonHeaderActions } from '@/components/lesson/LessonHeaderActions';
import { useNavConfig } from '@/contexts/NavContext';
import type { Lesson, LessonContent } from '@/types';
import { GrammarHero } from './GrammarHero';
import { GrammarOverviewCard } from './GrammarOverviewCard';
import { GrammarBandComparison } from './GrammarBandComparison';
import { GrammarCoreExplanation } from './GrammarCoreExplanation';
import { GrammarControlMap } from './GrammarControlMap';
import { GrammarUseGuide } from './GrammarUseGuide';
import { GrammarExamples } from './GrammarExamples';
import { SentenceUpgradeLab } from './SentenceUpgradeLab';
import { GrammarPracticePanel } from './GrammarPracticePanel';

interface GrammarLessonTemplateProps {
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
 * `lesson.type === 'grammar'`. Renders as a fully isolated tree (no shared
 * JSX/conditionals with the vocabulary or generic lesson rendering paths
 * in LessonPage.tsx) so future grammar lessons automatically get this
 * layout purely by having `type: 'grammar'` in their data — nothing here
 * keys off `slug`.
 *
 * Sections are shown/hidden purely based on which optional LessonContent
 * fields are present (grammarForm/grammarFormItems, grammarUse,
 * sentenceUpgrade); required fields are always rendered.
 */
export function GrammarLessonTemplate({
  lesson,
  content,
  estimatedTime,
  canAccessContent,
  isBookmarked,
  onBookmarkToggle,
  showCompletionCard,
  isCompleted,
  onProgressToggle,
}: GrammarLessonTemplateProps) {
  const hasGrammarForm = Boolean(content.grammarForm) || Boolean(content.grammarFormItems?.length);
  const hasGrammarUse = Boolean(content.grammarUse);
  const hasSentenceUpgrade = Boolean(content.sentenceUpgrade?.length);

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
    { id: 'band-comparison', title: 'Band 7 vs Band 8', icon: <Zap className="h-4 w-4" /> },
    { id: 'core-explanation', title: 'Core Explanation', icon: <FileText className="h-4 w-4" /> },
    ...(hasGrammarForm ? [{ id: 'grammar-form', title: 'Grammar Form', icon: <BookMarked className="h-4 w-4" /> }] : []),
    ...(hasGrammarUse ? [{ id: 'grammar-use', title: 'When to Use', icon: <Zap className="h-4 w-4" /> }] : []),
    { id: 'examples', title: `Examples (${content.examples.length})`, icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'common-mistakes', title: `Common Mistakes (${content.commonMistakes.length})`, icon: <XCircle className="h-4 w-4" /> },
    ...(hasSentenceUpgrade ? [{ id: 'sentence-upgrades', title: 'Sentence Upgrades' }] : []),
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
    <div className="-mt-16 min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.10),_transparent_38%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_45%,_#f8fafc_100%)] pt-16">
      <LessonWorkspaceHeader />
      <ReadingProgressBar estimatedMinutes={5} />

      <GrammarHero
        title={content.title}
        description={lesson.description}
        level={lesson.level}
        targetLevel={content.targetLevel}
        estimatedTime={estimatedTime}
        isPremium={lesson.is_premium}
        isBookmarked={isBookmarked}
        onBookmarkToggle={onBookmarkToggle}
        onScrollToSection={scrollToSection}
        upgradeCtaTarget={hasSentenceUpgrade ? 'sentence-upgrades' : 'examples'}
        learningOutcomes={content.whatYouWillLearn}
        sentencePreview={content.sentenceUpgrade?.[0]}
      />

      {lesson.videoUrl && (
        <div className="mx-auto max-w-[96rem] px-4 pt-6 sm:px-6 lg:px-8">
          <LessonVideoPlayer url={lesson.videoUrl} title={content.title} canAccess={canAccessContent} />
        </div>
      )}

      <div className="mx-auto grid max-w-[96rem] gap-6 px-4 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8 xl:grid-cols-[260px_minmax(0,1fr)_320px] xl:gap-7">
        <div className="hidden w-56 flex-shrink-0 lg:block xl:w-60">
          <div className="sticky top-20 space-y-4 py-6">
            <div className="rounded-2xl border border-blue-100 bg-white/95 p-4 shadow-sm shadow-blue-100/60 backdrop-blur-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Lesson focus</p>
              <h2 className="mt-2 line-clamp-3 text-lg font-black leading-tight text-slate-950">{content.title}</h2>
              <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-500">{lesson.description}</p>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Lesson progress</span>
                  <span>{leftRailProgress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all"
                    style={{ width: `${leftRailProgress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">{isCompleted ? 'Lesson complete' : 'Keep going — finish the guided flow.'}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white/95 p-3 shadow-sm shadow-blue-100/50 backdrop-blur-sm">
              <p className="px-1 pb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-400">Sections</p>
              <div className="space-y-1">
                {tocItems.map((item, index) => {
                  const isEarlyStep = index < 3;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className="group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span
                        className={`grid h-6 w-6 flex-shrink-0 place-items-center rounded-full text-[11px] font-black ${
                          isEarlyStep || isCompleted
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-700'
                        }`}
                      >
                        {isEarlyStep || isCompleted ? '✓' : index + 1}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-600 group-hover:text-blue-700">
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
                  Accurate grammar before complex grammar.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Each structure must serve the idea.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Proofread small article, tense, and preposition slips.
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
            <GrammarOverviewCard targetLevel={content.targetLevel} whatYouWillLearn={content.whatYouWillLearn} />
            <GrammarBandComparison targetLevel={content.targetLevel} />
            <GrammarCoreExplanation coreExplanation={content.coreExplanation} />
            <GrammarControlMap grammarForm={content.grammarForm} grammarFormItems={content.grammarFormItems} />
            <GrammarUseGuide grammarUse={content.grammarUse} />
            <GrammarExamples examples={content.examples} />
            <SentenceUpgradeLab sentenceUpgrade={content.sentenceUpgrade} />
            <GrammarPracticePanel
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
                    className={isCompleted ? 'border-green-500 text-green-700 hover:bg-green-100' : 'bg-indigo-600 hover:bg-indigo-700'}
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

          {canAccessContent && <CourseLessonNavigation courseId={lesson.courseId} lessonId={lesson.id} />}

          <div className="mt-8 flex items-center justify-between">
            <Link to="/grammar">
              <Button variant="outline" className="border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Library
              </Button>
            </Link>

            {!canAccessContent && (
              <Link to="/pricing">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <Star className="mr-2 h-4 w-4" />
                  Upgrade to Premium
                </Button>
              </Link>
            )}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-[linear-gradient(135deg,#0f172a_0%,#1e1b4b_100%)] text-white shadow-lg shadow-slate-900/20">
            <div className="grid gap-5 p-5 md:grid-cols-[1fr_320px] md:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">Stay sharp with IELTS grammar</p>
                <h3 className="mt-2 text-xl font-black">Review this lesson, then test the structure in your next essay.</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                  Strong grammar is not about using difficult sentences everywhere. It is about choosing accurate, purposeful structures under exam pressure.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm font-bold text-white">Next best action</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">Write 2 sentences using today&apos;s structure, then compare them with the upgrade examples.</p>
                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700" onClick={() => scrollToSection(hasSentenceUpgrade ? 'sentence-upgrades' : 'mini-practice')}>
                  Continue Practice
                </Button>
              </div>
            </div>
          </div>
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-20 space-y-4 py-6">
            <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white/95 shadow-sm shadow-blue-100/50 backdrop-blur-sm">
              <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Step 1 · Learn</p>
                <h3 className="mt-1 font-black text-slate-950">Understand the grammar move</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">Read the explanation, then check the Band 7 vs Band 8 difference.</p>
              </div>
              <div className="p-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => scrollToSection('core-explanation')}>
                  Go to Learn <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white/95 shadow-sm shadow-violet-100/50 backdrop-blur-sm">
              <div className="border-b border-violet-100 bg-gradient-to-r from-violet-50 to-fuchsia-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-600">Step 2 · Check</p>
                <h3 className="mt-1 font-black text-slate-950">Test the weak spots</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">Use examples and common mistakes to see what still sounds Band 7.</p>
              </div>
              <div className="p-4">
                <Button variant="outline" className="w-full border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100" onClick={() => scrollToSection('examples')}>
                  Review Examples <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white/95 shadow-sm shadow-emerald-100/50 backdrop-blur-sm">
              <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Step 3 · Apply</p>
                <h3 className="mt-1 font-black text-slate-950">Use it in IELTS writing</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">Upgrade sentences, then write your own version with controlled grammar.</p>
              </div>
              <div className="p-4">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => scrollToSection(hasSentenceUpgrade ? 'sentence-upgrades' : 'mini-practice')}>
                  Start Writing <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm shadow-slate-200/60 backdrop-blur-sm">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-black text-slate-950">Lesson progress</p>
                <span className="text-sm font-black text-blue-700">{leftRailProgress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600" style={{ width: `${leftRailProgress}%` }} />
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                Complete the sections, then mark the lesson complete when you are ready.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 text-white shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">Band 8 rule</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-100">
                Accuracy outranks ambition. One controlled complex sentence is better than three risky ones.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
