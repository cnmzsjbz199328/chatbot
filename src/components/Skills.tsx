interface SkillsProps {
  skills?: string[] | null;
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section>
      <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
        <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]">code</span>
        技能专长
      </h3>
      {skills && skills.length > 0 ? (
        <div className="rounded-lg bg-gray-800 p-6">
          <h4 className="mb-4 text-lg font-semibold text-[var(--primary-color)]">技术栈</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="rounded-full bg-gray-700 px-3 py-1 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-gray-800 p-6">
            <h4 className="mb-4 text-lg font-semibold text-[var(--primary-color)]">前端技术</h4>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">React</span>
              <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">Vue.js</span>
              <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">Next.js</span>
              <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">TypeScript</span>
              <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">Tailwind CSS</span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-6">
            <h4 className="mb-4 text-lg font-semibold text-[var(--primary-color)]">后端技术</h4>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">Node.js</span>
              <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">Python</span>
              <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">PostgreSQL</span>
              <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">MongoDB</span>
              <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">Redis</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
