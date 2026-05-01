"use client";

import React, { useState, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  name: string;
  description: string;
  techStack: string[];
  image: string;
  href: string;
  index?: number;
}

export function ProjectCard({ name, description, techStack, image, href, index = 0 }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Tilt calculations - keep values subtle for performance
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; 
    const rotateY = ((x - centerX) / centerX) * 8;
    
    // Glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    setTilt({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY });
  }, []);

  return (
    <Link href={href} className="block">
      <div 
        className="perspective-2000 group cursor-pointer gpu-accelerated"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => { 
          setIsHovering(false); 
          setTilt({ x: 0, y: 0 }); 
        }}
      >
        <Card 
          ref={cardRef}
          className={cn(
            "relative neumorphic-flat overflow-hidden rounded-[3rem] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border-white/5",
            isHovering ? "shadow-[0_20px_50px_rgba(0,0,0,0.5)]" : ""
          )}
          style={{
            transform: isHovering 
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.01, 1.01, 1.01)` 
              : `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
            transformStyle: 'preserve-3d',
            willChange: isHovering ? 'transform' : 'auto'
          }}
        >
          {/* Dynamic Glare Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-30 transition-opacity duration-700"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            }}
          />

          <div className="relative aspect-[4/5] overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
            {/* Image Layer - Optimized Next/Image */}
            <div className="absolute inset-0 transition-transform duration-700 ease-out" style={{ transform: isHovering ? 'translateZ(-10px) scale(1.05)' : 'translateZ(0px) scale(1)' }}>
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={85}
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-80 group-hover:opacity-40 transition-all duration-700" />
            
            {/* Content Layer - Floats Forward in 3D */}
            <div 
              className="absolute bottom-10 left-10 right-10 space-y-6 transition-all duration-700 ease-out"
              style={{ transform: isHovering ? 'translateZ(40px)' : 'translateZ(0px)' }}
            >
              <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                {techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-accent/20 backdrop-blur-xl border-accent/30 text-accent text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                    {tech}
                  </Badge>
                ))}
              </div>
              
              <div className="space-y-3">
                <h3 className="font-anton text-4xl md:text-5xl text-white uppercase leading-none tracking-tighter drop-shadow-2xl">
                  {name}
                </h3>
                <div className="w-12 h-1 bg-accent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </div>
            </div>
          </div>
          
          <CardContent className="p-10 space-y-4 bg-background/50 backdrop-blur-sm relative z-20">
            <p className="text-muted-foreground text-sm leading-relaxed font-light line-clamp-2 group-hover:line-clamp-none transition-all duration-700">
              {description}
            </p>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-accent opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-700 delay-200">
              Explore Capability <span className="text-lg">→</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}