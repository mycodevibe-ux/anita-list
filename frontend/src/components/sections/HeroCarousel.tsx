"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";

export interface HeroSlide {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
}

const defaultSlidesData: HeroSlide[] = [
  {
    id: 1,
    imageUrl: "/images/banner1.jpg",
    title: "Helping you choose the right baby essentials, based on *decades of trusted expertise.*",
    subtitle: "Discover baby essentials, seek advice and curate a list that feels right for you and your future little one.",
  },
  {
    id: 2,
    imageUrl: "/images/banner2.jpg",
    title: "Curate lists together with friends, family and *your loved ones.*",
    subtitle: "Share your registry links easily and coordinate gifts seamlessly.",
  },
  {
    id: 3,
    imageUrl: "/images/banner3.jpg",
    title: "Find expert suggestions for every stage of *your parenting journey.*",
    subtitle: "From newborn clothes to monitors and travel gear, we have you covered.",
  },
];

export const HeroCarousel: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slides, setSlides] = useState<HeroSlide[]>([defaultSlidesData[0]]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/homepage');
        const data = res.data;
        if (data) {
          if (typeof window !== "undefined") {
            localStorage.setItem("cached_homepage_settings", JSON.stringify(data));
          }
          const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://anita-list-backend-production.up.railway.app/api';
          const storageUrl = apiBase.replace(/\/api\/?$/, '') + '/storage/';
          
          if (Array.isArray(data.hero_slides) && data.hero_slides.length > 0) {
            const dynamicSlides = data.hero_slides.map((s: any, idx: number) => ({
              id: idx + 1,
              imageUrl: s.image ? `${storageUrl}${s.image}` : defaultSlidesData[0].imageUrl,
              title: s.title || defaultSlidesData[0].title,
              subtitle: s.subtitle || defaultSlidesData[0].subtitle,
            }));
            setSlides(dynamicSlides);
          } else if (data.hero_title) {
            setSlides([
              {
                id: 1,
                imageUrl: data.hero_image_1 ? `${storageUrl}${data.hero_image_1}` : defaultSlidesData[0].imageUrl,
                title: data.hero_title || defaultSlidesData[0].title,
                subtitle: data.hero_subtitle || defaultSlidesData[0].subtitle,
              },
            ]);
          }
        }
      } catch (e) {
        console.error("Failed to load hero settings from backend", e);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) {
      setActiveSlide(0);
      return;
    }
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const parseHeading = (text: string) => {
    return text.split(/(\*[^*]+\*)/g).map((part, idx) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <span key={idx} className="font-accent italic">
            {part.slice(1, -1)}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const current = slides[activeSlide] || slides[0];

  return (
    <section className="relative w-full overflow-hidden min-h-[640px] lg:h-[720px] bg-[#E6E4D8]">
      {/* Fullwidth background images stacked for smooth cross-fade effect */}
      <div className="absolute inset-0 w-full h-full z-0">
        {slides.map((slide, idx) => (
          <img
            key={slide.id || idx}
            src={slide.imageUrl}
            alt="Hero background"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        ))}
      </div>

      {/* Foreground Container: max-w-[1440px] mx-auto with 20px padding (px-5) and bottom space 0 (pb-0) */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8 h-full min-h-[640px] lg:h-[720px] flex flex-col justify-between pt-10 lg:pt-14 pb-0 pointer-events-none">
        {/* Top Left Text Content Area */}
        <div className="max-w-[580px] bg-cream/90 backdrop-blur-md p-8 rounded-lg lg:bg-transparent lg:p-0 lg:backdrop-filter-none pointer-events-auto transition-all duration-700">
          <h1 className="font-accent text-3xl md:text-5xl lg:text-[48px] leading-[1.25] text-brown-dark mb-6 font-normal">
            {parseHeading(current.title)}
          </h1>
          <p className="font-sans text-sm md:text-base text-brown-dark max-w-[450px] leading-relaxed mb-6 opacity-90">
            {current.subtitle}
          </p>
        </div>

        {/* Bottom Row: 2 Action Boxes constrained inside 1440px width + Slide Indicators on Right */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-end gap-6 pointer-events-auto">
          {/* The 2 Action Boxes ("Create your list" & "Get expert advice") sitting flush at bottom */}
          <div className="w-full lg:w-[680px] grid grid-cols-1 sm:grid-cols-2 bg-[#E6E4D8]/95 backdrop-blur-sm border-t border-x border-[#CEBFA7] shadow-lg">
            <Link href="/signup" className="relative flex flex-col justify-between p-6 md:p-8 border-b sm:border-b-0 sm:border-r border-[#CEBFA7] text-[#2D1A14] hover:bg-[#dedccf] transition-colors group min-h-[140px]">
              <span className="font-accent text-lg lg:text-[22px] text-[#2D1A14] font-medium">Create your list</span>
              <div className="absolute right-0 bottom-0 bg-[#C77065] text-[#F8F8F2] w-[33px] h-[33px] flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>
            </Link>
            <Link href="/expert-advice" className="relative flex flex-col justify-between p-6 md:p-8 text-[#2D1A14] hover:bg-[#dedccf] transition-colors group min-h-[140px]">
              <span className="font-accent text-lg lg:text-[22px] text-[#2D1A14] font-medium">Get expert advice</span>
              <div className="absolute right-0 bottom-0 bg-[#C77065] text-[#F8F8F2] w-[33px] h-[33px] flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>
            </Link>
          </div>

          {/* Clean Slide Pagination Indicator Dots (Only if multiple slides exist) */}
          {slides.length > 1 && (
            <div className="flex items-center gap-3 self-end mb-6 z-20">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-300 ${
                    idx === activeSlide ? 'bg-[#C77065] scale-125 shadow-md' : 'bg-[#2D1A14]/40 hover:bg-[#2D1A14]/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
