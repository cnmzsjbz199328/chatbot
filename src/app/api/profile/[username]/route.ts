import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { userProfilesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = await Promise.resolve(params);
    
    // 查询用户资料
    const profile = await db
      .select()
      .from(userProfilesTable)
      .where(eq(userProfilesTable.username, username))
      .limit(1);

    if (profile.length === 0) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json(profile[0]);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: '获取用户资料失败' },
      { status: 500 }
    );
  }
}
