import { NextRequest, NextResponse } from 'next/server';
import { upsertSession } from '@/db';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, durationInHours = 24 } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      );
    }

    // 计算过期时间
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + durationInHours);

    // 创建或更新会话
    const session = await upsertSession(sessionId, expiresAt);

    return NextResponse.json({
      success: true,
      session: session[0],
      expiresAt: expiresAt.toISOString()
    });

  } catch (error) {
    console.error('Session creation/update failed:', error);
    return NextResponse.json(
      { error: 'Failed to manage session' },
      { status: 500 }
    );
  }
}

// 获取会话信息
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.headers.get('X-Session-Id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'X-Session-Id header is required' },
        { status: 400 }
      );
    }

    // 这里可以添加获取具体会话信息的逻辑
    return NextResponse.json({
      sessionId,
      status: 'active'
    });

  } catch (error) {
    console.error('Session retrieval failed:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}
