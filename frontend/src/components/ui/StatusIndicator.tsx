"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

export type ItemStatus = "bought" | "pending" | "to-buy";

export interface StatusIndicatorProps {
  className?: string;
  status: ItemStatus;
  onChange?: (status: ItemStatus) => void;
  interactive?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  className,
  status,
  onChange,
  interactive = false,
}) => {
  const handleClick = (value: ItemStatus) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <button
        onClick={() => handleClick("bought")}
        disabled={!interactive}
        title="Bought"
        className={cn(
          "w-4 h-4 rounded-[3px] border transition-colors",
          status === "bought"
            ? "bg-status-green border-status-green"
            : "bg-white border-gray-light hover:bg-status-green/10"
        )}
      />
      <button
        onClick={() => handleClick("pending")}
        disabled={!interactive}
        title="Pending"
        className={cn(
          "w-4 h-4 rounded-[3px] border transition-colors",
          status === "pending"
            ? "bg-status-yellow border-status-yellow"
            : "bg-white border-gray-light hover:bg-status-yellow/10"
        )}
      />
      <button
        onClick={() => handleClick("to-buy")}
        disabled={!interactive}
        title="To buy"
        className={cn(
          "w-4 h-4 rounded-[3px] border transition-colors",
          status === "to-buy"
            ? "bg-status-red border-status-red"
            : "bg-white border-gray-light hover:bg-status-red/10"
        )}
      />
    </div>
  );
};
