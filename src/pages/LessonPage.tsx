import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, BookOpen, GraduationCap, Star, Bookmark, BookmarkCheck, 
  CheckCircle, XCircle, AlertTriangle, Lightbulb, ChevronDown, ChevronUp,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLessons } from '@/contexts/LessonContext';
import { useAuth } from '@/contexts/AuthContext';

export function LessonPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getLessonBySlug, addBookmark, removeBookmark, isBookmarked, incrementViewCount, lessons } = useLessons();
  const { user, isPremium } = useAuth();
  const [showAnswers, setShowAnswers] = useState(false);
  const [lesson, setLesson] = useState(getLessonBySlug(slug || ''));

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`py-8 ${lesson.type === 'vocabulary' ? 'bg-indigo-600' : 'bg-purple-600'} text-white`}>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <Card className="mb-6">
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
          <Card className="mb-6">
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

          {lesson.type === 'grammar' && content.grammarForm && (
            <Card className="mb-6 border-indigo-200 bg-indigo-50">
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
            <Card className="mb-6 border-purple-200 bg-purple-50">
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

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Examples ({content.examples.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {content.examples.map((example, index) => (
                  <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                    <p className="font-medium text-gray-900 mb-1">"{example.sentence}"</p>
                    <p className="text-gray-600 text-sm">{example.explanation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <XCircle className="h-5 w-5" />
                Common Mistakes ({content.commonMistakes.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {content.commonMistakes.map((mistake, index) => (
                  <div key={index} className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-red-700 line-through">{mistake.mistake}</p>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-green-700 font-medium">{mistake.correction}</p>
                    </div>
                    <p className="text-gray-600 text-sm ml-7">{mistake.explanation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {lesson.type === 'vocabulary' && content.collocations && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Collocations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {content.collocations.map((collocation, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {collocation}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {lesson.type === 'vocabulary' && content.synonyms && (
            <Card className="mb-6">
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
            <Card className="mb-6 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">Speaking Phrases</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {content.speakingLines.map((line, index) => (
                    <li key={index} className="text-green-800 italic">"{line}"</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {lesson.type === 'grammar' && content.sentenceUpgrade && (
            <Card className="mb-6 border-green-200 bg-green-50">
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

          <Card className="mb-6 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700">
                <AlertTriangle className="h-5 w-5" />
                Mini Practice ({content.miniPractice.length} questions)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {content.miniPractice.map((question, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <p className="font-medium mb-2">
                      {index + 1}. {question.question}
                    </p>
                    {question.options && (
                      <div className="ml-4 space-y-1">
                        {question.options.map((option, optIndex) => (
                          <p key={optIndex} className="text-gray-600">
                            {String.fromCharCode(65 + optIndex)}) {option}
                          </p>
                        ))}
                      </div>
                    )}
                    {question.type === 'fill-blank' && (
                      <p className="text-gray-500 text-sm ml-4">(Fill in the blank)</p>
                    )}
                    {question.type === 'rewrite' && (
                      <p className="text-gray-500 text-sm ml-4">(Rewrite the sentence)</p>
                    )}
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <Button
                variant="outline"
                onClick={() => setShowAnswers(!showAnswers)}
                className="w-full"
              >
                {showAnswers ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Hide Answers
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Show Answers
                  </>
                )}
              </Button>

              {showAnswers && (
                <div className="mt-4 bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Answer Key</h4>
                  <ol className="list-decimal list-inside space-y-1">
                    {content.answerKey.map((answer, index) => (
                      <li key={index} className="text-green-800">{answer}</li>
                    ))}
                  </ol>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mb-6 bg-indigo-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="text-indigo-900">Quick Recap</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-indigo-800">{content.quickRecap}</p>
            </CardContent>
          </Card>
        </div>

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
  );
}
