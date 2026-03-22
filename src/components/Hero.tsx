"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Factory } from "lucide-react";
import ShinyText from "./ShinyText";
import { WarpGrid } from "./WarpGrid";
import StarBorder from "./StarBorder";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(29,185,84,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Interactive Bending Grid */}
        <WarpGrid />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        <div className="flex flex-col items-center space-y-12">
          
          {/* Main Title */}
          <div className="space-y-6">
            <h1 className="font-anton text-[12vw] md:text-[11rem] leading-[0.85] tracking-tight uppercase flex flex-col items-center">
              <span className="text-primary/90">COTTON</span>
              <span className="relative -mt-[0.05em] md:-mt-[0.1em]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-400 to-accent animate-gradient-flow bg-[length:200%_auto] text-glow-accent">ROOT</span>
                {/* Glow behind ROOT */}
                <div className="absolute inset-0 bg-accent/20 blur-[100px] -z-10 rounded-full scale-150 opacity-50" />
              </span>
            </h1>
            
            <p className="font-serif italic text-lg md:text-sm text-muted-foreground/60 max-w-2xl mx-auto leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              Transforming apparel sourcing with precision, scale, and transparency.
            </p>
          </div>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <a href="#products">
              <StarBorder 
                as="div" 
                color="hsl(var(--accent))" 
                speed="3s" 
                thickness={2}
                className="rounded-full shadow-2xl shadow-accent/10 group animate-in fade-in zoom-in-95 slide-in-from-bottom-4 fill-mode-both delay-500"
              >
                <Button 
                  size="lg" 
                  className="h-12 px-8 rounded-full bg-accent hover:bg-accent/90 text-white font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 ease-out border-none"
                >
                  <ShinyText text="Explore Advantage" speed={3} />
                  <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                </Button>
              </StarBorder>
            </a>
            
            <a href="#contact">
              <StarBorder 
                as="div" 
                color="rgba(255,255,255,0.3)" 
                speed="5s" 
                thickness={1}
                className="rounded-full group animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-700"
              >
                <Button 
                  variant="outline"
                  size="lg" 
                  className="h-12 px-8 rounded-full border-none hover:bg-white/5 font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 ease-out text-muted-foreground hover:text-white"
                >
                  Partner With Us
                </Button>
              </StarBorder>
            </a>
          </div>

          {/* Meta Info */}
          <div className="flex gap-12 pt-8 opacity-40 animate-in fade-in duration-1000 delay-1000">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Global Network</span>
            </div>
            <div className="flex items-center gap-2">
              <Factory className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Direct Sourcing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
