"use client";

import React from "react";
import Link from "next/link";

export default function CookieDeclarationPage() {
  return (
    <div className="w-full bg-[#EBE7DF] py-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-2 border-b border-[#CEBFA7]/40 pb-6 w-full">
          <h1 className="font-accent text-4xl md:text-[48px] text-[#2D1A14] font-normal leading-tight">
            Cookie <span className="font-accent italic">declaration</span>
          </h1>
          <p className="font-sans text-xs text-[#2D1A14]/70">
            Last updated: July 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-6 font-sans text-sm text-[#2D1A14]/90 w-full leading-relaxed">
          <section className="flex flex-col gap-2">
            <h2 className="font-accent text-2xl text-[#2D1A14] font-normal">How We Use Cookies</h2>
            <p>
              Anita's List uses essential, functional, and performance cookies to remember your session preferences, support smooth list/registry management, and analyze traffic to improve our platform.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-accent text-2xl text-[#2D1A14] font-normal">Categories of Cookies Used</h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li><strong>Necessary Cookies:</strong> Required to enable core navigation, user authentication, and list security.</li>
              <li><strong>Functional Cookies:</strong> Store list filter preferences, active category selections, and custom view states.</li>
              <li><strong>Analytics Cookies:</strong> Help us measure visitor engagement and optimize article guides and page load times.</li>
            </ul>
          </section>

          <div className="pt-4 border-t border-[#CEBFA7]/40 flex gap-4 text-xs font-sans font-bold">
            <Link href="/privacy-policy" className="text-[#C77065] hover:underline">
              Privacy Policy →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
