import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// 服务端组件使用
export const createServerClient = () => createServerComponentClient({ cookies });
