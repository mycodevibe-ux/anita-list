import React from "react";
import { cn } from "@/lib/utils/cn";

export interface ProgressBarProps {
  className?: string;
  progress: number; // 0 to 100
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ className, progress }) => {
  const percentage = Math.max(0, Math.min(100, progress));

  return (
    <div className={cn("w-full h-1.5 bg-gray-light/50 rounded-full overflow-hidden", className)}>
      <div
        className="h-full bg-coral transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
