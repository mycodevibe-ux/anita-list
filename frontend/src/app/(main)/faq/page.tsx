"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const faqsList = [
  {
    q: "What is Anita's List?",
    a: "Anita’s List is a personalized baby kit planner and registry platform founded by maternity nurse Anita. We help you choose, organize, and buy everything you need with trusted, unbiased expert advice at every step.",
  },
  {
    q: "How do I create and share a baby registry?",
    a: "Creating a registry is simple: sign up for an account, go to your Hub, create a new list or use a template list, and click 'Turn into registry'. You can then copy your unique registry link and share it with family and friends.",
  },
  {
    q: "Are Anita's product recommendations sponsored?",
    a: "No. Anita’s product picks are 100% independent and based solely on over 25 years of hands-on maternity nursing experience and safety standards. We do not accept payment to favor specific brands.",
  },
  {
    q: "How does gift buying work for guests?",
    a: "When a guest opens your shared registry link, they can select any item marked 'To buy' and click 'Buy now'. This redirects them to trusted partner retailers (like Amazon, John Lewis, etc.) to complete the purchase directly.",
  },
  {
    q: "Can I invite a partner or co-parent to manage my list?",
    a: "Yes! You can enter an optional secondary email address during signup or in your Profile Settings to grant co-parent edit access to your lists and registries.",
  },
  {
    q: "Does Anita offer private 1-on-1 consultations?",
    a: "Yes, Anita offers virtual and in-person private consultations to help parents audit their registry, plan nursery setup, and prepare for birth and postpartum care.",
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="w-full bg-[#EBE7DF] py-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">
        
        {/* Header */}
        <RevealOnScroll animation="fade-up">
          <div className="flex flex-col items-center gap-3 border-b border-[#CEBFA7]/40 pb-6 w-full text-center">
            <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
              FAQS & HELP
            </span>
            <h1 className="font-accent text-4xl md:text-[52px] text-[#2D1A14] font-normal leading-tight">
              Frequently <span className="font-accent italic">asked questions</span>
            </h1>
          </div>
        </RevealOnScroll>

        {/* Accordion List */}
        <RevealOnScroll animation="fade-up" delay={150} className="w-full">
          <div className="flex flex-col border border-[#CEBFA7] bg-[#EBE7DF] w-full">
            {faqsList.map((faq, idx) => (
              <div key={idx} className="border-b border-[#CEBFA7] last:border-0">
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer bg-transparent border-none group"
                >
                  <span className="font-accent text-lg md:text-xl text-[#2D1A14] group-hover:text-[#C77065] transition-colors">
                    {faq.q}
                  </span>
                  <span className="font-sans text-xl text-[#2D1A14] font-bold">
                    {openIdx === idx ? "-" : "+"}
                  </span>
                </button>
                {openIdx === idx && (
                  <div className="px-6 pb-5 font-sans text-xs md:text-sm text-[#2D1A14]/80 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Help CTA Box */}
        <RevealOnScroll animation="zoom-in" delay={300} className="w-full">
          <div className="bg-[#EBE7DF] border border-[#CEBFA7] p-8 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="font-accent text-xl text-[#2D1A14] font-normal">Still have questions?</h3>
              <p className="font-sans text-xs text-[#2D1A14]/75">We are here to help you every step of the way.</p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors text-decoration-none"
            >
              Contact Anita's Team
            </Link>
          </div>
        </RevealOnScroll>

      </div>
    </div>
  );
}
