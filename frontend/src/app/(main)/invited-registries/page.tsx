"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const sampleRegistries = [
  {
    id: "REG-8821",
    ownerName: "Anne & Mark Johnson",
    dueDate: "15 October 2026",
    totalItems: 12,
    purchasedItems: 7,
    location: "London, UK",
    type: "Gold Registry",
  },
  {
    id: "REG-9403",
    ownerName: "Sarah & David Smith",
    dueDate: "01 December 2026",
    totalItems: 18,
    purchasedItems: 11,
    location: "Manchester, UK",
    type: "Standard Registry",
  },
  {
    id: "REG-1052",
    ownerName: "Emma & James Watson",
    dueDate: "20 August 2026",
    totalItems: 9,
    purchasedItems: 4,
    location: "Edinburgh, UK",
    type: "Gold Registry",
  },
];

export default function InvitedRegistriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCode, setActiveCode] = useState("");
  const [foundRegistry, setFoundRegistry] = useState<typeof sampleRegistries[0] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const matched = sampleRegistries.find(
      (r) =>
        r.id.toLowerCase() === searchQuery.trim().toLowerCase() ||
        r.ownerName.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
    setFoundRegistry(matched || null);
  };

  return (
    <div className="w-full bg-[#EBE7DF] py-12 px-6 md:px-12 lg:px-16 min-h-screen">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">
        
        {/* Header Title Section */}
        <RevealOnScroll animation="fade-up">
          <div className="flex flex-col items-center text-center gap-3 border-b border-[#CEBFA7]/40 pb-8 w-full">
            <span className="font-sans text-xs font-bold tracking-widest text-[#8B9A6B] uppercase">
              GUEST REGISTRY ACCESS
            </span>
            <h1 className="font-accent text-4xl md:text-[52px] text-[#2D1A14] font-normal leading-tight">
              Find a Baby <span className="font-accent italic">Registry</span>
            </h1>
            <p className="font-sans text-sm text-[#2D1A14]/80 max-w-lg leading-relaxed mt-1">
              Were you invited by expecting parents? Enter the unique Registry Code or parent's name to view their curated wishlist and select gifts to buy.
            </p>
          </div>
        </RevealOnScroll>

        {/* Search Box */}
        <RevealOnScroll animation="fade-up" delay={150} className="w-full">
          <form onSubmit={handleSearch} className="bg-[#EBE7DF] border border-[#CEBFA7] p-6 md:p-8 flex flex-col gap-4 shadow-md">
            <label className="font-accent text-lg text-[#2D1A14] font-medium">
              Enter Registry Code or Parent&apos;s Name:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. REG-8821 or Anne Johnson"
                className="flex-grow px-5 py-3.5 bg-white border border-[#CEBFA7] font-sans text-sm text-[#2D1A14] outline-none placeholder:text-[#2D1A14]/50 focus:border-[#C77065]"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#C77065] text-white font-accent text-sm font-medium btn-slide-hover border-none cursor-pointer flex-shrink-0"
              >
                Find Registry
              </button>
            </div>
            <span className="font-sans text-xs text-[#2D1A14]/60 italic">
              💡 Tip: Check your invitation email or message for the exact registry code.
            </span>
          </form>
        </RevealOnScroll>

        {/* Search Results Display */}
        {hasSearched && (
          <RevealOnScroll animation="fade-up" delay={200} className="w-full">
            {foundRegistry ? (
              <div className="bg-white border border-[#8B9A6B] p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[10px] font-bold uppercase bg-[#8B9A6B] text-white px-2 py-0.5">
                      {foundRegistry.type}
                    </span>
                    <span className="font-mono text-xs text-[#2D1A14]/60">Code: {foundRegistry.id}</span>
                  </div>
                  <h3 className="font-accent text-2xl text-[#2D1A14] font-normal">{foundRegistry.ownerName}</h3>
                  <p className="font-sans text-xs text-[#2D1A14]/70">
                    Due Date: <strong>{foundRegistry.dueDate}</strong> • Location: {foundRegistry.location}
                  </p>
                  <div className="w-full bg-[#EBE7DF] h-2 rounded-full mt-2 overflow-hidden max-w-md">
                    <div
                      className="bg-[#C77065] h-full"
                      style={{ width: `${(foundRegistry.purchasedItems / foundRegistry.totalItems) * 100}%` }}
                    />
                  </div>
                  <span className="font-sans text-xs text-[#2D1A14]/80">
                    {foundRegistry.purchasedItems} of {foundRegistry.totalItems} gifts reserved/purchased
                  </span>
                </div>
                <Link
                  href="/hub"
                  className="px-6 py-3 bg-[#2D1A14] text-white font-accent text-xs font-medium btn-slide-hover text-decoration-none flex-shrink-0"
                >
                  View Guest Registry →
                </Link>
              </div>
            ) : (
              <div className="bg-[#EBE7DF] border border-[#C77065]/40 p-6 text-center flex flex-col items-center gap-3">
                <span className="text-2xl">🔍</span>
                <p className="font-accent text-lg text-[#2D1A14]">
                  No active registry found for &quot;<span className="italic text-[#C77065]">{searchQuery}</span>&quot;
                </p>
                <p className="font-sans text-xs text-[#2D1A14]/70">
                  Please verify the code with the registry owner or try searching by parent name.
                </p>
              </div>
            )}
          </RevealOnScroll>
        )}

        {/* Sample Active Registries Section */}
        <RevealOnScroll animation="fade-up" delay={250} className="w-full">
          <div className="flex flex-col gap-4 border-t border-[#CEBFA7]/40 pt-8 w-full">
            <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
              SAMPLE ACTIVE REGISTRIES
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sampleRegistries.map((reg) => (
                <div key={reg.id} className="bg-[#EBE7DF] border border-[#CEBFA7] p-5 flex flex-col justify-between gap-4 hover:border-[#C77065] transition-colors">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-sans text-[10px] font-bold uppercase text-[#8B9A6B]">
                      {reg.id}
                    </span>
                    <h4 className="font-accent text-lg text-[#2D1A14] font-medium leading-tight">
                      {reg.ownerName}
                    </h4>
                    <p className="font-sans text-xs text-[#2D1A14]/70">Due: {reg.dueDate}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery(reg.id);
                      setFoundRegistry(reg);
                      setHasSearched(true);
                    }}
                    className="w-full py-2 bg-[#D4C8B5] hover:bg-[#C77065] hover:text-white font-accent text-xs font-medium transition-colors border-none cursor-pointer"
                  >
                    Select Registry
                  </button>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Help Footer */}
        <RevealOnScroll animation="fade-up" delay={300}>
          <div className="text-center pt-4">
            <p className="font-sans text-xs text-[#2D1A14]/70">
              Want to create your own baby registry?{" "}
              <Link href="/login" className="text-[#C77065] font-bold hover:underline">
                Sign in to your account
              </Link>
            </p>
          </div>
        </RevealOnScroll>

      </div>
    </div>
  );
}
