"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";

const searchProducts = [
  { id: "1", name: "Bugaboo Fox 5 Renew Stroller", category: "Pushchairs", link: "/products/transport/pushchairs/1", brand: "Bugaboo" },
  { id: "2", name: "Stokke YOYO3 Lightweight Stroller", category: "Pushchairs", link: "/products/transport/pushchairs/2", brand: "Stokke" },
  { id: "3", name: "BabyBjörn Baby Carrier Harmony", category: "Carriers", link: "/products/transport/pushchairs/3", brand: "BabyBjörn" },
  { id: "4", name: "Bugaboo Dragonfly City Stroller", category: "Pushchairs", link: "/products/transport/pushchairs/4", brand: "Bugaboo" },
  { id: "5", name: "Stokke Tripp Trapp High Chair", category: "Nursery", link: "/products/transport/pushchairs/5", brand: "Stokke" },
  { id: "6", name: "BabyBjörn Bouncer Bliss Mesh", category: "Nursery", link: "/products/transport/pushchairs/6", brand: "BabyBjörn" },
];

export interface SearchInputProps {
  onClose: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? searchProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : searchProducts.slice(0, 5);

  useEffect(() => {
    setMounted(true);

    // Completely lock HTML and Body scroll when search overlay is active
    const origBodyOverflow = document.body.style.overflow;
    const origHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Focus automatically when modal opens
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    // Close on Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = origBodyOverflow || "";
      document.documentElement.style.overflow = origHtmlOverflow || "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (filtered.length > 0) {
      router.push(`/products/transport/pushchairs`);
    } else {
      router.push(`/no-results?q=${encodeURIComponent(query.trim())}`);
    }
    onClose();
  };

  if (!mounted) return null;

  const modalContent = (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[99999] bg-black/40 backdrop-blur-sm flex flex-col items-center pt-12 md:pt-20 px-4 sm:px-6 animate-fade-in"
    >
      
      {/* Search Container Box */}
      <div className="w-full max-w-3xl bg-[#EBE7DF] border border-[#CEBFA7] shadow-2xl p-6 md:p-8 flex flex-col gap-6 relative">
        
        {/* Top Header Row with Close Button */}
        <div className="flex justify-between items-center border-b border-[#CEBFA7]/50 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔍</span>
            <span className="font-sans text-xs font-bold tracking-widest text-[#8B9A6B] uppercase">
              ANITA'S LIST SEARCH
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#D4C8B5] hover:bg-[#C77065] hover:text-white font-sans text-xs font-bold text-[#2D1A14] transition-colors border-none cursor-pointer"
            aria-label="Close search"
          >
            <span>✕</span>
            <span>Close (ESC)</span>
          </button>
        </div>

        {/* Large Search Input Bar */}
        <form onSubmit={handleSubmit} className="relative flex items-center bg-white border border-[#CEBFA7] h-14 md:h-16 w-full shadow-inner">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pushchairs, car seats, nursery..."
            className="w-full px-6 font-accent italic text-lg md:text-xl text-[#2D1A14] outline-none placeholder:text-[#2D1A14]/50 bg-transparent"
          />
          <button
            type="submit"
            className="w-14 md:w-16 h-full flex items-center justify-center bg-[#C77065] text-white flex-shrink-0 cursor-pointer hover:bg-[#b05d52] transition-colors border-none"
            aria-label="Submit search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        {/* Autocomplete Results Box */}
        <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-1">
          <span className="block text-[11px] font-bold tracking-widest text-[#2D1A14]/70 uppercase font-sans">
            {query.trim() ? `MATCHING RESULTS (${filtered.length})` : "POPULAR RECOMMENDATIONS"}
          </span>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {filtered.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  onClick={onClose}
                  className="p-3.5 bg-white border border-[#CEBFA7]/50 hover:border-[#C77065] hover:bg-[#CEBFA7]/20 transition-all text-decoration-none flex justify-between items-center group shadow-sm"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-accent text-base text-[#2D1A14] group-hover:text-[#C77065] font-medium transition-colors">
                      {item.name}
                    </span>
                    <span className="font-sans text-xs text-[#2D1A14]/60">
                      Category: {item.category}
                    </span>
                  </div>
                  <span className="font-sans text-[10px] font-bold uppercase text-[#2D1A14] bg-[#D4C8B5] px-2.5 py-1">
                    {item.brand}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6 bg-white border border-[#CEBFA7]/50 text-center flex flex-col items-center gap-2">
              <p className="font-accent text-base text-[#2D1A14]">
                No exact match found for &quot;<span className="italic text-[#C77065]">{query}</span>&quot;
              </p>
              <p className="font-sans text-xs text-[#2D1A14]/70">
                Press Enter or click 🔍 to view category suggestions.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
