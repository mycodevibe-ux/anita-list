import React from "react";
import { cn } from "@/lib/utils/cn";

export interface StepCardProps {
  className?: string;
  number: number;
  description: string;
}

export const StepCard: React.FC<StepCardProps> = ({ className, number, description }) => {
  // Parse asterisks to italics
  const parseText = (text: string) => {
    return text.split(/(\*[^*]+\*)/g).map((part, idx) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <span key={idx} className="font-accent italic text-brown-dark">
            {part.slice(1, -1)}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className={cn("flex flex-col items-start gap-4 relative z-10", className)}>
      <div className="w-6 h-6 bg-brown-dark text-white flex items-center justify-center font-sans text-[11px] font-bold">
        {number}
      </div>
      <p className="font-sans text-sm text-brown-dark font-medium leading-relaxed mt-2 pr-4">
        {parseText(description)}
      </p>
    </div>
  );
};
