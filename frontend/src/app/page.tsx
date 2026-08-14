import React from "react";
import { Header } from "@/components/layout/Header";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ExpertAdviceSection } from "@/components/sections/ExpertAdviceSection";
import { CategoryCarousel } from "@/components/sections/CategoryCarousel";
import { BrandPartners } from "@/components/sections/BrandPartners";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ui/ChatWidget";
import styles from "./page.module.css";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getHomepageData() {
  try {
    let envUrl = process.env.NEXT_PUBLIC_API_URL;
    const isProd = process.env.NODE_ENV === 'production';
    if (!envUrl) {
      envUrl = isProd 
        ? 'https://anita-list-backend-production.up.railway.app/api'
        : 'http://localhost:8000/api';
    }
    const apiBase = envUrl.replace(/\/api\/?$/, '');
    const res = await fetch(`${apiBase}/api/homepage?t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.error("SSR fetch homepage settings failed:", e);
  }
  return null;
}

export default async function Home() {
  const homepageData = await getHomepageData();

  return (
    <div className={styles.siteWrapper}>
      <div className={styles.container}>
        {/* Global Header (default logged-out variant for Homepage) */}
        <Header variant="logged-out" />

        {/* Main Content Area */}
        <main>
          {/* Hero Carousel Slide Section */}
          <HeroCarousel initialSettings={homepageData} />

          {/* How It Works Section */}
          <HowItWorks />

          {/* Expert Advice Overlapping Grid Section */}
          <ExpertAdviceSection />

          {/* Categories Horizontal Carousel Section */}
          <CategoryCarousel />

          {/* Brand Partners Row Section */}
          <BrandPartners />
        </main>

        {/* Global Footer with Newsletter subscriptions */}
        <Footer />

        {/* Floating Circle Chat Widget */}
        <ChatWidget />
      </div>
    </div>
  );
}
