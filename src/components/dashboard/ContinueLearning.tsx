import { Link } from 'react-router-dom';
import { Clock, BookOpen, CheckCircle, ArrowRight, Flame, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useProgress } from '@/contexts/ProgressContext';
import { SAMPLE_LESSONS } from '@/data/sampleLessons';
import { NEW_VOCABULARY_LESSONS } from '@/data/newVocabularyLessons';
import { NEW_GRAMMAR_LESSONS } from '@/data/newGrammarLessons';

const ALL_LESSONS = [...SAMPLE_LESSONS, ...NEW_VOCABULARY_LESSONS, ...NEW_GRAMMAR_LESSONS];

export function ContinueLearning() {
  const { 
    getRecentLessons, 
    getCompletedLessonsCount, 
    streakData, 
    getTodayProgress,
    lessonProgress 
  } = useProgress();

  const recentLessons = getRecentLessons();
  const completedCount = getCompletedLessonsCount();
  const todayProgress = getTodayProgress();
  
  const vocabularyLessons = ALL_LESSONS.filter(l => l.type === 'vocabulary');
  const grammarLessons = ALL_LESSONS.filter(l => l.type === 'grammar');
  
  const vocabCompleted = Object.values(lessonProgress).filter(p => {
    const lesson = vocabularyLessons.find(l => l.id === p.lessonId || l.slug === p.lessonId);
    return lesson && p.status === 'completed';
  }).length;
  
  const grammarCompleted = Object.values(lessonProgress).filter(p => {
    const lesson = grammarLessons.find(l => l.id === p.lessonId || l.slug === p.lessonId);
    return lesson && p.status === 'completed';
  }).length;

  const getLessonByIdOrSlug = (id: string) => {
    return ALL_LESSONS.find(l => l.id === id || l.slug === id);
  };

  if (recentLessons.length === 0 && completedCount === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-gradient-to-r from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Continue Learning</h2>
          <div className="flex items-center gap-4">
            {streakData.currentStreak > 0 && (
              <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full">
                <Flame className="h-5 w-5" />
                <span className="font-semibold">{streakData.currentStreak} day streak</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Target className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Today's Goal</p>
                  <p className="text-lg font-semibold">{todayProgress.questions}/{todayProgress.goal} questions</p>
                </div>
              </div>
              <Progress value={todayProgress.percentage} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lessons Completed</p>
                  <p className="text-lg font-semibold">{completedCount} total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vocabulary</p>
                  <p className="text-lg font-semibold">{vocabCompleted}/{vocabularyLessons.length}</p>
                </div>
              </div>
              <Progress value={(vocabCompleted / vocabularyLessons.length) * 100} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Grammar</p>
                  <p className="text-lg font-semibold">{grammarCompleted}/{grammarLessons.length}</p>
                </div>
              </div>
              <Progress value={(grammarCompleted / grammarLessons.length) * 100} className="mt-3 h-2" />
            </CardContent>
          </Card>
        </div>

        {recentLessons.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pick up where you left off</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {recentLessons.slice(0, 3).map((progress) => {
                const lesson = getLessonByIdOrSlug(progress.lessonId);
                if (!lesson) return null;
                
                return (
                  <Link key={progress.lessonId} to={`/lesson/${lesson.slug}`}>
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-indigo-500">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge variant={lesson.type === 'vocabulary' ? 'default' : 'secondary'} className="text-xs">
                            {lesson.type}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={progress.status === 'completed' ? 'text-green-600 border-green-600' : 'text-amber-600 border-amber-600'}
                          >
                            {progress.status === 'completed' ? 'Completed' : 'In Progress'}
                          </Badge>
                        </div>
                        <CardTitle className="text-base mt-2">{lesson.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{Math.round(progress.timeSpentSeconds / 60)} min spent</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-indigo-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
