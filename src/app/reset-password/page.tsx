'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // 检查是否有有效的重置会话
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsValidSession(true);
        } else {
          setError('无效的重置链接或链接已过期');
        }
      } catch {
        setError('验证会话时发生错误');
      } finally {
        setIsChecking(false);
      }
    };
    checkSession();
  }, [supabase.auth]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 验证密码
    if (password.length < 6) {
      setError('密码长度至少为6个字符');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to reset password');
      } else {
        setSuccess(true);
        // 3秒后跳转到登录页
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch {
      setError('重置密码时发生错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className="flex flex-1 items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="w-full max-w-md text-center">
          <div className="w-12 h-12 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[var(--text-secondary)]">验证重置链接...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Enter your new password below.
          </p>
        </div>

        <div className="card space-y-4 sm:space-y-6">
          {error && (
            <div className="bg-red-900/20 border border-red-600 text-red-400 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {success ? (
            <div className="space-y-4">
              <div className="bg-green-900/20 border border-green-600 text-green-400 px-4 py-3 rounded-md text-sm">
                <p className="font-medium">密码重置成功！</p>
                <p className="mt-1">正在跳转到登录页面...</p>
              </div>
            </div>
          ) : !isValidSession ? (
            <div className="space-y-4">
              <div className="bg-red-900/20 border border-red-600 text-red-400 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
              <div className="text-center">
                <Link
                  href="/forgot-password"
                  className="text-sm text-[var(--primary-color)] hover:text-[#0c5ab2] transition-colors"
                >
                  请求新的重置链接
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="sr-only" htmlFor="password">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-gray-400 text-xl">
                        lock
                      </span>
                    </div>
                    <input
                      className="form-input relative block w-full appearance-none rounded-md border pl-10 pr-3 py-2.5 sm:py-3 placeholder-gray-500 focus:z-10 text-sm sm:text-base min-h-[44px]"
                      id="password"
                      name="password"
                      placeholder="New Password (min. 6 characters)"
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      minLength={6}
                    />
                  </div>
                </div>
                <div>
                  <label className="sr-only" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-gray-400 text-xl">
                        lock_reset
                      </span>
                    </div>
                    <input
                      className="form-input relative block w-full appearance-none rounded-md border pl-10 pr-3 py-2.5 sm:py-3 placeholder-gray-500 focus:z-10 text-sm sm:text-base min-h-[44px]"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm New Password"
                      required
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                      minLength={6}
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-[var(--primary-color)] py-2.5 sm:py-3 px-4 text-sm sm:text-base font-medium text-white hover:bg-[#0e5cb3] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </div>

              <div className="text-center text-xs sm:text-sm text-[var(--text-secondary)]">
                Remember your password?{' '}
                <Link
                  className="font-medium text-[var(--primary-color)] hover:text-[#0c5ab2] transition-colors"
                  href="/login"
                >
                  Sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
