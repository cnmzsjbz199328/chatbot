import Layout from '@/components/Layout';

export default function AboutPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
                {/* Hero Section */}
                <div className="text-center">
                  <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">About Me</h2>
                  <p className="mt-4 text-lg text-gray-400">A passionate and results-oriented IT professional with extensive experience in software development and project management.</p>
                </div>

                <div className="mt-16 space-y-16">
                  {/* Education Section */}
                  <section>
                    <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
                      <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> school </span>
                      Education
                    </h3>
                    <div className="space-y-8 border-l-2 border-gray-700 pl-8">
                      <div className="timeline-item">
                        <h4 className="text-xl font-semibold">A Certain University</h4>
                        <p className="text-gray-400">Bachelor of Computer Science</p>
                        <p className="text-sm text-gray-500">2018 - 2022</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-400">
                          <li>Majored in Computer Science and Technology, GPA 3.8/4.0</li>
                          <li>Core courses: Data Structures, Algorithm Design, Database Systems, Software Engineering</li>
                          <li>Awarded the title of Outstanding Graduate, and the graduation project received an excellent grade</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Work Experience Section */}
                  <section>
                    <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
                      <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> business_center </span>
                      Work Experience
                    </h3>
                    <div className="space-y-12 border-l-2 border-gray-700 pl-8">
                      <div className="timeline-item">
                        <h4 className="text-xl font-semibold">A Tech Company</h4>
                        <p className="font-medium text-gray-300">Senior Software Engineer</p>
                        <p className="text-sm text-gray-500">2022 - Present</p>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-400">
                          <li>Responsible for designing, developing, and maintaining large-scale Web applications, serving over 100,000 users</li>
                          <li>Collaborated with cross-functional teams to deliver high-quality software solutions with a 95% on-time delivery rate</li>
                          <li>Participated in code reviews and mentored junior developers, improving the team's overall technical skills</li>
                          <li>Led the refactoring of the microservices architecture, resulting in a 40% performance improvement and a 30% reduction in maintenance costs</li>
                        </ul>
                      </div>
                      <div className="timeline-item">
                        <h4 className="text-xl font-semibold">Another Tech Company</h4>
                        <p className="font-medium text-gray-300">Software Development Intern</p>
                        <p className="text-sm text-gray-500">Summer 2021</p>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-400">
                          <li>Assisted in developing new features and fixing bugs in the existing codebase, completing over 20 feature modules</li>
                          <li>Learned and applied agile development methodologies, participating in daily stand-ups and iteration planning</li>
                          <li>Contributed to the development of internal tools, improving team efficiency by 15%</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Skills Section */}
                  <section>
                    <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
                      <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> code </span>
                      Skills
                    </h3>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                      <div className="card">
                        <h4 className="mb-4 text-lg font-semibold">Frontend Development</h4>
                        <ul className="space-y-2 text-gray-400">
                          <li>• React / Next.js / Vue.js</li>
                          <li>• TypeScript / JavaScript</li>
                          <li>• TailwindCSS / Styled Components</li>
                          <li>• Webpack / Vite</li>
                        </ul>
                      </div>
                      <div className="card">
                        <h4 className="mb-4 text-lg font-semibold">Backend Development</h4>
                        <ul className="space-y-2 text-gray-400">
                          <li>• Node.js / Python / Go</li>
                          <li>• Express / FastAPI / Gin</li>
                          <li>• PostgreSQL / MongoDB</li>
                          <li>• Redis / Docker</li>
                        </ul>
                      </div>
                      <div className="card">
                        <h4 className="mb-4 text-lg font-semibold">Cloud Services & DevOps</h4>
                        <ul className="space-y-2 text-gray-400">
                          <li>• AWS / Vercel / Supabase</li>
                          <li>• CI/CD / GitHub Actions</li>
                          <li>• Kubernetes / Docker</li>
                          <li>• Monitoring / Logging</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Interests Section */}
                  <section>
                    <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
                      <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> sports_esports </span>
                      Hobbies
                    </h3>
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800/50">
                          <span className="material-symbols-outlined text-4xl text-gray-400"> code </span>
                        </div>
                        <p className="text-gray-300">Coding</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800/50">
                          <span className="material-symbols-outlined text-4xl text-gray-400"> menu_book </span>
                        </div>
                        <p className="text-gray-300">Reading</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800/50">
                          <span className="material-symbols-outlined text-4xl text-gray-400"> directions_run </span>
                        </div>
                        <p className="text-gray-300">Running</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800/50">
                          <span className="material-symbols-outlined text-4xl text-gray-400"> music_note </span>
                        </div>
                        <p className="text-gray-300">Music</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800/50">
                          <span className="material-symbols-outlined text-4xl text-gray-400"> photo_camera </span>
                        </div>
                        <p className="text-gray-300">Photography</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800/50">
                          <span className="material-symbols-outlined text-4xl text-gray-400"> travel_explore </span>
                        </div>
                        <p className="text-gray-300">Traveling</p>
                      </div>
                    </div>
                  </section>

                  {/* Contact Section */}
                  <section>
                    <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
                      <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> contact_mail </span>
                      Contact
                    </h3>
                    <div className="card">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="flex items-center gap-4">
                          <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">email</span>
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-gray-400">contact@example.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">link</span>
                          <div>
                            <p className="font-medium">GitHub</p>
                            <p className="text-gray-400">github.com/username</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">work</span>
                          <div>
                            <p className="font-medium">LinkedIn</p>
                            <p className="text-gray-400">linkedin.com/in/username</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="material-symbols-outlined text-2xl text-[var(--primary-color)]">location_on</span>
                          <div>
                            <p className="font-medium">Location</p>
                            <p className="text-gray-400">Beijing, China</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
        </div>
      </div>
      </div>
    </Layout>
  );
}
