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
  CheckCircle2
} from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';

interface DailyActivity {
  date: string;
  lessonsCompleted: number;
  quizzesCompleted: number;
  minutesStudied: number;
  score: number;
}

interface WeeklyStats {
  week: string;
  vocabulary: number;
  grammar: number;
  reading: number;
  writing: number;
  speaking: number;
}

const ACTIVITY_KEY = 'ielts_daily_activity';

function getActivityHistory(): DailyActivity[] {
  const stored = localStorage.getItem(ACTIVITY_KEY);
  if (stored) return JSON.parse(stored);
  
  const mockData: DailyActivity[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    mockData.push({
      date: date.toISOString().split('T')[0],
      lessonsCompleted: Math.floor(Math.random() * 5),
      quizzesCompleted: Math.floor(Math.random() * 3),
      minutesStudied: Math.floor(Math.random() * 60) + 10,
      score: Math.floor(Math.random() * 30) + 70
    });
  }
  return mockData;
}

function getWeeklyStats(): WeeklyStats[] {
  const weeks: WeeklyStats[] = [];
  for (let i = 3; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - (i * 7));
    weeks.push({
      week: `Week ${4 - i}`,
      vocabulary: Math.floor(Math.random() * 20) + 5,
      grammar: Math.floor(Math.random() * 10) + 2,
      reading: Math.floor(Math.random() * 8) + 1,
      writing: Math.floor(Math.random() * 5) + 1,
      speaking: Math.floor(Math.random() * 6) + 1
    });
  }
  return weeks;
}

export default function ProgressDashboardPage() {
  const { getCompletedLessonsCount, lessonProgress } = useProgress();
  const completedLessonsCount = getCompletedLessonsCount();
  const bookmarkedCount = Object.keys(lessonProgress).length;
  const [activityHistory, setActivityHistory] = useState<DailyActivity[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats[]>([]);
  const [streak, setStreak] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    const history = getActivityHistory();
    setActivityHistory(history);
    setWeeklyStats(getWeeklyStats());

    let currentStreak = 0;
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].lessonsCompleted > 0 || history[i].quizzesCompleted > 0) {
        currentStreak++;
      } else {
        break;
      }
    }
    setStreak(currentStreak);

    const totalMinutes = history.reduce((sum, day) => sum + day.minutesStudied, 0);
    setTotalStudyTime(totalMinutes);

    const avgScore = history.reduce((sum, day) => sum + day.score, 0) / history.length;
    setAverageScore(Math.round(avgScore));
  }, []);

  const getActivityLevel = (activity: DailyActivity) => {
    const total = activity.lessonsCompleted + activity.quizzesCompleted;
    if (total === 0) return 'bg-gray-100';
    if (total <= 2) return 'bg-green-200';
    if (total <= 4) return 'bg-green-400';
    return 'bg-green-600';
  };

  const maxBarHeight = 100;
  const maxWeeklyTotal = Math.max(...weeklyStats.map(w => 
    w.vocabulary + w.grammar + w.reading + w.writing + w.speaking
  ));

  const skillProgress = [
    { name: 'Vocabulary', icon: BookOpen, color: 'bg-indigo-500', progress: 65, lessons: 45 },
    { name: 'Grammar', icon: Brain, color: 'bg-purple-500', progress: 48, lessons: 15 },
    { name: 'Reading', icon: Target, color: 'bg-blue-500', progress: 32, lessons: 8 },
    { name: 'Writing', icon: PenTool, color: 'bg-emerald-500', progress: 25, lessons: 5 },
    { name: 'Speaking', icon: Mic, color: 'bg-orange-500', progress: 40, lessons: 12 },
  ];

  const recentAchievements = [
    { name: 'Week Warrior', description: '7-day streak achieved', date: '2 days ago' },
    { name: 'Quiz Master', description: 'Completed 50 quizzes', date: '5 days ago' },
    { name: 'Vocabulary Builder', description: 'Learned 100 new words', date: '1 week ago' },
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
                  <p className="text-3xl font-bold text-purple-600">{averageScore}%</p>
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
                {activityHistory.slice(-30).map((day, idx) => (
                  <div
                    key={idx}
                    className={`w-full aspect-square rounded-sm ${getActivityLevel(day)} cursor-pointer`}
                    title={`${day.date}: ${day.lessonsCompleted} lessons, ${day.quizzesCompleted} quizzes`}
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
                {recentAchievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">{achievement.name}</p>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                      <p className="text-xs text-gray-400">{achievement.date}</p>
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
                Weekly Progress
              </CardTitle>
              <CardDescription>Lessons completed by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-around h-48 gap-2">
                {weeklyStats.map((week, idx) => {
                  const total = week.vocabulary + week.grammar + week.reading + week.writing + week.speaking;
                  const height = (total / maxWeeklyTotal) * maxBarHeight;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div 
                        className="w-12 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-gray-500">{week.week}</span>
                    </div>
                  );
                })}
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Score Trend
            </CardTitle>
            <CardDescription>Your quiz scores over the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-end gap-1">
              {activityHistory.slice(-30).map((day, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-gradient-to-t from-green-500 to-green-300 rounded-t transition-all hover:from-green-600 hover:to-green-400"
                  style={{ height: `${day.score}%` }}
                  title={`${day.date}: ${day.score}%`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>30 days ago</span>
              <span>Today</span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Estimated Band Score</h3>
              <p className="text-4xl font-bold">6.5 - 7.0</p>
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
              <h3 className="font-semibold mb-2">Bookmarked</h3>
              <p className="text-4xl font-bold">{bookmarkedCount}</p>
              <p className="text-purple-200 text-sm mt-2">Lessons saved for review</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
