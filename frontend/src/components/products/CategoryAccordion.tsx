"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export interface Subcategory {
  name: string;
  slug: string;
}

export interface CategoryItem {
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

export interface CategoryAccordionProps {
  className?: string;
  categories: CategoryItem[];
  activeCategorySlug?: string;
  activeSubcategorySlug?: string;
}

export const CategoryAccordion: React.FC<CategoryAccordionProps> = ({
  className,
  categories,
  activeCategorySlug = "transport",
  activeSubcategorySlug = "pushchairs",
}) => {
  // Keep track of which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = { transport: true };
    if (activeCategorySlug) {
      initial[activeCategorySlug] = true;
    }
    return initial;
  });

  const toggleCategory = (slug: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <div className={cn("w-full flex flex-col border border-[#CEBFA7] bg-[#EBE7DF] select-none", className)}>
      {categories.map((cat) => {
        const isExpanded = !!expandedCategories[cat.slug];

        return (
          <div key={cat.slug} className="border-b border-[#CEBFA7] last:border-0">
            {/* Category Header Row */}
            <button
              onClick={() => toggleCategory(cat.slug)}
              className="w-full px-4 py-3 flex items-center justify-between font-sans text-xs md:text-sm font-medium text-[#2D1A14] text-left hover:bg-[#E2DED5] transition-colors cursor-pointer bg-transparent border-none"
            >
              <span>{cat.name}</span>
              <svg
                className={cn(
                  "w-3.5 h-3.5 text-[#2D1A14] transition-transform duration-200",
                  isExpanded && "rotate-180"
                )}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Subcategories (Collapsible list) */}
            {isExpanded && cat.subcategories.length > 0 && (
              <div className="bg-[#EBE7DF]/80 py-2 border-t border-[#CEBFA7]/50 flex flex-col">
                {cat.subcategories.map((sub) => {
                  const isSubActive = sub.slug === activeSubcategorySlug || sub.name.toLowerCase() === "pushchairs";
                  return (
                    <Link
                      key={sub.slug}
                      href={`/products/${cat.slug}/${sub.slug}`}
                      className={cn(
                        "px-6 py-1.5 font-sans text-xs font-normal transition-colors leading-relaxed",
                        isSubActive
                          ? "text-[#C77065] underline underline-offset-4 font-semibold"
                          : "text-[#2D1A14]/80 hover:text-[#C77065]"
                      )}
                    >
                      {sub.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
