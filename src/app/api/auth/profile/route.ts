import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { getOrCreateUserProfile } from '@/lib/userProfile';

export async function POST() {
  try {
    const supabase = createClient();
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create or get user profile
    const profile = await getOrCreateUserProfile(user.id, user.email!);
    
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
