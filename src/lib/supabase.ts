import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey;

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          full_name: string;
          avatar_url: string | null;
          year: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          full_name: string;
          avatar_url?: string | null;
          year?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          full_name?: string;
          avatar_url?: string | null;
          year?: string | null;
          created_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          code: string | null;
          image: string | null;
          tags: string[];
          likes: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: string;
          code?: string | null;
          image?: string | null;
          tags?: string[];
          likes?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: string;
          code?: string | null;
          image?: string | null;
          tags?: string[];
          likes?: number;
          created_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          content?: string;
          created_at?: string;
        };
      };
      post_likes: {
        Row: {
          user_id: string;
          post_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          post_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          post_id?: string;
          created_at?: string;
        };
      };
      post_bookmarks: {
        Row: {
          user_id: string;
          post_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          post_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          post_id?: string;
          created_at?: string;
        };
      };
      announcement_rsvps: {
        Row: {
          user_id: string;
          announcement_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          announcement_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          announcement_id?: string;
          created_at?: string;
        };
      };
      announcement_reminders: {
        Row: {
          user_id: string;
          announcement_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          announcement_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          announcement_id?: string;
          created_at?: string;
        };
      };
      notification_subscriptions: {
        Row: {
          user_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          created_at?: string;
        };
      };
    };
  };
};
