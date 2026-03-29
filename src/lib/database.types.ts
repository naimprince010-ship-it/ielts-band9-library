export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    email: string | null
                    name: string | null
                    role: 'user' | 'admin' | 'instructor'
                    subscription_status: 'free' | 'premium'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email?: string | null
                    name?: string | null
                    role?: 'user' | 'admin' | 'instructor'
                    subscription_status?: 'free' | 'premium'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string | null
                    name?: string | null
                    role?: 'user' | 'admin' | 'instructor'
                    subscription_status?: 'free' | 'premium'
                    created_at?: string
                    updated_at?: string
                }
            }
            user_activity: {
                Row: {
                    id: string
                    user_id: string
                    date: string
                    lessons_completed: number
                    quizzes_completed: number
                    minutes_studied: number
                    score: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    date?: string
                    lessons_completed?: number
                    quizzes_completed?: number
                    minutes_studied?: number
                    score?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    date?: string
                    lessons_completed?: number
                    quizzes_completed?: number
                    minutes_studied?: number
                    score?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            reading_passages: {
                Row: {
                    id: string
                    title: string
                    content: string
                    difficulty: 'easy' | 'medium' | 'hard'
                    topic: string
                    time_limit: number
                    is_published: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    content: string
                    difficulty?: 'easy' | 'medium' | 'hard'
                    topic: string
                    time_limit?: number
                    is_published?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    content?: string
                    difficulty?: 'easy' | 'medium' | 'hard'
                    topic?: string
                    time_limit?: number
                    is_published?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            reading_questions: {
                Row: {
                    id: string
                    passage_id: string
                    question_type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'matching'
                    question: string
                    options: Json | null
                    correct_answer: string
                    explanation: string | null
                    order_index: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    passage_id: string
                    question_type?: 'multiple_choice' | 'true_false' | 'fill_blank' | 'matching'
                    question: string
                    options?: Json | null
                    correct_answer: string
                    explanation?: string | null
                    order_index?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    passage_id?: string
                    question_type?: 'multiple_choice' | 'true_false' | 'fill_blank' | 'matching'
                    question?: string
                    options?: Json | null
                    correct_answer?: string
                    explanation?: string | null
                    order_index?: number
                    created_at?: string
                }
            }
            reading_attempts: {
                Row: {
                    id: string
                    user_id: string
                    passage_id: string
                    score: number
                    total_questions: number
                    time_taken: number | null
                    answers: Json | null
                    completed_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    passage_id: string
                    score: number
                    total_questions: number
                    time_taken?: number | null
                    answers?: Json | null
                    completed_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    passage_id?: string
                    score?: number
                    total_questions?: number
                    time_taken?: number | null
                    answers?: Json | null
                    completed_at?: string
                }
            }
            faq_items: {
                Row: {
                    id: string
                    category: string
                    question: string
                    answer: string
                    sort_order: number
                    is_published: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    category: string
                    question: string
                    answer: string
                    sort_order?: number
                    is_published?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    category?: string
                    question?: string
                    answer?: string
                    sort_order?: number
                    is_published?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            site_settings: {
                Row: {
                    id: string
                    key: string
                    value: string
                    description: string | null
                    updated_at: string
                }
                Insert: {
                    id?: string
                    key: string
                    value: string
                    description?: string | null
                    updated_at?: string
                }
                Update: {
                    id?: string
                    key?: string
                    value?: string
                    description?: string | null
                    updated_at?: string
                }
            }
            vocabulary: {
                Row: {
                    id: string
                    word: string
                    definition: string
                    part_of_speech: string
                    topic: string
                    difficulty_level: string
                    is_enriched: boolean
                }
                Insert: {
                    id?: string
                    word: string
                    definition: string
                    part_of_speech: string
                    topic: string
                    difficulty_level: string
                    is_enriched?: boolean
                }
                Update: {
                    id?: string
                    word?: string
                    definition?: string
                    part_of_speech?: string
                    topic?: string
                    difficulty_level?: string
                    is_enriched?: boolean
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
