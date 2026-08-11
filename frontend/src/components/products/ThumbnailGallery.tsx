"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export interface ThumbnailGalleryProps {
  className?: string;
  images: string[];
  productName: string;
}

export const ThumbnailGallery: React.FC<ThumbnailGalleryProps> = ({
  className,
  images = [],
  productName,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Helper if no images are loaded
  const hasImages = images.length > 0;
  const activeImage = hasImages ? images[activeIndex] : null;

  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      {/* Main Large Product Image */}
      <div className="relative aspect-square md:aspect-[4/3] rounded-md overflow-hidden bg-white border border-gray-light/20 shadow-sm flex items-center justify-center select-none">
        {activeImage && (activeImage.startsWith("http") || activeImage.startsWith("/")) ? (
          <Image
            src={activeImage}
            alt={`${productName} view ${activeIndex + 1}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full bg-beige flex items-center justify-center font-accent italic text-gray-medium text-sm">
            Product display placeholder
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin select-none">
          {images.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "relative w-12 h-12 md:w-14 md:h-14 rounded border flex-shrink-0 overflow-hidden outline-none bg-white transition-all duration-200",
                  isActive
                    ? "border-coral ring-1 ring-coral/50 scale-[0.98]"
                    : "border-gray-light/60 hover:border-gray-medium/50"
                )}
                aria-label={`View image ${idx + 1}`}
              >
                {img.startsWith("http") || img.startsWith("/") ? (
                  <Image
                    src={img}
                    alt={`${productName} thumbnail ${idx + 1}`}
                    fill
                    sizes="60px"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full bg-beige/50 flex items-center justify-center font-sans text-[8px] font-bold text-gray-medium">
                    T{idx + 1}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
