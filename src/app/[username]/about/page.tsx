import Skills from '@/components/Skills';
import ContactInfo from '@/components/ContactInfo';
import Education from '@/components/Education';
import WorkExperience from '@/components/WorkExperience';
import Hobbies from '@/components/Hobbies';
import { UserProfileModel } from '@/db/schema';

interface AboutPageProps {
  params: Promise<{
    username: string;
  }>;
}

// Get user profile
async function getUserProfile(username: string): Promise<UserProfileModel | null> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/profile/${username}`, {
      cache: 'no-store' // Ensure the latest data is fetched every time
    });
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { username } = await params;
  const profile = await getUserProfile(username);
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">About Me</h2>
          <p className="mt-4 text-lg text-gray-400">
            {profile?.bio || 'A passionate and results-oriented IT professional with extensive experience in software development and project management.'}
          </p>
        </div>
        <div className="mt-16 space-y-16">
          {/* Education component */}
          <Education education={profile?.education || undefined} />

          {/* Work experience component */}
          <WorkExperience workExperience={profile?.workExperience || undefined} />

          {/* Skills component */}
          <Skills skills={profile?.skills} />

          {/* Hobbies component */}
          <Hobbies hobbies={profile?.hobbies || undefined} />

          {/* Contact info component */}
          <ContactInfo profile={profile} />
        </div>
      </div>
    </div>
  );
}