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
import { PieChartCoreExplanation } from '@/components/ui/PieChartVisuals';
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
    <div className="min-h-screen bg-background">
      <ReadingProgressBar estimatedMinutes={5} />
      <div className="py-8 bg-foreground text-background mt-1">
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
          <div className="lg:hidden mb-4 sticky top-16 z-40 bg-background py-2">
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

          <div className={!canAccessContent ? 'blur-sm pointer-events-none select-none' : ''}>
            <Card className="mb-6" id="core-explanation">
              <CardHeader>
                <CardTitle>Core Explanation</CardTitle>
              </CardHeader>
              <CardContent>
                {slug === 'task1-pie-chart-description' ? (
                  <PieChartCoreExplanation />
                ) : (
                  <div className="prose max-w-none">
                    {content.coreExplanation.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-muted-foreground whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

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

            <Card className="mb-6" id="examples">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Examples ({content.examples.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue="examples-0">
                  {content.examples.map((example, index) => {
                    // Parse "Error: X → Correct: Y" format for better display
                    const hasErrorFormat = example.sentence.includes('Error:') && example.sentence.includes('Correct:');
                    let errorPart = '';
                    let correctPart = '';
                    
                    if (hasErrorFormat) {
                      const parts = example.sentence.split('→');
                      errorPart = parts[0]?.replace('Error:', '').trim() || '';
                      correctPart = parts[1]?.replace('Correct:', '').trim() || '';
                    }
                    
                    return (
                      <AccordionItem key={index} value={`examples-${index}`}>
                        <AccordionTrigger className="text-left hover:no-underline">
                          {hasErrorFormat ? (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 pr-4 w-full">
                              <div className="flex items-center gap-2 flex-1">
                                <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                                <span className="text-red-600 line-through text-sm">{errorPart}</span>
                              </div>
                              <span className="text-muted-foreground text-sm hidden sm:block">→</span>
                              <div className="flex items-center gap-2 flex-1">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span className="text-green-700 font-medium text-sm">{correctPart}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 pr-4">
                              <SpeakButton text={example.sentence} size="sm" />
                              <span className="font-medium text-foreground">"{example.sentence}"</span>
                            </div>
                          )}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="border-l-4 border-accent pl-4 py-2 bg-muted/50 rounded-r-lg">
                            <p className="text-muted-foreground">{example.explanation}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </CardContent>
            </Card>

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
      </div>
    </div>
  );
}
