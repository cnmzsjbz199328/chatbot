'use client';

import { useEffect, useRef, useState } from 'react';

interface StackedFeatureCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
  highlight?: boolean;
}

export default function StackedFeatureCard({ icon, title, description, index, highlight = false }: StackedFeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const cardTop = rect.top;
      const cardHeight = rect.height;

      // 计算滚动进度 (0-1)
      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight - cardTop) / (windowHeight + cardHeight))
      );

      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始调用

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 动态样式计算
  const scale = 0.95 + 0.05 * progress;
  const opacity = 1.0;
  const topOffset = 80; // 所有卡片使用相同的 top 值，完全覆盖

  return (
    <div
      ref={cardRef}
      className={`sticky rounded-lg p-4 sm:p-6 lg:p-8 border flex flex-col sm:flex-row gap-4 transition-all duration-300 shadow-lg ${
        highlight
          ? 'bg-gradient-to-br from-[var(--primary-color)]/10 to-purple-500/10 border-[var(--primary-color)] ring-2 ring-[var(--primary-color)]/20'
          : 'bg-white dark:bg-gray-800 border-[var(--border-color)]'
      }`}
      style={{
        top: `${topOffset}px`,
        transform: `scale(${scale})`,
        opacity: opacity,
        zIndex: highlight ? index + 100 : index + 10, // Highlighted cards have higher z-index
      }}
    >
      <div className={`flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg flex-shrink-0 ${
        highlight 
          ? 'bg-gradient-to-br from-[var(--primary-color)] to-purple-600 shadow-lg' 
          : 'bg-[var(--primary-color)]'
      }`}>
        <span className="material-symbols-outlined text-white text-2xl sm:text-3xl">{icon}</span>
      </div>
      <div className="flex-1">
        {highlight && (
          <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-[var(--primary-color)]/20 px-3 py-1 text-xs font-semibold text-[var(--primary-color)]">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            AI Feature
          </div>
        )}
        <h3 className="text-xl font-semibold text-[var(--text-primary)]">{title}</h3>
        <p className="mt-2 text-[var(--text-secondary)]">{description}</p>
        
        {/* 底部进度条 */}
        <div className={`mt-4 h-1 rounded-full overflow-hidden ${
          highlight ? 'bg-[var(--primary-color)]/20' : 'bg-gray-200 dark:bg-gray-700'
        }`}>
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              highlight 
                ? 'bg-gradient-to-r from-[var(--primary-color)] to-purple-600' 
                : 'bg-[var(--primary-color)]'
            }`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
