"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ui/ChatWidget";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#EBE7DF]">
      <Header variant="logged-in" />
      
      <main className="flex-grow w-full flex items-center justify-center py-20 px-6 relative overflow-hidden select-none">
        {/* Background Decorative Animated Floating Circles */}
        <div className="absolute top-12 left-12 w-64 h-64 bg-[#C77065]/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-12 right-12 w-80 h-80 bg-[#8B9A6B]/15 rounded-full blur-3xl animate-pulse pointer-events-none" />

        <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
          {/* Animated 404 Badge */}
          <div className="relative">
            <span className="font-accent text-[110px] md:text-[160px] font-bold text-[#2D1A14]/15 leading-none select-none tracking-tighter">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-20 h-20 md:w-24 md:h-24 bg-[#C77065] text-[#F8F8F2] rounded-full flex items-center justify-center font-accent text-3xl md:text-4xl shadow-xl animate-bounce">
                🔍
              </span>
            </div>
          </div>

          {/* Text Details */}
          <div className="flex flex-col items-center gap-3">
            <span className="font-sans text-xs font-bold tracking-widest text-[#8B9A6B] uppercase">
              PAGE NOT FOUND
            </span>
            <h1 className="font-accent text-4xl md:text-[52px] text-[#2D1A14] font-normal leading-tight">
              Oops! This page seems to be <span className="font-accent italic">missing</span>
            </h1>
            <p className="font-sans text-sm md:text-base text-[#2D1A14]/80 max-w-md leading-relaxed mt-2">
              The page you are looking for might have been moved, renamed, or doesn't exist in Anita's List catalog.
            </p>
          </div>

          {/* Action Buttons with Slide Hover */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              href="/"
              className="px-8 py-3.5 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium btn-slide-hover rounded-none shadow-md text-decoration-none"
            >
              Return to Home Page
            </Link>
            <Link
              href="/products/transport/pushchairs"
              className="px-8 py-3.5 border border-[#CEBFA7] text-[#2D1A14] font-accent text-sm font-medium btn-slide-coral hover:text-white rounded-none text-decoration-none"
            >
              Browse Pushchairs
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
