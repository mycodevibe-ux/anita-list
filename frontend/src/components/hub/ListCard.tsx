"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export interface ListCardProps {
  className?: string;
  id: string;
  title: string;
  editedDate: string;
  progress?: number; // 0 to 100
  imageUrl?: string;
  onRename: () => void;
  onConvertToRegistry: () => void;
  onDelete: () => void;
}

export const ListCard: React.FC<ListCardProps> = ({
  className,
  id,
  title,
  editedDate,
  progress = 60,
  imageUrl = "/images/banner4.jpg",
  onRename,
  onConvertToRegistry,
  onDelete,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col border border-[#CEBFA7] bg-[#EBE7DF] select-none w-full relative group",
        className
      )}
    >
      {/* Cover Image Container with Hover View List Coral Button */}
      <div className="relative aspect-[4/3] w-full bg-[#D4C8B5] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/banner4.jpg';
          }}
        />

        {/* Hover Overlay with Coral View List Button */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <Link
            href={`/hub/lists/${id}`}
            className="px-6 py-2 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium rounded-none hover:bg-[#b05d52] transition-colors text-decoration-none shadow-md"
          >
            View list
          </Link>
        </div>
      </div>

      {/* Card Content Details Box */}
      <div className="p-4 flex flex-col gap-3 relative bg-[#EBE7DF]">
        {/* Title & Three Dots Menu Row */}
        <div className="flex items-start justify-between gap-3 relative">
          <Link href={`/hub/lists/${id}`} className="hover:text-[#C77065] transition-colors">
            <h4 className="font-accent text-lg font-normal text-[#2D1A14] truncate max-w-[180px]">
              {title}
            </h4>
          </Link>

          {/* Three Dots Menu Trigger */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
              }}
              className="px-2 py-0.5 text-[#C77065] font-bold text-lg hover:bg-[#CEBFA7]/30 transition-colors cursor-pointer border-none bg-transparent"
              aria-label="List options"
            >
              ...
            </button>

            {/* Context Dropdown Menu */}
            {isMenuOpen && (
              <div
                className="absolute right-0 top-7 w-44 bg-white border border-[#CEBFA7] shadow-xl py-1 z-30 flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onRename();
                  }}
                  className="px-4 py-2 text-left font-sans text-xs text-[#2D1A14] hover:bg-[#EBE7DF] transition-colors flex items-center gap-2 border-none bg-transparent cursor-pointer"
                >
                  <span>✏️</span>
                  <span>Rename list</span>
                </button>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onConvertToRegistry();
                  }}
                  className="px-4 py-2 text-left font-sans text-xs text-[#2D1A14] hover:bg-[#EBE7DF] transition-colors flex items-center gap-2 border-none bg-transparent cursor-pointer"
                >
                  <span>📋</span>
                  <span>Turn into registry</span>
                </button>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onDelete();
                  }}
                  className="px-4 py-2 text-left font-sans text-xs text-[#C77065] hover:bg-[#EBE7DF] transition-colors flex items-center gap-2 border-none bg-transparent cursor-pointer"
                >
                  <span>🗑️</span>
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Edited Date Subtext */}
        <span className="font-sans text-xs text-[#2D1A14]/70 -mt-1">
          {editedDate}
        </span>

        {/* Bottom Yellow/Gold Progress Fill Bar */}
        <div className="w-full h-2 bg-[#CEBFA7]/40 overflow-hidden mt-1">
          <div
            className="h-full bg-[#D4A359] transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(10, progress))}%` }}
          />
        </div>
      </div>
    </div>
  );
};
