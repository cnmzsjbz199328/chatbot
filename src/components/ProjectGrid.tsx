import { UserProjectModel } from '@/db/schema';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: UserProjectModel[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))
      ) : (
        // 如果没有项目数据，显示占位内容
        <div className="col-span-full text-center py-12">
          <span className="material-symbols-outlined text-6xl text-gray-600 mb-4 block">folder_open</span>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">暂无项目</h3>
          <p className="text-gray-500">该用户还没有添加任何项目。</p>
        </div>
      )}
    </div>
  );
}
