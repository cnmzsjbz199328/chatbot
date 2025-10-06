import Link from 'next/link';
import Layout from '@/components/Layout';
import StackedFeatureCard from '@/components/StackedFeatureCard';

export default function Home() {
  const features = [
    {
      icon: 'auto_awesome',
      title: 'AI-Powered Smart Resume',
      description: 'Upload your resume and let AI automatically extract and fill in your information - education, work experience, skills - all done in one click. Save time and eliminate repetitive data entry.',
    },
    {
      icon: 'chat',
      title: 'Intelligent AI Q&A',
      description: 'Built-in AI assistant answers visitor questions about your projects and skills 24/7. Provide instant responses even when you\'re unavailable.',
    },
    {
      icon: 'dashboard',
      title: 'Project Management',
      description: 'Easily manage and showcase your projects, including project descriptions, tech stacks, progress tracking, and results.',
    },
    {
      icon: 'person',
      title: 'Personal Profile',
      description: 'Complete personal profile management, including education, work experience, skills showcase, and contact information.',
    },
    {
      icon: 'web',
      title: 'Personalized Domain Name',
      description: 'Get an exclusive personalized URL, like yourname.techportfolio.com, to make your portfolio more professional.',
    },
    {
      icon: 'phone_android',
      title: 'Responsive Design',
      description: 'Perfectly adapts to desktop, tablet, and mobile devices, ensuring your portfolio is beautiful and functional on any device.',
    },
  ];

  return (
    <Layout>
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-[var(--background)] py-24 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--primary-color)]/10 px-4 py-2 text-sm font-semibold text-[var(--primary-color)]">
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                AI-Powered Portfolio Builder
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                Build Your Portfolio with AI
              </h1>
              <p className="mt-6 text-lg text-[var(--text-secondary)] sm:text-xl max-w-3xl mx-auto">
                Upload your resume and let AI automatically fill in your information. Built-in AI assistant answers visitor questions 24/7. Create a professional portfolio in minutes, not hours.
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
          <section id="features" className="py-24 sm:py-16 relative">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center mb-16">
                <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">AI-Powered Features</h2>
                <p className="mt-4 text-lg text-gray-400">
                  Leverage artificial intelligence to build your portfolio faster and smarter
                </p>
              </div>
              
              {/* 堆叠式卡片容器 */}
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <StackedFeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    index={index}
                  />
                ))}
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
