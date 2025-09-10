import Link from 'next/link';

interface ProjectManagementPageProps {
  params: {
    username: string;
  };
}

export default async function ProjectManagementPage({ params }: ProjectManagementPageProps) {
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
          <Link className="flex items-center gap-3 rounded-md bg-[var(--primary-color)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-opacity-80" href={`/${username}/projectManagement`}>
            <span className="material-symbols-outlined"> folder_managed </span>
            <span>项目管理</span>
          </Link>
          <Link className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white" href={`/${username}/informationEdit`}>
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
            <h2 className="text-2xl font-bold">项目管理</h2>
            <button className="flex items-center gap-2 rounded-md bg-[var(--primary-color)] px-4 py-2 text-sm font-semibold text-white hover:bg-opacity-80">
              <span className="material-symbols-outlined"> add </span>
              <span>添加新项目</span>
            </button>
          </div>
        </header>
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <select className="rounded-md bg-gray-800 px-3 py-2 text-sm">
                <option>所有项目</option>
                <option>进行中</option>
                <option>已完成</option>
                <option>已暂停</option>
              </select>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"> search </span>
                <input className="rounded-md bg-gray-800 pl-10 pr-4 py-2 text-sm placeholder-gray-400" placeholder="搜索项目..." type="text"/>
              </div>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {/* Project Card 1 */}
            <div className="rounded-lg bg-gray-800 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">电子商务平台</h3>
                <span className="rounded-full bg-green-900 px-2 py-1 text-xs font-medium text-green-200">进行中</span>
              </div>
              <p className="mb-4 text-sm text-gray-400">一个功能齐全的电子商务平台，具有用户身份验证、产品目录、购物车和支付网关集成。</p>
              <div className="mb-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span>进度</span>
                  <span>75%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-700">
                  <div className="h-2 rounded-full bg-[var(--primary-color)]" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-md bg-blue-900 px-2 py-1 text-xs text-blue-200">React</span>
                <span className="rounded-md bg-green-900 px-2 py-1 text-xs text-green-200">Node.js</span>
                <span className="rounded-md bg-purple-900 px-2 py-1 text-xs text-purple-200">MongoDB</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>开始日期: 2024-01-15</span>
                <span>截止日期: 2024-12-31</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-md bg-[var(--primary-color)] py-2 text-sm font-medium text-white hover:bg-opacity-80">编辑</button>
                <button className="rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  <span className="material-symbols-outlined text-sm"> more_vert </span>
                </button>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="rounded-lg bg-gray-800 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">数据分析仪表板</h3>
                <span className="rounded-full bg-blue-900 px-2 py-1 text-xs font-medium text-blue-200">已完成</span>
              </div>
              <p className="mb-4 text-sm text-gray-400">一个实时数据可视化和分析仪表板，用于监控业务指标和生成深入的报告。</p>
              <div className="mb-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span>进度</span>
                  <span>100%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-700">
                  <div className="h-2 rounded-full bg-green-600" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-md bg-blue-900 px-2 py-1 text-xs text-blue-200">Vue.js</span>
                <span className="rounded-md bg-orange-900 px-2 py-1 text-xs text-orange-200">Python</span>
                <span className="rounded-md bg-red-900 px-2 py-1 text-xs text-red-200">Redis</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>开始日期: 2023-09-01</span>
                <span>完成日期: 2024-02-15</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-md bg-[var(--primary-color)] py-2 text-sm font-medium text-white hover:bg-opacity-80">查看</button>
                <button className="rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  <span className="material-symbols-outlined text-sm"> more_vert </span>
                </button>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="rounded-lg bg-gray-800 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">AI智能助手</h3>
                <span className="rounded-full bg-green-900 px-2 py-1 text-xs font-medium text-green-200">进行中</span>
              </div>
              <p className="mb-4 text-sm text-gray-400">基于大语言模型的智能对话系统，支持文档上传和智能问答功能。</p>
              <div className="mb-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span>进度</span>
                  <span>60%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-700">
                  <div className="h-2 rounded-full bg-[var(--primary-color)]" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-md bg-blue-900 px-2 py-1 text-xs text-blue-200">Next.js</span>
                <span className="rounded-md bg-purple-900 px-2 py-1 text-xs text-purple-200">AI</span>
                <span className="rounded-md bg-green-900 px-2 py-1 text-xs text-green-200">RAG</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>开始日期: 2024-03-01</span>
                <span>截止日期: 2024-10-30</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-md bg-[var(--primary-color)] py-2 text-sm font-medium text-white hover:bg-opacity-80">编辑</button>
                <button className="rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  <span className="material-symbols-outlined text-sm"> more_vert </span>
                </button>
              </div>
            </div>

            {/* Project Card 4 */}
            <div className="rounded-lg bg-gray-800 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">移动应用开发</h3>
                <span className="rounded-full bg-yellow-900 px-2 py-1 text-xs font-medium text-yellow-200">计划中</span>
              </div>
              <p className="mb-4 text-sm text-gray-400">一个跨平台的移动应用程序，提供直观的用户界面和丰富的功能体验。</p>
              <div className="mb-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span>进度</span>
                  <span>10%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-700">
                  <div className="h-2 rounded-full bg-yellow-600" style={{ width: '10%' }}></div>
                </div>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-md bg-blue-900 px-2 py-1 text-xs text-blue-200">React Native</span>
                <span className="rounded-md bg-orange-900 px-2 py-1 text-xs text-orange-200">Firebase</span>
                <span className="rounded-md bg-purple-900 px-2 py-1 text-xs text-purple-200">TypeScript</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>预计开始: 2024-11-01</span>
                <span>预计完成: 2025-06-30</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-md bg-[var(--primary-color)] py-2 text-sm font-medium text-white hover:bg-opacity-80">开始</button>
                <button className="rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  <span className="material-symbols-outlined text-sm"> more_vert </span>
                </button>
              </div>
            </div>

            {/* Project Card 5 */}
            <div className="rounded-lg bg-gray-800 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">云架构迁移</h3>
                <span className="rounded-full bg-red-900 px-2 py-1 text-xs font-medium text-red-200">已暂停</span>
              </div>
              <p className="mb-4 text-sm text-gray-400">将现有系统迁移到云环境，提升系统可扩展性和可靠性。</p>
              <div className="mb-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span>进度</span>
                  <span>30%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-700">
                  <div className="h-2 rounded-full bg-red-600" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-md bg-orange-900 px-2 py-1 text-xs text-orange-200">AWS</span>
                <span className="rounded-md bg-blue-900 px-2 py-1 text-xs text-blue-200">Docker</span>
                <span className="rounded-md bg-green-900 px-2 py-1 text-xs text-green-200">Kubernetes</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>开始日期: 2024-02-01</span>
                <span>暂停日期: 2024-05-15</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-md bg-[var(--primary-color)] py-2 text-sm font-medium text-white hover:bg-opacity-80">恢复</button>
                <button className="rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  <span className="material-symbols-outlined text-sm"> more_vert </span>
                </button>
              </div>
            </div>

            {/* Project Card 6 */}
            <div className="rounded-lg bg-gray-800 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">区块链应用</h3>
                <span className="rounded-full bg-blue-900 px-2 py-1 text-xs font-medium text-blue-200">已完成</span>
              </div>
              <p className="mb-4 text-sm text-gray-400">基于区块链技术的去中心化应用，实现数据透明和安全存储。</p>
              <div className="mb-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span>进度</span>
                  <span>100%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-700">
                  <div className="h-2 rounded-full bg-green-600" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-md bg-purple-900 px-2 py-1 text-xs text-purple-200">Solidity</span>
                <span className="rounded-md bg-blue-900 px-2 py-1 text-xs text-blue-200">Web3.js</span>
                <span className="rounded-md bg-orange-900 px-2 py-1 text-xs text-orange-200">Ethereum</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>开始日期: 2023-06-01</span>
                <span>完成日期: 2023-11-30</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-md bg-[var(--primary-color)] py-2 text-sm font-medium text-white hover:bg-opacity-80">查看</button>
                <button className="rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  <span className="material-symbols-outlined text-sm"> more_vert </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
