"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CategoryAccordion, CategoryItem } from "@/components/products/CategoryAccordion";
import { ProductCard } from "@/components/cards/ProductCard";

// Sidebar categories list strictly matching Figma design
const mockSidebarCategories: CategoryItem[] = [
  { name: "Baby clothing", slug: "baby-clothing", subcategories: [] },
  { name: "Bedding", slug: "bedding", subcategories: [] },
  { name: "Cleaning", slug: "cleaning", subcategories: [] },
  { name: "Feeding & weaning", slug: "feeding-weaning", subcategories: [] },
  { name: "Monitors", slug: "monitors", subcategories: [] },
  { name: "Mothers", slug: "mothers", subcategories: [] },
  { name: "Nappies & lotions", slug: "nappies-lotions", subcategories: [] },
  { name: "Nursery", slug: "nursery", subcategories: [] },
  { name: "Toys & play", slug: "toys-play", subcategories: [] },
  { name: "Travel", slug: "travel", subcategories: [] },
  {
    name: "Transport",
    slug: "transport",
    subcategories: [
      { name: "Newborn car seats", slug: "newborn-car-seats" },
      { name: "Car seat bases", slug: "car-seat-bases" },
      { name: "Car seat accessories", slug: "car-seat-accessories" },
      { name: "Pushchairs", slug: "pushchairs" },
      { name: "Carrycots and seats", slug: "carrycots-seats" },
      { name: "Pushchair Accessories", slug: "pushchair-accessories" },
      { name: "Rain covers", slug: "rain-covers" },
      { name: "Mosquito nets", slug: "mosquito-nets" },
      { name: "Footmuffs", slug: "footmuffs" },
      { name: "Sheepskin liners", slug: "sheepskin-liners" },
      { name: "Liners & snugglers", slug: "liners-snugglers" },
    ],
  },
];

