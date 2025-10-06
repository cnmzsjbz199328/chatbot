/**
 * 项目列表组件
 * 显示所有项目，支持搜索和操作
 */

'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import ProjectListItem from './ProjectListItem';
import ProjectSearch from './ProjectSearch';
import { UserProject } from '@/types/project';

interface ProjectListProps {
  projects: UserProject[];
  isLoading: boolean;
  onAddNew: () => void;
  onEdit: (project: UserProject) => void;
  onDelete: (projectId: number) => void;
}

export default function ProjectList({ 
  projects, 
  isLoading, 
  onAddNew, 
  onEdit, 
  onDelete 
}: ProjectListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * 根据搜索查询过滤项目
   */
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    
    const query = searchQuery.toLowerCase();
    return projects.filter(project =>
      project.title.toLowerCase().includes(query) ||
      project.description?.toLowerCase().includes(query) ||
      project.technologies?.some(tech => tech.toLowerCase().includes(query))
    );
  }, [projects, searchQuery]);

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Button 
          onClick={onAddNew} 
          className="flex items-center gap-2 w-full sm:w-auto justify-center min-h-[44px] px-4 py-2"
        >
          <span className="material-symbols-outlined">add</span>
          <span>Add New Project</span>
        </Button>
        <ProjectSearch value={searchQuery} onChange={setSearchQuery} />
      </header>

      {/* Projects Table */}
      <div className="overflow-hidden rounded-lg border border-[var(--border-color)] bg-[var(--secondary-color)] shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[var(--border-color)] bg-[var(--accent-color)]/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-primary)]">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-primary)]">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-primary)]">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-primary)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-[var(--text-secondary)]">
                    <div className="flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined animate-spin">refresh</span>
                      <span>Loading projects...</span>
                    </div>
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-[var(--text-secondary)]">
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-4xl">folder_open</span>
                      <span>No projects found. Click &quot;Add New Project&quot; to get started!</span>
                    </div>
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-[var(--text-secondary)]">
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-4xl">search_off</span>
                      <span>No matching projects found for &quot;{searchQuery}&quot;</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProjects.map(project => (
                  <ProjectListItem
                    key={project.id}
                    project={project}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results Info */}
      {!isLoading && projects.length > 0 && (
        <div className="text-sm text-[var(--text-secondary)] text-center">
          Showing {filteredProjects.length} of {projects.length} project{projects.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
