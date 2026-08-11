"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

export interface CircleIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: "arrow-right" | "arrow-left" | "plus" | "share";
  color?: "orange" | "olive" | "coral" | "gray";
  size?: "sm" | "md" | "lg";
}

export const CircleIconButton = React.forwardRef<HTMLButtonElement, CircleIconButtonProps>(
  ({ className, icon, color = "orange", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-all duration-200 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          // Color options
          {
            "bg-orange-arrow text-white hover:bg-orange-arrow/90 focus-visible:outline-orange-arrow": color === "orange",
            "bg-olive text-white hover:bg-olive/90 focus-visible:outline-olive": color === "olive",
            "bg-coral text-white hover:bg-coral/90 focus-visible:outline-coral": color === "coral",
            "border border-gray-light bg-white text-text-dark hover:bg-gray-light/10 focus-visible:outline-gray-medium": color === "gray",
          },
          // Size options
          {
            "w-8 h-8": size === "sm",
            "w-10 h-10": size === "md",
            "w-12 h-12": size === "lg",
          },
          className
        )}
        {...props}
      >
        {/* Render precise custom SVGs matching the design */}
        {icon === "arrow-right" && (
          <svg className="w-4 h-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        )}
        {icon === "arrow-left" && (
          <svg className="w-4 h-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        )}
        {icon === "plus" && (
          <svg className="w-5 h-5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        )}
        {icon === "share" && (
          <svg className="w-4 h-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l5.164-2.582M17 11a3 3 0 11-6 0 3 3 0 016 0zm-7 6a3 3 0 11-6 0 3 3 0 016 0zm-1-8a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </button>
    );
  }
);

CircleIconButton.displayName = "CircleIconButton";
