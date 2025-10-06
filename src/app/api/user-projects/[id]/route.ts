import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, unauthorizedResponse } from '@/lib/auth';
import { db } from '@/db';
import { userProjectsTable } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // 验证用户认证
    const user = await getAuthenticatedUser();
    if (!user) {
      return unauthorizedResponse();
    }

    const { id } = await params;
    const projectId = parseInt(id);
    
    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

    const body = await request.json();
    const {
      title,
      description,
      status,
      progress,
      technologies,
      startDate,
      endDate,
      githubUrl,
      liveUrl,
      imageUrl
    } = body;

    // 验证必填字段
    if (!title || !status) {
      return NextResponse.json(
        { error: 'Title and status are required' },
        { status: 400 }
      );
    }

    // 更新项目（只能更新属于当前用户的项目）
    const [updatedProject] = await db
      .update(userProjectsTable)
      .set({
        title,
        description: description || null,
        status,
        progress: progress || 0,
        technologies: technologies || [],
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        githubUrl: githubUrl || null,
        liveUrl: liveUrl || null,
        imageUrl: imageUrl || null,
        updatedAt: new Date()
      })
      .where(
        and(
          eq(userProjectsTable.id, projectId),
          eq(userProjectsTable.userId, user.id)
        )
      )
      .returning();

    if (!updatedProject) {
      return NextResponse.json(
        { error: 'Project not found or you do not have permission to update it' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject);

  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // 验证用户认证
    const user = await getAuthenticatedUser();
    if (!user) {
      return unauthorizedResponse();
    }

    const { id } = await params;
    const projectId = parseInt(id);
    
    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

    // 删除项目（只能删除属于当前用户的项目）
    const [deletedProject] = await db
      .delete(userProjectsTable)
      .where(
        and(
          eq(userProjectsTable.id, projectId),
          eq(userProjectsTable.userId, user.id)
        )
      )
      .returning();

    if (!deletedProject) {
      return NextResponse.json(
        { error: 'Project not found or you do not have permission to delete it' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, deletedProject });

  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
