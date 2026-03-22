"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const links = [
  { name: "Capability", href: "#products" },
  { name: "Expertise", href: "#expertise" },
  { name: "Advantage", href: "#advantage" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 120;
      setIsScrolled(scrolled);

      // Calculate scroll progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled_val = (winScroll / height) * 100;
      setScrollProgress(scrolled_val);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sectionsToWatch = [...links.map(l => l.href.substring(1)), "contact", "skills", "protocol"];
    sectionsToWatch.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const getActiveLink = (section: string) => {
    if (section === "#products" || section === "#protocol") return "#products";
    if (section === "#expertise" || section === "#skills") return "#expertise";
    if (section === "#advantage") return "#advantage";
    if (section === "#contact") return "#contact";
    return "";
  };

  const currentLink = getActiveLink(activeSection);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none">
        <div 
          className="h-full bg-accent shadow-[0_0_15px_hsla(var(--accent),0.5)] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-6">
        <nav
          className={cn(
            "transition-all duration-700 delay-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center gap-8 px-5 py-2.5 rounded-full border shadow-2xl glass-header pointer-events-auto",
            isScrolled 
              ? "translate-y-0 opacity-100 scale-100" 
              : "-translate-y-24 opacity-0 scale-95"
          )}
        >
          {/* Brand Mark */}
          <a href="#" className="flex items-center gap-0 group mr-2">
            <span className="font-anton text-lg text-primary uppercase tracking-[-0.075em] flex items-center neon-outline animate-cinematic-blink">
              COTTON<span className="text-accent">ROOT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent translate-y-[0.2em] shadow-[0_0_8px_hsla(var(--accent),0.5)] ml-1" />
            </span>
          </a>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[9px] font-black uppercase tracking-[0.3em] px-3.5 py-1.5 rounded-full transition-all duration-500 ease-in-out",
                  currentLink === link.href 
                    ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-100" 
                    : "text-accent/60 hover:text-accent hover:bg-white/5"
                )}
              >
                {link.name}
              </a>
            ))}
            
            <div className="flex items-center gap-3 border-l border-white/10 ml-3 pl-6">
              <a
                href="#contact"
                className={cn(
                  "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 ease-in-out",
                  currentLink === "#contact"
                    ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-100"
                    : "bg-primary text-white hover:bg-accent neumorphic-pill"
                )}
              >
                Partner
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 text-foreground hover:text-accent transition-colors pointer-events-auto">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-2xl border-l border-white/10 flex flex-col p-12">
                <SheetHeader className="text-left mb-12">
                  <SheetTitle className="font-anton text-3xl text-primary uppercase">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-8">
                  {links.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <a
                        href={link.href}
                        className={cn(
                          "text-4xl font-anton uppercase transition-all duration-500",
                          currentLink === link.href ? "text-white" : "text-primary/40 hover:text-accent"
                        )}
                      >
                        {link.name}
                      </a>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <a
                      href="#contact"
                      className={cn(
                        "text-4xl font-anton uppercase transition-all duration-500",
                        currentLink === "#contact" ? "text-white" : "text-accent"
                      )}
                    >
                      Contact
                    </a>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </>
  );
}