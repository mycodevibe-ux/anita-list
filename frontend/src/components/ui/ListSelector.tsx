"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

export interface ListSelectorProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  lists: { id: string; title: string }[];
}

export const ListSelector: React.FC<ListSelectorProps> = ({ className, lists, ...props }) => {
  return (
    <div className={cn("relative inline-block min-w-[220px]", className)}>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-sans text-gray-medium pointer-events-none uppercase tracking-wider font-semibold">
        List:
      </span>
      <select
        className="w-full pl-[48px] pr-9 py-2 bg-white border border-gray-light rounded-md text-xs font-sans text-text-dark font-medium shadow-sm outline-none appearance-none cursor-pointer focus:border-olive transition-colors duration-200"
        {...props}
      >
        {lists.length === 0 ? (
          <option value="">No lists available</option>
        ) : (
          lists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.title}
            </option>
          ))
        )}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-dark">
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};
