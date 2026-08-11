"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { DualTypeHeading } from "./DualTypeHeading";

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Simulate API request (which we will connect to Laravel in Phase 4)
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full max-w-md">
      <span className="block font-sans text-xs font-semibold tracking-[0.15em] text-brown-dark/70 uppercase mb-2">
        BE IN THE KNOW
      </span>
      <DualTypeHeading tag="h3" className="text-xl font-normal leading-snug mb-4">
        Be the first to know about new collections, news and *exclusive offers*
      </DualTypeHeading>

      <form onSubmit={handleSubmit} className="flex gap-2 w-full mb-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          disabled={status === "loading"}
          className="flex-grow px-4 py-2 text-sm bg-white/50 border border-gray-light rounded-md text-text-dark placeholder-gray-medium focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-all duration-200"
        />
        <Button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-2 h-full bg-coral hover:bg-coral/90 text-white rounded-md text-sm font-medium transition-colors"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </Button>
      </form>

      {status === "success" && (
        <span className="text-xs text-status-green font-medium mb-2">
          Thank you! You have successfully subscribed.
        </span>
      )}

      <p className="font-sans text-[10px] leading-relaxed text-gray-medium">
        By clicking the submit button, I declare that I have read the Terms of service and accept the{" "}
        <a href="/privacy-policy" className="underline hover:text-text-dark">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};
