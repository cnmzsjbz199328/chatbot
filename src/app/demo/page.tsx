import Link from 'next/link';
import Layout from '@/components/Layout';

export default function DemoPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
                {/* Hero Section */}
                <div className="text-center">
                  <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">演示作品集</h2>
                  <p className="mt-4 text-lg text-gray-400">查看我们平台创建的真实作品集示例</p>
                </div>

                {/* Demo Cards */}
                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {/* Demo 1 - About Page */}
                  <div className="card group cursor-pointer transition-all duration-300 hover:shadow-xl">
                    <div className="mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                        <span className="material-symbols-outlined text-white"> person </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">个人简介页面</h3>
                    <p className="text-gray-400 mb-4">
                      展示个人背景、教育经历、工作经验和技能专长的完整页面
                    </p>
                    <Link 
                      href="/about" 
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-color)] hover:underline"
                    >
                      查看示例 <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>

                  {/* Demo 2 - Projects Page */}
                  <div className="card group cursor-pointer transition-all duration-300 hover:shadow-xl">
                    <div className="mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                        <span className="material-symbols-outlined text-white"> work </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">项目展示页面</h3>
                    <p className="text-gray-400 mb-4">
                      精美的项目展示页面，包含项目详情、技术栈和GitHub链接
                    </p>
                    <Link 
                      href="/projects" 
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-color)] hover:underline"
                    >
                      查看示例 <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>

                  {/* Demo 3 - Management */}
                  <div className="card group cursor-pointer transition-all duration-300 hover:shadow-xl">
                    <div className="mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                        <span className="material-symbols-outlined text-white"> dashboard </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">管理后台</h3>
                    <p className="text-gray-400 mb-4">
                      强大的后台管理系统，轻松管理项目和个人信息
                    </p>
                    <Link 
                      href="/login" 
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-color)] hover:underline"
                    >
                      登录体验 <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>
                </div>

                {/* Features Showcase */}
                <div className="mt-20">
                  <h3 className="text-3xl font-bold text-center mb-12">平台特色功能</h3>
                  <div className="grid gap-12 lg:grid-cols-2">
                    {/* Feature 1 */}
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                          <span className="material-symbols-outlined text-white"> palette </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">现代化设计</h4>
                        <p className="text-gray-400">
                          采用最新的设计趋势，暗色主题配合精美的动画效果，让您的作品集脱颖而出。
                        </p>
                      </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                          <span className="material-symbols-outlined text-white"> speed </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">高性能</h4>
                        <p className="text-gray-400">
                          基于Next.js构建，优化的加载速度和SEO，确保您的作品集能被更多人发现。
                        </p>
                      </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                          <span className="material-symbols-outlined text-white"> edit </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">易于管理</h4>
                        <p className="text-gray-400">
                          直观的管理界面，无需编程知识即可轻松更新项目信息和个人资料。
                        </p>
                      </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                          <span className="material-symbols-outlined text-white"> security </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">安全可靠</h4>
                        <p className="text-gray-400">
                          采用Supabase认证系统，确保您的数据安全，支持多种登录方式。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center">
                  <div className="card">
                    <h3 className="text-2xl font-bold mb-4">准备创建您的作品集了吗？</h3>
                    <p className="text-gray-400 mb-6">
                      加入我们的平台，几分钟内即可拥有专业的个人作品集网站
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <Link
                        className="rounded-lg bg-[var(--primary-color)] px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-opacity-80"
                        href="/register"
                      >
                        免费注册
                      </Link>
                      <Link
                        className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                        href="/login"
                      >
                        已有账户？立即登录
                      </Link>
                    </div>
                  </div>
        </div>
      </div>
    </Layout>
  );
}