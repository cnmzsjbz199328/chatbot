import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { userProjectsTable, userProfilesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    
    // 首先通过username查找用户ID
    const profile = await db
      .select({ id: userProfilesTable.id })
      .from(userProfilesTable)
      .where(eq(userProfilesTable.username, username))
      .limit(1);

    if (profile.length === 0) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }

    const userId = profile[0].id;

    // 查询该用户的所有项目
    const projects = await db
      .select()
      .from(userProjectsTable)
      .where(eq(userProjectsTable.userId, userId))
      .orderBy(userProjectsTable.createdAt);

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching user projects:', error);
    return NextResponse.json(
      { error: '获取用户项目失败' },
      { status: 500 }
    );
  }
}
