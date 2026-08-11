import React from "react";
import { Button } from "../ui/Button";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { cn } from "@/lib/utils/cn";

export interface BuyingOption {
  id: string;
  label: string;
  price?: number;
  url: string;
}

export interface BuyingOptionRowProps {
  className?: string;
  option: BuyingOption;
}

export const BuyingOptionRow: React.FC<BuyingOptionRowProps> = ({ className, option }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-3 border-b border-gray-light/25 last:border-0 gap-4",
        className
      )}
    >
      {/* Buying retailer details */}
      <div className="flex flex-col">
        <span className="font-sans text-xs md:text-sm font-semibold text-brown-dark">
          {option.label}
        </span>
        {option.price !== undefined && (
          <span className="font-sans text-xs text-coral font-medium mt-0.5">
            {formatCurrency(option.price)}
          </span>
        )}
      </div>

      {/* Button linking to exterior retailer store */}
      <a href={option.url} target="_blank" rel="noopener noreferrer">
        <Button variant="coral" size="sm" rounded="md" className="px-4 py-1.5 font-semibold">
          Buy now
        </Button>
      </a>
    </div>
  );
};
