import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// 客户端使用（在 'use client' 组件中）
export const createClient = () => createClientComponentClient();
