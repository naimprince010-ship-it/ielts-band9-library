import { AlertCircle, RotateCcw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuizWrongReviewBannerProps {
  count: number;
  onStartReview: () => void;
}

/**
 * "Review Your Mistakes" banner on the quiz browse screen. Restyled to the
 * brand's amber highlight token (was raw orange) for consistency with the
 * grammar workspace's amber usage.
 */
export function QuizWrongReviewBanner({ count, onStartReview }: QuizWrongReviewBannerProps) {
  return (
    <Card className="mb-8 border-2 border-amber-200 bg-amber-50">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-amber-100 p-3">
              <AlertCircle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-amber-900">Review Your Mistakes</CardTitle>
              <CardDescription className="text-amber-700">
                You have {count} questions to review from previous quizzes
              </CardDescription>
            </div>
          </div>
          <Button onClick={onStartReview} className="bg-amber-600 hover:bg-amber-700">
            <RotateCcw className="mr-2 h-4 w-4" />
            Start Review ({Math.min(10, count)} questions)
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
