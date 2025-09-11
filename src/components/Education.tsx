interface EducationItem {
  school: string;
  degree: string;
  startYear: number;
  endYear: number;
}

interface EducationProps {
  education?: EducationItem[];
}

export default function Education({ education }: EducationProps) {
  const defaultEducation: EducationItem[] = [
    {
      school: "某某大学",
      degree: "计算机科学学士",
      startYear: 2018,
      endYear: 2022
    }
  ];

  const educationData = education && education.length > 0 ? education : defaultEducation;

  return (
    <section>
      <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
        <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> school </span>
        教育经历
      </h3>
      <div className="space-y-8 border-l-2 border-gray-700 pl-8">
        {educationData.map((edu, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[38px] top-1 h-4 w-4 rounded-full bg-[var(--primary-color)]"></div>
            <h4 className="text-xl font-semibold">{edu.school}</h4>
            <p className="text-gray-400">{edu.degree}</p>
            <p className="text-sm text-gray-500">{edu.startYear}年 - {edu.endYear}年</p>
          </div>
        ))}
      </div>
    </section>
  );
}
