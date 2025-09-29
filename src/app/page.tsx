import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                Showcase Your
                <span className="bg-gradient-to-r from-[var(--primary-color)] to-blue-400 bg-clip-text text-transparent"> Technical Work</span>
              </h1>
              <p className="mt-6 text-lg text-gray-400 sm:text-xl max-w-3xl mx-auto">
                Create a professional personal portfolio website to showcase your projects, skills, and achievements. Let employers and clients better understand your technical strength.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  className="rounded-lg bg-[var(--primary-color)] px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-opacity-80 hover:shadow-lg"
                  href="/register"
                >
                  Get Started for Free
                </Link>
                  <Link
                    className="rounded-lg border border-gray-600 px-8 py-3 text-lg font-semibold text-gray-300 transition-all hover:bg-gray-800 hover:text-white"
                    href="/tj15982183241"
                  >
                     View Portfolio
                  </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Powerful Features</h2>
                <p className="mt-4 text-lg text-gray-400">
                  We provide all the features you need to build a professional portfolio website
                </p>
              </div>
              <div className="mt-16 grid gap-8 lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="rounded-lg bg-gray-800 p-8">
                  <div className="flex h-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                    <span className="material-symbols-outlined text-white"> web </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">Personalized Domain Name</h3>
                  <p className="mt-2 text-gray-400">
                    Get an exclusive personalized URL, like yourname.techportfolio.com, to make your portfolio more professional.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="rounded-lg bg-gray-800 p-8">
                  <div className="flex h-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                    <span className="material-symbols-outlined text-white"> dashboard </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">Project Management</h3>
                  <p className="mt-2 text-gray-400">
                    Easily manage and showcase your projects, including project descriptions, tech stacks, progress tracking, and results.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="rounded-lg bg-gray-800 p-8">
                  <div className="flex h-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                    <span className="material-symbols-outlined text-white"> person </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">Personal Profile</h3>
                  <p className="mt-2 text-gray-400">
                    Complete personal profile management, including education, work experience, skills showcase, and contact information.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="rounded-lg bg-gray-800 p-8">
                  <div className="flex h-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                    <span className="material-symbols-outlined text-white"> chat </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">AI Assistant</h3>
                  <p className="mt-2 text-gray-400">
                    A built-in AI chat assistant helps visitors understand your projects and skills, providing intelligent Q&A services.
                  </p>
                </div>

                {/* Feature 5 */}
                <div className="rounded-lg bg-gray-800 p-8">
                  <div className="flex h-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                    <span className="material-symbols-outlined text-white"> phone_android </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">Responsive Design</h3>
                  <p className="mt-2 text-gray-400">
                    Perfectly adapts to desktop, tablet, and mobile devices, ensuring your portfolio is beautiful and functional on any device.
                  </p>
                </div>

                {/* Feature 6 */}
                <div className="rounded-lg bg-gray-800 p-8">
                  <div className="flex h-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                    <span className="material-symbols-outlined text-white"> security </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">Secure and Reliable</h3>
                  <p className="mt-2 text-gray-400">
                    Uses modern security technologies to protect your data and supports secure user authentication and authorization.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="bg-gray-800/50 py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">View Portfolio</h2>
              <p className="mt-4 text-lg text-gray-400">
                Experience our platform&apos;s features and see real portfolio examples.
              </p>
              <div className="mt-8">
                <Link
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary-color)] px-6 py-3 text-lg font-semibold text-white transition-all hover:bg-opacity-80"
                  href="/tj15982183241"
                >
                  <span className="material-symbols-outlined"> visibility </span>
                  View Portfolio
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Ready to showcase your work?
              </h2>
              <p className="mt-4 text-lg text-gray-400">
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
                  className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
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