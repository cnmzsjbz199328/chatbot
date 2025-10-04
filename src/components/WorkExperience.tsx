interface WorkExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
}

interface WorkExperienceProps {
  workExperience?: WorkExperienceItem[];
}

export default function WorkExperience({ workExperience }: WorkExperienceProps) {
  const defaultWorkExperience: WorkExperienceItem[] = [
    {
      company: "No relevant information",
      position: "No relevant information",
      startDate: "N/A",
      endDate: "N/A",
      description: [
        "No relevant work experience information available."
      ]
    }
  ];

  const experienceData = workExperience && workExperience.length > 0 ? workExperience : defaultWorkExperience;

  return (
    <details className="mb-1 group">
      <summary className="mb-8 flex items-center gap-4 text-2xl font-bold text-[var(--text-primary)] cursor-pointer list-none focus:outline-none">
        <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]">work</span>
        <span>Work Experience</span>
        <svg
          className="w-6 h-6 text-[var(--text-secondary)] transition-transform duration-300 group-open:rotate-180"
          aria-label="展开/收起"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="mb-8 space-y-8 sm:space-y-12 border-l-2 border-[var(--border-color)] pl-4 sm:pl-8">
        {experienceData.map((work, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[22px] sm:-left-[38px] top-1 h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-[var(--primary-color)]"></div>
            <h4 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)]">{work.company}</h4>
            <p className="font-medium text-[var(--text-secondary)] text-sm sm:text-base">{work.position}</p>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">{work.startDate} - {work.endDate}</p>
            <ul className="mt-3 sm:mt-4 list-disc space-y-2 pl-4 sm:pl-5 text-sm sm:text-base text-[var(--text-secondary)]">
              {work.description?.map((desc, descIndex) => (
                <li key={descIndex}>{desc}</li>
              )) || []}
            </ul>
          </div>
        ))}
      </div>
    </details>
  );
}
