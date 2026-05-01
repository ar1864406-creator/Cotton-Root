'use client';

import React, { useRef, useEffect } from 'react';

export function WarpGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -2000, y: -2000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const { width, height } = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      };
    };

    const handleMouseLeave = () => {
      mouse.current = { x: -2000, y: -2000 };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);
    
    handleResize();

    const gridSize = 60;
    const influenceRadius = 180;
    const strength = 35;

    const render = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      
      // Dynamic color based on current theme class
      const isDark = document.documentElement.classList.contains('dark');
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 1;

      const cols = Math.ceil(width / gridSize) + 1;
      const rows = Math.ceil(height / gridSize) + 1;

      // Draw vertical lines
      for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        for (let j = 0; j <= rows; j++) {
          let x = i * gridSize;
          let y = j * gridSize;

          const dx = x - mouse.current.x;
          const dy = y - mouse.current.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < influenceRadius * influenceRadius) {
            const dist = Math.sqrt(distSq);
            const factor = (1 - dist / influenceRadius) * strength;
            x += (dx / dist) * factor;
            y += (dy / dist) * factor;
          }

          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let j = 0; j <= rows; j++) {
        ctx.beginPath();
        for (let i = 0; i <= cols; i++) {
          let x = i * gridSize;
          let y = j * gridSize;

          const dx = x - mouse.current.x;
          const dy = y - mouse.current.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < influenceRadius * influenceRadius) {
            const dist = Math.sqrt(distSq);
            const factor = (1 - dist / influenceRadius) * strength;
            x += (dx / dist) * factor;
            y += (dy / dist) * factor;
          }

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-80 z-0"
      style={{
        maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
      }}
    />
  );
}
