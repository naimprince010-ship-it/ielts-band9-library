import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  CheckCircle2, 
  Flame, 
  Trophy, 
  BookOpen, 
  PenTool, 
  FileText, 
  Mic, 
  Target,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface PlanItem {
  id: string;
  type: 'vocab_review' | 'grammar_exercise' | 'reading' | 'speaking' | 'writing' | 'quiz';
  title: string;
  description: string;
  target: { path?: string; topic?: string; count?: number };
  recommended_minutes: number;
  completed_at: string | null;
  sort_order: number;
}

interface DailyPlan {
  id: string;
  plan_date: string;
  status: 'active' | 'completed' | 'skipped';
  items: PlanItem[];
}

interface UserStreak {
  current_streak: number;
  longest_streak: number;
  last_completed_date: string | null;
  total_days_studied: number;
}

const PLAN_ITEM_TEMPLATES = [
  {
    type: 'vocab_review' as const,
    title: 'Vocabulary Review',
    description: 'Review vocabulary words from your lessons',
    target: { path: '/vocabulary', topic: 'education', count: 10 },
    recommended_minutes: 5,
  },
  {
    type: 'grammar_exercise' as const,
    title: 'Grammar Practice',
    description: 'Complete grammar exercises to reinforce your skills',
    target: { path: '/grammar-exercises', topic: 'articles' },
    recommended_minutes: 10,
  },
  {
    type: 'reading' as const,
    title: 'Reading Passage',
    description: 'Practice reading comprehension with a timed passage',
    target: { path: '/reading-practice' },
    recommended_minutes: 15,
  },
  {
    type: 'speaking' as const,
    title: 'Speaking Practice',
    description: 'Practice speaking with sample questions',
    target: { path: '/speaking-practice' },
    recommended_minutes: 10,
  },
  {
    type: 'quiz' as const,
    title: 'Quick Quiz',
    description: 'Test your knowledge with a quick quiz',
    target: { path: '/quiz' },
    recommended_minutes: 5,
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'vocab_review': return <BookOpen className="h-5 w-5" />;
    case 'grammar_exercise': return <PenTool className="h-5 w-5" />;
    case 'reading': return <FileText className="h-5 w-5" />;
    case 'speaking': return <Mic className="h-5 w-5" />;
    case 'writing': return <PenTool className="h-5 w-5" />;
    case 'quiz': return <Target className="h-5 w-5" />;
    default: return <BookOpen className="h-5 w-5" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'vocab_review': return 'bg-blue-100 text-blue-600';
    case 'grammar_exercise': return 'bg-purple-100 text-purple-600';
    case 'reading': return 'bg-green-100 text-green-600';
    case 'speaking': return 'bg-orange-100 text-orange-600';
    case 'writing': return 'bg-pink-100 text-pink-600';
    case 'quiz': return 'bg-yellow-100 text-yellow-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

export default function DailyStudyPlanPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [streak, setStreak] = useState<UserStreak>({
    current_streak: 0,
    longest_streak: 0,
    last_completed_date: null,
    total_days_studied: 0,
  });
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (user) {
      loadTodaysPlan();
      loadStreak();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadTodaysPlan = async () => {
    if (!isSupabaseConfigured() || !supabase || !user) {
      generateLocalPlan();
      return;
    }

    try {
      const { data: existingPlan, error } = await supabase
        .from('daily_plans')
        .select(`
          id,
          plan_date,
          status,
          daily_plan_items (
            id,
            type,
            title,
            description,
            target,
            recommended_minutes,
            completed_at,
            sort_order
          )
        `)
        .eq('user_id', user.id)
        .eq('plan_date', today)
        .single();

      if (existingPlan && !error) {
        setPlan({
          id: existingPlan.id,
          plan_date: existingPlan.plan_date,
          status: existingPlan.status,
          items: existingPlan.daily_plan_items || [],
        });
      } else {
        await createTodaysPlan();
      }
    } catch (err) {
      console.log('Error loading plan, using local:', err);
      generateLocalPlan();
    } finally {
      setLoading(false);
    }
  };

  const createTodaysPlan = async () => {
    if (!isSupabaseConfigured() || !supabase || !user) {
      generateLocalPlan();
      return;
    }

    try {
      const { data: newPlan, error: planError } = await supabase
        .from('daily_plans')
        .insert({
          user_id: user.id,
          plan_date: today,
          status: 'active',
        })
        .select()
        .single();

      if (planError) throw planError;

      const items = PLAN_ITEM_TEMPLATES.map((template, index) => ({
        plan_id: newPlan.id,
        type: template.type,
        title: template.title,
        description: template.description,
        target: template.target,
        recommended_minutes: template.recommended_minutes,
        sort_order: index,
      }));

      const { data: planItems, error: itemsError } = await supabase
        .from('daily_plan_items')
        .insert(items)
        .select();

      if (itemsError) throw itemsError;

      setPlan({
        id: newPlan.id,
        plan_date: newPlan.plan_date,
        status: newPlan.status,
        items: planItems || [],
      });
    } catch (err) {
      console.log('Error creating plan:', err);
      generateLocalPlan();
    }
  };

  const generateLocalPlan = () => {
    const localPlan: DailyPlan = {
      id: 'local-' + today,
      plan_date: today,
      status: 'active',
      items: PLAN_ITEM_TEMPLATES.map((template, index) => ({
        id: `local-item-${index}`,
        type: template.type,
        title: template.title,
        description: template.description,
        target: template.target,
        recommended_minutes: template.recommended_minutes,
        completed_at: null,
        sort_order: index,
      })),
    };
    setPlan(localPlan);
    setLoading(false);
  };

  const loadStreak = async () => {
    if (!isSupabaseConfigured() || !supabase || !user) {
      loadLocalStreak();
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data && !error) {
        setStreak(data);
      } else {
        await supabase.from('user_streaks').insert({
          user_id: user.id,
          current_streak: 0,
          longest_streak: 0,
          total_days_studied: 0,
        });
      }
    } catch (err) {
      console.log('Error loading streak:', err);
      loadLocalStreak();
    }
  };

  const loadLocalStreak = () => {
    const stored = localStorage.getItem('daily_streak');
    if (stored) {
      setStreak(JSON.parse(stored));
    }
  };

  const completeItem = async (itemId: string) => {
    if (!plan) return;
    setCompleting(itemId);

    const updatedItems = plan.items.map(item =>
      item.id === itemId ? { ...item, completed_at: new Date().toISOString() } : item
    );

    const allCompleted = updatedItems.every(item => item.completed_at);

    if (isSupabaseConfigured() && supabase && user && !itemId.startsWith('local')) {
      try {
        await supabase
          .from('daily_plan_items')
          .update({ completed_at: new Date().toISOString() })
          .eq('id', itemId);

        if (allCompleted) {
          await supabase
            .from('daily_plans')
            .update({ status: 'completed', updated_at: new Date().toISOString() })
            .eq('id', plan.id);

          await updateStreak();
        }
      } catch (err) {
        console.log('Error completing item:', err);
      }
    } else {
      if (allCompleted) {
        updateLocalStreak();
      }
    }

    setPlan({
      ...plan,
      status: allCompleted ? 'completed' : 'active',
      items: updatedItems,
    });
    setCompleting(null);
  };

  const updateStreak = async () => {
    if (!isSupabaseConfigured() || !supabase || !user) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak = 1;
    if (streak.last_completed_date === yesterdayStr) {
      newStreak = streak.current_streak + 1;
    } else if (streak.last_completed_date === today) {
      newStreak = streak.current_streak;
    }

    const newLongest = Math.max(streak.longest_streak, newStreak);

    try {
      await supabase
        .from('user_streaks')
        .upsert({
          user_id: user.id,
          current_streak: newStreak,
          longest_streak: newLongest,
          last_completed_date: today,
          total_days_studied: streak.total_days_studied + (streak.last_completed_date === today ? 0 : 1),
          updated_at: new Date().toISOString(),
        });

      setStreak({
        current_streak: newStreak,
        longest_streak: newLongest,
        last_completed_date: today,
        total_days_studied: streak.total_days_studied + (streak.last_completed_date === today ? 0 : 1),
      });
    } catch (err) {
      console.log('Error updating streak:', err);
    }
  };

  const updateLocalStreak = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak = 1;
    if (streak.last_completed_date === yesterdayStr) {
      newStreak = streak.current_streak + 1;
    } else if (streak.last_completed_date === today) {
      newStreak = streak.current_streak;
    }

    const newLongest = Math.max(streak.longest_streak, newStreak);
    const newStreakData = {
      current_streak: newStreak,
      longest_streak: newLongest,
      last_completed_date: today,
      total_days_studied: streak.total_days_studied + (streak.last_completed_date === today ? 0 : 1),
    };

    localStorage.setItem('daily_streak', JSON.stringify(newStreakData));
    setStreak(newStreakData);
  };

  const goToTask = (item: PlanItem) => {
    if (item.target?.path) {
      navigate(item.target.path);
    }
  };

  const completedCount = plan?.items.filter(item => item.completed_at).length || 0;
  const totalCount = plan?.items.length || 0;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const totalMinutes = plan?.items.reduce((acc, item) => acc + item.recommended_minutes, 0) || 0;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-indigo-600" />
            </div>
            <CardTitle>Daily Study Plan</CardTitle>
            <CardDescription>
              Sign in to get your personalized daily study plan and track your streak
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/login">
              <Button className="w-full">Sign In to Get Started</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Calendar className="h-7 w-7" />
                Today's Study Plan
              </h1>
              <p className="text-indigo-100 mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center bg-white/10 rounded-lg px-4 py-2">
                <div className="flex items-center gap-1 text-2xl font-bold">
                  <Flame className="h-6 w-6 text-orange-400" />
                  {streak.current_streak}
                </div>
                <div className="text-xs text-indigo-100">Day Streak</div>
              </div>
              <div className="text-center bg-white/10 rounded-lg px-4 py-2">
                <div className="flex items-center gap-1 text-2xl font-bold">
                  <Trophy className="h-6 w-6 text-yellow-400" />
                  {streak.longest_streak}
                </div>
                <div className="text-xs text-indigo-100">Best Streak</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Today's Progress</span>
              <span className="text-sm font-medium">{completedCount}/{totalCount} tasks</span>
            </div>
            <Progress value={progressPercent} className="h-3 bg-white/20" />
            <div className="flex items-center justify-between mt-2 text-xs text-indigo-100">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                ~{totalMinutes} minutes total
              </span>
              {plan?.status === 'completed' && (
                <span className="flex items-center gap-1 text-green-300">
                  <CheckCircle2 className="h-4 w-4" />
                  Completed!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {plan?.status === 'completed' ? (
          <Card className="mb-8 bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Trophy className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-green-800 mb-2">Great job!</h2>
                <p className="text-green-600 mb-4">
                  You've completed all your tasks for today. Keep up the streak!
                </p>
                <div className="flex justify-center gap-4">
                  <Link to="/progress">
                    <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                      View Progress
                    </Button>
                  </Link>
                  <Link to="/vocabulary">
                    <Button className="bg-green-600 hover:bg-green-700">
                      Continue Learning
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="mb-6">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Sparkles className="h-5 w-5 text-indigo-500" />
              <span className="font-medium">Your personalized tasks for today</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {plan?.items.map((item) => (
            <Card 
              key={item.id} 
              className={`transition-all ${item.completed_at ? 'bg-gray-50 opacity-75' : 'hover:shadow-md'}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold ${item.completed_at ? 'line-through text-gray-400' : ''}`}>
                        {item.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        ~{item.recommended_minutes} min
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.completed_at ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="h-6 w-6" />
                        <span className="text-sm font-medium">Done</span>
                      </div>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => goToTask(item)}
                        >
                          Start
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => completeItem(item.id)}
                          disabled={completing === item.id}
                        >
                          {completing === item.id ? (
                            <RotateCcw className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4" />
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-indigo-50 border-indigo-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Flame className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-indigo-800">Keep Your Streak Alive!</h3>
                <p className="text-sm text-indigo-600 mt-1">
                  Complete all tasks today to maintain your {streak.current_streak}-day streak. 
                  You've studied for {streak.total_days_studied} days total!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
