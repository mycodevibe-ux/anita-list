"use client";

import React from "react";
import Link from "next/link";

const articles = [
  {
    id: 1,
    title: "How to choose your newborn pushchair: 5 things every parent must know",
    category: "Transport & Travel",
    readTime: "5 min read",
    image: "/images/banner4.jpg",
    snippet: "From bassinet safety and fold mechanisms to suspension and boot size, maternity nurse Anita breaks down pushchair selection.",
  },
  {
    id: 2,
    title: "The essential hospital bag checklist for mum and baby",
    category: "Nursery & Prep",
    readTime: "4 min read",
    image: "/images/baby-clothing.png",
    snippet: "What to pack (and what to leave at home) when preparing for labor and hospital stay.",
  },
  {
    id: 3,
    title: "Safe sleep environment: Cot, bassinet, or Moses basket?",
    category: "Bedding & Sleep",
    readTime: "6 min read",
    image: "/images/bedding.png",
    snippet: "Anita shares guidelines on room temperature, mattress firmness, and swaddling for restful, safe sleep.",
  },
];

export default function ExpertAdvicePage() {
  return (
    <div className="w-full bg-[#EBE7DF] py-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-[#CEBFA7]/40 pb-6">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
              EXPERT ADVICE
            </span>
            <h1 className="font-accent text-4xl md:text-[52px] text-[#2D1A14] font-normal leading-tight">
              Trusted guidance for <span className="font-accent italic">every step of parenthood</span>
            </h1>
          </div>

          <Link
            href="/expert-advice/assistant"
            className="px-6 py-3 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium rounded-none hover:bg-[#b05d52] transition-colors text-decoration-none flex-shrink-0"
          >
            Launch Advice Assistant 🤖
          </Link>
        </div>

        {/* Hero Advice Block */}
        <div className="bg-[#EBE7DF] border border-[#CEBFA7] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-4">
            <span className="font-sans text-xs font-bold tracking-widest text-[#8B9A6B] uppercase">
              FEATURED GUIDE
            </span>
            <h2 className="font-accent text-3xl md:text-4xl text-[#2D1A14] font-normal leading-snug">
              1-on-1 Private Nursery & Registry Consultations with Anita
            </h2>
            <p className="font-sans text-sm text-[#2D1A14]/80 leading-relaxed">
              Book a bespoke virtual or in-person consultation with maternity nurse Anita to build your personalized baby registry, review nursery safety, and prepare your home for your baby's arrival.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors text-decoration-none"
              >
                Book Private Consultation
              </Link>
            </div>
          </div>

          <div className="w-full h-64 md:h-80 bg-[#D4C8B5] overflow-hidden relative">
            <img
              src="/images/anita.png"
              alt="Anita Expert Advice"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Articles Cards Grid */}
        <div className="flex flex-col gap-6">
          <h2 className="font-accent text-2xl md:text-3xl text-[#2D1A14] font-normal">
            Articles & Advice Guides
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((art) => (
              <div key={art.id} className="bg-[#EBE7DF] border border-[#CEBFA7] p-5 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <div className="w-full h-48 bg-[#D4C8B5] overflow-hidden">
                    <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-sans text-[11px] font-bold text-[#8B9A6B] uppercase">
                    {art.category} • {art.readTime}
                  </span>
                  <h3 className="font-accent text-lg text-[#2D1A14] font-normal leading-snug">
                    {art.title}
                  </h3>
                  <p className="font-sans text-xs text-[#2D1A14]/75 leading-relaxed">
                    {art.snippet}
                  </p>
                </div>

                <Link href="#" onClick={(e) => e.preventDefault()} className="font-sans text-xs font-bold text-[#C77065] hover:underline">
                  Read full guide →
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
