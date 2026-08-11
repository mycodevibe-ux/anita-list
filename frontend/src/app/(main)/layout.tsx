import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ui/ChatWidget";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-[#EBE7DF]">
      <Header variant="logged-in" />
      <main className="flex-grow bg-[#EBE7DF]">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
