"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const skillData = [
  { name: "Technical Sourcing", level: 95 },
  { name: "Quality Assurance", level: 98 },
  { name: "Supply Chain", level: 92 },
  { name: "Sustainability", level: 88 },
  { name: "Logistics", level: 90 },
];

const chartConfig = {
  level: {
    label: "Proficiency Level",
    color: "hsl(var(--accent))",
  },
};

export function SkillGraph() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setTilt({ x: rotateX, y: rotateY });
  }, []);

  return (
    <section id="skills" className="py-40 px-6 relative bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.4em] animate-badge-pulse">
                Capability Matrix
              </div>
              <h2 className="font-anton text-6xl md:text-8xl text-primary leading-none uppercase tracking-tighter">
                CORE <br />
                <span className="text-muted-foreground/30">SKILLS</span>
              </h2>
              <p className="font-headline text-xl text-muted-foreground font-light leading-relaxed max-w-xl">
                Quantifying our operational excellence through precision-tracked performance metrics across the apparel lifecycle.
              </p>
            </div>

            <div className="space-y-8">
              {skillData.map((skill, i) => (
                <div key={i} className="space-y-3 group/item cursor-default">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-primary/70 transition-all duration-500 ease-out group-hover/item:text-accent group-hover/item:scale-110 group-hover/item:translate-x-2">
                    <span className="transition-all duration-500 group-hover/item:neon-outline">{skill.name}</span>
                    <span className="text-accent font-black transition-all duration-500 group-hover/item:animate-badge-pulse">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-background neumorphic-inset rounded-full relative transition-all duration-500 ease-out group-hover/item:h-5">
                    <div 
                      className="absolute inset-y-0 left-0 bg-accent transition-all duration-1000 delay-300 ease-out rounded-full shadow-[0_0_10px_hsla(var(--accent),0.3)] group-hover/item:animate-badge-pulse group-hover/item:shadow-[0_0_20px_hsla(var(--accent),0.5)]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            className="relative glass-card rounded-[4rem] p-8 md:p-16 shadow-2xl reveal-section group min-h-[500px] transition-transform duration-500 ease-out border-white/5 overflow-hidden"
            style={{ 
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-accent/5 blur-[120px] rounded-full group-hover:bg-accent/10 transition-colors duration-1000" />
            
            <div className="w-full h-full relative z-10 flex flex-col" style={{ transform: 'translateZ(50px)' }}>
              <ChartContainer config={chartConfig} className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillData} margin={{ top: 40, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={1} />
                        <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0.4} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9, fontWeight: 900, letterSpacing: '0.1em' }}
                    />
                    <YAxis hide domain={[0, 110]} />
                    <ChartTooltip cursor={{fill: 'rgba(255, 255, 255, 0.02)'}} content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="level" 
                      radius={[12, 12, 0, 0]}
                      animationDuration={1500}
                      barSize={40}
                    >
                      <LabelList 
                        dataKey="level" 
                        position="top" 
                        offset={15}
                        fill="hsl(var(--accent))" 
                        fontSize={12} 
                        fontWeight={900} 
                        formatter={(val: number) => `${val}%`}
                      />
                      {skillData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill="url(#barGradient)" 
                          className="hover:opacity-80 transition-opacity cursor-pointer shadow-lg"
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}