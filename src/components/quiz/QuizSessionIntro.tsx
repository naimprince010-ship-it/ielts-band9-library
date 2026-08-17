import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Keyboard, Target } from 'lucide-react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Quiz } from '@/data/quizData';
import { getCategoryBadgeClass, getDifficultyBadgeClass } from './quizStyles';

interface QuizSessionIntroProps {
  quiz: Quiz;
  onStart: () => void;
}

/**
 * Pre-start briefing card shown before a quiz session begins. Compact
 * navy hero + stat tiles + instructions, matching the grammar workspace's
 * visual language instead of the previous generic yellow/muted boxes.
 */
export function QuizSessionIntro({ quiz, onStart }: QuizSessionIntroProps) {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <Card className="overflow-hidden border-blue-100 shadow-sm">
          <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-8 text-center text-background">
            <div className="mb-4 flex justify-center gap-2">
              <Badge variant="outline" className={getCategoryBadgeClass(quiz.category)}>
                {quiz.category}
              </Badge>
              <Badge variant="outline" className={getDifficultyBadgeClass(quiz.difficulty)}>
                {quiz.difficulty}
              </Badge>
            </div>
            <CardTitle className="text-2xl text-background">{quiz.title}</CardTitle>
            <CardDescription className="mt-2 text-base text-white/80">{quiz.description}</CardDescription>
          </div>
          <CardContent className="space-y-6 p-8">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                <Target className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                <p className="text-lg font-semibold text-slate-950">{quiz.questions.length}</p>
                <p className="text-sm text-slate-600">Questions</p>
              </div>
              <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-4">
                <Clock className="mx-auto mb-2 h-8 w-8 text-violet-600" />
                <p className="text-lg font-semibold text-slate-950">{Math.floor(quiz.timeLimit / 60)} min</p>
                <p className="text-sm text-slate-600">Time Limit</p>
              </div>
            </div>

            <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
              <h4 className="mb-2 font-semibold text-indigo-900">Instructions:</h4>
              <ul className="space-y-1 text-sm text-indigo-800">
                <li>• Fill in the blank with the correct word</li>
                <li>• Answers are case-insensitive</li>
                <li>• Use the hint button if you need help</li>
                <li>• Complete before the timer runs out</li>
              </ul>
            </div>

            <div className="rounded-xl border border-blue-100 bg-slate-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Keyboard className="h-4 w-4 text-blue-600" />
                <h4 className="font-semibold text-slate-950">Keyboard Shortcuts:</h4>
              </div>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>
                  • <kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-xs shadow-sm">Enter</kbd> - Submit
                  answer / Next question
                </li>
                <li>
                  • <kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-xs shadow-sm">H</kbd> - Toggle hint
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Link to="/quiz" className="flex-1">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
              <Button onClick={onStart} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Start Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
