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
      company: "某科技公司",
      position: "软件工程师",
      startDate: "2022年",
      endDate: "至今",
      description: [
        "负责设计、开发和维护Web应用程序。",
        "与跨职能团队合作，交付高质量的软件解决方案。",
        "参与代码审查和指导初级开发人员。"
      ]
    }
  ];

  const experienceData = workExperience && workExperience.length > 0 ? workExperience : defaultWorkExperience;

  return (
    <section className="mb-12">
      <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
        <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> Work Experience </span>
      </h3>
      <div className="space-y-12 border-l-2 border-gray-700 pl-8">
        {experienceData.map((work, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[38px] top-1 h-4 w-4 rounded-full bg-[var(--primary-color)]"></div>
            <h4 className="text-xl font-semibold">{work.company}</h4>
            <p className="font-medium text-gray-300">{work.position}</p>
            <p className="text-sm text-gray-500">{work.startDate} - {work.endDate}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-400">
              {work.description?.map((desc, descIndex) => (
                <li key={descIndex}>{desc}</li>
              )) || []}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
