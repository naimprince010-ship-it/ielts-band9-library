import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  BookOpen, 
  Target,
  Flame,
  Calendar,
  Clock,
  Award,
  Brain,
  PenTool,
  Mic,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  FolderOpen,
  Play
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface DailyActivity {
  date: string;
  lessons_completed: number;
  quizzes_completed: number;
  minutes_studied: number;
  score: number;
}

interface Achievement {
  achievement_name: string;
  description: string;
  earned_at: string;
}

const ACTIVITY_KEY = 'ielts_daily_activity';

const COLLECTION_NAMES: Record<string, { title: string; lessonCount: number }> = {
  'band7-writing-toolkit': { title: 'Band 7 Writing Toolkit', lessonCount: 8 },
  'common-grammar-mistakes': { title: 'Most Common Grammar Mistakes', lessonCount: 10 },
  'education-vocabulary-pack': { title: 'Education Vocabulary Pack', lessonCount: 6 },
  'environment-vocabulary-pack': { title: 'Environment & Climate Pack', lessonCount: 5 },
  'health-vocabulary-pack': { title: 'Health & Wellbeing Pack', lessonCount: 5 },
  'work-career-pack': { title: 'Work & Career Pack', lessonCount: 5 },
  'band8-advanced-grammar': { title: 'Band 8+ Advanced Grammar', lessonCount: 8 },
  'quick-start-beginners': { title: 'Quick Start for Beginners', lessonCount: 10 },
};

