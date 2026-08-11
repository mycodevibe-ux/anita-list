"use client";

import React from "react";
import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="w-full bg-[#EBE7DF] py-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-2 border-b border-[#CEBFA7]/40 pb-6 w-full">
          <h1 className="font-accent text-4xl md:text-[48px] text-[#2D1A14] font-normal leading-tight">
            Legal & <span className="font-accent italic">compliance information</span>
          </h1>
          <p className="font-sans text-xs text-[#2D1A14]/70">
            Last updated: July 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-6 font-sans text-sm text-[#2D1A14]/90 w-full leading-relaxed">
          <section className="flex flex-col gap-2">
            <h2 className="font-accent text-2xl text-[#2D1A14] font-normal">Company Disclosures & Regulatory Compliance</h2>
            <p>
              Anita's List operates in full compliance with United Kingdom, European Union, and international consumer protection standards for digital registry and affiliate recommendation services.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-accent text-2xl text-[#2D1A14] font-normal">Affiliate & Outbound Link Disclosure</h2>
            <p>
              Anita's List is a participant in curated affiliate referral programs. Clicking "Buy now" buttons on our platform redirects users directly to third-party retailer websites (such as John Lewis, Amazon UK, etc.). We may earn an affiliate commission on qualifying purchases at no extra cost to the buyer.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-accent text-2xl text-[#2D1A14] font-normal">Intellectual Property & Trademarks</h2>
            <p>
              All trademarks, logos, brand titles, and images displayed on Anita's List remain the property of their respective trademark owners.
            </p>
          </section>

          <div className="pt-4 border-t border-[#CEBFA7]/40 flex gap-4 text-xs font-sans font-bold">
            <Link href="/terms-of-service" className="text-[#C77065] hover:underline">
              Terms of Service →
            </Link>
            <Link href="/privacy-policy" className="text-[#C77065] hover:underline">
              Privacy Policy →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
