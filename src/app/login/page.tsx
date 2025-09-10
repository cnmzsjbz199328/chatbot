import Link from 'next/link';

export default function LoginPage() {
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
                <a className="text-sm font-medium text-gray-300 hover:text-white transition-colors" href="#">Home</a>
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
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight">Welcome back</h2>
              <p className="mt-2 text-center text-sm text-gray-400">
                Don&apos;t have an account?{' '}
                <Link className="font-medium text-[var(--primary-color)] hover:text-[#3b8ef2] transition-colors" href="/register">
                  Sign up
                </Link>
              </p>
            </div>
            <form action="#" className="mt-8 space-y-6" method="POST">
              <div className="space-y-4 rounded-md shadow-sm">
                <div>
                  <label className="sr-only" htmlFor="email">Email address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-gray-400">email</span>
                    </div>
                    <input className="form-input relative block w-full appearance-none rounded-md border pl-10 pr-3 py-3 placeholder-gray-500 focus:z-10 sm:text-sm" id="email" name="email" placeholder="Email address" required type="email"/>
                  </div>
                </div>
                <div>
                  <label className="sr-only" htmlFor="password">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-gray-400">lock</span>
                    </div>
                    <input className="form-input relative block w-full appearance-none rounded-md border pl-10 pr-3 py-3 placeholder-gray-500 focus:z-10 sm:text-sm" id="password" name="password" placeholder="Password" required type="password"/>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input className="h-4 w-4 rounded border-gray-300 text-[var(--primary-color)] focus:ring-[var(--primary-color)]" id="remember-me" name="remember-me" type="checkbox"/>
                  <label className="ml-2 block text-sm text-gray-400" htmlFor="remember-me">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a className="font-medium text-[var(--primary-color)] hover:text-[#3b8ef2] transition-colors" href="#">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button className="btn-primary group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2" type="submit">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="material-symbols-outlined text-blue-300 group-hover:text-blue-400">login</span>
                  </span>
                  Sign in
                </button>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[var(--border-color)]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-[var(--secondary-color)] px-2 text-gray-400">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="inline-flex w-full justify-center rounded-md border border-[var(--border-color)] bg-[var(--accent-color)] py-2 px-4 text-sm font-medium text-gray-300 shadow-sm hover:bg-[#374151] transition-colors" type="button">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                    <span className="ml-2">GitHub</span>
                  </button>
                  <button className="inline-flex w-full justify-center rounded-md border border-[var(--border-color)] bg-[var(--accent-color)] py-2 px-4 text-sm font-medium text-gray-300 shadow-sm hover:bg-[#374151] transition-colors" type="button">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"></path>
                    </svg>
                    <span className="ml-2">Google</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
