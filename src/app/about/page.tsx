import Link from 'next/link';

export default function AboutPage() {
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
                  <h1 className="text-xl font-bold leading-tight tracking-[-0.015em]">Tech Portfolio</h1>
                </Link>
              </div>
              <nav className="hidden items-center gap-8 md:flex">
                <Link className="text-sm font-medium text-gray-300 transition-colors hover:text-white" href="/projects">项目</Link>
                <Link className="text-sm font-medium text-[var(--primary-color)]" href="/about">关于</Link>
                <Link className="text-sm font-medium text-gray-300 transition-colors hover:text-white" href="/contact">联系</Link>
              </nav>
              <button className="md:hidden">
                <span className="material-symbols-outlined"> menu </span>
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl">
                {/* Hero Section */}
                <div className="text-center">
                  <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">关于我</h2>
                  <p className="mt-4 text-lg text-gray-400">一位充满激情、注重结果的IT专业人士，在软件开发和项目管理方面拥有丰富的经验。</p>
                </div>

                <div className="mt-16 space-y-16">
                  {/* Education Section */}
                  <section>
                    <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
                      <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> school </span>
                      教育经历
                    </h3>
                    <div className="space-y-8 border-l-2 border-gray-700 pl-8">
                      <div className="timeline-item">
                        <h4 className="text-xl font-semibold">某某大学</h4>
                        <p className="text-gray-400">计算机科学学士</p>
                        <p className="text-sm text-gray-500">2018年 - 2022年</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-400">
                          <li>主修计算机科学与技术，GPA 3.8/4.0</li>
                          <li>核心课程：数据结构、算法设计、数据库系统、软件工程</li>
                          <li>获得优秀毕业生称号，毕业设计获得优秀等级</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Work Experience Section */}
                  <section>
                    <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
                      <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> business_center </span>
                      工作经历
                    </h3>
                    <div className="space-y-12 border-l-2 border-gray-700 pl-8">
                      <div className="timeline-item">
                        <h4 className="text-xl font-semibold">某科技公司</h4>
                        <p className="font-medium text-gray-300">高级软件工程师</p>
                        <p className="text-sm text-gray-500">2022年 - 至今</p>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-400">
                          <li>负责设计、开发和维护大型Web应用程序，服务用户超过10万+</li>
                          <li>与跨职能团队合作，交付高质量的软件解决方案，项目按时交付率达95%</li>
                          <li>参与代码审查和指导初级开发人员，提升团队整体技术水平</li>
                          <li>主导微服务架构重构，系统性能提升40%，维护成本降低30%</li>
                        </ul>
                      </div>
                      <div className="timeline-item">
                        <h4 className="text-xl font-semibold">另一家科技公司</h4>
                        <p className="font-medium text-gray-300">软件开发实习生</p>
                        <p className="text-sm text-gray-500">2021年夏季</p>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-400">
                          <li>协助开发新功能并修复现有代码库中的错误，完成20+功能模块</li>
                          <li>学习并应用敏捷开发方法，参与每日站会和迭代规划</li>
                          <li>为内部工具的开发做出了贡献，提升团队工作效率15%</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Skills Section */}
                  <section>
                    <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
                      <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> code </span>
                      技能专长
                    </h3>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                      <div className="card">
                        <h4 className="mb-4 text-lg font-semibold">前端开发</h4>
                        <ul className="space-y-2 text-gray-400">
                          <li>• React / Next.js / Vue.js</li>
                          <li>• TypeScript / JavaScript</li>
                          <li>• TailwindCSS / Styled Components</li>
                          <li>• Webpack / Vite</li>
                        </ul>
                      </div>
                      <div className="card">
                        <h4 className="mb-4 text-lg font-semibold">后端开发</h4>
                        <ul className="space-y-2 text-gray-400">
                          <li>• Node.js / Python / Go</li>
                          <li>• Express / FastAPI / Gin</li>
                          <li>• PostgreSQL / MongoDB</li>
                          <li>• Redis / Docker</li>
                        </ul>
                      </div>
                      <div className="card">
                        <h4 className="mb-4 text-lg font-semibold">云服务 & DevOps</h4>
                        <ul className="space-y-2 text-gray-400">
                          <li>• AWS / Vercel / Supabase</li>
                          <li>• CI/CD / GitHub Actions</li>
                          <li>• Kubernetes / Docker</li>
                          <li>• Monitoring / Logging</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Interests Section */}
                  <section>
                    <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
                      <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> sports_esports </span>
                      兴趣爱好
                    </h3>
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800/50">
                          <span className="material-symbols-outlined text-4xl text-gray-400"> code </span>
                        </div>
                        <p className="text-gray-300">编程</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800/50">
                          <span className="material-symbols-outlined text-4xl text-gray-400"> menu_book </span>
                        </div>
                        <p className="text-gray-300">阅读</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800/50">
                          <span className="material-symbols-outlined text-4xl text-gray-400"> directions_run </span>
                        </div>
                        <p className="text-gray-300">跑步</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800/50">
                          <span className="material-symbols-outlined text-4xl text-gray-400"> music_note </span>
                        </div>
                        <p className="text-gray-300">音乐</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800/50">
                          <span className="material-symbols-outlined text-4xl text-gray-400"> photo_camera </span>
                        </div>
                        <p className="text-gray-300">摄影</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800/50">
                          <span className="material-symbols-outlined text-4xl text-gray-400"> travel_explore </span>
                        </div>
                        <p className="text-gray-300">旅行</p>
                      </div>
                    </div>
                  </section>

                  {/* Contact Section */}
                  <section>
                    <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
                      <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> contact_mail </span>
                      联系方式
                    </h3>
                    <div className="card">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="flex items-center gap-4">
                          <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">email</span>
                          <div>
                            <p className="font-medium">邮箱</p>
                            <p className="text-gray-400">contact@example.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">link</span>
                          <div>
                            <p className="font-medium">GitHub</p>
                            <p className="text-gray-400">github.com/username</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">work</span>
                          <div>
                            <p className="font-medium">LinkedIn</p>
                            <p className="text-gray-400">linkedin.com/in/username</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">location_on</span>
                          <div>
                            <p className="font-medium">位置</p>
                            <p className="text-gray-400">中国，北京</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}