"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "coral" | "olive" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  rounded?: "md" | "full";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "coral", size = "md", rounded = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-sans font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          // Variants
          {
            "bg-coral text-white hover:bg-coral/90 focus-visible:outline-coral": variant === "coral",
            "bg-olive text-white hover:bg-olive/90 focus-visible:outline-olive": variant === "olive",
            "border border-gray-light bg-transparent hover:bg-gray-light/10 text-text-dark focus-visible:outline-gray-medium": variant === "outline",
            "bg-transparent text-text-dark hover:underline underline-offset-4 p-0": variant === "text",
          },
          // Sizes
          {
            "px-4 py-2 text-xs": size === "sm" && variant !== "text",
            "px-6 py-3 text-sm": size === "md" && variant !== "text",
            "px-8 py-4 text-base": size === "lg" && variant !== "text",
          },
          // Rounding
          {
            "rounded-md": rounded === "md" && variant !== "text",
            "rounded-full": rounded === "full" && variant !== "text",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
