"use client";

import React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/cards/ProductCard";

const recommendedProducts = [
  { id: "rec1", name: "Bugaboo Fox 5 Renew (Best Seller)", price: "£1,299.00", imageUrl: "/images/banner4.jpg", category: "transport", subcategory: "pushchairs" },
  { id: "rec2", name: "Stokke YOYO3 Lightweight Stroller", price: "£450.00", imageUrl: "/images/baby-clothing.png", category: "transport", subcategory: "pushchairs" },
  { id: "rec3", name: "BabyBjörn Baby Carrier Harmony", price: "£190.00", imageUrl: "/images/bathing.png", category: "transport", subcategory: "pushchairs" },
  { id: "rec4", name: "Bugaboo Dragonfly City Stroller", price: "£895.00", imageUrl: "/images/bedding.png", category: "transport", subcategory: "pushchairs" },
  { id: "rec5", name: "Stokke Tripp Trapp High Chair", price: "£239.00", imageUrl: "/images/banner5.jpg", category: "nursery", subcategory: "furniture" },
  { id: "rec6", name: "BabyBjörn Bouncer Bliss Mesh", price: "£185.00", imageUrl: "/images/hero-1.jpg", category: "nursery", subcategory: "bouncers" },
];

export default function RecommendedBestSellers() {
  return (
    <div className="w-full bg-[#EBE7DF] py-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
        
        {/* Breadcrumb & Title */}
        <div className="flex flex-col gap-2 border-b border-[#CEBFA7]/40 pb-6">
          <div className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase flex items-center gap-2 select-none">
            <Link href="/products" className="hover:text-[#C77065] transition-colors">
              PRODUCTS
            </Link>
            <span>|</span>
            <span className="text-[#2D1A14]">RECOMMENDED & BEST SELLERS</span>
          </div>

          <h1 className="font-accent text-4xl md:text-[48px] text-[#2D1A14] font-normal leading-tight">
            Recommended <span className="font-accent italic">& best sellers</span>
          </h1>
          <p className="font-sans text-sm text-[#2D1A14]/80 max-w-2xl leading-relaxed mt-1">
            Explore our curated selection of top-rated, expert-approved baby essentials shortlisted by Anita based on decades of trusted expertise.
          </p>
        </div>

        {/* Recommended Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              name={prod.name}
              price={prod.price}
              imageUrl={prod.imageUrl}
              href={`/products/${prod.category}/${prod.subcategory}/${prod.id}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
