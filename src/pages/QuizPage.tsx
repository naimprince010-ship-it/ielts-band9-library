import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Lock, Zap } from 'lucide-react';
import { ALL_QUIZZES, getQuizById, Quiz } from '@/data/quizData';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress, WrongQuestion } from '@/contexts/ProgressContext';
import { useQuizKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useConfetti } from '@/hooks/useConfetti';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { checkAnswerWithSynonyms } from '@/utils/scoring';
import { QuizBrowseHero } from '@/components/quiz/QuizBrowseHero';
import { QuizWrongReviewBanner } from '@/components/quiz/QuizWrongReviewBanner';
import { QuizCard } from '@/components/quiz/QuizCard';
import { QuizSessionIntro } from '@/components/quiz/QuizSessionIntro';
import { QuizSession } from '@/components/quiz/QuizSession';
import { QuizResults } from '@/components/quiz/QuizResults';

interface QuizResult {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const { isPremium } = useAuth();
  const { addQuizAttempt, getAllWrongQuestions, streakData, getTodayProgress } = useProgress();
  const { fireStars } = useConfetti();
  const { playCorrect, playIncorrect, playComplete } = useSoundEffects();

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

  useQuizKeyboardShortcuts({
    onSubmit: () => {
      if (userAnswer.trim() && !showFeedback) {
        checkAnswer();
      }
    },
    onNext: () => {
      if (showFeedback) {
        nextQuestion();
      }
    },
    onHint: () => {
      if (!showFeedback) {
        setShowHint((prev) => !prev);
      }
    },
    enabled: quizStarted && !quizCompleted,
  });

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
        setTimeLeft((prev) => {
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

    fireStars();
    playComplete();

    if (quiz && results.length > 0) {
      const wrongQuestions: WrongQuestion[] = results
        .filter((r) => !r.isCorrect)
        .map((r) => {
          const question = quiz.questions.find((q) => q.id === r.questionId);
          return {
            questionId: r.questionId,
            question: question?.sentence || '',
            userAnswer: r.userAnswer,
            correctAnswer: r.correctAnswer,
            hint: question?.hint,
          };
        });

      addQuizAttempt({
        quizId: quiz.id,
        score: results.filter((r) => r.isCorrect).length,
        total: results.length,
        wrongQuestions,
      });
    }
  }, [quiz, results, addQuizAttempt, fireStars, playComplete]);

  const checkAnswer = async () => {
    if (!quiz) return;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = currentQuestion.answer.toLowerCase();

    // First, do a quick direct comparison
    let correct = normalizedUserAnswer === normalizedCorrectAnswer;

    // If not a direct match, try synonym lookup from vocabulary database
    if (!correct && normalizedUserAnswer) {
      try {
        const synonymResult = await checkAnswerWithSynonyms(normalizedUserAnswer, normalizedCorrectAnswer);
        correct = synonymResult.isMatch;
      } catch (error) {
        console.error('Synonym check failed:', error);
        // Keep correct as false if synonym check fails
      }
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      playCorrect();
    } else {
      playIncorrect();
    }

    setResults((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        userAnswer: userAnswer.trim(),
        correctAnswer: currentQuestion.answer,
        isCorrect: correct,
      },
    ]);
  };

  const nextQuestion = () => {
    if (!quiz) return;

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
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

  const filteredQuizzes = selectedCategory === 'all' ? ALL_QUIZZES : ALL_QUIZZES.filter((q) => q.category === selectedCategory);

  const wrongQuestionsList = getAllWrongQuestions();
  const todayProgress = getTodayProgress();

  const startReviewMode = () => {
    setCurrentQuestionIndex(0);
    setResults([]);
    setUserAnswer('');
    setShowFeedback(false);
    setQuizCompleted(false);
    setQuizStarted(true);
    setTimeLeft(300);
  };

  if (!quizId) {
    return (
      <div className="min-h-screen bg-slate-50">
        <QuizBrowseHero
          currentStreak={streakData.currentStreak}
          todayQuestions={todayProgress.questions}
          todayGoal={todayProgress.goal}
        />

        <div className="container mx-auto px-4 py-8">
          {wrongQuestionsList.length > 0 && (
            <QuizWrongReviewBanner count={wrongQuestionsList.length} onStartReview={startReviewMode} />
          )}

          <div className="mb-8 flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'rounded-full bg-blue-600 hover:bg-blue-700' : 'rounded-full'}
            >
              All Quizzes
            </Button>
            <Button
              variant={selectedCategory === 'vocabulary' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('vocabulary')}
              className={selectedCategory === 'vocabulary' ? 'rounded-full bg-blue-600 hover:bg-blue-700' : 'rounded-full'}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Vocabulary
            </Button>
            <Button
              variant={selectedCategory === 'grammar' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('grammar')}
              className={selectedCategory === 'grammar' ? 'rounded-full bg-blue-600 hover:bg-blue-700' : 'rounded-full'}
            >
              <Zap className="mr-2 h-4 w-4" />
              Grammar
            </Button>
            <Button
              variant={selectedCategory === 'writing' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('writing')}
              className={selectedCategory === 'writing' ? 'rounded-full bg-blue-600 hover:bg-blue-700' : 'rounded-full'}
            >
              Writing
            </Button>
            <Button
              variant={selectedCategory === 'speaking' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('speaking')}
              className={selectedCategory === 'speaking' ? 'rounded-full bg-blue-600 hover:bg-blue-700' : 'rounded-full'}
            >
              Speaking
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredQuizzes.map((q) => (
              <QuizCard key={q.id} quiz={q} isPremiumUser={isPremium} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Card className="border-blue-100 p-8 text-center shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-950">Quiz not found</h2>
          <Link to="/quiz">
            <Button className="bg-blue-600 hover:bg-blue-700">Back to Quizzes</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (quiz.is_premium && !isPremium) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Card className="max-w-md border-amber-200 p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <Lock className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-slate-950">Premium Quiz</h2>
          <p className="mb-6 text-slate-600">
            This quiz is available for premium members only. Upgrade to access all quizzes and features!
          </p>
          <div className="space-y-3">
            <Link to="/pricing">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Upgrade to Premium</Button>
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
    return <QuizResults quiz={quiz} results={results} onRestart={restartQuiz} />;
  }

  if (!quizStarted) {
    return <QuizSessionIntro quiz={quiz} onStart={startQuiz} />;
  }

  return (
    <QuizSession
      quiz={quiz}
      currentQuestionIndex={currentQuestionIndex}
      userAnswer={userAnswer}
      onUserAnswerChange={setUserAnswer}
      showFeedback={showFeedback}
      isCorrect={isCorrect}
      showHint={showHint}
      onToggleHint={() => setShowHint(!showHint)}
      timeLeft={timeLeft}
      results={results}
      onCheckAnswer={checkAnswer}
      onNextQuestion={nextQuestion}
    />
  );
}
