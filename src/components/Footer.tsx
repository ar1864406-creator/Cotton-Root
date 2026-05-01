
import React from "react";
import { ShieldCheck, ArrowUp } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 px-6 border-t border-foreground/5 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-anton text-2xl text-primary uppercase">COTTON ROOT</span>
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-badge-pulse shadow-[0_0_8px_hsla(var(--accent),0.4)]" />
            </div>
            <p className="text-sm text-muted-foreground font-light max-w-sm">
              Strategic apparel sourcing and supply chain management for the global market. Faisalabad's premier B2B export hub.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Strategic</p>
              <ul className="space-y-4">
                <li><a href="#products" className="text-sm font-bold text-primary hover:text-accent transition-colors">Portfolios</a></li>
                <li><a href="#expertise" className="text-sm font-bold text-primary hover:text-accent transition-colors">Expertise</a></li>
                <li><a href="#advantage" className="text-sm font-bold text-primary hover:text-accent transition-colors">Advantage</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Logistics</p>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm font-bold text-primary hover:text-accent transition-colors">Export Map</a></li>
                <li><a href="#" className="text-sm font-bold text-primary hover:text-accent transition-colors">Compliance</a></li>
                <li><a href="#" className="text-sm font-bold text-primary hover:text-accent transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-16 h-16 rounded-full glass-card flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all group"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="mt-20 pt-8 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
            &copy; {currentYear} Cotton Root Sourcing. Faisalabad HQ.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent">
            <ShieldCheck className="w-3 h-3" />
            Enterprise Grade Compliance
          </div>
        </div>
      </div>
    </footer>
  );
}
