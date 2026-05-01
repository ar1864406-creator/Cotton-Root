"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

// Heavy sections below the fold are dynamically imported
// Charts are set to ssr: false to prevent hydration mismatches with dynamic IDs and browser measurements
const Projects = dynamic(() => import("@/components/Projects").then(mod => mod.Projects), { ssr: true });
const Protocol = dynamic(() => import("@/components/Protocol").then(mod => mod.Protocol), { ssr: true });
const BentoShowcase = dynamic(() => import("@/components/BentoShowcase").then(mod => mod.BentoShowcase), { ssr: true });
const SkillGraph = dynamic(() => import("@/components/SkillGraph").then(mod => mod.SkillGraph), { ssr: false });
const SkillsVisualizer = dynamic(() => import("@/components/SkillsVisualizer").then(mod => mod.SkillsVisualizer), { ssr: false });
const Resume = dynamic(() => import("@/components/Resume").then(mod => mod.Resume), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact").then(mod => mod.Contact), { ssr: true });
const InfiniteMarquee = dynamic(() => import("@/components/InfiniteMarquee").then(mod => mod.InfiniteMarquee), { ssr: true });

export default function Home() {
  const { toast } = useToast();

  useEffect(() => {
    // Welcome Toast timing - aligned with initialization completion
    const welcomeTimer = setTimeout(() => {
      const { dismiss } = toast({
        title: "Welcome to Cotton Root! 🌿",
        description: "Your strategic partner for global apparel sourcing and supply chain excellence.",
      });

      setTimeout(() => {
        dismiss();
      }, 5000);
    }, 4500);

    // Optimized Intersection Observer for revealing sections
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once revealed, no need to keep observing
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.reveal-section');
    elements.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(welcomeTimer);
      observer.disconnect();
    };
  }, [toast]);

  return (
    <main className="min-h-screen bg-background">
      <Intro />
      <Navigation />
      
      {/* Hero is high priority */}
      <Hero />
      
      <div className="py-20">
        <InfiniteMarquee />
      </div>

      <div className="reveal-section">
        <Projects />
      </div>

      <div className="reveal-section">
        <Protocol />
      </div>

      <div className="reveal-section">
        <BentoShowcase />
      </div>

      <div className="reveal-section">
        <SkillGraph />
      </div>

      <div className="reveal-section">
        <SkillsVisualizer />
      </div>

      <div className="reveal-section">
        <Resume />
      </div>

      <div className="reveal-section">
        <Contact />
      </div>

      <Footer />
      <Toaster />
    </main>
  );
}
