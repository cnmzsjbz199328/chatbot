'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import AdminSidebar from '@/components/AdminSidebar';

const ProjectManagement = dynamic(() => import('@/components/ProjectManagement'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--primary-color)]"></div></div>
});

export default function ProjectManagementPage() {
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
    <div className="relative flex size-full min-h-screen flex-col lg:flex-row overflow-hidden bg-[var(--background)] font-sans text-[var(--text-primary)]" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <AdminSidebar />
      <main className="flex-1 h-screen overflow-y-auto">
        <div className="bg-[var(--background)] text-[var(--text-primary)] min-h-screen">
          <div className="p-4 sm:p-5 lg:p-6">
            <ProjectManagement />
          </div>
        </div>
      </main>
    </div>
  );
}