// Rich Product Database populating pages and detail view
const allProductsData = [
  // Page 1 Items
  { id: "1", name: "Bugaboo Fox 5 Renew", price: "£00.00", rawPrice: 1299, brand: "bugaboo", imageUrl: "/images/banner4.jpg", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id. Tellus auctor risus pharetra sem. Neque lectus rhoncus lacinia non diam velit malesuada vel." },
  { id: "2", name: "Stokke YOYO3 Lightweight Stroller", price: "£00.00", rawPrice: 450, brand: "stokke", imageUrl: "/images/baby-clothing.png", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id. Tellus auctor risus pharetra sem. Neque lectus rhoncus lacinia non diam velit malesuada vel." },
  { id: "3", name: "BabyBjörn Baby Carrier Harmony", price: "£00.00", rawPrice: 190, brand: "babybjorn", imageUrl: "/images/bathing.png", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id. Tellus auctor risus pharetra sem." },
  { id: "4", name: "Bugaboo Dragonfly City Stroller", price: "£00.00", rawPrice: 895, brand: "bugaboo", imageUrl: "/images/bedding.png", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id. Tellus auctor risus pharetra sem." },
  { id: "5", name: "Stokke Tripp Trapp High Chair", price: "£00.00", rawPrice: 239, brand: "stokke", imageUrl: "/images/banner5.jpg", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id." },
  { id: "6", name: "BabyBjörn Bouncer Bliss Mesh", price: "£00.00", rawPrice: 185, brand: "babybjorn", imageUrl: "/images/hero-1.jpg", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id." },

  // Page 2 Items
  { id: "7", name: "Bugaboo Fox 5 Renew (Sage Green)", price: "£00.00", rawPrice: 1299, brand: "bugaboo", imageUrl: "/images/banner4.jpg", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id." },
  { id: "8", name: "Stokke Sleepi Bed V3", price: "£00.00", rawPrice: 699, brand: "stokke", imageUrl: "/images/baby-clothing.png", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id." },
  { id: "9", name: "BabyBjörn Travel Cot Easy Go", price: "£00.00", rawPrice: 250, brand: "babybjorn", imageUrl: "/images/bathing.png", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id." },
  { id: "10", name: "Bugaboo Butterfly Compact Stroller", price: "£00.00", rawPrice: 399, brand: "bugaboo", imageUrl: "/images/bedding.png", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id." },
  { id: "11", name: "Stokke Flexi Bath Bundle", price: "£00.00", rawPrice: 65, brand: "stokke", imageUrl: "/images/banner5.jpg", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id." },
  { id: "12", name: "BabyBjörn Smart Potty", price: "£00.00", rawPrice: 32, brand: "babybjorn", imageUrl: "/images/hero-1.jpg", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id." },

  // Page 3 Items
  { id: "13", name: "Bugaboo Donkey 5 Duo Twin Stroller", price: "£00.00", rawPrice: 1549, brand: "bugaboo", imageUrl: "/images/banner4.jpg", description: "Lorem ipsum dolor sit amet consectetur." },
  { id: "14", name: "Stokke Xplory X Signature Pushchair", price: "£00.00", rawPrice: 1199, brand: "stokke", imageUrl: "/images/baby-clothing.png", description: "Lorem ipsum dolor sit amet consectetur." },
  { id: "15", name: "BabyBjörn Carrier Mini Cotton", price: "£00.00", rawPrice: 95, brand: "babybjorn", imageUrl: "/images/bathing.png", description: "Lorem ipsum dolor sit amet consectetur." },
  { id: "16", name: "Bugaboo Turtle Air by Nuna Car Seat", price: "£00.00", rawPrice: 219, brand: "bugaboo", imageUrl: "/images/bedding.png", description: "Lorem ipsum dolor sit amet consectetur." },
  { id: "17", name: "Stokke Clikk High Chair", price: "£00.00", rawPrice: 149, brand: "stokke", imageUrl: "/images/banner5.jpg", description: "Lorem ipsum dolor sit amet consectetur." },
  { id: "18", name: "BabyBjörn Bouncer Balance Soft", price: "£00.00", rawPrice: 165, brand: "babybjorn", imageUrl: "/images/hero-1.jpg", description: "Lorem ipsum dolor sit amet consectetur." },

  // Page 4 Items
  { id: "19", name: "Bugaboo Performance Winter Footmuff", price: "£00.00", rawPrice: 155, brand: "bugaboo", imageUrl: "/images/banner4.jpg", description: "Lorem ipsum dolor sit amet consectetur." },
  { id: "20", name: "Stokke JetKids BedBox Travel Suitcase", price: "£00.00", rawPrice: 179, brand: "stokke", imageUrl: "/images/baby-clothing.png", description: "Lorem ipsum dolor sit amet consectetur." },
  { id: "21", name: "BabyBjörn Soft Bib 2-Pack", price: "£00.00", rawPrice: 16, brand: "babybjorn", imageUrl: "/images/bathing.png", description: "Lorem ipsum dolor sit amet consectetur." },
  { id: "22", name: "Bugaboo Organiser Bag", price: "£00.00", rawPrice: 55, brand: "bugaboo", imageUrl: "/images/bedding.png", description: "Lorem ipsum dolor sit amet consectetur." },
  { id: "23", name: "Stokke Prampack Travel Bag", price: "£00.00", rawPrice: 175, brand: "stokke", imageUrl: "/images/banner5.jpg", description: "Lorem ipsum dolor sit amet consectetur." },
  { id: "24", name: "BabyBjörn Step Stool", price: "£00.00", rawPrice: 28, brand: "babybjorn", imageUrl: "/images/hero-1.jpg", description: "Lorem ipsum dolor sit amet consectetur." },
];

export default function CategoryProducts() {
  const params = useParams();
  const slugArray = (params.slug as string[]) || [];

  // Determine if viewing single product detail
  const lastSegment = slugArray[slugArray.length - 1] || "";
  const isProductDetail = slugArray.length >= 3 || (!isNaN(Number(lastSegment)) && slugArray.length >= 2);
  const productId = isProductDetail ? lastSegment : null;
  const singleProduct = productId ? allProductsData.find((p) => p.id === productId) || allProductsData[0] : allProductsData[0];

  const rawCategory = slugArray[0] || "transport";
  const rawSubcategory = slugArray[1] || "pushchairs";

  // Clean breadcrumb text display matching Figma design frame: Product
  const displayCategory = (!rawCategory || !isNaN(Number(rawCategory))) ? "TRANSPORT" : rawCategory.toUpperCase();
  const displaySubcategory = (!rawSubcategory || !isNaN(Number(rawSubcategory))) ? "PUSHCHAIRS" : rawSubcategory.toUpperCase();

  // Interactive Filter States
  const [priceFilter, setPriceFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [addedToList, setAddedToList] = useState(false);

  // 7 Product Images for Big Main Photo and 7 Small Thumbnails
  const galleryImages = [
    singleProduct?.imageUrl || "/images/banner4.jpg",
    "/images/baby-clothing.png",
    "/images/bathing.png",
    "/images/bedding.png",
    "/images/banner5.jpg",
    "/images/hero-1.jpg",
    "/images/banner4.jpg",
  ];
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  // Specifics accordion toggles
  const [openSpecific, setOpenSpecific] = useState<string | null>(null);

  // Filter products dynamically
  const filteredProducts = allProductsData.filter((prod) => {
    if (brandFilter !== "all" && prod.brand !== brandFilter) return false;
    if (priceFilter === "under-100" && prod.rawPrice >= 100) return false;
    if (priceFilter === "100-500" && (prod.rawPrice < 100 || prod.rawPrice > 500)) return false;
    if (priceFilter === "500+" && prod.rawPrice < 500) return false;
    return true;
  });

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  let displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  if (displayedProducts.length === 0 && filteredProducts.length > 0) {
    displayedProducts = filteredProducts.slice(0, itemsPerPage);
  }

  // ==========================================
  // SINGLE PRODUCT DETAIL PAGE (Matching Figma Frame 'Product' 100%)
  // ==========================================
  if (isProductDetail) {
    return (
      <div className="w-full bg-[#EBE7DF] py-10 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
          
          {/* Top Breadcrumb & Add to List Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Breadcrumb Left strictly matching Figma Screenshot */}
            <div className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase flex flex-wrap items-center gap-2 select-none">
              <Link href="/products" className="hover:text-[#C77065] transition-colors">
                PRODUCTS
              </Link>
              <span>|</span>
              <Link href="/products/transport" className="hover:text-[#C77065] transition-colors">
                {displayCategory}
              </Link>
              <span>|</span>
              <Link href="/products/transport/pushchairs" className="hover:text-[#C77065] transition-colors">
                {displaySubcategory}
              </Link>
              <span>|</span>
              <span className="text-[#2D1A14] font-extrabold">{singleProduct.name.toUpperCase()}</span>
            </div>

            {/* Right Add To List Controls matching Figma Screenshot */}
            <div className="flex items-center gap-4 select-none">
              <div className="relative">
                <select className="appearance-none bg-[#EBE7DF] border border-[#CEBFA7] px-4 py-2 pr-8 text-xs font-sans font-normal text-[#2D1A14] cursor-pointer focus:outline-none">
                  <option>List: Lorem ipsum dolor sit amet</option>
                  <option>List: Baby Shower registry</option>
                  <option>List: Newborn Essentials</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#2D1A14]">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-sans text-xs font-semibold text-[#2D1A14]">
                  {addedToList ? "Added to list" : "Add to list"}
                </span>
                <button
                  onClick={() => setAddedToList(!addedToList)}
                  className="w-[42px] h-[42px] bg-[#C77065] text-[#F8F8F2] flex items-center justify-center font-bold text-2xl rounded-none hover:bg-[#b05d52] transition-colors cursor-pointer border-none"
                  aria-label="Add to list"
                >
                  {addedToList ? "✓" : "+"}
                </button>
              </div>
            </div>
          </div>

          {/* Main 2-Column Product Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Big Product Main Image + 7 Small Product Thumbnail Images */}
            <div className="flex flex-col gap-4">
              {/* Big Hero Main Product Image Container */}
              <div className="w-full h-[450px] md:h-[480px] bg-[#D4C8B5] relative overflow-hidden flex items-center justify-center group">
                <img
                  src={selectedImage}
                  alt={singleProduct.name}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/banner4.jpg';
                  }}
                />
              </div>

              {/* 7 Small Product Thumbnail Images Row */}
              <div className="grid grid-cols-7 gap-3">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`aspect-square w-full bg-[#D4C8B5] overflow-hidden border transition-all cursor-pointer p-0 relative ${
                      selectedImage === imgUrl ? 'border-[#C77065] ring-2 ring-[#C77065]' : 'border-[#CEBFA7] opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Product thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/banner4.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Title, Price, BUYING OPTIONS Box, Description & PRODUCT SPECIFICS */}
            <div className="flex flex-col gap-6">
              
              {/* Title & Price strictly matching Figma Screenshot */}
              <div className="flex flex-col gap-1">
                <h1 className="font-accent text-3xl md:text-[38px] font-normal text-[#2D1A14] leading-snug">
                  {singleProduct.name}
                </h1>
                <div className="font-accent text-2xl text-[#2D1A14] font-normal">
                  {singleProduct.price}
                </div>
              </div>

              {/* BUYING OPTIONS Outer Card Box strictly matching Figma Screenshot Spacing */}
              <div className="bg-[#EBE7DF] border border-[#CEBFA7] p-6 flex flex-col gap-4">
                <span className="block text-xs font-sans font-bold tracking-widest text-[#2D1A14] uppercase">
                  BUYING OPTIONS
                </span>

                {/* 3 Retailer Individual Bordered Cards with gap-3 between them */}
                <div className="flex flex-col gap-3">
                  {/* Retailer 1 */}
                  <div className="bg-[#EBE7DF] border border-[#CEBFA7] px-5 py-3.5 flex justify-between items-center">
                    <span className="font-accent text-lg text-[#2D1A14]">Lorem ipsum dolor</span>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="px-6 py-2 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium rounded-none hover:bg-[#b05d52] transition-colors text-decoration-none"
                    >
                      Buy now
                    </a>
                  </div>

                  {/* Retailer 2 */}
                  <div className="bg-[#EBE7DF] border border-[#CEBFA7] px-5 py-3.5 flex justify-between items-center">
                    <span className="font-accent text-lg text-[#2D1A14]">Lorem ipsum dolor</span>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="px-6 py-2 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium rounded-none hover:bg-[#b05d52] transition-colors text-decoration-none"
                    >
                      Buy now
                    </a>
                  </div>

                  {/* Retailer 3 */}
                  <div className="bg-[#EBE7DF] border border-[#CEBFA7] px-5 py-3.5 flex justify-between items-center">
                    <span className="font-accent text-lg text-[#2D1A14]">Lorem ipsum dolor</span>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="px-6 py-2 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium rounded-none hover:bg-[#b05d52] transition-colors text-decoration-none"
                    >
                      Buy now
                    </a>
                  </div>
                </div>
              </div>

              {/* Description Paragraph strictly matching Figma Screenshot Spacing */}
              <p className="font-sans text-xs md:text-sm text-[#2D1A14]/85 leading-relaxed my-1">
                Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id. Tellus auctor risus pharetra sem. Neque lectus rhoncus lacinia non diam velit malesuada vel.
              </p>

              {/* PRODUCT SPECIFICS Accordion Box matching Figma Screenshot Spacing & Plus Column Divider */}
              <div className="flex flex-col gap-3">
                <span className="block text-xs font-sans font-bold tracking-widest text-[#2D1A14] uppercase">
                  PRODUCT SPECIFICS
                </span>

                <div className="flex flex-col border border-[#CEBFA7] bg-[#EBE7DF]">
                  {/* Accordion Item 1 */}
                  <div className="border-b border-[#CEBFA7]">
                    <button
                      onClick={() => setOpenSpecific(openSpecific === "item1" ? null : "item1")}
                      className="w-full flex items-center justify-between text-left cursor-pointer bg-transparent border-none p-0 group"
                    >
                      <span className="px-5 py-3.5 font-accent text-lg text-[#2D1A14] group-hover:text-[#C77065] transition-colors flex-grow">
                        Lorem ipsum dolor
                      </span>
                      <span className="w-12 py-3.5 border-l border-[#CEBFA7] flex items-center justify-center font-normal text-xl text-[#2D1A14] flex-shrink-0">
                        {openSpecific === "item1" ? "-" : "+"}
                      </span>
                    </button>
                    {openSpecific === "item1" && (
                      <div className="px-5 pb-4 font-sans text-xs text-[#2D1A14]/80 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id.
                      </div>
                    )}
                  </div>

                  {/* Accordion Item 2 */}
                  <div className="border-b border-[#CEBFA7]">
                    <button
                      onClick={() => setOpenSpecific(openSpecific === "item2" ? null : "item2")}
                      className="w-full flex items-center justify-between text-left cursor-pointer bg-transparent border-none p-0 group"
                    >
                      <span className="px-5 py-3.5 font-accent text-lg text-[#2D1A14] group-hover:text-[#C77065] transition-colors flex-grow">
                        Lorem ipsum dolor
                      </span>
                      <span className="w-12 py-3.5 border-l border-[#CEBFA7] flex items-center justify-center font-normal text-xl text-[#2D1A14] flex-shrink-0">
                        {openSpecific === "item2" ? "-" : "+"}
                      </span>
                    </button>
                    {openSpecific === "item2" && (
                      <div className="px-5 pb-4 font-sans text-xs text-[#2D1A14]/80 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id.
                      </div>
                    )}
                  </div>

                  {/* Accordion Item 3 */}
                  <div className="border-b border-[#CEBFA7]">
                    <button
                      onClick={() => setOpenSpecific(openSpecific === "item3" ? null : "item3")}
                      className="w-full flex items-center justify-between text-left cursor-pointer bg-transparent border-none p-0 group"
                    >
                      <span className="px-5 py-3.5 font-accent text-lg text-[#2D1A14] group-hover:text-[#C77065] transition-colors flex-grow">
                        Lorem ipsum dolor
                      </span>
                      <span className="w-12 py-3.5 border-l border-[#CEBFA7] flex items-center justify-center font-normal text-xl text-[#2D1A14] flex-shrink-0">
                        {openSpecific === "item3" ? "-" : "+"}
                      </span>
                    </button>
                    {openSpecific === "item3" && (
                      <div className="px-5 pb-4 font-sans text-xs text-[#2D1A14]/80 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id.
                      </div>
                    )}
                  </div>

                  {/* Accordion Item 4 */}
                  <div>
                    <button
                      onClick={() => setOpenSpecific(openSpecific === "item4" ? null : "item4")}
                      className="w-full flex items-center justify-between text-left cursor-pointer bg-transparent border-none p-0 group"
                    >
                      <span className="px-5 py-3.5 font-accent text-lg text-[#2D1A14] group-hover:text-[#C77065] transition-colors flex-grow">
                        Lorem ipsum dolor
                      </span>
                      <span className="w-12 py-3.5 border-l border-[#CEBFA7] flex items-center justify-center font-normal text-xl text-[#2D1A14] flex-shrink-0">
                        {openSpecific === "item4" ? "-" : "+"}
                      </span>
                    </button>
                    {openSpecific === "item4" && (
                      <div className="px-5 pb-4 font-sans text-xs text-[#2D1A14]/80 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id.
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // CATEGORY PRODUCTS LISTING PAGE
  // ==========================================
  return (
    <div className="w-full bg-[#EBE7DF] py-10 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
        
        {/* Top Banner Row: Title + Expert Video Quote Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center border-b border-[#CEBFA7]/40 pb-8">
          {/* Left Title & Breadcrumbs */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <div className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase flex items-center gap-2 select-none">
              <Link href="/products" className="hover:text-[#C77065] transition-colors">
                PRODUCTS
              </Link>
              <span>|</span>
              <Link href="/products/transport" className="hover:text-[#C77065] transition-colors">
                {displayCategory}
              </Link>
              <span>|</span>
              <span className="text-[#2D1A14]">{displaySubcategory}</span>
            </div>

            <h1 className="font-accent text-4xl md:text-[48px] text-[#2D1A14] font-normal leading-tight">
              Browse <span className="font-accent italic">pushchairs</span>
            </h1>
          </div>

          {/* Right: Expert Quote & Video Card */}
          <div className="bg-[#EBE7DF] border border-[#CEBFA7] p-5 flex items-start gap-4 relative">
            <img
              src="/images/anita.png"
              alt="Anita Expert Advice"
              className="w-24 h-24 object-cover flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/baby-clothing.png';
              }}
            />
            <div className="flex flex-col gap-2 flex-grow">
              <p className="font-sans text-xs text-[#2D1A14]/80 leading-relaxed italic">
                &quot;Lorem ipsum dolor sit amet consectetur. Id ornare egestas semper aenean faucibus scelerisque. Nibh volutpat a egestas amet blandit sit venenatis. Vestibulum egestas pellentesque lacus tincidunt.&quot;
              </p>
              
              <div className="flex justify-between items-center mt-1">
                <a href="#" className="inline-flex items-center gap-2 text-xs font-bold font-sans text-[#2D1A14] hover:text-[#C77065] transition-colors">
                  <span>Watch video</span>
                  <span className="w-5 h-5 bg-[#C77065] text-[#F8F8F2] flex items-center justify-center text-[10px]">
                    ▶
                  </span>
                </a>

                {/* Carousel Dots */}
                <div className="flex gap-1.5 items-center">
                  {[0, 1, 2, 3].map((dot) => (
                    <button
                      key={dot}
                      onClick={() => setActiveQuoteIndex(dot)}
                      className={`w-2 h-2 rounded-none transition-colors cursor-pointer border-none p-0 ${
                        dot === activeQuoteIndex ? 'bg-[#2D1A14]' : 'bg-[#2D1A14]/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Subtitle Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="font-accent text-xl md:text-2xl font-normal text-[#2D1A14]">
            Lorem ipsum dolor sit amet consectetur
          </h2>

          {/* REAL-TIME WORKING FILTERS */}
          <div className="flex items-center gap-4 select-none">
            {/* Filter: Prices */}
            <div className="relative">
              <select
                value={priceFilter}
                onChange={(e) => {
                  setPriceFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-[#EBE7DF] border border-[#CEBFA7] px-5 py-2.5 pr-9 text-xs font-sans font-bold text-[#2D1A14] cursor-pointer focus:outline-none"
              >
                <option value="all">Filter: Prices (All)</option>
                <option value="under-100">Under £100</option>
                <option value="100-500">£100 - £500</option>
                <option value="500+">£500+</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#2D1A14]">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Filter: Brand */}
            <div className="relative">
              <select
                value={brandFilter}
                onChange={(e) => {
                  setBrandFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-[#EBE7DF] border border-[#CEBFA7] px-5 py-2.5 pr-9 text-xs font-sans font-bold text-[#2D1A14] cursor-pointer focus:outline-none"
              >
                <option value="all">Filter: Brand (All)</option>
                <option value="bugaboo">Bugaboo</option>
                <option value="stokke">Stokke</option>
                <option value="babybjorn">BabyBjörn</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#2D1A14]">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Section: Left Sidebar Accordion + Right 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Sidebar Category Accordion */}
          <div className="md:col-span-1">
            <CategoryAccordion
              categories={mockSidebarCategories}
              activeCategorySlug={rawCategory}
              activeSubcategorySlug={rawSubcategory}
            />
          </div>

          {/* Right Product Grid & Pagination */}
          <div className="md:col-span-3 flex flex-col gap-10">
            {/* 3-Column Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  name={prod.name}
                  price={prod.price}
                  imageUrl={prod.imageUrl}
                  href={`/products/${rawCategory}/${rawSubcategory}/${prod.id}`}
                />
              ))}
            </div>

            {/* REAL-TIME WORKING PAGINATION (Pages 1, 2, 3, 4 fully populated) */}
            <div className="flex items-center gap-2 select-none">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className={`w-8 h-8 flex items-center justify-center font-sans text-xs font-bold transition-colors cursor-pointer border-none ${
                    page === currentPage
                      ? 'bg-[#D4C8B5] text-[#2D1A14]'
                      : 'bg-[#EBE7DF] text-[#2D1A14]/70 hover:bg-[#D4C8B5]/60'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
