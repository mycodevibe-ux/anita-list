"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const BrandPartners: React.FC = () => {
  const [title, setTitle] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("cached_homepage_settings");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.brand_partners_title) return parsed.brand_partners_title;
        }
      } catch (e) {
        // ignore
      }
    }
    return "OUR TRUSTED BRAND PARTNERS:";
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get(`/homepage?t=${Date.now()}`);
        if (res.data?.brand_partners_title) {
          setTitle(res.data.brand_partners_title);
        }
      } catch (e) {
        console.error("Failed to load brand partners title", e);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section className="w-full bg-[#EBE7DF] py-8 px-6 md:px-12 lg:px-16 border-b border-[#CEBFA7]">
      <RevealOnScroll animation="zoom-in">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
          {/* Left Title Label */}
          <div className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase whitespace-nowrap">
            {title}
          </div>

          {/* Brand Logos Row using local public images */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-8 md:gap-12 lg:gap-16 select-none">
            <img
              src="/images/Babybjorn.png"
              alt="BABYBJÖRN"
              className="h-6 md:h-8 object-contain opacity-75 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
            />
            <img
              src="/images/babyzen_logo 1.png"
              alt="BABYZEN"
              className="h-6 md:h-8 object-contain opacity-75 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
            />
            <img
              src="/images/Lovevery_Logo 1.png"
              alt="LOVEVERY"
              className="h-6 md:h-8 object-contain opacity-75 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
            />
            <img
              src="/images/stokke_logo 1.png"
              alt="STOKKE"
              className="h-6 md:h-8 object-contain opacity-75 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
            />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
