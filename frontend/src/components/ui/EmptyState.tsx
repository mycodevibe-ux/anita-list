"use client";

import React from "react";
import { Button } from "./Button";
import { cn } from "@/lib/utils/cn";

export interface EmptyStateProps {
  className?: string;
  title: string;
  description: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  className,
  title,
  description,
  ctaLabel,
  onCtaClick,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center max-w-lg mx-auto py-16 px-6 bg-beige/30 rounded-lg border border-dashed border-gray-light",
        className
      )}
    >
      <h3 className="font-sans text-xl md:text-2xl font-bold text-brown-dark mb-2">
        {title}
      </h3>
      <p className="font-sans text-sm text-gray-medium leading-relaxed mb-8 max-w-sm">
        {description}
      </p>
      {ctaLabel && onCtaClick && (
        <Button onClick={onCtaClick} variant="coral" rounded="md">
          {ctaLabel}
        </Button>
      )}
    </div>
  );
};
