'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
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
            router.push(`/${profile.username}`);
            router.refresh();
          } else {
            console.error('Profile API failed:', await profileResponse.text());
            throw new Error('Profile creation failed');
          }
        } catch (profileError) {
          console.error('Profile creation error:', profileError);
          // 如果profile创建失败，跳转到demo页面
          router.push('/demo');
          router.refresh();
        }
      }
    } catch {
      setError('登录时发生错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[var(--secondary-color)] text-[var(--text-primary)] min-h-screen">
      <div className="flex flex-col min-h-screen">
        <header className="w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between border-b border-[var(--border-color)]">
              <div className="flex items-center gap-4">
                <svg className="h-8 w-8 text-[var(--primary-color)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
                </svg>
                <h2 className="text-xl font-bold">TechPortfolio</h2>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <Link className="text-sm font-medium text-gray-300 hover:text-white transition-colors" href="/">Home</Link>
                <a className="text-sm font-medium text-gray-300 hover:text-white transition-colors" href="#">Projects</a>
                <a className="text-sm font-medium text-gray-300 hover:text-white transition-colors" href="#">About</a>
                <a className="text-sm font-medium text-gray-300 hover:text-white transition-colors" href="#">Contact</a>
                <Link href="/register" className="rounded-md bg-[#21262d] px-4 py-2 text-sm font-semibold hover:bg-[#2c3138] transition-colors">Register</Link>
              </nav>
            </div>
          </div>
        </header>
        
        <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight">Admin Login</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Welcome back! Please enter your credentials.
              </p>
            </div>
            
            <div className="card space-y-6">
              {error && (
                <div className="bg-red-900/20 border border-red-600 text-red-400 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSignIn} className="space-y-6">
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
                    'Sign in'
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <a className="font-medium text-[var(--primary-color)] hover:text-[#0c5ab2] transition-colors" href="#">
                    Forgot your password?
                  </a>
                </div>
              </div>
              
              <div className="text-center text-sm text-[var(--text-secondary)]">
                Don&apos;t have an account?{' '}
                <Link className="font-medium text-[var(--primary-color)] hover:text-[#0c5ab2] transition-colors" href="/register">
                  Register here
                </Link>
              </div>
            </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
