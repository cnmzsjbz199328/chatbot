import Image from 'next/image';
import Layout from '@/components/Layout';

export default function ProjectsPage() {
  // Sample project data - in a real application, this data would be fetched from a database
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with gateway integration.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      projectUrl: "#",
      githubUrl: "#",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"]
    },
    {
      id: 2,
      title: "Data Analysis Dashboard",
      description: "An interactive dashboard for visualizing and analyzing large datasets, with filtering and drill-down capabilities.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
      projectUrl: "#",
      githubUrl: "#",
      tags: ["Vue.js", "D3.js", "Python", "FastAPI"]
    },
    {
      id: 3,
      title: "Task Management Mobile App",
      description: "A mobile app for managing tasks and to-do lists, with features like reminders, categories, and progress tracking.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
      projectUrl: "#",
      githubUrl: "#",
      tags: ["React Native", "Firebase", "TypeScript"]
    },
    {
      id: 4,
      title: "Blog Website",
      description: "A personal blog website built with a modern framework, featuring a responsive design and content management system integration.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
      projectUrl: "#",
      githubUrl: "#",
      tags: ["Next.js", "MDX", "TailwindCSS"]
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "A portfolio website to showcase my projects and skills, with a clean and professional design.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop",
      projectUrl: "#",
      githubUrl: "#",
      tags: ["React", "Framer Motion", "Vercel"]
    },
    {
      id: 6,
      title: "API Development",
      description: "Developed a RESTful API for a web application, with features like authentication, data validation, and database integration.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop",
      projectUrl: "#",
      githubUrl: "#",
      tags: ["Go", "Gin", "PostgreSQL", "Docker"]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto flex flex-col px-4 py-10 sm:px-6 lg:flex-row lg:gap-8 lg:px-8">
              {/* Projects Grid */}
              <div className="flex-1">
                <div className="mb-12 text-center lg:text-left">
                  <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Featured Projects</h2>
                  <p className="mt-4 text-lg text-gray-400">A series of projects showcasing my IT skills and experience.</p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {projects.map((project) => (
                    <div key={project.id} className="group transform-gpu overflow-hidden rounded-lg bg-gray-800/50 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/30">
                      <div className="relative">
                        <div className="h-56 w-full overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={500}
                            height={300}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="text-xl font-bold">{project.title}</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="mb-4 text-gray-400">{project.description}</p>

                        {/* Tags */}
                        <div className="mb-4 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-[var(--primary-color)]/20 px-3 py-1 text-xs font-medium text-[var(--primary-color)]">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between">
                          <a
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-color)] hover:underline"
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Project <span className="material-symbols-outlined text-base">arrow_forward</span>
                          </a>
                          <a
                            className="text-gray-400 hover:text-white transition-colors"
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                              <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="w-full lg:w-96 lg:flex-shrink-0 mt-12 lg:mt-0">
                <div className="sticky top-20 rounded-lg bg-gray-800/50 p-6 shadow-lg">
                  <h3 className="mb-4 text-xl font-bold">Search Projects</h3>
                  <div className="relative">
                    <input
                      className="w-full rounded-md border-gray-600 bg-gray-700/50 py-2 pl-10 pr-4 text-white focus:border-primary-500 focus:ring-primary-500 placeholder-gray-400"
                      placeholder="Search..."
                      type="text"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-gray-400"> search </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h4 className="font-semibold text-gray-300">Filter by Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Next.js', 'Vue.js', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'Docker'].map((tech) => (
                        <button
                          key={tech}
                          className="rounded-full border border-gray-600 px-3 py-1 text-xs font-medium text-gray-300 hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors"
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h4 className="font-semibold text-gray-300">Project Statistics</h4>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex justify-between">
                        <span>Total Projects</span>
                        <span className="font-medium text-white">{projects.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Open Source Projects</span>
                        <span className="font-medium text-white">{projects.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Technologies Used</span>
                        <span className="font-medium text-white">15+</span>
                      </div>
                    </div>
                  </div>
                </div>
        </aside>
      </div>
    </Layout>
  );
}
