import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Quiz } from '@/data/quizData';

interface QuizResult {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface QuizResultsProps {
  quiz: Quiz;
  results: QuizResult[];
  onRestart: () => void;
}

function getScorePercentage(results: QuizResult[]): number {
  if (results.length === 0) return 0;
  const correct = results.filter((r) => r.isCorrect).length;
  return Math.round((correct / results.length) * 100);
}

function getScoreMessage(percentage: number): { message: string; color: string } {
  if (percentage >= 90) return { message: 'Excellent! Band 9 level!', color: 'text-emerald-200' };
  if (percentage >= 70) return { message: 'Great job! Band 7-8 level!', color: 'text-blue-200' };
  if (percentage >= 50) return { message: 'Good effort! Keep practicing!', color: 'text-amber-200' };
  return { message: "Keep studying! You'll improve!", color: 'text-orange-200' };
}

/**
 * Quiz completion / results screen. Navy → blue → indigo gradient trophy
 * header matching the browse hero and the grammar workspace, emerald/rose
 * review list instead of green-50/red-50.
 */
export function QuizResults({ quiz, results, onRestart }: QuizResultsProps) {
  const percentage = getScorePercentage(results);
  const scoreMessage = getScoreMessage(percentage);
  const correctCount = results.filter((r) => r.isCorrect).length;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <Card className="overflow-hidden border-blue-100 shadow-sm">
          <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-8 text-center text-background">
            <Trophy className="mx-auto mb-4 h-16 w-16 text-amber-300" />
            <h2 className="mb-2 text-3xl font-bold">Quiz Complete!</h2>
            <p className={`text-xl ${scoreMessage.color}`}>{scoreMessage.message}</p>
          </div>

          <CardContent className="p-8">
            <div className="mb-8 text-center">
              <div className="mb-2 text-6xl font-bold text-blue-600">{percentage}%</div>
              <p className="text-slate-600">
                {correctCount} out of {results.length} correct
              </p>
            </div>

            <div className="mb-8 space-y-4">
              <h3 className="text-lg font-semibold text-slate-950">Review Your Answers:</h3>
              {results.map((result, index) => {
                const question = quiz.questions.find((q) => q.id === result.questionId);
                return (
                  <div
                    key={result.questionId}
                    className={`rounded-lg border p-4 ${
                      result.isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {result.isCorrect ? (
                        <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-600" />
                      ) : (
                        <XCircle className="mt-0.5 h-5 w-5 text-rose-600" />
                      )}
                      <div className="flex-1">
                        <p className="mb-1 font-medium text-slate-950">
                          Q{index + 1}: {question?.sentence}
                        </p>
                        <p className="text-sm">
                          Your answer:{' '}
                          <span className={result.isCorrect ? 'text-emerald-600' : 'text-rose-600'}>
                            {result.userAnswer || '(no answer)'}
                          </span>
                        </p>
                        {!result.isCorrect && (
                          <p className="text-sm text-emerald-600">Correct answer: {result.correctAnswer}</p>
                        )}
                        {question?.explanation && (
                          <p className="mt-2 text-sm italic text-slate-600">{question.explanation}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4">
              <Button onClick={onRestart} variant="outline" className="flex-1">
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Link to="/quiz" className="flex-1">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  More Quizzes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
