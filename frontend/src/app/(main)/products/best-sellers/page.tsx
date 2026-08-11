"use client";

import React from "react";
import Link from "next/link";
import { DualTypeHeading } from "@/components/ui/DualTypeHeading";
import { ProductCard } from "@/components/cards/ProductCard";

const bestSellersList = [
  { id: "bs1", name: "Bugaboo Fox 5 Renew", price: 1299.00, imageUrl: "/images/prod-stroller.jpg" },
  { id: "bs2", name: "Stokke Tripp Trapp High Chair", price: 239.00, imageUrl: "/images/hero-1.jpg" },
  { id: "bs3", name: "BabyBjörn Baby Carrier Harmony", price: 190.00, imageUrl: "/images/hero-2.jpg" },
  { id: "bs4", name: "SnüzPod4 Bedside Crib", price: 219.00, imageUrl: "/images/hero-3.jpg" },
  { id: "bs5", name: "Purflo Changing Backpack", price: 65.00, imageUrl: "/images/hero-1.jpg" },
  { id: "bs6", name: "Lindex Organic Cotton Sleepsuit 3pk", price: 28.00, imageUrl: "/images/hero-2.jpg" },
];

export default function BestSellersPage() {
  return (
    <div className="w-full py-12 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-gray-light/30 pb-4">
        <div className="font-sans text-[11px] font-bold tracking-wider text-brown-dark/60 uppercase flex items-center gap-1.5 select-none">
          <Link href="/products" className="hover:text-coral transition-colors">
            Products
          </Link>
          <span>|</span>
          <span className="text-brown-dark">Best Sellers</span>
        </div>
        <DualTypeHeading tag="h1" className="text-3xl md:text-4xl font-light mt-1">
          Recommended & *Best Sellers*
        </DualTypeHeading>
        <p className="font-sans text-xs md:text-sm text-text-dark/70 max-w-xl leading-relaxed">
          Discover the top parent-approved products, recommended by maternity care experts and loved by thousands of families.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bestSellersList.map((prod) => (
          <ProductCard
            key={prod.id}
            name={prod.name}
            price={prod.price}
            imageUrl={prod.imageUrl}
            href={`/products/transport/pushchairs/${prod.id}`}
          />
        ))}
      </div>
    </div>
  );
}
