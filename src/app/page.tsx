import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden bg-gray-900 font-sans text-white" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="flex h-full grow flex-col">
        <header className="sticky top-0 z-20 w-full bg-gray-900/80 backdrop-blur-md">
          <div className="container mx-auto flex items-center justify-between whitespace-nowrap px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <svg className="h-8 w-8 text-[var(--primary-color)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
                <h1 className="text-xl font-bold leading-tight tracking-[-0.015em]">TechPortfolio</h1>
              </div>
            </div>
            <nav className="hidden items-center gap-8 md:flex">
              <Link className="text-sm font-medium text-gray-300 transition-colors hover:text-white" href="#features">功能</Link>
              <Link className="text-sm font-medium text-gray-300 transition-colors hover:text-white" href="#demo">演示</Link>
              <Link className="text-sm font-medium text-gray-300 transition-colors hover:text-white" href="/login">登录</Link>
              <Link className="rounded-md bg-[var(--primary-color)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-opacity-80" href="/register">注册</Link>
            </nav>
            <button className="md:hidden">
              <span className="material-symbols-outlined"> menu </span>
            </button>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 py-24 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                  展示您的
                  <span className="bg-gradient-to-r from-[var(--primary-color)] to-blue-400 bg-clip-text text-transparent"> 技术作品</span>
                </h1>
                <p className="mt-6 text-lg text-gray-400 sm:text-xl">
                  创建专业的个人作品集网站，展示您的项目、技能和成就。让雇主和客户更好地了解您的技术实力。
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    className="rounded-lg bg-[var(--primary-color)] px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-opacity-80 hover:shadow-lg"
                    href="/register"
                  >
                    免费开始
                  </Link>
                  <Link
                    className="rounded-lg border border-gray-600 px-8 py-3 text-lg font-semibold text-gray-300 transition-all hover:bg-gray-800 hover:text-white"
                    href="/demo"
                  >
                    查看演示
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-24 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">强大的功能</h2>
                <p className="mt-4 text-lg text-gray-400">
                  我们提供了构建专业作品集网站所需的所有功能
                </p>
              </div>
              <div className="mt-16 grid gap-8 lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="rounded-lg bg-gray-800 p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                    <span className="material-symbols-outlined text-white"> web </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">个性化域名</h3>
                  <p className="mt-2 text-gray-400">
                    获得专属的个性化URL，如 yourname.techportfolio.com，让您的作品集更专业。
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="rounded-lg bg-gray-800 p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                    <span className="material-symbols-outlined text-white"> dashboard </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">项目管理</h3>
                  <p className="mt-2 text-gray-400">
                    轻松管理和展示您的项目，包括项目描述、技术栈、进度跟踪和成果展示。
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="rounded-lg bg-gray-800 p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                    <span className="material-symbols-outlined text-white"> person </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">个人资料</h3>
                  <p className="mt-2 text-gray-400">
                    完整的个人资料管理，包括教育背景、工作经历、技能展示和联系方式。
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="rounded-lg bg-gray-800 p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                    <span className="material-symbols-outlined text-white"> chat </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">AI智能助手</h3>
                  <p className="mt-2 text-gray-400">
                    内置AI聊天助手，帮助访问者了解您的项目和技能，提供智能问答服务。
                  </p>
                </div>

                {/* Feature 5 */}
                <div className="rounded-lg bg-gray-800 p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                    <span className="material-symbols-outlined text-white"> phone_android </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">响应式设计</h3>
                  <p className="mt-2 text-gray-400">
                    完美适配桌面、平板和手机设备，确保您的作品集在任何设备上都美观实用。
                  </p>
                </div>

                {/* Feature 6 */}
                <div className="rounded-lg bg-gray-800 p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                    <span className="material-symbols-outlined text-white"> security </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">安全可靠</h3>
                  <p className="mt-2 text-gray-400">
                    采用现代化的安全技术，保护您的数据安全，支持安全的用户认证和授权。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Demo Section */}
          <section id="demo" className="bg-gray-800/50 py-24 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">查看演示</h2>
                <p className="mt-4 text-lg text-gray-400">
                  体验我们的平台功能，查看真实的作品集示例
                </p>
                <div className="mt-8">
                  <Link
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary-color)] px-6 py-3 text-lg font-semibold text-white transition-all hover:bg-opacity-80"
                    href="/demo"
                  >
                    <span className="material-symbols-outlined"> visibility </span>
                    查看演示作品集
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  准备好展示您的作品了吗？
                </h2>
                <p className="mt-4 text-lg text-gray-400">
                  加入我们的平台，创建属于您的专业作品集网站
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    className="rounded-lg bg-[var(--primary-color)] px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-opacity-80"
                    href="/register"
                  >
                    立即注册
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
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-gray-900 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-2">
                <svg className="h-6 w-6 text-[var(--primary-color)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
                <span className="font-semibold">TechPortfolio</span>
              </div>
              <p className="text-sm text-gray-400">
                © 2025 TechPortfolio. 保留所有权利。
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
