"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface RetailerOption {
  name: string;
  price: string;
  link: string;
}

interface SpecItem {
  title: string;
  detail: string;
}

interface ProductItem {
  id: string;
  slug: string;
  name: string;
  price: string;
  rawPrice: number;
  brand: string;
  category: string;
  subcategory: string;
  imageUrl: string;
  description: string;
  retailers: RetailerOption[];
  specs: SpecItem[];
}

const productsDatabase: Record<string, ProductItem> = {
  "1": {
    id: "1",
    slug: "bugaboo-fox-5-renew",
    name: "Bugaboo Fox 5 Renew Stroller",
    price: "£1,299.00",
    rawPrice: 1299,
    brand: "Bugaboo",
    category: "Transport",
    subcategory: "Pushchairs",
    imageUrl: "/images/banner4.jpg",
    description: "The ultimate all-terrain stroller designed for smooth rides, effortless maneuverability, and premium comfort for your baby.",
    retailers: [
      { name: "John Lewis & Partners", price: "£1,299.00", link: "https://www.johnlewis.com" },
      { name: "Amazon UK", price: "£1,249.00", link: "https://www.amazon.co.uk" },
      { name: "Bugaboo Official Store", price: "£1,299.00", link: "https://www.bugaboo.com" },
    ],
    specs: [
      { title: "Dimensions & Weight", detail: "Unfolded: 93 x 60 x 105 cm. Stroller weight: 10.4 kg." },
      { title: "Age & Weight Limits", detail: "Suitable from birth up to 22 kg (approx. 4 years)." },
      { title: "Wheel & Suspension Specs", detail: "Extra-large puncture-proof wheels with full advanced central joint suspension." },
    ],
  },
  "2": {
    id: "2",
    slug: "stokke-yoyo3-lightweight-stroller",
    name: "Stokke YOYO3 Lightweight Stroller",
    price: "£450.00",
    rawPrice: 450,
    brand: "Stokke",
    category: "Transport",
    subcategory: "Pushchairs",
    imageUrl: "/images/baby-clothing.png",
    description: "Ultra-compact, lightweight travel stroller designed to fit overhead cabin luggage limits while delivering daily durability.",
    retailers: [
      { name: "John Lewis & Partners", price: "£450.00", link: "https://www.johnlewis.com" },
      { name: "Stokke Official Store", price: "£450.00", link: "https://www.stokke.com" },
      { name: "Pramworld UK", price: "£435.00", link: "https://www.pramworld.co.uk" },
    ],
    specs: [
      { title: "Cabin Luggage Size", detail: "Folded size: 52 x 44 x 18 cm. Fits standard airline overhead bins." },
      { title: "Weight", detail: "Featherlight 6.2 kg frame with shoulder carrying strap." },
      { title: "Harness & Recline", detail: "5-point safety harness with multi-position reclining seat back." },
    ],
  },
  "3": {
    id: "3",
    slug: "babybjorn-baby-carrier-harmony",
    name: "BabyBjörn Baby Carrier Harmony",
    price: "£190.00",
    rawPrice: 190,
    brand: "BabyBjörn",
    category: "Transport",
    subcategory: "Carriers",
    imageUrl: "/images/bathing.png",
    description: "Ergonomic, soft 3D mesh baby carrier offering maximum comfort and close connection from newborn to 3 years old.",
    retailers: [
      { name: "BabyBjörn Official Store", price: "£190.00", link: "https://www.babybjorn.co.uk" },
      { name: "John Lewis & Partners", price: "£190.00", link: "https://www.johnlewis.com" },
      { name: "Boots Baby", price: "£185.00", link: "https://www.boots.com" },
    ],
    specs: [
      { title: "Carrying Positions", detail: "4 positions: Newborn, Facing-in, Facing-out, Back carrying." },
      { title: "Material & Breathability", detail: "Ultra-soft 3D mesh fabric for optimal airflow and cooling." },
    ],
  },
  "4": {
    id: "4",
    slug: "bugaboo-dragonfly-city-stroller",
    name: "Bugaboo Dragonfly City Stroller",
    price: "£895.00",
    rawPrice: 895,
    brand: "Bugaboo",
    category: "Transport",
    subcategory: "Pushchairs",
    imageUrl: "/images/bedding.png",
    description: "The future-proof city stroller that folds compactly with carrycot or seat attached, featuring unmatched one-hand steering.",
    retailers: [
      { name: "Bugaboo Official Store", price: "£895.00", link: "https://www.bugaboo.com" },
      { name: "John Lewis & Partners", price: "£895.00", link: "https://www.johnlewis.com" },
    ],
    specs: [
      { title: "Fold Innovation", detail: "Patented compact self-standing fold with seat or carrycot attached." },
      { title: "Underseat Basket", detail: "Flexible 10 kg storage capacity underseat basket." },
    ],
  },
  "5": {
    id: "5",
    slug: "stokke-tripp-trapp-high-chair",
    name: "Stokke Tripp Trapp High Chair",
    price: "£239.00",
    rawPrice: 239,
    brand: "Stokke",
    category: "Nursery",
    subcategory: "Furniture",
    imageUrl: "/images/banner5.jpg",
    description: "The iconic chair that grows with the child from newborn to adulthood, bringing your baby right to the dining table.",
    retailers: [
      { name: "Stokke Official Store", price: "£239.00", link: "https://www.stokke.com" },
      { name: "John Lewis & Partners", price: "£239.00", link: "https://www.johnlewis.com" },
    ],
    specs: [
      { title: "Adjustability", detail: "Depth- and height-adjustable seat and footplate for ergonomic posture." },
      { title: "Wood Craftsmanship", detail: "Solid European beech wood construction supporting up to 136 kg." },
    ],
  },
  "6": {
    id: "6",
    slug: "babybjorn-bouncer-bliss-mesh",
    name: "BabyBjörn Bouncer Bliss Mesh",
    price: "£185.00",
    rawPrice: 185,
    brand: "BabyBjörn",
    category: "Nursery",
    subcategory: "Accessories",
    imageUrl: "/images/hero-1.jpg",
    description: "Ergonomic bouncer with natural rocking powered by your baby's own movements, requiring no batteries or cables.",
    retailers: [
      { name: "BabyBjörn Official Store", price: "£185.00", link: "https://www.babybjorn.co.uk" },
      { name: "John Lewis & Partners", price: "£185.00", link: "https://www.johnlewis.com" },
    ],
    specs: [
      { title: "Natural Rocking", detail: "No batteries needed; gentle natural rocking develops motor skills and balance." },
      { title: "Recline Settings", detail: "3 positions for play, rest, and sleep." },
    ],
  },
};

