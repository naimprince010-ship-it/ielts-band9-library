import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export interface LessonProgress {
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  lastOpenedAt: string;
  timeSpentSeconds: number;
  completedAt?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  score: number;
  total: number;
  wrongQuestions: WrongQuestion[];
  completedAt: string;
}

export interface WrongQuestion {
  questionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  hint?: string;
}

export interface UserPreferences {
  targetBand: number;
  dailyGoalQuestions: number;
  focusAreas: string[];
}

export interface DailyActivity {
  date: string;
  questionsAnswered: number;
  lessonsTimeSeconds: number;
  lessonsCompleted: number;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
}

interface ProgressContextType {
  lessonProgress: Record<string, LessonProgress>;
  quizAttempts: QuizAttempt[];
  userPreferences: UserPreferences;
  dailyActivity: DailyActivity;
  streakData: StreakData;
  loading: boolean;
  
  updateLessonProgress: (lessonId: string, updates: Partial<LessonProgress>) => void;
  markLessonCompleted: (lessonId: string) => void;
  addQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => void;
  updateUserPreferences: (prefs: Partial<UserPreferences>) => void;
  incrementDailyQuestions: (count?: number) => void;
  addLessonTime: (seconds: number) => void;
  
  getRecentLessons: () => LessonProgress[];
  getCompletedLessonsCount: (type?: string) => number;
  getBestQuizScore: (quizId: string) => number | null;
  getAllWrongQuestions: () => WrongQuestion[];
  getTodayProgress: () => { questions: number; goal: number; percentage: number };
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEYS = {
  lessonProgress: 'ielts_lesson_progress',
  quizAttempts: 'ielts_quiz_attempts',
  userPreferences: 'ielts_user_preferences',
  dailyActivity: 'ielts_daily_activity',
  streakData: 'ielts_streak_data',
};

const DEFAULT_PREFERENCES: UserPreferences = {
  targetBand: 7,
  dailyGoalQuestions: 10,
  focusAreas: ['vocabulary', 'grammar'],
};

const DEFAULT_DAILY_ACTIVITY: DailyActivity = {
  date: new Date().toISOString().split('T')[0],
  questionsAnswered: 0,
  lessonsTimeSeconds: 0,
  lessonsCompleted: 0,
};

const DEFAULT_STREAK: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: '',
};

