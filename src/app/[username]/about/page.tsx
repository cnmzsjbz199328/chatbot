import Link from 'next/link';
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

// 获取用户资料
async function getUserProfile(username: string): Promise<UserProfileModel | null> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/profile/${username}`, {
      cache: 'no-store' // 确保每次都获取最新数据
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
    <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden" style={{fontFamily: 'Inter, "Noto Sans", sans-serif'}}>
      <div className="flex h-full grow flex-col">
        <header className="sticky top-0 z-20 w-full bg-gray-900/80 backdrop-blur-md">
          <div className="container mx-auto flex items-center justify-between whitespace-nowrap px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <Link className="flex items-center gap-2 text-white" href={`/${username}`}>
                <svg className="h-8 w-8 text-[var(--primary-color)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
                <h1 className="text-xl font-bold leading-tight tracking-[-0.015em]">Tech Portfolio</h1>
              </Link>
            </div>
            <nav className="hidden items-center gap-8 md:flex">
              <Link className="text-sm font-medium text-gray-300 transition-colors hover:text-white" href={`/${username}`}>项目</Link>
              <Link className="text-sm font-medium text-[var(--primary-color)]" href={`/${username}/about`}>关于</Link>
              <a className="text-sm font-medium text-gray-300 transition-colors hover:text-white" href="#contact">联系</a>
            </nav>
            <button className="md:hidden">
              <span className="material-symbols-outlined"> menu </span>
            </button>
          </div>
        </header>
        <main className="flex-1">
          <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">关于我</h2>
                <p className="mt-4 text-lg text-gray-400">
                  {profile?.bio || '一位充满激情、注重结果的IT专业人士，在软件开发和项目管理方面拥有丰富的经验。'}
                </p>
              </div>
              <div className="mt-16 space-y-16">
                {/* 教育经历组件 */}
                <Education education={profile?.education || undefined} />

                {/* 工作经历组件 */}
                <WorkExperience workExperience={profile?.workExperience || undefined} />

                {/* 技能组件 */}
                <Skills skills={profile?.skills} />

                {/* 兴趣爱好组件 */}
                <Hobbies hobbies={profile?.hobbies || undefined} />

                {/* 联系信息组件 */}
                <ContactInfo profile={profile} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
