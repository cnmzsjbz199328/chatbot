/**
 * Project Management Main Component (Refactored)
 * Clean separation of concerns using custom Hook and sub-components
 */

'use client';

import { useProjectManagement } from '@/hooks/useProjectManagement';
import ProjectForm from './project-management/ProjectForm';
import ProjectList from './project-management/ProjectList';

export default function ProjectManagement() {
  const {
    // State
    projects,
    isLoading,
    isSubmitting,
    editingProject,
    isAddingNew,
    message,
    formData,
    user,
    
    // Actions
    handleInputChange,
    handleTechnologiesChange,
    handleImageChange,
    startAddingNew,
    startEditing,
    cancelEditing,
    deleteProject,
    submitProject,
    setMessage,
  } = useProjectManagement();

  // Not logged in state
  if (!user) {
    return (
      <div className="rounded-lg bg-[var(--secondary-color)] p-6 text-center">
        <p className="text-[var(--text-secondary)]">Please log in to manage your projects</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Message Alert */}
      {message && (
        <div className="rounded-md bg-blue-900/20 border border-blue-600 px-4 py-3 text-blue-400">
          {message}
          <button 
            onClick={() => setMessage('')}
            className="ml-4 font-bold hover:text-blue-300"
          >
            ✕
          </button>
        </div>
      )}

      {/* Form Section (shown when adding or editing) */}
      {(isAddingNew || editingProject) && (
        <div className="rounded-lg bg-[var(--secondary-color)] p-4 sm:p-6 lg:p-8 shadow-lg">
          <h2 className="mb-6 text-xl sm:text-2xl font-bold">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h2>
          <ProjectForm
            formData={formData}
            isSubmitting={isSubmitting}
            onSubmit={submitProject}
            onInputChange={handleInputChange}
            onTechnologiesChange={handleTechnologiesChange}
            onImageChange={handleImageChange}
            onCancel={cancelEditing}
            isEditing={!!editingProject}
          />
        </div>
      )}

      {/* Project List */}
      <ProjectList
        projects={projects}
        isLoading={isLoading}
        onAddNew={startAddingNew}
        onEdit={startEditing}
        onDelete={deleteProject}
      />
    </div>
  );
}
