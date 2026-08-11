"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";

interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string;
}

const defaultCategories: Category[] = [
  // Page 1
  { id: 1, name: "Baby clothing", slug: "baby-clothing", image_url: "/images/baby-clothing.png" },
  { id: 2, name: "Bathing", slug: "bathing", image_url: "/images/bathing.png" },
  { id: 3, name: "Bedding", slug: "bedding", image_url: "/images/bedding.png" },
  // Page 2
  { id: 4, name: "Transport", slug: "transport", image_url: "/images/banner4.jpg" },
  { id: 5, name: "Nursery & Furniture", slug: "nursery", image_url: "/images/banner5.jpg" },
  { id: 6, name: "Toys & Play", slug: "toys-play", image_url: "/images/hero-1.jpg" },
  // Page 3
  { id: 7, name: "Feeding & Weaning", slug: "feeding-weaning", image_url: "/images/baby-clothing.png" },
  { id: 8, name: "Cleaning", slug: "cleaning", image_url: "/images/bathing.png" },
  { id: 9, name: "Monitors", slug: "monitors", image_url: "/images/bedding.png" },
  // Page 4
  { id: 10, name: "Mothers", slug: "mothers", image_url: "/images/banner4.jpg" },
  { id: 11, name: "Nappies & Lotions", slug: "nappies-lotions", image_url: "/images/banner5.jpg" },
  { id: 12, name: "Travel Essentials", slug: "travel", image_url: "/images/hero-1.jpg" },
];

export const CategoryCarousel: React.FC = () => {
  const [categoriesData, setCategoriesData] = useState<Category[]>(defaultCategories);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        if (response.data && response.data.length >= 12) {
          const merged = response.data.map((item: Category, index: number) => ({
            ...item,
            image_url: item.image_url && item.image_url.startsWith('http') 
              ? item.image_url 
              : defaultCategories[index % defaultCategories.length].image_url
          }));
          setCategoriesData(merged);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  // Split categories into 4 pages of 3 items each
  const pages = [
    categoriesData.slice(0, 3),
    categoriesData.slice(3, 6),
    categoriesData.slice(6, 9),
    categoriesData.slice(9, 12),
  ];

  // Auto-slide timer switching between 4 pages
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % pages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [pages.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? pages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % pages.length);
  };

  return (
    <section className="w-full bg-[#EBE7DF] py-16 px-6 md:px-12 lg:px-16 border-t border-b border-[#CEBFA7]">
      <div className="max-w-[1440px] mx-auto">
        {/* Top Header Row */}
        <div className="flex justify-between items-center mb-8">
          <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
            PRODUCT CATEGORIES
          </span>

          <div className="flex items-center gap-6">
            {/* Page Indicators (1 2 3 4) */}
            <div className="flex gap-3 text-xs font-medium text-[#2D1A14]">
              {[1, 2, 3, 4].map((num, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`cursor-pointer transition-colors border-none bg-transparent ${
                    i === currentSlide ? 'font-bold text-[#2D1A14] border-b-2 border-[#2D1A14]' : 'text-[#2D1A14]/50 hover:text-[#2D1A14]'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Navigation Arrows (< >) */}
            <div className="flex gap-1.5">
              <button
                onClick={handlePrev}
                className="w-7 h-7 bg-[#C77065] text-[#F8F8F2] flex items-center justify-center hover:bg-[#b05d52] transition-colors cursor-pointer border-none"
                aria-label="Previous categories"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="w-7 h-7 bg-[#C77065] text-[#F8F8F2] flex items-center justify-center hover:bg-[#b05d52] transition-colors cursor-pointer border-none"
                aria-label="Next categories"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Categories Cards Track: 3 cards per page */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {pages.map((pageItems, pageIdx) => (
              <div key={pageIdx} className="w-full min-w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pageItems.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products/transport`}
                    className="h-[520px] relative group overflow-hidden bg-[#E2DED5] block text-decoration-none"
                  >
                    {/* Category Image */}
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/baby-clothing.png';
                      }}
                    />

                    {/* Bottom Overlay Text */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#EBE7DF]/90 via-[#EBE7DF]/40 to-transparent p-6 pt-16 flex justify-between items-end z-10 pointer-events-none">
                      <span className="font-accent text-2xl md:text-[28px] font-normal text-[#2D1A14]">
                        {cat.name}
                      </span>
                    </div>

                    {/* Coral Arrow Button Badge at right-0 bottom-0 */}
                    <div className="absolute right-0 bottom-0 bg-[#C77065] text-[#F8F8F2] w-[33px] h-[33px] flex items-center justify-center group-hover:scale-105 transition-transform z-20">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
