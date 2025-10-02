import { UserProjectModel } from '@/db/schema';
import Image from 'next/image';

interface ProjectCardProps {
  project: UserProjectModel;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  // 为每个项目分配不同的渐变色彩和图标
  const gradients = [
    'from-blue-600 to-purple-700',
    'from-green-600 to-teal-700',
    'from-purple-600 to-pink-700',
    'from-orange-600 to-red-700',
    'from-indigo-600 to-blue-700',
    'from-pink-600 to-rose-700'
  ];
  
  const icons = [
    'shopping_cart', 'analytics', 'chat', 'mobile_friendly', 
    'code', 'web', 'security', 'cloud', 'dashboard', 'api'
  ];
  
  const gradient = gradients[index % gradients.length];
  const icon = icons[index % icons.length];
  
  return (
    <div className="group transform-gpu overflow-hidden rounded-lg bg-gray-800/50 dark:bg-gray-800/50 light:bg-gray-100/50 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/30 h-full">
      <div className="flex h-full">
        {/* 左侧图片区域 */}
        <div className="relative w-1/2 flex-shrink-0">
          {project.imageUrl ? (
            <Image 
              src={project.imageUrl} 
              alt={project.title}
              width={300}
              height={400}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <span className="material-symbols-outlined text-6xl text-white">{icon}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            {project.status && (
              <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                project.status === 'completed' ? 'bg-green-600 text-white' :
                project.status === 'active' ? 'bg-blue-600 text-white' :
                'bg-gray-600 text-white'
              }`}>
                {project.status === 'completed' ? '已完成' :
                 project.status === 'active' ? '进行中' : '已存档'}
              </span>
            )}
          </div>
        </div>
        
        {/* 右侧内容区域 */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <p className="mb-4 text-[var(--text-secondary)]">
              {project.description || '暂无项目描述'}
            </p>
            
            {/* 技术栈标签 */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span key={techIndex} className="inline-block bg-gray-700 dark:bg-gray-700 light:bg-gray-300 px-2 py-1 rounded text-xs text-gray-300 dark:text-gray-300 light:text-gray-700">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="inline-block bg-gray-700 dark:bg-gray-700 light:bg-gray-300 px-2 py-1 rounded text-xs text-gray-300 dark:text-gray-300 light:text-gray-700">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {project.liveUrl && (
                <a 
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-color)] hover:underline" 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check out the project
                </a>
              )}
            </div>
            {project.githubUrl && (
              <a 
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]" 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58a43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
