import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trophy, 
  ArrowRight, 
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  BookOpen,
  Target,
  Zap,
  Lock
} from 'lucide-react';
import { ALL_QUIZZES, getQuizById, Quiz } from '@/data/quizData';
import { useAuth } from '@/contexts/AuthContext';

interface QuizResult {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const { isPremium } = useAuth();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [results, setResults] = useState<QuizResult[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (quizId) {
      const foundQuiz = getQuizById(quizId);
      if (foundQuiz) {
        setQuiz(foundQuiz);
        setTimeLeft(foundQuiz.timeLimit);
      }
    }
  }, [quizId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleQuizComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted, timeLeft]);

  const handleQuizComplete = useCallback(() => {
    setQuizCompleted(true);
    setQuizStarted(false);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const checkAnswer = () => {
    if (!quiz) return;
    
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = currentQuestion.answer.toLowerCase();
    
    const correct = normalizedUserAnswer === normalizedCorrectAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    setResults(prev => [...prev, {
      questionId: currentQuestion.id,
      userAnswer: userAnswer.trim(),
      correctAnswer: currentQuestion.answer,
      isCorrect: correct
    }]);
  };

  const nextQuestion = () => {
    if (!quiz) return;
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setShowFeedback(false);
      setShowHint(false);
    } else {
      handleQuizComplete();
    }
  };

  const startQuiz = () => {
    if (!quiz) return;
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setResults([]);
    setUserAnswer('');
    setShowFeedback(false);
    setQuizCompleted(false);
    setTimeLeft(quiz.timeLimit);
  };

  const restartQuiz = () => {
    if (!quiz) return;
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setResults([]);
    setUserAnswer('');
    setShowFeedback(false);
    setQuizCompleted(false);
    setTimeLeft(quiz.timeLimit);
  };

  const getScorePercentage = () => {
    if (results.length === 0) return 0;
    const correct = results.filter(r => r.isCorrect).length;
    return Math.round((correct / results.length) * 100);
  };

  const getScoreMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return { message: 'Excellent! Band 9 level!', color: 'text-green-600' };
    if (percentage >= 70) return { message: 'Great job! Band 7-8 level!', color: 'text-blue-600' };
    if (percentage >= 50) return { message: 'Good effort! Keep practicing!', color: 'text-yellow-600' };
    return { message: 'Keep studying! You\'ll improve!', color: 'text-orange-600' };
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'vocabulary': return 'bg-indigo-100 text-indigo-700';
      case 'grammar': return 'bg-purple-100 text-purple-700';
      case 'writing': return 'bg-emerald-100 text-emerald-700';
      case 'speaking': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

    const filteredQuizzes = selectedCategory === 'all' 
      ? ALL_QUIZZES 
      : ALL_QUIZZES.filter(q => q.category === selectedCategory);

  if (!quizId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-8 w-8" />
              <h1 className="text-3xl font-bold">Interactive Quiz</h1>
            </div>
            <p className="text-violet-100 max-w-2xl">
              Test your IELTS knowledge with interactive fill-in-the-blank quizzes. 
              Get instant feedback, track your score, and improve your Band score!
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="rounded-full"
            >
              All Quizzes
            </Button>
            <Button
              variant={selectedCategory === 'vocabulary' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('vocabulary')}
              className="rounded-full"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Vocabulary
            </Button>
            <Button
              variant={selectedCategory === 'grammar' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('grammar')}
              className="rounded-full"
            >
              <Zap className="h-4 w-4 mr-2" />
              Grammar
            </Button>
            <Button
              variant={selectedCategory === 'writing' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('writing')}
              className="rounded-full"
            >
              Writing
            </Button>
            <Button
              variant={selectedCategory === 'speaking' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('speaking')}
              className="rounded-full"
            >
              Speaking
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map(q => (
              <Card key={q.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(q.category)}>
                      {q.category}
                    </Badge>
                    <Badge className={getDifficultyColor(q.difficulty)}>
                      {q.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{q.title}</CardTitle>
                  <CardDescription>{q.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {q.questions.length} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {Math.floor(q.timeLimit / 60)} min
                    </span>
                  </div>
                  {q.is_premium && !isPremium ? (
                    <Link to="/pricing">
                      <Button className="w-full" variant="outline">
                        <Lock className="h-4 w-4 mr-2" />
                        Premium Quiz
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`/quiz/${q.id}`}>
                      <Button className="w-full bg-violet-600 hover:bg-violet-700">
                        Start Quiz
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Quiz not found</h2>
          <Link to="/quiz">
            <Button>Back to Quizzes</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (quiz.is_premium && !isPremium) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-50 to-white">
        <Card className="p-8 text-center max-w-md">
          <Lock className="h-16 w-16 mx-auto text-violet-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Premium Quiz</h2>
          <p className="text-gray-600 mb-6">
            This quiz is available for premium members only. Upgrade to access all quizzes and features!
          </p>
          <div className="space-y-3">
            <Link to="/pricing">
              <Button className="w-full bg-violet-600 hover:bg-violet-700">
                Upgrade to Premium
              </Button>
            </Link>
            <Link to="/quiz">
              <Button variant="outline" className="w-full">
                Back to Quizzes
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (quizCompleted) {
    const scoreMessage = getScoreMessage();
    const correctCount = results.filter(r => r.isCorrect).length;
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-8 text-center">
              <Trophy className="h-16 w-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
              <p className={`text-xl ${scoreMessage.color.replace('text-', 'text-white/')}`}>
                {scoreMessage.message}
              </p>
            </div>
            
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-violet-600 mb-2">
                  {getScorePercentage()}%
                </div>
                <p className="text-gray-600">
                  {correctCount} out of {results.length} correct
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-lg">Review Your Answers:</h3>
                {results.map((result, index) => {
                  const question = quiz.questions.find(q => q.id === result.questionId);
                  return (
                    <div 
                      key={result.questionId}
                      className={`p-4 rounded-lg border ${
                        result.isCorrect 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {result.isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-1">Q{index + 1}: {question?.sentence}</p>
                          <p className="text-sm">
                            Your answer: <span className={result.isCorrect ? 'text-green-600' : 'text-red-600'}>
                              {result.userAnswer || '(no answer)'}
                            </span>
                          </p>
                          {!result.isCorrect && (
                            <p className="text-sm text-green-600">
                              Correct answer: {result.correctAnswer}
                            </p>
                          )}
                          {question?.explanation && (
                            <p className="text-sm text-gray-600 mt-2 italic">
                              {question.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={restartQuiz}
                  variant="outline"
                  className="flex-1"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Link to="/quiz" className="flex-1">
                  <Button className="w-full bg-violet-600 hover:bg-violet-700">
                    More Quizzes
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center gap-2 mb-4">
                <Badge className={getCategoryColor(quiz.category)}>
                  {quiz.category}
                </Badge>
                <Badge className={getDifficultyColor(quiz.difficulty)}>
                  {quiz.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{quiz.title}</CardTitle>
              <CardDescription className="text-base">{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-violet-50 rounded-lg">
                  <Target className="h-8 w-8 mx-auto text-violet-600 mb-2" />
                  <p className="font-semibold text-lg">{quiz.questions.length}</p>
                  <p className="text-sm text-gray-600">Questions</p>
                </div>
                <div className="p-4 bg-violet-50 rounded-lg">
                  <Clock className="h-8 w-8 mx-auto text-violet-600 mb-2" />
                  <p className="font-semibold text-lg">{Math.floor(quiz.timeLimit / 60)} min</p>
                  <p className="text-sm text-gray-600">Time Limit</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Instructions:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Fill in the blank with the correct word</li>
                  <li>• Answers are case-insensitive</li>
                  <li>• Use the hint button if you need help</li>
                  <li>• Complete before the timer runs out</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Link to="/quiz" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <Button 
                  onClick={startQuiz}
                  className="flex-1 bg-violet-600 hover:bg-violet-700"
                >
                  Start Quiz
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Badge className={getCategoryColor(quiz.category)}>
              {quiz.category}
            </Badge>
            <span className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            timeLeft < 60 ? 'bg-red-100 text-red-700' : 'bg-violet-100 text-violet-700'
          }`}>
            <Clock className="h-4 w-4" />
            <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <Progress value={progress} className="mb-6 h-2" />

        <Card>
          <CardContent className="p-8">
            <div className="mb-8">
              <p className="text-lg leading-relaxed">
                {currentQuestion.sentence.split(currentQuestion.blank).map((part, index, array) => (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <span className="inline-block min-w-[120px] border-b-2 border-violet-400 mx-1 text-center">
                        {showFeedback ? (
                          <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                            {userAnswer || '___'}
                          </span>
                        ) : (
                          <span className="text-gray-400">___</span>
                        )}
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>

            {!showFeedback ? (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer..."
                    className="text-lg"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && userAnswer.trim()) {
                        checkAnswer();
                      }
                    }}
                    autoFocus
                  />
                  <Button
                    onClick={() => setShowHint(!showHint)}
                    variant="outline"
                    className="shrink-0"
                  >
                    <Lightbulb className="h-4 w-4" />
                  </Button>
                </div>

                {showHint && currentQuestion.hint && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                    <span className="font-semibold">Hint:</span> {currentQuestion.hint}
                  </div>
                )}

                <Button
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                  className="w-full bg-violet-600 hover:bg-violet-700"
                >
                  Check Answer
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <span className="font-semibold text-green-700">Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-6 w-6 text-red-600" />
                        <span className="font-semibold text-red-700">Incorrect</span>
                      </>
                    )}
                  </div>
                  {!isCorrect && (
                    <p className="text-sm mb-2">
                      The correct answer is: <span className="font-semibold text-green-600">{currentQuestion.answer}</span>
                    </p>
                  )}
                  {currentQuestion.explanation && (
                    <p className="text-sm text-gray-600 italic">
                      {currentQuestion.explanation}
                    </p>
                  )}
                </div>

                <Button
                  onClick={nextQuestion}
                  className="w-full bg-violet-600 hover:bg-violet-700"
                >
                  {currentQuestionIndex < quiz.questions.length - 1 ? (
                    <>
                      Next Question
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    <>
                      See Results
                      <Trophy className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-center gap-2">
          {quiz.questions.map((_, index) => {
            const result = results.find((_, i) => i === index);
            return (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentQuestionIndex
                    ? 'bg-violet-600'
                    : result
                    ? result.isCorrect
                      ? 'bg-green-500'
                      : 'bg-red-500'
                    : 'bg-gray-300'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
