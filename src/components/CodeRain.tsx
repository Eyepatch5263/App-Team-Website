import React, { useEffect, useRef, useCallback } from 'react';

const CodeRain: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number>();
  const dropsRef = useRef<Set<HTMLElement>>(new Set());

  const createRainDrop = useCallback((x: number) => {
    const container = containerRef.current;
    if (!container) return;

    const drop = document.createElement('div');
    const codeChars = ['0', '1', '{', '}', '<', '>', '/', '\\'];
    drop.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
    
    const isMobile = window.innerWidth < 768;
    drop.className = `absolute font-mono pointer-events-none ${
      isMobile 
        ? 'text-xs opacity-8 animate-code-rain-mobile' 
        : 'text-sm opacity-15 animate-code-rain'
    }`;
    
    drop.style.left = `${x}px`;
    drop.style.top = '-20px';
    drop.style.color = '#3B82F6';
    drop.style.willChange = 'transform';
    
    container.appendChild(drop);
    dropsRef.current.add(drop);

    // Remove drop after animation with cleanup
    setTimeout(() => {
      if (container.contains(drop)) {
        container.removeChild(drop);
        dropsRef.current.delete(drop);
      }
    }, isMobile ? 8000 : 12000);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    const columnWidth = isMobile ? 60 : 35;
    const columns = Math.floor(window.innerWidth / columnWidth);
    
    // Significantly reduce frequency for mobile and low-end devices
    const baseFrequency = isMobile ? 0.998 : 0.994;
    const frequency = isLowEnd ? baseFrequency + 0.003 : baseFrequency;
    const intervalTime = isMobile ? 800 : 400;

    intervalRef.current = window.setInterval(() => {
      // Limit total drops for performance
      if (dropsRef.current.size > (isMobile ? 8 : 20)) return;

      for (let i = 0; i < columns; i++) {
        if (Math.random() > frequency) {
          createRainDrop(i * columnWidth);
        }
      }
    }, intervalTime);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Clean up all drops
      dropsRef.current.forEach(drop => {
        if (container.contains(drop)) {
          container.removeChild(drop);
        }
      });
      dropsRef.current.clear();
    };
  }, [createRainDrop]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{ willChange: 'auto' }}
    />
  );
};

export default React.memo(CodeRain);