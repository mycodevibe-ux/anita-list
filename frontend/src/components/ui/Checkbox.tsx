"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="flex items-start gap-2.5 cursor-pointer select-none">
          <input
            ref={ref}
            type="checkbox"
            className={cn(
              "peer sr-only"
            )}
            {...props}
          />
          <div
            className={cn(
              "w-4 h-4 mt-0.5 rounded border border-gray-light bg-white flex items-center justify-center transition-all duration-200 peer-checked:bg-coral peer-checked:border-coral peer-focus-visible:ring-2 peer-focus-visible:ring-coral/50",
              error && "border-status-red"
            )}
          >
            <svg
              className="w-3.5 h-3.5 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="font-sans text-xs text-gray-medium leading-normal peer-checked:text-text-dark">
            {label}
          </span>
        </label>
        {error && <span className="font-sans text-xs text-status-red ml-6">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
