
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const productContent: Record<string, any> = {
  knitwear: {
    title: "Knitwear Specialists",
    subtitle: "High-Density Precision",
    description: "Our knitwear division specializes in high-volume production of premium jerseys, interlocks, and fleece blends. We utilize state-of-the-art machinery to ensure consistent density and durability across large-scale retail orders.",
    features: [
      "240-400 GSM high-density fleece manufacturing",
      "Specialized enzyme and silicone washes for premium hand-feel",
      "Rigid shade consistency across 100k+ unit batches",
      "Optimized for high-speed automated cutting and sewing"
    ],
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1200",
    stats: [
      { label: "Daily Output", value: "25k Units" },
      { label: "QC Pass Rate", value: "99.2%" },
      { label: "Lead Time", value: "35 Days" }
    ]
  },
  woven: {
    title: "Woven Solutions",
    subtitle: "Structured Excellence",
    description: "From lightweight seasonal shirts to structured technical outerwear, our woven division focuses on intricate detailing and international compliance. We manage complex supply chains for specialized trims and high-performance fabrics.",
    features: [
      "Advanced pattern engineering for ergonomic fit",
      "Specialized seam sealing and water-repellent finishing",
      "Ethically sourced twills, poplins, and technical blends",
      "Internal prototyping lab for rapid style development"
    ],
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1200",
    stats: [
      { label: "Tech Styles", value: "150+" },
      { label: "Compliance", value: "100%" },
      { label: "MOQ Flexibility", value: "Strategic" }
    ]
  },
  basics: {
    title: "Basics & Essentials",
    subtitle: "Core Supply Efficiency",
    description: "The backbone of high-volume retail. Our basics program is designed for maximum efficiency, consistent quality, and aggressive pricing. We leverage Faisalabad's industrial density to provide unmatched value for evergreen programs.",
    features: [
      "Vertical integration from yarn sourcing to final pack",
      "Proprietary quality control software for real-time tracking",
      "Strategic buffer stocking for rapid replenishment",
      "Automated packaging and barcoding for global logistics"
    ],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
    stats: [
      { label: "Annual Scale", value: "10M+ Units" },
      { label: "Cost Advantage", value: "12-18%" },
      { label: "Global Reach", value: "15+ Countries" }
    ]
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const content = productContent[slug] || productContent.basics;

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <Link href="/#products" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-12 hover:translate-x-[-4px] transition-transform">
          <ArrowLeft className="w-4 h-4" /> Return to Capabilities
        </Link>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.4em] animate-badge-pulse">
                {content.subtitle}
              </div>
              <h1 className="font-anton text-6xl md:text-8xl text-primary leading-none uppercase tracking-tighter">
                {content.title.split(' ')[0]} <br />
                <span className="text-muted-foreground/30">{content.title.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="font-headline text-xl text-muted-foreground font-light leading-relaxed max-w-xl">
                {content.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {content.stats.map((stat: any, i: number) => (
                <div key={i} className="p-6 neumorphic-flat rounded-3xl space-y-2">
                  <div className="text-2xl font-anton text-accent">{stat.value}</div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <ul className="space-y-4">
              {content.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-start gap-4 p-4 neumorphic-inset rounded-2xl group hover:bg-black/20 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
                  <span className="text-sm font-medium text-primary/80 leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="pt-8">
              <Button size="lg" className="h-16 px-10 rounded-2xl bg-accent hover:bg-accent/90 text-white font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-accent/20 transition-all hover:scale-[1.02]">
                Initiate Procurement Protocol
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden neumorphic-flat p-4">
            <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden">
              <Image 
                src={content.image} 
                alt={content.title} 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Manufacturing Origin</p>
                  <p className="text-2xl font-anton text-white uppercase">Faisalabad Hub</p>
                </div>
                <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center text-accent">
                  <Globe className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
