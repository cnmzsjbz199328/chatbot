'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';

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

export default function ProjectManagement() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<UserProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<UserProject | null>(null);
  const [message, setMessage] = useState('');

  // 表单状态
  const [formData, setFormData] = useState<UserProject>({
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
  });

  const loadProjects = useCallback(async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/user-projects', {
        headers: {
          'Authorization': `Bearer ${user.id}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  }, [user]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const technologies = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      technologies
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setMessage('');

    try {
      const method = editingProject ? 'PUT' : 'POST';
      const url = editingProject 
        ? `/api/user-projects/${editingProject.id}` 
        : '/api/user-projects';

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
        setIsModalOpen(false);
        setEditingProject(null);
        setFormData({
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
        });
        loadProjects();
      } else {
        throw new Error('操作失败');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setMessage('操作失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project: UserProject) => {
    setEditingProject(project);
    setFormData({
      ...project,
      technologies: project.technologies || [],
      startDate: project.startDate || '',
      endDate: project.endDate || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      imageUrl: project.imageUrl || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (projectId: number) => {
    if (!user || !confirm('确定要删除这个项目吗？')) return;

    try {
      const response = await fetch(`/api/user-projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.id}`
        }
      });

      if (response.ok) {
        setMessage('项目删除成功！');
        loadProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setMessage('删除失败，请重试');
    }
  };

  const openNewProjectModal = () => {
    setEditingProject(null);
    setFormData({
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
    });
    setIsModalOpen(true);
  };

  if (!user) {
    return (
      <div className="rounded-lg bg-gray-800 p-6 text-center">
        <p className="text-gray-400">请先登录以管理您的项目</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <Button
          onClick={openNewProjectModal}
          className="flex items-center gap-2"
        >
          Add New Project
        </Button>
      </div>

      {/* 消息提示 */}
      {message && (
        <div className={`rounded-lg p-4 text-center ${
          message.includes('成功') || message.includes('删除成功')
            ? 'bg-green-900/20 border border-green-500 text-green-400' 
            : 'bg-red-900/20 border border-red-500 text-red-400'
        }`}>
          {message}
          <Button 
            onClick={() => setMessage('')}
            variant="ghost"
            size="sm"
            className="ml-2 text-sm underline"
          >
            关闭
          </Button>
        </div>
      )}

      {/* 项目列表 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <div key={project.id} className="rounded-lg bg-gray-800 p-6 shadow-lg">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{project.description}</p>
            </div>

            {/* 进度条 */}
            <div className="mb-4">
              <div className="mb-2 flex justify-between text-sm">
                <span>进度</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-700">
                <div 
                  className="h-2 rounded-full bg-[var(--primary-color)]" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* 技术栈 */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-900 px-3 py-1 text-xs text-blue-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 状态 */}
            <div className="mb-4">
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                project.status === 'completed' 
                  ? 'bg-green-900 text-green-200'
                  : project.status === 'active'
                  ? 'bg-blue-900 text-blue-200' 
                  : 'bg-gray-700 text-gray-300'
              }`}>
                {project.status === 'completed' ? '已完成' : 
                 project.status === 'active' ? '进行中' : '已归档'}
              </span>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-2">
              <Button
                onClick={() => handleEdit(project)}
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                编辑
              </Button>
              <Button
                onClick={() => project.id && handleDelete(project.id)}
                variant="destructive"
                size="sm"
              >
                删除
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 添加/编辑项目模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-gray-800 p-6">
            <h3 className="mb-6 text-xl font-bold">
              {editingProject ? '编辑项目' : '添加新项目'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  项目标题 *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  项目描述
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    状态
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="active">进行中</option>
                    <option value="completed">已完成</option>
                    <option value="archived">已归档</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    完成进度 (%)
                  </label>
                  <input
                    type="number"
                    name="progress"
                    value={formData.progress}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  技术栈 (用逗号分隔)
                </label>
                <input
                  type="text"
                  value={formData.technologies?.join(', ') || ''}
                  onChange={handleTechnologiesChange}
                  placeholder="React, Node.js, PostgreSQL"
                  className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    开始日期
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    结束日期
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    GitHub 链接
                  </label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username/repo"
                    className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    演示链接
                  </label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    placeholder="https://yourproject.com"
                    className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  variant="outline"
                  className="flex-1"
                >
                  取消
                </Button>
                <Button
                  type="submit"
                  loading={isLoading}
                  className="flex-1"
                >
                  {editingProject ? '更新项目' : '创建项目'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
