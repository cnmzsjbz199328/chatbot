'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import AdminSidebar from '@/components/AdminSidebar';

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

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

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
        <SectionCard
          title="Upload Personal Profile Document"
          description="Upload your resume, personal introduction, and other PDF documents. The AI will learn your background information, and visitors can learn about your experience through chat."
        >
          <FileUploadComponent />
        </SectionCard>

        <SectionCard title="Edit Basic Information">
          <UserProfileForm />
        </SectionCard>

        <SectionCard 
          title="Education Background"
          description="Add your educational background, including schools, degrees, and time periods."
        >
          <EducationForm />
        </SectionCard>

        <SectionCard 
          title="Work Experience"
          description="Add your work experience, including company, position, time period, and job responsibilities."
        >
          <WorkExperienceForm />
        </SectionCard>

        <SectionCard 
          title="Hobbies & Interests"
          description="Add your hobbies and interests to help visitors better understand you."
        >
          <HobbiesForm />
        </SectionCard>
      </main>
    </div>
  );
}
