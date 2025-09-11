import Link from 'next/link';
import ChatContainer from "@/components/ChatContainer";
import ProjectGrid from "@/components/ProjectGrid";
import Layout from '@/components/Layout';
import { UserProjectModel, UserProfileModel } from '@/db/schema';

interface DashboardPageProps {
  params: Promise<{
    username: string;
  }>;
}

// 获取用户资料
async function getUserProfile(username: string): Promise<UserProfileModel | null> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/profile/${username}`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

// 获取用户项目
async function getUserProjects(username: string): Promise<UserProjectModel[]> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/projects/${username}`);
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error('Error fetching user projects:', error);
    return [];
  }
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { username } = await params;
  
  // 获取用户数据
  const [profile, projects] = await Promise.all([
    getUserProfile(username),
    getUserProjects(username)
  ]);

  return (
    <Layout>
      <div className="container mx-auto flex flex-col px-4 py-10 sm:px-6 lg:flex-row lg:gap-8 lg:px-8">
        {/* 主要内容区域 */}
        <div className="flex-1 lg:max-w-3xl">
          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {profile ? `${profile.displayName || username} 的项目` : '精选项目'}
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              {profile?.bio || '一系列展示我的IT技能和经验的项目。'}
            </p>
          </div>
          {/* 动态项目列表 */}
          <ProjectGrid projects={projects} />
        </div>
        
        {/* 右侧AI助手边栏 */}
        <aside className="w-full lg:w-96 lg:flex-shrink-0">
          <div className="sticky top-20 rounded-lg bg-gray-800/50 p-6 shadow-lg">
            <ChatContainer />
          </div>
        </aside>
      </div>
    </Layout>
  );
}
