"use client";

import React from "react";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="w-full bg-[#EBE7DF] py-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-2 border-b border-[#CEBFA7]/40 pb-6 w-full">
          <h1 className="font-accent text-4xl md:text-[48px] text-[#2D1A14] font-normal leading-tight">
            Terms of <span className="font-accent italic">service</span>
          </h1>
          <p className="font-sans text-xs text-[#2D1A14]/70">
            Last updated: July 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-6 font-sans text-sm text-[#2D1A14]/90 w-full leading-relaxed">
          <section className="flex flex-col gap-2">
            <h2 className="font-accent text-2xl text-[#2D1A14] font-normal">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or registering an account on Anita's List ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Platform.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-accent text-2xl text-[#2D1A14] font-normal">2. Use of Registry & Recommendation Services</h2>
            <p>
              Anita's List provides product recommendations, curated list building tools, and gift registry coordination. Purchases initiated through outbound "Buy now" buttons are fulfilled directly by third-party partner retailers.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-accent text-2xl text-[#2D1A14] font-normal">3. Account Security & User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your account.
            </p>
          </section>

          <div className="pt-4 border-t border-[#CEBFA7]/40 flex gap-4 text-xs font-sans font-bold">
            <Link href="/privacy-policy" className="text-[#C77065] hover:underline">
              Privacy Policy →
            </Link>
            <Link href="/legal" className="text-[#C77065] hover:underline">
              Legal & Compliance Disclosures →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
