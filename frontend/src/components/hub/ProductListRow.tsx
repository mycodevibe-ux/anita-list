"use client";

import React from "react";
import Image from "next/image";
import { StatusIndicator, ItemStatus } from "../ui/StatusIndicator";
import { Button } from "../ui/Button";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { cn } from "@/lib/utils/cn";

export interface ProductListRowProps {
  className?: string;
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  status: ItemStatus;
  purchaseUrl?: string;
  onQuantityChange?: (qty: number) => void;
  onStatusChange?: (status: ItemStatus) => void;
  onRemove?: () => void;
  isReadOnly?: boolean;
}

export const ProductListRow: React.FC<ProductListRowProps> = ({
  className,
  id,
  name,
  brand,
  price,
  quantity,
  imageUrl,
  status,
  purchaseUrl,
  onQuantityChange,
  onStatusChange,
  onRemove,
  isReadOnly = false,
}) => {
  const handleQuantitySub = () => {
    if (onQuantityChange && quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleQuantityAdd = () => {
    if (onQuantityChange) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div
      className={cn(
        "w-full bg-white border border-gray-light/20 hover:border-gray-light/50 rounded-md py-4 px-5 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow transition-all duration-200 select-none",
        className
      )}
    >
      {/* 1. Left side: Image + Text info */}
      <div className="flex items-center gap-4 flex-grow overflow-hidden min-w-[200px]">
        {/* Product Thumbnail */}
        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-md border border-gray-light/40 overflow-hidden bg-gray-light/20 flex-shrink-0">
          {imageUrl && (imageUrl.startsWith("http") || imageUrl.startsWith("/")) ? (
            <Image src={imageUrl} alt={name} fill sizes="60px" className="object-cover object-center" />
          ) : (
            <div className="w-full h-full bg-beige flex items-center justify-center font-accent italic text-gray-medium text-[8px]">
              No photo
            </div>
          )}
        </div>

        {/* Name and brand details */}
        <div className="flex flex-col overflow-hidden">
          <span className="font-sans text-xs md:text-sm font-semibold text-brown-dark truncate">
            {name}
          </span>
          <span className="font-sans text-[10px] text-gray-medium font-semibold mt-0.5 uppercase tracking-wide">
            {brand}
          </span>
        </div>
      </div>

      {/* 2. Middle side: Quantity, Price, and Status controls */}
      <div className="flex items-center flex-wrap justify-between md:justify-end gap-6 md:gap-10 flex-grow max-w-xl">
        {/* Quantity Controls */}
        <div className="flex flex-col gap-1 items-start md:items-center">
          <span className="font-sans text-[9px] text-gray-medium font-bold uppercase tracking-wider md:hidden">
            Quantity
          </span>
          <div className="flex items-center gap-1 bg-cream/30 border border-gray-light/60 rounded px-1.5 py-0.5">
            {!isReadOnly && onQuantityChange ? (
              <>
                <button
                  onClick={handleQuantitySub}
                  className="text-gray-medium hover:text-text-dark font-sans text-sm font-bold w-5 h-5 flex items-center justify-center transition-colors select-none outline-none"
                >
                  -
                </button>
                <span className="font-sans text-xs font-semibold text-text-dark w-6 text-center select-none">
                  {quantity}
                </span>
                <button
                  onClick={handleQuantityAdd}
                  className="text-gray-medium hover:text-text-dark font-sans text-sm font-bold w-5 h-5 flex items-center justify-center transition-colors select-none outline-none"
                >
                  +
                </button>
              </>
            ) : (
              <span className="font-sans text-xs font-semibold text-text-dark w-12 text-center">
                Qty: {quantity}
              </span>
            )}
          </div>
        </div>

        {/* Item Price */}
        <div className="flex flex-col gap-0.5 items-start md:items-end">
          <span className="font-sans text-[9px] text-gray-medium font-bold uppercase tracking-wider md:hidden">
            Price
          </span>
          <span className="font-sans text-xs md:text-sm font-semibold text-text-dark">
            {formatCurrency(price)}
          </span>
        </div>

        {/* Status indicator blocks */}
        <div className="flex flex-col gap-1 items-start md:items-center">
          <span className="font-sans text-[9px] text-gray-medium font-bold uppercase tracking-wider md:hidden">
            Status
          </span>
          <StatusIndicator
            status={status}
            onChange={onStatusChange}
            interactive={!isReadOnly && !!onStatusChange}
          />
        </div>
      </div>

      {/* 3. Right side: Action triggers (Buy / Delete) */}
      <div className="flex items-center justify-end gap-3 flex-shrink-0 border-t border-gray-light/10 pt-4 md:pt-0 md:border-t-0">
        {purchaseUrl && (
          <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="coral" size="sm" rounded="md" className="font-bold px-4 py-1.5">
              Buy
            </Button>
          </a>
        )}

        {!isReadOnly && onRemove && (
          <button
            onClick={onRemove}
            className="text-gray-medium hover:text-status-red p-1.5 transition-colors outline-none"
            aria-label="Remove item"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
