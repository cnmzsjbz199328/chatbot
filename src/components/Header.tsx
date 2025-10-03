'use client';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useTheme } from '@/contexts/ThemeContext';

export default function Header() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { scrollToSection } = useSmoothScroll();
  const { theme, setTheme } = useTheme();
  const [username, setUsername] = useState(user?.user_metadata?.username || '');
  const [profileLoading, setProfileLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername && !username) {
        setUsername(storedUsername);
      }
    }
  }, [username]);

  useEffect(() => {
    if (user && !user.user_metadata?.username && !username && !fetched) {
      setFetched(true);
      setProfileLoading(true);
      fetch('/api/auth/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, email: user.email })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.profile.username) {
            setUsername(data.profile.username);
            if (typeof window !== 'undefined') {
              localStorage.setItem('username', data.profile.username);
            }
          }
          setProfileLoading(false);
        })
        .catch(() => setProfileLoading(false));
    }
  }, [user, username, fetched]);

  const handleSignOut = async () => {
    await signOut();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('username');
    }
    router.push('/');
  };

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();

    if (pathname === '/') {
      // 如果在首页，平滑滚动到目标部分
      scrollToSection(targetId);
    } else {
      // 如果不在首页，跳转到首页然后滚动
      const href = `/#${targetId}`;
      router.push(href);
    }
  };

  const isLoading = loading || profileLoading;

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const getThemeIcon = () => {
    return theme === 'light' ? 'dark_mode' : 'light_mode';
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-[var(--secondary-color)]/80 backdrop-blur-md border-b border-[var(--border-color)]">
      <div className="w-full flex items-center justify-between whitespace-nowrap px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[var(--text-primary)] hover:opacity-80 transition-opacity">
            <svg className="h-8 w-8 text-[var(--primary-color)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <button
            className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            onClick={(e) => handleNavClick(e, 'features')}
          >
            Feature
          </button>
          <button
            className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            onClick={(e) => handleNavClick(e, 'portfolio')}
          >
            Portfolio
          </button>

          {loading ? (
            <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : user ? (
            <div className="flex items-center gap-4">
              {isLoading ? (
                <span className="text-sm font-medium text-gray-500 cursor-not-allowed">
                  My Profile (Loading...)
                </span>
              ) : username ? (
                <Link
                  className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  href={`/${username}`}
                >
                  My Profile
                </Link>
              ) : (
                <span className="text-sm font-medium text-gray-500 dark:text-gray-500 light:text-gray-400 cursor-not-allowed">
                  Please set a username
                </span>
              )}
              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]" href="/login">log in</Link>
              <Link className="rounded-md bg-[var(--primary-color)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-opacity-80" href="/register">sign up</Link>
            </div>
          )}

          {/* 主题切换按钮 - 放在最右侧，对所有用户可见 */}
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-color)] transition-colors"
            title={`当前主题: ${theme === 'dark' ? '暗色' : '明亮'}`}
          >
            <span className="material-symbols-outlined text-xl">
              {getThemeIcon()}
            </span>
          </button>
        </nav>

        <button className="md:hidden">
          <span className="material-symbols-outlined"> menu </span>
        </button>
      </div>
    </header>
  );
}
