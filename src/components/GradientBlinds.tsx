
'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import './GradientBlinds.css';

interface GradientBlindsProps {
  slats?: number;
  className?: string;
}

export default function GradientBlinds({ slats = 12, className }: GradientBlindsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={cn("gradient-blinds", className)}>
      {Array.from({ length: slats }).map((_, i) => (
        <div key={i} className="blind-slat border-x border-foreground/[0.02]">
          <div 
            className="blind-content animate-blind-sweep"
            style={{ 
              animationDelay: `${i * 0.2}s`,
              opacity: 0.3 + (Math.sin(i) * 0.2)
            }}
          />
        </div>
      ))}
    </div>
  );
}
