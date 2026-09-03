import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Lesson, LessonType, LessonLevel, Bookmark, UserLessonProgress, LessonProgress } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import { SAMPLE_LESSONS } from '@/data/sampleLessons';
import { fromListeningLessonRow, listeningLessonDataSchema, toListeningLessonRow } from '@/modules/listening/listeningLesson';
import { fromReadingLessonRow, readingLessonDataSchema, toReadingLessonRow } from '@/modules/reading/readingLesson';

interface LessonContextType {
  lessons: Lesson[];
  bookmarks: Bookmark[];
  progress: UserLessonProgress[];
  loading: boolean;
  fetchLessons: (type?: LessonType, level?: LessonLevel, search?: string, includeDrafts?: boolean) => Promise<void>;
  getLessonBySlug: (slug: string) => Lesson | undefined;
  getLessonById: (id: string) => Lesson | undefined;
  addBookmark: (lessonId: string) => Promise<void>;
  removeBookmark: (lessonId: string) => Promise<void>;
  isBookmarked: (lessonId: string) => boolean;
  createLesson: (lesson: Omit<Lesson, 'id' | 'created_at' | 'updated_at' | 'view_count'>) => Promise<Lesson | null>;
  updateLesson: (id: string, lesson: Partial<Lesson>) => Promise<boolean>;
  deleteLesson: (id: string) => Promise<boolean>;
  incrementViewCount: (id: string) => Promise<void>;
  getLessonProgress: (lessonId: string) => LessonProgress;
  setLessonProgress: (lessonId: string, status: LessonProgress) => void;
  getCompletionPercentage: (type?: LessonType) => number;
  getCompletedCount: (type?: LessonType) => number;
}

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export function LessonProvider({ children }: { children: ReactNode }) {
  const [lessons, setLessons] = useState<Lesson[]>(SAMPLE_LESSONS);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [progress, setProgress] = useState<UserLessonProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
    const storedProgress = localStorage.getItem('lessonProgress');
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, []);

  // Fetch published lessons from Supabase on mount so every page
  // (including /lesson/:slug) shows the latest content rather than
  // stale hardcoded SAMPLE_LESSONS.
  useEffect(() => {
    fetchLessons().finally(() => setInitialFetchDone(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    }
  }, [user]);

  const fetchBookmarks = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      const storedBookmarks = localStorage.getItem('bookmarks');
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
      return;
    }

    if (!user) return;

    const { data, error } = await supabase
      .from('bookmarks')
      .select('*, lesson:lessons(*)')
      .eq('user_id', user.id);

    if (!error && data) {
      setBookmarks(data as Bookmark[]);
    }
  };

  const fetchLessons = async (type?: LessonType, level?: LessonLevel, search?: string, includeDrafts = false) => {
    setLoading(true);

    if (!isSupabaseConfigured() || !supabase) {
      let filtered = [...SAMPLE_LESSONS];
      
      if (type) {
        filtered = filtered.filter(l => l.type === type);
      }
      if (level) {
        filtered = filtered.filter(l => l.level === level);
      }
      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(l => 
          l.title.toLowerCase().includes(searchLower) ||
          l.description.toLowerCase().includes(searchLower) ||
          l.topic.toLowerCase().includes(searchLower)
        );
      }
      
      setLessons(filtered);
      setLoading(false);
      return;
    }

    let query = supabase
      .from('lessons')
      .select('*')
      .order('created_at', { ascending: false });

    if (!includeDrafts) {
      query = query.eq('is_published', true);
    }

    if (type) {
      query = query.eq('type', type);
    }
    if (level) {
      query = query.eq('level', level);
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,topic.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (!error && data) {
      const listeningLessonIds = (data as Lesson[])
        .filter((lesson) => lesson.type === 'listening')
        .map((lesson) => lesson.id);
      const listeningDataByLessonId = new Map<string, NonNullable<Lesson['content']['listeningData']>>();
      const readingLessonIds = (data as Lesson[]).filter((lesson) => lesson.type === 'reading').map((lesson) => lesson.id);
      const readingDataByLessonId = new Map<string, NonNullable<Lesson['content']['readingData']>>();
      if (listeningLessonIds.length > 0) {
        const { data: listeningRows } = await supabase
          .from('listening_lesson_data')
          .select('*')
          .in('lesson_id', listeningLessonIds);
        for (const row of listeningRows || []) {
          const listeningData = fromListeningLessonRow(row as Record<string, unknown>);
          if (listeningData && typeof row.lesson_id === 'string') listeningDataByLessonId.set(row.lesson_id, listeningData);
        }
      }
      if (readingLessonIds.length > 0) {
        const { data: readingRows } = await supabase.from('reading_lesson_data').select('*').in('lesson_id', readingLessonIds);
        for (const row of readingRows || []) {
          const readingData = fromReadingLessonRow(row as Record<string, unknown>);
          if (readingData && typeof row.lesson_id === 'string') readingDataByLessonId.set(row.lesson_id, readingData);
        }
      }
      const lessonsWithLocalFallbacks = (data as Lesson[]).map((lesson) => {
        const localLesson = SAMPLE_LESSONS.find((candidate) => candidate.id === lesson.id);
        const videoUrl = lesson.videoUrl || localLesson?.videoUrl;
        const studyBlueprint = lesson.content?.studyBlueprint || localLesson?.content.studyBlueprint;
        return {
          ...lesson,
          ...(videoUrl ? { videoUrl } : {}),
          content: {
            ...lesson.content,
            ...(studyBlueprint ? { studyBlueprint } : {}),
            ...(listeningDataByLessonId.get(lesson.id) ? { listeningData: listeningDataByLessonId.get(lesson.id) } : {}),
            ...(readingDataByLessonId.get(lesson.id) ? { readingData: readingDataByLessonId.get(lesson.id) } : {}),
          },
        };
      });
      setLessons(lessonsWithLocalFallbacks);
    }
    setLoading(false);
  };

  const getLessonBySlug = (slug: string) => {
    return lessons.find(l => l.slug === slug);
  };

  const getLessonById = (id: string) => {
    return lessons.find(l => l.id === id);
  };

  const addBookmark = async (lessonId: string) => {
    if (!user) return;

    if (!isSupabaseConfigured() || !supabase) {
      const newBookmark: Bookmark = {
        id: `bookmark-${Date.now()}`,
        user_id: user.id,
        lesson_id: lessonId,
        created_at: new Date().toISOString(),
      };
      const updatedBookmarks = [...bookmarks, newBookmark];
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      return;
    }

    const { data, error } = await supabase
      .from('bookmarks')
      .insert({ user_id: user.id, lesson_id: lessonId })
      .select()
      .single();

    if (!error && data) {
      setBookmarks([...bookmarks, data as Bookmark]);
    }
  };

  const removeBookmark = async (lessonId: string) => {
    if (!user) return;

    if (!isSupabaseConfigured() || !supabase) {
      const updatedBookmarks = bookmarks.filter(b => b.lesson_id !== lessonId);
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      return;
    }

    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId);

    if (!error) {
      setBookmarks(bookmarks.filter(b => b.lesson_id !== lessonId));
    }
  };

  const isBookmarked = (lessonId: string) => {
    return bookmarks.some(b => b.lesson_id === lessonId);
  };

  const syncListeningStudioData = async (lessonId: string, content: Lesson['content']) => {
    if (!isSupabaseConfigured() || !supabase || !content.listeningData) return true;
    const parsed = listeningLessonDataSchema.safeParse(content.listeningData);
    if (!parsed.success) return false;
    const { error } = await supabase
      .from('listening_lesson_data')
      .upsert({ lesson_id: lessonId, ...toListeningLessonRow(parsed.data) }, { onConflict: 'lesson_id' });
    return !error;
  };

  const syncReadingStudioData = async (lessonId: string, content: Lesson['content']) => {
    if (!isSupabaseConfigured() || !supabase || !content.readingData) return true;
    const parsed = readingLessonDataSchema.safeParse(content.readingData);
    if (!parsed.success) return false;
    const { error } = await supabase.from('reading_lesson_data').upsert({ lesson_id: lessonId, ...toReadingLessonRow(parsed.data) }, { onConflict: 'lesson_id' });
    return !error;
  };

  const createLesson = async (lessonData: Omit<Lesson, 'id' | 'created_at' | 'updated_at' | 'view_count'>) => {
    if (!isSupabaseConfigured() || !supabase) {
      const newLesson: Lesson = {
        ...lessonData,
        id: `lesson-${Date.now()}`,
        view_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setLessons([newLesson, ...lessons]);
      return newLesson;
    }

    const { data, error } = await supabase
      .from('lessons')
      .insert(lessonData)
      .select()
      .single();

    if (!error && data) {
      const newLesson = data as Lesson;
      if (newLesson.type === 'listening' && !(await syncListeningStudioData(newLesson.id, newLesson.content))) {
        await supabase.from('lessons').delete().eq('id', newLesson.id);
        return null;
      }
      if (newLesson.type === 'reading' && !(await syncReadingStudioData(newLesson.id, newLesson.content))) {
        await supabase.from('lessons').delete().eq('id', newLesson.id);
        return null;
      }
      setLessons([newLesson, ...lessons]);
      return newLesson;
    }
    return null;
  };

  const updateLesson = async (id: string, lessonData: Partial<Lesson>) => {
    if (!isSupabaseConfigured() || !supabase) {
      setLessons(lessons.map(l => 
        l.id === id ? { ...l, ...lessonData, updated_at: new Date().toISOString() } : l
      ));
      return true;
    }

    const currentLesson = lessons.find((lesson) => lesson.id === id);
    const nextContent = lessonData.content ?? currentLesson?.content;
    const nextType = lessonData.type ?? currentLesson?.type;
    if (nextType === 'listening' && nextContent && !(await syncListeningStudioData(id, nextContent))) {
      return false;
    }
    if (nextType === 'reading' && nextContent && !(await syncReadingStudioData(id, nextContent))) return false;

    const { error } = await supabase
      .from('lessons')
      .update({ ...lessonData, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (!error) {
      setLessons(lessons.map(l => 
        l.id === id ? { ...l, ...lessonData, updated_at: new Date().toISOString() } : l
      ));
      return true;
    }
    return false;
  };

  const deleteLesson = async (id: string) => {
    if (!isSupabaseConfigured() || !supabase) {
      setLessons(lessons.filter(l => l.id !== id));
      return true;
    }

    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', id);

    if (!error) {
      setLessons(lessons.filter(l => l.id !== id));
      return true;
    }
    return false;
  };

  const incrementViewCount = async (id: string) => {
    if (!isSupabaseConfigured() || !supabase) {
      setLessons(lessons.map(l => 
        l.id === id ? { ...l, view_count: l.view_count + 1 } : l
      ));
      return;
    }

    const lesson = lessons.find(l => l.id === id);
    if (lesson) {
      await supabase
        .from('lessons')
        .update({ view_count: lesson.view_count + 1 })
        .eq('id', id);
    }
  };

  const getLessonProgress = (lessonId: string): LessonProgress => {
    const lessonProgress = progress.find(p => p.lesson_id === lessonId);
    return lessonProgress?.status || 'not_started';
  };

  const setLessonProgress = (lessonId: string, status: LessonProgress) => {
    const existingIndex = progress.findIndex(p => p.lesson_id === lessonId);
    let updatedProgress: UserLessonProgress[];
    
    if (existingIndex >= 0) {
      updatedProgress = progress.map((p, i) => 
        i === existingIndex 
          ? { ...p, status, completed_at: status === 'completed' ? new Date().toISOString() : undefined }
          : p
      );
    } else {
      updatedProgress = [
        ...progress,
        { 
          lesson_id: lessonId, 
          status, 
          completed_at: status === 'completed' ? new Date().toISOString() : undefined 
        }
      ];
    }
    
    setProgress(updatedProgress);
    localStorage.setItem('lessonProgress', JSON.stringify(updatedProgress));
  };

  const getCompletionPercentage = (type?: LessonType): number => {
    const relevantLessons = type 
      ? SAMPLE_LESSONS.filter(l => l.type === type)
      : SAMPLE_LESSONS;
    
    if (relevantLessons.length === 0) return 0;
    
    const completedCount = relevantLessons.filter(l => 
      progress.some(p => p.lesson_id === l.id && p.status === 'completed')
    ).length;
    
    return Math.round((completedCount / relevantLessons.length) * 100);
  };

  const getCompletedCount = (type?: LessonType): number => {
    const relevantLessons = type 
      ? SAMPLE_LESSONS.filter(l => l.type === type)
      : SAMPLE_LESSONS;
    
    return relevantLessons.filter(l => 
      progress.some(p => p.lesson_id === l.id && p.status === 'completed')
    ).length;
  };

  const value = {
    lessons,
    bookmarks,
    progress,
    loading,
    fetchLessons,
    getLessonBySlug,
    getLessonById,
    addBookmark,
    removeBookmark,
    isBookmarked,
    createLesson,
    updateLesson,
    deleteLesson,
    incrementViewCount,
    getLessonProgress,
    setLessonProgress,
    getCompletionPercentage,
    getCompletedCount,
  };

  return <LessonContext.Provider value={value}>{children}</LessonContext.Provider>;
}

export function useLessons() {
  const context = useContext(LessonContext);
  if (context === undefined) {
    throw new Error('useLessons must be used within a LessonProvider');
  }
  return context;
}
