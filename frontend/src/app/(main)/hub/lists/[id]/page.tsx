"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface ProductItem {
  id: string;
  subcategory?: string;
  name: string;
  price: string;
  quantity: number;
  status: "To buy" | "Bought";
  imageUrl?: string;
  hasChatIcon?: boolean;
  isEssential?: boolean; // Step 22: Essential vs Optional items
  customUrl?: string; // Step 28: Custom product link
}

interface CategoryGroup {
  title: string;
  items: ProductItem[];
}

const initialCategoryGroups: CategoryGroup[] = [
  {
    title: "Transport",
    items: [
      { id: "t1", subcategory: "Pushchair", name: "Bugaboo Fox 5 Renew", price: "£1,299.00", quantity: 1, status: "To buy", imageUrl: "/images/banner4.jpg", hasChatIcon: true, isEssential: true },
      { id: "t2", subcategory: "Rain cover", name: "Bugaboo Fox/Lynx/Cameleon high performance rain cover", price: "£45.00", quantity: 1, status: "Bought", imageUrl: "/images/baby-clothing.png", isEssential: false },
      { id: "t3", subcategory: "Changing bags", name: "Bugaboo Changing Backpack", price: "£135.00", quantity: 1, status: "To buy", imageUrl: "/images/bathing.png", isEssential: false },
    ],
  },
  {
    title: "Baby clothes",
    items: [
      { id: "c1", subcategory: "Newborn Sleepsuits", name: "Organic Cotton Newborn Sleepsuit Set (Pack of 3)", price: "£28.00", quantity: 1, status: "Bought", imageUrl: "/images/bedding.png", isEssential: true },
      { id: "c2", subcategory: "Scratch Mittens", name: "Soft Cotton Scratch Mittens", price: "£8.00", quantity: 1, status: "To buy", imageUrl: "/images/banner5.jpg", isEssential: true },
      { id: "c3", subcategory: "Sun Hat", name: "UV Protective Baby Sun Hat", price: "£12.00", quantity: 1, status: "To buy", imageUrl: "/images/hero-1.jpg", isEssential: false },
    ],
  },
  {
    title: "Bathing",
    items: [
      { id: "b1", subcategory: "Baby Bath", name: "Shnuggle Baby Bath with Foam Backrest", price: "£32.00", quantity: 1, status: "Bought", imageUrl: "/images/bathing.png", isEssential: true },
    ],
  },
  {
    title: "Bedding",
    items: [
      { id: "d1", subcategory: "Moses Basket", name: "Clair de Lune Palm Moses Basket", price: "£75.00", quantity: 1, status: "Bought", imageUrl: "/images/bedding.png", isEssential: true },
      { id: "d2", subcategory: "Fitted Sheets", name: "Organic Cotton Fitted Crib Sheets (Pack of 2)", price: "£22.00", quantity: 1, status: "To buy", imageUrl: "/images/banner4.jpg", isEssential: true },
      { id: "d3", subcategory: "Sleeping Bag", name: "Tommee Tippee Grobag 1.0 Tog", price: "£34.00", quantity: 1, status: "To buy", imageUrl: "/images/hero-1.jpg", isEssential: false },
    ],
  },
  {
    title: "Cleaning",
    items: [
      { id: "cl1", subcategory: "Sterilizer", name: "Tommee Tippee Electric Steam Sterilizer", price: "£69.00", quantity: 1, status: "Bought", imageUrl: "/images/banner5.jpg", isEssential: true },
    ],
  },
  {
    title: "Feeding and weaning",
    items: [
      { id: "f1", subcategory: "Bottles", name: "Philips Avent Natural Response Bottles (Pack of 4)", price: "£30.00", quantity: 1, status: "Bought", imageUrl: "/images/hero-1.jpg", isEssential: true },
    ],
  },
  {
    title: "Own list items",
    items: [
      { id: "o1", subcategory: "Custom Item", name: "Handmade Wooden Baby Teether", price: "£15.00", quantity: 1, status: "Bought", imageUrl: "/images/banner4.jpg", isEssential: false, customUrl: "https://www.etsy.com" },
    ],
  },
];

