import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToSection = useCallback((sectionId: string, offset: number = 80) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - offset;
      
      // 支持旧版浏览器的平滑滚动
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // 降级方案
        const start = window.pageYOffset;
        const distance = offsetPosition - start;
        const duration = 800;
        let startTime: number | null = null;
        
        const animateScroll = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;
          const fraction = Math.min(progress / duration, 1);
          
          // 使用缓动函数
          const ease = fraction * (2 - fraction);
          window.scrollTo(0, start + distance * ease);
          
          if (fraction < 1) {
            requestAnimationFrame(animateScroll);
          }
        };
        
        requestAnimationFrame(animateScroll);
      }
    }
  }, []);

  const scrollToTop = useCallback(() => {
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return {
    scrollToSection,
    scrollToTop
  };
};
