import { useMemo } from 'react';
import {
  ArrowLeft, ArrowRight, CheckCircle, CheckCircle2, Circle, FileText,
  Lightbulb, Lock, Star, XCircle, BookMarked, AlertTriangle, Mic,
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
import { VocabularyHero } from './VocabularyHero';
import { VocabularyOverviewCard } from './VocabularyOverviewCard';
import { VocabularyCoreExplanation } from './VocabularyCoreExplanation';
import { VocabularyExamples } from './VocabularyExamples';
import { VocabularyBank } from './VocabularyBank';
import { VocabularySpeakingPhrases } from './VocabularySpeakingPhrases';
import { VocabularyPracticePanel } from './VocabularyPracticePanel';

interface VocabularyLessonTemplateProps {
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
 * `lesson.type === 'vocabulary'` (except `influence-impact-vocabulary`,
 * which `LessonPage.tsx` deliberately keeps on its existing hand-authored
 * `DeepVocabularyLesson` path — see the plan's Context section for why).
 * Mirrors `WritingLessonTemplate`'s structure (fixed navy dashboard header,
 * hero, left-rail sections nav, main content column, right-rail step
 * panel) via the shared `LessonWorkspaceHeader`, swapping in the fields
 * vocabulary lessons actually use: a Vocabulary Bank (collocations /
 * synonyms) and a Speaking Phrases section, both hidden when their data is
 * absent. Nothing here keys off `slug`, so every current and future
 * `type: 'vocabulary'` lesson (other than the one exception) gets this
 * layout automatically.
 */
export function VocabularyLessonTemplate({
  lesson,
  content,
  estimatedTime,
  canAccessContent,
  isBookmarked,
  onBookmarkToggle,
  showCompletionCard,
  isCompleted,
  onProgressToggle,
}: VocabularyLessonTemplateProps) {
  const hasVocabularyBank = Boolean(content.collocations?.length) || Boolean(content.synonyms?.length);
  const hasSpeakingPhrases = Boolean(content.speakingLines?.length);

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
    ...(hasVocabularyBank ? [{ id: 'vocabulary-bank', title: 'Vocabulary Bank', icon: <BookMarked className="h-4 w-4" /> }] : []),
    ...(hasSpeakingPhrases ? [{ id: 'speaking-phrases', title: 'Speaking Phrases', icon: <Mic className="h-4 w-4" /> }] : []),
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
    <div className="-mt-16 min-h-screen bg-slate-50 pt-16">
      <LessonWorkspaceHeader />
      <ReadingProgressBar estimatedMinutes={5} />

      <VocabularyHero
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

      {lesson.videoUrl && (
        <div className="mx-auto max-w-[96rem] px-4 pt-6 sm:px-6 lg:px-8">
          <LessonVideoPlayer url={lesson.videoUrl} title={content.title} canAccess={canAccessContent} />
        </div>
      )}

      <div className="mx-auto grid max-w-[96rem] gap-6 px-4 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8 xl:grid-cols-[260px_minmax(0,1fr)_320px] xl:gap-7">
        <div className="hidden w-56 flex-shrink-0 lg:block xl:w-60">
          <div className="sticky top-20 space-y-4 py-6">
            <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
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

            <div className="rounded-2xl border border-blue-100 bg-white p-3 shadow-sm">
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

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 shadow-sm">
              <p className="text-sm font-black text-emerald-900">Study tip</p>
              <ul className="mt-3 space-y-2 text-xs leading-5 text-emerald-800">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Say the example sentence out loud.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Write your own sentence with the word.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  Review the common mistake before you finish.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="min-w-0 py-8">
          <div className="sticky top-16 z-40 mb-3 rounded-lg border border-slate-200/70 bg-white/90 px-1.5 py-1.5 shadow-sm backdrop-blur lg:hidden">
            <MobileTableOfContents items={tocItems} />
          </div>

          {!canAccessContent && (
            <Card className="mb-8 border-amber-200 bg-amber-50">
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
                    <Button>Upgrade Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          <div className={contentBlurClass}>
            <VocabularyOverviewCard targetLevel={content.targetLevel} whatYouWillLearn={content.whatYouWillLearn} />
            <VocabularyCoreExplanation coreExplanation={content.coreExplanation} />
            <VocabularyExamples examples={content.examples} />
            <VocabularyBank collocations={content.collocations} synonyms={content.synonyms} />
            <VocabularySpeakingPhrases speakingLines={content.speakingLines} />
            <VocabularyPracticePanel
              commonMistakes={content.commonMistakes}
              miniPractice={content.miniPractice}
              answerKey={content.answerKey}
              quickRecap={content.quickRecap}
            />
          </div>

          {showCompletionCard && (
            <Card className={`mb-6 ${isCompleted ? 'border-green-500 bg-green-500/5' : 'border-border'}`}>
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
                    className={isCompleted ? 'border-green-500 text-green-700 hover:bg-green-100' : ''}
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
            <Link to="/vocabulary">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Library
              </Button>
            </Link>

            {!canAccessContent && (
              <Link to="/pricing">
                <Button>
                  <Star className="mr-2 h-4 w-4" />
                  Upgrade to Premium
                </Button>
              </Link>
            )}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-white shadow-sm">
            <div className="grid gap-5 p-5 md:grid-cols-[1fr_320px] md:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">Stay sharp with IELTS vocabulary</p>
                <h3 className="mt-2 text-xl font-black">Review this lesson, then use the word in your next practice essay or speaking answer.</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                  One accurately used word is worth more than five memorized ones. Precision over quantity.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-bold text-white">Next best action</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">Write one sentence using today&apos;s word, then compare it with the examples above.</p>
                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700" onClick={() => scrollToSection('mini-practice')}>
                  Continue Practice
                </Button>
              </div>
            </div>
          </div>
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-20 space-y-4 py-6">
            <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
              <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Step 1 · Learn</p>
                <h3 className="mt-1 font-black text-slate-950">Understand the word</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">Read the explanation, then see how it's actually used.</p>
              </div>
              <div className="p-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => scrollToSection('core-explanation')}>
                  Go to Learn <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
              <div className="border-b border-violet-100 bg-gradient-to-r from-violet-50 to-fuchsia-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-600">Step 2 · Apply</p>
                <h3 className="mt-1 font-black text-slate-950">See it in context</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">Study the example sentences and why each one works.</p>
              </div>
              <div className="p-4">
                <Button variant="outline" className="w-full border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100" onClick={() => scrollToSection('examples')}>
                  Review Examples <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
              <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Step 3 · Master</p>
                <h3 className="mt-1 font-black text-slate-950">Practice and self-correct</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">Answer the mini practice, then fix your own common mistakes.</p>
              </div>
              <div className="p-4">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => scrollToSection('mini-practice')}>
                  Start Practice <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
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
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">Vocabulary rule</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-100">
                A word you can use correctly under pressure is worth more than ten you can only recognize.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
