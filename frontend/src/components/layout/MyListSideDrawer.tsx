"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

interface MyListSideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MyListSideDrawer: React.FC<MyListSideDrawerProps> = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll when side drawer is open
    const origBodyOverflow = document.body.style.overflow;
    const origHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Close on ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = origBodyOverflow || "";
      document.documentElement.style.overflow = origHtmlOverflow || "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const sampleActiveListItems = [
    { id: "1", name: "Bugaboo Fox 5 Renew Pushchair", price: "£1,299.00", status: "To buy", category: "Transport" },
    { id: "2", name: "Bugaboo Changing Backpack", price: "£135.00", status: "To buy", category: "Transport" },
    { id: "3", name: "Shnuggle Baby Bath", price: "£32.00", status: "Bought", category: "Bathing" },
    { id: "4", name: "Organic Cotton Sleepsuit Set", price: "£28.00", status: "Bought", category: "Baby clothes" },
  ];

  const drawerContent = (
    <div className="fixed inset-0 z-[99999] overflow-hidden select-none animate-fade-in flex justify-end">
      {/* Dark Overlay Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity cursor-pointer"
      />

      {/* Slide-over Right Side Panel */}
      <div className="relative w-full max-w-md bg-[#EBE7DF] border-l border-[#CEBFA7] shadow-2xl h-full flex flex-col justify-between z-10 animate-slide-left">
        
        {/* Header Bar */}
        <div className="p-6 bg-[#2D1A14] text-[#F8F8F2] flex justify-between items-center flex-shrink-0">
          <div className="flex flex-col gap-0.5">
            <span className="font-sans text-[10px] font-bold tracking-widest text-[#8B9A6B] uppercase">
              QUICK ACCESS
            </span>
            <h2 className="font-accent text-2xl font-normal">My Active List</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#F8F8F2]/80 hover:text-white font-bold text-xl border-none bg-transparent cursor-pointer p-2"
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>

        {/* Condensed List Items Stack */}
        <div className="p-6 flex flex-col gap-4 overflow-y-auto flex-grow">
          {/* Progress Bar */}
          <div className="bg-white border border-[#CEBFA7] p-4 flex flex-col gap-2 shadow-sm">
            <div className="flex justify-between font-sans text-xs font-bold text-[#2D1A14]">
              <span>LIST PROGRESS</span>
              <span className="text-[#8B9A6B]">50% COMPLETE</span>
            </div>
            <div className="w-full bg-[#CEBFA7]/40 h-2.5 rounded-none overflow-hidden">
              <div className="bg-[#8B9A6B] h-full w-[50%]" />
            </div>
          </div>

          <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase pt-2">
            CONDENSED ITEMS ({sampleActiveListItems.length}):
          </span>

          <div className="flex flex-col gap-2.5">
            {sampleActiveListItems.map((item) => (
              <div key={item.id} className="bg-white border border-[#CEBFA7] p-3.5 flex justify-between items-center gap-3 shadow-sm hover:border-[#C77065] transition-colors">
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <span className="font-sans text-[10px] text-[#8B9A6B] font-bold uppercase">{item.category}</span>
                  <span className="font-accent text-sm font-normal text-[#2D1A14] truncate">{item.name}</span>
                  <span className="font-sans text-xs text-[#C77065] font-bold">{item.price}</span>
                </div>

                <span
                  className={`text-[9px] font-sans font-bold uppercase px-2.5 py-1 flex-shrink-0 ${
                    item.status === "Bought" ? "bg-[#8B9A6B] text-white" : "bg-[#C77065] text-white"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-6 border-t border-[#CEBFA7] bg-[#EBE7DF] flex flex-col gap-3 flex-shrink-0">
          <Link
            href="/hub"
            onClick={onClose}
            className="w-full py-3.5 bg-[#C77065] text-[#F8F8F2] text-center font-accent text-sm font-medium rounded-none btn-slide-hover text-decoration-none shadow-md"
          >
            Open Full List Detail Page →
          </Link>

          <Link
            href="/hub"
            onClick={onClose}
            className="w-full py-2 bg-transparent text-[#2D1A14] text-center font-sans text-xs font-semibold hover:underline text-decoration-none"
          >
            View All Lists Hub
          </Link>
        </div>

      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
};
