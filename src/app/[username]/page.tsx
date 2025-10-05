'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ChatContainer from "@/components/ChatContainer";
import ProjectShowcase from "@/components/ProjectShowcase";
import ContactInfo from "@/components/ContactInfo";
import Education from "@/components/Education";
import WorkExperience from "@/components/WorkExperience";
import Skills from "@/components/Skills";
import Hobbies from "@/components/Hobbies";
import PortfolioLayout from '@/components/PortfolioLayout';

import { UserProfileModel, UserProjectModel } from '@/db/schema';

export default function DashboardPage() {
  const params = useParams();
  const username = params?.username as string;
  const [profile, setProfile] = useState<UserProfileModel | null>(null);
  const [projects, setProjects] = useState<UserProjectModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false); // 控制聊天框展开/隐藏，默认隐藏

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
      <PortfolioLayout>
        <div className="container mx-auto flex items-center justify-center px-4 py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading {username}&apos;s portfolio...</p>
          </div>
        </div>
      </PortfolioLayout>
    );
  }

  if (error) {
    return (
      <PortfolioLayout>
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
      </PortfolioLayout>
    );
  }

  return (
    <PortfolioLayout>
      <div className="w-full flex flex-col px-4 py-4 sm:px-6 lg:flex-row lg:gap-12 lg:px-8 h-full">
        {/* Main content area */}
        <div className="flex-1 lg:max-w-none overflow-y-auto">
          <div className="mb-12">
            {/* 头像和个人信息区域 */}
            <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-start lg:text-left">
              {/* 头像 */}
              {profile?.avatar && (
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-[var(--primary-color)] shadow-lg">
                    <Image
                      src={profile.avatar}
                      alt={`${profile.displayName || username}'s avatar`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 160px"
                      priority
                    />
                  </div>
                </div>
              )}
              
              {/* 文字信息 */}
              <div className="flex-1">
                <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                  {profile ? `${profile.displayName || username}'s Portfolio` : 'Portfolio'}
                </h2>
                <p className="mt-4 text-lg text-[var(--text-secondary)]">
                  {profile?.bio || 'A series of projects showcasing my IT skills and experience.'}
                </p>
              </div>
            </div>
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

        {/* Right sidebar for AI assistant with toggle */}
        <div className="relative">
          {/* Toggle button - 仅在小屏设备显示 */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`
              lg:hidden fixed top-1/2 -translate-y-1/2 z-50
              bg-[var(--primary-color)] hover:bg-opacity-80 text-white
              rounded-l-lg shadow-lg transition-all duration-300
              w-10 h-16 flex items-center justify-center
              ${isChatOpen ? 'right-[calc(100vw-2.5rem)]' : 'right-4'}
            `}
            aria-label={isChatOpen ? "隐藏聊天框" : "显示聊天框"}
          >
            <span className="material-symbols-outlined text-xl">
              {isChatOpen ? 'chevron_right' : 'chat'}
            </span>
          </button>

          {/* Chat sidebar - 大屏始终显示，小屏可切换 */}
          <aside className={`
            fixed lg:relative top-0 right-0 h-[calc(100vh-5rem)] lg:h-full
            w-full lg:w-96 lg:flex-shrink-0 lg:pt-0
            lg:translate-x-0 transition-transform duration-300 ease-in-out z-40
            ${isChatOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          `}>
            <div className="h-full flex flex-col sticky top-0 rounded-lg bg-gray-800/95 dark:bg-gray-800/95 light:bg-gray-100/95 lg:bg-gray-800/50 lg:dark:bg-gray-800/50 lg:light:bg-gray-100/50 p-6 shadow-lg">
              <ChatContainer targetUsername={username} userProfile={profile} />
            </div>
          </aside>
        </div>
      </div>
    </PortfolioLayout>
  );
}
