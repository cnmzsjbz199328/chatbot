'use client';

import { useEffect, useRef, useState } from 'react';

interface StackedFeatureCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

export default function StackedFeatureCard({ icon, title, description, index }: StackedFeatureCardProps) {
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
      className="sticky rounded-lg bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 border border-[var(--border-color)] flex flex-col sm:flex-row gap-4 transition-all duration-300 shadow-lg"
      style={{
        top: `${topOffset}px`,
        transform: `scale(${scale})`,
        opacity: opacity,
        zIndex: index + 10, // 正序 z-index，后面的卡片在上面
      }}
    >
      <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg bg-[var(--primary-color)] flex-shrink-0">
        <span className="material-symbols-outlined text-white text-2xl sm:text-3xl">{icon}</span>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-[var(--text-primary)]">{title}</h3>
        <p className="mt-2 text-[var(--text-secondary)]">{description}</p>
        
        {/* 底部进度条 */}
        <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--primary-color)] transition-all duration-300 rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
