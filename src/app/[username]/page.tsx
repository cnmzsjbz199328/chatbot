'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ChatContainer from "@/components/ChatContainer";
import ProjectShowcase from "@/components/ProjectShowcase";
import ContactInfo from "@/components/ContactInfo";
import Education from "@/components/Education";
import WorkExperience from "@/components/WorkExperience";
import Skills from "@/components/Skills";
import Hobbies from "@/components/Hobbies";
import Layout from '@/components/Layout';
import { UserProfileModel, UserProjectModel } from '@/db/schema';

export default function DashboardPage() {
  const params = useParams();
  const username = params?.username as string;
  const [profile, setProfile] = useState<UserProfileModel | null>(null);
  const [projects, setProjects] = useState<UserProjectModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get user portfolio data (profile + projects)
  async function getPortfolioData(username: string): Promise<{ profile: UserProfileModel | null; projects: UserProjectModel[] }> {
    try {
      const response = await fetch(`/api/portfolio/${username}`);
      if (response.ok) {
        const data = await response.json();
        return { profile: data.profile, projects: data.projects };
      }
      return { profile: null, projects: [] };
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      return { profile: null, projects: [] };
    }
  }

  useEffect(() => {
    if (username) {
      setLoading(true);
      setError(null);
      
      getPortfolioData(username)
        .then((data) => {
          setProfile(data.profile);
          setProjects(data.projects);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error loading portfolio data:', err);
          setError('Failed to load portfolio data');
          setLoading(false);
        });
    }
  }, [username]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto flex items-center justify-center px-4 py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading {username}&apos;s portfolio...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto flex items-center justify-center px-4 py-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-red-400 text-2xl">error</span>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Error Loading Portfolio</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-md hover:bg-[#0e5cb3] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full flex flex-col px-4 py-4 sm:px-6 lg:flex-row lg:gap-12 lg:px-8 h-full">
        {/* Main content area */}
        <div className="flex-1 lg:max-w-none overflow-y-auto">
          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {profile ? `${profile.displayName || username}'s Portfolio` : 'Portfolio'}
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              {profile?.bio || 'A series of projects showcasing my IT skills and experience.'}
            </p>
          </div>

          {/* Personal Information Sections */}
          {profile && (
            <>
              <ContactInfo profile={profile} />
              <Education education={profile.education || undefined} />
              <WorkExperience workExperience={profile.workExperience || undefined} />
              <Skills skills={profile.skills || undefined} />
              <Hobbies hobbies={profile.hobbies || undefined} />
            </>
          )}

          {/* Dynamic project showcase */}
          <div className="mt-12">
            <ProjectShowcase projects={projects} />
          </div>
        </div>

        {/* Right sidebar for AI assistant */}
        <aside className="w-full lg:w-96 lg:flex-shrink-0 lg:h-full lg:pt-0">
          <div className="h-full flex flex-col sticky top-0 rounded-lg bg-gray-800/50 p-6 shadow-lg">
            <ChatContainer targetUsername={username} userProfile={profile} />
          </div>
        </aside>
      </div>
    </Layout>
  );
}
