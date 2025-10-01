import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, unauthorizedResponse } from '@/lib/auth';
import { db } from '@/db';
import { userProfilesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(request: NextRequest) {
  try {
    // 验证用户认证
    const user = await getAuthenticatedUser();
    if (!user) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const {
      display_name,
      bio,
      location,
      phone,
      website,
      github,
      linkedin,
      skills,
      avatar
    } = body;

    // 更新用户资料
    const [updatedProfile] = await db
      .update(userProfilesTable)
      .set({
        display_name: display_name || null,
        bio: bio || null,
        location: location || null,
        phone: phone || null,
        website: website || null,
        github: github || null,
        linkedin: linkedin || null,
        skills: skills || [],
        avatar: avatar || null,
        updatedAt: new Date()
      })
      .where(eq(userProfilesTable.id, user.id))
      .returning();

    if (!updatedProfile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProfile);

  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
