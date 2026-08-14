"use client";

import React from "react";
import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export default function ShippingPolicyPage() {
  return (
    <div className="w-full bg-[#EBE7DF] py-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        
        {/* Title */}
        <RevealOnScroll animation="fade-up">
          <div className="flex flex-col items-center text-center gap-2 border-b border-[#CEBFA7]/40 pb-6 w-full">
            <h1 className="font-accent text-4xl md:text-[48px] text-[#2D1A14] font-normal leading-tight">
              Shipping & <span className="font-accent italic">fulfillment policy</span>
            </h1>
            <p className="font-sans text-xs text-[#2D1A14]/70">
              Last updated: July 2026
            </p>
          </div>
        </RevealOnScroll>

        {/* Content Body */}
        <RevealOnScroll animation="fade-up" delay={200}>
          <div className="flex flex-col gap-6 font-sans text-sm text-[#2D1A14]/90 w-full leading-relaxed">
            <section className="flex flex-col gap-2">
              <h2 className="font-accent text-2xl text-[#2D1A14] font-normal">Direct Retailer Order Fulfillment</h2>
              <p>
                Anita's List curates expert recommendations and provides direct outbound "Buy now" links to trusted partner retailers (e.g. John Lewis, Amazon UK, Stokke, Bugaboo, etc.).
              </p>
              <p>
                Because your order is completed directly on the respective retailer's official website, shipping rates, delivery timelines, tracking numbers, and fulfillment policies are governed entirely by the merchant from whom the item was bought.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="font-accent text-2xl text-[#2D1A14] font-normal">Gift Registry Address Coordination</h2>
              <p>
                When registry owners enter a delivery address under "Update address", this shipping information is displayed to registry guests during gift selection so items can be dispatched directly to the registry owner's home.
              </p>
            </section>

            <div className="pt-4 border-t border-[#CEBFA7]/40 flex gap-4 text-xs font-sans font-bold">
              <Link href="/refund-policy" className="text-[#C77065] hover:underline">
                Refund Policy →
              </Link>
            </div>
          </div>
        </RevealOnScroll>

      </div>
    </div>
  );
}
