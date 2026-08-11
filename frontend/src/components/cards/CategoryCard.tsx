import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export interface CategoryCardProps {
  className?: string;
  name: string;
  imageUrl: string;
  href: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  className,
  name,
  imageUrl,
  href,
}) => {
  return (
    <Link href={href} className={cn("group select-none w-full block text-decoration-none", className)}>
      {/* Category Name ON TOP above image */}
      <h3 className="font-accent text-xl md:text-[22px] font-normal text-[#2D1A14] mb-2 leading-tight">
        {name}
      </h3>

      {/* Image Container with Coral Arrow Badge at right-0 bottom-0 */}
      <div className="w-full h-[260px] md:h-[280px] relative group overflow-hidden bg-[#E2DED5] block">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/baby-clothing.png';
          }}
        />

        {/* Coral Arrow Button Badge at right-0 bottom-0 */}
        <div className="absolute right-0 bottom-0 bg-[#C77065] text-[#F8F8F2] w-[33px] h-[33px] flex items-center justify-center group-hover:scale-105 transition-transform z-20">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};
