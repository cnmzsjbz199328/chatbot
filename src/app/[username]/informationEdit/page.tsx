import Link from 'next/link';
import UserProfileForm from '@/components/UserProfileForm';

interface InformationEditPageProps {
  params: {
    username: string;
  };
}

export default async function InformationEditPage({ params }: InformationEditPageProps) {
  const { username } = await params;

  return (
    <div className="relative flex size-full min-h-screen flex-row overflow-x-hidden bg-gray-900 font-sans text-white" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <aside className="sticky top-0 h-screen w-64 flex-shrink-0 bg-gray-800 p-6">
        <div className="flex items-center gap-2">
          <svg className="h-8 w-8 text-[var(--primary-color)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
          </svg>
          <h1 className="text-xl font-bold leading-tight tracking-[-0.015em]">管理后台</h1>
        </div>
        <nav className="mt-8 flex flex-col gap-4">
          <Link className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white" href={`/${username}/projectManagement`}>
            <span className="material-symbols-outlined"> folder_managed </span>
            <span>项目管理</span>
          </Link>
          <Link className="flex items-center gap-3 rounded-md bg-[var(--primary-color)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-opacity-80" href={`/${username}/informationEdit`}>
            <span className="material-symbols-outlined"> person </span>
            <span>个人信息</span>
          </Link>
        </nav>
        <div className="mt-auto">
          <a className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white" href="#">
            <span className="material-symbols-outlined"> logout </span>
            <span>退出登录</span>
          </a>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 w-full border-b border-gray-700 bg-gray-900/80 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">个人信息编辑</h2>
          </div>
        </header>
        <div className="p-8">
          <UserProfileForm />
            <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
              <h3 className="mb-6 text-xl font-bold">文件上传</h3>
              <div className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-700/50 hover:bg-gray-700">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <span className="material-symbols-outlined text-4xl text-gray-400"> cloud_upload </span>
                  <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">点击上传</span> 或拖拽文件至此</p>
                  <p className="text-xs text-gray-500">支持PDF、DOCX、MD等文件格式</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-400">已上传文件：</p>
              <ul className="mt-2 list-disc list-inside space-y-1 text-gray-300">
                <li>my_resume_v3.pdf <button className="ml-2 text-red-500 hover:text-red-400"><span className="material-symbols-outlined text-sm">delete</span></button></li>
              </ul>
            </div>

            <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">教育经历</h3>
                <button className="flex items-center gap-2 rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-600">
                  <span className="material-symbols-outlined"> add </span>
                  <span>添加教育经历</span>
                </button>
              </div>
              <div className="mt-6 space-y-6">
                <div className="rounded-md border border-gray-700 p-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="school-1">学校</label>
                      <input className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="school-1" type="text" defaultValue="北京理工大学"/>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="degree-1">学位</label>
                      <input className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="degree-1" type="text" defaultValue="计算机科学学士"/>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="start-date-1">开始日期</label>
                      <input className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="start-date-1" type="date" defaultValue="2018-09-01"/>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="end-date-1">结束日期</label>
                      <input className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="end-date-1" type="date" defaultValue="2022-06-30"/>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="description-1">描述</label>
                    <textarea className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="description-1" rows={3} defaultValue="专注于软件工程、数据结构与算法、人工智能等核心课程，以优异成绩毕业。"></textarea>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="text-red-500 hover:text-red-400">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">工作经历</h3>
                <button className="flex items-center gap-2 rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-600">
                  <span className="material-symbols-outlined"> add </span>
                  <span>添加工作经历</span>
                </button>
              </div>
              <div className="mt-6 space-y-6">
                <div className="rounded-md border border-gray-700 p-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="company-1">公司</label>
                      <input className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="company-1" type="text" defaultValue="创新科技有限公司"/>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="position-1">职位</label>
                      <input className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="position-1" type="text" defaultValue="高级全栈开发工程师"/>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="work-start-1">开始日期</label>
                      <input className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="work-start-1" type="date" defaultValue="2022-07-01"/>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="work-end-1">结束日期</label>
                      <input className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="work-end-1" type="date"/>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="work-desc-1">工作描述</label>
                    <textarea className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="work-desc-1" rows={4} defaultValue="• 负责多个大型Web应用的前后端开发和架构设计&#10;• 带领5人开发团队，提升项目交付效率30%&#10;• 主导公司AI智能客服系统的开发，提升客户满意度25%&#10;• 优化系统性能，减少页面加载时间50%"></textarea>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="text-red-500 hover:text-red-400">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
              <h3 className="mb-6 text-xl font-bold">技能专长</h3>
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="frontend-skills">前端技术</label>
                  <input className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="frontend-skills" type="text" defaultValue="React, Vue.js, Next.js, TypeScript, Tailwind CSS"/>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="backend-skills">后端技术</label>
                  <input className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="backend-skills" type="text" defaultValue="Node.js, Python, PostgreSQL, MongoDB, Redis"/>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="cloud-skills">云服务与工具</label>
                  <input className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="cloud-skills" type="text" defaultValue="AWS, Docker, Kubernetes, Git, CI/CD"/>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="ai-skills">AI技术</label>
                  <input className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="ai-skills" type="text" defaultValue="机器学习, NLP, RAG系统, LangChain, 向量数据库"/>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
              <h3 className="mb-6 text-xl font-bold">联系信息</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="email">邮箱</label>
                  <input className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="email" type="email" defaultValue="contact@techportfolio.com"/>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="phone">电话</label>
                  <input className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="phone" type="tel" defaultValue="+86 138-0000-0000"/>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="location">位置</label>
                  <input className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="location" type="text" defaultValue="北京，中国"/>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="website">网站</label>
                  <input className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" id="website" type="url" defaultValue="www.techportfolio.com"/>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
              <h3 className="mb-6 text-xl font-bold">个人简介</h3>
              <textarea className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 px-4 text-white focus:border-primary-500 focus:ring-primary-500" rows={6} defaultValue="一位充满激情、注重结果的IT专业人士，在软件开发和项目管理方面拥有丰富的经验。专注于创新技术解决方案的开发，致力于提升用户体验和系统性能。具备强烈的学习能力和团队协作精神，能够在快节奏的环境中高效工作。"></textarea>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