export default function ProgressDashboardPage() {
    const { getCompletedLessonsCount, lessonProgress, quizAttempts, getAllCollectionProgress, getContinueCollection } = useProgress();
    const { user } = useAuth();
    const navigate = useNavigate();
    const completedLessonsCount = getCompletedLessonsCount();
    const collectionProgressList = getAllCollectionProgress();
    const continueCollection = getContinueCollection();
    const [activityHistory, setActivityHistory] = useState<DailyActivity[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [streak, setStreak] = useState(0);
    const [totalStudyTime, setTotalStudyTime] = useState(0);
    const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    fetchActivityData();
  }, [user]);

    const fetchActivityData = async () => {
      if (isSupabaseConfigured() && supabase && user) {
      try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const { data: activityData, error: activityError } = await supabase
          .from('user_activity')
          .select('*')
          .eq('user_id', user.id)
          .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
          .order('date', { ascending: true });

        if (!activityError && activityData && activityData.length > 0) {
          setActivityHistory(activityData);
          calculateStats(activityData);
        } else {
          loadLocalActivity();
        }

        const { data: achievementData, error: achievementError } = await supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', user.id)
          .order('earned_at', { ascending: false })
          .limit(5);

        if (!achievementError && achievementData) {
          setAchievements(achievementData);
        }
      } catch (err) {
        console.error('Error fetching activity:', err);
        loadLocalActivity();
      }
      } else {
        loadLocalActivity();
      }
    };

  const loadLocalActivity = () => {
    const stored = localStorage.getItem(ACTIVITY_KEY);
    let isArray = false;
    let data = null;
    
    try {
      if (stored) {
        data = JSON.parse(stored);
        isArray = Array.isArray(data);
      }
    } catch (e) {
      console.error('Error parsing local activity', e);
    }

    if (isArray && data) {
      setActivityHistory(data);
      calculateStats(data);
    } else {
      const emptyData: DailyActivity[] = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        emptyData.push({
          date: date.toISOString().split('T')[0],
          lessons_completed: 0,
          quizzes_completed: 0,
          minutes_studied: 0,
          score: 0
        });
      }
      setActivityHistory(emptyData);
      calculateStats(emptyData);
    }
  };

  const calculateStats = (history: DailyActivity[]) => {
    let currentStreak = 0;
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].lessons_completed > 0 || history[i].quizzes_completed > 0) {
        currentStreak++;
      } else {
        break;
      }
    }
    setStreak(currentStreak);

    const totalMinutes = history.reduce((sum, day) => sum + (day.minutes_studied || 0), 0);
    setTotalStudyTime(totalMinutes);

    if (quizAttempts && quizAttempts.length > 0) {
      const avgScore = quizAttempts.reduce((sum, a) => sum + (a.score / a.total) * 100, 0) / quizAttempts.length;
      setAverageScore(Math.round(avgScore));
    } else {
      const scoresWithData = history.filter(day => day.score > 0);
      if (scoresWithData.length > 0) {
        const avgScore = scoresWithData.reduce((sum, day) => sum + day.score, 0) / scoresWithData.length;
        setAverageScore(Math.round(avgScore));
      } else {
        setAverageScore(0);
      }
    }
  };

  const getActivityLevel = (activity: DailyActivity) => {
    const total = (activity.lessons_completed || 0) + (activity.quizzes_completed || 0);
    if (total === 0) return 'bg-gray-100';
    if (total <= 2) return 'bg-green-200';
    if (total <= 4) return 'bg-green-400';
    return 'bg-green-600';
  };

  const calculateSkillProgress = () => {
    const skills = {
      vocabulary: { completed: 0, total: 284 },
      grammar: { completed: 0, total: 30 },
      reading: { completed: 0, total: 10 },
      writing: { completed: 0, total: 15 },
      speaking: { completed: 0, total: 21 }
    };

    Object.entries(lessonProgress).forEach(([lessonId, progress]) => {
      if (progress.completedAt) {
        if (lessonId.includes('vocab')) skills.vocabulary.completed++;
        else if (lessonId.includes('grammar')) skills.grammar.completed++;
        else if (lessonId.includes('reading')) skills.reading.completed++;
        else if (lessonId.includes('writing')) skills.writing.completed++;
        else if (lessonId.includes('speaking')) skills.speaking.completed++;
      }
    });

    return [
      { name: 'Vocabulary', icon: BookOpen, color: 'bg-indigo-500', progress: Math.round((skills.vocabulary.completed / skills.vocabulary.total) * 100), lessons: skills.vocabulary.completed },
      { name: 'Grammar', icon: Brain, color: 'bg-purple-500', progress: Math.round((skills.grammar.completed / skills.grammar.total) * 100), lessons: skills.grammar.completed },
      { name: 'Reading', icon: Target, color: 'bg-blue-500', progress: Math.round((skills.reading.completed / skills.reading.total) * 100), lessons: skills.reading.completed },
      { name: 'Writing', icon: PenTool, color: 'bg-emerald-500', progress: Math.round((skills.writing.completed / skills.writing.total) * 100), lessons: skills.writing.completed },
      { name: 'Speaking', icon: Mic, color: 'bg-orange-500', progress: Math.round((skills.speaking.completed / skills.speaking.total) * 100), lessons: skills.speaking.completed },
    ];
  };

  const skillProgress = calculateSkillProgress();

    const getEstimatedBand = () => {
      if (averageScore === 0) return 'N/A';
      if (averageScore >= 90) return '8.0 - 9.0';
      if (averageScore >= 80) return '7.5 - 8.0';
      if (averageScore >= 70) return '7.0 - 7.5';
      if (averageScore >= 60) return '6.5 - 7.0';
      if (averageScore >= 50) return '6.0 - 6.5';
      return '5.5 - 6.0';
    };

    const getWeakAreas = () => {
      const skills = calculateSkillProgress();
      const weakAreas = skills
        .filter(skill => skill.progress < 30)
        .sort((a, b) => a.progress - b.progress);
      return weakAreas;
    };

    const getRecommendations = () => {
      const skills = calculateSkillProgress();
      const recommendations: { title: string; description: string; action: string; link: string; priority: 'high' | 'medium' | 'low' }[] = [];
    
      const weakestSkill = skills.reduce((min, skill) => skill.progress < min.progress ? skill : min, skills[0]);
    
      if (weakestSkill.progress < 20) {
        recommendations.push({
          title: `Focus on ${weakestSkill.name}`,
          description: `Your ${weakestSkill.name.toLowerCase()} skills need the most attention. Start with basic lessons.`,
          action: `Start ${weakestSkill.name} Lessons`,
          link: weakestSkill.name === 'Vocabulary' ? '/vocabulary' : 
                weakestSkill.name === 'Grammar' ? '/grammar' :
                weakestSkill.name === 'Reading' ? '/reading' :
                weakestSkill.name === 'Writing' ? '/writing' : '/speaking',
          priority: 'high'
        });
      }
    
      if (streak < 3) {
        recommendations.push({
          title: 'Build Your Study Habit',
          description: 'Consistency is key! Try to study at least 15 minutes daily to build a streak.',
          action: 'Start Daily Plan',
          link: '/daily-plan',
          priority: 'high'
        });
      }
    
      if (quizAttempts && quizAttempts.length < 5) {
        recommendations.push({
          title: 'Take More Practice Quizzes',
          description: 'Quizzes help reinforce learning. Try to complete at least 5 quizzes this week.',
          action: 'Start Quiz',
          link: '/quiz',
          priority: 'medium'
        });
      }
    
      const vocabSkill = skills.find(s => s.name === 'Vocabulary');
      if (vocabSkill && vocabSkill.progress < 50) {
        recommendations.push({
          title: 'Expand Your Vocabulary',
          description: 'A strong vocabulary is essential for all IELTS sections. Use flashcards for spaced repetition.',
          action: 'Practice Flashcards',
          link: '/flashcards',
          priority: 'medium'
        });
      }
    
      const writingSkill = skills.find(s => s.name === 'Writing');
      if (writingSkill && writingSkill.progress < 30) {
        recommendations.push({
          title: 'Practice Writing Essays',
          description: 'Writing Task 2 is worth 2/3 of your writing score. Practice with timed essays.',
          action: 'Writing Practice',
          link: '/writing',
          priority: 'medium'
        });
      }
    
      if (recommendations.length === 0) {
        recommendations.push({
          title: 'Keep Up the Great Work!',
          description: 'You\'re making excellent progress. Consider taking a mock test to assess your readiness.',
          action: 'Take Mock Test',
          link: '/mock-test',
          priority: 'low'
        });
      }
    
      return recommendations.slice(0, 4);
    };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  };

  const displayAchievements = achievements.length > 0 ? achievements : [
    { achievement_name: 'Getting Started', description: 'Complete your first lesson to earn achievements!', earned_at: new Date().toISOString() }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-indigo-600" />
            Progress Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Track your IELTS preparation journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Current Streak</p>
                  <p className="text-3xl font-bold text-orange-600">{streak} days</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Flame className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Lessons Completed</p>
                  <p className="text-3xl font-bold text-indigo-600">{completedLessonsCount}</p>
                </div>
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Study Time</p>
                  <p className="text-3xl font-bold text-green-600">{Math.round(totalStudyTime / 60)}h</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Average Score</p>
                  <p className="text-3xl font-bold text-purple-600">{averageScore > 0 ? `${averageScore}%` : 'N/A'}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Activity Heatmap
              </CardTitle>
              <CardDescription>Your learning activity over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-10 gap-1">
                {(Array.isArray(activityHistory) ? activityHistory : []).slice(-30).map((day, idx) => (
                  <div
                    key={idx}
                    className={`w-full aspect-square rounded-sm ${getActivityLevel(day)} cursor-pointer`}
                    title={`${day.date}: ${day.lessons_completed || 0} lessons, ${day.quizzes_completed || 0} quizzes`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-end gap-2 mt-4 text-sm text-gray-500">
                <span>Less</span>
                <div className="w-3 h-3 rounded-sm bg-gray-100" />
                <div className="w-3 h-3 rounded-sm bg-green-200" />
                <div className="w-3 h-3 rounded-sm bg-green-400" />
                <div className="w-3 h-3 rounded-sm bg-green-600" />
                <span>More</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {displayAchievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">{achievement.achievement_name}</p>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                      <p className="text-xs text-gray-400">{formatTimeAgo(achievement.earned_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Quiz Performance
              </CardTitle>
              <CardDescription>Your recent quiz scores</CardDescription>
            </CardHeader>
            <CardContent>
              {Array.isArray(quizAttempts) && quizAttempts.length > 0 ? (
                <div className="h-32 flex items-end gap-1">
                  {quizAttempts.slice(-20).map((attempt, idx) => {
                    const percentage = (attempt.score / attempt.total) * 100;
                    return (
                      <div
                        key={idx}
                        className="flex-1 bg-gradient-to-t from-green-500 to-green-300 rounded-t transition-all hover:from-green-600 hover:to-green-400"
                        style={{ height: `${percentage}%` }}
                        title={`${attempt.quizId}: ${attempt.score}/${attempt.total} (${Math.round(percentage)}%)`}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="h-32 flex items-center justify-center text-gray-400">
                  Complete quizzes to see your performance
                </div>
              )}
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Oldest</span>
                <span>Most Recent</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Skill Progress
              </CardTitle>
              <CardDescription>Your progress in each IELTS skill area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillProgress.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <skill.icon className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{skill.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={skill.progress} className="flex-1" />
                      <span className="text-sm font-medium w-12 text-right">{skill.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Collection Progress Section */}
        {(collectionProgressList.length > 0 || continueCollection) && (
          <Card className="mb-8 border-2 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-indigo-600" />
                Collection Progress
              </CardTitle>
              <CardDescription>Track your progress through curated learning collections</CardDescription>
            </CardHeader>
            <CardContent>
              {continueCollection && (
                <div className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-indigo-600 font-medium">Continue where you left off</p>
                      <p className="font-semibold text-lg">
                        {COLLECTION_NAMES[continueCollection.collectionId]?.title || continueCollection.collectionId}
                      </p>
                    </div>
                    <Button onClick={() => navigate(`/collections/${continueCollection.collectionId}`)}>
                      <Play className="mr-2 h-4 w-4" />
                      Continue
                    </Button>
                  </div>
                </div>
              )}
              
              {collectionProgressList.length > 0 ? (
                <div className="space-y-4">
                  {collectionProgressList.map((cp) => {
                    const collectionInfo = COLLECTION_NAMES[cp.collectionId];
                    if (!collectionInfo) return null;
                    
                    const progressPercent = Math.round((cp.completedLessons.length / collectionInfo.lessonCount) * 100);
                    const isComplete = progressPercent === 100;
                    
                    return (
                      <div 
                        key={cp.collectionId} 
                        className={`p-4 rounded-lg border ${isComplete ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {isComplete ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : (
                              <FolderOpen className="h-5 w-5 text-indigo-600" />
                            )}
                            <span className="font-medium">{collectionInfo.title}</span>
                          </div>
                          <span className={`text-sm font-medium ${isComplete ? 'text-green-600' : 'text-gray-600'}`}>
                            {cp.completedLessons.length}/{collectionInfo.lessonCount} lessons
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={progressPercent} className="flex-1" />
                          <span className="text-sm font-medium w-12 text-right">{progressPercent}%</span>
                          {!isComplete && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => navigate(`/collections/${cp.collectionId}`)}
                            >
                              Continue
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <FolderOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="font-medium">No collections started yet</p>
                  <p className="text-sm mb-4">Start a curated collection to track your progress</p>
                  <Button variant="outline" onClick={() => navigate('/collections')}>
                    Browse Collections
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <Card className="border-2 border-amber-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        Areas Needing Attention
                      </CardTitle>
                      <CardDescription>Skills that need more practice based on your progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {getWeakAreas().length > 0 ? (
                        <div className="space-y-4">
                          {getWeakAreas().map((skill) => (
                            <div key={skill.name} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className={`h-10 w-10 rounded-full ${skill.color} flex items-center justify-center`}>
                                  <skill.icon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <p className="font-medium">{skill.name}</p>
                                  <p className="text-sm text-gray-500">{skill.progress}% complete</p>
                                </div>
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => navigate(
                                  skill.name === 'Vocabulary' ? '/vocabulary' : 
                                  skill.name === 'Grammar' ? '/grammar' :
                                  skill.name === 'Reading' ? '/reading' :
                                  skill.name === 'Writing' ? '/writing' : '/speaking'
                                )}
                              >
                                Practice
                                <ArrowRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-green-500" />
                          <p className="font-medium">Great job!</p>
                          <p className="text-sm">You're making good progress in all areas.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-blue-600" />
                        Personalized Recommendations
                      </CardTitle>
                      <CardDescription>Suggestions to improve your IELTS score</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {getRecommendations().map((rec, idx) => (
                          <div 
                            key={idx} 
                            className={`p-4 rounded-lg border-l-4 ${
                              rec.priority === 'high' ? 'bg-red-50 border-red-500' :
                              rec.priority === 'medium' ? 'bg-blue-50 border-blue-500' :
                              'bg-green-50 border-green-500'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium">{rec.title}</p>
                                <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                              </div>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => navigate(rec.link)}
                                className="ml-2 flex-shrink-0"
                              >
                                {rec.action}
                                <ArrowRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Estimated Band Score</h3>
                      <p className="text-4xl font-bold">{getEstimatedBand()}</p>
                      <p className="text-indigo-200 text-sm mt-2">Based on your quiz performance</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Words Learned</h3>
                      <p className="text-4xl font-bold">{completedLessonsCount * 25}</p>
                      <p className="text-green-200 text-sm mt-2">~25 words per lesson</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Quizzes Completed</h3>
                      <p className="text-4xl font-bold">{quizAttempts?.length || 0}</p>
                      <p className="text-purple-200 text-sm mt-2">Keep practicing!</p>
                    </CardContent>
                  </Card>
                </div>
      </div>
    </div>
  );
}
