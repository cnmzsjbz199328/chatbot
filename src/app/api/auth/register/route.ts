import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    // 优先使用环境变量，确保使用生产域名
    // 即使在本地开发，也使用生产域名以便邮件链接正确
    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://resume.futurebutnow.xyz';
    const callbackUrl = `${origin}/auth/callback`;

    console.log('[Register] Using origin:', origin);
    console.log('[Register] Callback URL:', callbackUrl);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        emailRedirectTo: callbackUrl
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful! Please check your email to verify your account.',
      user: data.user,
      callbackUrl // 返回用于调试
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
