import Link from 'next/link';
import Image from 'next/image';

export default function ProjectsPage() {
  // 示例项目数据 - 在实际应用中这些数据会从数据库获取
  const projects = [
    {
      id: 1,
      title: "电子商务平台",
      description: "一个功狗付网关集成。",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      projectUrl: "#",
      githubUrl: "#",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"]
    },
    {
      id: 2,
      title: "数据分析仪表板",
      description: "一个用于可视化和分析狗式仪表板，具有过滤和下钻功能。",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
      projectUrl: "#",
      githubUrl: "#",
      tags: ["Vue.js", "D3.js", "Python", "FastAPI"]
    },
    {
      id: 3,
      title: "任务管理移动应用",
      description: "一款用于管理任务和待办事项的移动应用，具有提醒、分类和进度跟踪等功能。",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
      projectUrl: "#",
      githubUrl: "#",
      tags: ["React Native", "Firebase", "TypeScript"]
    },
    {
      id: 4,
      title: "博客网站",
      description: "一个使用现代框架构建的个人博客网站，具有响应式设计和内容管理系统集成。",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
      projectUrl: "#",
      githubUrl: "#",
      tags: ["Next.js", "MDX", "TailwindCSS"]
    },
    {
      id: 5,
      title: "作品集网站",
      description: "一个展示我的项目和技能的作品集网站，设计简洁专业。",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop",
      projectUrl: "#",
      githubUrl: "#",
      tags: ["React", "Framer Motion", "Vercel"]
    },
    {
      id: 6,
      title: "API开发",
      description: "为一个Web应用开发RESTful API，具有身份验证、数据验证和数据库集成等功能。",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop",
      projectUrl: "#",
      githubUrl: "#",
      tags: ["Go", "Gin", "PostgreSQL", "Docker"]
    }
  ];

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
                <Link className="text-sm font-medium text-[var(--primary-color)]" href="/projects">项目</Link>
                <Link className="text-sm font-medium text-gray-300 transition-colors hover:text-white" href="/about">关于</Link>
                <Link className="text-sm font-medium text-gray-300 transition-colors hover:text-white" href="/contact">联系</Link>
              </nav>
              <div className="flex items-center justify-end gap-4">
                <a className="text-gray-400 hover:text-white" href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
                  </svg>
                </a>
                <button className="md:hidden">
                  <span className="material-symbols-outlined"> menu </span>
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            <div className="container mx-auto flex flex-col px-4 py-10 sm:px-6 lg:flex-row lg:gap-8 lg:px-8">
              {/* Projects Grid */}
              <div className="flex-1">
                <div className="mb-12 text-center lg:text-left">
                  <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">精选项目</h2>
                  <p className="mt-4 text-lg text-gray-400">一系列展示我的IT技能和经验的项目。</p>
                </div>
                
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {projects.map((project) => (
                    <div key={project.id} className="group transform-gpu overflow-hidden rounded-lg bg-gray-800/50 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/30">
                      <div className="relative">
                        <div className="h-56 w-full overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={500}
                            height={300}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="text-xl font-bold">{project.title}</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="mb-4 text-gray-400">{project.description}</p>
                        
                        {/* Tags */}
                        <div className="mb-4 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-[var(--primary-color)]/20 px-3 py-1 text-xs font-medium text-[var(--primary-color)]">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-between">
                          <a 
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-color)] hover:underline" 
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            查看项目 <span className="material-symbols-outlined text-base">arrow_forward</span>
                          </a>
                          <a 
                            className="text-gray-400 hover:text-white transition-colors" 
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                              <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="w-full lg:w-96 lg:flex-shrink-0 mt-12 lg:mt-0">
                <div className="sticky top-20 rounded-lg bg-gray-800/50 p-6 shadow-lg">
                  <h3 className="mb-4 text-xl font-bold">搜索项目</h3>
                  <div className="relative">
                    <input 
                      className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 pl-10 pr-4 text-white focus:border-primary-500 focus:ring-primary-500 placeholder-gray-400" 
                      placeholder="搜索..." 
                      type="text"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-gray-400"> search </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <h4 className="font-semibold text-gray-300">技术栈筛选</h4>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Next.js', 'Vue.js', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'Docker'].map((tech) => (
                        <button 
                          key={tech}
                          className="rounded-full border border-gray-600 px-3 py-1 text-xs font-medium text-gray-300 hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors"
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h4 className="font-semibold text-gray-300">项目统计</h4>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex justify-between">
                        <span>总项目数</span>
                        <span className="font-medium text-white">{projects.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>开源项目</span>
                        <span className="font-medium text-white">{projects.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>使用技术</span>
                        <span className="font-medium text-white">15+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}