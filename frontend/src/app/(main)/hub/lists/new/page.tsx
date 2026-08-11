"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateNewListGuidedFlow() {
  const router = useRouter();

  // Step 13: Template Selection ("Journey list" vs "Blank list")
  const [selectedType, setSelectedType] = useState<"blank" | "template" | null>(null);
  const [listName, setListName] = useState("");
  const [step, setStep] = useState<"choose_type" | "name_list">("choose_type");

  const handleTypeChoice = (type: "blank" | "template") => {
    setSelectedType(type);
    setStep("name_list");
  };

  const handleCreateListSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listName.trim()) return;

    // Create list in LocalStorage
    const saved = localStorage.getItem("anita_user_lists");
    let currentLists = [];
    if (saved) {
      try {
        currentLists = JSON.parse(saved);
      } catch (e) {
        currentLists = [];
      }
    }

    const newList = {
      id: Date.now().toString(),
      title: listName,
      type: selectedType,
      updated_at: new Date().toLocaleDateString(),
      progress: 0,
      imageUrl: selectedType === "template" ? "/images/banner4.jpg" : "/images/baby-clothing.png",
    };

    const updated = [newList, ...currentLists];
    localStorage.setItem("anita_user_lists", JSON.stringify(updated));

    // Redirect to Step 15: Dropped into new list with guidance
    router.push(`/hub/lists/${newList.id}`);
  };

  return (
    <div className="w-full bg-[#EBE7DF] py-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        
        {/* Step 13: Choose List Type Modal / Container */}
        {step === "choose_type" && (
          <div className="bg-[#EBE7DF] border border-[#CEBFA7] p-8 md:p-12 w-full max-w-2xl flex flex-col items-center text-center gap-8 shadow-2xl select-none">
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
                CREATE NEW LIST
              </span>
              <h2 className="font-accent text-3xl md:text-4xl text-[#2D1A14] font-normal">
                Select how to get started
              </h2>
              <p className="font-sans text-xs md:text-sm text-[#2D1A14]/75 max-w-md">
                Start from scratch with a blank list, or use our guided journey template pre-populated with Anita's recommended essentials.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {/* Option A: Blank List (Bespoke) */}
              <button
                onClick={() => handleTypeChoice("blank")}
                className="bg-[#EBE7DF] border-2 border-[#CEBFA7] hover:border-[#C77065] p-6 flex flex-col justify-between items-center gap-4 transition-all cursor-pointer text-left group"
              >
                <div className="w-12 h-12 bg-[#2D1A14] text-white flex items-center justify-center text-2xl font-bold rounded-none">
                  📝
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <h3 className="font-accent text-xl text-[#2D1A14] font-normal group-hover:text-[#C77065]">
                    Blank List
                  </h3>
                  <p className="font-sans text-xs text-[#2D1A14]/70">
                    Start with a clean slate and add custom products yourself as you browse.
                  </p>
                </div>
                <span className="mt-2 px-5 py-2 bg-[#C77065] text-white font-accent text-xs rounded-none group-hover:bg-[#b05d52]">
                  Select Blank List
                </span>
              </button>

              {/* Option B: Journey Template List */}
              <button
                onClick={() => handleTypeChoice("template")}
                className="bg-[#EBE7DF] border-2 border-[#CEBFA7] hover:border-[#8B9A6B] p-6 flex flex-col justify-between items-center gap-4 transition-all cursor-pointer text-left group"
              >
                <div className="w-12 h-12 bg-[#8B9A6B] text-white flex items-center justify-center text-2xl font-bold rounded-none">
                  ✨
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <h3 className="font-accent text-xl text-[#2D1A14] font-normal group-hover:text-[#8B9A6B]">
                    Journey Template
                  </h3>
                  <p className="font-sans text-xs text-[#2D1A14]/70">
                    Pre-populated with Anita's recommended essentials for transport, sleep, and bathing.
                  </p>
                </div>
                <span className="mt-2 px-5 py-2 bg-[#8B9A6B] text-white font-accent text-xs rounded-none hover:bg-[#7a895b]">
                  Select Template
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Step 14: Name Your List Form */}
        {step === "name_list" && (
          <div className="bg-[#EBE7DF] border border-[#CEBFA7] p-8 md:p-12 w-full max-w-md flex flex-col items-center text-center gap-6 shadow-2xl select-none">
            <div className="flex flex-col gap-1">
              <span className="font-sans text-xs font-bold tracking-widest text-[#8B9A6B] uppercase">
                {selectedType === "blank" ? "BLANK LIST SELECTED" : "JOURNEY TEMPLATE SELECTED"}
              </span>
              <h2 className="font-accent text-3xl text-[#2D1A14] font-normal">
                Name your list
              </h2>
            </div>

            <form onSubmit={handleCreateListSubmit} className="flex flex-col gap-4 w-full text-left">
              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
                  List Title
                </label>
                <input
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  placeholder="e.g. Baby Shower Essentials"
                  required
                  autoFocus
                  className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs font-sans text-[#2D1A14] focus:outline-none"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep("choose_type")}
                  className="px-4 py-2 bg-transparent text-[#2D1A14] font-sans text-xs font-semibold hover:underline border-none cursor-pointer"
                >
                  ← Back
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer"
                >
                  Create list
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
