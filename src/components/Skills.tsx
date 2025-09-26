interface SkillsProps {
  skills?: string[] | null;
}

export default function Skills({ skills }: SkillsProps) {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
        <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]">Skills</span>
      </h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span key={index} className="rounded-full bg-gray-700 px-3 py-1 text-sm">
              {skill}
            </span>
          ))}
        </div>
    </section>
  );
}
