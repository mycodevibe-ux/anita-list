import React from "react";
import { cn } from "@/lib/utils/cn";

export interface BrandPartnerLogoProps {
  className?: string;
  name: string;
}

export const BrandPartnerLogo: React.FC<BrandPartnerLogoProps> = ({ className, name }) => {
  const renderLogo = () => {
    switch (name) {
      case "BABYBJÖRN":
        return <span className="font-sans text-[22px] font-normal tracking-[0.1em] text-[#D84949] uppercase scale-y-125 inline-block">BABYBJÖRN</span>;
      case "BABYZEN":
        return <span className="font-sans text-[22px] font-black tracking-widest text-black uppercase">BABYZEN</span>;
      case "LOVEVERY":
        return (
          <span className="font-sans text-[22px] font-bold tracking-widest uppercase">
            <span className="text-[#5CD2CA]">L</span>
            <span className="text-[#9FE178]">O</span>
            <span className="text-[#3DBFC0]">V</span>
            <span className="text-[#F1935C]">E</span>
            <span className="text-[#D3D3D3]">V</span>
            <span className="text-[#4E342E]">E</span>
            <span className="text-[#2F2F2F]">R</span>
            <span className="text-[#A2D3C2]">Y</span><span className="text-[#888] text-[10px] align-top ml-0.5">®</span>
          </span>
        );
      case "STOKKE":
        return (
          <span className="font-sans text-[18px] font-medium tracking-[0.1em] text-white uppercase bg-[#F36929] px-3 py-1">
            STOKKE
          </span>
        );
      default:
        return <span className="font-sans text-xs md:text-sm font-black tracking-[0.2em] text-brown-dark/50 uppercase">{name}</span>;
    }
  };

  return (
    <div className={cn("flex items-center justify-center select-none", className)}>
      {renderLogo()}
    </div>
  );
};
