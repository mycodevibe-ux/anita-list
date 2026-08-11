"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function WorkWithUsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#EBE7DF] py-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-[#CEBFA7]/40 pb-6">
          <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
            BRAND PARTNERSHIPS
          </span>
          <h1 className="font-accent text-4xl md:text-[52px] text-[#2D1A14] font-normal leading-tight">
            Work with <span className="font-accent italic">Anita's List</span>
          </h1>
          <p className="font-sans text-sm text-[#2D1A14]/80 max-w-2xl leading-relaxed mt-1">
            We collaborate with safety-focused, high-quality baby brands that align with our mission of bringing clarity, calm, and trusted advice to new and expectant parents worldwide.
          </p>
        </div>

        {/* 2-Column Form & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6 font-sans text-sm text-[#2D1A14]/90 leading-relaxed">
            <h2 className="font-accent text-2xl text-[#2D1A14] font-normal">Why Partner With Us?</h2>
            <ul className="flex flex-col gap-3 list-disc pl-5">
              <li>Reach thousands of active expectant parents curating their baby registries daily.</li>
              <li>Handpicked product inclusion in our curated category listings and expert advice guides.</li>
              <li>Unbiased, nurse-approved credibility and high conversion through direct retailer outbound links.</li>
            </ul>

            <div className="bg-[#EBE7DF] border border-[#CEBFA7] p-6 mt-4 flex flex-col gap-2">
              <h3 className="font-accent text-lg text-[#2D1A14]">Press & Brand Inquiries</h3>
              <p className="font-sans text-xs text-[#2D1A14]/75">
                For brand collaborations, affiliate program onboarding, or media inquiries, reach out directly to our partnerships team.
              </p>
              <span className="font-sans text-xs font-bold text-[#C77065] mt-1">
                partnerships@anitaslist.com
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#EBE7DF] border border-[#CEBFA7] p-8 flex flex-col gap-5">
            <h3 className="font-accent text-2xl text-[#2D1A14] font-normal">Partnership Inquiry Form</h3>

            {submitted ? (
              <div className="p-4 bg-[#8B9A6B] text-white font-sans text-xs font-bold">
                ✓ Thank you for reaching out! Our partnerships team will review your inquiry and respond within 24-48 hours.
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-xs font-bold uppercase text-[#2D1A14]">Brand / Company Name</label>
                  <input type="text" required className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs focus:outline-none" placeholder="e.g. Bugaboo" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-sans text-xs font-bold uppercase text-[#2D1A14]">Contact Email</label>
                  <input type="email" required className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs focus:outline-none" placeholder="brand@example.com" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-sans text-xs font-bold uppercase text-[#2D1A14]">Message / Proposal</label>
                  <textarea rows={4} required className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs focus:outline-none" placeholder="Tell us about your brand and product catalog..." />
                </div>

                <button type="submit" className="px-6 py-3 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer">
                  Submit Inquiry
                </button>
              </>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}
