import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, BookOpen, GraduationCap, Star, Bookmark, BookmarkCheck, 
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
import { useLessons } from '@/contexts/LessonContext';
import { useAuth } from '@/contexts/AuthContext';

export function LessonPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getLessonBySlug, addBookmark, removeBookmark, isBookmarked, incrementViewCount, lessons, getLessonProgress, setLessonProgress } = useLessons();
  const { user, isPremium } = useAuth();
  const [lesson, setLesson] = useState(getLessonBySlug(slug || ''));
  
  const lessonProgress = lesson ? getLessonProgress(lesson.id) : 'not_started';
  const isCompleted = lessonProgress === 'completed';

  useEffect(() => {
    const foundLesson = getLessonBySlug(slug || '');
    setLesson(foundLesson);
    if (foundLesson) {
      incrementViewCount(foundLesson.id);
    }
  }, [slug, lessons]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson not found</h2>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const canAccessContent = !lesson.is_premium || isPremium;
  const content = lesson.content;

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

  return (
    <div className="min-h-screen bg-gray-50">
      <ReadingProgressBar estimatedMinutes={5} />
      <div className={`py-8 ${lesson.type === 'vocabulary' ? 'bg-indigo-600' : 'bg-purple-600'} text-white mt-1`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to={`/${lesson.type}`} 
            className="inline-flex items-center text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {lesson.type} library
          </Link>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                {lesson.type === 'vocabulary' ? (
                  <BookOpen className="h-6 w-6" />
                ) : (
                  <GraduationCap className="h-6 w-6" />
                )}
                <Badge variant="secondary" className="capitalize">
                  {lesson.type}
                </Badge>
                <Badge variant="outline" className="capitalize bg-white/10 border-white/30">
                  {lesson.level}
                </Badge>
                {lesson.is_premium && (
                  <Badge className="bg-amber-500">
                    <Star className="h-3 w-3 mr-1" /> Premium
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
              <p className="text-white/80">{lesson.description}</p>
            </div>
            
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
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <TableOfContents
              items={[
                { id: 'what-you-will-learn', title: 'What You Will Learn', icon: <Lightbulb className="h-4 w-4" /> },
                { id: 'core-explanation', title: 'Core Explanation', icon: <FileText className="h-4 w-4" /> },
                ...(lesson.type === 'grammar' && (content.grammarForm || content.grammarFormItems?.length) ? [{ id: 'grammar-form', title: 'Grammar Form', icon: <BookMarked className="h-4 w-4" /> }] : []),
                ...(lesson.type === 'grammar' && content.grammarUse ? [{ id: 'grammar-use', title: 'When to Use', icon: <Zap className="h-4 w-4" /> }] : []),
                { id: 'examples', title: `Examples (${content.examples.length})`, icon: <CheckCircle className="h-4 w-4" /> },
                { id: 'common-mistakes', title: `Common Mistakes (${content.commonMistakes.length})`, icon: <XCircle className="h-4 w-4" /> },
                ...(lesson.type === 'vocabulary' && content.collocations ? [{ id: 'collocations', title: 'Collocations', icon: <MessageSquare className="h-4 w-4" /> }] : []),
                ...(lesson.type === 'vocabulary' && content.synonyms ? [{ id: 'synonyms', title: 'Synonyms' }] : []),
                ...(lesson.type === 'vocabulary' && content.speakingLines ? [{ id: 'speaking-phrases', title: 'Speaking Phrases' }] : []),
                ...(lesson.type === 'grammar' && content.sentenceUpgrade ? [{ id: 'sentence-upgrades', title: 'Sentence Upgrades' }] : []),
                { id: 'mini-practice', title: `Mini Practice (${content.miniPractice.length})`, icon: <AlertTriangle className="h-4 w-4" /> },
                { id: 'quick-recap', title: 'Quick Recap' },
              ]}
            />
          </div>
        </div>

        <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:hidden mb-4 sticky top-16 z-40 bg-gray-50 py-2">
            <MobileTableOfContents
              items={[
                { id: 'what-you-will-learn', title: 'What You Will Learn' },
                { id: 'core-explanation', title: 'Core Explanation' },
                ...(lesson.type === 'grammar' && (content.grammarForm || content.grammarFormItems?.length) ? [{ id: 'grammar-form', title: 'Grammar Form' }] : []),
                ...(lesson.type === 'grammar' && content.grammarUse ? [{ id: 'grammar-use', title: 'When to Use' }] : []),
                { id: 'examples', title: `Examples (${content.examples.length})` },
                { id: 'common-mistakes', title: `Common Mistakes (${content.commonMistakes.length})` },
                ...(lesson.type === 'vocabulary' && content.collocations ? [{ id: 'collocations', title: 'Collocations' }] : []),
                ...(lesson.type === 'vocabulary' && content.synonyms ? [{ id: 'synonyms', title: 'Synonyms' }] : []),
                ...(lesson.type === 'vocabulary' && content.speakingLines ? [{ id: 'speaking-phrases', title: 'Speaking Phrases' }] : []),
                ...(lesson.type === 'grammar' && content.sentenceUpgrade ? [{ id: 'sentence-upgrades', title: 'Sentence Upgrades' }] : []),
                { id: 'mini-practice', title: `Mini Practice (${content.miniPractice.length})` },
                { id: 'quick-recap', title: 'Quick Recap' },
              ]}
            />
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

          <Card className="mb-6" id="what-you-will-learn">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                What You Will Learn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">Target Level: <strong>{content.targetLevel}</strong></p>
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

          <div className={!canAccessContent ? 'blur-sm pointer-events-none select-none' : ''}>
            <Card className="mb-6" id="core-explanation">
              <CardHeader>
                <CardTitle>Core Explanation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-indigo max-w-none">
                  {content.coreExplanation.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

                        {lesson.type === 'grammar' && content.grammarFormItems && content.grammarFormItems.length > 0 ? (
                          <Card className="mb-6 border-indigo-200 bg-indigo-50" id="grammar-form">
                            <CardHeader>
                              <CardTitle className="text-indigo-900">Grammar Form</CardTitle>
                              <p className="text-sm text-indigo-600 mt-1">Click each item to see details and examples</p>
                            </CardHeader>
                            <CardContent>
                              <Accordion type="single" collapsible className="w-full space-y-2">
                                {content.grammarFormItems.map((item, index) => (
                                  <AccordionItem 
                                    key={index} 
                                    value={`grammar-form-${index}`}
                                    className="border border-indigo-200 rounded-lg bg-white overflow-hidden"
                                  >
                                    <AccordionTrigger className="px-4 py-3 hover:bg-indigo-50 hover:no-underline">
                                      <div className="flex items-center gap-3 text-left">
                                        <span className="font-semibold text-indigo-900">{item.name}</span>
                                        <div className="flex gap-1">
                                          {item.tags.map((tag, tagIndex) => (
                                            <Badge key={tagIndex} variant="secondary" className="bg-indigo-100 text-indigo-700 text-xs">
                                              {tag}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4">
                                      <div className="space-y-4">
                                        <div>
                                          <p className="text-sm font-medium text-gray-500 mb-1">Definition</p>
                                          <p className="text-gray-700">{item.definition}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                          <p className="text-sm font-medium text-gray-500">Comparison</p>
                                          <div className="flex items-start gap-2">
                                            <XCircle className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                            <p className="text-gray-500">{item.comparison.standard}</p>
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
                          <Card className="mb-6 border-indigo-200 bg-indigo-50" id="grammar-form">
                            <CardHeader>
                              <CardTitle className="text-indigo-900">Grammar Form</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <pre className="whitespace-pre-wrap text-indigo-800 font-mono text-sm">
                                {content.grammarForm}
                              </pre>
                            </CardContent>
                          </Card>
                        )}

            {lesson.type === 'grammar' && content.grammarUse && (
              <Card className="mb-6 border-purple-200 bg-purple-50" id="grammar-use">
                <CardHeader>
                  <CardTitle className="text-purple-900">When to Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-purple-800 font-mono text-sm">
                    {content.grammarUse}
                  </pre>
                </CardContent>
              </Card>
            )}

            <Card className="mb-6" id="examples">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Examples ({content.examples.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue="examples-0">
                  {content.examples.map((example, index) => (
                    <AccordionItem key={index} value={`examples-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2 pr-4">
                          <SpeakButton text={example.sentence} size="sm" />
                          <span className="font-medium text-gray-900">"{example.sentence}"</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="border-l-4 border-indigo-500 pl-4 py-2">
                          <p className="text-gray-600">{example.explanation}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className="mb-6 border-red-200" id="common-mistakes">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <XCircle className="h-5 w-5" />
                  Common Mistakes ({content.commonMistakes.length})
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">Tap each card to reveal the correction</p>
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
                  <p className="text-sm text-gray-500 mt-1">Click to copy</p>
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
                        <span className="text-gray-400">=</span>
                        <span className="text-gray-700">{item.synonyms.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {lesson.type === 'vocabulary' && content.speakingLines && (
              <Card className="mb-6 border-green-200 bg-green-50" id="speaking-phrases">
                <CardHeader>
                  <CardTitle className="text-green-900">Speaking Phrases</CardTitle>
                  <p className="text-sm text-green-700 mt-1">Click speaker to listen, click text to copy</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {content.speakingLines.map((line, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <SpeakButton text={line} size="sm" className="flex-shrink-0 mt-0.5" />
                        <CopyableBadge text={line} className="bg-green-100 hover:bg-green-200 text-green-800 text-left whitespace-normal" />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {lesson.type === 'grammar' && content.sentenceUpgrade && (
              <Card className="mb-6 border-green-200 bg-green-50" id="sentence-upgrades">
                <CardHeader>
                  <CardTitle className="text-green-900">Sentence Upgrades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {content.sentenceUpgrade.map((upgrade, index) => (
                      <div key={index}>
                        <p className="text-gray-600 mb-1">
                          <span className="font-medium">Basic:</span> {upgrade.basic}
                        </p>
                        <p className="text-green-800">
                          <span className="font-medium">Upgraded:</span> {upgrade.upgraded}
                        </p>
                      </div>
                    ))}
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

            <Card className="mb-6 bg-indigo-50 border-indigo-200" id="quick-recap">
              <CardHeader>
                <CardTitle className="text-indigo-900">Quick Recap</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-indigo-800">{content.quickRecap}</p>
              </CardContent>
            </Card>
          </div>

          {user && canAccessContent && (
          <Card className={`mb-6 ${isCompleted ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  ) : (
                    <Circle className="h-8 w-8 text-gray-300" />
                  )}
                  <div>
                    <p className={`font-medium ${isCompleted ? 'text-green-700' : 'text-gray-700'}`}>
                      {isCompleted ? 'Lesson Completed!' : 'Mark this lesson as complete'}
                    </p>
                    <p className="text-sm text-gray-500">
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
      </div>
    </div>
  );
}
