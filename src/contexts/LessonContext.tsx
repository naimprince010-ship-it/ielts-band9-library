import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Lesson, LessonType, LessonLevel, Bookmark } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import { SAMPLE_LESSONS } from '@/data/sampleLessons';

interface LessonContextType {
  lessons: Lesson[];
  bookmarks: Bookmark[];
  loading: boolean;
  fetchLessons: (type?: LessonType, level?: LessonLevel, search?: string) => Promise<void>;
  getLessonBySlug: (slug: string) => Lesson | undefined;
  getLessonById: (id: string) => Lesson | undefined;
  addBookmark: (lessonId: string) => Promise<void>;
  removeBookmark: (lessonId: string) => Promise<void>;
  isBookmarked: (lessonId: string) => boolean;
  createLesson: (lesson: Omit<Lesson, 'id' | 'created_at' | 'updated_at' | 'view_count'>) => Promise<Lesson | null>;
  updateLesson: (id: string, lesson: Partial<Lesson>) => Promise<boolean>;
  deleteLesson: (id: string) => Promise<boolean>;
  incrementViewCount: (id: string) => Promise<void>;
}

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export function LessonProvider({ children }: { children: ReactNode }) {
  const [lessons, setLessons] = useState<Lesson[]>(SAMPLE_LESSONS);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
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

  const fetchLessons = async (type?: LessonType, level?: LessonLevel, search?: string) => {
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
      .eq('is_published', true)
      .order('created_at', { ascending: false });

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
      setLessons(data as Lesson[]);
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

  const value = {
    lessons,
    bookmarks,
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
