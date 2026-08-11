import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export interface ProductCardProps {
  className?: string;
  name: string;
  price: number | string;
  imageUrl?: string;
  href: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  className,
  name,
  price,
  imageUrl,
  href,
}) => {
  const formattedPrice = typeof price === "number" ? `£${price.toFixed(2)}` : price || "£00.00";

  return (
    <Link href={href} className={cn("group select-none w-full block text-decoration-none", className)}>
      {/* Product Image Container with Coral Arrow Badge at right-0 bottom-0 */}
      <div className="w-full h-[260px] md:h-[280px] relative group overflow-hidden bg-[#D4C8B5] block">
        <img
          src={imageUrl || "/images/banner4.jpg"}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/banner4.jpg';
          }}
        />

        {/* Coral Arrow Button Badge at right-0 bottom-0 */}
        <div className="absolute right-0 bottom-0 bg-[#C77065] text-[#F8F8F2] w-[33px] h-[33px] flex items-center justify-center group-hover:scale-105 transition-transform z-20">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Product Information below image */}
      <div className="flex flex-col gap-0.5 mt-2">
        <h4 className="font-accent text-lg md:text-xl font-normal text-[#2D1A14] leading-snug group-hover:text-[#C77065] transition-colors">
          {name}
        </h4>
        <span className="font-sans text-xs md:text-sm text-[#2D1A14]/70 font-normal">
          {formattedPrice}
        </span>
      </div>
    </Link>
  );
};
