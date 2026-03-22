
"use client";

import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Resume } from "@/components/Resume";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { SkillsVisualizer } from "@/components/SkillsVisualizer";
import { SkillGraph } from "@/components/SkillGraph";
import { Intro } from "@/components/Intro";
import { BentoShowcase } from "@/components/BentoShowcase";
import { InfiniteMarquee } from "@/components/InfiniteMarquee";
import { Protocol } from "@/components/Protocol";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();

  useEffect(() => {
    // Welcome Toast - appearing shortly after landing
    const welcomeTimer = setTimeout(() => {
      const { dismiss } = toast({
        title: "Welcome to Cotton Root! 🌿",
        description: "Your strategic partner for global apparel sourcing and supply chain excellence.",
      });

      setTimeout(() => {
        dismiss();
      }, 3000);
    }, 1000);

    // 10/10 Scroll Reveal Logic
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
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
