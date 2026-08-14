"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

function NoResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || searchParams.get("search") || "item";

  return (
    <div className="w-full bg-[#EBE7DF] py-16 px-6 md:px-12 lg:px-16 min-h-[70vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-8">
        
        <RevealOnScroll animation="zoom-in">
          <div className="w-24 h-24 bg-[#D4C8B5] rounded-full flex items-center justify-center text-4xl shadow-md border border-[#CEBFA7]">
            🔎
          </div>
        </RevealOnScroll>

        <RevealOnScroll animation="fade-up" delay={150}>
          <div className="flex flex-col items-center gap-3">
            <span className="font-sans text-xs font-bold tracking-widest text-[#C77065] uppercase">
              NO RECORDS FOUND
            </span>
            <h1 className="font-accent text-3xl md:text-5xl text-[#2D1A14] font-normal leading-tight">
              We couldn't find any results for &quot;<span className="font-accent italic text-[#C77065]">{query}</span>&quot;
            </h1>
            <p className="font-sans text-sm text-[#2D1A14]/80 max-w-md leading-relaxed mt-2">
              Sorry, no matching baby gear or products were found in Anita's current curated catalog.
            </p>
          </div>
        </RevealOnScroll>

        {/* Suggestions Box */}
        <RevealOnScroll animation="fade-up" delay={300} className="w-full">
          <div className="bg-[#EBE7DF] border border-[#CEBFA7] p-6 text-left flex flex-col gap-4">
            <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
              TRY THESE SEARCH TIPS:
            </span>
            <ul className="font-sans text-xs text-[#2D1A14]/80 space-y-2 list-disc pl-5">
              <li>Check your spelling for any typos.</li>
              <li>Try searching with broader terms (e.g. <em>"pushchair"</em> instead of <em>"compact red stroller"</em>).</li>
              <li>Browse our popular curated categories below.</li>
            </ul>
          </div>
        </RevealOnScroll>

        {/* Popular Category Shortcuts */}
        <RevealOnScroll animation="fade-up" delay={450}>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/products/transport/pushchairs"
              className="px-6 py-2.5 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium btn-slide-hover text-decoration-none"
            >
              Browse Pushchairs
            </Link>
            <Link
              href="/products/transport"
              className="px-6 py-2.5 border border-[#CEBFA7] text-[#2D1A14] font-accent text-xs font-medium btn-slide-coral hover:text-white text-decoration-none"
            >
              Explore Transport
            </Link>
            <Link
              href="/products"
              className="px-6 py-2.5 border border-[#CEBFA7] text-[#2D1A14] font-accent text-xs font-medium btn-slide-coral hover:text-white text-decoration-none"
            >
              All Categories
            </Link>
          </div>
        </RevealOnScroll>

      </div>
    </div>
  );
}

export default function NoResultsPage() {
  return (
    <Suspense fallback={
      <div className="w-full bg-[#EBE7DF] py-16 text-center font-sans text-sm text-[#2D1A14]">
        Loading...
      </div>
    }>
      <NoResultsContent />
    </Suspense>
  );
}
