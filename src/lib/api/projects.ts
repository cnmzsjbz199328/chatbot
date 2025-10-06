/**
 * 项目管理 API 调用封装
 * 封装所有与项目相关的 API 请求
 */

import { UserProject } from '@/types/project';

export const projectsApi = {
  /**
   * 获取当前用户的所有项目
   */
  async fetchProjects(): Promise<UserProject[]> {
    const response = await fetch('/api/user-projects');
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    const data = await response.json();
    return data;
  },

  /**
   * 创建新项目
   * @param userId - 用户ID
   * @param projectData - 项目数据
   */
  async createProject(userId: string, projectData: UserProject): Promise<UserProject> {
    const response = await fetch('/api/user-projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userId}`
      },
      body: JSON.stringify(projectData)
    });

    if (!response.ok) {
      throw new Error('Failed to create project');
    }

    const data = await response.json();
    return data;
  },

  /**
   * 更新现有项目
   * @param userId - 用户ID
   * @param projectId - 项目ID
   * @param projectData - 更新的项目数据
   */
  async updateProject(
    userId: string,
    projectId: number,
    projectData: UserProject
  ): Promise<UserProject> {
    const response = await fetch(`/api/user-projects/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userId}`
      },
      body: JSON.stringify(projectData)
    });

    if (!response.ok) {
      throw new Error('Failed to update project');
    }

    const data = await response.json();
    return data;
  },

  /**
   * 删除项目
   * @param userId - 用户ID
   * @param projectId - 项目ID
   */
  async deleteProject(userId: string, projectId: number): Promise<void> {
    const response = await fetch(`/api/user-projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${userId}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
  }
};
