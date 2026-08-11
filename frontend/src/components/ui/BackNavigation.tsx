import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export interface BackNavigationProps {
  href: string;
  label: string;
  className?: string;
}

export const BackNavigation: React.FC<BackNavigationProps> = ({ href, label, className }) => {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-3 text-sm font-sans font-medium text-brown-dark hover:text-coral transition-colors duration-200 group select-none",
        className
      )}
    >
      <div className="w-8 h-8 rounded-full bg-coral text-white flex items-center justify-center transition-transform duration-200 group-hover:-translate-x-0.5">
        <svg
          className="w-4 h-4 stroke-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <span>{label}</span>
    </Link>
  );
};