const slugToIdMap: Record<string, string> = {
  "bugaboo-fox-5-renew": "1",
  "stokke-yoyo3-lightweight-stroller": "2",
  "babybjorn-baby-carrier-harmony": "3",
  "bugaboo-dragonfly-city-stroller": "4",
  "stokke-tripp-trapp-high-chair": "5",
  "babybjorn-bouncer-bliss-mesh": "6",
};

import api, { getApiBaseUrl } from "@/lib/api";

export default function ProductDetail() {
  const params = useParams();
  const rawCategory = (params.category as string) || "transport";
  const rawSubcategory = (params.subcategory as string) || "pushchairs";
  const rawSlug = (params.slug as string) || "1";

  // Dynamic Lookup by ID or Slug string
  const matchedId = slugToIdMap[rawSlug] || rawSlug;
  const initialProduct = productsDatabase[matchedId] || productsDatabase["1"];

  const [currentProduct, setCurrentProduct] = useState<ProductItem>(initialProduct);
  const [addedToList, setAddedToList] = useState(false);
  const [openSpecific, setOpenSpecific] = useState<string | null>(null);

  const displayCategory = (!rawCategory || !isNaN(Number(rawCategory))) ? currentProduct.category.toUpperCase() : rawCategory.toUpperCase();
  const displaySubcategory = (!rawSubcategory || !isNaN(Number(rawSubcategory))) ? currentProduct.subcategory.toUpperCase() : rawSubcategory.toUpperCase();

  const mainImg = currentProduct.imageUrl;
  const galleryImages = [mainImg];
  const [selectedImage, setSelectedImage] = useState(mainImg);

  useEffect(() => {
    setSelectedImage(currentProduct.imageUrl);
  }, [currentProduct.imageUrl]);

  useEffect(() => {
    const fetchFromCMS = async () => {
      try {
        const res = await api.get(`/products/${matchedId}`);
        if (res.data && res.data.name) {
          const baseUrl = getApiBaseUrl();
          const storageUrl = `${baseUrl}/storage/`;
          const cmsProduct: ProductItem = {
            id: String(res.data.id),
            slug: res.data.slug || String(res.data.id),
            name: res.data.name,
            price: res.data.price ? `£${res.data.price}` : initialProduct.price,
            rawPrice: res.data.price || initialProduct.rawPrice,
            brand: res.data.brand || initialProduct.brand,
            category: res.data.category?.name || initialProduct.category,
            subcategory: initialProduct.subcategory,
            imageUrl: res.data.image ? `${storageUrl}${res.data.image}` : initialProduct.imageUrl,
            description: res.data.description || initialProduct.description,
            retailers: ((res.data.buying_options || res.data.buyingOptions) && (res.data.buying_options || res.data.buyingOptions).length > 0)
              ? (res.data.buying_options || res.data.buyingOptions).map((b: any) => ({
                  name: b.retailer_name || b.name || "Retailer",
                  price: b.price ? (String(b.price).includes('£') ? b.price : `£${b.price}`) : initialProduct.price,
                  link: b.affiliate_link || b.buy_url || b.link || "#",
                }))
              : initialProduct.retailers,
            specs: (res.data.specs && res.data.specs.length > 0)
              ? res.data.specs.map((s: any) => ({
                  title: s.spec_name || s.title || "Specification",
                  detail: s.spec_value || s.detail || "",
                }))
              : initialProduct.specs,
          };
          setCurrentProduct(cmsProduct);
          setSelectedImage(cmsProduct.imageUrl);
        }
      } catch (e) {
        console.log("Using local database product fallback", e);
      }
    };
    fetchFromCMS();
  }, [matchedId]);

  return (
    <div className="w-full bg-[#EBE7DF] py-10 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
        
        {/* Top Breadcrumb & Add to List Controls Bar */}
        <RevealOnScroll animation="fade-up">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Breadcrumb Left */}
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
              <span className="text-[#2D1A14] font-extrabold">{currentProduct.name.toUpperCase()}</span>
            </div>

            {/* Right Add To List Controls */}
            <div className="flex items-center gap-4 select-none">
              <div className="relative">
                <select className="appearance-none bg-[#EBE7DF] border border-[#CEBFA7] px-4 py-2 pr-8 text-xs font-sans font-normal text-[#2D1A14] cursor-pointer focus:outline-none">
                  <option>List: My Baby Registry</option>
                  <option>List: Baby Shower wishlist</option>
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
        </RevealOnScroll>

        {/* Main 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Product Main Image */}
          <RevealOnScroll animation="fade-left">
            <div className="flex flex-col gap-4">
              <div className="w-full h-[450px] md:h-[480px] bg-[#D4C8B5] relative overflow-hidden flex items-center justify-center group border border-[#CEBFA7]">
                <img
                  src={selectedImage}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = mainImg;
                  }}
                />
              </div>

              {galleryImages.length > 1 && (
                <div className="flex gap-3">
                  {galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`h-20 w-20 bg-[#D4C8B5] overflow-hidden border transition-all cursor-pointer p-0 relative ${
                        selectedImage === imgUrl ? 'border-[#C77065] ring-2 ring-[#C77065]' : 'border-[#CEBFA7] opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Product thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </RevealOnScroll>

          {/* Right Column: Title, Price, BUYING OPTIONS Box, Description & PRODUCT SPECIFICS */}
          <div className="flex flex-col gap-6">
            
            {/* Title & Price */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-sans text-[10px] font-bold uppercase text-[#8B9A6B] bg-[#D4C8B5] px-2 py-0.5">
                  {currentProduct.brand}
                </span>
              </div>
              <h1 className="font-accent text-3xl md:text-[38px] font-normal text-[#2D1A14] leading-snug">
                {currentProduct.name}
              </h1>
              <div className="font-accent text-2xl text-[#2D1A14] font-normal">
                {currentProduct.price}
              </div>
            </div>

            {/* BUYING OPTIONS Outer Card Box */}
            <div className="bg-[#EBE7DF] border border-[#CEBFA7] p-6 flex flex-col gap-4 shadow-sm">
              <span className="block text-xs font-sans font-bold tracking-widest text-[#2D1A14] uppercase">
                BUYING OPTIONS ({currentProduct.retailers.length} RETAILERS)
              </span>

              {/* Retailers List */}
              <div className="flex flex-col gap-3">
                {currentProduct.retailers.map((ret, idx) => (
                  <div key={idx} className="bg-[#EBE7DF] border border-[#CEBFA7] px-5 py-3.5 flex justify-between items-center hover:border-[#C77065] transition-colors">
                    <div className="flex flex-col">
                      <span className="font-accent text-lg text-[#2D1A14] font-medium">{ret.name}</span>
                      <span className="font-sans text-xs text-[#2D1A14]/70">Best Price: {ret.price}</span>
                    </div>
                    <a
                      href={ret.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium rounded-none btn-slide-hover text-decoration-none"
                    >
                      Buy now
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="font-sans text-xs md:text-sm text-[#2D1A14]/85 leading-relaxed my-1">
              {currentProduct.description}
            </p>

            {/* PRODUCT SPECIFICS Accordion */}
            <div className="flex flex-col gap-3">
              <span className="block text-xs font-sans font-bold tracking-widest text-[#2D1A14] uppercase">
                PRODUCT SPECIFICS
              </span>

              <div className="flex flex-col border border-[#CEBFA7] bg-[#EBE7DF]">
                {currentProduct.specs.map((sp, idx) => (
                  <div key={idx} className="border-b border-[#CEBFA7] last:border-none">
                    <button
                      onClick={() => setOpenSpecific(openSpecific === `item${idx}` ? null : `item${idx}`)}
                      className="w-full flex items-center justify-between text-left cursor-pointer bg-transparent border-none p-0 group"
                    >
                      <span className="px-5 py-3.5 font-accent text-lg text-[#2D1A14] group-hover:text-[#C77065] transition-colors flex-grow">
                        {sp.title}
                      </span>
                      <span className="w-12 py-3.5 border-l border-[#CEBFA7] flex items-center justify-center font-normal text-xl text-[#2D1A14] flex-shrink-0">
                        {openSpecific === `item${idx}` ? "-" : "+"}
                      </span>
                    </button>
                    {openSpecific === `item${idx}` && (
                      <div className="px-5 pb-4 font-sans text-xs text-[#2D1A14]/80 leading-relaxed">
                        {sp.detail}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
