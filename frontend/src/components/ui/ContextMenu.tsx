"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils/cn";

export interface ContextMenuOption {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
}

export interface ContextMenuProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  options: ContextMenuOption[];
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  className,
  isOpen,
  onClose,
  options,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className={cn(
        "absolute right-0 mt-1 bg-white border border-gray-light rounded-md shadow-lg z-50 py-1 min-w-[160px] animate-in fade-in slide-in-from-top-1 duration-100",
        className
      )}
    >
      {options.map((option, idx) => (
        <button
          key={idx}
          onClick={(e) => {
            e.stopPropagation();
            option.onClick();
            onClose();
          }}
          className={cn(
            "w-full text-left px-4 py-2 text-xs font-sans font-medium hover:bg-cream flex items-center gap-2.5 transition-colors duration-150",
            option.variant === "danger"
              ? "text-status-red hover:text-status-red"
              : "text-text-dark"
          )}
        >
          {option.icon && <span className="text-gray-medium">{option.icon}</span>}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};
