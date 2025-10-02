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
  if (!education || education.length === 0) {
    return null;
  }

  return (
    <details className="mb-1 group">
      <summary className="mb-8 flex items-center gap-4 text-2xl font-bold text-[var(--text-primary)] cursor-pointer list-none focus:outline-none">
        <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]">school</span>
        <span>Education</span>
        {/* 下拉箭头图标，随展开状态旋转 */}
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
      <div className="space-y-8 border-l-2 border-[var(--border-color)] pl-8 transition-all duration-300 ease-in-out">
        {education.map((edu, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[38px] top-1 h-4 w-4 rounded-full bg-[var(--primary-color)]"></div>
            <h4 className="text-xl font-semibold text-[var(--text-primary)]">{edu.school}</h4>
            <p className="text-[var(--text-secondary)]">{edu.degree}</p>
            <p className="text-sm text-[var(--text-secondary)]">{edu.startYear}年 - {edu.endYear}年</p>
          </div>
        ))}
      </div>
    </details>
  );
}
