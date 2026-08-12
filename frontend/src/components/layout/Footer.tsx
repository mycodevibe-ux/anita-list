"use client";

import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  const brandLinks = [
    { label: "Who we are", href: "/about" },
    { label: "Anita's List podcast", href: "/podcast" },
    { label: "Private consultations", href: "/expert-advice/consultation" },
    { label: "FAQs", href: "/faq" },
    { label: "Work with us", href: "/work-with-us" },
  ];

  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:8000/admin";

  const helpLinks = [
    { label: "Shipping policy", href: "/shipping-policy" },
    { label: "Refund policy", href: "/refund-policy" },
    { label: "Terms of service", href: "/terms-of-service" },
    { label: "Privacy policy", href: "/privacy-policy" },
    { label: "Cookie declaration", href: "/cookie-declaration" },
    { label: "Admin CMS Panel", href: adminUrl },
  ];

  const parseHeading = (text: string) => {
    return text.split(/(\*[^*]+\*)/g).map((part, idx) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <span key={idx} className="font-accent italic">
            {part.slice(1, -1)}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <>
      {/* Global Fixed Olive Chat Badge at Bottom Left (near footer) */}
      <button
        onClick={() => alert("Chat with Anita")}
        className="fixed left-6 bottom-6 w-11 h-11 bg-[#8B9A6B] text-white flex items-center justify-center rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform z-50 border-none"
        aria-label="Open chat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      <footer className="w-full bg-[#CEBFA7] pt-12 pb-0 px-6 md:px-12 lg:px-16 text-[#2D1A14] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 justify-between items-start pb-2">
          {/* Left Side: Extra Large Watermark Brand Symbol */}
          <div className="flex-shrink-0 w-56 md:w-72 lg:w-[320px] flex items-center justify-center pt-0">
            <img
              src="/images/siteicon.png"
              alt="Anita's List Logo"
              className="w-full h-auto object-contain max-h-[340px]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* Middle Column: Newsletter Signup */}
          <div className="flex-grow max-w-xl flex flex-col pt-2">
            <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase mb-3">
              BE IN THE KNOW
            </span>
            <h2 className="font-accent text-2xl md:text-[32px] text-[#2D1A14] leading-snug font-normal mb-6">
              {parseHeading("Be the first to know about new collections, news and *exclusive offers*")}
            </h2>

            {/* Email Input & Subscribe Form */}
            <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-lg mb-4 border-b border-[#2D1A14]">
              <input
                type="email"
                placeholder="Email"
                required
                className="flex-grow px-2 py-2.5 bg-transparent text-sm text-[#2D1A14] placeholder-[#2D1A14]/60 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium hover:bg-[#b05d52] transition-colors rounded-none cursor-pointer border-none"
              >
                Subscribe
              </button>
            </form>

            {/* Consent Text */}
            <p className="font-sans text-[11px] text-[#2D1A14]/80 leading-relaxed max-w-md">
              By clicking the submit button, I declare that I have read the{" "}
              <Link href="/terms-of-service" className="underline hover:text-[#2D1A14]">
                Terms of service
              </Link>{" "}
              and accept the{" "}
              <Link href="/privacy-policy" className="underline hover:text-[#2D1A14]">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Right Columns: OUR BRAND & HELP */}
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-20 pt-2">
            {/* OUR BRAND */}
            <div className="flex flex-col">
              <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase mb-4">
                OUR BRAND
              </span>
              <div className="flex flex-col gap-3 font-sans text-sm text-[#2D1A14]/90">
                {brandLinks.map((link, idx) => (
                  <Link key={idx} href={link.href} className="hover:underline transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* HELP */}
            <div className="flex flex-col">
              <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase mb-4">
                HELP
              </span>
              <div className="flex flex-col gap-3 font-sans text-sm text-[#2D1A14]/90">
                {helpLinks.map((link, idx) => (
                  <Link key={idx} href={link.href} className="hover:underline transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right Copyright aligned at exact same bottom level */}
        <div className="max-w-[1440px] mx-auto flex justify-end items-center pb-2 pt-0">
          <span className="font-sans text-xs font-bold text-[#2D1A14]">
            @2026, Anita's List
          </span>
        </div>
      </footer>
    </>
  );
};
