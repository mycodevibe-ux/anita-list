"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";

interface ProductItem {
  id: string;
  subcategory?: string;
  name: string;
  price: string;
  quantity: number;
  status: "To buy" | "Bought";
  imageUrl?: string;
  hasChatIcon?: boolean;
}

interface CategoryGroup {
  title: string;
  items: ProductItem[];
}

const initialCategoryGroups: CategoryGroup[] = [
  {
    title: "Transport",
    items: [
      { id: "t1", subcategory: "Pushchair", name: "Bugaboo Fox 5 Renew", price: "£00.00", quantity: 1, status: "To buy", imageUrl: "/images/banner4.jpg", hasChatIcon: true },
      { id: "t2", subcategory: "Rain cover", name: "Bugaboo Fox/Lynx/Cameleon high performance rain cover", price: "£00.00", quantity: 1, status: "Bought", imageUrl: "/images/baby-clothing.png" },
      { id: "t3", subcategory: "Changing bags", name: "Bugaboo Changing Backpack", price: "£00.00", quantity: 1, status: "To buy", imageUrl: "/images/bathing.png" },
    ],
  },
  {
    title: "Baby clothes",
    items: [
      { id: "c1", subcategory: "Lorem ipsum dolor", name: "Lorem ipsum dolor sit amet consectetur amet ipsum elit tellus sed phasellus", price: "£00.00", quantity: 1, status: "Bought", imageUrl: "/images/bedding.png" },
      { id: "c2", subcategory: "Lorem ipsum dolor", name: "Dolor sit amet consectetur", price: "£00.00", quantity: 1, status: "To buy", imageUrl: "/images/banner5.jpg" },
      { id: "c3", subcategory: "Lorem ipsum dolor", name: "Ipsum elit tellus sed phasellus", price: "£00.00", quantity: 1, status: "To buy", imageUrl: "/images/hero-1.jpg" },
    ],
  },
  {
    title: "Bathing",
    items: [
      { id: "b1", subcategory: "Lorem ipsum dolor", name: "Lorem ipsum dolor sit amet consectetur amet ipsum elit tellus sed phasellus", price: "£00.00", quantity: 1, status: "Bought", imageUrl: "/images/bathing.png" },
    ],
  },
  {
    title: "Bedding",
    items: [
      { id: "d1", subcategory: "Lorem ipsum dolor", name: "Lorem ipsum dolor sit amet consectetur amet ipsum elit tellus sed phasellus", price: "£00.00", quantity: 1, status: "Bought", imageUrl: "/images/bedding.png" },
      { id: "d2", subcategory: "Lorem ipsum dolor", name: "Dolor sit amet consectetur", price: "£00.00", quantity: 1, status: "To buy", imageUrl: "/images/banner4.jpg" },
      { id: "d3", subcategory: "Lorem ipsum dolor", name: "Ipsum elit tellus sed phasellus", price: "£00.00", quantity: 1, status: "To buy", imageUrl: "/images/hero-1.jpg" },
    ],
  },
  {
    title: "Cleaning",
    items: [
      { id: "cl1", subcategory: "Lorem ipsum dolor", name: "Lorem ipsum dolor sit amet consectetur amet ipsum elit tellus sed phasellus", price: "£00.00", quantity: 1, status: "Bought", imageUrl: "/images/banner5.jpg" },
    ],
  },
  {
    title: "Feeding and weaning",
    items: [
      { id: "f1", subcategory: "Lorem ipsum dolor", name: "Lorem ipsum dolor sit amet consectetur amet ipsum elit tellus sed phasellus", price: "£00.00", quantity: 1, status: "Bought", imageUrl: "/images/hero-1.jpg" },
    ],
  },
  {
    title: "Own list items",
    items: [
      { id: "o1", subcategory: "Lorem ipsum dolor", name: "Lorem ipsum dolor sit amet consectetur amet ipsum elit tellus sed phasellus", price: "£00.00", quantity: 1, status: "Bought", imageUrl: "/images/banner4.jpg" },
    ],
  },
];

