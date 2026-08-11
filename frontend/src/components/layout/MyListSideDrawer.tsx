"use client";

import React from "react";
import Link from "next/link";

interface MyListSideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MyListSideDrawer: React.FC<MyListSideDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sampleActiveListItems = [
    { id: "1", name: "Bugaboo Fox 5 Renew Pushchair", price: "£1,299.00", status: "To buy", category: "Transport" },
    { id: "2", name: "Bugaboo Changing Backpack", price: "£135.00", status: "To buy", category: "Transport" },
    { id: "3", name: "Shnuggle Baby Bath", price: "£32.00", status: "Bought", category: "Bathing" },
    { id: "4", name: "Organic Cotton Sleepsuit Set", price: "£28.00", status: "Bought", category: "Baby clothes" },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Dark Overlay Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over Right Side Panel (Step 34) */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#EBE7DF] border-l border-[#CEBFA7] shadow-2xl flex flex-col justify-between">
          
          {/* Header Bar */}
          <div className="p-6 bg-[#2D1A14] text-[#F8F8F2] flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <span className="font-sans text-[10px] font-bold tracking-widest text-[#8B9A6B] uppercase">
                QUICK ACCESS
              </span>
              <h2 className="font-accent text-2xl font-normal">My Active List</h2>
            </div>
            <button
              onClick={onClose}
              className="text-[#F8F8F2]/80 hover:text-white font-bold text-lg border-none bg-transparent cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Condensed List Items Stack */}
          <div className="p-6 flex flex-col gap-4 overflow-y-auto flex-grow">
            {/* Progress Bar */}
            <div className="bg-white border border-[#CEBFA7] p-3 flex flex-col gap-1.5">
              <div className="flex justify-between font-sans text-xs font-bold text-[#2D1A14]">
                <span>LIST PROGRESS</span>
                <span>50% COMPLETE</span>
              </div>
              <div className="w-full bg-[#CEBFA7]/40 h-2 rounded-none overflow-hidden">
                <div className="bg-[#D4A359] h-full w-[50%]" />
              </div>
            </div>

            <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
              CONDENSED ITEMS ({sampleActiveListItems.length}):
            </span>

            <div className="flex flex-col gap-2.5">
              {sampleActiveListItems.map((item) => (
                <div key={item.id} className="bg-white border border-[#CEBFA7] p-3 flex justify-between items-center gap-3">
                  <div className="flex flex-col gap-0.5 overflow-hidden">
                    <span className="font-sans text-[10px] text-[#8B9A6B] font-bold uppercase">{item.category}</span>
                    <span className="font-accent text-sm font-normal text-[#2D1A14] truncate">{item.name}</span>
                    <span className="font-sans text-xs text-[#C77065] font-bold">{item.price}</span>
                  </div>

                  <span
                    className={`text-[9px] font-sans font-bold uppercase px-2 py-1 flex-shrink-0 ${
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
          <div className="p-6 border-t border-[#CEBFA7] bg-[#EBE7DF] flex flex-col gap-3">
            <Link
              href="/hub/lists/1"
              onClick={onClose}
              className="w-full py-3 bg-[#C77065] text-[#F8F8F2] text-center font-accent text-sm font-medium rounded-none hover:bg-[#b05d52] transition-colors text-decoration-none"
            >
              Open Full List Detail Page →
            </Link>

            <Link
              href="/hub/lists"
              onClick={onClose}
              className="w-full py-2 bg-transparent text-[#2D1A14] text-center font-sans text-xs font-semibold hover:underline text-decoration-none"
            >
              View All Lists Hub
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
