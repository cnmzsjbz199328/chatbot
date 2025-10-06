'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        // 获取或创建用户profile，然后跳转到用户专属页面
        try {
          const profileResponse = await fetch('/api/auth/profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: data.user.id,
              email: data.user.email,
            }),
          });
          
          if (profileResponse.ok) {
            const { profile } = await profileResponse.json();
            router.push(`/${profile.username}/projectManagement`);
            router.refresh();
          } else {
            console.error('Profile API failed:', await profileResponse.text());
            throw new Error('Profile creation failed');
          }
        } catch (profileError) {
          console.error('Profile creation error:', profileError);
          // 如果profile创建失败，跳转到示例页面
          router.push('/tj15982183241');
          router.refresh();
        }
      }
    } catch {
      setError('log in时发生错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Admin Login</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Welcome back! Please enter your credentials.
              </p>
            </div>
            
            <div className="card space-y-4 sm:space-y-6">
              {error && (
                <div className="bg-red-900/20 border border-red-600 text-red-400 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSignIn} className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4 rounded-md shadow-sm">
                <div>
                  <label className="sr-only" htmlFor="email">Email address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-gray-400 text-xl">email</span>
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
                  <label className="sr-only" htmlFor="password">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-gray-400 text-xl">lock</span>
                    </div>
                    <input 
                      className="form-input relative block w-full appearance-none rounded-md border pl-10 pr-3 py-2.5 sm:py-3 placeholder-gray-500 focus:z-10 text-sm sm:text-base min-h-[44px]" 
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
                    'Sign in'
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-end">
                <div className="text-xs sm:text-sm">
                  <Link className="font-medium text-[var(--primary-color)] hover:text-[#0c5ab2] transition-colors min-h-[44px] inline-flex items-center" href="/forgot-password">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              
              <div className="text-center text-xs sm:text-sm text-[var(--text-secondary)]">
                Don&apos;t have an account?{' '}
                <Link className="font-medium text-[var(--primary-color)] hover:text-[#0c5ab2] transition-colors" href="/register">
                  Register here
                </Link>
              </div>
              </form>
            </div>
          </div>
      </div>
  );
}
