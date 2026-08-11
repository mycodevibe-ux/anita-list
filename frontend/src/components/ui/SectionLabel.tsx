import React from "react";
import { cn } from "@/lib/utils/cn";

export interface SectionLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ className, text, ...props }) => {
  return (
    <span
      className={cn(
        "block font-sans text-xs md:text-sm font-semibold tracking-[0.15em] text-brown-dark/70 uppercase mb-2",
        className
      )}
      {...props}
    >
      {text}
    </span>
  );
};
