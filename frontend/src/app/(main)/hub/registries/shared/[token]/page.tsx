"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { CategoryGroupSection } from "@/components/products/CategoryGroupSection";
import { ProductListRow } from "@/components/hub/ProductListRow";
import { ItemStatus } from "@/components/ui/StatusIndicator";
import { cn } from "@/lib/utils/cn";

const initialSharedItems = [
  { id: "sri1", name: "Bugaboo Fox 5 Renew", brand: "Bugaboo", price: 1299.00, quantity: 1, status: "pending" as ItemStatus, category: "Transport", image: "/images/prod-stroller.jpg" },
  { id: "sri2", name: "Purflo Changing Backpack", brand: "Purflo", price: 65.00, quantity: 1, status: "bought" as ItemStatus, category: "Transport", image: "" },
  { id: "sri3", name: "Organic Cotton Sleepsuit (3 pack)", brand: "Lindex", price: 28.00, quantity: 2, status: "bought" as ItemStatus, category: "Baby clothes", image: "" },
  { id: "sri4", name: "Folding Baby Bath", brand: "Stokke Flexi Bath", price: 49.00, quantity: 1, status: "pending" as ItemStatus, category: "Bathing", image: "" },
];

export default function SharedRegistry() {
  const params = useParams();
  const token = (params.token as string) || "reg-token-aj-2026";

  const [items, setItems] = useState(initialSharedItems);
  const [filterBaby, setFilterBaby] = useState("all");

  const categoriesList = Array.from(new Set(items.map((item) => item.category)));

  // Simulate buying item as guest
  const handleGuestPurchase = (id: string) => {
    alert(`Thank you for purchasing this gift! Marking as bought in registry...`);
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "bought" as ItemStatus } : item))
    );
  };

  return (
    <div className="w-full py-12 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-6">
      {/* Hero Banner Header (No back nav since it's a public guest page, or links to public shop) */}
      <HeroBanner
        backHref="/products"
        backLabel="Browse products"
        label="SHARED REGISTRY"
        title="*Anne Johnson's* Baby Registry"
        metaText="GIFTS GIVEN SO FAR"
        imageUrl="/images/hero-registry.jpg"
      />

      {/* Controls row */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2 select-none">
        <div className="flex flex-col">
          <span className="font-sans text-xs font-semibold text-gray-medium uppercase tracking-wider">
            Registry Welcome
          </span>
          <p className="font-sans text-sm text-text-dark/80 mt-1 max-w-md">
            Welcome to Anne's baby registry. Below are the items selected for the nursery and baby setup. Click buy to select a gift.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 self-end md:self-center">
          <FilterDropdown
            label="Filter"
            value={filterBaby}
            onChange={(e) => setFilterBaby(e.target.value)}
            options={[
              { value: "all", label: "Baby" },
              { value: "nursery", label: "Nursery" },
            ]}
          />
        </div>
      </div>

      {/* Product category sections list (ReadOnly view for guest) */}
      <div className="flex flex-col gap-8 mt-4">
        {categoriesList.map((catName) => {
          const catItems = items.filter((item) => item.category === catName);
          if (catItems.length === 0) return null;

          return (
            <CategoryGroupSection key={catName} title={catName}>
              {catItems.map((item) => (
                <ProductListRow
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  brand={item.brand}
                  price={item.price}
                  quantity={item.quantity}
                  imageUrl={item.image}
                  status={item.status}
                  purchaseUrl="https://www.google.com" // Mock retailer link for guests
                  onRemove={undefined} // No delete for guests
                  isReadOnly={true} // Guests cannot modify quantities or status toggles
                  className={cn(
                    item.status === "bought" && "opacity-75"
                  )}
                  // Custom button to mark purchased directly
                  onStatusChange={undefined} // No manual status changing for guests
                />
              ))}
            </CategoryGroupSection>
          );
        })}
      </div>
    </div>
  );
}
