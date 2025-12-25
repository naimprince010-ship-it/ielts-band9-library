import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useProgress } from '@/contexts/ProgressContext';
import { 
  Trophy, 
  Flame, 
  Target, 
  BookOpen, 
  Star,
  Award,
  Zap,
  Crown,
  Medal,
  Calendar,
  TrendingUp,
  Users,
  Share2
} from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'streak' | 'lessons' | 'quizzes' | 'special';
  requirement: number;
  unit: string;
  points: number;
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly';
  target: number;
  current: number;
  reward: string;
  expiresAt: string;
}

const ACHIEVEMENTS: Achievement[] = [
  // Streak achievements
  { id: 'streak-3', name: 'Getting Started', description: '3-day learning streak', icon: <Flame className="h-6 w-6" />, category: 'streak', requirement: 3, unit: 'days', points: 50 },
  { id: 'streak-7', name: 'Week Warrior', description: '7-day learning streak', icon: <Flame className="h-6 w-6" />, category: 'streak', requirement: 7, unit: 'days', points: 100 },
  { id: 'streak-14', name: 'Dedicated Learner', description: '14-day learning streak', icon: <Flame className="h-6 w-6" />, category: 'streak', requirement: 14, unit: 'days', points: 200 },
  { id: 'streak-30', name: 'Monthly Master', description: '30-day learning streak', icon: <Crown className="h-6 w-6" />, category: 'streak', requirement: 30, unit: 'days', points: 500 },
  { id: 'streak-100', name: 'Century Club', description: '100-day learning streak', icon: <Crown className="h-6 w-6" />, category: 'streak', requirement: 100, unit: 'days', points: 1000 },
  
  // Lesson achievements
  { id: 'lessons-5', name: 'First Steps', description: 'Complete 5 lessons', icon: <BookOpen className="h-6 w-6" />, category: 'lessons', requirement: 5, unit: 'lessons', points: 50 },
  { id: 'lessons-25', name: 'Knowledge Seeker', description: 'Complete 25 lessons', icon: <BookOpen className="h-6 w-6" />, category: 'lessons', requirement: 25, unit: 'lessons', points: 150 },
  { id: 'lessons-50', name: 'Vocabulary Builder', description: 'Complete 50 lessons', icon: <BookOpen className="h-6 w-6" />, category: 'lessons', requirement: 50, unit: 'lessons', points: 300 },
  { id: 'lessons-100', name: 'Word Master', description: 'Complete 100 lessons', icon: <Star className="h-6 w-6" />, category: 'lessons', requirement: 100, unit: 'lessons', points: 500 },
  { id: 'lessons-200', name: 'Library Champion', description: 'Complete 200 lessons', icon: <Trophy className="h-6 w-6" />, category: 'lessons', requirement: 200, unit: 'lessons', points: 1000 },
  
  // Quiz achievements
  { id: 'quiz-10', name: 'Quiz Starter', description: 'Complete 10 quizzes', icon: <Target className="h-6 w-6" />, category: 'quizzes', requirement: 10, unit: 'quizzes', points: 50 },
  { id: 'quiz-50', name: 'Quiz Pro', description: 'Complete 50 quizzes', icon: <Target className="h-6 w-6" />, category: 'quizzes', requirement: 50, unit: 'quizzes', points: 200 },
  { id: 'quiz-100', name: 'Quiz Master', description: 'Complete 100 quizzes', icon: <Medal className="h-6 w-6" />, category: 'quizzes', requirement: 100, unit: 'quizzes', points: 400 },
  { id: 'perfect-5', name: 'Perfect Five', description: 'Get 100% on 5 quizzes', icon: <Zap className="h-6 w-6" />, category: 'quizzes', requirement: 5, unit: 'perfect scores', points: 150 },
  { id: 'perfect-20', name: 'Perfectionist', description: 'Get 100% on 20 quizzes', icon: <Award className="h-6 w-6" />, category: 'quizzes', requirement: 20, unit: 'perfect scores', points: 500 },
  
  // Special achievements
  { id: 'diagnostic', name: 'Self-Aware', description: 'Complete the diagnostic test', icon: <TrendingUp className="h-6 w-6" />, category: 'special', requirement: 1, unit: 'test', points: 100 },
  { id: 'flashcards-100', name: 'Memory Master', description: 'Review 100 flashcards', icon: <Zap className="h-6 w-6" />, category: 'special', requirement: 100, unit: 'cards', points: 200 },
  { id: 'speaking-10', name: 'Voice Activated', description: 'Complete 10 speaking practices', icon: <Award className="h-6 w-6" />, category: 'special', requirement: 10, unit: 'sessions', points: 200 },
  { id: 'writing-5', name: 'Essay Writer', description: 'Complete 5 writing practices', icon: <Award className="h-6 w-6" />, category: 'special', requirement: 5, unit: 'essays', points: 200 },
];

