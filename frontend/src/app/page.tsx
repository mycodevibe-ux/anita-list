export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

export default function Home() {
  return (
    <div className={styles.siteWrapper}>
      <div className={styles.container}>
        {/* Global Header (default logged-out variant for Homepage) */}
        <Header variant="logged-out" />

        {/* Main Content Area */}
        <main>
          {/* Hero Carousel Slide Section */}
          <HeroCarousel />

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

        {/* Floating Chat speech bubble widget */}
        <ChatWidget />
      </div>
    </div>
  );
}
