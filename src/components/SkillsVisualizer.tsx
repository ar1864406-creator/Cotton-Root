"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Target, MapPin, Globe, ShieldCheck, Zap } from "lucide-react";
import CardSwap, { Card } from './CardSwap';

const marketData = [
  { name: "USA", value: 95 },
  { name: "EUROPE", value: 88 },
  { name: "UK", value: 92 },
  { name: "SCM", value: 98 },
  { name: "QC", value: 96 },
  { name: "LOGISTICS", value: 90 },
];

export function SkillsVisualizer() {
  const [mounted, setMounted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return (
    <section id="expertise" className="py-40 px-6 relative bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-24 items-center">
        <div className="space-y-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.4em] animate-badge-pulse">
              Market Mapping
            </div>
            <h2 className="font-anton text-6xl md:text-8xl text-primary leading-none uppercase">
              EXPORT <br />
              <span className="text-muted-foreground/30">INTELLIGENCE</span>
            </h2>
            <p className="font-headline text-xl text-muted-foreground font-light leading-relaxed max-w-xl">
              Mapping our strategic reach across global markets with data-driven logistics and compliance excellence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {marketData.map((item, i) => (
              <div key={i} className="p-8 neumorphic-flat rounded-[2.5rem] border-white/5 group hover:scale-[1.02] transition-all duration-500">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.name}</span>
                  <Target className="w-4 h-4 text-accent opacity-40" />
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-5xl font-anton text-primary group-hover:text-accent transition-colors">{item.value}%</div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-30">Accuracy</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-4 pt-8 opacity-40">
            <MapPin className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Global HQ: Faisalabad, Pakistan</span>
          </div>
        </div>

        <div className="relative">
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            className="relative aspect-square glass-card rounded-[5rem] p-12 md:p-20 shadow-2xl reveal-section group overflow-hidden transition-transform duration-500 ease-out border-white/5"
            style={{ 
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full group-hover:bg-accent/10 transition-colors duration-1000" />
            
            <div className="w-full h-full relative z-10" style={{ transform: 'translateZ(60px)' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={marketData}>
                  <PolarGrid stroke="rgba(255, 255, 255, 0.05)" strokeWidth={0.5} />
                  <PolarAngleAxis 
                    dataKey="name" 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontWeight: 900, letterSpacing: '0.15em' }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  
                  <Radar
                    name="Expertise"
                    dataKey="value"
                    stroke="hsl(var(--accent))"
                    strokeWidth={3}
                    fill="hsl(var(--accent))"
                    fillOpacity={0.2}
                    animationDuration={2000}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Card Swap Section integrated next to Export Intelligence logic */}
          <div className="hidden lg:block">
            <CardSwap cardDistance={40} verticalDistance={50} delay={4000} pauseOnHover={true} width={320} height={200}>
              <Card>
                <Globe className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-anton text-lg text-primary uppercase">Global Reach</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">15+ Markets Covered</p>
              </Card>
              <Card>
                <ShieldCheck className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-anton text-lg text-primary uppercase">Rigid Compliance</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">100% Audited Facilities</p>
              </Card>
              <Card>
                <Zap className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-anton text-lg text-primary uppercase">Lead Time Mastery</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">45-Day Fulfillment Cycle</p>
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}
