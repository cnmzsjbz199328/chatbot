import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';

// 客户端使用
export const createClient = () => createClientComponentClient();

// 服务端组件使用 - 动态导入 cookies
export const createServerClient = async () => {
  const { cookies } = await import('next/headers');
  return createServerComponentClient({ cookies });
};

// 数据库类型定义
export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar: string | null;
          bio: string | null;
          github_url: string | null;
          linkedin_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar?: string | null;
          bio?: string | null;
          github_url?: string | null;
          linkedin_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          avatar?: string | null;
          bio?: string | null;
          github_url?: string | null;
          linkedin_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_projects: {
        Row: {
          id: number;
          user_id: string;
          title: string;
          description: string | null;
          image_url: string | null;
          project_url: string | null;
          github_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          title: string;
          description?: string | null;
          image_url?: string | null;
          project_url?: string | null;
          github_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          title?: string;
          description?: string | null;
          image_url?: string | null;
          project_url?: string | null;
          github_url?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};