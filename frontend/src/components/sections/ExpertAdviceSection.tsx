"use client";

import React from "react";
import Link from "next/link";

export const ExpertAdviceSection: React.FC = () => {
  const content = {
    subtitle: "EXPERT ADVICE",
    title: "Lorem ipsum dolor sit amet consectetur. A mi elementum in feugiat non elementum volutpat fames. Purus sit dolor lobortis semper platea nunc quis nulla.",
    description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id. Tellus auctor risus pharetra sem. Neque lectus rhoncus lacinia non diam velit malesuada vel.",
    imageUrl: "/images/anita.png",
  };

  return (
    <section className="w-full bg-[#EBE7DF] py-0 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left Side: Photo of Anita / Expert */}
        <div className="w-full min-h-[380px] lg:min-h-[560px] relative bg-[#E6E4D8]">
          <img
            src={content.imageUrl}
            alt="Expert Advice"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/anita.png';
            }}
          />
        </div>

        {/* Right Side: Text & CTA Button */}
        <div className="w-full bg-[#EBE7DF] p-8 md:p-12 lg:p-16 flex flex-col justify-center">
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
              className="inline-block px-6 py-3 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium hover:bg-[#b05d52] transition-colors rounded-none shadow-sm"
            >
              Get expert advice
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
