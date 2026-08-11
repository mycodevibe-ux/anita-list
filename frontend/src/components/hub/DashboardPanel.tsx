"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export interface DashboardPanelProps {
  className?: string;
  title: string;
  actionText?: string;
  onActionClick?: () => void;
  viewAllHref: string;
  viewAllText?: string;
  legend?: React.ReactNode;
  children: React.ReactNode;
}

export const DashboardPanel: React.FC<DashboardPanelProps> = ({
  className,
  title,
  actionText,
  onActionClick,
  viewAllHref,
  viewAllText,
  legend,
  children,
}) => {
  return (
    <div
      className={cn(
        "w-full bg-[#EBE7DF] p-6 md:p-8 flex flex-col justify-between gap-6 select-none",
        className
      )}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-4 border-b border-[#CEBFA7]/40 pb-4">
        <h3 className="font-accent text-2xl md:text-[28px] font-normal text-[#2D1A14]">
          {title}
        </h3>

        {/* Right Action / Legend */}
        <div className="flex items-center gap-3">
          {legend}
          {actionText && onActionClick && (
            <div className="flex items-center gap-3">
              <span className="font-sans text-xs font-semibold text-[#2D1A14]">
                {actionText}
              </span>
              <button
                onClick={onActionClick}
                className="w-[38px] h-[38px] bg-[#C77065] text-[#F8F8F2] flex items-center justify-center font-bold text-xl rounded-none hover:bg-[#b05d52] transition-colors cursor-pointer border-none"
                aria-label={actionText}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Item Rows Stack */}
      <div className="flex flex-col gap-3 min-h-[220px]">
        {children}
      </div>

      {/* Bottom View All Link */}
      <div className="pt-2">
        <Link
          href={viewAllHref}
          className="font-sans text-xs font-semibold text-[#2D1A14] underline hover:text-[#C77065] transition-colors"
        >
          {viewAllText || `View all ${title.toLowerCase()}`}
        </Link>
      </div>
    </div>
  );
};
