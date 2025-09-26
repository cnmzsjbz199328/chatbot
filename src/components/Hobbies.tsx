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
        <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]"> sports_esports </span>
        兴趣爱好
      </h3>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
        {hobbies.map((hobby, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800/50">
              <span className="material-symbols-outlined text-4xl text-gray-400">{hobby.icon}</span>
            </div>
            <p className="text-gray-300">{hobby.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
