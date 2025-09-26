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
    <section className="mb-12">
      <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
        <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]">Hobbies</span>
      </h3>
        <div className="flex flex-wrap gap-2">
          {hobbies.map((hobby, index) => (
            <span key={index} className="flex items-center gap-1 rounded-full bg-gray-700 px-3 py-1 text-sm">
              {hobby.name}
            </span>
          ))}
        </div>
    </section>
  );
}
