import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateUserProfile } from '@/lib/userProfile';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.user) {
      try {
        // 创建用户profile并跳转到项目管理
        const profile = await getOrCreateUserProfile(data.user.id, data.user.email!);
        return NextResponse.redirect(`${requestUrl.origin}/${profile.username}/projectManagement`);
      } catch (profileError) {
        console.error('Profile creation error in callback:', profileError);
        // 如果失败，跳转到主页
        return NextResponse.redirect(requestUrl.origin);
      }
    }
  }

  // 默认重定向到主页
  return NextResponse.redirect(requestUrl.origin);
}