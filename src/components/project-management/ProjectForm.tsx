/**
 * 项目表单组件
 * 用于创建和编辑项目的表单界面
 */

'use client';

import { Button } from '@/components/ui/button';
import ImageUploadField from '@/components/ImageUploadField';
import { ProjectFormData } from '@/types/project';

interface ProjectFormProps {
  formData: ProjectFormData;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onTechnologiesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageChange: (imageUrl: string) => void;
  onCancel: () => void;
  isEditing: boolean;
}

export default function ProjectForm({
  formData,
  isSubmitting,
  onSubmit,
  onInputChange,
  onTechnologiesChange,
  onImageChange,
  onCancel,
  isEditing
}: ProjectFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
      {/* Project Title */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
          Project Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={onInputChange}
          required
          placeholder="My Amazing Project"
          className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)] px-3 py-2 sm:px-4 text-sm sm:text-base text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500 min-h-[44px]"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={onInputChange}
          rows={4}
          placeholder="Project description..."
          className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)] px-3 py-2 sm:px-4 text-sm sm:text-base text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      {/* Technologies */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
          Technologies (use commas to separate)
        </label>
        <input
          type="text"
          value={formData.technologiesInput || formData.technologies?.join(', ') || ''}
          onChange={onTechnologiesChange}
          placeholder="React, Node.js, TypeScript"
          className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)] px-3 py-2 sm:px-4 text-sm sm:text-base text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500 min-h-[44px]"
        />
      </div>

      {/* Status and Progress */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            Status
          </label>
          <select
            name="status"
            value={formData.status || 'active'}
            onChange={onInputChange}
            className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)] px-3 py-2 sm:px-4 text-sm sm:text-base text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500 min-h-[44px]"
          >
            <option value="active">In Progress</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            Progress (%)
          </label>
          <input
            type="number"
            name="progress"
            value={formData.progress || '0'}
            onChange={onInputChange}
            min="0"
            max="100"
            className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)] px-3 py-2 sm:px-4 text-sm sm:text-base text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500 min-h-[44px]"
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate || ''}
            onChange={onInputChange}
            className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)] px-3 py-2 sm:px-4 text-sm sm:text-base text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500 min-h-[44px]"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate || ''}
            onChange={onInputChange}
            className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)] px-3 py-2 sm:px-4 text-sm sm:text-base text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500 min-h-[44px]"
          />
        </div>
      </div>

      {/* URLs */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            GitHub Link
          </label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl || ''}
            onChange={onInputChange}
            placeholder="https://github.com/..."
            className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)] px-3 py-2 sm:px-4 text-sm sm:text-base text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500 min-h-[44px]"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            Live Demo
          </label>
          <input
            type="url"
            name="liveUrl"
            value={formData.liveUrl || ''}
            onChange={onInputChange}
            placeholder="https://..."
            className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)] px-3 py-2 sm:px-4 text-sm sm:text-base text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500 min-h-[44px]"
          />
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
          Project Image
        </label>
        <ImageUploadField
          value={formData.imageUrl}
          onChange={onImageChange}
          placeholder="Upload project cover image"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="min-h-[44px]"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          className="min-h-[44px]"
        >
          {isEditing ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
}
