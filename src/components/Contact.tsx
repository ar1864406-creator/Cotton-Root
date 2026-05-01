"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, Phone, Building2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ShinyText from "./ShinyText";
import { cn } from "@/lib/utils";

export function Contact() {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const company = formData.get("company") as string;
    const email = formData.get("email") as string;
    const market = formData.get("market") as string;
    const requirements = formData.get("requirements") as string;

    const newErrors: Record<string, boolean> = {
      company: !company,
      email: !email,
      market: !market,
      requirements: !requirements,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      const { dismiss } = toast({
        variant: "destructive",
        title: "Incomplete Protocol",
        description: "Please ensure all fields are populated before initiating transmission.",
      });
      setTimeout(() => dismiss(), 5000);
      return;
    }

    const messageText = `Hello Cotton Root,\n\nI would like to inquire about a partnership.\n\n` +
      `*Company:* ${company}\n` +
      `*Email:* ${email}\n` +
      `*Market:* ${market}\n` +
      `*Requirements:* ${requirements}`;

    const encodedMessage = encodeURIComponent(messageText);

    // 1. Redirect to WhatsApp (New Tab)
    window.open(`https://wa.me/92321667339?text=${encodedMessage}`, '_blank');

    // 2. Trigger Email Client (Same window mailto)
    const emailSubject = encodeURIComponent(`Partnership Inquiry: ${company}`);
    const emailBody = encodeURIComponent(messageText.replace(/\*/g, '')); // Remove markdown asterisks for email
    window.location.href = `mailto:Raza.hcifsd@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    const { dismiss: successDismiss } = toast({
      title: "Inquiry Initiated",
      description: "Redirecting to WhatsApp and preparing your email draft.",
    });
    setTimeout(() => successDismiss(), 5000);
  };

  const getInputClasses = (name: string) => cn(
    "h-16 rounded-2xl neumorphic-inset border-transparent focus:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/20 focus:shadow-[0_0_20px_hsla(var(--accent),0.3)] focus:bg-black transition-all px-6",
    errors[name] && "border-destructive/50 shadow-[0_0_15px_rgba(239,68,68,0.2)] bg-destructive/5"
  );

  const getTextareaClasses = (name: string) => cn(
    "min-h-[180px] rounded-[2.5rem] neumorphic-inset border-transparent focus:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/20 focus:shadow-[0_0_20px_hsla(var(--accent),0.3)] focus:bg-black transition-all p-6 resize-none",
    errors[name] && "border-destructive/50 shadow-[0_0_15px_rgba(239,68,68,0.2)] bg-destructive/5"
  );

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
            
            <form onSubmit={handleSubmit} noValidate className="space-y-10 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2 flex items-center gap-2">
                    Brand Identity {errors.company && <AlertCircle className="w-3 h-3 text-destructive" />}
                  </label>
                  <Input 
                    name="company" 
                    placeholder="Company Name" 
                    className={getInputClasses("company")} 
                    onChange={() => setErrors(prev => ({ ...prev, company: false }))}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2 flex items-center gap-2">
                    Contact Email {errors.email && <AlertCircle className="w-3 h-3 text-destructive" />}
                  </label>
                  <Input 
                    name="email" 
                    type="email" 
                    placeholder="corporate@email.com" 
                    className={getInputClasses("email")} 
                    onChange={() => setErrors(prev => ({ ...prev, email: false }))}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2 flex items-center gap-2">
                  Market Expertise Needed {errors.market && <AlertCircle className="w-3 h-3 text-destructive" />}
                </label>
                <Input 
                  name="market" 
                  placeholder="e.g. USA - Knitwear" 
                  className={getInputClasses("market")} 
                  onChange={() => setErrors(prev => ({ ...prev, market: false }))}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2 flex items-center gap-2">
                  Brief Requirements {errors.requirements && <AlertCircle className="w-3 h-3 text-destructive" />}
                </label>
                <Textarea 
                  name="requirements" 
                  placeholder="Describe your production volume and specific needs..." 
                  className={getTextareaClasses("requirements")} 
                  onChange={() => setErrors(prev => ({ ...prev, requirements: false }))}
                />
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
