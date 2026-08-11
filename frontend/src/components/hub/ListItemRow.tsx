"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

export interface ListItemRowProps {
  className?: string;
  title: string;
  subtitle?: string;
  colorIndicator?: "olive" | "gold";
  buttonLabel?: string;
  onButtonClick: () => void;
  onDeleteClick?: () => void;
}

export const ListItemRow: React.FC<ListItemRowProps> = ({
  className,
  title,
  subtitle,
  colorIndicator,
  buttonLabel = "View list",
  onButtonClick,
  onDeleteClick,
}) => {
  return (
    <div
      className={cn(
        "w-full bg-[#EBE7DF] border border-[#CEBFA7] flex items-center justify-between select-none relative overflow-hidden",
        className
      )}
    >
      {/* Left Color Indicator Bar (for Registries quadrant) */}
      {colorIndicator && (
        <div
          className={cn("absolute left-0 top-0 bottom-0 w-2.5", {
            "bg-[#8B9A6B]": colorIndicator === "olive",
            "bg-[#D4A359]": colorIndicator === "gold",
          })}
        />
      )}

      {/* Left Title & Subtitle Info */}
      <div className={cn("flex flex-col gap-0.5 flex-grow py-3 px-4 overflow-hidden", colorIndicator ? "pl-5" : "")}>
        <span className="font-accent text-base md:text-lg font-normal text-[#2D1A14] truncate">
          {title}
        </span>
        {subtitle && (
          <span className="font-sans text-[11px] text-[#2D1A14]/70 font-normal">
            {subtitle}
          </span>
        )}
      </div>

      {/* Right Controls: Button + Vertical Border Line Trash Column strictly matching Figma */}
      <div className="flex items-center flex-shrink-0 h-full">
        <div className="py-2.5 px-3">
          <button
            onClick={onButtonClick}
            className="px-5 py-2 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors cursor-pointer border-none"
          >
            {buttonLabel}
          </button>
        </div>

        {onDeleteClick ? (
          <div className="border-l border-[#CEBFA7] px-3 py-3 flex items-center justify-center self-stretch">
            <button
              onClick={onDeleteClick}
              className="text-[#2D1A14]/70 hover:text-[#C77065] transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
              aria-label="Delete item"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="w-10 flex-shrink-0" />
        )}
      </div>
    </div>
  );
};
