import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, BookOpen, GraduationCap, Star, Bookmark, BookmarkCheck,
  CheckCircle, XCircle, AlertTriangle, Lightbulb,
  Lock, CheckCircle2, Circle, FileText, MessageSquare, Zap, BookMarked
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MistakeFlipCard } from '@/components/ui/FlipCard';
import { TableOfContents, MobileTableOfContents } from '@/components/ui/TableOfContents';
import { ReadingProgressBar } from '@/components/ui/ReadingProgressBar';
import { InteractivePractice } from '@/components/ui/InteractivePractice';
import { CopyableBadge } from '@/components/ui/CopyButton';
import { SpeakButton } from '@/components/ui/SpeakButton';
import { PieChartCoreExplanation } from '@/components/ui/PieChartVisuals';
import { DeepVocabularyLesson } from '@/components/lesson/DeepVocabularyLesson';
import { GrammarLessonTemplate } from '@/components/lesson/grammar/GrammarLessonTemplate';
import { WritingLessonTemplate } from '@/components/lesson/writing/WritingLessonTemplate';
import { VocabularyLessonTemplate } from '@/components/lesson/vocabulary/VocabularyLessonTemplate';
import { useLessons } from '@/contexts/LessonContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { trackFunnelEvent } from '@/lib/funnel';

