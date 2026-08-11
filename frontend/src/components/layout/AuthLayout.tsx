import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export interface AuthLayoutProps {
  children: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  imageUrl,
  imageAlt = "Auth background lifestyle image",
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Logged out Header for authentication flows */}
      <Header variant="logged-out" />

      {/* Main split grid content */}
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 w-full">
        {/* Left Column: Full-Height Lifestyle Photo */}
        <div className="relative hidden lg:block w-full min-h-[500px] bg-beige-dark/20 overflow-hidden">
          <img
            src={imageUrl || "/images/signup-banner.png"}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/signup-banner.png';
            }}
          />
        </div>

        {/* Right Column: Beige Form Block */}
        <div className="w-full flex items-center justify-center bg-beige/30 py-12 px-6 sm:px-12 md:px-20 lg:px-24">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
