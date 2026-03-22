"use client";

import React from "react";
import { cn } from "@/lib/utils";

const items = [
  "FAISALABAD HUB",
  "GLOBAL LOGISTICS",
  "TEXTILE MATURITY",
  "SUPPLY CHAIN ARCHITECTURE",
  "MULTI-MARKET EXPORT",
  "98% FULFILLMENT",
  "PRECISION SAMPLING",
  "SOPHISTICATED SOURCING",
];

export function InfiniteMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-background py-10 border-y border-white/5 select-none">
      {/* Subtle Background Glow */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex w-max animate-infinite-scroll">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-12">
                <span className="font-anton text-4xl md:text-6xl text-primary/20 uppercase tracking-tighter hover:text-accent transition-colors duration-500 cursor-default">
                  {item}
                </span>
                <div className="w-2 h-2 rounded-full bg-accent/40" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 100s linear infinite;
        }
      `}</style>
    </div>
  );
}
