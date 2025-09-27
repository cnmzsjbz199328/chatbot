'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('密码不匹配');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { 
          emailRedirectTo: `${window.location.origin}/auth/callback` 
        },
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        setMessage('注册成功！请检查您的邮箱以验证账户。');
        // 可选：几秒后跳转到登录页面
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch {
      setError('注册时发生错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">Create your account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Already have an account?{' '}
            <Link className="font-medium text-[var(--primary-color)] hover:text-[#3b8ef2] transition-colors" href="/login">
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-600 text-red-400 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-900/20 border border-green-600 text-green-400 px-4 py-3 rounded-md text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSignUp} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="sr-only" htmlFor="email">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="material-symbols-outlined text-gray-400">email</span>
                </div>
                <input
                  className="form-input relative block w-full appearance-none rounded-md border pl-10 pr-3 py-3 placeholder-gray-500 focus:z-10 sm:text-sm"
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
              <label className="sr-only" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="material-symbols-outlined text-gray-400">lock</span>
                </div>
                <input
                  className="form-input relative block w-full appearance-none rounded-md border pl-10 pr-3 py-3 placeholder-gray-500 focus:z-10 sm:text-sm"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="sr-only" htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="material-symbols-outlined text-gray-400">lock</span>
                </div>
                <input
                  className="form-input relative block w-full appearance-none rounded-md border pl-10 pr-3 py-3 placeholder-gray-500 focus:z-10 sm:text-sm"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-[var(--primary-color)] py-3 px-4 text-sm font-medium text-white hover:bg-[#0e5cb3] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Create account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
