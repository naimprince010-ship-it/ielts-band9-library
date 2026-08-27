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

export interface CollectionProgress {
  collectionId: string;
  startedAt: string;
  completedLessons: string[];
  lastLessonIndex: number;
  completedAt?: string;
}

interface ProgressContextType {
  lessonProgress: Record<string, LessonProgress>;
  quizAttempts: QuizAttempt[];
  userPreferences: UserPreferences;
  dailyActivity: DailyActivity;
  streakData: StreakData;
  collectionProgress: Record<string, CollectionProgress>;
  loading: boolean;
  
  updateLessonProgress: (lessonId: string, updates: Partial<LessonProgress>) => void;
  markLessonCompleted: (lessonId: string) => void;
  addQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => void;
  updateUserPreferences: (prefs: Partial<UserPreferences>) => void;
  incrementDailyQuestions: (count?: number) => void;
  addLessonTime: (seconds: number) => void;
  
  startCollection: (collectionId: string) => void;
  markCollectionLessonComplete: (collectionId: string, lessonIndex: number, lessonTitle: string) => void;
  getCollectionProgress: (collectionId: string) => CollectionProgress | null;
  getAllCollectionProgress: () => CollectionProgress[];
  getContinueCollection: () => { collectionId: string; lessonIndex: number } | null;
  
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
  collectionProgress: 'ielts_collection_progress',
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

function deriveStreak(activities: DailyActivity[]): StreakData {
  const activeDates = [...new Set(
    activities
      .filter((activity) => activity.questionsAnswered > 0 || activity.lessonsCompleted > 0)
      .map((activity) => activity.date),
  )].sort().reverse();
  if (activeDates.length === 0) return DEFAULT_STREAK;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const latest = new Date(`${activeDates[0]}T00:00:00`);
  const latestGap = Math.round((today.getTime() - latest.getTime()) / 86_400_000);
  if (latestGap > 1) return { ...DEFAULT_STREAK, lastActivityDate: activeDates[0] };

  let currentStreak = 1;
  for (let index = 1; index < activeDates.length; index += 1) {
    const previous = new Date(`${activeDates[index - 1]}T00:00:00`);
    const current = new Date(`${activeDates[index]}T00:00:00`);
    if (Math.round((previous.getTime() - current.getTime()) / 86_400_000) !== 1) break;
    currentStreak += 1;
  }
  return { currentStreak, longestStreak: currentStreak, lastActivityDate: activeDates[0] };
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const [lessonProgress, setLessonProgress] = useState<Record<string, LessonProgress>>({});
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [dailyActivity, setDailyActivity] = useState<DailyActivity>(DEFAULT_DAILY_ACTIVITY);
  const [streakData, setStreakData] = useState<StreakData>(DEFAULT_STREAK);
  const [collectionProgress, setCollectionProgress] = useState<Record<string, CollectionProgress>>({});

  useEffect(() => {
    loadProgress();
  }, [user]);

  const loadProgress = async () => {
    setLoading(true);
    
    const storedLessonProgress = getFromStorage<Record<string, LessonProgress>>(STORAGE_KEYS.lessonProgress, {});
    const storedQuizAttempts = getFromStorage<QuizAttempt[]>(STORAGE_KEYS.quizAttempts, []);
    const storedPreferences = getFromStorage<UserPreferences>(STORAGE_KEYS.userPreferences, DEFAULT_PREFERENCES);
    const storedStreak = getFromStorage<StreakData>(STORAGE_KEYS.streakData, DEFAULT_STREAK);
    const storedCollectionProgress = getFromStorage<Record<string, CollectionProgress>>(STORAGE_KEYS.collectionProgress, {});
    
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
    setCollectionProgress(storedCollectionProgress);
    
    if (user && isSupabaseConfigured() && supabase) {
      try {
        const [preferencesResult, progressResult, activityResult] = await Promise.all([
          supabase.from('user_preferences').select('*').eq('user_id', user.id).maybeSingle(),
          supabase.from('student_lesson_progress').select('*').eq('user_id', user.id),
          supabase.from('student_daily_activity').select('*').eq('user_id', user.id).order('activity_date', { ascending: false }).limit(60),
        ]);
        const dbPrefs = preferencesResult.data;
        
        if (dbPrefs) {
          const prefs: UserPreferences = {
            targetBand: dbPrefs.target_band || DEFAULT_PREFERENCES.targetBand,
            dailyGoalQuestions: dbPrefs.daily_goal_questions || DEFAULT_PREFERENCES.dailyGoalQuestions,
            focusAreas: dbPrefs.focus_areas || DEFAULT_PREFERENCES.focusAreas,
          };
          setUserPreferences(prefs);
          saveToStorage(STORAGE_KEYS.userPreferences, prefs);
        }
        if (progressResult.data) {
          const progress = Object.fromEntries(progressResult.data.map((row) => [row.lesson_id, {
            lessonId: row.lesson_id,
            status: row.status as LessonProgress['status'],
            lastOpenedAt: row.last_opened_at,
            timeSpentSeconds: row.time_spent_seconds,
            completedAt: row.completed_at || undefined,
          }])) as Record<string, LessonProgress>;
          setLessonProgress(progress);
          saveToStorage(STORAGE_KEYS.lessonProgress, progress);
        }
        if (activityResult.data) {
          const activities: DailyActivity[] = activityResult.data.map((row) => ({
            date: row.activity_date,
            questionsAnswered: row.questions_answered,
            lessonsTimeSeconds: row.lesson_time_seconds,
            lessonsCompleted: row.lessons_completed,
          }));
          const todayActivity = activities.find((activity) => activity.date === today) || { ...DEFAULT_DAILY_ACTIVITY, date: today };
          const streak = deriveStreak(activities);
          setDailyActivity(todayActivity);
          setStreakData(streak);
          saveToStorage(STORAGE_KEYS.dailyActivity, todayActivity);
          saveToStorage(STORAGE_KEYS.streakData, streak);
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

  const persistLessonProgress = useCallback((progress: LessonProgress) => {
    if (!user || !isSupabaseConfigured() || !supabase) return;
    void supabase.from('student_lesson_progress').upsert({
      user_id: user.id,
      lesson_id: progress.lessonId,
      status: progress.status,
      last_opened_at: progress.lastOpenedAt,
      time_spent_seconds: progress.timeSpentSeconds,
      completed_at: progress.completedAt || null,
    }).then(({ error }) => {
      if (error) console.error('Could not save lesson progress:', error.message);
    });
  }, [user]);

  const persistDailyActivity = useCallback((activity: DailyActivity) => {
    if (!user || !isSupabaseConfigured() || !supabase) return;
    void supabase.from('student_daily_activity').upsert({
      user_id: user.id,
      activity_date: activity.date,
      questions_answered: activity.questionsAnswered,
      lesson_time_seconds: activity.lessonsTimeSeconds,
      lessons_completed: activity.lessonsCompleted,
      updated_at: new Date().toISOString(),
    }).then(({ error }) => {
      if (error) console.error('Could not save daily activity:', error.message);
    });
  }, [user]);

  const recordCurrentStreak = useCallback((activity: DailyActivity) => {
    if (activity.questionsAnswered === 0 && activity.lessonsCompleted === 0) return;
    setStreakData((previous) => {
      if (previous.lastActivityDate === activity.date) return previous;
      const previousDate = previous.lastActivityDate ? new Date(`${previous.lastActivityDate}T00:00:00`) : null;
      const currentDate = new Date(`${activity.date}T00:00:00`);
      const gap = previousDate ? Math.round((currentDate.getTime() - previousDate.getTime()) / 86_400_000) : 0;
      const currentStreak = gap === 1 ? previous.currentStreak + 1 : 1;
      const next = {
        currentStreak,
        longestStreak: Math.max(previous.longestStreak, currentStreak),
        lastActivityDate: activity.date,
      };
      saveToStorage(STORAGE_KEYS.streakData, next);
      return next;
    });
  }, []);

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
      persistLessonProgress(updated);
      return newProgress;
    });
  }, [persistLessonProgress]);

  const markLessonCompleted = useCallback((lessonId: string) => {
    updateLessonProgress(lessonId, {
      status: 'completed',
      completedAt: new Date().toISOString(),
    });
    
    setDailyActivity(prev => {
      const updated = { ...prev, lessonsCompleted: prev.lessonsCompleted + 1 };
      saveToStorage(STORAGE_KEYS.dailyActivity, updated);
      persistDailyActivity(updated);
      recordCurrentStreak(updated);
      return updated;
    });
  }, [persistDailyActivity, recordCurrentStreak, updateLessonProgress]);

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
        const { error } = await supabase.from('user_preferences').upsert({
          user_id: user.id,
          target_band: prefs.targetBand ?? userPreferences.targetBand,
          daily_goal_questions: prefs.dailyGoalQuestions ?? userPreferences.dailyGoalQuestions,
          focus_areas: prefs.focusAreas ?? userPreferences.focusAreas,
          updated_at: new Date().toISOString(),
        });
        if (error) throw error;
      } catch (e) {
        console.log('Could not save preferences to Supabase');
      }
    }
  }, [user, userPreferences]);

  const incrementDailyQuestions = useCallback((count: number = 1) => {
    setDailyActivity(prev => {
      const today = new Date().toISOString().split('T')[0];
      const updated = prev.date === today 
        ? { ...prev, questionsAnswered: prev.questionsAnswered + count }
        : { ...DEFAULT_DAILY_ACTIVITY, date: today, questionsAnswered: count };
      saveToStorage(STORAGE_KEYS.dailyActivity, updated);
      persistDailyActivity(updated);
      recordCurrentStreak(updated);
      return updated;
    });
  }, [persistDailyActivity, recordCurrentStreak]);

  const addLessonTime = useCallback((seconds: number) => {
    setDailyActivity(prev => {
      const updated = { ...prev, lessonsTimeSeconds: prev.lessonsTimeSeconds + seconds };
      saveToStorage(STORAGE_KEYS.dailyActivity, updated);
      persistDailyActivity(updated);
      return updated;
    });
  }, [persistDailyActivity]);

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

  const startCollection = useCallback((collectionId: string) => {
    setCollectionProgress(prev => {
      if (prev[collectionId]) {
        return prev;
      }
      const newProgress: CollectionProgress = {
        collectionId,
        startedAt: new Date().toISOString(),
        completedLessons: [],
        lastLessonIndex: 0,
      };
      const updated = { ...prev, [collectionId]: newProgress };
      saveToStorage(STORAGE_KEYS.collectionProgress, updated);
      return updated;
    });
  }, []);

  const markCollectionLessonComplete = useCallback((collectionId: string, lessonIndex: number, lessonTitle: string) => {
    setCollectionProgress(prev => {
      const existing = prev[collectionId];
      if (!existing) {
        const newProgress: CollectionProgress = {
          collectionId,
          startedAt: new Date().toISOString(),
          completedLessons: [lessonTitle],
          lastLessonIndex: lessonIndex,
        };
        const updated = { ...prev, [collectionId]: newProgress };
        saveToStorage(STORAGE_KEYS.collectionProgress, updated);
        return updated;
      }
      
      const completedLessons = existing.completedLessons.includes(lessonTitle)
        ? existing.completedLessons
        : [...existing.completedLessons, lessonTitle];
      
      const updatedProgress: CollectionProgress = {
        ...existing,
        completedLessons,
        lastLessonIndex: Math.max(existing.lastLessonIndex, lessonIndex),
      };
      
      const updated = { ...prev, [collectionId]: updatedProgress };
      saveToStorage(STORAGE_KEYS.collectionProgress, updated);
      return updated;
    });
  }, []);

  const getCollectionProgress = useCallback((collectionId: string): CollectionProgress | null => {
    return collectionProgress[collectionId] || null;
  }, [collectionProgress]);

  const getAllCollectionProgress = useCallback((): CollectionProgress[] => {
    return Object.values(collectionProgress);
  }, [collectionProgress]);

  const getContinueCollection = useCallback((): { collectionId: string; lessonIndex: number } | null => {
    const inProgressCollections = Object.values(collectionProgress)
      .filter(cp => !cp.completedAt)
      .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
    
    if (inProgressCollections.length === 0) return null;
    
    const mostRecent = inProgressCollections[0];
    return {
      collectionId: mostRecent.collectionId,
      lessonIndex: mostRecent.lastLessonIndex,
    };
  }, [collectionProgress]);

  const value: ProgressContextType = {
    lessonProgress,
    quizAttempts,
    userPreferences,
    dailyActivity,
    streakData,
    collectionProgress,
    loading,
    updateLessonProgress,
    markLessonCompleted,
    addQuizAttempt,
    updateUserPreferences,
    incrementDailyQuestions,
    addLessonTime,
    startCollection,
    markCollectionLessonComplete,
    getCollectionProgress,
    getAllCollectionProgress,
    getContinueCollection,
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
