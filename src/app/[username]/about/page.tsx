import Link from 'next/link';

interface AboutPageProps {
  params: {
    username: string;
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { username } = await params;

  return (
    <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden bg-gray-900 font-sans text-white" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
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
              <Link className="text-sm font-medium text-gray-300 transition-colors hover:text-white" href="#">联系</Link>
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
                <p className="mt-4 text-lg text-gray-400">一位充满激情、注重结果的IT专业人士，在软件开发和项目管理方面拥有丰富的经验。</p>
              </div>
              <div className="mt-16 space-y-16">
                <section>
                  <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
                    <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> school </span>
                    教育经历
                  </h3>
                  <div className="rounded-lg bg-gray-800 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="text-xl font-semibold">计算机科学学士学位</h4>
                      <span className="text-gray-400">2018 - 2022</span>
                    </div>
                    <p className="mb-2 text-[var(--primary-color)]">北京理工大学</p>
                    <p className="text-gray-400">专注于软件工程、数据结构与算法、人工智能等核心课程，以优异成绩毕业。</p>
                  </div>
                </section>

                <section>
                  <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
                    <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> work </span>
                    工作经历
                  </h3>
                  <div className="space-y-6">
                    <div className="rounded-lg bg-gray-800 p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-xl font-semibold">高级全栈开发工程师</h4>
                        <span className="text-gray-400">2022 - 至今</span>
                      </div>
                      <p className="mb-3 text-[var(--primary-color)]">创新科技有限公司</p>
                      <ul className="space-y-2 text-gray-400">
                        <li>• 负责多个大型Web应用的前后端开发和架构设计</li>
                        <li>• 带领5人开发团队，提升项目交付效率30%</li>
                        <li>• 主导公司AI智能客服系统的开发，提升客户满意度25%</li>
                        <li>• 优化系统性能，减少页面加载时间50%</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-gray-800 p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-xl font-semibold">前端开发工程师</h4>
                        <span className="text-gray-400">2020 - 2022</span>
                      </div>
                      <p className="mb-3 text-[var(--primary-color)]">数字未来科技</p>
                      <ul className="space-y-2 text-gray-400">
                        <li>• 参与开发多个企业级SaaS平台的前端界面</li>
                        <li>• 使用React、Vue.js等技术栈构建响应式Web应用</li>
                        <li>• 与UI/UX团队紧密合作，提升用户体验</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
                    <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> code </span>
                    技能专长
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg bg-gray-800 p-6">
                      <h4 className="mb-4 text-lg font-semibold text-[var(--primary-color)]">前端技术</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">React</span>
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">Vue.js</span>
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">Next.js</span>
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">TypeScript</span>
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">Tailwind CSS</span>
                      </div>
                    </div>

                    <div className="rounded-lg bg-gray-800 p-6">
                      <h4 className="mb-4 text-lg font-semibold text-[var(--primary-color)]">后端技术</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">Node.js</span>
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">Python</span>
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">PostgreSQL</span>
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">MongoDB</span>
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">Redis</span>
                      </div>
                    </div>

                    <div className="rounded-lg bg-gray-800 p-6">
                      <h4 className="mb-4 text-lg font-semibold text-[var(--primary-color)]">云服务与工具</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">AWS</span>
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">Docker</span>
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">Kubernetes</span>
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">Git</span>
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">CI/CD</span>
                      </div>
                    </div>

                    <div className="rounded-lg bg-gray-800 p-6">
                      <h4 className="mb-4 text-lg font-semibold text-[var(--primary-color)]">AI技术</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">机器学习</span>
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">NLP</span>
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">RAG系统</span>
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">LangChain</span>
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">向量数据库</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
                    <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> emoji_events </span>
                    成就与认证
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 rounded-lg bg-gray-800 p-4">
                      <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">verified</span>
                      <div>
                        <h4 className="font-semibold">AWS认证解决方案架构师</h4>
                        <p className="text-sm text-gray-400">获得AWS云服务专业认证，熟练掌握云架构设计</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg bg-gray-800 p-4">
                      <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">verified</span>
                      <div>
                        <h4 className="font-semibold">阿里云高级架构师</h4>
                        <p className="text-sm text-gray-400">通过阿里云架构师认证，具备大规模系统设计能力</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg bg-gray-800 p-4">
                      <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">star</span>
                      <div>
                        <h4 className="font-semibold">年度最佳员工</h4>
                        <p className="text-sm text-gray-400">因出色的技术贡献和团队协作能力获得公司表彰</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
                    <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> contact_mail </span>
                    联系方式
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-center gap-4 rounded-lg bg-gray-800 p-6">
                      <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">email</span>
                      <div>
                        <h4 className="font-semibold">邮箱</h4>
                        <p className="text-gray-400">contact@techportfolio.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg bg-gray-800 p-6">
                      <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">phone</span>
                      <div>
                        <h4 className="font-semibold">电话</h4>
                        <p className="text-gray-400">+86 138-0000-0000</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg bg-gray-800 p-6">
                      <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">location_on</span>
                      <div>
                        <h4 className="font-semibold">位置</h4>
                        <p className="text-gray-400">北京，中国</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg bg-gray-800 p-6">
                      <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">language</span>
                      <div>
                        <h4 className="font-semibold">网站</h4>
                        <p className="text-gray-400">www.techportfolio.com</p>
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
  );
}
