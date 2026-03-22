
import React from "react";
import { ProjectCard } from "./ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const products = [
  {
    name: "Knitwear Specialists",
    description: "Premium high-density jerseys and fleece blends optimized for durability. Engineered for high-volume retail performance.",
    techStack: ["High Volume", "OEM", "Export Ready"],
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
    href: "/products/knitwear",
  },
  {
    name: "Woven Solutions",
    description: "Structured outerwear and lightweight seasonal pieces. Manufactured in audited facilities for global standard compliance.",
    techStack: ["Structured", "Compliance", "Premium"],
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
    href: "/products/woven",
  },
  {
    name: "Basics & Essentials",
    description: "End-to-end supply chain for high-performance basics. Consistent quality through rigid QC protocols and precision sampling.",
    techStack: ["Consistent", "Logistics", "Scale"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    href: "/products/basics",
  },
];

export function Projects() {
  return (
    <section id="products" className="py-40 px-6 relative bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-32 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.4em] animate-badge-pulse">
            <Sparkles className="w-3 h-3" /> Core Capabilities
          </div>
          <h2 className="font-anton text-6xl md:text-8xl text-primary tracking-tight leading-none uppercase">
            PRODUCT <br />
            <span className="text-muted-foreground/30">OFFERINGS</span>
          </h2>
          <div className="w-40 h-1 bg-accent/20 rounded-full" />
          <p className="font-headline text-xl text-muted-foreground max-w-2xl font-light leading-relaxed">
            Delivering precision-engineered apparel through a strategic global supply chain hub in Faisalabad.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <div key={product.name} className="reveal-section">
              <ProjectCard {...product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
