import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Spinner } from '@/components/ui/spinner';
import {
  User,
  Mail,
  Calendar,
  Shield,
  LogOut,
  Crown,
  BookOpen,
  Target,
  Award,
  Settings,
  Bell,
  Edit3,
  CheckCircle2,
  Clock,
  TrendingUp,
  Sparkles,
  CreditCard,
  ChevronRight,
  Star,
  Zap,
  Gift
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface UserStats {
  lessonsCompleted: number;
  vocabularyLearned: number;
  streakDays: number;
  totalXP: number;
}

export function ProfilePage() {
  const { user, loading: authLoading, session, isAdmin, isInstructor, isPremium, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<UserStats>({
    lessonsCompleted: 0,
    vocabularyLearned: 0,
    streakDays: 0,
    totalXP: 0
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user && !session) {
      navigate('/login');
      return;
    }
    if (user) {
      fetchUserStats();
    }
  }, [user, authLoading, session, navigate]);

  const authPending = authLoading || (!!session && !user);
  if (authPending) {
    return (
      <Layout>
        <div className="flex min-h-[40vh] items-center justify-center" role="status" aria-live="polite">
          <Spinner className="size-8 text-accent" />
        </div>
      </Layout>
    );
  }

  const fetchUserStats = async () => {
    if (!user) return;
    if (!supabase) {
      setStatsLoading(false);
      return;
    }

    try {
      // Fetch user activity stats
      const { data: activityData } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', user.id);
      
      // Fetch streak data
      const { data: streakData } = await supabase
        .from('user_streaks')
        .select('current_streak, total_xp')
        .eq('user_id', user.id)
        .single();
      
      // Fetch vocabulary progress
      const { data: vocabData } = await supabase
        .from('srs_items')
        .select('id')
        .eq('user_id', user.id);

      setStats({
        lessonsCompleted: activityData?.filter(a => a.activity_type === 'lesson_complete').length || 0,
        vocabularyLearned: vocabData?.length || 0,
        streakDays: streakData?.current_streak || 0,
        totalXP: streakData?.total_xp || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  if (!user) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const premiumUntil = user.premium_until ? new Date(user.premium_until) : null;
  const now = new Date();
  const daysRemaining = premiumUntil 
    ? Math.ceil((premiumUntil.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const isExpired = premiumUntil && premiumUntil < now;

  const getPackageLabel = () => {
    if (isAdmin) return 'Full access';
    if (isInstructor) return 'Instructor access';
    if (user.package_type === 'yearly') return 'Yearly Premium';
    if (user.package_type === 'monthly') return 'Monthly Premium';
    return 'Premium';
  };

  const showPaidSubscriptionBilling =
    isPremium && !isAdmin && !isInstructor && user.subscription_status === 'premium';

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
        {/* Hero Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-accent to-accent/60 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white/20">
                  <span className="text-4xl sm:text-5xl font-bold text-white">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                {isPremium && (
                  <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-2 shadow-lg">
                    <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                )}
              </div>
              
              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    {isAdmin && (
                      <Badge className="bg-accent text-accent-foreground">
                        <Shield className="h-3 w-3 mr-1" />
                        Admin
                      </Badge>
                    )}
                    {isPremium ? (
                      <Badge className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                        <Crown className="h-3 w-3 mr-1" />
                        {getPackageLabel()}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-white/10 text-white/70">
                        Free Plan
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-white/70 flex items-center justify-center sm:justify-start gap-2 mb-4">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {user.created_at ? formatDate(user.created_at) : 'N/A'}
                  </span>
                  {showPaidSubscriptionBilling && !isExpired && (
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Clock className="h-4 w-4" />
                      {daysRemaining} days remaining
                    </span>
                  )}
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
                >
                  <Bell className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.lessonsCompleted}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Lessons Done</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.vocabularyLearned}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Words Learned</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.streakDays}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Day Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                    <Star className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.totalXP}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Total XP</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Tabs defaultValue="subscription" className="space-y-6">
            <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex bg-muted/50 p-1 rounded-xl">
              <TabsTrigger value="subscription" className="rounded-lg data-[state=active]:bg-background">
                <Crown className="h-4 w-4 mr-2 hidden sm:inline" />
                Subscription
              </TabsTrigger>
              <TabsTrigger value="progress" className="rounded-lg data-[state=active]:bg-background">
                <TrendingUp className="h-4 w-4 mr-2 hidden sm:inline" />
                Progress
              </TabsTrigger>
              <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-background">
                <Settings className="h-4 w-4 mr-2 hidden sm:inline" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Subscription Tab */}
            <TabsContent value="subscription" className="space-y-6">
              {isPremium ? (
                <Card className="border-yellow-200 dark:border-yellow-900/50 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                          <Crown className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-foreground">{getPackageLabel()}</CardTitle>
                          <CardDescription>
                            {isAdmin || isInstructor
                              ? 'Lifetime full access to all courses and premium content on this platform.'
                              : 'Full access to all premium content'}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-green-500 text-white w-fit">Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {showPaidSubscriptionBilling ? (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white/60 dark:bg-slate-900/40 rounded-xl">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <CreditCard className="h-4 w-4" />
                            <span className="text-sm">Package</span>
                          </div>
                          <p className="font-semibold text-foreground">
                            {user.package_type === 'yearly' ? '৳2,499/year' : '৳299/month'}
                          </p>
                        </div>
                        <div className="p-4 bg-white/60 dark:bg-slate-900/40 rounded-xl">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">Valid Until</span>
                          </div>
                          <p className="font-semibold text-foreground">
                            {premiumUntil ? premiumUntil.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Lifetime'}
                          </p>
                        </div>
                        <div className="p-4 bg-white/60 dark:bg-slate-900/40 rounded-xl">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">Remaining</span>
                          </div>
                          <p className={`font-semibold ${daysRemaining <= 7 ? 'text-orange-600' : 'text-green-600'}`}>
                            {daysRemaining} days
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white/60 dark:bg-slate-900/40 rounded-xl">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Shield className="h-4 w-4" />
                            <span className="text-sm">Access</span>
                          </div>
                          <p className="font-semibold text-foreground">Lifetime — all features</p>
                        </div>
                        <div className="p-4 bg-white/60 dark:bg-slate-900/40 rounded-xl">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">Billing</span>
                          </div>
                          <p className="font-semibold text-foreground">Not required for your account</p>
                        </div>
                      </div>
                    )}

                    {/* Premium Features */}
                    <div className="p-4 bg-white/60 dark:bg-slate-900/40 rounded-xl">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-yellow-600" />
                        Your Premium Benefits
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          'Unlimited vocabulary lessons',
                          'All grammar courses',
                          'Speaking practice modules',
                          'Writing task feedback',
                          'Mock tests access',
                          'Priority support'
                        ].map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-border">
                  <CardContent className="py-12 text-center">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                      <Crown className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Unlock Premium</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Get unlimited access to all vocabulary, grammar lessons, and exclusive IELTS content.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link to="/pricing">
                        <Button className="bg-accent hover:bg-accent/90 w-full sm:w-auto">
                          <Crown className="h-4 w-4 mr-2" />
                          View Premium Plans
                        </Button>
                      </Link>
                      <Link to="/pricing">
                        <Button variant="outline" className="w-full sm:w-auto">
                          <Gift className="h-4 w-4 mr-2" />
                          Get 7-Day Trial
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/pricing">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium">Billing & Plans</p>
                          <p className="text-sm text-muted-foreground">Manage your subscription</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/daily-plan">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                          <Target className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Daily Study Plan</p>
                          <p className="text-sm text-muted-foreground">Track your progress</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-accent" />
                    Learning Progress
                  </CardTitle>
                  <CardDescription>Track your IELTS preparation journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Vocabulary Mastery</span>
                        <span className="text-sm text-muted-foreground">{Math.min(stats.vocabularyLearned, 500)}/500</span>
                      </div>
                      <Progress value={(stats.vocabularyLearned / 500) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Lessons Completed</span>
                        <span className="text-sm text-muted-foreground">{stats.lessonsCompleted}/50</span>
                      </div>
                      <Progress value={(stats.lessonsCompleted / 50) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">XP Progress</span>
                        <span className="text-sm text-muted-foreground">{stats.totalXP}/10000</span>
                      </div>
                      <Progress value={(stats.totalXP / 10000) * 100} className="h-2" />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-4">Quick Actions</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <Link to="/vocabulary">
                        <Button variant="outline" className="w-full h-auto py-3 flex-col gap-1">
                          <BookOpen className="h-5 w-5" />
                          <span className="text-xs">Vocabulary</span>
                        </Button>
                      </Link>
                      <Link to="/grammar">
                        <Button variant="outline" className="w-full h-auto py-3 flex-col gap-1">
                          <Edit3 className="h-5 w-5" />
                          <span className="text-xs">Grammar</span>
                        </Button>
                      </Link>
                      <Link to="/mock-test">
                        <Button variant="outline" className="w-full h-auto py-3 flex-col gap-1">
                          <Target className="h-5 w-5" />
                          <span className="text-xs">Mock Test</span>
                        </Button>
                      </Link>
                      <Link to="/flashcards">
                        <Button variant="outline" className="w-full h-auto py-3 flex-col gap-1">
                          <Sparkles className="h-5 w-5" />
                          <span className="text-xs">Flashcards</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-accent" />
                    Account Information
                  </CardTitle>
                  <CardDescription>Manage your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <User className="h-4 w-4" />
                        <span className="text-sm">Full Name</span>
                      </div>
                      <p className="font-semibold text-foreground">{user.name}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">Email Address</span>
                      </div>
                      <p className="font-semibold text-foreground">{user.email}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Member Since</span>
                      </div>
                      <p className="font-semibold text-foreground">
                        {user.created_at ? formatDate(user.created_at) : 'N/A'}
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Shield className="h-4 w-4" />
                        <span className="text-sm">Account Type</span>
                      </div>
                      <p className="font-semibold text-foreground">
                        {isAdmin ? 'Administrator' : 'Member'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <LogOut className="h-5 w-5" />
                    Account Actions
                  </CardTitle>
                  <CardDescription>Sign out or manage account access</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="text-destructive border-destructive/30 hover:bg-destructive/10"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
