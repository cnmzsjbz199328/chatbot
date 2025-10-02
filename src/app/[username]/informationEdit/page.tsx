'use client';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import AdminSidebar from '@/components/AdminSidebar';

const UserProfileForm = dynamic(() => import('@/components/UserProfileForm'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--primary-color)]"></div></div>
});

const FileUploadComponent = dynamic(() => import('@/components/file-upload'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)]"></div></div>
});

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto mb-4"></div>
          <p>Verifying identity...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="relative flex size-full min-h-screen flex-row overflow-x-hidden bg-[var(--background)] font-sans text-[var(--text-primary)]" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="space-y-8">
            {/* File Upload Module */}
            <div className="rounded-lg bg-[var(--secondary-color)] p-6 shadow-lg">
              <h3 className="mb-6 text-xl font-bold">Upload Personal Profile Document</h3>
              <div className="mb-4">
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Upload your resume, personal introduction, and other PDF documents. The AI will learn your background information, and visitors can learn about your experience through chat.
                </p>
              </div>
              <FileUploadComponent />
            </div>

            {/* Edit Personal Information */}
            <div className="rounded-lg bg-[var(--secondary-color)] p-6 shadow-lg">
              <h3 className="mb-6 text-xl font-bold">Edit Basic Information</h3>
              <UserProfileForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
