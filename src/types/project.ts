/**
 * 项目数据类型定义
 * 用于整个应用中的项目管理功能
 */

/**
 * 用户项目基础接口
 */
export interface UserProject {
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

/**
 * 项目表单数据接口
 * 扩展 UserProject，添加临时表单字段
 */
export interface ProjectFormData extends UserProject {
  technologiesInput?: string; // 临时字段，用于表单输入（逗号分隔的字符串）
}

/**
 * 项目状态类型
 */
export type ProjectStatus = 'active' | 'completed' | 'archived';

/**
 * 项目状态标签映射
 */
export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  active: 'In Progress',
  completed: 'Completed',
  archived: 'Archived'
};
