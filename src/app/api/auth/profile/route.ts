import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateUserProfile } from '@/lib/userProfile';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, email } = body;
    
    if (!userId || !email) {
      return NextResponse.json({ error: 'Missing userId or email' }, { status: 400 });
    }

    // Create or get user profile
    const profile = await getOrCreateUserProfile(userId, email);
    
    return NextResponse.json({ 
      success: true, 
      profile: {
        username: profile.username,
        id: profile.id
      }
    });
    
  } catch (error) {
    console.error('Profile creation error:', error);
    return NextResponse.json({ 
      error: 'Failed to create profile' 
    }, { status: 500 });
  }
}
