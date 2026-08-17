import {
  ArrowRight, CheckCircle, Clock, Lightbulb, Trophy, XCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import type { Quiz } from '@/data/quizData';
import { getCategoryBadgeClass } from './quizStyles';

interface QuizResult {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface QuizSessionProps {
  quiz: Quiz;
  currentQuestionIndex: number;
  userAnswer: string;
  onUserAnswerChange: (value: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
  showHint: boolean;
  onToggleHint: () => void;
  timeLeft: number;
  results: QuizResult[];
  onCheckAnswer: () => void;
  onNextQuestion: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * The active question "study environment" screen — the moment a student
 * is actually concentrating. Ambient navy/indigo-tinted background, a
 * single elegant status bar (category · question count · timer), and
 * brand-colored feedback (emerald = correct, rose = incorrect, amber =
 * hint) instead of the previous generic gray/green/red/yellow palette.
 *
 * Owns zero state — every value (timer, answer, feedback) is passed down
 * from QuizPage.tsx, which keeps all the timer/keyboard-shortcut/scoring
 * logic exactly as it was before this redesign.
 */
export function QuizSession({
  quiz,
  currentQuestionIndex,
  userAnswer,
  onUserAnswerChange,
  showFeedback,
  isCorrect,
  showHint,
  onToggleHint,
  timeLeft,
  results,
  onCheckAnswer,
  onNextQuestion,
}: QuizSessionProps) {
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_0%,#eff6ff_0%,transparent_45%),radial-gradient(circle_at_85%_10%,#eef2ff_0%,transparent_40%),linear-gradient(180deg,#f8fafc_0%,#f8fafc_100%)] py-8">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="mb-6 flex items-center justify-between rounded-xl border border-blue-100 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={getCategoryBadgeClass(quiz.category)}>
              {quiz.category}
            </Badge>
            <span className="text-sm text-slate-600">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </span>
          </div>
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2 ${
              timeLeft < 60 ? 'bg-rose-100 text-rose-700' : 'bg-blue-50 text-blue-700'
            }`}
          >
            <Clock className="h-4 w-4" />
            <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <Progress value={progress} className="mb-6 h-2" />

        <Card className="border-blue-100 shadow-sm">
          <CardContent className="p-8">
            <div className="mb-8">
              <p className="text-lg leading-relaxed text-slate-950">
                {currentQuestion.sentence.split(currentQuestion.blank).map((part, index, array) => (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <span className="mx-1 inline-block min-w-[120px] border-b-2 border-blue-500 text-center">
                        {showFeedback ? (
                          <span className={isCorrect ? 'text-emerald-600' : 'text-rose-600'}>{userAnswer || '___'}</span>
                        ) : (
                          <span className="text-slate-400">___</span>
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
                    onChange={(e) => onUserAnswerChange(e.target.value)}
                    placeholder="Type your answer..."
                    className="text-lg"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && userAnswer.trim()) {
                        onCheckAnswer();
                      }
                    }}
                    autoFocus
                  />
                  <Button onClick={onToggleHint} variant="outline" className="shrink-0">
                    <Lightbulb className="h-4 w-4" />
                  </Button>
                </div>

                {showHint && currentQuestion.hint && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                    <span className="font-semibold">Hint:</span> {currentQuestion.hint}
                  </div>
                )}

                <Button
                  onClick={onCheckAnswer}
                  disabled={!userAnswer.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Check Answer
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className={`rounded-lg p-4 ${
                    isCorrect ? 'border border-emerald-200 bg-emerald-50' : 'border border-rose-200 bg-rose-50'
                  }`}
                >
                  <div className="mb-2 flex items-center gap-3">
                    {isCorrect ? (
                      <>
                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                        <span className="font-semibold text-emerald-700">Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-6 w-6 text-rose-600" />
                        <span className="font-semibold text-rose-700">Incorrect</span>
                      </>
                    )}
                  </div>
                  {!isCorrect && (
                    <p className="mb-2 text-sm">
                      The correct answer is: <span className="font-semibold text-emerald-600">{currentQuestion.answer}</span>
                    </p>
                  )}
                  {currentQuestion.explanation && (
                    <p className="text-sm italic text-slate-600">{currentQuestion.explanation}</p>
                  )}
                </div>

                <Button onClick={onNextQuestion} className="w-full bg-blue-600 hover:bg-blue-700">
                  {currentQuestionIndex < quiz.questions.length - 1 ? (
                    <>
                      Next Question
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      See Results
                      <Trophy className="ml-2 h-4 w-4" />
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
                className={`h-3 w-3 rounded-full ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600'
                    : result
                    ? result.isCorrect
                      ? 'bg-emerald-500'
                      : 'bg-rose-500'
                    : 'bg-slate-300'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
