"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Rich Product Database for direct product/[id] routing
const allProductsData = [
  { id: "1", name: "Bugaboo Fox 5 Renew", price: "£00.00", rawPrice: 1299, brand: "bugaboo", imageUrl: "/images/banner4.jpg", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id. Tellus auctor risus pharetra sem. Neque lectus rhoncus lacinia non diam velit malesuada vel." },
  { id: "2", name: "Stokke YOYO3 Lightweight Stroller", price: "£00.00", rawPrice: 450, brand: "stokke", imageUrl: "/images/baby-clothing.png", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id. Tellus auctor risus pharetra sem. Neque lectus rhoncus lacinia non diam velit malesuada vel." },
  { id: "3", name: "BabyBjörn Baby Carrier Harmony", price: "£00.00", rawPrice: 190, brand: "babybjorn", imageUrl: "/images/bathing.png", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id. Tellus auctor risus pharetra sem." },
  { id: "4", name: "Bugaboo Dragonfly City Stroller", price: "£00.00", rawPrice: 895, brand: "bugaboo", imageUrl: "/images/bedding.png", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id. Tellus auctor risus pharetra sem." },
  { id: "5", name: "Stokke Tripp Trapp High Chair", price: "£00.00", rawPrice: 239, brand: "stokke", imageUrl: "/images/banner5.jpg", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id." },
  { id: "6", name: "BabyBjörn Bouncer Bliss Mesh", price: "£00.00", rawPrice: 185, brand: "babybjorn", imageUrl: "/images/hero-1.jpg", description: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id." },
];

export default function SingleProductPage() {
  const params = useParams();
  const productId = (params.id as string) || "1";
  
  const singleProduct = allProductsData.find((p) => p.id === productId) || allProductsData[0];

  const [addedToList, setAddedToList] = useState(false);
  const [openSpecific, setOpenSpecific] = useState<string | null>(null);

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
              TRANSPORT
            </Link>
            <span>|</span>
            <Link href="/products/transport/pushchairs" className="hover:text-[#C77065] transition-colors">
              PUSHCHAIRS
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
            
            {/* Title & Price */}
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
