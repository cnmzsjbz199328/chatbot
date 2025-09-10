import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    
    try {
      await supabase.auth.exchangeCodeForSession(code);
      
      // 验证成功后跳转到用户页面
      return NextResponse.redirect(`${origin}/demo`);
    } catch (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(`${origin}/login?error=auth_error`);
    }
  }

  // 如果没有code参数，跳转到登录页面
  return NextResponse.redirect(`${origin}/login`);
}
