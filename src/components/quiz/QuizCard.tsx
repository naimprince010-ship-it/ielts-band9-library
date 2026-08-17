import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Lock, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Quiz } from '@/data/quizData';
import { getCategoryBadgeClass, getDifficultyBadgeClass } from './quizStyles';

interface QuizCardProps {
  quiz: Quiz;
  isPremiumUser: boolean;
}

/**
 * A single quiz card in the browse grid. Category/difficulty badges use
 * the shared brand-color mapping (quizStyles.ts) instead of ad hoc colors.
 */
export function QuizCard({ quiz, isPremiumUser }: QuizCardProps) {
  return (
    <Card className="border-slate-200 transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="outline" className={getCategoryBadgeClass(quiz.category)}>
            {quiz.category}
          </Badge>
          <Badge variant="outline" className={getDifficultyBadgeClass(quiz.difficulty)}>
            {quiz.difficulty}
          </Badge>
        </div>
        <CardTitle className="text-lg text-slate-950">{quiz.title}</CardTitle>
        <CardDescription>{quiz.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            {quiz.questions.length} questions
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {Math.floor(quiz.timeLimit / 60)} min
          </span>
        </div>
        {quiz.is_premium && !isPremiumUser ? (
          <Link to="/pricing">
            <Button className="w-full border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100" variant="outline">
              <Lock className="mr-2 h-4 w-4" />
              Premium Quiz
            </Button>
          </Link>
        ) : (
          <Link to={`/quiz/${quiz.id}`}>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Start Quiz
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
