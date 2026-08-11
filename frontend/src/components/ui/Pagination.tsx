"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

export interface PaginationProps {
  className?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  className,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={cn("flex items-center justify-center gap-3 mt-8 select-none", className)}>
      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "w-8 h-8 rounded-full font-sans text-sm font-semibold flex items-center justify-center transition-all duration-200 outline-none",
              isActive
                ? "bg-coral text-white shadow-sm"
                : "bg-transparent text-gray-medium hover:text-text-dark"
            )}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};
