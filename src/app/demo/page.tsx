import Link from 'next/link';

export default function DemoPage() {
  return (
    <div className="bg-gray-900 font-sans text-white min-h-screen" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden">
        <div className="flex h-full grow flex-col">
          {/* Header */}
          <header className="sticky top-0 z-20 w-full bg-gray-900/80 backdrop-blur-md">
            <div className="container mx-auto flex items-center justify-between whitespace-nowrap px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4">
                <Link className="flex items-center gap-2 text-white" href="/">
                  <svg className="h-8 w-8 text-[var(--primary-color)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
                  </svg>
                  <h1 className="text-xl font-bold leading-tight tracking-[-0.015em]">TechPortfolio</h1>
                </Link>
              </div>
              <nav className="hidden items-center gap-8 md:flex">
                <Link className="text-sm font-medium text-gray-300 transition-colors hover:text-white" href="/">首页</Link>
                <Link className="text-sm font-medium text-gray-300 transition-colors hover:text-white" href="/login">登录</Link>
                <Link className="rounded-md bg-[var(--primary-color)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-opacity-80" href="/register">注册</Link>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}