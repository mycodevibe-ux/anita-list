"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { SearchInput } from "@/components/ui/SearchInput";
import { MyListSideDrawer } from "@/components/layout/MyListSideDrawer";

interface HeaderProps {
  settings?: {
    announcement_text?: string;
    site_title?: string;
    header_links?: { label: string; href: string }[];
    header_cta_label?: string;
    header_cta_href?: string;
  };
}

export const Header: React.FC<HeaderProps> = ({
  settings = {
    announcement_text: "Anita's List - Choose, organise and buy your baby kit",
    site_title: "Anita's List",
    header_links: [
      { label: "Products", href: "/products/transport/pushchairs" },
      { label: "Find Registry", href: "/invited-registries" },
      { label: "Expert advice", href: "/expert-advice" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    header_cta_label: "My lists",
    header_cta_href: "/hub/lists",
  },
}) => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  return (
    <header className="w-full bg-[#EBE7DF]/95 backdrop-blur-md border-b border-[#CEBFA7]/80 sticky top-0 z-40 select-none transition-all duration-300 shadow-sm">
      {/* Top Announcement Bar - 100% Full Width Edge-to-Edge Background */}
      {settings.announcement_text && (
        <div className="w-full bg-[#2D1A14] text-[#F8F8F2] font-accent text-center py-2 px-6 md:px-12 lg:px-16 text-xs font-light tracking-wide">
          <div className="max-w-[1440px] mx-auto">
            {settings.announcement_text}
          </div>
        </div>
      )}

      {/* Main Header Row - Matching Footer's max-w-[1440px] mx-auto 100% */}
      <div className="max-w-[1440px] mx-auto h-[80px] md:h-[90px] flex items-center justify-between px-6 md:px-12 lg:px-16">
        
        {/* Left: Original Brand Logo SVG */}
        <Link href="/" className="flex items-center group text-decoration-none">
          <img
            src="/images/logo.svg"
            alt="Anita's List Logo"
            className="h-8 md:h-10 object-contain"
          />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {settings.header_links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="font-accent text-[17px] font-normal text-[#2D1A14] hover:text-[#C77065] transition-colors text-decoration-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Search + Login / My Lists CTA Button */}
        <div className="flex items-center gap-5">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 font-accent text-[16px] font-medium text-[#2D1A14] hover:text-[#C77065] transition-colors cursor-pointer bg-transparent border-none"
            aria-label="Search products"
          >
            <span>Search</span>
            <svg className="w-4 h-4 text-[#2D1A14]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Full Screen Backdrop Blur Search Overlay Modal */}
          {isSearchOpen && (
            <SearchInput onClose={() => setIsSearchOpen(false)} />
          )}

          {/* User Section matching Figma design */}
          {!user ? (
            <>
              <Link href="/login" className="font-accent text-[16px] font-medium text-[#2D1A14] hover:text-[#C77065] transition-colors hidden sm:block text-decoration-none">
                Login
              </Link>

              {/* Step 34: Trigger Right Side Drawer for My Lists Quick Reference */}
              <button
                onClick={() => setIsSideDrawerOpen(true)}
                className="w-[149px] h-[40px] bg-[#C77065] text-[#F8F8F2] font-accent text-[16px] font-medium rounded-none flex items-center justify-center btn-slide-hover border-none cursor-pointer"
              >
                {settings.header_cta_label}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSideDrawerOpen(true)}
                className="w-[149px] h-[40px] bg-[#C77065] text-[#F8F8F2] font-accent text-[16px] font-medium rounded-none flex items-center justify-center btn-slide-hover border-none cursor-pointer"
              >
                {settings.header_cta_label}
              </button>

              <Link
                href="/hub"
                className="w-[40px] h-[40px] bg-[#8B9A6B] text-white flex items-center justify-center font-bold text-sm rounded-none hover:bg-[#7a895b] transition-colors text-decoration-none"
                title="Go to My Hub"
              >
                👤
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#2D1A14] hover:text-[#C77065] cursor-pointer bg-transparent border-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="absolute top-[90px] left-0 w-full bg-[#EBE7DF] border-b border-[#CEBFA7] p-6 flex flex-col gap-4 shadow-lg md:hidden z-50">
            {settings.header_links.map((link, idx) => (
              <Link key={idx} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="font-accent text-base font-medium text-[#2D1A14]">
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Step 34: Slide-over Side Drawer from Right Panel */}
      <MyListSideDrawer isOpen={isSideDrawerOpen} onClose={() => setIsSideDrawerOpen(false)} />
    </header>
  );
};