export default function SingleRegistryDetail() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const registryId = (params.id as string) || "1";
  const mode = searchParams.get("mode") || "olive"; // olive = MY REGISTRY, gold = SHARED REGISTRY

  const isOwner = mode === "olive";

  const [registryTitle, setRegistryTitle] = useState("Dolor sit amet consectetur");
  const [editedDate, setEditedDate] = useState("11 June 2026");
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>(initialCategoryGroups);

  // Guest Registration Banner state (Step 9)
  const [showGuestBanner, setShowGuestBanner] = useState(!isOwner);

  const handleQuantityChange = (groupIdx: number, itemIdx: number, delta: number) => {
    if (!isOwner) return;
    setCategoryGroups((prev) =>
      prev.map((group, gIdx) => {
        if (gIdx !== groupIdx) return group;
        return {
          ...group,
          items: group.items.map((item, iIdx) => {
            if (iIdx !== itemIdx) return item;
            return { ...item, quantity: Math.max(1, item.quantity + delta) };
          }),
        };
      })
    );
  };

  const handleStatusChange = (groupIdx: number, itemIdx: number, newStatus: "To buy" | "Bought") => {
    setCategoryGroups((prev) =>
      prev.map((group, gIdx) => {
        if (gIdx !== groupIdx) return group;
        return {
          ...group,
          items: group.items.map((item, iIdx) => {
            if (iIdx !== itemIdx) return item;
            return { ...item, status: newStatus };
          }),
        };
      })
    );
  };

  const handleDeleteItem = (groupIdx: number, itemIdx: number) => {
    if (!isOwner) return;
    setCategoryGroups((prev) =>
      prev.map((group, gIdx) => {
        if (gIdx !== groupIdx) return group;
        return {
          ...group,
          items: group.items.filter((_, iIdx) => iIdx !== itemIdx),
        };
      })
    );
  };

  return (
    <div className="w-full bg-[#EBE7DF] py-10 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8 select-none">
        
        {/* Step 9 Guest Banner if invited guest */}
        {!isOwner && showGuestBanner && (
          <div className="bg-[#8B9A6B] text-white p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="font-sans text-xs font-semibold">
              🎁 You're viewing Anne's Shared Registry! Sign in to track gifts you purchase for Anne.
            </span>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-1.5 bg-[#C77065] text-white font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors text-decoration-none"
              >
                Sign In / Register
              </Link>
              <button
                onClick={() => setShowGuestBanner(false)}
                className="text-white font-bold text-sm bg-transparent border-none cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Top Section Header Row strictly matching Figma Screenshot 3 & Wireframe User Flow 3 */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            {/* Left: Back Button & Text Link */}
            <div className="flex items-center gap-3">
              <Link
                href="/hub/registries"
                className="w-[38px] h-[38px] bg-[#C77065] text-[#F8F8F2] flex items-center justify-center font-bold text-lg rounded-none hover:bg-[#b05d52] transition-colors text-decoration-none"
                aria-label="Back to My registries"
              >
                ‹
              </Link>
              <Link
                href="/hub/registries"
                className="font-sans text-xs font-semibold text-[#2D1A14] hover:text-[#C77065] transition-colors"
              >
                Back to My registries
              </Link>
            </div>

            {/* Right: Badge & Title */}
            <div className="flex flex-col items-end gap-0.5">
              <span className="font-sans text-[11px] font-bold tracking-widest text-[#2D1A14]/60 uppercase">
                {isOwner ? "MY REGISTRY" : "SHARED REGISTRY"}
              </span>
              <h1 className="font-accent text-3xl md:text-[44px] font-normal text-[#2D1A14] leading-tight">
                {registryTitle}
              </h1>
              <span className="font-sans text-xs text-[#2D1A14]/70">
                Edited {editedDate}
              </span>
            </div>
          </div>

          {/* Action Toolbar Row strictly matching Figma Screenshot 3 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-b border-[#CEBFA7]/40 py-4 mt-2">
            {/* Total Value */}
            <div className="font-accent text-xl md:text-2xl text-[#2D1A14]">
              Total: <span className="font-accent font-normal">£100.00</span>
            </div>

            {/* Toolbar Buttons matching Figma Screenshot 3 */}
            <div className="flex items-center gap-4 text-xs font-sans font-semibold text-[#2D1A14]">
              {isOwner && (
                <button
                  onClick={() => {
                    const newTitle = prompt("Enter new title:", registryTitle);
                    if (newTitle) setRegistryTitle(newTitle);
                  }}
                  className="flex flex-col items-center gap-1 hover:text-[#C77065] transition-colors border-none bg-transparent cursor-pointer"
                >
                  <span>✏️</span>
                  <span className="text-[11px]">Rename</span>
                </button>
              )}

              <button
                onClick={() => window.print()}
                className="flex flex-col items-center gap-1 hover:text-[#C77065] transition-colors border-none bg-transparent cursor-pointer"
              >
                <span>📥</span>
                <span className="text-[11px]">Download list</span>
              </button>

              {isOwner && (
                <button
                  onClick={() => alert("Custom item added!")}
                  className="flex flex-col items-center gap-1 hover:text-[#C77065] transition-colors border-none bg-transparent cursor-pointer"
                >
                  <span>➕</span>
                  <span className="text-[11px]">Add own item</span>
                </button>
              )}

              <button
                onClick={() => alert("Registry link copied to clipboard!")}
                className="flex flex-col items-center gap-1 hover:text-[#C77065] transition-colors border-none bg-transparent cursor-pointer"
              >
                <span>🔗</span>
                <span className="text-[11px]">Share registry</span>
              </button>

              {isOwner && (
                <button
                  onClick={() => {
                    if (confirm("Delete this registry?")) router.push("/hub/registries");
                  }}
                  className="flex flex-col items-center gap-1 text-[#C77065] hover:opacity-80 transition-opacity border-none bg-transparent cursor-pointer"
                >
                  <span>🗑️</span>
                  <span className="text-[11px]">Delete</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hero Banner Image strictly matching Figma Screenshot 3 */}
        <div className="w-full h-52 md:h-64 bg-[#D4C8B5] overflow-hidden relative">
          <img
            src="/images/banner4.jpg"
            alt="Registry Hero Banner"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/banner4.jpg';
            }}
          />
        </div>

        {/* Categorized Products Tables Grid strictly matching Figma Screenshot 3 */}
        <div className="flex flex-col gap-10">
          {categoryGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="flex flex-col gap-4">
              {/* Category Group Header Title */}
              <h2 className="font-accent text-2xl md:text-3xl font-normal text-[#2D1A14]">
                {group.title}
              </h2>

              {/* Table Column Labels Header */}
              <div className="grid grid-cols-12 px-4 py-2 text-[11px] font-sans font-bold tracking-widest text-[#2D1A14]/70 uppercase border-b border-[#CEBFA7]">
                <div className="col-span-5">PRODUCT</div>
                <div className="col-span-2 text-center">QUANTITY</div>
                <div className="col-span-2 text-center">AMOUNT</div>
                <div className="col-span-2 text-center">STATUS</div>
                <div className="col-span-1 text-right">PURCHASE</div>
              </div>

              {/* Products Rows */}
              <div className="flex flex-col gap-3">
                {group.items.map((item, itemIdx) => (
                  <div
                    key={item.id}
                    className="bg-[#EBE7DF] border border-[#CEBFA7] p-4 grid grid-cols-12 items-center gap-4 relative"
                  >
                    {/* Product Image & Info (Col 5) */}
                    <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                      {/* Image Placeholder Container */}
                      <div className="w-16 h-16 bg-[#D4C8B5] flex-shrink-0 relative overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/banner4.jpg';
                          }}
                        />
                        {item.hasChatIcon && (
                          <div className="absolute left-1 bottom-1 w-6 h-6 bg-[#8B9A6B] text-white flex items-center justify-center rounded text-[10px]">
                            💬
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-0.5 overflow-hidden">
                        {item.subcategory && (
                          <span className="font-sans text-[11px] text-[#2D1A14]/60">
                            {item.subcategory}
                          </span>
                        )}
                        <span className="font-accent text-base md:text-lg font-normal text-[#2D1A14] truncate">
                          {item.name}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controller (Col 2) */}
                    <div className="col-span-4 md:col-span-2 flex items-center justify-center">
                      {isOwner ? (
                        <div className="flex items-center border border-[#CEBFA7] bg-[#EBE7DF]">
                          <button
                            onClick={() => handleQuantityChange(groupIdx, itemIdx, -1)}
                            className="w-7 h-7 bg-[#8B9A6B] text-white flex items-center justify-center font-bold text-sm border-none cursor-pointer hover:bg-[#7a895b]"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 font-sans text-xs font-bold text-[#2D1A14]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(groupIdx, itemIdx, 1)}
                            className="w-7 h-7 bg-[#8B9A6B] text-white flex items-center justify-center font-bold text-sm border-none cursor-pointer hover:bg-[#7a895b]"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <span className="font-sans text-sm font-bold text-[#2D1A14]">
                          {item.quantity}
                        </span>
                      )}
                    </div>

                    {/* Amount (Col 2) */}
                    <div className="col-span-4 md:col-span-2 text-center font-accent text-base text-[#2D1A14]">
                      {item.price}
                    </div>

                    {/* Status Dropdown (Col 2) */}
                    <div className="col-span-4 md:col-span-2 flex justify-center">
                      <div className="relative">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(groupIdx, itemIdx, e.target.value as any)}
                          className="appearance-none bg-[#EBE7DF] border border-[#CEBFA7] px-3 py-1.5 pr-7 text-xs font-sans text-[#2D1A14] cursor-pointer focus:outline-none"
                        >
                          <option value="To buy">To buy</option>
                          <option value="Bought">Bought</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#2D1A14]">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Purchase Buy Button & Trash Column (Col 1) */}
                    <div className="col-span-12 md:col-span-1 flex items-center justify-end gap-3">
                      {item.status === "To buy" ? (
                        <Link
                          href="/products/transport/pushchairs/1"
                          className="px-4 py-1.5 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors text-decoration-none"
                        >
                          Buy
                        </Link>
                      ) : (
                        <div className="w-12" />
                      )}

                      {/* Right Trash Icon */}
                      {isOwner && (
                        <button
                          onClick={() => handleDeleteItem(groupIdx, itemIdx)}
                          className="p-1 text-[#2D1A14]/60 hover:text-[#C77065] transition-colors border-none bg-transparent cursor-pointer"
                          aria-label="Delete item"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
