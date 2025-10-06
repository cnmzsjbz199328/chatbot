/**
 * 项目搜索组件
 * 提供搜索框用于过滤项目列表
 */

'use client';

interface ProjectSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ProjectSearch({ 
  value, 
  onChange, 
  placeholder = "Search projects..." 
}: ProjectSearchProps) {
  return (
    <div className="relative w-full sm:w-64">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
        search
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)] pl-10 pr-4 py-2 text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500 min-h-[44px]"
      />
    </div>
  );
}
