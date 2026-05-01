"use client";

import React from "react";
import { ShieldCheck, Truck, BarChart3, Fingerprint, Zap, Globe } from "lucide-react";

export function Resume() {
  const benefits = [
    {
      title: "Operational Precision",
      description: "End-to-end control from sampling to export documentation, ensuring every stitch meets global standards.",
      icon: <Fingerprint className="w-6 h-6 text-accent" />,
      bullets: ["Rigid Quality Protocols", "Precision Sampling", "Expert Pattern Making"]
    },
    {
      title: "Global Distribution",
      description: "Strategically located Faisalabad hub with logistics partnerships for seamless multi-market delivery.",
      icon: <Globe className="w-6 h-6 text-accent" />,
      bullets: ["Multi-Market Export", "Strategic Warehousing", "Optimized Logistics"]
    },
    {
      title: "Strategic Pricing",
      description: "Leveraging hub-level negotiation power to provide high-volume manufacturing at competitive rates.",
      icon: <Zap className="w-6 h-6 text-accent" />,
      bullets: ["Bespoke Negotiations", "Scale Optimization", "Transparent Sourcing"]
    },
    {
      title: "Risk Compliance",
      description: "Rigorous auditing of manufacturing partners to ensure full international labor and quality compliance.",
      icon: <ShieldCheck className="w-6 h-6 text-accent" />,
      bullets: ["Audited Facilities", "Social Compliance", "Environmental Standards"]
    }
  ];

  return (
    <section id="advantage" className="py-40 px-6 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.4em] animate-badge-pulse">
              The Advantage
            </div>
            <h2 className="font-anton text-6xl md:text-8xl text-primary leading-none uppercase tracking-tighter">
              STRATEGIC <br />
              <span className="text-muted-foreground/30">SOURCING</span>
            </h2>
            <p className="font-headline text-xl text-muted-foreground font-light leading-relaxed max-w-xl">
              Our B2B model is built on trust, transparency, and the industrial maturity required for global scale.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="p-10 neumorphic-flat rounded-[3rem] space-y-4">
              <BarChart3 className="w-10 h-10 text-accent" />
              <div className="text-4xl font-anton text-primary">98%</div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Order fulfillment accuracy</p>
            </div>
            <div className="p-10 neumorphic-flat rounded-[3rem] space-y-4">
              <Truck className="w-10 h-10 text-accent" />
              <div className="text-4xl font-anton text-primary">15+</div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Global market reach</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="p-8 space-y-6 neumorphic-flat rounded-[2.5rem] group hover:scale-[1.02] transition-all duration-500 reveal-section">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-500 neumorphic-pill">
                {benefit.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-anton text-xl text-primary uppercase">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{benefit.description}</p>
              </div>
              <ul className="space-y-2 pt-4 border-t border-white/5">
                {benefit.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/60">
                    <div className="w-1 h-1 rounded-full bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}