function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const [lessonProgress, setLessonProgress] = useState<Record<string, LessonProgress>>({});
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [dailyActivity, setDailyActivity] = useState<DailyActivity>(DEFAULT_DAILY_ACTIVITY);
  const [streakData, setStreakData] = useState<StreakData>(DEFAULT_STREAK);

  useEffect(() => {
    loadProgress();
  }, [user]);

  const loadProgress = async () => {
    setLoading(true);
    
    const storedLessonProgress = getFromStorage<Record<string, LessonProgress>>(STORAGE_KEYS.lessonProgress, {});
    const storedQuizAttempts = getFromStorage<QuizAttempt[]>(STORAGE_KEYS.quizAttempts, []);
    const storedPreferences = getFromStorage<UserPreferences>(STORAGE_KEYS.userPreferences, DEFAULT_PREFERENCES);
    const storedStreak = getFromStorage<StreakData>(STORAGE_KEYS.streakData, DEFAULT_STREAK);
    
    let storedDailyActivity = getFromStorage<DailyActivity>(STORAGE_KEYS.dailyActivity, DEFAULT_DAILY_ACTIVITY);
    const today = new Date().toISOString().split('T')[0];
    if (storedDailyActivity.date !== today) {
      updateStreak(storedDailyActivity, storedStreak);
      storedDailyActivity = { ...DEFAULT_DAILY_ACTIVITY, date: today };
      saveToStorage(STORAGE_KEYS.dailyActivity, storedDailyActivity);
    }
    
    setLessonProgress(storedLessonProgress);
    setQuizAttempts(storedQuizAttempts);
    setUserPreferences(storedPreferences);
    setDailyActivity(storedDailyActivity);
    setStreakData(storedStreak);
    
    if (user && isSupabaseConfigured() && supabase) {
      try {
        const { data: dbPrefs } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (dbPrefs) {
          const prefs: UserPreferences = {
            targetBand: dbPrefs.target_band || DEFAULT_PREFERENCES.targetBand,
            dailyGoalQuestions: dbPrefs.daily_goal_questions || DEFAULT_PREFERENCES.dailyGoalQuestions,
            focusAreas: dbPrefs.focus_areas || DEFAULT_PREFERENCES.focusAreas,
          };
          setUserPreferences(prefs);
          saveToStorage(STORAGE_KEYS.userPreferences, prefs);
        }
      } catch (e) {
        console.log('Could not load preferences from Supabase, using localStorage');
      }
    }
    
    setLoading(false);
  };

  const updateStreak = (activity: DailyActivity, streak: StreakData) => {
    const today = new Date();
    const lastActivity = streak.lastActivityDate ? new Date(streak.lastActivityDate) : null;
    
    if (activity.questionsAnswered > 0 || activity.lessonsCompleted > 0) {
      if (lastActivity) {
        const daysDiff = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff === 1) {
          streak.currentStreak += 1;
        } else if (daysDiff > 1) {
          streak.currentStreak = 1;
        }
      } else {
        streak.currentStreak = 1;
      }
      
      streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
      streak.lastActivityDate = activity.date;
    } else if (lastActivity) {
      const daysDiff = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff > 1) {
        streak.currentStreak = 0;
      }
    }
    
    setStreakData(streak);
    saveToStorage(STORAGE_KEYS.streakData, streak);
  };

  const updateLessonProgress = useCallback((lessonId: string, updates: Partial<LessonProgress>) => {
    setLessonProgress(prev => {
      const existing = prev[lessonId] || {
        lessonId,
        status: 'not_started',
        lastOpenedAt: new Date().toISOString(),
        timeSpentSeconds: 0,
      };
      
      const updated = {
        ...existing,
        ...updates,
        lastOpenedAt: new Date().toISOString(),
      };
      
      const newProgress = { ...prev, [lessonId]: updated };
      saveToStorage(STORAGE_KEYS.lessonProgress, newProgress);
      return newProgress;
    });
  }, []);

  const markLessonCompleted = useCallback((lessonId: string) => {
    updateLessonProgress(lessonId, {
      status: 'completed',
      completedAt: new Date().toISOString(),
    });
    
    setDailyActivity(prev => {
      const updated = { ...prev, lessonsCompleted: prev.lessonsCompleted + 1 };
      saveToStorage(STORAGE_KEYS.dailyActivity, updated);
      return updated;
    });
  }, [updateLessonProgress]);

  const addQuizAttempt = useCallback((attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => {
    const newAttempt: QuizAttempt = {
      ...attempt,
      id: `attempt-${Date.now()}`,
      completedAt: new Date().toISOString(),
    };
    
    setQuizAttempts(prev => {
      const updated = [...prev, newAttempt];
      saveToStorage(STORAGE_KEYS.quizAttempts, updated);
      return updated;
    });
    
    incrementDailyQuestions(attempt.total);
  }, []);

  const updateUserPreferences = useCallback(async (prefs: Partial<UserPreferences>) => {
    setUserPreferences(prev => {
      const updated = { ...prev, ...prefs };
      saveToStorage(STORAGE_KEYS.userPreferences, updated);
      return updated;
    });
    
    if (user && isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('user_preferences').upsert({
          user_id: user.id,
          target_band: prefs.targetBand,
          daily_goal_questions: prefs.dailyGoalQuestions,
          focus_areas: prefs.focusAreas,
          updated_at: new Date().toISOString(),
        });
      } catch (e) {
        console.log('Could not save preferences to Supabase');
      }
    }
  }, [user]);

  const incrementDailyQuestions = useCallback((count: number = 1) => {
    setDailyActivity(prev => {
      const today = new Date().toISOString().split('T')[0];
      const updated = prev.date === today 
        ? { ...prev, questionsAnswered: prev.questionsAnswered + count }
        : { ...DEFAULT_DAILY_ACTIVITY, date: today, questionsAnswered: count };
      saveToStorage(STORAGE_KEYS.dailyActivity, updated);
      return updated;
    });
  }, []);

  const addLessonTime = useCallback((seconds: number) => {
    setDailyActivity(prev => {
      const updated = { ...prev, lessonsTimeSeconds: prev.lessonsTimeSeconds + seconds };
      saveToStorage(STORAGE_KEYS.dailyActivity, updated);
      return updated;
    });
  }, []);

  const getRecentLessons = useCallback((): LessonProgress[] => {
    return Object.values(lessonProgress)
      .filter(p => p.status !== 'not_started')
      .sort((a, b) => new Date(b.lastOpenedAt).getTime() - new Date(a.lastOpenedAt).getTime())
      .slice(0, 5);
  }, [lessonProgress]);

  const getCompletedLessonsCount = useCallback((_type?: string): number => {
    return Object.values(lessonProgress).filter(p => p.status === 'completed').length;
  }, [lessonProgress]);

  const getBestQuizScore = useCallback((quizId: string): number | null => {
    const attempts = quizAttempts.filter(a => a.quizId === quizId);
    if (attempts.length === 0) return null;
    return Math.max(...attempts.map(a => Math.round((a.score / a.total) * 100)));
  }, [quizAttempts]);

  const getAllWrongQuestions = useCallback((): WrongQuestion[] => {
    const wrongMap = new Map<string, WrongQuestion>();
    
    quizAttempts
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
      .forEach(attempt => {
        attempt.wrongQuestions.forEach(wq => {
          if (!wrongMap.has(wq.questionId)) {
            wrongMap.set(wq.questionId, wq);
          }
        });
      });
    
    return Array.from(wrongMap.values()).slice(0, 50);
  }, [quizAttempts]);

  const getTodayProgress = useCallback(() => {
    const questions = dailyActivity.questionsAnswered;
    const goal = userPreferences.dailyGoalQuestions;
    const percentage = Math.min(100, Math.round((questions / goal) * 100));
    return { questions, goal, percentage };
  }, [dailyActivity.questionsAnswered, userPreferences.dailyGoalQuestions]);

  const value: ProgressContextType = {
    lessonProgress,
    quizAttempts,
    userPreferences,
    dailyActivity,
    streakData,
    loading,
    updateLessonProgress,
    markLessonCompleted,
    addQuizAttempt,
    updateUserPreferences,
    incrementDailyQuestions,
    addLessonTime,
    getRecentLessons,
    getCompletedLessonsCount,
    getBestQuizScore,
    getAllWrongQuestions,
    getTodayProgress,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
