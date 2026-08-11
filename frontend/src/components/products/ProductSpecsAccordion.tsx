"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface SpecItem {
  title: string;
  content: string;
}

export interface ProductSpecsAccordionProps {
  className?: string;
  specs: SpecItem[];
}

export const ProductSpecsAccordion: React.FC<ProductSpecsAccordionProps> = ({
  className,
  specs = [],
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleSpec = (idx: number) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className={cn("w-full flex flex-col border border-gray-light/30 bg-white rounded-md overflow-hidden shadow-sm", className)}>
      <div className="px-5 py-3 border-b border-gray-light/20 bg-cream/10">
        <span className="font-sans text-[11px] font-bold tracking-wider text-brown-dark/70 uppercase">
          PRODUCT SPECIFICS
        </span>
      </div>

      {specs.length === 0 ? (
        <div className="px-5 py-4 text-xs font-sans text-gray-medium">
          No specification details available.
        </div>
      ) : (
        specs.map((spec, idx) => {
          const isOpen = activeIndex === idx;

          return (
            <div key={idx} className="border-b border-gray-light/20 last:border-0">
              {/* Accordion header button */}
              <button
                onClick={() => toggleSpec(idx)}
                className="w-full px-5 py-3.5 flex items-center justify-between font-sans text-xs md:text-sm font-semibold text-brown-dark hover:bg-cream/20 text-left transition-colors outline-none"
              >
                <span>{spec.title}</span>
                {/* Plus (+) / Minus (-) symbol rotation */}
                <div className="relative w-4.5 h-4.5 flex items-center justify-center text-gray-medium">
                  <div className="absolute w-3 h-0.5 bg-current rounded-sm" />
                  <div
                    className={cn(
                      "absolute w-0.5 h-3 bg-current rounded-sm transition-transform duration-200",
                      isOpen && "rotate-90 scale-y-0"
                    )}
                  />
                </div>
              </button>

              {/* Accordion content */}
              {isOpen && (
                <div className="bg-cream/10 px-5 pb-4 pt-1 font-sans text-xs md:text-sm text-text-dark/80 leading-relaxed border-t border-gray-light/10 animate-in fade-in duration-150">
                  {spec.content}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};
