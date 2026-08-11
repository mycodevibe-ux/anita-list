"use client";

import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="w-full bg-[#EBE7DF] py-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto flex flex-col gap-12 items-center text-center">
        
        {/* Top Header */}
        <div className="flex flex-col items-center gap-3 border-b border-[#CEBFA7]/40 pb-8 w-full">
          <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
            ABOUT ANITA'S LIST
          </span>
          <h1 className="font-accent text-4xl md:text-[52px] text-[#2D1A14] font-normal leading-tight max-w-3xl">
            Curated baby essentials based on <span className="font-accent italic">trusted expertise</span>
          </h1>
        </div>

        {/* Story Section */}
        <div className="flex flex-col items-center gap-8 w-full">
          <div className="w-full max-w-2xl h-[420px] bg-[#D4C8B5] overflow-hidden relative border border-[#CEBFA7]">
            <img
              src="/images/anita.png"
              alt="Anita Maternity Nurse & Baby Expert"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/baby-clothing.png';
              }}
            />
          </div>

          <div className="flex flex-col gap-6 font-sans text-sm md:text-base text-[#2D1A14]/90 leading-relaxed text-left max-w-3xl">
            <h2 className="font-accent text-3xl text-[#2D1A14] font-normal text-center">
              Meet Anita
            </h2>
            <p>
              Anita’s List was founded with a single mission: to bring clarity, calm, and genuine expert guidance to expectant parents navigating the overwhelming world of baby gear and nursery prep.
            </p>
            <p>
              With over 25 years of hands-on experience as a maternity nurse and private baby consultant in London and internationally, Anita has guided hundreds of families through pregnancy, birth, and early parenthood.
            </p>
            <p>
              Rather than sponsored lists or endless commercial catalogues, Anita handpicks and rigorously tests every product recommendation to ensure only safe, practical, and truly essential gear makes the cut.
            </p>
            <div className="pt-2 text-center">
              <Link
                href="/signup"
                className="inline-block px-8 py-3.5 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium rounded-none hover:bg-[#b05d52] transition-colors text-decoration-none"
              >
                Create your curated list
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#CEBFA7]/40 pt-10 w-full text-left">
          <div className="bg-[#EBE7DF] border border-[#CEBFA7] p-6 flex flex-col gap-3">
            <span className="w-8 h-8 bg-[#8B9A6B] text-white flex items-center justify-center font-bold text-xs">
              01
            </span>
            <h3 className="font-accent text-xl font-normal text-[#2D1A14]">Unbiased Advice</h3>
            <p className="font-sans text-xs text-[#2D1A14]/80 leading-relaxed">
              Every recommendation is based strictly on real-world nursing experience, safety standards, and practical day-to-day usability.
            </p>
          </div>

          <div className="bg-[#EBE7DF] border border-[#CEBFA7] p-6 flex flex-col gap-3">
            <span className="w-8 h-8 bg-[#8B9A6B] text-white flex items-center justify-center font-bold text-xs">
              02
            </span>
            <h3 className="font-accent text-xl font-normal text-[#2D1A14]">No Clutter</h3>
            <p className="font-sans text-xs text-[#2D1A14]/80 leading-relaxed">
              We strip away unnecessary products so you only buy what you and your baby will actually need and use.
            </p>
          </div>

          <div className="bg-[#EBE7DF] border border-[#CEBFA7] p-6 flex flex-col gap-3">
            <span className="w-8 h-8 bg-[#8B9A6B] text-white flex items-center justify-center font-bold text-xs">
              03
            </span>
            <h3 className="font-accent text-xl font-normal text-[#2D1A14]">Collaborative Registry</h3>
            <p className="font-sans text-xs text-[#2D1A14]/80 leading-relaxed">
              Easily invite your partner, friends, and family to curate, coordinate, and gift items for your upcoming arrival.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