const STORAGE_KEY = 'ielts_achievements';

interface UserAchievements {
  unlockedIds: string[];
  totalPoints: number;
  progress: Record<string, number>;
}

function getAchievements(): UserAchievements {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { unlockedIds: [], totalPoints: 0, progress: {} };
  } catch {
    return { unlockedIds: [], totalPoints: 0, progress: {} };
  }
}

function saveAchievements(data: UserAchievements): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function generateDailyChallenges(): Challenge[] {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  return [
    {
      id: `daily-vocab-${today.toISOString().split('T')[0]}`,
      name: 'Vocabulary Sprint',
      description: 'Complete 3 vocabulary lessons today',
      type: 'daily',
      target: 3,
      current: 0,
      reward: '50 points',
      expiresAt: tomorrow.toISOString()
    },
    {
      id: `daily-quiz-${today.toISOString().split('T')[0]}`,
      name: 'Quiz Champion',
      description: 'Answer 20 quiz questions today',
      type: 'daily',
      target: 20,
      current: 0,
      reward: '30 points',
      expiresAt: tomorrow.toISOString()
    },
    {
      id: `daily-flashcard-${today.toISOString().split('T')[0]}`,
      name: 'Memory Boost',
      description: 'Review 15 flashcards today',
      type: 'daily',
      target: 15,
      current: 0,
      reward: '25 points',
      expiresAt: tomorrow.toISOString()
    },
  ];
}

function generateWeeklyChallenges(): Challenge[] {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + (7 - nextWeek.getDay()));
  nextWeek.setHours(23, 59, 59, 999);
  
  const weekNum = Math.ceil((today.getDate()) / 7);
  
  return [
    {
      id: `weekly-streak-${weekNum}`,
      name: '7-Day Streak',
      description: 'Maintain a 7-day learning streak',
      type: 'weekly',
      target: 7,
      current: 0,
      reward: '200 points + Badge',
      expiresAt: nextWeek.toISOString()
    },
    {
      id: `weekly-lessons-${weekNum}`,
      name: 'Weekly Scholar',
      description: 'Complete 10 lessons this week',
      type: 'weekly',
      target: 10,
      current: 0,
      reward: '150 points',
      expiresAt: nextWeek.toISOString()
    },
    {
      id: `weekly-perfect-${weekNum}`,
      name: 'Perfect Week',
      description: 'Get 100% on 3 quizzes this week',
      type: 'weekly',
      target: 3,
      current: 0,
      reward: '100 points',
      expiresAt: nextWeek.toISOString()
    },
  ];
}

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Sarah K.', points: 12500, streak: 45, avatar: '👩‍🎓' },
  { rank: 2, name: 'Ahmed M.', points: 11200, streak: 38, avatar: '👨‍💼' },
  { rank: 3, name: 'Li Wei', points: 10800, streak: 42, avatar: '👨‍🎓' },
  { rank: 4, name: 'Maria G.', points: 9500, streak: 30, avatar: '👩‍💻' },
  { rank: 5, name: 'John D.', points: 8900, streak: 28, avatar: '👨‍🏫' },
  { rank: 6, name: 'Priya S.', points: 8200, streak: 25, avatar: '👩‍🔬' },
  { rank: 7, name: 'David L.', points: 7800, streak: 22, avatar: '👨‍🎨' },
  { rank: 8, name: 'Emma W.', points: 7200, streak: 20, avatar: '👩‍🏫' },
  { rank: 9, name: 'Chen Y.', points: 6800, streak: 18, avatar: '👨‍💻' },
  { rank: 10, name: 'Anna B.', points: 6500, streak: 15, avatar: '👩‍🎨' },
];

