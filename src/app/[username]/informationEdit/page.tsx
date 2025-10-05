'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import AdminSidebar from '@/components/AdminSidebar';

const AIProfileAssistant = dynamic(() => import('@/components/AIProfileAssistant'), {
  ssr: false,
  loading: () => <LoadingSpinner size="md" />
});

const UserProfileForm = dynamic(() => import('@/components/UserProfileForm'), {
  ssr: false,
  loading: () => <LoadingSpinner size="lg" />
});

const FileUploadComponent = dynamic(() => import('@/components/file-upload'), {
  ssr: false,
  loading: () => <LoadingSpinner size="sm" />
});

const EducationForm = dynamic(() => import('@/components/EducationForm'), {
  ssr: false,
  loading: () => <LoadingSpinner size="sm" />
});

const WorkExperienceForm = dynamic(() => import('@/components/WorkExperienceForm'), {
  ssr: false,
  loading: () => <LoadingSpinner size="sm" />
});

const HobbiesForm = dynamic(() => import('@/components/HobbiesForm'), {
  ssr: false,
  loading: () => <LoadingSpinner size="sm" />
});

const LoadingSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12", 
    lg: "h-32 w-32"
  };
  
  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full border-b-2 border-[var(--primary-color)] ${sizeClasses[size]}`}></div>
    </div>
  );
};

const SectionCard = ({ title, description, children }: { 
  title: string; 
  description?: string; 
  children: React.ReactNode; 
}) => (
  <div className="rounded-lg bg-[var(--secondary-color)] p-4 sm:p-5 lg:p-6 shadow-lg">
    <h3 className="mb-4 sm:mb-5 lg:mb-6 text-lg sm:text-xl font-bold">{title}</h3>
    {description && (
      <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-3 sm:mb-4 leading-relaxed">{description}</p>
    )}
    {children}
  </div>
);

export default function InformationEditPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [showAdvancedForms, setShowAdvancedForms] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleAISuccess = () => {
    // 刷新页面数据
    setRefreshKey(prev => prev + 1);
    // 展开高级表单让用户查看结果
    setShowAdvancedForms(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-[var(--text-primary)] text-center">
          <LoadingSpinner size="md" />
          <p className="mt-4">Verifying identity...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div 
      className="relative flex size-full min-h-screen flex-col lg:flex-row overflow-hidden bg-[var(--background)] font-sans text-[var(--text-primary)]" 
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 h-screen lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
        {/* AI辅助填充 - 首要功能 */}
        <SectionCard
          title="🤖 AI-Assisted Profile Setup (Quick Start)"
          description="Paste your resume or personal information in any format. AI will automatically extract and fill in all your data. This is the fastest way to get started!"
        >
          <AIProfileAssistant onSuccess={handleAISuccess} />
        </SectionCard>

        {/* 高级编辑表单 - 可折叠 */}
        <div className="rounded-lg bg-[var(--secondary-color)] p-4 sm:p-5 lg:p-6 shadow-lg">
          <button
            onClick={() => setShowAdvancedForms(!showAdvancedForms)}
            className="w-full flex items-center justify-between text-left group"
          >
            <h3 className="text-lg sm:text-xl font-bold">
              ⚙️ Advanced Manual Editing
            </h3>
            <span className={`material-symbols-outlined transition-transform ${showAdvancedForms ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 mb-3 sm:mb-4">
            Prefer manual control? Use these forms to edit each section individually.
          </p>

          {showAdvancedForms && (
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 mt-4 sm:mt-6" key={refreshKey}>
              <div className="border-t border-[var(--border-color)] pt-4 sm:pt-6">
                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Upload Personal Profile Document</h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-3 sm:mb-4">
                  Upload your resume, personal introduction, and other PDF documents. The AI will learn your background information, and visitors can learn about your experience through chat.
                </p>
                <FileUploadComponent />
              </div>

              <div className="border-t border-[var(--border-color)] pt-4 sm:pt-6">
                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Basic Information</h4>
                <UserProfileForm />
              </div>

              <div className="border-t border-[var(--border-color)] pt-4 sm:pt-6">
                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Education Background</h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-3 sm:mb-4">
                  Add your educational background, including schools, degrees, and time periods.
                </p>
                <EducationForm />
              </div>

              <div className="border-t border-[var(--border-color)] pt-4 sm:pt-6">
                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Work Experience</h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-3 sm:mb-4">
                  Add your work experience, including company, position, time period, and job responsibilities.
                </p>
                <WorkExperienceForm />
              </div>

              <div className="border-t border-[var(--border-color)] pt-4 sm:pt-6">
                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Hobbies & Interests</h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-3 sm:mb-4">
                  Add your hobbies and interests to help visitors better understand you.
                </p>
                <HobbiesForm />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
