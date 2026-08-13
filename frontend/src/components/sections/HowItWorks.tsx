"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";

const defaultContent = {
  subtitle: "HOW IT WORKS",
  title: "How it works: A clear, expert-led approach to baby shopping",
};

const defaultSteps = [
  {
    number: 1,
    title: "*Get started* by creating your own Anita’s list account.",
  },
  {
    number: 2,
    title: "*Create* either your own list or start off by using our journey list.",
  },
  {
    number: 3,
    title: "*Browse products* and expert advice and build out your curated list.",
  },
  {
    number: 4,
    title: "*Turn your list* into a registry and share with friends and family.",
  },
];

export const HowItWorks: React.FC = () => {
  const [content, setContent] = useState(defaultContent);
  const [steps, setSteps] = useState(defaultSteps);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get(`/homepage?t=${Date.now()}`);
        const data = res.data;
        if (data) {
          setContent({
            subtitle: data.how_it_works_subtitle || defaultContent.subtitle,
            title: data.how_it_works_title || defaultContent.title,
          });

          setSteps([
            {
              number: 1,
              title: data.step1_title ? (data.step1_description ? `${data.step1_title} - ${data.step1_description}` : data.step1_title) : defaultSteps[0].title,
            },
            {
              number: 2,
              title: data.step2_title ? (data.step2_description ? `${data.step2_title} - ${data.step2_description}` : data.step2_title) : defaultSteps[1].title,
            },
            {
              number: 3,
              title: data.step3_title ? (data.step3_description ? `${data.step3_title} - ${data.step3_description}` : data.step3_title) : defaultSteps[2].title,
            },
            {
              number: 4,
              title: data.step4_title || defaultSteps[3].title,
            },
          ]);
        }
      } catch (e) {
        console.error("Failed to load how it works settings", e);
      }
    };
    fetchSettings();
  }, []);

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

  return (
    <section className="w-full bg-[#EBE7DF] py-16 px-6 md:px-12 lg:px-16 border-b border-[#CEBFA7]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
        {/* Top Header & Title */}
        <div>
          <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase block mb-3">
            {content.subtitle}
          </span>
          <h2 className="font-accent text-2xl md:text-[34px] text-[#2D1A14] max-w-4xl leading-snug font-normal">
            {parseHeading(content.title)}
          </h2>
        </div>

        {/* 4 Steps Row with Continuous Dashed Line */}
        <div className="relative my-4">
          {/* Horizontal Dashed Line behind numbers */}
          <div className="hidden md:block absolute top-4 left-[2%] right-[10%] border-t border-dashed border-[#2D1A14]/30 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col gap-4">
                {/* Step Badge Box (Square dark box with number) */}
                <div className="w-8 h-8 bg-[#2D1A14] text-white text-xs font-bold flex items-center justify-center rounded-none z-10">
                  {step.number}
                </div>

                {/* Step Title */}
                <h3 className="font-accent text-lg md:text-[21px] font-medium text-[#2D1A14] leading-relaxed max-w-[290px]">
                  {parseHeading(step.title)}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href="/signup"
            className="inline-block px-6 py-3 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium hover:bg-[#b05d52] transition-colors rounded-none shadow-sm"
          >
            Create list
          </Link>
        </div>
      </div>
    </section>
  );
};
