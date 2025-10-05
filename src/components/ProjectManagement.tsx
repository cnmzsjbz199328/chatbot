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
  const [searchQuery, setSearchQuery] = useState('');

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

  // 过滤项目列表
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Button 
          onClick={handleAddNewClick} 
          className="flex items-center gap-2 w-full sm:w-auto justify-center min-h-[44px] px-4 py-2"
        >
          <span className="material-symbols-outlined">add</span>
          <span>Add New Project</span>
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
            {editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Project'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">Project Title *</label>
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
                Project Image
              </label>
              <ImageUploadField
                value={formData.imageUrl || ''}
                onChange={(imageUrl) => setFormData(prev => ({ ...prev, imageUrl }))}
                placeholder="Click to upload project image..."
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
                Cancel
              </Button>
              <Button 
                type="submit" 
                loading={isSubmitting}
                className="w-full sm:w-auto min-h-[44px]"
              >
                {editingProject ? 'Update Project' : 'Create Project'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* 移动端：精简卡片视图 */}
      <div className="block lg:hidden space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search project title..."
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--accent-color)] pl-10 pr-4 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] min-h-[44px]"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] text-xl">
              search
            </span>
          </div>
        </div>
        {isLoading ? (
          <div className="text-center py-8 text-[var(--text-secondary)]">Loading...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-8 text-[var(--text-secondary)]">No projects found.</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-8 text-[var(--text-secondary)]">No matching projects found.</div>
        ) : (
          filteredProjects.map(project => (
            <div key={project.id} className="rounded-lg bg-[var(--secondary-color)] p-3 shadow border border-[var(--border-color)]">
              <div className="flex items-center gap-3">
                {/* 标题和状态 */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-base truncate mb-1">{project.title}</h4>
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${project.status === 'completed' ? 'bg-green-900/50 text-green-300' : project.status === 'active' ? 'bg-blue-900/50 text-blue-300' : 'bg-[var(--accent-color)] text-[var(--text-secondary)]'}`}>
                    {project.status === 'completed' ? 'Completed' : project.status === 'active' ? 'In Progress' : 'Archived'}
                  </span>
                </div>
                {/* 操作按钮 */}
                <div className="flex gap-1 flex-shrink-0">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEditClick(project)}
                    className="min-h-[44px] min-w-[44px]"
                  >
                    <span className="material-symbols-outlined text-xl">edit</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(project.id!)}
                    className="min-h-[44px] min-w-[44px] text-red-500 hover:text-red-400 hover:bg-red-900/20"
                  >
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 桌面端：表格视图 */}
      <div className="hidden lg:block mt-8 rounded-lg bg-[var(--secondary-color)] p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search project title..."
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--accent-color)] pl-10 pr-4 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] min-h-[44px]"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] text-xl">
              search
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="px-4 py-3 text-sm font-medium">Project Name</th>
                <th className="px-4 py-3 text-sm font-medium">Description</th>
                <th className="px-4 py-3 text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className="text-center py-4">Loading...</td></tr>
              ) : projects.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-4 text-[var(--text-secondary)]">No projects found.</td></tr>
              ) : filteredProjects.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-4 text-[var(--text-secondary)]">No matching projects found.</td></tr>
              ) : (
                filteredProjects.map(project => (
                  <tr key={project.id} className="border-b border-[var(--border-color)] hover:bg-[var(--accent-color)]/50">
                    <td className="px-4 py-3 font-medium">{project.title}</td>
                    <td className="max-w-xs truncate px-4 py-3 text-[var(--text-secondary)]">{project.description}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${project.status === 'completed' ? 'bg-green-900/50 text-green-300' : project.status === 'active' ? 'bg-blue-900/50 text-blue-300' : 'bg-[var(--accent-color)] text-[var(--text-secondary)]'}`}>
                        {project.status === 'completed' ? 'Completed' : project.status === 'active' ? 'In Progress' : 'Archived'}
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