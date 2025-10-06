import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    // 优先使用环境变量，确保使用生产域名
    // 即使在本地开发，也使用生产域名以便邮件链接正确
    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://resume.futurebutnow.xyz';
    const resetUrl = `${origin}/reset-password`;

    console.log('[Forgot Password] Using origin:', origin);
    console.log('[Forgot Password] Reset URL:', resetUrl);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: resetUrl,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset email sent successfully'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
