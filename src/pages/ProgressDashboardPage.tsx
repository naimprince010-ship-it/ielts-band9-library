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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

interface FullMockStats {
  attempts: number;
  latestBand: number | null;
  bestBand: number | null;
  lastCompletedAt: string | null;
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
    const [fullMockStats, setFullMockStats] = useState<FullMockStats>({
      attempts: 0,
      latestBand: null,
      bestBand: null,
      lastCompletedAt: null,
    });
    const [selectedActivity, setSelectedActivity] = useState<DailyActivity | null>(null);

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

        const { data: mockData, error: mockError } = await supabase
          .from('mock_test_results')
          .select('overall_band, completed_at')
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false })
          .limit(50);

        if (!mockError && mockData) {
          const bands = mockData.map(item => Number(item.overall_band || 0)).filter(Boolean);
          setFullMockStats({
            attempts: mockData.length,
            latestBand: bands[0] ?? null,
            bestBand: bands.length ? Math.max(...bands) : null,
            lastCompletedAt: mockData[0]?.completed_at ?? null,
          });
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
    } else if (data && typeof data === 'object' && (data.questionsAnswered != null || data.lessonsCompleted != null)) {
      const emptyData: DailyActivity[] = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        emptyData.push({
          date: date.toISOString().split('T')[0],
          lessons_completed: i === 0 ? Number(data.lessonsCompleted || 0) : 0,
          quizzes_completed: i === 0 ? Number(data.questionsAnswered || 0) : 0,
          minutes_studied: i === 0 ? Number(data.lessonsTimeSeconds || 0) : 0,
          score: 0,
        });
      }
      setActivityHistory(emptyData);
      calculateStats(emptyData);
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
    if (total === 0) return 'bg-slate-200';
    if (total <= 2) return 'bg-emerald-200';
    if (total <= 4) return 'bg-emerald-400';
    return 'bg-emerald-600';
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

  const formatActivityDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getActivityIntensityLabel = (activity: DailyActivity) => {
    const total = (activity.lessons_completed || 0) + (activity.quizzes_completed || 0);
    if (total === 0) return 'No study activity';
    if (total <= 2) return 'Light activity';
    if (total <= 4) return 'Steady activity';
    return 'High activity';
  };

  const displayAchievements = achievements.length > 0 ? achievements : [
    { achievement_name: 'Getting Started', description: 'Complete your first lesson to earn achievements!', earned_at: new Date().toISOString() }
  ];

  const completedSkills = skillProgress.filter(skill => skill.progress > 0).length;
  const heatmapDays = (Array.isArray(activityHistory) ? activityHistory : []).slice(-30);
  const weekLabelDays = heatmapDays.filter((_, idx) => idx % 7 === 0);
  const todayIsoDate = new Date().toISOString().split('T')[0];
  const last7Days = heatmapDays.slice(-7);
  const previous7Days = heatmapDays.slice(-14, -7);

  const getWeeklyActivityUnits = (days: DailyActivity[]) => days.reduce(
    (sum, day) => sum + (day.lessons_completed || 0) + (day.quizzes_completed || 0),
    0,
  );

  const getWeeklyStudyMinutes = (days: DailyActivity[]) => days.reduce(
    (sum, day) => sum + (day.minutes_studied || 0),
    0,
  );

  const last7ActivityUnits = getWeeklyActivityUnits(last7Days);
  const previous7ActivityUnits = getWeeklyActivityUnits(previous7Days);
  const weeklyActivityDelta = last7ActivityUnits - previous7ActivityUnits;

  const last7StudyMinutes = getWeeklyStudyMinutes(last7Days);
  const previous7StudyMinutes = getWeeklyStudyMinutes(previous7Days);
  const weeklyStudyMinutesDelta = last7StudyMinutes - previous7StudyMinutes;

  const getAchievementBadge = (achievement: Achievement) => {
    if (achievement.achievement_name === 'Getting Started') {
      return { label: 'Starter', className: 'bg-slate-100 text-slate-600' };
    }

    const earnedDate = new Date(achievement.earned_at);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - earnedDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 3) {
      return { label: 'New', className: 'bg-emerald-100 text-emerald-700' };
    }

    return { label: 'Milestone', className: 'bg-indigo-100 text-indigo-700' };
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),_transparent_32%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_45%,_#f8fafc_100%)] py-6 sm:py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-6 overflow-hidden rounded-3xl border border-indigo-100 bg-white/90 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
                <BarChart3 className="h-3.5 w-3.5" />
                My Progress
              </div>
              <div>
                <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200/70">
                    <BarChart3 className="h-6 w-6" />
                  </span>
                  Progress Dashboard
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                  A clear view of your study streak, skill growth, and next best actions across IELTS practice.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[420px]">
              {[
                { label: 'Streak', value: `${streak}d`, tone: 'from-orange-50 to-orange-100', text: 'text-orange-700', icon: Flame },
                { label: 'Lessons', value: completedLessonsCount.toString(), tone: 'from-indigo-50 to-indigo-100', text: 'text-indigo-700', icon: CheckCircle2 },
                { label: 'Skills', value: `${completedSkills}/5`, tone: 'from-emerald-50 to-emerald-100', text: 'text-emerald-700', icon: Target },
                { label: 'Quiz avg', value: averageScore > 0 ? `${averageScore}%` : 'N/A', tone: 'from-purple-50 to-purple-100', text: 'text-purple-700', icon: TrendingUp },
              ].map((item) => (
                <div key={item.label} className={`rounded-2xl border border-white/80 bg-gradient-to-br ${item.tone} p-3 shadow-sm`}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                    <item.icon className={`h-4 w-4 ${item.text}`} />
                  </div>
                  <p className={`mt-2 text-2xl font-bold tracking-tight ${item.text}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <Card className="overflow-hidden rounded-2xl border-orange-200/70 bg-gradient-to-br from-orange-50/90 via-white to-orange-100/70 shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4 sm:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Current streak</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-orange-600">{streak} days</p>
                  <p className="mt-1 text-sm text-slate-500">Keep momentum with one small session today.</p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
                  <Flame className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl border-indigo-200/70 bg-gradient-to-br from-indigo-50/90 via-white to-indigo-100/60 shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4 sm:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Lessons completed</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-indigo-600">{completedLessonsCount}</p>
                  <p className="mt-1 text-sm text-slate-500">Across all lesson types and collections.</p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl border-emerald-200/70 bg-gradient-to-br from-emerald-50/90 via-white to-emerald-100/60 shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4 sm:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Study time</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-emerald-600">{Math.round(totalStudyTime / 60)}h</p>
                  <p className="mt-1 text-sm text-slate-500">Estimated from activity logs.</p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl border-violet-200/70 bg-gradient-to-br from-violet-50/90 via-white to-violet-100/60 shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4 sm:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Average score</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-purple-600">{averageScore > 0 ? `${averageScore}%` : 'N/A'}</p>
                  <p className="mt-1 text-sm text-slate-500">Rolling quiz performance average.</p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 ring-1 ring-purple-100">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 overflow-hidden border-indigo-200/80 bg-gradient-to-br from-indigo-50 via-white to-violet-50 shadow-sm">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                  <Award className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <div className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-700">
                    Full mock readiness
                  </div>
                  <p className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                    {fullMockStats.latestBand != null ? `Latest band ${fullMockStats.latestBand.toFixed(1)}` : 'No saved full mock yet'}
                  </p>
                  <p className="max-w-3xl text-sm leading-6 text-slate-600">
                    {fullMockStats.attempts > 0
                      ? `${fullMockStats.attempts} saved attempt${fullMockStats.attempts > 1 ? 's' : ''}. Best band ${fullMockStats.bestBand?.toFixed(1) ?? '--'}${fullMockStats.lastCompletedAt ? `, last on ${new Date(fullMockStats.lastCompletedAt).toLocaleDateString()}` : ''}.`
                      : 'Take a full mock to connect exam readiness with your progress dashboard.'}
                  </p>
                </div>
              </div>
              <Button onClick={() => navigate(fullMockStats.attempts > 0 ? '/results' : '/full-mock-test')} className="gap-2 self-start lg:self-center">
                {fullMockStats.attempts > 0 ? 'Open Results' : 'Start Full Mock'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
          <Card className="overflow-hidden rounded-2xl border-indigo-200/80 bg-gradient-to-br from-white via-indigo-50/50 to-sky-50/40 shadow-md transition-shadow hover:shadow-lg lg:col-span-2">
            <CardHeader className="space-y-1 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Activity Heatmap</CardTitle>
                  <CardDescription>Your learning activity over the past 30 days</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 sm:p-6">
              <div className="mb-3 grid grid-cols-5 gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
                {weekLabelDays.map((day) => (
                  <span key={`week-${day.date}`}>{new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                ))}
              </div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  <span>Last 7 days:</span>
                  <span>{last7ActivityUnits} activity points</span>
                </div>
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${weeklyActivityDelta >= 0 ? 'border border-emerald-200 bg-emerald-50 text-emerald-700' : 'border border-rose-200 bg-rose-50 text-rose-700'}`}>
                  <span>{weeklyActivityDelta >= 0 ? '+' : ''}{weeklyActivityDelta} vs previous week</span>
                </div>
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${weeklyStudyMinutesDelta >= 0 ? 'border border-sky-200 bg-sky-50 text-sky-700' : 'border border-amber-200 bg-amber-50 text-amber-700'}`}>
                  <span>{weeklyStudyMinutesDelta >= 0 ? '+' : ''}{weeklyStudyMinutesDelta} min study time</span>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-10 sm:gap-1">
                {heatmapDays.map((day, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedActivity(day)}
                    aria-pressed={selectedActivity?.date === day.date}
                    className={`relative aspect-square w-full rounded-lg ${getActivityLevel(day)} cursor-pointer ring-1 ring-inset ring-black/5 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${selectedActivity?.date === day.date ? 'scale-105 ring-2 ring-indigo-600 ring-offset-2 ring-offset-white' : ''} ${day.date === todayIsoDate ? 'ring-2 ring-emerald-600 ring-offset-1 ring-offset-white' : ''}`}
                    title={`${day.date}: ${day.lessons_completed || 0} lessons, ${day.quizzes_completed || 0} quizzes`}
                  >
                    {day.date === todayIsoDate && (
                      <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-600 ring-2 ring-white" aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:justify-end sm:text-sm">
                <span className="font-medium text-slate-400">Less</span>
                <div className="h-3 w-3 rounded-sm bg-slate-200 ring-1 ring-black/5" />
                <div className="h-3 w-3 rounded-sm bg-emerald-200 ring-1 ring-black/5" />
                <div className="h-3 w-3 rounded-sm bg-emerald-400 ring-1 ring-black/5" />
                <div className="h-3 w-3 rounded-sm bg-emerald-600 ring-1 ring-black/5" />
                <span className="font-medium text-slate-400">More</span>
              </div>
              <p className="mt-3 text-xs text-slate-400 sm:text-sm">Tap any square to see that day&apos;s activity breakdown. The dot marks today.</p>
              {selectedActivity && (
                <div className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-2xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm text-indigo-700">
                  <span className="font-semibold">Selected:</span>
                  <span>{formatActivityDate(selectedActivity.date)}</span>
                  <span className="text-indigo-400">•</span>
                  <span>{selectedActivity.lessons_completed} lessons</span>
                  <span className="text-indigo-400">•</span>
                  <span>{selectedActivity.quizzes_completed} quizzes</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl border-amber-200/80 bg-gradient-to-br from-white via-amber-50/50 to-orange-50/40 shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="space-y-1 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Recent Achievements</CardTitle>
                  <CardDescription>Fresh wins from your study journey</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 sm:p-6">
              <div className="space-y-4">
                {displayAchievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-2xl border border-white/70 bg-gradient-to-r from-white to-slate-50 p-3 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-slate-900">{achievement.achievement_name}</p>
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${getAchievementBadge(achievement).className}`}>
                          {getAchievementBadge(achievement).label}
                        </span>
                      </div>
                      <p className="text-sm leading-6 text-slate-500">{achievement.description}</p>
                      <p className="text-xs font-medium text-slate-400">{formatTimeAgo(achievement.earned_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
          <Card className="overflow-hidden rounded-2xl border-emerald-200/80 bg-gradient-to-br from-white via-emerald-50/45 to-teal-50/35 shadow-sm">
            <CardHeader className="space-y-1 border-b border-slate-100 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-slate-700" />
                Quiz Performance
              </CardTitle>
              <CardDescription>Your recent quiz scores</CardDescription>
            </CardHeader>
            <CardContent className="p-5 sm:p-6">
              {Array.isArray(quizAttempts) && quizAttempts.length > 0 ? (
                <div className="h-36 flex items-end gap-1 sm:h-40">
                  {quizAttempts.slice(-20).map((attempt, idx) => {
                    const percentage = (attempt.score / attempt.total) * 100;
                    return (
                      <div
                        key={idx}
                        className="flex-1 rounded-t-lg bg-gradient-to-t from-emerald-500 to-emerald-300 transition-all hover:from-emerald-600 hover:to-emerald-400"
                        style={{ height: `${Math.max(percentage, 8)}%` }}
                        title={`${attempt.quizId}: ${attempt.score}/${attempt.total} (${Math.round(percentage)}%)`}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-36 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400">
                  Complete quizzes to see your performance
                </div>
              )}
              <div className="mt-3 flex justify-between text-xs text-slate-400">
                <span>Oldest</span>
                <span>Most recent</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl border-blue-200/80 bg-gradient-to-br from-white via-blue-50/45 to-indigo-50/35 shadow-sm">
            <CardHeader className="space-y-1 border-b border-slate-100 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-slate-700" />
                Skill Progress
              </CardTitle>
              <CardDescription>Your progress in each IELTS skill area</CardDescription>
            </CardHeader>
            <CardContent className="p-5 sm:p-6">
              <div className="space-y-4">
                {skillProgress.map((skill) => (
                  <div key={skill.name} className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 sm:p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${skill.color}/10`}>
                          <skill.icon className="h-4 w-4 text-slate-600" />
                        </span>
                        <span className="font-medium text-slate-900">{skill.name}</span>
                      </div>
                      <span className="text-sm text-slate-500">{skill.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={skill.progress} className="flex-1" />
                      <span className="w-12 text-right text-sm font-semibold tabular-nums text-slate-700">{skill.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {(collectionProgressList.length > 0 || continueCollection) && (
          <Card className="mb-8 overflow-hidden rounded-2xl border-indigo-200/80 bg-gradient-to-br from-white via-indigo-50/35 to-purple-50/25 shadow-sm">
            <CardHeader className="space-y-1 border-b border-slate-100 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FolderOpen className="h-5 w-5 text-indigo-600" />
                Collection Progress
              </CardTitle>
              <CardDescription>Track your progress through curated learning collections</CardDescription>
            </CardHeader>
            <CardContent className="p-5 sm:p-6">
              {continueCollection && (
                <div className="mb-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-indigo-700">Continue where you left off</p>
                      <p className="mt-1 text-lg font-semibold text-slate-950">
                        {COLLECTION_NAMES[continueCollection.collectionId]?.title || continueCollection.collectionId}
                      </p>
                    </div>
                    <Button onClick={() => navigate(`/collections/${continueCollection.collectionId}`)} className="sm:self-start">
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
                        className={`rounded-2xl border p-4 ${isComplete ? 'border-emerald-200 bg-emerald-50/70' : 'border-slate-200 bg-slate-50/80'}`}
                      >
                        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-2">
                            {isComplete ? (
                              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            ) : (
                              <FolderOpen className="h-5 w-5 text-indigo-600" />
                            )}
                            <span className="font-medium text-slate-900">{collectionInfo.title}</span>
                          </div>
                          <span className={`text-sm font-semibold ${isComplete ? 'text-emerald-600' : 'text-slate-500'}`}>
                            {cp.completedLessons.length}/{collectionInfo.lessonCount} lessons
                          </span>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                          <Progress value={progressPercent} className="flex-1" />
                          <div className="flex items-center justify-between gap-3 sm:justify-end">
                            <span className="text-sm font-semibold tabular-nums text-slate-700">{progressPercent}%</span>
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
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-8 text-center text-slate-500">
                  <FolderOpen className="mx-auto mb-3 h-12 w-12 text-slate-300" />
                  <p className="font-medium text-slate-800">No collections started yet</p>
                  <p className="mb-4 mt-1 text-sm">Start a curated collection to track your progress</p>
                  <Button variant="outline" onClick={() => navigate('/collections')}>
                    Browse Collections
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
          <Card className="overflow-hidden rounded-2xl border-amber-200/80 bg-gradient-to-br from-white via-amber-50/45 to-orange-50/30 shadow-sm">
            <CardHeader className="space-y-1 border-b border-amber-100 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Areas Needing Attention
              </CardTitle>
              <CardDescription>Skills that need more practice based on your progress</CardDescription>
            </CardHeader>
            <CardContent className="p-5 sm:p-6">
              {getWeakAreas().length > 0 ? (
                <div className="space-y-4">
                  {getWeakAreas().map((skill) => (
                    <div key={skill.name} className="flex flex-col gap-4 rounded-2xl border border-amber-100 bg-amber-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${skill.color}`}>
                          <skill.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{skill.name}</p>
                          <p className="text-sm text-slate-500">{skill.progress}% complete</p>
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
                        className="sm:self-center"
                      >
                        Practice
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/70 px-4 py-8 text-center text-slate-500">
                  <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-emerald-500" />
                  <p className="font-medium text-slate-800">Great job!</p>
                  <p className="mt-1 text-sm">You're making good progress in all areas.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl border-blue-200/80 bg-gradient-to-br from-white via-blue-50/45 to-indigo-50/30 shadow-sm">
            <CardHeader className="space-y-1 border-b border-blue-100 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                Personalized Recommendations
              </CardTitle>
              <CardDescription>Suggestions to improve your IELTS score</CardDescription>
            </CardHeader>
            <CardContent className="p-5 sm:p-6">
              <div className="space-y-4">
                {getRecommendations().map((rec, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl border-l-4 p-4 shadow-sm ${
                      rec.priority === 'high' ? 'border-red-500 bg-red-50/80' :
                      rec.priority === 'medium' ? 'border-blue-500 bg-blue-50/80' :
                      'border-emerald-500 bg-emerald-50/80'
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{rec.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{rec.description}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(rec.link)}
                        className="w-full justify-center sm:w-auto sm:flex-shrink-0"
                      >
                        {rec.action}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-3">
          <Card className="overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-200/60">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-100">Estimated Band Score</h3>
              <p className="mt-3 text-4xl font-bold tracking-tight">{getEstimatedBand()}</p>
              <p className="mt-2 text-sm text-indigo-100/90">Based on your quiz performance</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-200/60">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-100">Words Learned</h3>
              <p className="mt-3 text-4xl font-bold tracking-tight">{completedLessonsCount * 25}</p>
              <p className="mt-2 text-sm text-emerald-100/90">Approximate vocabulary coverage</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-violet-600 to-violet-700 text-white shadow-lg shadow-violet-200/60">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-100">Quizzes Completed</h3>
              <p className="mt-3 text-4xl font-bold tracking-tight">{quizAttempts?.length || 0}</p>
              <p className="mt-2 text-sm text-violet-100/90">Keep practicing for stronger recall.</p>
            </CardContent>
          </Card>
        </div>

        <Dialog open={selectedActivity !== null} onOpenChange={(open) => !open && setSelectedActivity(null)}>
          <DialogContent className="max-w-md rounded-3xl border-slate-200 bg-white p-0 shadow-2xl">
            <div className="border-b border-slate-100 px-6 pb-4 pt-6">
              <DialogHeader className="space-y-2 text-left">
                <div className="inline-flex w-fit rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-700">
                  Activity detail
                </div>
                <DialogTitle className="text-2xl font-semibold tracking-tight text-slate-950">
                  {selectedActivity ? formatActivityDate(selectedActivity.date) : 'Activity detail'}
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500">
                  {selectedActivity ? getActivityIntensityLabel(selectedActivity) : 'Select a day to inspect it.'}
                </DialogDescription>
              </DialogHeader>
            </div>
            {selectedActivity && (
              <div className="space-y-4 px-6 py-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Lessons</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-indigo-600">{selectedActivity.lessons_completed}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Quizzes</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-emerald-600">{selectedActivity.quizzes_completed}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Study time</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-violet-600">{Math.round((selectedActivity.minutes_studied || 0) / 60)}h</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Score</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-amber-600">{selectedActivity.score || 0}%</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-indigo-50 to-white p-4">
                  <p className="text-sm font-semibold text-slate-700">What this means</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {selectedActivity.lessons_completed === 0 && selectedActivity.quizzes_completed === 0
                      ? 'This day had no recorded study activity.'
                      : 'You can use this view to compare study intensity across days and spot the habits that correlate with stronger progress.'}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
