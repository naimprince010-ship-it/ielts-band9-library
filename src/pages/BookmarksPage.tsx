import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bookmark, BookOpen, GraduationCap, Star, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLessons } from '@/contexts/LessonContext';
import { useAuth } from '@/contexts/AuthContext';

export function BookmarksPage() {
  const { bookmarks, removeBookmark, lessons } = useLessons();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const bookmarkedLessons = bookmarks
    .map(b => lessons.find(l => l.id === b.lesson_id))
    .filter(Boolean);

  const handleRemoveBookmark = async (lessonId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await removeBookmark(lessonId);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Bookmark className="h-8 w-8" />
            <h1 className="text-3xl font-bold">My Bookmarks</h1>
          </div>
          <p className="text-indigo-100">
            Your saved lessons for quick access
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookmarkedLessons.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No bookmarks yet</h2>
            <p className="text-gray-500 mb-6">
              Start exploring lessons and bookmark the ones you want to study later.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/vocabulary">
                <Button variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Vocabulary
                </Button>
              </Link>
              <Link to="/grammar">
                <Button>
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Browse Grammar
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">{bookmarkedLessons.length} saved lessons</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedLessons.map((lesson) => lesson && (
                <Link key={lesson.id} to={`/lesson/${lesson.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={lesson.type === 'vocabulary' ? 'default' : 'secondary'}>
                          {lesson.type}
                        </Badge>
                        <div className="flex items-center gap-2">
                          {lesson.is_premium && (
                            <Badge variant="outline" className="text-amber-600 border-amber-600">
                              <Star className="h-3 w-3 mr-1" /> Premium
                            </Badge>
                          )}
                          <button
                            onClick={(e) => handleRemoveBookmark(lesson.id, e)}
                            className="p-1 hover:bg-red-100 rounded text-gray-400 hover:text-red-500"
                            title="Remove bookmark"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-indigo-600 transition-colors">
                        {lesson.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {lesson.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <Badge variant="outline" className="capitalize">
                          {lesson.level}
                        </Badge>
                        <span>{lesson.topic}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
