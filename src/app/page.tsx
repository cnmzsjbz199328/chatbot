import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
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
    </Layout>
  );
}
