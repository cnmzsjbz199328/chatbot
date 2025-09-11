import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, unauthorizedResponse } from '@/lib/auth';
import { db } from '@/db';
import { userProjectsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    // 验证用户认证
    const user = await getAuthenticatedUser();
    if (!user) {
      return unauthorizedResponse();
    }

    // 获取用户的项目
    const projects = await db
      .select()
      .from(userProjectsTable)
      .where(eq(userProjectsTable.userId, user.id));

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // 验证用户认证
    const user = await getAuthenticatedUser();
    if (!user) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const {
      title,
      description,
      technologies,
      status = 'active',
      progress = '0',
      startDate,
      endDate,
      githubUrl,
      liveUrl,
      imageUrl
    } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // 创建新项目
    const newProject = await db
      .insert(userProjectsTable)
      .values({
        userId: user.id,
        title,
        description,
        technologies,
        status,
        progress,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        githubUrl,
        liveUrl,
        imageUrl,
        updatedAt: new Date()
      })
      .returning();

    return NextResponse.json(newProject[0]);
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
