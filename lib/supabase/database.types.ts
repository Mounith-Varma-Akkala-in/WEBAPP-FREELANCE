export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string | null
          credits: number
          level: number
          streak_days: number
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string | null
          credits?: number
          level?: number
          streak_days?: number
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string | null
          credits?: number
          level?: number
          streak_days?: number
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string | null
          level: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category?: string | null
          level?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string | null
          level?: string | null
          created_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          skill_id: string
          title: string
          content: string | null
          duration: number | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          skill_id: string
          title: string
          content?: string | null
          duration?: number | null
          order_index: number
          created_at?: string
        }
        Update: {
          id?: string
          skill_id?: string
          title?: string
          content?: string | null
          duration?: number | null
          order_index?: number
          created_at?: string
        }
      }
      user_lesson_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          completed_at: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          completed_at?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          completed_at?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      user_skills: {
        Row: {
          id: string
          user_id: string
          skill_id: string
          progress: number
          level: number
          created_at: string
          updated_at: string | null
          total_lessons_completed: number
          total_exercises_completed: number
        }
        Insert: {
          id?: string
          user_id: string
          skill_id: string
          progress?: number
          level?: number
          created_at?: string
          updated_at?: string | null
          total_lessons_completed?: number
          total_exercises_completed?: number
        }
        Update: {
          id?: string
          user_id?: string
          skill_id?: string
          progress?: number
          level?: number
          created_at?: string
          updated_at?: string | null
          total_lessons_completed?: number
          total_exercises_completed?: number
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          message?: string
          read?: boolean
          created_at?: string
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
  }
}
