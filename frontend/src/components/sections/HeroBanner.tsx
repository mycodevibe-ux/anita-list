import React from "react";
import Image from "next/image";
import { BackNavigation } from "../ui/BackNavigation";
import { cn } from "@/lib/utils/cn";

export interface HeroBannerProps {
  className?: string;
  backHref: string;
  backLabel: string;
  title: string;
  label: string;
  metaText: string;
  imageUrl?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  className,
  backHref,
  backLabel,
  title,
  label,
  metaText,
  imageUrl,
}) => {
  // Helper to parse asterisks to italic serif spans inside headings
  const parseTitle = (text: string) => {
    return text.split(/(\*[^*]+\*)/g).map((part, idx) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <span key={idx} className="font-accent italic text-coral">
            {part.slice(1, -1)}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <section className={cn("relative w-full h-[180px] md:h-[220px] bg-beige/40 overflow-hidden shadow-sm rounded-b-md select-none", className)}>
      {/* Background lifestyle image */}
      <div className="absolute inset-0 w-full h-full bg-beige-dark/20 z-0">
        {imageUrl && (imageUrl.startsWith("http") || imageUrl.startsWith("/")) ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.95]"
          />
        ) : (
          <div className="w-full h-full bg-[#E5DDD0]/60 flex items-center justify-center font-accent italic text-gray-medium/70 text-sm">
            Banner background photo
          </div>
        )}
      </div>

      {/* Floating Overlays */}
      <div className="absolute inset-0 z-10 p-5 md:py-8 flex flex-col justify-between max-w-[1440px] mx-auto px-5 w-full">
        {/* Top-left: Back Navigation */}
        <div className="self-start">
          <BackNavigation href={backHref} label={backLabel} className="bg-white/85 py-1.5 pl-2 pr-4 rounded-full shadow-sm hover:bg-white transition-colors" />
        </div>

        {/* Bottom-right: Title & Metadata */}
        <div className="self-end text-right flex flex-col gap-1 bg-white/80 p-4 rounded-md shadow-sm border border-gray-light/10 max-w-xs md:max-w-md">
          <span className="block font-sans text-[9px] md:text-[10px] font-bold tracking-wider text-brown-dark/70 uppercase">
            {label}
          </span>
          <h2 className="font-sans text-xl md:text-2xl font-semibold text-brown-dark leading-tight">
            {parseTitle(title)}
          </h2>
          <span className="block font-sans text-[8px] md:text-[9px] font-bold text-gray-medium tracking-wide">
            {metaText}
          </span>
        </div>
      </div>
    </section>
  );
};
