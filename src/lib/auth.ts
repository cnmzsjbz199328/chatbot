import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { Database } from './supabase';

export async function getAuthenticatedUser() {
  console.log('[AUTH] 开始用户认证检查');
  
  try {
    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    console.log('[AUTH] Supabase 配置:', { 
      url: supabaseUrl ? '已设置' : '未设置', 
      key: supabaseAnonKey ? '已设置' : '未设置' 
    });
    
    const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    });

    // 手动获取和设置 cookies
    const authToken = cookieStore.get('sb-phjuvvnhdasdvxmzyowg-auth-token');
    console.log('[AUTH] 认证 token 状态:', authToken ? '存在' : '不存在');
    
    if (!authToken?.value) {
      console.log('[AUTH] 认证失败: 未找到认证 token');
      return null;
    }

    // 解析认证 token
    try {
      console.log('[AUTH] 开始解析认证 token...');
      const authData = JSON.parse(authToken.value);
      console.log('[AUTH] Token 结构:', Object.keys(authData));
      
      if (!authData.access_token) {
        console.log('[AUTH] 认证失败: token 中未找到 access_token');
        return null;
      }
      
      console.log('[AUTH] 使用 access_token 获取用户信息...');
      // 使用 access_token 设置会话
      const { data: { user }, error } = await supabase.auth.getUser(authData.access_token);
      
      if (error) {
        console.error('[AUTH] Supabase getUser 错误:', error);
        return null;
      }
      
      if (!user) {
        console.log('[AUTH] 认证失败: Supabase 返回空用户');
        return null;
      }
      
      console.log('[AUTH] 认证成功:', user.id);
      return user;
    } catch (parseError) {
      console.error('[AUTH] Token 解析错误:', parseError);
      return null;
    }
  } catch (globalError) {
    console.error('[AUTH] 全局认证错误:', globalError);
    return null;
  }
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export async function requireAuth() {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

// 用于服务端组件的认证检查
export async function getServerUser() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });

  // 手动获取和设置 cookies
  const authToken = cookieStore.get('sb-phjuvvnhdasdvxmzyowg-auth-token');
  if (!authToken?.value) {
    return null;
  }

  try {
    const authData = JSON.parse(authToken.value);
    if (!authData.access_token) {
      return null;
    }
    
    const { data: { user }, error } = await supabase.auth.getUser(authData.access_token);
    
    if (error || !user) {
      return null;
    }
    
    return user;
  } catch (e) {
    console.error('Auth token parse error:', e);
    return null;
  }
}