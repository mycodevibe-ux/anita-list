"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CategoryAccordion, CategoryItem } from "@/components/products/CategoryAccordion";
import { ProductCard } from "@/components/cards/ProductCard";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

// Sidebar categories list strictly matching Figma design
const mockSidebarCategories: CategoryItem[] = [
  {
    name: "Baby clothing",
    slug: "baby-clothing",
    subcategories: [
      { name: "Newborn Sleepsuits", slug: "newborn-sleepsuits" },
      { name: "Bodysuits & Onesies", slug: "bodysuits-onesies" },
      { name: "Scratch Mittens", slug: "scratch-mittens" },
      { name: "Sun Hats", slug: "sun-hats" },
      { name: "Booties & Socks", slug: "booties-socks" },
      { name: "Toddler Clothing", slug: "toddler-clothing" },
    ],
  },
  {
    name: "Bedding",
    slug: "bedding",
    subcategories: [
      { name: "Moses Baskets", slug: "moses-baskets" },
      { name: "Cribs & Bassinets", slug: "cribs-bassinets" },
      { name: "Fitted Sheets", slug: "fitted-sheets" },
      { name: "Sleeping Bags & Swaddles", slug: "sleeping-bags-swaddles" },
      { name: "Mattresses", slug: "mattresses" },
    ],
  },
  {
    name: "Cleaning",
    slug: "cleaning",
    subcategories: [
      { name: "Electric Sterilizers", slug: "electric-sterilizers" },
      { name: "Microwave Sterilizers", slug: "microwave-sterilizers" },
      { name: "Bottle Washers", slug: "bottle-washers" },
    ],
  },
  {
    name: "Feeding & weaning",
    slug: "feeding-weaning",
    subcategories: [
      { name: "Bottles & Teats", slug: "bottles-teats" },
      { name: "High Chairs", slug: "high-chairs" },
      { name: "Breast Pumps", slug: "breast-pumps" },
      { name: "Weaning Sets", slug: "weaning-sets" },
      { name: "Bibs", slug: "bibs" },
    ],
  },
  {
    name: "Monitors",
    slug: "monitors",
    subcategories: [
      { name: "Video Monitors", slug: "video-monitors" },
      { name: "Audio Monitors", slug: "audio-monitors" },
      { name: "Thermometers", slug: "thermometers" },
      { name: "Movement Monitors", slug: "movement-monitors" },
    ],
  },
  {
    name: "Mothers",
    slug: "mothers",
    subcategories: [
      { name: "Maternity Pillows", slug: "maternity-pillows" },
      { name: "Postpartum Care", slug: "postpartum-care" },
      { name: "Nursing Bras & Covers", slug: "nursing-bras-covers" },
    ],
  },
  {
    name: "Nappies & lotions",
    slug: "nappies-lotions",
    subcategories: [
      { name: "Nappies & Diapers", slug: "nappies-diapers" },
      { name: "Wipes", slug: "wipes" },
      { name: "Baby Lotions & Oils", slug: "baby-lotions-oils" },
      { name: "Nappy Creams", slug: "nappy-creams" },
    ],
  },
  {
    name: "Nursery",
    slug: "nursery",
    subcategories: [
      { name: "Nursery Storage", slug: "nursery-storage" },
      { name: "Decor & Wall Art", slug: "decor-wall-art" },
      { name: "Night Lights", slug: "night-lights" },
      { name: "Mobiles", slug: "mobiles" },
    ],
  },
  {
    name: "Toys & play",
    slug: "toys-play",
    subcategories: [
      { name: "Baby Bouncers", slug: "baby-bouncers" },
      { name: "Play Mats & Gyms", slug: "play-mats-gyms" },
      { name: "Teethers & Rattles", slug: "teethers-rattles" },
      { name: "Plush Toys", slug: "plush-toys" },
    ],
  },
  {
    name: "Travel",
    slug: "travel",
    subcategories: [
      { name: "Travel Cots", slug: "travel-cots" },
      { name: "Travel High Chairs", slug: "travel-high-chairs" },
      { name: "Car Organizers", slug: "car-organizers" },
    ],
  },
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
  { id: "1", name: "Bugaboo Fox 5 Renew", price: "£1,299.00", rawPrice: 1299, brand: "bugaboo", imageUrl: "/images/banner4.jpg", description: "The ultimate all-terrain stroller designed for smooth rides, effortless maneuverability, and premium comfort." },
  { id: "2", name: "Stokke YOYO3 Lightweight Stroller", price: "£450.00", rawPrice: 450, brand: "stokke", imageUrl: "/images/baby-clothing.png", description: "Ultra-compact, lightweight travel stroller designed to fit overhead cabin luggage limits." },
  { id: "3", name: "BabyBjörn Baby Carrier Harmony", price: "£190.00", rawPrice: 190, brand: "babybjorn", imageUrl: "/images/bathing.png", description: "Ergonomic, soft 3D mesh baby carrier offering maximum comfort and close connection." },
  { id: "4", name: "Bugaboo Dragonfly City Stroller", price: "£895.00", rawPrice: 895, brand: "bugaboo", imageUrl: "/images/bedding.png", description: "The future-proof city stroller that folds compactly with carrycot or seat attached." },
  { id: "5", name: "Stokke Tripp Trapp High Chair", price: "£239.00", rawPrice: 239, brand: "stokke", imageUrl: "/images/banner5.jpg", description: "The iconic chair that grows with the child from newborn to adulthood." },
  { id: "6", name: "BabyBjörn Bouncer Bliss Mesh", price: "£185.00", rawPrice: 185, brand: "babybjorn", imageUrl: "/images/hero-1.jpg", description: "Ergonomic bouncer with natural rocking powered by your baby's own movements." },
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
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Expert quotes carousel list
  const expertQuotes = [
    "\"Choose a pushchair with sturdy suspension and an easy one-hand fold mechanism if you navigate public transport or city pavements daily.\"",
    "\"Ensure your bassinet mattress is firm, flat, and fits snugly without any gaps around the edges for safe newborn sleep.\"",
    "\"For frequent travel, compact pushchairs that fit into airplane overhead cabins save incredible time and stress at airport gates.\"",
    "\"Focus on high-frequency daily essentials first—pushchair, car seat, Moses basket, and washable cotton swaddles.\""
  ];

  // Auto-slide expert quotes timer
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuoteIndex((prev) => (prev + 1) % expertQuotes.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [expertQuotes.length]);

  // Real Product Images array for Thumbnails matching current product
  const mainImg = singleProduct?.imageUrl || "/images/banner4.jpg";
  const galleryImages = [mainImg];
  const [selectedImage, setSelectedImage] = useState(mainImg);

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
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const validPage = currentPage > totalPages ? 1 : currentPage;
  const startIndex = (validPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

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
                      className="px-6 py-2 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium rounded-none btn-slide-hover text-decoration-none"
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
                      className="px-6 py-2 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium rounded-none btn-slide-hover text-decoration-none"
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
                      className="px-6 py-2 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium rounded-none btn-slide-hover text-decoration-none"
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
        <RevealOnScroll animation="fade-up">
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
              <div className="flex flex-col gap-2 flex-grow min-h-[90px] justify-between">
                <p key={activeQuoteIndex} className="font-sans text-xs text-[#2D1A14]/80 leading-relaxed italic animate-fade-in">
                  {expertQuotes[activeQuoteIndex]}
                </p>
                
                <div className="flex justify-between items-center mt-1">
                  <button
                    type="button"
                    onClick={() => setIsVideoOpen(true)}
                    className="inline-flex items-center gap-2 text-xs font-bold font-sans text-[#2D1A14] hover:text-[#C77065] transition-colors bg-transparent border-none cursor-pointer p-0"
                  >
                    <span>Watch video</span>
                    <span className="w-5 h-5 bg-[#C77065] text-[#F8F8F2] flex items-center justify-center text-[10px] shadow-sm hover:scale-110 transition-transform">
                      ▶
                    </span>
                  </button>

                  {/* Carousel Dots */}
                  <div className="flex gap-1.5 items-center">
                    {expertQuotes.map((_, dot) => (
                      <button
                        key={dot}
                        onClick={() => setActiveQuoteIndex(dot)}
                        className={`w-2.5 h-2.5 rounded-none transition-all duration-300 cursor-pointer border-none p-0 ${
                          dot === activeQuoteIndex ? 'bg-[#C77065] scale-110' : 'bg-[#2D1A14]/30 hover:bg-[#2D1A14]/60'
                        }`}
                        aria-label={`Quote ${dot + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Video Lightbox Modal Popup */}
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
            <div className="relative w-full max-w-4xl bg-[#2D1A14] rounded-none overflow-hidden shadow-2xl border border-[#CEBFA7]">
              {/* Top Bar with Title & Close Button */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-[#CEBFA7]/30 bg-[#2D1A14] text-[#F8F8F2]">
                <h3 className="font-accent text-lg font-normal">Anita's Pushchair Selection & Safety Guide</h3>
                <button
                  onClick={() => setIsVideoOpen(false)}
                  className="w-8 h-8 rounded-none bg-[#C77065] text-[#F8F8F2] flex items-center justify-center font-bold text-sm hover:bg-[#b05d52] transition-colors cursor-pointer border-none shadow-sm"
                  aria-label="Close video modal"
                >
                  ✕
                </button>
              </div>

              {/* Video Player Frame */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <iframe
                  className="w-full h-full border-none"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Pushchair Selection Expert Guide by Anita"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

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
              {displayedProducts.map((prod, idx) => (
                <RevealOnScroll key={prod.id} animation="fade-up" delay={(idx % 3) * 120}>
                  <ProductCard
                    name={prod.name}
                    price={prod.price}
                    imageUrl={prod.imageUrl}
                    href={`/products/${rawCategory}/${rawSubcategory}/${prod.id}`}
                  />
                </RevealOnScroll>
              ))}
            </div>

            {/* REAL-TIME DYNAMIC PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2 select-none">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className={`w-8 h-8 flex items-center justify-center font-sans text-xs font-bold transition-all duration-200 cursor-pointer border-none ${
                      page === validPage
                        ? 'bg-[#D4C8B5] text-[#2D1A14] scale-105 shadow-sm'
                        : 'bg-[#EBE7DF] text-[#2D1A14]/70 hover:bg-[#D4C8B5]/60'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
