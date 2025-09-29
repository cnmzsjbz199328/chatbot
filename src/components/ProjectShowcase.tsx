'use client';
import { UserProjectModel } from '@/db/schema';
import { useState } from 'react';
import ProjectCard from './ProjectCard';

interface ProjectShowcaseProps {
  projects: UserProjectModel[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<UserProjectModel | null>(
    projects.length > 0 ? projects[0] : null
  );

  const handleProjectSelect = (project: UserProjectModel) => {
    setSelectedProject(project);
  };

  if (projects.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-gray-600 mb-4 block">folder_open</span>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">暂无项目</h3>
          <p className="text-gray-500">该用户还没有添加任何项目。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 h-96">
      {/* 左侧项目列表 */}
      <div className="w-1/3 min-w-64">
        <h3 className="text-lg font-semibold text-white mb-4">项目列表</h3>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleProjectSelect(project)}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                selectedProject?.id === project.id
                  ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/10 text-white'
                  : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">
                  {project.icon || 'folder'}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{project.title}</h4>
                  <p className="text-sm text-gray-400 truncate">
                    {project.status === 'completed' ? '已完成' : 
                     project.status === 'in_progress' ? '进行中' : '计划中'}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 右侧项目详情 */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white mb-4">项目详情</h3>
        {selectedProject ? (
          <div className="h-full">
            <ProjectCard project={selectedProject} index={0} />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl text-gray-600 mb-2 block">touch_app</span>
              <p className="text-gray-400">请选择一个项目查看详情</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
