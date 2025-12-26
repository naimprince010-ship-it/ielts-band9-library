import { Link } from 'react-router-dom';
import { ArrowRight, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLastVisited } from '@/hooks/useLastVisited';

export function ContinueLearning() {
  const { lastVisited, getLastVisitedUrl, getLastVisitedLabel, clearLastVisited } = useLastVisited();

  if (!lastVisited) return null;

  const url = getLastVisitedUrl();
  const label = getLastVisitedLabel();

  if (!url || !label) return null;

  const getTypeLabel = () => {
    if (lastVisited.lessonType) {
      return `${lastVisited.lessonType.charAt(0).toUpperCase() + lastVisited.lessonType.slice(1)} Lesson`;
    }
    if (lastVisited.quizId) return 'Quiz';
    if (lastVisited.collectionId) return 'Collection';
    return 'Content';
  };

  const timeSince = () => {
    const minutes = Math.floor((Date.now() - lastVisited.timestamp) / (1000 * 60));
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Yesterday';
  };

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-indigo-100 rounded-full">
              <Clock className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-indigo-600 font-medium">Continue where you left off</p>
              <p className="font-semibold text-gray-900 line-clamp-1">{label}</p>
              <p className="text-xs text-gray-500">{getTypeLabel()} • {timeSince()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                clearLastVisited();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
            <Link to={url}>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                Continue
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
