"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RegistryItem {
  id: string;
  title: string;
  type: "olive" | "gold"; // olive = My Registry, gold = Shared with me
  updated_at: string;
  progress: number;
}

const defaultRegistries: RegistryItem[] = [
  { id: "1", title: "Lorem ipsum dolor", type: "gold", updated_at: "10 July 2026", progress: 50 },
  { id: "2", title: "Amet consectetur", type: "olive", updated_at: "11 June 2026", progress: 75 },
  { id: "3", title: "Consectetur amet", type: "gold", updated_at: "8 June 2026", progress: 30 },
  { id: "4", title: "Ipsum dolor sit", type: "olive", updated_at: "20 May 2026", progress: 90 },
];

export default function RegistriesHub() {
  const router = useRouter();
  const [registries, setRegistries] = useState<RegistryItem[]>(defaultRegistries);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const handleRename = (id: string) => {
    const reg = registries.find((r) => r.id === id);
    const newName = prompt("Enter new title for registry:", reg?.title);
    if (newName) {
      setRegistries((prev) => prev.map((r) => (r.id === id ? { ...r, title: newName } : r)));
    }
  };

  const handleShare = (id: string) => {
    alert("Registry share link copied to clipboard!");
  };

  const handleUpdateAddress = (id: string) => {
    const newAddress = prompt("Enter shipping/delivery address for this registry:");
    if (newAddress) {
      alert(`Delivery address updated to: ${newAddress}`);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this registry?")) {
      setRegistries((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="w-full bg-[#EBE7DF] py-10 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
        
        {/* Top Navigation Bar: Back Button Left + My Registries Heading Right */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#CEBFA7]/40 pb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/hub"
              className="w-[38px] h-[38px] bg-[#C77065] text-[#F8F8F2] flex items-center justify-center font-bold text-lg rounded-none hover:bg-[#b05d52] transition-colors cursor-pointer text-decoration-none"
              aria-label="Back to My hub"
            >
              ‹
            </Link>
            <Link
              href="/hub"
              className="font-sans text-xs font-semibold text-[#2D1A14] hover:text-[#C77065] transition-colors"
            >
              Back to My hub
            </Link>
          </div>

          <h1 className="font-accent text-4xl md:text-[52px] font-normal text-[#2D1A14] leading-tight">
            <span className="font-accent italic">My</span> registries
          </h1>
        </div>

        {/* Legend Row */}
        <div className="flex justify-between items-center pb-2">
          <p className="font-accent text-xl md:text-[24px] font-normal text-[#2D1A14] max-w-2xl">
            Manage your registries and registries shared with you.
          </p>

          <div className="flex items-center gap-4 text-xs font-sans text-[#2D1A14] select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#8B9A6B]" />
              <span>My registries</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#D4A359]" />
              <span>Registries shared with me</span>
            </div>
          </div>
        </div>

        {/* Registries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {registries.map((reg) => (
            <div
              key={reg.id}
              className="bg-[#EBE7DF] border border-[#CEBFA7] p-6 flex flex-col justify-between gap-4 relative overflow-hidden"
            >
              {/* Left Color Indicator Bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-2.5 ${
                  reg.type === "olive" ? "bg-[#8B9A6B]" : "bg-[#D4A359]"
                }`}
              />

              <div className="flex justify-between items-start pl-3">
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-[10px] font-bold tracking-widest text-[#2D1A14]/60 uppercase">
                    {reg.type === "olive" ? "MY REGISTRY" : "SHARED REGISTRY"}
                  </span>
                  <h3 className="font-accent text-xl font-normal text-[#2D1A14]">
                    {reg.title}
                  </h3>
                  <span className="font-sans text-xs text-[#2D1A14]/60">
                    Edited {reg.updated_at}
                  </span>
                </div>

                {/* Per-registry "..." menu: Rename registry / Share registry / Update address / Delete */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(activeMenuId === reg.id ? null : reg.id);
                    }}
                    className="px-2 py-0.5 text-[#C77065] font-bold text-lg hover:bg-[#CEBFA7]/30 transition-colors cursor-pointer border-none bg-transparent"
                    aria-label="Registry options"
                  >
                    ...
                  </button>

                  {activeMenuId === reg.id && (
                    <div
                      className="absolute right-0 top-7 w-48 bg-white border border-[#CEBFA7] shadow-xl py-1 z-30 flex flex-col"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {reg.type === "olive" && (
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            handleRename(reg.id);
                          }}
                          className="px-4 py-2 text-left font-sans text-xs text-[#2D1A14] hover:bg-[#EBE7DF] transition-colors flex items-center gap-2 border-none bg-transparent cursor-pointer"
                        >
                          <span>✏️</span>
                          <span>Rename registry</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setActiveMenuId(null);
                          handleShare(reg.id);
                        }}
                        className="px-4 py-2 text-left font-sans text-xs text-[#2D1A14] hover:bg-[#EBE7DF] transition-colors flex items-center gap-2 border-none bg-transparent cursor-pointer"
                      >
                        <span>🔗</span>
                        <span>Share registry</span>
                      </button>

                      {reg.type === "olive" && (
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            handleUpdateAddress(reg.id);
                          }}
                          className="px-4 py-2 text-left font-sans text-xs text-[#2D1A14] hover:bg-[#EBE7DF] transition-colors flex items-center gap-2 border-none bg-transparent cursor-pointer"
                        >
                          <span>📍</span>
                          <span>Update address</span>
                        </button>
                      )}

                      {reg.type === "olive" && (
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            handleDelete(reg.id);
                          }}
                          className="px-4 py-2 text-left font-sans text-xs text-[#C77065] hover:bg-[#EBE7DF] transition-colors flex items-center gap-2 border-none bg-transparent cursor-pointer"
                        >
                          <span>🗑️</span>
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-[#CEBFA7]/40 pt-4 pl-3">
                <button
                  onClick={() => router.push(`/hub/registries/${reg.id}?mode=${reg.type}`)}
                  className="px-5 py-2 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer"
                >
                  View registry
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
