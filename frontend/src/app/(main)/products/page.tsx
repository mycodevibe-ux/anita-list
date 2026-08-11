"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SearchInput, SearchSuggestion } from "@/components/ui/SearchInput";
import { CategoryCard } from "@/components/cards/CategoryCard";
import api from "@/lib/api";

const mockSuggestions: SearchSuggestion[] = [
  { id: "s1", title: "Lorem ipsum dolor sit amet consectetur.", type: "product" },
  { id: "s2", title: "Lorem ipsum dolor sit amet consectetur.", type: "product" },
  { id: "s3", title: "Lorem ipsum dolor sit amet consectetur.", type: "product" },
  { id: "s4", title: "Lorem ipsum dolor sit amet consectetur.", type: "collection" },
];

interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string;
}

const defaultCategories: Category[] = [
  { id: 1, name: "Baby clothing", slug: "baby-clothing", image_url: "/images/baby-clothing.png" },
  { id: 2, name: "Bathing", slug: "bathing", image_url: "/images/bathing.png" },
  { id: 3, name: "Bedding", slug: "bedding", image_url: "/images/bedding.png" },
  { id: 4, name: "Cleaning", slug: "cleaning", image_url: "/images/bedding.png" },
  { id: 5, name: "Feeding & weaning", slug: "feeding-weaning", image_url: "/images/baby-clothing.png" },
  { id: 6, name: "Monitors", slug: "monitors", image_url: "/images/bathing.png" },
  { id: 7, name: "Mothers", slug: "mothers", image_url: "/images/bedding.png" },
  { id: 8, name: "Nappies & lotions", slug: "nappies-lotions", image_url: "/images/bedding.png" },
  { id: 9, name: "Nursery", slug: "nursery", image_url: "/images/baby-clothing.png" },
  { id: 10, name: "Toys & play", slug: "toys-play", image_url: "/images/bathing.png" },
  { id: 11, name: "Travel", slug: "travel", image_url: "/images/bedding.png" },
  { id: 12, name: "Transport", slug: "transport", image_url: "/images/bedding.png" },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams ? searchParams.get("search") || "" : "";
  const [searchVal, setSearchVal] = useState(queryParam);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  useEffect(() => {
    if (queryParam) {
      setSearchVal(queryParam);
    }
  }, [queryParam]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        if (response.data && response.data.length > 0) {
          const merged = response.data.map((item: Category, index: number) => ({
            ...item,
            image_url: item.image_url && item.image_url.startsWith('http') 
              ? item.image_url 
              : defaultCategories[index % defaultCategories.length].image_url
          }));
          setCategories(merged);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = searchVal.trim()
    ? categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchVal.toLowerCase())
      )
    : categories;

  return (
    <div className="w-full bg-[#EBE7DF] py-12 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
        {/* Page Title Section */}
        <div className="flex flex-col gap-1">
          <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
            PRODUCTS
          </span>
          <h1 className="font-accent text-3xl md:text-[40px] text-[#2D1A14] font-normal leading-tight">
            Browse <span className="font-accent italic">all products</span>
          </h1>
        </div>

        {/* Autocomplete Search input */}
        <div className="w-full">
          <SearchInput
            value={searchVal}
            onChange={setSearchVal}
            suggestions={mockSuggestions}
            placeholder="Pushchairs with cover"
            onSuggestionSelect={(s) => setSearchVal(s.title)}
          />
        </div>

        {/* 4-column Categories Grid matching Figma Screenshot */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <CategoryCard
                key={cat.id}
                name={cat.name}
                imageUrl={cat.image_url || '/images/baby-clothing.png'}
                href={`/products/${cat.slug}`}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16 text-[#2D1A14]/70 font-sans text-base">
              No categories found matching &quot;{searchVal}&quot;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BrowseAllProducts() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-[#2D1A14] font-sans">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
