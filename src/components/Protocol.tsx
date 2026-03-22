"use client";

import React from "react";
import { 
  Search, 
  Settings, 
  Navigation2, 
  ShieldAlert,
  Dna,
  Zap,
  Globe
} from "lucide-react";
import ScrambledText from "./ScrambledText";
import Particles from "./Particles";

const steps = [
  {
    id: "01",
    title: "Discovery & Analysis",
    subtitle: "Strategic Alignment",
    description: "Multi-market data analysis to align your brand identity with Faisalabad's specific manufacturing capabilities and cost advantages.",
    icon: <Search className="w-6 h-6" />,
    stats: "15+ Markets Indexed",
    tags: ["Market Intel", "Brand Sync"]
  },
  {
    id: "02",
    title: "Technical Engineering",
    subtitle: "Material R&D",
    description: "Developing custom fabric blends and prototypes. Leveraging Faisalabad's industrial density for rapid material innovation and sampling.",
    icon: <Dna className="w-6 h-6" />,
    stats: "72h Sampling Cycle",
    tags: ["Fabric Labs", "Prototyping"]
  },
  {
    id: "03",
    title: "Rigid Execution",
    subtitle: "Production Control",
    description: "Manufacturing within a strictly audited network of 100% compliant facilities. Real-time QC checkpoints at every stage of the lifecycle.",
    icon: <Settings className="w-6 h-6" />,
    stats: "98% QC Pass Rate",
    tags: ["Audited Paths", "Precision"]
  },
  {
    id: "04",
    title: "Logistics Pulsing",
    subtitle: "Global Deployment",
    description: "End-to-end export orchestration. Managing complex documentation and international shipping routes for seamless doorstep delivery.",
    icon: <Navigation2 className="w-6 h-6" />,
    stats: "Door-to-Door Sync",
    tags: ["Logistics", "Compliance"]
  }
];

export function Protocol() {
  return (
    <section id="protocol" className="py-60 px-6 relative bg-black overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <Particles 
          particleCount={150}
          speed={0.2}
          particleBaseSize={2}
          particleColors={["#10b981", "#065f46"]}
          cameraDistance={30}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1fr_2.5fr] gap-24">
          
          {/* Left Column: Heading & Context */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.4em] animate-badge-pulse">
                <ShieldAlert className="w-3 h-3" /> Operational Framework
              </div>
              <h2 className="font-anton text-6xl md:text-8xl text-white leading-none uppercase">
                THE <br />
                <span className="text-accent">PROTOCOL</span>
              </h2>
              <p className="font-headline text-xl text-muted-foreground/60 font-light leading-relaxed max-w-sm">
                A serious, data-driven approach to global apparel procurement.
              </p>
            </div>

            <div className="space-y-8 pt-12 border-t border-white/5">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-white mb-1">Response Speed</h4>
                  <p className="text-lg font-anton text-accent/40 uppercase">Ultra-Low Latency Sourcing</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-white mb-1">Global Sync</h4>
                  <p className="text-lg font-anton text-accent/40 uppercase">Multi-Market Integration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Protocol Steps */}
          <div className="grid md:grid-cols-2 gap-4">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className="group relative h-[450px] rounded-[3rem] overflow-hidden neumorphic-flat border border-white/5 p-10 flex flex-col justify-between transition-all duration-700 hover:scale-[0.98] hover:bg-accent/[0.02]"
              >
                {/* Step ID Overlay */}
                <div className="absolute top-10 right-10 font-anton text-9xl text-white/[0.02] group-hover:text-accent/[0.05] transition-colors">
                  {step.id}
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-500">
                    {step.icon}
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">
                      {step.subtitle}
                    </p>
                    <h3 className="font-anton text-3xl text-white uppercase leading-none">
                      <ScrambledText text={step.title} speed={50} maxIterations={15} enabled={true} />
                    </h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed font-light max-w-[280px]">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag, j) => (
                      <span key={j} className="text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="space-y-1">
                      <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/40">Benchmarked Stat</p>
                      <p className="text-lg font-anton text-accent">{step.stats}</p>
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
