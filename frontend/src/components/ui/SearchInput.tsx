"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils/cn";

export interface SearchSuggestion {
  id: string;
  title: string;
  type: "product" | "collection";
}

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (value: string) => void;
  suggestions?: SearchSuggestion[];
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  className,
  placeholder = "Pushchairs with cover",
  value = "",
  onChange,
  onSuggestionSelect,
  ...props
}) => {
  const [query, setQuery] = useState(String(value));
  const [isOpen, setIsOpen] = useState(String(value).trim().length > 0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strVal = String(value);
    setQuery(strVal);
    setIsOpen(strVal.trim().length > 0);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (onChange) onChange(val);
    setIsOpen(val.trim().length > 0);
  };

  const handleFocus = () => {
    if (query.trim().length > 0) {
      setIsOpen(true);
    }
  };

  const handleSelectText = (text: string) => {
    setQuery(text);
    if (onChange) onChange(text);
    if (onSuggestionSelect) {
      onSuggestionSelect({ id: '1', title: text, type: 'product' });
    }
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Search Input Bar matching exact Figma frame */}
      <div className="relative flex items-center bg-[#EBE7DF] border border-[#CEBFA7] h-16 w-full">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="w-full px-6 font-accent italic text-xl text-[#2D1A14] outline-none placeholder:font-accent placeholder:italic placeholder:text-[#2D1A14]/70 bg-transparent"
          {...props}
        />
        <button
          type="submit"
          className="w-16 h-16 flex items-center justify-center border-l border-[#CEBFA7] bg-[#E2DED5] text-[#2D1A14] flex-shrink-0 cursor-pointer hover:bg-[#d5d0c5] transition-colors"
          aria-label="Search"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* Autocomplete Dropdown - ONLY opens on active search input */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-0 bg-[#EBE7DF] border-x border-b border-[#CEBFA7] shadow-xl z-50 p-6 md:p-8 flex flex-col gap-6">
          {/* PRODUCT Category */}
          <div className="flex flex-col gap-3">
            <span className="block text-xs font-bold tracking-widest text-[#2D1A14]/80 uppercase font-sans">
              PRODUCT
            </span>
            <button
              type="button"
              onClick={() => handleSelectText("Lorem ipsum dolor sit amet consectetur.")}
              className="w-full text-left font-accent text-lg md:text-xl text-[#2D1A14] hover:text-[#C77065] transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Lorem ipsum dolor sit amet consectetur.
            </button>
            <button
              type="button"
              onClick={() => handleSelectText("Lorem ipsum dolor sit amet consectetur.")}
              className="w-full text-left font-accent text-lg md:text-xl text-[#2D1A14] hover:text-[#C77065] transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Lorem ipsum dolor sit amet consectetur.
            </button>
            <button
              type="button"
              onClick={() => handleSelectText("Lorem ipsum dolor sit amet consectetur.")}
              className="w-full text-left font-accent text-lg md:text-xl text-[#2D1A14] hover:text-[#C77065] transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Lorem ipsum dolor sit amet consectetur.
            </button>
          </div>

          {/* COLLECTION Category */}
          <div className="flex flex-col gap-3 pt-2">
            <span className="block text-xs font-bold tracking-widest text-[#2D1A14]/80 uppercase font-sans">
              COLLECTION
            </span>
            <button
              type="button"
              onClick={() => handleSelectText("Lorem ipsum dolor sit amet consectetur.")}
              className="w-full text-left font-accent text-lg md:text-xl text-[#2D1A14] hover:text-[#C77065] transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Lorem ipsum dolor sit amet consectetur.
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
