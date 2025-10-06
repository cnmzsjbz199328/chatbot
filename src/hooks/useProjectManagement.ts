/**
 * 项目管理自定义 Hook
 * 封装所有项目管理相关的状态和业务逻辑
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { UserProject, ProjectFormData } from '@/types/project';
import { projectsApi } from '@/lib/api/projects';

const emptyFormData: ProjectFormData = {
  title: '',
  description: '',
  technologies: [],
  technologiesInput: '',
  status: 'active',
  progress: '0',
  startDate: '',
  endDate: '',
  githubUrl: '',
  liveUrl: '',
  imageUrl: ''
};

export function useProjectManagement() {
  const { user } = useAuth();
  
  // 状态管理
  const [projects, setProjects] = useState<UserProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProject, setEditingProject] = useState<UserProject | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState<ProjectFormData>(emptyFormData);

  /**
   * 加载项目列表
   */
  const loadProjects = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const data = await projectsApi.fetchProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
      setMessage('加载项目失败');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  /**
   * 初始加载项目
   */
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  /**
   * 处理表单输入变化
   */
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    },
    []
  );

  /**
   * 处理 Technologies 字段变化（保持逗号输入）
   */
  const handleTechnologiesChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData(prev => ({ ...prev, technologiesInput: value }));
    },
    []
  );

  /**
   * 处理图片上传
   */
  const handleImageChange = useCallback((imageUrl: string) => {
    setFormData(prev => ({ ...prev, imageUrl }));
  }, []);

  /**
   * 开始添加新项目
   */
  const startAddingNew = useCallback(() => {
    setEditingProject(null);
    setFormData(emptyFormData);
    setIsAddingNew(true);
    setMessage('');
  }, []);

  /**
   * 开始编辑项目
   */
  const startEditing = useCallback((project: UserProject) => {
    setIsAddingNew(false);
    setEditingProject(project);
    setFormData({
      ...emptyFormData,
      ...project,
      technologies: project.technologies || [],
      technologiesInput: project.technologies?.join(', ') || '',
    });
    setMessage('');
  }, []);

  /**
   * 取消编辑
   */
  const cancelEditing = useCallback(() => {
    setEditingProject(null);
    setIsAddingNew(false);
    setFormData(emptyFormData);
    setMessage('');
  }, []);

  /**
   * 删除项目
   */
  const deleteProject = useCallback(
    async (projectId: number) => {
      if (!user) return;
      
      if (!confirm('确定要删除这个项目吗？')) {
        return;
      }

      try {
        await projectsApi.deleteProject(user.id, projectId);
        setMessage('项目删除成功！');
        await loadProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        setMessage('删除失败，请重试');
      }
    },
    [user, loadProjects]
  );

  /**
   * 提交项目（创建或更新）
   */
  const submitProject = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!user) return;

      setIsSubmitting(true);
      setMessage('');

      try {
        // 处理 technologies：将逗号分隔的字符串转换为数组
        const technologies = formData.technologiesInput
          ? formData.technologiesInput
              .split(',')
              .map(t => t.trim())
              .filter(Boolean)
          : [];

        // 移除临时字段 technologiesInput
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { technologiesInput, ...submitData } = formData;
        const dataToSubmit = { ...submitData, technologies };

        if (editingProject && editingProject.id) {
          // 更新现有项目
          await projectsApi.updateProject(user.id, editingProject.id, dataToSubmit);
          setMessage('项目更新成功！');
        } else {
          // 创建新项目
          await projectsApi.createProject(user.id, dataToSubmit);
          setMessage('项目创建成功！');
        }

        // 重置表单并重新加载项目
        cancelEditing();
        await loadProjects();
      } catch (error) {
        console.error('Error saving project:', error);
        setMessage('操作失败，请重试');
      } finally {
        setIsSubmitting(false);
      }
    },
    [user, formData, editingProject, cancelEditing, loadProjects]
  );

  return {
    // 状态
    projects,
    isLoading,
    isSubmitting,
    editingProject,
    isAddingNew,
    message,
    formData,
    user,
    
    // 操作函数
    handleInputChange,
    handleTechnologiesChange,
    handleImageChange,
    startAddingNew,
    startEditing,
    cancelEditing,
    deleteProject,
    submitProject,
    setMessage,
  };
}
