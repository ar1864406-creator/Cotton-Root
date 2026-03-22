
"use client";

import React, { useState, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

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
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ x: rotateX, y: rotateY });
  }, []);

  return (
    <Link href={href} className="block">
      <div 
        className="perspective-1000 group cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => { setIsHovering(false); setTilt({ x: 0, y: 0 }); }}
      >
        <Card 
          ref={cardRef}
          className="neumorphic-flat overflow-hidden rounded-[2.5rem] transition-all duration-500 ease-out border-white/5"
          style={{
            transform: isHovering 
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)` 
              : `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700" />
            
            <div className="absolute bottom-8 left-8 right-8 space-y-4 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-white/5 backdrop-blur-md border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1">
                    {tech}
                  </Badge>
                ))}
              </div>
              <h3 className="font-anton text-4xl text-white uppercase leading-none tracking-tight">{name}</h3>
            </div>
          </div>
          
          <CardContent className="p-8 space-y-4 bg-transparent">
            <p className="text-muted-foreground text-sm leading-relaxed font-light">
              {description}
            </p>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
