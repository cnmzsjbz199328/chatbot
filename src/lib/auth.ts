import { createServerClient } from './supabase';
import { NextResponse } from 'next/server';

export async function getAuthenticatedUser() {
  console.log('[AUTH] 开始用户认证检查');
  
  try {
    const supabase = await createServerClient();
    
    console.log('[AUTH] Supabase 配置: 已设置');
    
    const { data: { user }, error } = await supabase.auth.getUser();
    
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

export async function getServerUser() {
  const supabase = await createServerClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }
  
  return user;
}
