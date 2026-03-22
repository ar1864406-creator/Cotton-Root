"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { 
  Globe2, 
  Factory, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Package,
  Clock,
  Leaf,
  Search
} from "lucide-react";

interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  badge?: string;
}

function BentoCard({ title, description, icon, className, badge }: BentoCardProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-[2.5rem] p-8 transition-all duration-700 hover:scale-[1.01]",
      "neumorphic-flat border border-white/5",
      className
    )}>
      {/* Morphing Background Glow */}
      <div className="absolute -inset-24 bg-accent/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="space-y-4">
          <div className="w-14 h-14 neumorphic-pill rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
            {icon}
          </div>
          
          <div className="space-y-2">
            {badge && (
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent/60">
                {badge}
              </span>
            )}
            <h3 className="font-anton text-2xl md:text-3xl text-primary uppercase leading-tight">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BentoShowcase() {
  return (
    <section className="py-40 px-6 relative bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.4em] animate-badge-pulse">
            Strategic Ecosystem
          </div>
          <h2 className="font-anton text-6xl md:text-8xl text-primary leading-none uppercase tracking-tighter">
            INDUSTRIAL <br />
            <span className="text-muted-foreground/30">MATURITY</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
          {/* Main Large Card */}
          <BentoCard 
            className="md:col-span-2 md:row-span-2"
            title="Supply Chain Architecture"
            description="Our end-to-end management system ensures seamless multi-market export across 15+ global destinations with 98% fulfillment accuracy and real-time visibility."
            icon={<Globe2 className="w-8 h-8" />}
            badge="Distribution"
          />

          {/* Vertical Impact Card */}
          <BentoCard 
            className="md:row-span-2 bg-accent/5"
            title="Origin: Faisalabad"
            description="Leveraging the unique industrial density of Pakistan's textile capital to provide unmatched cost efficiency and raw material access for high-volume retail."
            icon={<Factory className="w-8 h-8" />}
            badge="Origin Hub"
          />

          {/* Technical Card */}
          <BentoCard 
            title="Rigid QC Protocols"
            description="100% audited facilities ensuring social and environmental international standards."
            icon={<ShieldCheck className="w-6 h-6" />}
            badge="Compliance"
          />

          {/* Efficiency Card */}
          <BentoCard 
            title="Lead Time Mastery"
            description="45-day average fulfillment cycle through optimized factory scheduling."
            icon={<Clock className="w-6 h-6" />}
            badge="Operations"
          />

          {/* New Dense Cards */}
          <BentoCard 
            title="Market Intel"
            description="Data-driven sourcing based on global apparel trends and cost fluctuations."
            icon={<Search className="w-6 h-6" />}
            badge="Intelligence"
          />

          <BentoCard 
            title="Sustainability"
            description="GRS & OEKO-TEX certified partners for green supply chain management."
            icon={<Leaf className="w-6 h-6" />}
            badge="Ethics"
          />

          {/* Horizontal Wide Card */}
          <BentoCard 
            className="md:col-span-2"
            title="Precision Sampling & Prototyping"
            description="In-house pattern making and rapid physical prototyping labs for accelerated market entry and accurate design realization."
            icon={<Zap className="w-8 h-8" />}
            badge="Innovation"
          />
        </div>
      </div>
    </section>
  );
}
