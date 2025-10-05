import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-[var(--background)] py-24 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                Showcase Your Technical Work
              </h1>
              <p className="mt-6 text-lg text-[var(--text-secondary)] sm:text-xl max-w-3xl mx-auto">
                Create a professional personal portfolio website to showcase your projects, skills, and achievements. Let employers and clients better understand your technical strength.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  className="rounded-lg bg-[var(--primary-color)] px-4 py-2 sm:px-6 sm:py-3 lg:px-8 text-base sm:text-lg font-semibold text-white transition-all hover:bg-opacity-80 hover:shadow-lg min-h-[44px] flex items-center justify-center"
                  href="/register"
                >
                  Get Started for Free
                </Link>
                  <Link
                    className="rounded-lg border border-gray-600 dark:border-gray-600 px-4 py-2 sm:px-6 sm:py-3 lg:px-8 text-base sm:text-lg font-semibold text-gray-300 dark:text-gray-300 transition-all hover:bg-gray-800 dark:hover:bg-gray-800 hover:text-white min-h-[44px] flex items-center justify-center"
                    href="/tj15982183241"
                  >
                     View Example
                  </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-24 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Powerful Features</h2>
                <p className="mt-4 text-lg text-gray-400">
                  We provide all the features you need to build a professional portfolio website
                </p>
              </div>
              <div className="mt-16 grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' }}>
                {/* Feature 1 */}
                <div className="rounded-lg bg-white/50 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 border border-[var(--border-color)] flex flex-col sm:flex-row gap-4">
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg bg-[var(--primary-color)] flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-2xl sm:text-3xl"> web </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">Personalized Domain Name</h3>
                    <p className="mt-2 text-[var(--text-secondary)]">
                      Get an exclusive personalized URL, like yourname.techportfolio.com, to make your portfolio more professional.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="rounded-lg bg-white/50 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 border border-[var(--border-color)] flex flex-col sm:flex-row gap-4">
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg bg-[var(--primary-color)] flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-2xl sm:text-3xl"> dashboard </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">Project Management</h3>
                    <p className="mt-2 text-[var(--text-secondary)]">
                      Easily manage and showcase your projects, including project descriptions, tech stacks, progress tracking, and results.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="rounded-lg bg-white/50 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 border border-[var(--border-color)] flex flex-col sm:flex-row gap-4">
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg bg-[var(--primary-color)] flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-2xl sm:text-3xl"> person </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">Personal Profile</h3>
                    <p className="mt-2 text-[var(--text-secondary)]">
                      Complete personal profile management, including education, work experience, skills showcase, and contact information.
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="rounded-lg bg-white/50 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 border border-[var(--border-color)] flex flex-col sm:flex-row gap-4">
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg bg-[var(--primary-color)] flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-2xl sm:text-3xl"> chat </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">AI Assistant</h3>
                    <p className="mt-2 text-[var(--text-secondary)]">
                      A built-in AI chat assistant helps visitors understand your projects and skills, providing intelligent Q&A services.
                    </p>
                  </div>
                </div>

                {/* Feature 5 */}
                <div className="rounded-lg bg-white/50 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 border border-[var(--border-color)] flex flex-col sm:flex-row gap-4">
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg bg-[var(--primary-color)] flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-2xl sm:text-3xl"> phone_android </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">Responsive Design</h3>
                    <p className="mt-2 text-[var(--text-secondary)]">
                      Perfectly adapts to desktop, tablet, and mobile devices, ensuring your portfolio is beautiful and functional on any device.
                    </p>
                  </div>
                </div>

                {/* Feature 6 */}
                <div className="rounded-lg bg-white/50 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 border border-[var(--border-color)] flex flex-col sm:flex-row gap-4">
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg bg-[var(--primary-color)] flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-2xl sm:text-3xl"> security </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">Secure and Reliable</h3>
                    <p className="mt-2 text-[var(--text-secondary)]">
                      Uses modern security technologies to protect your data and supports secure user authentication and authorization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="bg-white/50 dark:bg-gray-800/50 py-24 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl text-[var(--text-primary)]">View Example</h2>
              <p className="mt-4 text-lg text-[var(--text-secondary)]">
                Experience our platform&apos;s features and see real portfolio examples.
              </p>
              <div className="mt-8">
                <Link
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary-color)] px-6 py-3 text-lg font-semibold text-white transition-all hover:bg-opacity-80"
                  href="/tj15982183241"
                >
                  <span className="material-symbols-outlined"> visibility </span>
                  View Portfolio Example
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl text-[var(--text-primary)]">
                Ready to showcase your work?
              </h2>
              <p className="mt-4 text-lg text-[var(--text-secondary)]">
                Join our platform and create your professional portfolio website.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  className="rounded-lg bg-[var(--primary-color)] px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-opacity-80"
                  href="/register"
                >
                  Register Now
                </Link>
                <Link
                  className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  href="/login"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          </section>
    </Layout>
  );
}
