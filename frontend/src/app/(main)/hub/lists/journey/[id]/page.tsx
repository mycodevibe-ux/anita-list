"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { CategoryGroupSection } from "@/components/products/CategoryGroupSection";
import { ProductListRow } from "@/components/hub/ProductListRow";
import { CircleIconButton } from "@/components/ui/CircleIconButton";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { ItemStatus } from "@/components/ui/StatusIndicator";

const initialJourneyItems = [
  // Transport
  { id: "j1", name: "Bugaboo Fox 5 Renew", brand: "Bugaboo", price: 1299.00, quantity: 1, status: "pending" as ItemStatus, category: "Transport", image: "/images/prod-stroller.jpg" },
  { id: "j2", name: "Rain Cover Accessories", brand: "Bugaboo", price: 45.00, quantity: 1, status: "to-buy" as ItemStatus, category: "Transport", image: "" },
  
  // Bedding
  { id: "j3", name: "Cotton Fitted Crib Sheets", brand: "Little Green Sheep", price: 29.00, quantity: 1, status: "to-buy" as ItemStatus, category: "Bedding", image: "" },
];

export default function ListJourney() {
  const params = useParams();
  const router = useRouter();
  const journeyId = (params.id as string) || "1";

  const [items, setItems] = useState(initialJourneyItems);
  const [filterBaby, setFilterBaby] = useState("all");

  const handleQuantityChange = (id: string, qty: number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  const handleStatusChange = (id: string, status: ItemStatus) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAcceptCategoryRecommendations = (catName: string) => {
    alert(`Category "${catName}" recommendations accepted! (All items confirmed for list)`);
  };

  const handleRefuseCategoryRecommendations = (catName: string) => {
    if (confirm(`Remove all unconfirmed recommendations for "${catName}"?`)) {
      setItems((prev) => prev.filter((item) => item.category !== catName || item.status === "bought"));
    }
  };

  const handleCompleteJourney = () => {
    alert("Congratulations! You have completed your Journey List. It has been saved to your Hub.");
    router.push("/hub/lists");
  };

  const totalValue = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const categoriesList = Array.from(new Set(items.map((item) => item.category)));

  return (
    <div className="w-full py-12 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-6">
      {/* Hero Banner with back navigation */}
      <HeroBanner
        backHref="/hub/lists"
        backLabel="Back to My lists"
        label="JOURNEY LIST GUIDE"
        title="*Lorem* ipsum dolor sit"
        metaText="LAST EDITED 11 JUNE 2026"
        imageUrl="/images/hero-journey.jpg"
      />

      {/* Controls row */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2 select-none">
        {/* Total Value */}
        <div className="flex flex-col">
          <span className="font-sans text-xs font-semibold text-gray-medium uppercase tracking-wider">
            Total Value
          </span>
          <span className="font-sans text-xl md:text-2xl font-bold text-coral mt-0.5">
            {formatCurrency(totalValue)}
          </span>
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-4 self-end md:self-center">
          <FilterDropdown
            label="Filter"
            value={filterBaby}
            onChange={(e) => setFilterBaby(e.target.value)}
            options={[
              { value: "all", label: "Baby" },
              { value: "nursery", label: "Nursery" },
            ]}
          />
          
          <Button onClick={handleCompleteJourney} variant="coral" rounded="md" className="font-bold">
            Complete Journey
          </Button>
        </div>
      </div>

      {/* Main product categories list */}
      <div className="flex flex-col gap-10 mt-6">
        {categoriesList.map((catName) => {
          const catItems = items.filter((item) => item.category === catName);
          if (catItems.length === 0) return null;

          return (
            <div key={catName} className="flex flex-col gap-4">
              <CategoryGroupSection title={catName}>
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
                    purchaseUrl="https://www.google.com"
                    onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
                    onStatusChange={(status) => handleStatusChange(item.id, status)}
                    onRemove={() => handleRemoveItem(item.id)}
                  />
                ))}
              </CategoryGroupSection>

              {/* Journey actions: Add recommended / Refuse suggestions */}
              <div className="flex items-center gap-3 justify-end mt-2 pr-2">
                <Button
                  onClick={() => handleAcceptCategoryRecommendations(catName)}
                  variant="coral"
                  size="sm"
                  rounded="md"
                  className="px-4 py-1.5 text-xs font-bold"
                >
                  Accept recommendations
                </Button>
                <Button
                  onClick={() => handleRefuseCategoryRecommendations(catName)}
                  variant="outline"
                  size="sm"
                  rounded="md"
                  className="px-4 py-1.5 text-xs font-bold border-coral text-coral hover:bg-coral/5"
                >
                  Refuse suggestions
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
