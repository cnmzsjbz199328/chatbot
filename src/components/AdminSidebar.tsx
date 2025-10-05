'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function AdminSidebar() {
  const params = useParams();
  const username = params?.username as string;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-[var(--secondary-color)] border-b border-[var(--border-color)]">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <svg className="h-6 w-6 text-[var(--primary-color)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
            <h1 className="text-lg font-bold">Admin</h1>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-[var(--accent-color)] transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <nav className="px-4 pb-4 space-y-2 border-t border-[var(--border-color)] pt-4">
            <Link 
              className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--accent-color)] hover:text-[var(--text-primary)] min-h-[44px]" 
              href={`/${username}/projectManagement`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined">folder_managed</span>
              <span>Project Management</span>
            </Link>
            <Link 
              className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--accent-color)] hover:text-[var(--text-primary)] min-h-[44px]" 
              href={`/${username}/informationEdit`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined">person</span>
              <span>Personal Information</span>
            </Link>
            <div className="border-t border-[var(--border-color)] pt-2 mt-2">
              <Link
                className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--accent-color)] hover:text-[var(--text-primary)] min-h-[44px]"
                href={`/${username}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="material-symbols-outlined">visibility</span>
                <span>Frontend Display</span>
              </Link>
              <Link
                className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--accent-color)] hover:text-[var(--text-primary)] min-h-[44px]"
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="material-symbols-outlined">logout</span>
                <span>Logout</span>
              </Link>
            </div>
          </nav>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex sticky top-0 h-screen w-64 flex-shrink-0 bg-[var(--secondary-color)] p-6 flex-col">
      <div>
        <div className="flex items-center gap-2">
          <svg className="h-8 w-8 text-[var(--primary-color)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
          </svg>
          <h1 className="text-xl font-bold leading-tight tracking-[-0.015em]">Admin</h1>
        </div>
        <nav className="mt-8 flex flex-col gap-4">
          <Link className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--accent-color)] hover:text-[var(--text-primary)]" href={`/${username}/projectManagement`}>
            <span className="material-symbols-outlined">folder_managed</span>
            <span>Project Management</span>
          </Link>
          <Link className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--accent-color)] hover:text-[var(--text-primary)]" href={`/${username}/informationEdit`}>
            <span className="material-symbols-outlined">person</span>
            <span>Personal Information</span>
          </Link>
        </nav>
      </div>
      <div className="mt-auto">
        <Link
          className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--accent-color)] hover:text-[var(--text-primary)]"
          href={`/${username}`}
        >
          <span className="material-symbols-outlined">visibility</span>
          <span>Frontend Display</span>
        </Link>
        <Link
          className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--accent-color)] hover:text-[var(--text-primary)]"
          href="/login"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
    </>
  );
}
