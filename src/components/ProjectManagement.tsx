'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import ImageUploadField from '@/components/ImageUploadField';

interface UserProject {
  id?: number;
  title: string;
  description?: string;
  technologies?: string[];
  status?: string;
  progress?: string;
  startDate?: string;
  endDate?: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

const emptyFormData: UserProject = {
  title: '',
  description: '',
  technologies: [],
  status: 'active',
  progress: '0',
  startDate: '',
  endDate: '',
  githubUrl: '',
  liveUrl: '',
  imageUrl: ''
};

export default function ProjectManagement() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<UserProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProject, setEditingProject] = useState<UserProject | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState<UserProject>(emptyFormData);

  const loadProjects = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/user-projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      setMessage('加载项目失败');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const technologies = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, technologies }));
  };

  const handleCancel = () => {
    setEditingProject(null);
    setIsAddingNew(false);
    setFormData(emptyFormData);
  };

  const handleAddNewClick = () => {
    setEditingProject(null);
    setFormData(emptyFormData);
    setIsAddingNew(true);
  };

  const handleEditClick = (project: UserProject) => {
    setIsAddingNew(false);
    setEditingProject(project);
    setFormData({
      ...emptyFormData,
      ...project,
      technologies: project.technologies || [],
    });
  };

  const handleDelete = async (projectId: number) => {
    if (!user || !confirm('确定要删除这个项目吗？')) return;
    try {
      const response = await fetch(`/api/user-projects/${projectId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.id}` }
      });
      if (response.ok) {
        setMessage('项目删除成功！');
        loadProjects();
      } else {
        throw new Error('删除失败');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setMessage('删除失败，请重试');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setMessage('');

    const method = editingProject ? 'PUT' : 'POST';
    const url = editingProject ? `/api/user-projects/${editingProject.id}` : '/api/user-projects';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage(editingProject ? '项目更新成功！' : '项目创建成功！');
        handleCancel();
        loadProjects();
      } else {
        throw new Error('操作失败');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setMessage('操作失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="rounded-lg bg-[var(--secondary-color)] p-6 text-center">
        <p className="text-[var(--text-secondary)]">请先log in以管理您的项目</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">项目管理</h2>
        <Button 
          onClick={handleAddNewClick} 
          className="flex items-center gap-2 w-full sm:w-auto justify-center min-h-[44px] px-4 py-2"
        >
          <span className="material-symbols-outlined">add</span>
          <span>添加新项目</span>
        </Button>
      </header>

      {message && (
        <div className={`rounded-lg p-3 sm:p-4 text-center text-sm ${message.includes('成功') ? 'bg-green-900/20 border border-green-500 text-green-400' : 'bg-red-900/20 border border-red-500 text-red-400'}`}>
          {message}
        </div>
      )}

      {(isAddingNew || editingProject) && (
        <div className="rounded-lg bg-[var(--secondary-color)] p-4 sm:p-6 shadow-lg">
          <h3 className="mb-4 sm:mb-6 text-lg sm:text-xl font-bold">
            {editingProject ? `编辑项目：${editingProject.title}` : '添加新项目'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">项目标题 *</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                required 
                className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)] px-3 py-2 sm:px-4 text-sm sm:text-base text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500 min-h-[44px]" 
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">项目描述</label>
              <textarea 
                name="description" 
                value={formData.description || ''} 
                onChange={handleInputChange} 
                rows={3} 
                className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)] px-3 py-2 sm:px-4 text-sm sm:text-base text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500" 
              />
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                项目图片
              </label>
              <ImageUploadField
                value={formData.imageUrl || ''}
                onChange={(imageUrl) => setFormData(prev => ({ ...prev, imageUrl }))}
                placeholder="点击上传项目图片..."
                className="w-full"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">技术栈 (用逗号分隔)</label>
              <input 
                type="text" 
                value={formData.technologies?.join(', ') || ''} 
                onChange={handleTechnologiesChange} 
                placeholder="React, Node.js" 
                className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)] px-3 py-2 sm:px-4 text-sm sm:text-base text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500 min-h-[44px]" 
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">GitHub 链接</label>
                <input 
                  type="url" 
                  name="githubUrl" 
                  value={formData.githubUrl || ''} 
                  onChange={handleInputChange} 
                  className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)] px-3 py-2 sm:px-4 text-sm sm:text-base text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500 min-h-[44px]" 
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">演示链接</label>
                <input 
                  type="url" 
                  name="liveUrl" 
                  value={formData.liveUrl || ''} 
                  onChange={handleInputChange} 
                  className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)] px-3 py-2 sm:px-4 text-sm sm:text-base text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500 min-h-[44px]" 
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
                className="w-full sm:w-auto min-h-[44px]"
              >
                取消
              </Button>
              <Button 
                type="submit" 
                loading={isSubmitting}
                className="w-full sm:w-auto min-h-[44px]"
              >
                {editingProject ? '更新项目' : '创建项目'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* 移动端：卡片视图 */}
      <div className="block lg:hidden space-y-4">
        <h3 className="text-lg sm:text-xl font-bold">所有项目</h3>
        {isLoading ? (
          <div className="text-center py-8 text-[var(--text-secondary)]">加载中...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-8 text-[var(--text-secondary)]">未找到任何项目。</div>
        ) : (
          projects.map(project => (
            <div key={project.id} className="rounded-lg bg-[var(--secondary-color)] p-4 shadow-lg border border-[var(--border-color)]">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-lg flex-1">{project.title}</h4>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${project.status === 'completed' ? 'bg-green-900/50 text-green-300' : project.status === 'active' ? 'bg-blue-900/50 text-blue-300' : 'bg-[var(--accent-color)] text-[var(--text-secondary)]'}`}>
                  {project.status === 'completed' ? '已完成' : project.status === 'active' ? '进行中' : '已归档'}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">{project.description}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => handleEditClick(project)}
                  className="flex-1 justify-center gap-2 min-h-[44px]"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                  <span>编辑</span>
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => handleDelete(project.id!)}
                  className="flex-1 justify-center gap-2 text-red-500 hover:text-red-400 hover:bg-red-900/20 min-h-[44px]"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                  <span>删除</span>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 桌面端：表格视图 */}
      <div className="hidden lg:block mt-8 rounded-lg bg-[var(--secondary-color)] p-6 shadow-lg">
        <h3 className="mb-6 text-xl font-bold">所有项目</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="px-4 py-3 text-sm font-medium">项目名称</th>
                <th className="px-4 py-3 text-sm font-medium">描述</th>
                <th className="px-4 py-3 text-sm font-medium">状态</th>
                <th className="px-4 py-3 text-sm font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className="text-center py-4">加载中...</td></tr>
              ) : projects.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-4 text-[var(--text-secondary)]">未找到任何项目。</td></tr>
              ) : (
                projects.map(project => (
                  <tr key={project.id} className="border-b border-[var(--border-color)] hover:bg-[var(--accent-color)]/50">
                    <td className="px-4 py-3 font-medium">{project.title}</td>
                    <td className="max-w-xs truncate px-4 py-3 text-[var(--text-secondary)]">{project.description}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${project.status === 'completed' ? 'bg-green-900/50 text-green-300' : project.status === 'active' ? 'bg-blue-900/50 text-blue-300' : 'bg-[var(--accent-color)] text-[var(--text-secondary)]'}`}>
                        {project.status === 'completed' ? '已完成' : project.status === 'active' ? '进行中' : '已归档'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(project)}>
                          <span className="material-symbols-outlined">edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => project.id && handleDelete(project.id)}>
                          <span className="material-symbols-outlined text-red-500">delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}