export default function AchievementsPage() {
  const { streakData, quizAttempts, getCompletedLessonsCount } = useProgress();
  const [userAchievements, setUserAchievements] = useState<UserAchievements>(getAchievements());
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [activeTab, setActiveTab] = useState<'achievements' | 'challenges' | 'leaderboard'>('achievements');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const dailyChallenges = generateDailyChallenges();
    const weeklyChallenges = generateWeeklyChallenges();
    setChallenges([...dailyChallenges, ...weeklyChallenges]);
    
    updateProgress();
  }, []);

  const updateProgress = () => {
    const completedLessons = getCompletedLessonsCount();
    const totalQuizzes = quizAttempts.length;
    const perfectQuizzes = quizAttempts.filter(a => a.score === a.total).length;
    
    const progress: Record<string, number> = {
      streak: streakData.currentStreak,
      longestStreak: streakData.longestStreak,
      lessons: completedLessons,
      quizzes: totalQuizzes,
      perfectScores: perfectQuizzes,
    };
    
    const newUnlocked: string[] = [];
    let newPoints = userAchievements.totalPoints;
    
    ACHIEVEMENTS.forEach(achievement => {
      if (userAchievements.unlockedIds.includes(achievement.id)) return;
      
      let currentProgress = 0;
      if (achievement.category === 'streak') {
        currentProgress = Math.max(streakData.currentStreak, streakData.longestStreak);
      } else if (achievement.category === 'lessons') {
        currentProgress = completedLessons;
      } else if (achievement.category === 'quizzes') {
        if (achievement.id.includes('perfect')) {
          currentProgress = perfectQuizzes;
        } else {
          currentProgress = totalQuizzes;
        }
      }
      
      progress[achievement.id] = currentProgress;
      
      if (currentProgress >= achievement.requirement) {
        newUnlocked.push(achievement.id);
        newPoints += achievement.points;
      }
    });
    
    if (newUnlocked.length > 0) {
      const updated = {
        unlockedIds: [...userAchievements.unlockedIds, ...newUnlocked],
        totalPoints: newPoints,
        progress
      };
      setUserAchievements(updated);
      saveAchievements(updated);
    } else {
      setUserAchievements(prev => ({ ...prev, progress }));
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? ACHIEVEMENTS 
    : ACHIEVEMENTS.filter(a => a.category === selectedCategory);

  const unlockedCount = userAchievements.unlockedIds.length;
  const totalAchievements = ACHIEVEMENTS.length;

  const shareProgress = () => {
    const text = `I've earned ${userAchievements.totalPoints} points and unlocked ${unlockedCount} achievements on IELTS Tree! 🎯 Join me at ieltstree.com`;
    if (navigator.share) {
      navigator.share({ text, url: 'https://www.ieltstree.com' });
    } else {
      navigator.clipboard.writeText(text);
      alert('Progress copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="border-2 border-purple-100 mb-6">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Trophy className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-2xl">Achievements & Challenges</CardTitle>
            <CardDescription>Track your progress and earn rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{userAchievements.totalPoints}</p>
                <p className="text-sm text-gray-500">Total Points</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <p className="text-2xl font-bold text-amber-600">{unlockedCount}/{totalAchievements}</p>
                <p className="text-sm text-gray-500">Achievements</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{streakData.currentStreak}</p>
                <p className="text-sm text-gray-500">Day Streak</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{streakData.longestStreak}</p>
                <p className="text-sm text-gray-500">Best Streak</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <Button variant="outline" size="sm" onClick={shareProgress}>
                <Share2 className="h-4 w-4 mr-2" />
                Share Progress
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'achievements' ? 'default' : 'outline'}
            onClick={() => setActiveTab('achievements')}
            className="flex-1"
          >
            <Award className="h-4 w-4 mr-2" />
            Achievements
          </Button>
          <Button
            variant={activeTab === 'challenges' ? 'default' : 'outline'}
            onClick={() => setActiveTab('challenges')}
            className="flex-1"
          >
            <Target className="h-4 w-4 mr-2" />
            Challenges
          </Button>
          <Button
            variant={activeTab === 'leaderboard' ? 'default' : 'outline'}
            onClick={() => setActiveTab('leaderboard')}
            className="flex-1"
          >
            <Users className="h-4 w-4 mr-2" />
            Leaderboard
          </Button>
        </div>

        {activeTab === 'achievements' && (
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {['all', 'streak', 'lessons', 'quizzes', 'special'].map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAchievements.map(achievement => {
                const isUnlocked = userAchievements.unlockedIds.includes(achievement.id);
                const progress = userAchievements.progress[achievement.id] || 0;
                const progressPercent = Math.min(100, (progress / achievement.requirement) * 100);
                
                return (
                  <Card 
                    key={achievement.id}
                    className={`transition-all ${isUnlocked ? 'border-purple-300 bg-purple-50' : 'opacity-75'}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full ${
                          isUnlocked ? 'bg-purple-200 text-purple-700' : 'bg-gray-200 text-gray-500'
                        }`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{achievement.name}</h3>
                            {isUnlocked && (
                              <Badge className="bg-purple-600">Unlocked!</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{achievement.description}</p>
                          
                          {!isUnlocked && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>{progress} / {achievement.requirement} {achievement.unit}</span>
                                <span>{Math.round(progressPercent)}%</span>
                              </div>
                              <Progress value={progressPercent} className="h-2" />
                            </div>
                          )}
                          
                          <div className="flex items-center gap-1 mt-2 text-sm">
                            <Star className="h-4 w-4 text-amber-500" />
                            <span className="font-medium">{achievement.points} points</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Daily Challenges
              </h3>
              <div className="space-y-3">
                {challenges.filter(c => c.type === 'daily').map(challenge => (
                  <Card key={challenge.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{challenge.name}</h4>
                          <p className="text-sm text-gray-500">{challenge.description}</p>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          {challenge.reward}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{challenge.current} / {challenge.target}</span>
                          <span className="text-gray-500">
                            Expires: {new Date(challenge.expiresAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <Progress value={(challenge.current / challenge.target) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Weekly Challenges
              </h3>
              <div className="space-y-3">
                {challenges.filter(c => c.type === 'weekly').map(challenge => (
                  <Card key={challenge.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{challenge.name}</h4>
                          <p className="text-sm text-gray-500">{challenge.description}</p>
                        </div>
                        <Badge variant="outline" className="text-purple-600 border-purple-300">
                          {challenge.reward}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{challenge.current} / {challenge.target}</span>
                          <span className="text-gray-500">
                            Ends: {new Date(challenge.expiresAt).toLocaleDateString()}
                          </span>
                        </div>
                        <Progress value={(challenge.current / challenge.target) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Global Leaderboard
              </CardTitle>
              <CardDescription>Top learners this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {MOCK_LEADERBOARD.map((user, index) => (
                  <div 
                    key={user.rank}
                    className={`flex items-center gap-4 p-3 rounded-lg ${
                      index < 3 ? 'bg-gradient-to-r from-amber-50 to-yellow-50' : 'bg-gray-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-400 text-yellow-900' :
                      index === 1 ? 'bg-gray-300 text-gray-700' :
                      index === 2 ? 'bg-amber-600 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {user.rank}
                    </div>
                    <div className="text-2xl">{user.avatar}</div>
                    <div className="flex-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.streak} day streak</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600">{user.points.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                    ?
                  </div>
                  <div className="text-2xl">🎯</div>
                  <div className="flex-1">
                    <p className="font-medium">You</p>
                    <p className="text-sm text-gray-500">{streakData.currentStreak} day streak</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">{userAchievements.totalPoints.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
