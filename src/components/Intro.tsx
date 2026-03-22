"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Intro() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Progress simulation logic
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Increment progress naturally
        return prev + 1;
      });
    }, 20);

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2800);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = originalStyle;
    }, 3800);

    return () => {
      document.body.style.overflow = originalStyle;
      clearInterval(interval);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-1000 ease-in-out",
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="relative flex flex-col items-center">
        {/* Logo Section */}
        <div className="relative animate-in fade-in zoom-in-95 duration-1000 ease-out">
          <span className="font-anton text-6xl md:text-8xl text-primary uppercase tracking-tighter flex items-center gap-3">
            COTTON<span className="text-accent">ROOT</span>
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-accent animate-blink-sharp shadow-[0_0_15px_hsla(var(--accent),0.5)]" />
              <div className="absolute w-4 h-4 rounded-full bg-accent animate-ping opacity-20" />
            </div>
          </span>
        </div>

        {/* Progress Section */}
        <div className="mt-8 w-64 md:w-80 space-y-4 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <div className="w-full h-[1.5px] bg-primary/5 rounded-full overflow-hidden relative neumorphic-inset">
            <div 
              className="absolute inset-y-0 left-0 bg-accent transition-all duration-300 ease-out shadow-[0_0_15px_hsla(var(--accent),0.4)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex justify-between w-full px-1">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
                Initializing Strategic Core
              </span>
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-accent">
              {progress}%
            </span>
          </div>
        </div>

        {/* Footer Subtext */}
        <div className="mt-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-muted-foreground/20">
            Faisalabad Hub Operations
          </span>
        </div>
      </div>
    </div>
  );
}
