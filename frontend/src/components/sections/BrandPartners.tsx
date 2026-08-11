"use client";

import React from "react";

export const BrandPartners: React.FC = () => {
  const title = "OUR TRUSTED BRAND PARTNERS:";

  return (
    <section className="w-full bg-[#EBE7DF] py-8 px-6 md:px-12 lg:px-16 border-b border-[#CEBFA7]">
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
            className="h-6 md:h-8 object-contain"
          />
          <img
            src="/images/babyzen_logo 1.png"
            alt="BABYZEN"
            className="h-6 md:h-8 object-contain"
          />
          <img
            src="/images/Lovevery_Logo 1.png"
            alt="LOVEVERY"
            className="h-6 md:h-8 object-contain"
          />
          <img
            src="/images/stokke_logo 1.png"
            alt="STOKKE"
            className="h-6 md:h-8 object-contain"
          />
        </div>
      </div>
    </section>
  );
};
