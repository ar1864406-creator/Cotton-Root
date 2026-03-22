
"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button';
      
      if (isInteractive) setIsHovering(true);
    };

    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    let rafId: number;
    const render = () => {
      const lerp = 0.35;
      const lerpFn = (start: number, end: number, factor: number) => start + (end - start) * factor;
      
      cursorPos.current.x = lerpFn(cursorPos.current.x, mousePos.current.x, lerp);
      cursorPos.current.y = lerpFn(cursorPos.current.y, mousePos.current.y, lerp);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) scale(${isClicking ? 0.9 : isHovering ? 1.15 : 1})`;
      }
      
      rafId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener('resize', checkMobile);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible, isHovering, isClicking]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed top-0 left-0 pointer-events-none z-[10000] transition-opacity duration-300 ease-out",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      style={{ willChange: 'transform' }}
    >
      {/* Glassmorphic Green Windows Cursor (Stemless) */}
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_8px_hsla(var(--accent),0.4)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
      >
        <path 
          d="M1.5 1.5L18 12.5L9 13.5L1.5 21V1.5Z" 
          fill="hsla(var(--accent), 0.4)" 
          stroke="white" 
          strokeWidth="1"
          strokeLinejoin="round"
          className="backdrop-blur-[2px]"
        />
      </svg>
    </div>
  );
}
