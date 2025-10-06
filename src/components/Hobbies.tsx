interface HobbyItem {
  name: string;
  icon: string;
}

interface HobbiesProps {
  hobbies?: HobbyItem[];
}

export default function Hobbies({ hobbies }: HobbiesProps) {
  if (!hobbies || hobbies.length === 0) {
    return null;
  }

  return (
    <details className="mb-1 group">
      <summary className="mb-8 flex items-center gap-4 text-2xl font-bold text-[var(--text-primary)] cursor-pointer list-none focus:outline-none">
        <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]">interests</span>
        <span>Hobbies</span>
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
      <div className="mb-8 flex flex-wrap gap-2">
        {hobbies.map((hobby, index) => (
          <span key={index} className="flex items-center gap-1 rounded-full bg-[var(--accent-color)] px-3 py-1 text-sm text-[var(--text-secondary)]">
            {hobby.name}
          </span>
        ))}
      </div>
    </details>
  );
}
