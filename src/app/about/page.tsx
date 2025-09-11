import Link from 'next/link';
import Layout from '@/components/Layout';

export default function AboutPage() {
  return (
    <Layout>
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
    </Layout>
  );
}