export default function SingleListDetail() {
  const params = useParams();
  const router = useRouter();

  const listId = (params.id as string) || "1";

  const [listTitle, setListTitle] = useState("Dolor sit amet consectetur");
  const [editedDate, setEditedDate] = useState("11 June 2026");
  const [statusFilter, setStatusFilter] = useState<"All" | "To buy" | "Bought">("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>(initialCategoryGroups);

  // Step 24: Delete Item Confirmation Modal State
  const [itemToDelete, setItemToDelete] = useState<{ gIdx: number; iIdx: number; name: string } | null>(null);

  // Step 25: Affiliate Buying Options Pop-up Modal State
  const [selectedBuyItem, setSelectedBuyItem] = useState<ProductItem | null>(null);

  // Step 26 & 27: Add Custom Item Modal State
  const [isCustomItemModalOpen, setIsCustomItemModalOpen] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [customUrl, setCustomUrl] = useState("");

  // User Flow 8: Turn into Registry Multi-Step Wizard Modal State
  const [isRegistryWizardOpen, setIsRegistryWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [regName, setRegName] = useState(listTitle);
  const [regAddress, setRegAddress] = useState("");
  const [regPostcode, setRegPostcode] = useState("");
  const [regEmailInvite, setRegEmailInvite] = useState("");

  const handleQuantityChange = (groupIdx: number, itemIdx: number, delta: number) => {
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

  const confirmDeleteItem = () => {
    if (!itemToDelete) return;
    const { gIdx, iIdx } = itemToDelete;
    setCategoryGroups((prev) =>
      prev.map((group, groupIdx) => {
        if (groupIdx !== gIdx) return group;
        return {
          ...group,
          items: group.items.filter((_, itemIdx) => itemIdx !== iIdx),
        };
      })
    );
    setItemToDelete(null);
  };

  const handleAddCustomItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newItem: ProductItem = {
      id: Date.now().toString(),
      subcategory: "Custom Item",
      name: customName,
      price: customPrice.startsWith("£") ? customPrice : `£${customPrice || "0.00"}`,
      quantity: 1,
      status: "To buy",
      imageUrl: "/images/banner4.jpg",
      isEssential: false,
      customUrl: customUrl || undefined,
    };

    setCategoryGroups((prev) =>
      prev.map((group) => {
        if (group.title !== "Own list items") return group;
        return {
          ...group,
          items: [...group.items, newItem],
        };
      })
    );

    setCustomName("");
    setCustomPrice("");
    setCustomUrl("");
    setIsCustomItemModalOpen(false);
  };

  const handleRenameList = () => {
    const newName = prompt("Enter new list name:", listTitle);
    if (newName) setListTitle(newName);
  };

  const handleCompleteRegistryWizard = () => {
    setIsRegistryWizardOpen(false);
    router.push("/hub/registries/1");
  };

  const handleDeleteList = () => {
    if (confirm("Are you sure you want to delete this list?")) {
      router.push("/hub/lists");
    }
  };

  return (
    <div className="w-full bg-[#EBE7DF] py-10 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8 select-none">
        
        {/* Top Section Header Row strictly matching Figma Screenshot 1 */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            {/* Left: Back Button & Text Link */}
            <div className="flex items-center gap-3">
              <Link
                href="/hub/lists"
                className="w-[38px] h-[38px] bg-[#C77065] text-[#F8F8F2] flex items-center justify-center font-bold text-lg rounded-none hover:bg-[#b05d52] transition-colors text-decoration-none"
                aria-label="Back to My lists"
              >
                ‹
              </Link>
              <Link
                href="/hub/lists"
                className="font-sans text-xs font-semibold text-[#2D1A14] hover:text-[#C77065] transition-colors"
              >
                Back to My lists
              </Link>
            </div>

            {/* Right: Badge & Title */}
            <div className="flex flex-col items-end gap-0.5">
              <span className="font-sans text-[11px] font-bold tracking-widest text-[#2D1A14]/60 uppercase">
                STANDARD LIST
              </span>
              <h1 className="font-accent text-3xl md:text-[44px] font-normal text-[#2D1A14] leading-tight">
                {listTitle}
              </h1>
              <span className="font-sans text-xs text-[#2D1A14]/70">
                Edited {editedDate}
              </span>
            </div>
          </div>

          {/* Progress Tracker & Spend Tracker Header Bar */}
          <div className="bg-[#EBE7DF] border border-[#CEBFA7] p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col gap-1 w-full sm:w-1/2">
              <div className="flex justify-between text-xs font-sans font-bold text-[#2D1A14]">
                <span>LIST PROGRESS</span>
                <span>40% COMPLETE</span>
              </div>
              <div className="w-full bg-[#CEBFA7]/40 h-2.5 rounded-none overflow-hidden">
                <div className="bg-[#D4A359] h-full w-[40%]" />
              </div>
            </div>

            <div className="font-accent text-xl md:text-2xl text-[#2D1A14]">
              Total: <span className="font-accent font-normal">£1,235.43</span>
            </div>
          </div>

          {/* Action Toolbar Row strictly matching Figma Screenshot 1 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-b border-[#CEBFA7]/40 py-4 mt-1">
            {/* Filter Dropdowns (Category + Status Filter Step 23) */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs font-semibold text-[#2D1A14]">Filter:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-[#EBE7DF] border border-[#CEBFA7] px-3 py-1.5 text-xs font-sans text-[#2D1A14] cursor-pointer focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Transport">Transport</option>
                  <option value="Baby clothes">Baby clothes</option>
                  <option value="Bathing">Bathing</option>
                  <option value="Bedding">Bedding</option>
                  <option value="Own list items">Own list items</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="bg-[#EBE7DF] border border-[#CEBFA7] px-3 py-1.5 text-xs font-sans text-[#2D1A14] cursor-pointer focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="To buy">Still to buy</option>
                  <option value="Bought">Bought</option>
                </select>
              </div>
            </div>

            {/* Toolbar Buttons matching Figma Screenshot 1 */}
            <div className="flex items-center gap-4 text-xs font-sans font-semibold text-[#2D1A14]">
              <button
                onClick={handleRenameList}
                className="flex flex-col items-center gap-1 hover:text-[#C77065] transition-colors border-none bg-transparent cursor-pointer"
              >
                <span>✏️</span>
                <span className="text-[11px]">Rename</span>
              </button>

              <button
                onClick={() => window.print()}
                className="flex flex-col items-center gap-1 hover:text-[#C77065] transition-colors border-none bg-transparent cursor-pointer"
              >
                <span>📥</span>
                <span className="text-[11px]">Download list</span>
              </button>

              {/* Step 26: Add Your Own Item Button */}
              <button
                onClick={() => setIsCustomItemModalOpen(true)}
                className="flex flex-col items-center gap-1 hover:text-[#C77065] transition-colors border-none bg-transparent cursor-pointer"
              >
                <span>➕</span>
                <span className="text-[11px]">Add own item</span>
              </button>

              {/* User Flow 8: Turn into Registry Trigger */}
              <button
                onClick={() => {
                  setWizardStep(1);
                  setIsRegistryWizardOpen(true);
                }}
                className="flex flex-col items-center gap-1 hover:text-[#C77065] transition-colors border-none bg-transparent cursor-pointer"
              >
                <span>📋</span>
                <span className="text-[11px]">Turn into registry</span>
              </button>

              <button
                onClick={handleDeleteList}
                className="flex flex-col items-center gap-1 text-[#C77065] hover:opacity-80 transition-opacity border-none bg-transparent cursor-pointer"
              >
                <span>🗑️</span>
                <span className="text-[11px]">Delete</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Banner Image strictly matching Figma Screenshot 1 */}
        <div className="w-full h-52 md:h-64 bg-[#D4C8B5] overflow-hidden relative">
          <img
            src="/images/banner4.jpg"
            alt="List Hero Banner"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Categorized Products Tables Grid strictly matching Figma Screenshot 1 */}
        <div className="flex flex-col gap-10">
          {categoryGroups
            .filter((g) => categoryFilter === "All" || g.title === categoryFilter)
            .map((group, groupIdx) => {
              const filteredItems = group.items.filter(
                (item) => statusFilter === "All" || item.status === statusFilter
              );

              if (filteredItems.length === 0) return null;

              return (
                <div key={groupIdx} className="flex flex-col gap-4">
                  {/* Category Group Header Title */}
                  <div className="flex justify-between items-center">
                    <h2 className="font-accent text-2xl md:text-3xl font-normal text-[#2D1A14]">
                      {group.title}
                    </h2>

                    <Link
                      href={`/products/${group.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="px-4 py-1.5 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors text-decoration-none"
                    >
                      Browse {group.title}
                    </Link>
                  </div>

                  {/* Table Column Labels Header */}
                  <div className="grid grid-cols-12 px-4 py-2 text-[11px] font-sans font-bold tracking-widest text-[#2D1A14]/70 uppercase border-b border-[#CEBFA7]">
                    <div className="col-span-5">PRODUCT</div>
                    <div className="col-span-2 text-center">QUANTITY</div>
                    <div className="col-span-2 text-center">AMOUNT</div>
                    <div className="col-span-2 text-center">STATUS</div>
                    <div className="col-span-1 text-right">ACTION</div>
                  </div>

                  {/* Products Rows */}
                  <div className="flex flex-col gap-3">
                    {filteredItems.map((item, itemIdx) => (
                      <div
                        key={item.id}
                        className="bg-[#EBE7DF] border border-[#CEBFA7] p-4 grid grid-cols-12 items-center gap-4 relative"
                      >
                        {/* Product Image & Info (Col 5) */}
                        <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                          <div className="w-16 h-16 bg-[#D4C8B5] flex-shrink-0 relative overflow-hidden">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            {item.hasChatIcon && (
                              <div className="absolute left-1 bottom-1 w-6 h-6 bg-[#8B9A6B] text-white flex items-center justify-center rounded text-[10px]">
                                💬
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-0.5 overflow-hidden">
                            <div className="flex items-center gap-2">
                              {item.subcategory && (
                                <span className="font-sans text-[11px] text-[#2D1A14]/60">
                                  {item.subcategory}
                                </span>
                              )}
                              {/* Step 22: Essential vs Optional Badge */}
                              {item.isEssential !== undefined && (
                                <span
                                  className={`text-[9px] font-sans font-bold uppercase px-1.5 py-0.5 ${
                                    item.isEssential
                                      ? "bg-[#8B9A6B] text-white"
                                      : "bg-[#CEBFA7]/40 text-[#2D1A14]"
                                  }`}
                                >
                                  {item.isEssential ? "Essential" : "Optional"}
                                </span>
                              )}
                            </div>
                            <span className="font-accent text-base md:text-lg font-normal text-[#2D1A14] truncate">
                              {item.name}
                            </span>
                            {/* Step 28: Custom Product URL Link */}
                            {item.customUrl && (
                              <a
                                href={item.customUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-sans text-[10px] text-[#C77065] hover:underline truncate"
                              >
                                🔗 {item.customUrl}
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controller (Col 2) */}
                        <div className="col-span-4 md:col-span-2 flex items-center justify-center">
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

                        {/* Purchase Buy Button & Trash Delete Column Step 24 & 25 */}
                        <div className="col-span-12 md:col-span-1 flex items-center justify-end gap-3">
                          {item.status === "To buy" ? (
                            <button
                              onClick={() => setSelectedBuyItem(item)}
                              className="px-4 py-1.5 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer"
                            >
                              Buy
                            </button>
                          ) : (
                            <div className="w-12" />
                          )}

                          {/* Right Trash Icon with Confirmation Modal Trigger (Step 24) */}
                          <button
                            onClick={() => setItemToDelete({ gIdx: groupIdx, iIdx: itemIdx, name: item.name })}
                            className="p-1 text-[#2D1A14]/60 hover:text-[#C77065] transition-colors border-none bg-transparent cursor-pointer"
                            aria-label="Delete item"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

      </div>

      {/* POP-UP MODAL: User Flow 8 "Turn into Registry" Multi-Step Wizard Modal */}
      {isRegistryWizardOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#EBE7DF] border border-[#CEBFA7] w-full max-w-md p-6 flex flex-col gap-5 shadow-2xl relative select-none">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-[#CEBFA7]/40 pb-3">
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[10px] font-bold tracking-widest text-[#8B9A6B] uppercase">
                  STEP {wizardStep} OF 3
                </span>
                <h3 className="font-accent text-2xl font-normal text-[#2D1A14]">
                  {wizardStep === 1 && "Name your registry"}
                  {wizardStep === 2 && "Add address details"}
                  {wizardStep === 3 && "Share your registry"}
                </h3>
              </div>
              <button
                onClick={() => setIsRegistryWizardOpen(false)}
                className="text-[#2D1A14] font-bold text-lg border-none bg-transparent cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Step 1: Registry Name & Banner */}
            {wizardStep === 1 && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
                    Registry Title
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                    className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs font-sans text-[#2D1A14] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
                    Upload Banner Image (Optional)
                  </label>
                  <div className="border border-dashed border-[#CEBFA7] p-4 text-center text-xs font-sans text-[#2D1A14]/70 bg-white/40">
                    📷 Drag and drop cover photo or click to browse
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setWizardStep(2)}
                  className="w-full py-3 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer mt-2"
                >
                  Continue to Address Details →
                </button>
              </div>
            )}

            {/* Step 2: Delivery Address Details */}
            {wizardStep === 2 && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
                    Shipping Address Line 1
                  </label>
                  <input
                    type="text"
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    placeholder="123 Kensington High St"
                    required
                    className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs font-sans text-[#2D1A14] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
                    Postcode
                  </label>
                  <input
                    type="text"
                    value={regPostcode}
                    onChange={(e) => setRegPostcode(e.target.value)}
                    placeholder="W8 5SA"
                    required
                    className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs font-sans text-[#2D1A14] focus:outline-none"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    className="px-4 py-2 bg-transparent text-[#2D1A14] font-sans text-xs font-semibold hover:underline border-none cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setWizardStep(3)}
                    className="px-6 py-2.5 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer"
                  >
                    Save Address →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Share Options & Confirm */}
            {wizardStep === 3 && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
                    Invite Guests by Email
                  </label>
                  <input
                    type="email"
                    value={regEmailInvite}
                    onChange={(e) => setRegEmailInvite(e.target.value)}
                    placeholder="friend@example.com"
                    className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs font-sans text-[#2D1A14] focus:outline-none"
                  />
                </div>

                <div className="bg-white p-3 border border-[#CEBFA7] flex justify-between items-center">
                  <span className="font-sans text-xs text-[#2D1A14] truncate">https://anitaslist.com/hub/registries/1</span>
                  <button
                    type="button"
                    onClick={() => alert("Registry link copied!")}
                    className="px-3 py-1 bg-[#8B9A6B] text-white font-sans text-[11px] font-bold border-none cursor-pointer"
                  >
                    Copy Link
                  </button>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="px-4 py-2 bg-transparent text-[#2D1A14] font-sans text-xs font-semibold hover:underline border-none cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleCompleteRegistryWizard}
                    className="px-6 py-2.5 bg-[#8B9A6B] text-white font-accent text-xs font-medium rounded-none hover:bg-[#7a895b] transition-colors border-none cursor-pointer"
                  >
                    View New Registry ✨
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* POP-UP MODAL: Step 27 Add Custom Item Pop-up Window */}
      {isCustomItemModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#EBE7DF] border border-[#CEBFA7] w-full max-w-md p-6 flex flex-col gap-5 shadow-2xl relative select-none">
            <div className="flex justify-between items-center border-b border-[#CEBFA7]/40 pb-3">
              <h3 className="font-accent text-2xl font-normal text-[#2D1A14]">Add custom item</h3>
              <button
                onClick={() => setIsCustomItemModalOpen(false)}
                className="text-[#2D1A14] font-bold text-lg border-none bg-transparent cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustomItemSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
                  Product Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Handmade Woolen Baby Blanket"
                  required
                  className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs font-sans text-[#2D1A14] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
                  Amount (£)
                </label>
                <input
                  type="text"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  placeholder="e.g. £35.00"
                  className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs font-sans text-[#2D1A14] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
                  Product Link (URL)
                </label>
                <input
                  type="url"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://www.etsy.com/listing/..."
                  className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs font-sans text-[#2D1A14] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCustomItemModalOpen(false)}
                  className="px-5 py-2.5 bg-transparent text-[#2D1A14] font-sans text-xs font-semibold hover:underline border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer"
                >
                  Add custom item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POP-UP MODAL: Step 24 Delete Item Confirmation */}
      {itemToDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#EBE7DF] border border-[#CEBFA7] w-full max-w-sm p-6 flex flex-col gap-4 shadow-2xl text-center select-none">
            <h3 className="font-accent text-2xl font-normal text-[#2D1A14]">Remove item?</h3>
            <p className="font-sans text-xs text-[#2D1A14]/80 leading-relaxed">
              Are you sure you want to remove <strong className="text-[#2D1A14]">"{itemToDelete.name}"</strong> from your list?
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-5 py-2.5 bg-[#EBE7DF] border border-[#CEBFA7] text-[#2D1A14] font-sans text-xs font-semibold hover:bg-[#CEBFA7]/30 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteItem}
                className="px-6 py-2.5 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP MODAL: Step 25 Affiliate Buying Options */}
      {selectedBuyItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#EBE7DF] border border-[#CEBFA7] w-full max-w-md p-6 flex flex-col gap-5 shadow-2xl relative select-none">
            <div className="flex justify-between items-center border-b border-[#CEBFA7]/40 pb-3">
              <h3 className="font-accent text-2xl font-normal text-[#2D1A14]">Buying options</h3>
              <button
                onClick={() => setSelectedBuyItem(null)}
                className="text-[#2D1A14] font-bold text-lg border-none bg-transparent cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-3 bg-white p-3 border border-[#CEBFA7]">
              <img src={selectedBuyItem.imageUrl} alt={selectedBuyItem.name} className="w-12 h-12 object-cover bg-[#D4C8B5]" />
              <div className="flex flex-col gap-0.5 overflow-hidden">
                <span className="font-accent text-sm font-normal text-[#2D1A14] truncate">{selectedBuyItem.name}</span>
                <span className="font-sans text-xs font-bold text-[#C77065]">{selectedBuyItem.price}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
                AVAILABLE RETAILERS:
              </span>

              <a
                href={selectedBuyItem.customUrl || "https://www.johnlewis.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-[#CEBFA7] p-3 flex justify-between items-center text-decoration-none text-[#2D1A14] hover:border-[#C77065] transition-colors"
              >
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-bold">
                    {selectedBuyItem.customUrl ? "Custom Merchant / Link" : "John Lewis & Partners"}
                  </span>
                  <span className="font-sans text-[10px] text-[#8B9A6B]">In Stock • Direct Delivery</span>
                </div>
                <span className="px-4 py-1.5 bg-[#C77065] text-white font-accent text-xs font-medium">
                  Buy now ({selectedBuyItem.price})
                </span>
              </a>

              {!selectedBuyItem.customUrl && (
                <>
                  <a
                    href="https://www.amazon.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-[#CEBFA7] p-3 flex justify-between items-center text-decoration-none text-[#2D1A14] hover:border-[#C77065] transition-colors"
                  >
                    <div className="flex flex-col">
                      <span className="font-sans text-xs font-bold">Amazon UK</span>
                      <span className="font-sans text-[10px] text-[#8B9A6B]">In Stock • Prime Shipping</span>
                    </div>
                    <span className="px-4 py-1.5 bg-[#C77065] text-white font-accent text-xs font-medium">
                      Buy now (£1,289.00)
                    </span>
                  </a>

                  <a
                    href="https://www.bugaboo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-[#CEBFA7] p-3 flex justify-between items-center text-decoration-none text-[#2D1A14] hover:border-[#C77065] transition-colors"
                  >
                    <div className="flex flex-col">
                      <span className="font-sans text-xs font-bold">Official Brand Store</span>
                      <span className="font-sans text-[10px] text-[#8B9A6B]">In Stock • Official Warranty</span>
                    </div>
                    <span className="px-4 py-1.5 bg-[#C77065] text-white font-accent text-xs font-medium">
                      Buy now ({selectedBuyItem.price})
                    </span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
