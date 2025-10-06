'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to send reset email');
      } else {
        setSuccess(true);
      }
    } catch {
      setError('发送重置邮件时发生错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Enter your email address and we&apos;ll send you a password reset link.
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
                <p className="font-medium">重置邮件已发送！</p>
                <p className="mt-1">
                  请检查您的邮箱 <strong>{email}</strong> 并点击重置链接。
                </p>
              </div>
              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-[var(--primary-color)] hover:text-[#0c5ab2] transition-colors"
                >
                  返回登录页面
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleResetRequest} className="space-y-4 sm:space-y-6">
              <div>
                <label className="sr-only" htmlFor="email">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="material-symbols-outlined text-gray-400 text-xl">
                      email
                    </span>
                  </div>
                  <input
                    className="form-input relative block w-full appearance-none rounded-md border pl-10 pr-3 py-2.5 sm:py-3 placeholder-gray-500 focus:z-10 text-sm sm:text-base min-h-[44px]"
                    id="email"
                    name="email"
                    placeholder="Email address"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
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
                    'Send Reset Link'
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
