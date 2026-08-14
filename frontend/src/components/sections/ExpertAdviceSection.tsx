"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api, { getApiBaseUrl } from "@/lib/api";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const defaultContent = {
  subtitle: "EXPERT ADVICE",
  title: "Personalised advice based on years of experience",
  description: "Anita's list was created to strip away the noise and bring clarity to baby shopping.",
  imageUrl: "/images/anita.png",
};

export const ExpertAdviceSection: React.FC = () => {
  const [content, setContent] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("cached_homepage_settings");
        if (cached) {
          const data = JSON.parse(cached);
          const baseUrl = getApiBaseUrl();
          let img = defaultContent.imageUrl;
          if (data.expert_advice_image) {
            if (data.expert_advice_image.startsWith('http://') || data.expert_advice_image.startsWith('https://')) {
              img = data.expert_advice_image.replace('http://', 'https://');
            } else {
              const cleanPath = data.expert_advice_image.startsWith('/') ? data.expert_advice_image : `/${data.expert_advice_image}`;
              img = cleanPath.startsWith('/storage/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/storage${cleanPath}`;
            }
          }
          return {
            subtitle: "EXPERT ADVICE",
            title: data.expert_advice_title || defaultContent.title,
            description: data.expert_advice_description || defaultContent.description,
            imageUrl: img,
          };
        }
      } catch (e) {
        console.error("Error reading cached expert advice settings", e);
      }
    }
    return defaultContent;
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get(`/homepage?t=${Date.now()}`);
        const data = res.data;
        if (data) {
          const baseUrl = getApiBaseUrl();
          
          let img = defaultContent.imageUrl;
          if (data.expert_advice_image) {
            if (data.expert_advice_image.startsWith('http://') || data.expert_advice_image.startsWith('https://')) {
              img = data.expert_advice_image.replace('http://', 'https://');
            } else {
              const cleanPath = data.expert_advice_image.startsWith('/') ? data.expert_advice_image : `/${data.expert_advice_image}`;
              img = cleanPath.startsWith('/storage/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/storage${cleanPath}`;
            }
          }

          setContent({
            subtitle: "EXPERT ADVICE",
            title: data.expert_advice_title || defaultContent.title,
            description: data.expert_advice_description || defaultContent.description,
            imageUrl: img,
          });
        }
      } catch (e) {
        console.error("Failed to load expert advice settings", e);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section className="w-full bg-[#EBE7DF] py-0 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left Side: Photo of Anita / Expert */}
        <RevealOnScroll animation="fade-left" className="h-full">
          <div className="w-full min-h-[380px] lg:min-h-[560px] h-full relative bg-[#E6E4D8] overflow-hidden group">
            <img
              src={content.imageUrl}
              alt="Expert Advice"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/anita.png';
              }}
            />
          </div>
        </RevealOnScroll>

        {/* Right Side: Text & CTA Button */}
        <RevealOnScroll animation="fade-right" delay={200} className="h-full">
          <div className="w-full bg-[#EBE7DF] p-8 md:p-12 lg:p-16 flex flex-col justify-center h-full">
            <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase block mb-3">
              {content.subtitle}
            </span>
            <h2 className="font-accent text-2xl md:text-[32px] text-[#2D1A14] leading-[1.3] font-normal mb-6">
              {content.title}
            </h2>
            <p className="font-sans text-sm md:text-base text-[#2D1A14]/80 leading-relaxed mb-8 max-w-xl">
              {content.description}
            </p>
            <div>
              <Link
                href="/expert-advice"
                className="inline-block px-6 py-3 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium btn-slide-hover rounded-none shadow-sm text-decoration-none"
              >
                Get expert advice
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
