/**
 * 项目列表项组件
 * 显示单个项目的信息和操作按钮
 */

'use client';

import { Button } from '@/components/ui/button';
import { UserProject } from '@/types/project';

interface ProjectListItemProps {
  project: UserProject;
  onEdit: (project: UserProject) => void;
  onDelete: (projectId: number) => void;
}

export default function ProjectListItem({ project, onEdit, onDelete }: ProjectListItemProps) {
  /**
   * 获取状态样式
   */
  const getStatusStyle = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/50 text-green-300';
      case 'active':
        return 'bg-blue-900/50 text-blue-300';
      default:
        return 'bg-[var(--accent-color)] text-[var(--text-secondary)]';
    }
  };

  /**
   * 获取状态标签
   */
  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'active':
        return 'In Progress';
      default:
        return 'Archived';
    }
  };

  return (
    <tr className="border-b border-[var(--border-color)] hover:bg-[var(--accent-color)]/50 transition-colors">
      <td className="px-4 py-3 font-medium text-[var(--text-primary)]">
        {project.title}
      </td>
      <td className="max-w-xs truncate px-4 py-3 text-[var(--text-secondary)]">
        {project.description || '-'}
      </td>
      <td className="px-4 py-3">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(project.status)}`}>
          {getStatusLabel(project.status)}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onEdit(project)}
            title="Edit project"
          >
            <span className="material-symbols-outlined">edit</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => project.id && onDelete(project.id)}
            title="Delete project"
          >
            <span className="material-symbols-outlined text-red-500">delete</span>
          </Button>
        </div>
      </td>
    </tr>
  );
}
