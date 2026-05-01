
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ShuffleProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export default function Shuffle({ text, className, duration = 1000, delay = 500 }: ShuffleProps) {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startShuffle = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    let iteration = 0;
    const maxIterations = 10;
    const intervalTime = duration / (text.length * maxIterations);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setDisplayText((prev) => {
        return text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
      });

      iteration += 1 / maxIterations;

      if (iteration >= text.length) {
        setDisplayText(text);
        if (timerRef.current) clearInterval(timerRef.current);
        setIsAnimating(false);
      }
    }, intervalTime);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      startShuffle();
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, delay]);

  // Initial placeholder with correct length to prevent layout shift
  useEffect(() => {
    setDisplayText(text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join(''));
  }, [text]);

  return (
    <span 
      className={cn("shuffle-text tabular-nums", className)}
      onMouseEnter={startShuffle}
    >
      {displayText}
    </span>
  );
}
