"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, Phone, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ShinyText from "./ShinyText";

export function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry Submitted Successfully",
      description: "Our strategic procurement team will contact you within 24 hours.",
    });
  };

  const inputClasses = "h-16 rounded-2xl neumorphic-inset border-transparent focus:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/20 focus:shadow-[0_0_20px_hsla(var(--accent),0.3)] focus:bg-black transition-all px-6";
  const textareaClasses = "min-h-[180px] rounded-[2.5rem] neumorphic-inset border-transparent focus:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/20 focus:shadow-[0_0_20px_hsla(var(--accent),0.3)] focus:bg-black transition-all p-6 resize-none";

  return (
    <section id="contact" className="py-40 px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-24">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.4em] animate-badge-pulse">
                Partner
              </div>
              <h2 className="font-anton text-6xl md:text-8xl text-primary leading-none uppercase">
                STRATEGIC <br />
                <span className="text-muted-foreground/30">INQUIRY</span>
              </h2>
              <p className="font-headline text-xl text-muted-foreground font-light leading-relaxed max-w-md">
                Initiate your partnership with Faisalabad's most transparent apparel hub.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: <Building2 />, label: "Headquarters", value: "Faisalabad, Pakistan" },
                { icon: <Mail />, label: "Enterprise Email", value: "Raza.hcifsd@gmail.com" },
                { icon: <Phone />, label: "Direct Line", value: "+92-321667339" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 neumorphic-flat rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-primary">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="neumorphic-flat p-12 md:p-16 rounded-[4rem] border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] -z-10" />
            
            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Brand Identity</label>
                  <Input placeholder="Company Name" required className={inputClasses} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Contact Email</label>
                  <Input type="email" placeholder="corporate@email.com" required className={inputClasses} />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Market Expertise Needed</label>
                <Input placeholder="e.g. USA - Knitwear" required className={inputClasses} />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Brief Requirements</label>
                <Textarea placeholder="Describe your production volume and specific needs..." required className={textareaClasses} />
              </div>

              <Button type="submit" size="lg" className="w-full h-20 rounded-2xl text-xs font-black uppercase tracking-[0.4em] bg-accent hover:bg-accent/90 text-white shadow-2xl shadow-accent/40 transition-all hover:scale-[1.02] active:scale-95 group neumorphic-pill">
                <ShinyText text="SUBMIT PARTNERSHIP INQUIRY" speed={3} />
                <Send className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
