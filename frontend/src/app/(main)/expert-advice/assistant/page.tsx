"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdviceAssistantPage() {
  const [stage, setStage] = useState<string>("pregnancy");
  const [budget, setBudget] = useState<string>("medium");
  const [lifestyle, setLifestyle] = useState<string>("city");
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setRecommendation(
      `Based on your input (${stage}, ${lifestyle} lifestyle, ${budget} budget), Anita recommends starting with a lightweight, compact stroller like the Bugaboo Dragonfly or Stokke YOYO3 paired with an ISOFIX newborn car seat base.`
    );
  };

  return (
    <div className="w-full bg-[#EBE7DF] py-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col gap-2 border-b border-[#CEBFA7]/40 pb-6">
          <Link href="/expert-advice" className="font-sans text-xs font-bold text-[#2D1A14] hover:text-[#C77065] transition-colors flex items-center gap-2">
            <span>←</span>
            <span>Back to Expert advice</span>
          </Link>
          <h1 className="font-accent text-4xl md:text-[48px] text-[#2D1A14] font-normal leading-tight">
            Interactive <span className="font-accent italic">Advice Assistant</span>
          </h1>
          <p className="font-sans text-sm text-[#2D1A14]/80 max-w-2xl leading-relaxed">
            Answer a few quick questions about your lifestyle and baby prep journey to receive personalized product and registry recommendations directly from Anita.
          </p>
        </div>

        {/* Interactive Assistant Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <form onSubmit={handleGenerate} className="bg-[#EBE7DF] border border-[#CEBFA7] p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
                1. What stage are you in?
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs font-sans text-[#2D1A14] focus:outline-none"
              >
                <option value="pregnancy">Expecting / Pregnant</option>
                <option value="newborn">Newborn (0-3 months)</option>
                <option value="infant">Infant (3-12 months)</option>
                <option value="toddler">Toddler (1+ years)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
                2. Your Primary Lifestyle
              </label>
              <select
                value={lifestyle}
                onChange={(e) => setLifestyle(e.target.value)}
                className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs font-sans text-[#2D1A14] focus:outline-none"
              >
                <option value="city">City / Public Transport & Compact Spaces</option>
                <option value="suburban">Suburban & Frequent Car Travel</option>
                <option value="all-terrain">All-Terrain / Countryside Walks</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
                3. Preferred Budget Range
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs font-sans text-[#2D1A14] focus:outline-none"
              >
                <option value="essential">Essential / Budget Friendly</option>
                <option value="medium">Mid-Range / Best Value</option>
                <option value="premium">Premium / Luxury Gear</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium rounded-none btn-slide-hover border-none cursor-pointer mt-2"
            >
              Get Anita's Tailored Advice
            </button>
          </form>

          {/* Results Box */}
          <div className="bg-[#EBE7DF] border border-[#CEBFA7] p-8 flex flex-col gap-4">
            <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
              RECOMMENDED ESSENTIALS
            </span>
            {recommendation ? (
              <div className="flex flex-col gap-4">
                <p className="font-sans text-sm text-[#2D1A14] leading-relaxed italic bg-white/60 p-4 border-l-4 border-[#8B9A6B]">
                  "{recommendation}"
                </p>
                <Link
                  href="/products/transport/pushchairs"
                  className="inline-block px-6 py-2.5 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none btn-slide-hover text-decoration-none self-start"
                >
                  Explore Recommended Pushchairs
                </Link>
              </div>
            ) : (
              <p className="font-sans text-xs text-[#2D1A14]/70 leading-relaxed italic">
                Fill in your preferences on the left and click "Get Anita's Tailored Advice" to view instant recommendations.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
