"use client";

import React from "react";
import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <div className="w-full bg-[#EBE7DF] py-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-2 border-b border-[#CEBFA7]/40 pb-6 w-full">
          <h1 className="font-accent text-4xl md:text-[48px] text-[#2D1A14] font-normal leading-tight">
            Returns & <span className="font-accent italic">refund policy</span>
          </h1>
          <p className="font-sans text-xs text-[#2D1A14]/70">
            Last updated: July 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-6 font-sans text-sm text-[#2D1A14]/90 w-full leading-relaxed">
          <section className="flex flex-col gap-2">
            <h2 className="font-accent text-2xl text-[#2D1A14] font-normal">Third-Party Returns & Exchanges</h2>
            <p>
              Purchases made via Anita's List links are transacted directly with third-party merchant partners. All returns, exchanges, cancellations, and refund requests must be initiated through the specific retailer from whom the item was purchased in accordance with their return policy.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-accent text-2xl text-[#2D1A14] font-normal">Registry Item Status Updates</h2>
            <p>
              If a gift item is returned or exchanged with a retailer, registry owners can manually adjust the item status back to "To buy" from their list dashboard at any time.
            </p>
          </section>

          <div className="pt-4 border-t border-[#CEBFA7]/40 flex gap-4 text-xs font-sans font-bold">
            <Link href="/shipping-policy" className="text-[#C77065] hover:underline">
              Shipping Policy →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
