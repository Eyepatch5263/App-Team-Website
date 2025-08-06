import React, { useEffect, useRef, useCallback } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    resizeCanvas();

    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    const nodeCount = isMobile ? (isLowEnd ? 6 : 8) : (isLowEnd ? 15 : 20);

    // Initialize nodes only once
    if (nodesRef.current.length === 0) {
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.08 : 0.15),
          vy: (Math.random() - 0.5) * (isMobile ? 0.08 : 0.15),
        });
      }
    }

    let lastTime = 0;
    const targetFPS = isMobile ? 24 : 45;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      lastTime = currentTime;

      // Clear with trail effect (increased for mobile)
      ctx.fillStyle = isMobile ? 'rgba(10, 14, 26, 0.12)' : 'rgba(10, 14, 26, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const maxDistance = isMobile ? 50 : 70;
      const nodeOpacity = isMobile ? 0.08 : 0.15;
      const connectionOpacity = isMobile ? 0.03 : 0.06;

      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(canvas.width, node.x));
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(canvas.height, node.y));
        }

        // Draw node (smaller for mobile)
        ctx.fillStyle = `rgba(59, 130, 246, ${nodeOpacity})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, isMobile ? 0.6 : 1, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections (further reduced for mobile)
        if (!isMobile || i % 3 === 0) {
          nodes.slice(i + 1).forEach((otherNode) => {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
              const opacity = connectionOpacity * (1 - distance / maxDistance);
              ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
              ctx.lineWidth = 0.3;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.stroke();
            }
          });
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      resizeCanvas();
      // Update node positions to stay within bounds
      nodesRef.current.forEach(node => {
        node.x = Math.min(node.x, canvas.width);
        node.y = Math.min(node.y, canvas.height);
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [resizeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ 
        background: 'transparent',
        willChange: 'auto'
      }}
    />
  );
};

export default React.memo(AnimatedBackground);