import Link from 'next/link';
import Layout from '@/components/Layout';

export default function DemoPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
                {/* Hero Section */}
                <div className="text-center">
                  <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Demo Portfolio</h2>
                  <p className="mt-4 text-lg text-gray-400">Check out real portfolio examples created on our platform</p>
                </div>

                {/* Demo Cards */}
                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {/* Demo 1 - About Page */}
                  <div className="card group cursor-pointer transition-all duration-300 hover:shadow-xl">
                    <div className="mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                        <span className="material-symbols-outlined text-white"> person </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">About Me Page</h3>
                    <p className="text-gray-400 mb-4">
                      A complete page showcasing personal background, education, work experience, and skills.
                    </p>
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-color)] hover:underline"
                    >
                      View Example <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>

                  {/* Demo 2 - Projects Page */}
                  <div className="card group cursor-pointer transition-all duration-300 hover:shadow-xl">
                    <div className="mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                        <span className="material-symbols-outlined text-white"> work </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Projects Page</h3>
                    <p className="text-gray-400 mb-4">
                      A beautiful project showcase page with project details, tech stack, and GitHub links.
                    </p>
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-color)] hover:underline"
                    >
                      View Example <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>

                  {/* Demo 3 - Management */}
                  <div className="card group cursor-pointer transition-all duration-300 hover:shadow-xl">
                    <div className="mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                        <span className="material-symbols-outlined text-white"> dashboard </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
                    <p className="text-gray-400 mb-4">
                      A powerful admin system to easily manage your projects and personal information.
                    </p>
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-color)] hover:underline"
                    >
                      Login to Experience <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>
                </div>

                {/* Features Showcase */}
                <div className="mt-20">
                  <h3 className="text-3xl font-bold text-center mb-12">Platform Features</h3>
                  <div className="grid gap-12 lg:grid-cols-2">
                    {/* Feature 1 */}
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                          <span className="material-symbols-outlined text-white"> palette </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">Modern Design</h4>
                        <p className="text-gray-400">
                          Using the latest design trends, a dark theme with beautiful animations makes your portfolio stand out.
                        </p>
                      </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                          <span className="material-symbols-outlined text-white"> speed </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">High Performance</h4>
                        <p className="text-gray-400">
                          Built with Next.js for optimized loading speed and SEO, ensuring your portfolio is discovered by more people.
                        </p>
                      </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                          <span className="material-symbols-outlined text-white"> edit </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">Easy to Manage</h4>
                        <p className="text-gray-400">
                          An intuitive management interface allows you to easily update project information and personal profiles without programming knowledge.
                        </p>
                      </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                          <span className="material-symbols-outlined text-white"> security </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">Secure and Reliable</h4>
                        <p className="text-gray-400">
                          Uses the Supabase authentication system to ensure your data is secure and supports multiple login methods.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center">
                  <div className="card">
                    <h3 className="text-2xl font-bold mb-4">Ready to create your portfolio?</h3>
                    <p className="text-gray-400 mb-6">
                      Join our platform and have a professional personal portfolio website in minutes.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <Link
                        className="rounded-lg bg-[var(--primary-color)] px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-opacity-80"
                        href="/register"
                      >
                        Register for free
                      </Link>
                      <Link
                        className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                        href="/login"
                      >
                        Already have an account? Sign in
                      </Link>
                    </div>
                  </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}
