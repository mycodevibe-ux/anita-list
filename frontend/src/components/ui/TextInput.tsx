"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, label, error, type = "text", ...props }, ref) => {
    return (
      <div className="flex flex-col w-full gap-1">
        {label && (
          <span className="font-sans text-xs font-bold tracking-wide text-brown-dark/80 uppercase">
            {label}
          </span>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            "w-full px-4 py-3 font-sans text-sm bg-white border rounded-md text-text-dark placeholder-gray-medium transition-all duration-200 outline-none",
            error ? "border-status-red focus:ring-1 focus:ring-status-red" : "border-gray-light focus:border-olive focus:ring-1 focus:ring-olive",
            className
          )}
          {...props}
        />
        {error && <span className="font-sans text-xs text-status-red">{error}</span>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
