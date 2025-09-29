import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { userProjectsTable, userProfilesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = await Promise.resolve(params);
    
    // 一次性查询用户资料和项目
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

    const userId = profile[0].id;

    // 查询该用户的所有项目
    const projects = await db
      .select()
      .from(userProjectsTable)
      .where(eq(userProjectsTable.userId, userId))
      .orderBy(userProjectsTable.createdAt);

    // 返回合并的数据
    return NextResponse.json({
      profile: profile[0],
      projects: projects
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return NextResponse.json(
      { error: '获取作品集数据失败' },
      { status: 500 }
    );
  }
}
