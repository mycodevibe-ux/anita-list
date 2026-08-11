"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfileEditPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Anne Johnson");
  const [email, setEmail] = useState("anne.johnson@example.com");
  const [secondaryEmail, setSecondaryEmail] = useState("partner.johnson@example.com");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="w-full bg-[#EBE7DF] py-10 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col gap-2 border-b border-[#CEBFA7]/40 pb-6">
          <Link href="/hub" className="font-sans text-xs font-bold text-[#2D1A14] hover:text-[#C77065] transition-colors flex items-center gap-2">
            <span>←</span>
            <span>Back to My hub</span>
          </Link>
          <h1 className="font-accent text-3xl md:text-[44px] font-normal text-[#2D1A14] leading-tight">
            Edit <span className="font-accent italic">Profile & Account Settings</span>
          </h1>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="bg-[#EBE7DF] border border-[#CEBFA7] p-8 max-w-2xl flex flex-col gap-6">
          {savedSuccess && (
            <div className="p-4 bg-[#8B9A6B] text-white font-sans text-xs font-bold">
              ✓ Profile settings updated successfully!
            </div>
          )}

          <div className="flex items-center gap-6 pb-4 border-b border-[#CEBFA7]/40">
            <div className="w-20 h-20 rounded-full bg-[#8B9A6B] text-white flex items-center justify-center font-sans text-2xl font-bold">
              AJ
            </div>
            <button type="button" onClick={() => alert("Upload avatar dialog")} className="px-4 py-2 bg-[#EBE7DF] border border-[#CEBFA7] font-sans text-xs text-[#2D1A14] font-semibold hover:bg-[#CEBFA7]/30 transition-colors cursor-pointer">
              Change Avatar
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
              Full Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs font-sans text-[#2D1A14] focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
              Primary Account Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs font-sans text-[#2D1A14] focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
              Secondary / Partner Email (Shared List Invite)
            </label>
            <input
              type="email"
              value={secondaryEmail}
              onChange={(e) => setSecondaryEmail(e.target.value)}
              className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs font-sans text-[#2D1A14] focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer"
            >
              Save Profile Changes
            </button>
            <button
              type="button"
              onClick={() => router.push("/hub")}
              className="px-6 py-3 bg-transparent text-[#2D1A14] font-sans text-xs font-semibold hover:underline border-none cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
