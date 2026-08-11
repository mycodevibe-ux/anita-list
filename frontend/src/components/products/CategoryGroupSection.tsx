"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface CategoryGroupSectionProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

export const CategoryGroupSection: React.FC<CategoryGroupSectionProps> = ({
  className,
  title,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={cn("w-full flex flex-col gap-3.5", className)}>
      {/* Category Section Header Row */}
      <div className="flex items-center justify-between border-b border-gray-light/35 pb-2 select-none">
        <h3 className="font-sans text-sm md:text-base font-bold text-brown-dark tracking-wide">
          {title}
        </h3>
        
        {/* Toggle control */}
        <button
          onClick={toggleExpand}
          className="font-sans text-[10px] md:text-xs font-bold text-gray-medium hover:text-text-dark tracking-wider uppercase transition-colors outline-none cursor-pointer"
        >
          {isExpanded ? "Hide" : "Show"}
        </button>
      </div>

      {/* Expanded rows content */}
      {isExpanded && (
        <div className="flex flex-col gap-3 transition-all duration-300 ease-in-out animate-in fade-in duration-200">
          {React.Children.count(children) === 0 ? (
            <div className="py-6 text-center text-xs font-sans text-gray-medium italic bg-white border border-gray-light/10 rounded-md">
              No items in this category.
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
};
