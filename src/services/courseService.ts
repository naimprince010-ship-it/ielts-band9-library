import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Course, CurriculumModule } from '@/types';
import { COURSES as FALLBACK_COURSES } from '@/data/courses';

export const courseService = {
  async getCourses(): Promise<Course[]> {
    if (!isSupabaseConfigured() || !supabase) {
      const { COURSES } = await import('@/data/courses');
      return COURSES;
    }

    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(this.mapDbCourseToCourse);
    } catch (err) {
      console.error('Error fetching courses:', err);
      const { COURSES } = await import('@/data/courses');
      return COURSES;
    }
  },

  async getCourseById(id: string): Promise<Course | null> {
    if (!isSupabaseConfigured() || !supabase) {
      const { COURSES } = await import('@/data/courses');
      return COURSES.find(c => c.id === id) || null;
    }

    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data ? this.mapDbCourseToCourse(data) : null;
    } catch (err) {
      console.error(`Error fetching course ${id}:`, err);
      const { COURSES } = await import('@/data/courses');
      return COURSES.find(c => c.id === id) || null;
    }
  },

  async createCourse(course: Omit<Course, 'created_at' | 'updated_at'>): Promise<Course> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase not configured');
    }

    const dbCourse = this.mapCourseToDbCourse(course);
    const { data, error } = await supabase
      .from('courses')
      .insert([dbCourse])
      .select()
      .single();

    if (error) throw error;
    return this.mapDbCourseToCourse(data);
  },

  async updateCourse(id: string, course: Partial<Course>): Promise<Course> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase not configured');
    }

    const updateData = this.mapPartialCourseToDbCourse(course);
    const { data, error } = await supabase
      .from('courses')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.mapDbCourseToCourse(data);
  },

  async deleteCourse(id: string): Promise<void> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  mapDbCourseToCourse(dbCourse: any): Course {
    const fallbackCourse = FALLBACK_COURSES.find(course => course.id === dbCourse.id);
    return {
      id: dbCourse.id,
      title: dbCourse.title,
      description: dbCourse.description,
      instructor: dbCourse.instructor,
      nextBatch: dbCourse.next_batch,
      price: dbCourse.price,
      originalPrice: dbCourse.original_price,
      duration: dbCourse.duration,
      level: dbCourse.level,
      type: dbCourse.type,
      features: dbCourse.features || [],
      isPopular: dbCourse.is_popular,
      accentColor: dbCourse.accent_color,
      bgGradient: dbCourse.bg_gradient,
      curriculum: (Array.isArray(dbCourse.curriculum) && dbCourse.curriculum.length > 0
        ? dbCourse.curriculum
        : fallbackCourse?.curriculum) as CurriculumModule[] | undefined,
      created_at: dbCourse.created_at,
      updated_at: dbCourse.updated_at,
    };
  },

  mapCourseToDbCourse(course: any): any {
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      next_batch: course.nextBatch,
      price: course.price,
      original_price: course.originalPrice,
      duration: course.duration,
      level: course.level,
      type: course.type,
      features: course.features,
      is_popular: course.isPopular,
      accent_color: course.accentColor,
      bg_gradient: course.bgGradient,
      curriculum: course.curriculum || [],
    };
  },

  mapPartialCourseToDbCourse(course: Partial<Course>): any {
    const dbCourse: any = {};
    if (course.title !== undefined) dbCourse.title = course.title;
    if (course.description !== undefined) dbCourse.description = course.description;
    if (course.instructor !== undefined) dbCourse.instructor = course.instructor;
    if (course.nextBatch !== undefined) dbCourse.next_batch = course.nextBatch;
    if (course.price !== undefined) dbCourse.price = course.price;
    if (course.originalPrice !== undefined) dbCourse.original_price = course.originalPrice;
    if (course.duration !== undefined) dbCourse.duration = course.duration;
    if (course.level !== undefined) dbCourse.level = course.level;
    if (course.type !== undefined) dbCourse.type = course.type;
    if (course.features !== undefined) dbCourse.features = course.features;
    if (course.isPopular !== undefined) dbCourse.is_popular = course.isPopular;
    if (course.accentColor !== undefined) dbCourse.accent_color = course.accentColor;
    if (course.bgGradient !== undefined) dbCourse.bg_gradient = course.bgGradient;
    if (course.curriculum !== undefined) dbCourse.curriculum = course.curriculum;
    dbCourse.updated_at = new Date().toISOString();
    return dbCourse;
  }
};