// Helper function to parse markdown-style text and render properly
function parseMarkdownText(text: string): React.ReactNode {
  if (!text) return null;

  // Split by **text** pattern for bold
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={index} className="font-semibold text-foreground">{boldText}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

// Helper to parse Speaking examples with Question/Band format
function parseExampleContent(text: string): React.ReactNode {
  if (!text) return null;

  // Check if it has Question/Band format (Speaking)
  const hasQuestionFormat = text.includes('**Question:') || text.includes('**Band');

  if (!hasQuestionFormat) {
    return <p className="text-muted-foreground leading-relaxed">{parseMarkdownText(text)}</p>;
  }

  // Parse Question - handles both formats:
  // Format 1: **Question: What's the weather?**
  // Format 2: **Question:** What's the weather?
  let questionText = '';
  const questionMatch1 = text.match(/\*\*Question:\s*([^*]+?)\*\*/);
  const questionMatch2 = text.match(/\*\*Question:\*\*\s*([^*]+?)(?=\*\*Band|$)/);

  if (questionMatch1) {
    questionText = questionMatch1[1].trim();
  } else if (questionMatch2) {
    questionText = questionMatch2[1].trim();
  }

  // Parse Band 6 and Band 9 responses
  const band6Match = text.match(/\*\*Band 6:\*\*\s*"([^"]+)"/);
  const band9Match = text.match(/\*\*Band 9:\*\*\s*"([^"]+)"/);

  return (
    <div className="space-y-4">
      {questionText && (
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-4 w-4 text-accent" />
            <span className="font-semibold text-accent text-sm uppercase tracking-wide">Question</span>
          </div>
          <p className="text-foreground font-medium text-lg">{questionText}</p>
        </div>
      )}

      {(band6Match || band9Match) && (
        <div className="grid gap-4 md:grid-cols-2">
          {band6Match && (
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900 dark:text-amber-300">
                  Band 6
                </Badge>
                <span className="text-xs text-amber-600 dark:text-amber-400">Basic Response</span>
              </div>
              <p className="text-amber-900 dark:text-amber-100 text-sm leading-relaxed italic">"{band6Match[1]}"</p>
            </div>
          )}

          {band9Match && (
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300">
                  Band 9
                </Badge>
                <span className="text-xs text-green-600 dark:text-green-400">Advanced Response</span>
              </div>
              <p className="text-green-900 dark:text-green-100 text-sm leading-relaxed italic">"{band9Match[1]}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helper to parse vocabulary sections in examples
function parseVocabularySection(text: string): React.ReactNode {
  if (!text) return null;

  // Check for vocabulary format **WEATHER VOCABULARY:** etc.
  const vocabMatch = text.match(/\*\*([A-Z\s]+VOCABULARY[^:]*|[A-Z\s]+):\*\*/);

  if (!vocabMatch) {
    return <p className="text-muted-foreground leading-relaxed">{parseMarkdownText(text)}</p>;
  }

  // Parse into structured format
  const sections = text.split(/\*\*([^*]+):\*\*/g).filter(Boolean);

  return (
    <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        <BookMarked className="h-4 w-4 text-blue-600" />
        <span className="font-semibold text-blue-700 dark:text-blue-300 text-sm uppercase tracking-wide">Key Vocabulary</span>
      </div>
      <div className="grid gap-2">
        {sections.map((section, idx) => {
          if (idx % 2 === 0) {
            const content = sections[idx + 1];
            if (!content) return null;
            return (
              <div key={idx} className="flex flex-wrap gap-2 items-start">
                <Badge variant="secondary" className="text-xs shrink-0">{section}</Badge>
                <p className="text-sm text-muted-foreground flex-1">{content.trim()}</p>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export function LessonPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getLessonBySlug, addBookmark, removeBookmark, isBookmarked, incrementViewCount, lessons, getLessonProgress, setLessonProgress } = useLessons();
  const { user, isPremium } = useAuth();
  const [lesson, setLesson] = useState(getLessonBySlug(slug || ''));

  // Dynamic page title
  useEffect(() => {
    if (lesson?.title) {
      document.title = `${lesson.title} | IELTS Band 9 Materials Library`;
      trackFunnelEvent('lesson_started', { lessonId: lesson.id, slug });
    }
  }, [lesson?.id, lesson?.title, slug]);

  const lessonProgress = lesson ? getLessonProgress(lesson.id) : 'not_started';
  const isCompleted = lessonProgress === 'completed';

  const [isCourseEnrolled, setIsCourseEnrolled] = useState(false);

  useEffect(() => {
    const foundLesson = getLessonBySlug(slug || '');
    setLesson(foundLesson);
    if (foundLesson) {
      incrementViewCount(foundLesson.id);

      // Check course enrollment if this lesson belongs to a course
      const checkEnrollment = async () => {
        if (user && foundLesson.courseId) {
          const { data, error } = await supabase
            .from('user_courses')
            .select('*')
            .eq('user_id', user.id)
            .eq('course_id', foundLesson.courseId)
            .eq('access_status', 'active')
            .maybeSingle();

          if (data && !error) {
            setIsCourseEnrolled(true);
          }
        }
      };

      if (user && foundLesson.courseId) {
        checkEnrollment();
      }
    }
  }, [slug, lessons, user]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Lesson not found</h2>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // They can access if it's NOT premium, OR they are a global premium user, OR they bought the specific course
  const canAccessContent = !lesson.is_premium || isPremium || isCourseEnrolled;
  const content = lesson.content;
  const isDeepVocabularyLesson = lesson.slug === 'influence-impact-vocabulary';
  const estimatedTime = Math.max(5, Math.ceil((content.examples.length + content.miniPractice.length + content.commonMistakes.length) * 2));

  const handleBookmarkToggle = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (isBookmarked(lesson.id)) {
      await removeBookmark(lesson.id);
    } else {
      await addBookmark(lesson.id);
    }
  };

  const handleProgressToggle = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!lesson) return;

    setLessonProgress(lesson.id, isCompleted ? 'not_started' : 'completed');
  };

  if (lesson.type === 'grammar') {
    return (
      <GrammarLessonTemplate
        lesson={lesson}
        content={content}
        estimatedTime={estimatedTime}
        canAccessContent={canAccessContent}
        isBookmarked={isBookmarked(lesson.id)}
        onBookmarkToggle={handleBookmarkToggle}
        showCompletionCard={canAccessContent}
        isCompleted={isCompleted}
        onProgressToggle={handleProgressToggle}
      />
    );
  }

  // Writing lessons render through their own fully isolated, data-driven
  // template for the same reason grammar lessons do: this early return
  // applies to every current and future lesson with type 'writing'
  // automatically — nothing here is keyed off `slug`.
  if (lesson.type === 'writing') {
    return (
      <WritingLessonTemplate
        lesson={lesson}
        content={content}
        estimatedTime={estimatedTime}
        canAccessContent={canAccessContent}
        isBookmarked={isBookmarked(lesson.id)}
        onBookmarkToggle={handleBookmarkToggle}
        showCompletionCard={canAccessContent}
        isCompleted={isCompleted}
        onProgressToggle={handleProgressToggle}
      />
    );
  }

  // Vocabulary lessons render through their own fully isolated,
  // data-driven template for the same reason grammar and writing lessons
  // do — with one deliberate exception: `influence-impact-vocabulary` is
  // excluded and falls through to the generic branch below, unchanged,
  // because its content comes from the hand-authored `DeepVocabularyLesson`
  // component rather than from `lesson.content`. Nothing else here is
  // keyed off `slug`.
  if (lesson.type === 'vocabulary' && lesson.slug !== 'influence-impact-vocabulary') {
    return (
      <VocabularyLessonTemplate
        lesson={lesson}
        content={content}
        estimatedTime={estimatedTime}
        canAccessContent={canAccessContent}
        isBookmarked={isBookmarked(lesson.id)}
        onBookmarkToggle={handleBookmarkToggle}
        showCompletionCard={canAccessContent}
        isCompleted={isCompleted}
        onProgressToggle={handleProgressToggle}
      />
    );
  }

  const deepLessonTocItems = [
    { id: 'what-you-will-learn', title: 'Overview', icon: <Lightbulb className="h-4 w-4" /> },
    { id: 'compare-four-words', title: 'Compare the 4 words', icon: <BookMarked className="h-4 w-4" /> },
    { id: 'core-explanation', title: 'Learn', icon: <FileText className="h-4 w-4" /> },
    { id: 'examples', title: 'Check', icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'mini-practice', title: 'Apply', icon: <AlertTriangle className="h-4 w-4" /> },
    { id: 'review', title: 'Review', icon: <Circle className="h-4 w-4" /> },
  ];

  const standardTocItems = [
    { id: 'what-you-will-learn', title: 'What You Will Learn', icon: <Lightbulb className="h-4 w-4" /> },
    { id: 'core-explanation', title: 'Core Explanation', icon: <FileText className="h-4 w-4" /> },
    ...(lesson.type === 'grammar' && (content.grammarForm || content.grammarFormItems?.length)
      ? [{ id: 'grammar-form', title: 'Grammar Form', icon: <BookMarked className="h-4 w-4" /> }]
      : []),
    ...(lesson.type === 'grammar' && content.grammarUse
      ? [{ id: 'grammar-use', title: 'When to Use', icon: <Zap className="h-4 w-4" /> }]
      : []),
    { id: 'examples', title: `Examples (${content.examples.length})`, icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'common-mistakes', title: `Common Mistakes (${content.commonMistakes.length})`, icon: <XCircle className="h-4 w-4" /> },
    ...(lesson.type === 'vocabulary' && content.collocations
      ? [{ id: 'collocations', title: 'Collocations', icon: <MessageSquare className="h-4 w-4" /> }]
      : []),
    ...(lesson.type === 'vocabulary' && content.synonyms ? [{ id: 'synonyms', title: 'Synonyms' }] : []),
    ...(lesson.type === 'vocabulary' && content.speakingLines ? [{ id: 'speaking-phrases', title: 'Speaking Phrases' }] : []),
    ...(lesson.type === 'grammar' && content.sentenceUpgrade ? [{ id: 'sentence-upgrades', title: 'Sentence Upgrades' }] : []),
    { id: 'mini-practice', title: `Mini Practice (${content.miniPractice.length})`, icon: <AlertTriangle className="h-4 w-4" /> },
    { id: 'quick-recap', title: 'Quick Recap' },
  ];

  const tocItems = isDeepVocabularyLesson ? deepLessonTocItems : standardTocItems;

  return (
    <div className="min-h-screen bg-slate-50">
      <ReadingProgressBar estimatedMinutes={5} />
      <div className={isDeepVocabularyLesson ? 'mt-1 border-b border-indigo-100 bg-white py-8 text-slate-950' : 'mt-1 border-b border-indigo-100 bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 py-8 text-background'}>
        <div className={isDeepVocabularyLesson ? 'mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8' : 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'}>
          <Link
            to={`/${lesson.type}`}
            className={isDeepVocabularyLesson ? 'mb-4 inline-flex items-center text-slate-500 hover:text-indigo-700' : 'inline-flex items-center text-white/80 hover:text-white mb-4'}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {lesson.type} library
          </Link>

          <div className={isDeepVocabularyLesson ? 'grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center' : 'flex items-start justify-between'}>
            <div className="flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {lesson.type === 'vocabulary' ? (
                  <BookOpen className={isDeepVocabularyLesson ? 'h-6 w-6 text-indigo-700' : 'h-6 w-6'} />
                ) : (
                  <GraduationCap className="h-6 w-6" />
                )}
                <Badge variant="secondary" className={isDeepVocabularyLesson ? 'capitalize bg-indigo-50 text-indigo-700' : 'capitalize'}>
                  {lesson.type}
                </Badge>
                <Badge variant="outline" className={isDeepVocabularyLesson ? 'capitalize border-slate-200 bg-white text-slate-600' : 'capitalize bg-white/10 border-white/30'}>
                  {lesson.level}
                </Badge>
                {lesson.is_premium && (
                  <Badge className="bg-amber-500">
                    <Star className="h-3 w-3 mr-1" /> Premium
                  </Badge>
                )}
              </div>
              <h1 className={isDeepVocabularyLesson ? 'mb-3 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl' : 'mb-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl'}>{content.title}</h1>
              <p className={isDeepVocabularyLesson ? 'max-w-2xl text-base leading-8 text-slate-600' : 'max-w-2xl text-white/80 leading-7'}>{lesson.description}</p>
              {isDeepVocabularyLesson && (
                <div className="mt-6 flex flex-wrap items-center gap-5 text-sm font-medium text-slate-700">
                  <span className="inline-flex items-center gap-2"><BookOpen className="h-4 w-4 text-indigo-700" />4 key words</span>
                  <span className="inline-flex items-center gap-2"><Zap className="h-4 w-4 text-indigo-700" />8-12 min</span>
                  <span className="inline-flex items-center gap-2"><GraduationCap className="h-4 w-4 text-indigo-700" />{content.targetLevel}</span>
                </div>
              )}
            </div>

            {isDeepVocabularyLesson ? (
              <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-100/70" />
                <div className="pointer-events-none absolute -bottom-12 right-12 h-24 w-24 rounded-full bg-sky-100/70" />
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-rose-50 text-rose-500">
                    <Zap className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-black text-indigo-700">By the end of this lesson</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      You will confidently use influence, impact, affect and effect in the correct form and context.
                    </p>
                    <Badge className="mt-3 bg-indigo-50 text-indigo-700 hover:bg-indigo-50">IELTS Writing + Speaking</Badge>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700" onClick={() => document.getElementById('compare-four-words')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                        Start with Compare <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50" onClick={() => document.getElementById('core-explanation')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                        Jump to Learn
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                variant="secondary"
                size="icon"
                onClick={handleBookmarkToggle}
                className="ml-4"
              >
                {isBookmarked(lesson.id) ? (
                  <BookmarkCheck className="h-5 w-5" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className={isDeepVocabularyLesson ? 'mx-auto grid max-w-[88rem] gap-6 px-4 sm:px-6 lg:grid-cols-[224px_minmax(0,1fr)] lg:px-8 xl:grid-cols-[224px_minmax(0,1fr)_300px] xl:gap-8' : 'mx-auto flex max-w-[88rem] gap-6 px-4 sm:px-6 lg:px-8 xl:gap-8'}>
        <div className={isDeepVocabularyLesson ? 'hidden w-56 flex-shrink-0 lg:block' : 'hidden w-52 flex-shrink-0 lg:block xl:w-56'}>
          <div className="sticky top-24 py-8">
            <TableOfContents items={tocItems} />
          </div>
        </div>

        <div className={isDeepVocabularyLesson ? 'min-w-0 py-8' : 'mx-auto max-w-5xl flex-1 py-8'}>
          <div className="lg:hidden mb-4 sticky top-16 z-40 bg-background py-2">
            <MobileTableOfContents items={tocItems} />
          </div>

          {!canAccessContent && (
            <Card className="mb-8 border-amber-200 bg-amber-50">
              <CardContent className="py-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
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

          {isDeepVocabularyLesson ? (
            <div className={!canAccessContent ? 'blur-sm pointer-events-none select-none' : ''}>
              <DeepVocabularyLesson title={content.title} targetLevel={content.targetLevel} learningPoints={content.whatYouWillLearn} />
            </div>
          ) : (
          <Card className="mb-6" id="what-you-will-learn">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                What You Will Learn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Target Level: <strong>{content.targetLevel}</strong></p>
              <ul className="space-y-2">
                {content.whatYouWillLearn.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          )}

          <div className={!canAccessContent ? 'blur-sm pointer-events-none select-none' : ''}>
            {!isDeepVocabularyLesson && <Card className="mb-6" id="core-explanation">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  Core Explanation
                </CardTitle>
              </CardHeader>
              <CardContent>
                {slug === 'task1-pie-chart-description' ? (
                  <PieChartCoreExplanation />
                ) : (
                  <div className="space-y-4">
                    {content.coreExplanation.split('\n\n').map((paragraph, paragraphIndex) => {
                      // Check if this is a numbered list section
                      const lines = paragraph.split('\n');
                      const hasNumberedList = lines.some(line => /^\d+\./.test(line.trim()));
                      const isBoldHeader = paragraph.startsWith('**') && paragraph.includes('**');
                      const isKeyPrinciple = paragraph.toLowerCase().includes('key principle');

                      // Handle bold headers like **Top 10 error categories:**
                      if (isBoldHeader && !hasNumberedList) {
                        const cleanText = paragraph.replace(/\*\*/g, '');
                        return (
                          <div key={paragraphIndex} className="bg-accent/5 border-l-4 border-accent p-4 rounded-r-lg">
                            <p className="font-semibold text-foreground">{cleanText}</p>
                          </div>
                        );
                      }

                      // Handle key principle callout
                      if (isKeyPrinciple) {
                        const cleanText = paragraph.replace(/\*\*/g, '');
                        return (
                          <div key={paragraphIndex} className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                            <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <p className="text-amber-900 font-medium">{cleanText}</p>
                          </div>
                        );
                      }

                      // Handle numbered list with visual styling
                      if (hasNumberedList) {
                        return (
                          <div key={paragraphIndex} className="space-y-2">
                            {lines.map((line, lineIndex) => {
                              const numberedMatch = line.trim().match(/^(\d+)\.\s*(.+)/);
                              if (numberedMatch) {
                                const [, num, text] = numberedMatch;
                                return (
                                  <div key={lineIndex} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                    <span className="w-7 h-7 rounded-full bg-accent text-white text-sm flex items-center justify-center flex-shrink-0 font-bold">
                                      {num}
                                    </span>
                                    <span className="text-foreground font-medium pt-0.5">{text}</span>
                                  </div>
                                );
                              } else if (line.startsWith('**') && line.endsWith('**')) {
                                return (
                                  <p key={lineIndex} className="font-semibold text-foreground mb-2">
                                    {line.replace(/\*\*/g, '')}
                                  </p>
                                );
                              } else if (line.trim()) {
                                return <p key={lineIndex} className="text-muted-foreground">{line}</p>;
                              }
                              return null;
                            })}
                          </div>
                        );
                      }

                      // Regular paragraph with bold text parsing
                      const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
                      return (
                        <p key={paragraphIndex} className="text-muted-foreground leading-relaxed">
                          {parts.map((part, partIndex) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={partIndex} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          })}
                        </p>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
            }

                        {lesson.type === 'grammar' && content.grammarFormItems && content.grammarFormItems.length > 0 ? (
                          <Card className="mb-6 border-accent/30 bg-accent/5" id="grammar-form">
                            <CardHeader>
                              <CardTitle className="text-foreground">Grammar Form</CardTitle>
                              <p className="text-sm text-accent mt-1">Click each item to see details and examples</p>
                            </CardHeader>
                            <CardContent>
                              <Accordion type="single" collapsible className="w-full space-y-2">
                                {content.grammarFormItems.map((item, index) => (
                                  <AccordionItem
                                    key={index}
                                    value={`grammar-form-${index}`}
                                    className="border border-border rounded-lg bg-card overflow-hidden"
                                  >
                                    <AccordionTrigger className="px-4 py-3 hover:bg-muted hover:no-underline">
                                      <div className="flex items-center gap-3 text-left">
                                        <span className="font-semibold text-foreground">{item.name}</span>
                                        <div className="flex gap-1">
                                          {item.tags.map((tag, tagIndex) => (
                                            <Badge key={tagIndex} variant="secondary" className="bg-accent/10 text-accent text-xs">
                                              {tag}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4">
                                      <div className="space-y-4">
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground mb-1">Definition</p>
                                          <p className="text-foreground">{item.definition}</p>
                                        </div>
                                        <div className="bg-muted rounded-lg p-4 space-y-3">
                                          <p className="text-sm font-medium text-muted-foreground">Comparison</p>
                                          <div className="flex items-start gap-2">
                                            <XCircle className="h-4 w-4 text-muted-foreground/70 mt-1 flex-shrink-0" />
                                            <p className="text-muted-foreground">{item.comparison.standard}</p>
                                          </div>
                                          <div className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                            <p className="text-green-700 font-semibold">{item.comparison.band8}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            </CardContent>
                          </Card>
                        ) : lesson.type === 'grammar' && content.grammarForm && (
                          <Card className="mb-6 border-accent/30 bg-accent/5" id="grammar-form">
                            <CardHeader>
                              <CardTitle className="text-foreground">Grammar Form</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <pre className="whitespace-pre-wrap text-foreground font-mono text-sm">
                                {content.grammarForm}
                              </pre>
                            </CardContent>
                          </Card>
                        )}

            {lesson.type === 'grammar' && content.grammarUse && (
              <Card className="mb-6 border-foreground/20 bg-foreground/5" id="grammar-use">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-500" />
                    When to Use
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    {content.grammarUse.split('\n\n').map((section, sectionIndex) => {
                      const lines = section.split('\n');

                      return (
                        <div key={sectionIndex} className={sectionIndex > 0 ? 'mt-4 pt-4 border-t border-border' : ''}>
                          {lines.map((line, lineIndex) => {
                            if (line.startsWith('**') && line.endsWith('**')) {
                              return (
                                <h4 key={lineIndex} className="font-semibold text-foreground mb-2">
                                  {line.replace(/\*\*/g, '')}
                                </h4>
                              );
                            } else if (line.match(/^\d+\./)) {
                              return (
                                <div key={lineIndex} className="flex items-start gap-2 py-1">
                                  <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs flex items-center justify-center flex-shrink-0 font-medium">
                                    {line.match(/^\d+/)?.[0]}
                                  </span>
                                  <span className="text-muted-foreground">{line.replace(/^\d+\.\s*/, '')}</span>
                                </div>
                              );
                            } else if (line.startsWith('-')) {
                              return (
                                <div key={lineIndex} className="flex items-start gap-2 py-1 pl-2">
                                  <span className="text-accent">•</span>
                                  <span className="text-muted-foreground">{line.replace(/^-\s*/, '')}</span>
                                </div>
                              );
                            } else if (line.trim()) {
                              return <p key={lineIndex} className="text-muted-foreground">{line}</p>;
                            }
                            return null;
                          })}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {!isDeepVocabularyLesson && <Card className="mb-6" id="examples">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Examples ({content.examples.length})
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Real IELTS examples with Band 6 vs Band 9 comparisons
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {content.examples.map((example, index) => {
                    // Check for different formats
                    const hasErrorFormat = example.sentence.includes('Error:') && example.sentence.includes('Correct:');
                    const hasQuestionFormat = example.sentence.includes('**Question:') || example.sentence.includes('**Band');
                    const hasVocabFormat = example.sentence.includes('VOCABULARY:') || example.explanation?.includes('VOCABULARY:');

                    let errorPart = '';
                    let correctPart = '';

                    if (hasErrorFormat) {
                      const parts = example.sentence.split('→');
                      errorPart = parts[0]?.replace('Error:', '').trim() || '';
                      correctPart = parts[1]?.replace('Correct:', '').trim() || '';
                    }

                    return (
                      <div key={index} className="border border-border rounded-xl overflow-hidden bg-card">
                        {/* Example Header */}
                        <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
                              Example {index + 1}
                            </span>
                            <SpeakButton text={example.sentence.replace(/\*\*/g, '')} size="sm" />
                          </div>
                        </div>

                        {/* Example Content */}
                        <div className="p-4 space-y-4">
                          {hasErrorFormat ? (
                            // Error/Correct format
                            <div className="grid gap-3 md:grid-cols-2">
                              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <XCircle className="h-4 w-4 text-red-500" />
                                  <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase">Incorrect</span>
                                </div>
                                <p className="text-red-700 dark:text-red-300 line-through">{errorPart}</p>
                              </div>
                              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase">Correct</span>
                                </div>
                                <p className="text-green-700 dark:text-green-300 font-medium">{correctPart}</p>
                              </div>
                            </div>
                          ) : hasQuestionFormat ? (
                            // Question/Band format (Speaking examples)
                            parseExampleContent(example.sentence)
                          ) : (
                            // Regular sentence
                            <div className="bg-muted/30 rounded-lg p-4">
                              <p className="text-foreground leading-relaxed">{parseMarkdownText(example.sentence)}</p>
                            </div>
                          )}

                          {/* Explanation */}
                          {example.explanation && (
                            hasVocabFormat || example.explanation.includes('**') ? (
                              parseVocabularySection(example.explanation)
                            ) : (
                              <div className="border-l-4 border-accent pl-4 py-2">
                                <div className="flex items-center gap-2 mb-1">
                                  <Lightbulb className="h-4 w-4 text-accent" />
                                  <span className="text-xs font-semibold text-accent uppercase">Explanation</span>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">{parseMarkdownText(example.explanation)}</p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            }

            <Accordion
              type="single"
              collapsible
              defaultValue={isDeepVocabularyLesson ? undefined : 'extra-practice'}
              className="mb-6"
            >
              <AccordionItem value="extra-practice" id={isDeepVocabularyLesson ? 'review' : undefined} className="scroll-mt-28 rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
                <AccordionTrigger className="py-4 text-left hover:no-underline">
                  <div>
                    <p className="text-base font-semibold text-slate-900">
                      {isDeepVocabularyLesson ? 'Extra practice library' : 'Lesson resources'}
                    </p>
                    <p className="mt-1 text-sm font-normal text-slate-500">
                      {isDeepVocabularyLesson
                        ? 'Open this after the guided Learn, Check, and Apply steps.'
                        : 'Review mistakes, collocations, phrases, and recap.'}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <Card className="mb-6 border-red-200" id="common-mistakes">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <XCircle className="h-5 w-5" />
                  Common Mistakes ({content.commonMistakes.length})
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Tap each card to reveal the correction</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                  {content.commonMistakes.map((mistake, index) => (
                    <MistakeFlipCard
                      key={index}
                      mistake={mistake.mistake}
                      correction={mistake.correction}
                      explanation={mistake.explanation}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {lesson.type === 'vocabulary' && content.collocations && (
              <Card className="mb-6" id="collocations">
                <CardHeader>
                  <CardTitle>Collocations</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Click to copy</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {content.collocations.map((collocation, index) => (
                      <CopyableBadge key={index} text={collocation} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {lesson.type === 'vocabulary' && content.synonyms && (
              <Card className="mb-6" id="synonyms">
                <CardHeader>
                  <CardTitle>Synonyms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {content.synonyms.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Badge variant="outline" className="font-semibold">{item.word}</Badge>
                        <span className="text-muted-foreground">=</span>
                        <span className="text-foreground">{item.synonyms.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {lesson.type === 'vocabulary' && content.speakingLines && (
              <Card className="mb-6 border-green-500/30 bg-green-500/5" id="speaking-phrases">
                <CardHeader>
                  <CardTitle className="text-foreground">Speaking Phrases</CardTitle>
                  <p className="text-sm text-green-600 mt-1">Click speaker to listen, click text to copy</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {content.speakingLines.map((line, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <SpeakButton text={line} size="sm" className="flex-shrink-0 mt-0.5" />
                        <CopyableBadge text={line} className="bg-green-500/10 hover:bg-green-500/20 text-green-700 text-left whitespace-normal" />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {lesson.type === 'grammar' && content.sentenceUpgrade && (
              <Card className="mb-6 border-green-500/30 bg-green-500/5" id="sentence-upgrades">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-500" />
                    Sentence Upgrades
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">See how error-filled sentences become Band 8+ quality</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {content.sentenceUpgrade.map((upgrade, index) => {
                      // Clean up "Error-filled:" prefix
                      const basicText = upgrade.basic.replace(/^Error-filled:\s*/i, '').replace(/^Basic:\s*/i, '');

                      return (
                        <div key={index} className="relative">
                          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-300 to-green-400" />
                          <div className="space-y-3 pl-8">
                            <div className="flex items-start gap-2">
                              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="text-xs font-medium text-red-600 uppercase tracking-wide">Before</span>
                                <p className="text-red-700 line-through decoration-red-300">{basicText}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="text-xs font-medium text-green-600 uppercase tracking-wide">After (Band 8+)</span>
                                <p className="text-green-700 font-medium">{upgrade.upgraded}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            <InteractivePractice
              questions={content.miniPractice.map((q, index) => ({
                ...q,
                correctAnswer: content.answerKey[index] || ''
              }))}
              title={`Mini Practice (${content.miniPractice.length} questions)`}
            />

            <Card className="mb-6 bg-accent/5 border-accent/30" id="quick-recap">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Recap</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{content.quickRecap}</p>
              </CardContent>
            </Card>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {user && canAccessContent && (
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
                  onClick={handleProgressToggle}
                  className={isCompleted ? 'border-green-500 text-green-700 hover:bg-green-100' : ''}
                >
                  {isCompleted ? (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      Mark Incomplete
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mark Complete
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          )}

          <div className="flex justify-between items-center mt-8">
            <Link to={`/${lesson.type}`}>
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Library
              </Button>
            </Link>

            {!canAccessContent && (
              <Link to="/pricing">
                <Button>
                  <Star className="h-4 w-4 mr-2" />
                  Upgrade to Premium
                </Button>
              </Link>
            )}
          </div>
        </div>

        {isDeepVocabularyLesson && (
          <aside className="hidden py-8 xl:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">Step 1 - Learn</p>
                <h3 className="mt-2 font-bold text-slate-950">Understand each word</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Explore meanings, patterns, examples and common mistakes.</p>
                <Button size="sm" className="mt-4 bg-blue-600 hover:bg-blue-700" onClick={() => document.getElementById('core-explanation')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                  Go to Learn <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="rounded-2xl border border-violet-100 bg-violet-50/70 p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-violet-700">Step 2 - Check</p>
                <h3 className="mt-2 font-bold text-slate-950">Test yourself</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Answer quick questions and learn why each choice works.</p>
                <Button size="sm" className="mt-4 bg-violet-600 hover:bg-violet-700" onClick={() => document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                  Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">Step 3 - Apply</p>
                <h3 className="mt-2 font-bold text-slate-950">Use in IELTS Writing</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Write 2-3 sentences and compare with a Band 8 model.</p>
                <Button size="sm" className="mt-4 bg-emerald-600 hover:bg-emerald-700" onClick={() => document.getElementById('mini-practice')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                  Start Writing <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
