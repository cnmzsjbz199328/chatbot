'use client';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';

interface UserDashboardProps {
  username: string;
}

export default function UserDashboard({ username }: UserDashboardProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 如果用户已log in且用户名匹配，显示管理界面
  const isOwner = user && user.user_metadata?.username === username;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        
        {/* 用户状态横幅 */}
        {user && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-600 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400">check_circle</span>
              <div>
                <p className="text-green-400 font-medium">
                  {isOwner ? '您正在管理自己的页面' : `已log in为 ${user.email}`}
                </p>
                {isOwner && (
                  <p className="text-green-300 text-sm">
                    您可以编辑项目信息、上传文档并与AI助手对话
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {!user && (
          <div className="mb-6 p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-400">info</span>
              <div>
                <p className="text-blue-400 font-medium">
                  正在浏览 {username} 的个人页面
                </p>
                <p className="text-blue-300 text-sm">
                  <Link href="/login" className="underline hover:text-blue-200">log in</Link>
                  {' '}或{' '}
                  <Link href="/register" className="underline hover:text-blue-200">sign up</Link>
                  {' '}来创建您自己的个人网站
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* 主要内容区域 */}
          <div className="lg:col-span-2">
            {/* 项目展示区域 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">我的项目</h2>
              <div className="grid gap-6 md:grid-cols-2">
                
                {/* 项目卡片示例 */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">AI智能助手平台</h3>
                      <p className="text-gray-400 text-sm">全栈开发项目</p>
                    </div>
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded-full">
                      已完成
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    基于Next.js和Supabase构建的多租户AI助手平台，支持文档上传、智能对话等功能。
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 text-xs rounded">Next.js</span>
                    <span className="px-2 py-1 bg-purple-900/30 text-purple-400 text-xs rounded">Supabase</span>
                    <span className="px-2 py-1 bg-orange-900/30 text-orange-400 text-xs rounded">TypeScript</span>
                  </div>
                  <div className="flex gap-3">
                    <a href="#" className="text-[var(--primary-color)] hover:text-blue-400 text-sm font-medium">
                      查看详情 →
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  </div>
                </div>

                {/* 添加项目卡片（仅对所有者显示） */}
                {isOwner && (
                  <div className="bg-gray-800/50 rounded-lg p-6 border-2 border-dashed border-gray-600 flex items-center justify-center min-h-[200px]">
                    <Link 
                      href={`/${username}/projectManagement`}
                      className="flex flex-col items-center gap-3 text-gray-400 hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-3xl">add_circle</span>
                      <span className="font-medium">添加新项目</span>
                    </Link>
                  </div>
                )}
                
              </div>
            </section>

            {/* 技能与经验 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">技能与经验</h2>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">前端技术</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">React/Next.js</span>
                        <span className="text-blue-400 text-sm">熟练</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">TypeScript</span>
                        <span className="text-green-400 text-sm">精通</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Tailwind CSS</span>
                        <span className="text-blue-400 text-sm">熟练</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">后端技术</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Node.js</span>
                        <span className="text-green-400 text-sm">精通</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Supabase</span>
                        <span className="text-blue-400 text-sm">熟练</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">PostgreSQL</span>
                        <span className="text-yellow-400 text-sm">学习中</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
