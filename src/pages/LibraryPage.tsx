import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, BookOpen, GraduationCap, Star, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLessons } from '@/contexts/LessonContext';
import { useAuth } from '@/contexts/AuthContext';
import { LessonType, LessonLevel } from '@/types';
import { GRAMMAR_TOPICS, VOCABULARY_TOPICS } from '@/data/sampleLessons';

interface LibraryPageProps {
  type: LessonType;
}

export function LibraryPage({ type }: LibraryPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [levelFilter, setLevelFilter] = useState<LessonLevel | 'all'>('all');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  
  const { lessons, loading, fetchLessons, addBookmark, removeBookmark, isBookmarked } = useLessons();
  const { user } = useAuth();

  const topics = type === 'vocabulary' ? VOCABULARY_TOPICS : GRAMMAR_TOPICS;
  const filteredLessons = lessons.filter(l => l.type === type);

  useEffect(() => {
    const level = levelFilter === 'all' ? undefined : levelFilter;
    fetchLessons(type, level, searchQuery || undefined);
  }, [type, levelFilter, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchQuery ? { search: searchQuery } : {});
  };

  const handleBookmarkToggle = async (lessonId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    
    if (isBookmarked(lessonId)) {
      await removeBookmark(lessonId);
    } else {
      await addBookmark(lessonId);
    }
  };

  const displayLessons = topicFilter === 'all' 
    ? filteredLessons 
    : filteredLessons.filter(l => l.topic.toLowerCase() === topicFilter.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`py-12 ${type === 'vocabulary' ? 'bg-indigo-600' : 'bg-purple-600'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            {type === 'vocabulary' ? (
              <BookOpen className="h-10 w-10" />
            ) : (
              <GraduationCap className="h-10 w-10" />
            )}
            <h1 className="text-3xl font-bold capitalize">{type} Library</h1>
          </div>
          <p className="text-lg opacity-90 max-w-2xl">
            {type === 'vocabulary' 
              ? 'Master academic vocabulary, collocations, and speaking phrases for IELTS Band 7+.'
              : 'Learn essential grammar structures with clear explanations, examples, and practice exercises.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder={`Search ${type} lessons...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={levelFilter} onValueChange={(v) => setLevelFilter(v as LessonLevel | 'all')}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={topicFilter} onValueChange={setTopicFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                {topics.map((topic) => (
                  <SelectItem key={topic} value={topic.toLowerCase()}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button type="submit" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </form>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : displayLessons.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {type === 'vocabulary' ? (
                <BookOpen className="h-8 w-8 text-gray-400" />
              ) : (
                <GraduationCap className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-4">{displayLessons.length} lessons found</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayLessons.map((lesson) => (
                <Link key={lesson.id} to={`/lesson/${lesson.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          variant="outline" 
                          className={`capitalize ${
                            lesson.level === 'beginner' ? 'text-green-600 border-green-600' :
                            lesson.level === 'intermediate' ? 'text-blue-600 border-blue-600' :
                            'text-purple-600 border-purple-600'
                          }`}
                        >
                          {lesson.level}
                        </Badge>
                        <div className="flex items-center gap-2">
                          {lesson.is_premium ? (
                            <Badge variant="outline" className="text-amber-600 border-amber-600">
                              <Star className="h-3 w-3 mr-1" /> Premium
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Free
                            </Badge>
                          )}
                          {user && (
                            <button
                              onClick={(e) => handleBookmarkToggle(lesson.id, e)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              {isBookmarked(lesson.id) ? (
                                <BookmarkCheck className="h-5 w-5 text-indigo-600" />
                              ) : (
                                <Bookmark className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                              )}
                            </button>
                          )}
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
                        <Badge variant="secondary" className="capitalize">
                          {lesson.topic}
                        </Badge>
                        <span>{lesson.view_count.toLocaleString()} views</span>
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
