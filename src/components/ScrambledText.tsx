'use client';

import { useEffect, useState, useRef } from 'react';

interface ScrambledTextProps {
  text: string;
  characters?: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  enabled?: boolean;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  text,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+',
  speed = 40,
  maxIterations = 10,
  className = '',
  enabled = true,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isMounted, setIsMounted] = useState(false);
  const iterationRef = useRef(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !enabled) return;

    iterationRef.current = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            // Lock characters from left to right as iterations progress
            const progressFactor = iterationRef.current / (maxIterations + 5);
            const lockThreshold = progressFactor * text.length;
            
            if (index < lockThreshold) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      iterationRef.current++;

      if (iterationRef.current > maxIterations + 10) {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, characters, speed, maxIterations, isMounted, enabled]);

  // Prevent hydration mismatch: render the final text on server
  if (!isMounted) return <span className={className}>{text}</span>;

  return <span className={className}>{displayText}</span>;
};

export default ScrambledText;
