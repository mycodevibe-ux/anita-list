"use client";

import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#EBE7DF] py-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto flex flex-col gap-8 items-center">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-2 border-b border-[#CEBFA7]/40 pb-6 w-full">
          <h1 className="font-accent text-4xl md:text-[48px] text-[#2D1A14] font-normal leading-tight">
            Privacy <span className="font-accent italic">policy</span>
          </h1>
          <p className="font-sans text-xs text-[#2D1A14]/70">
            Last updated: July 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-6 font-sans text-sm text-[#2D1A14]/90 w-full leading-relaxed">
          <section className="flex flex-col gap-2">
            <h2 className="font-accent text-2xl text-[#2D1A14] font-normal">1. Overview & Data Protection Commitment</h2>
            <p>
              At Anita's List ("we", "our", "us"), protecting your privacy and personal data is paramount. This Privacy Policy explains how we collect, store, process, and protect your personal information when you use our website, registry tools, and services.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-accent text-2xl text-[#2D1A14] font-normal">2. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when creating an account, curating a baby list, or sharing a registry:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Primary account information: Full Name, Email Address, and Password credentials.</li>
              <li>Partner / Co-parent email address provided for collaborative list access.</li>
              <li>Registry metadata: Due dates, milestone dates, personal notes, and list items.</li>
              <li>Shipping / Delivery address provided for registry gift coordination.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-accent text-2xl text-[#2D1A14] font-normal">3. How We Use Your Data</h2>
            <p>
              Your data is used strictly to provide, maintain, and personalize your experience on Anita's List. We do not sell your personal data to third parties.
            </p>
          </section>

          <div className="pt-4 border-t border-[#CEBFA7]/40 flex gap-4 text-xs font-sans font-bold">
            <Link href="/terms-of-service" className="text-[#C77065] hover:underline">
              Terms of Service →
            </Link>
            <Link href="/cookie-declaration" className="text-[#C77065] hover:underline">
              Cookie Declaration →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
