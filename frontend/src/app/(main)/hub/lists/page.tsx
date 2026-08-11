"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ListCard } from "@/components/hub/ListCard";

interface UserList {
  id: string;
  title: string;
  updated_at: string;
  progress: number;
  imageUrl: string;
}

const defaultLists: UserList[] = [
  { id: "1", title: "Lorem ipsum dolor", updated_at: "10 July 2026", progress: 65, imageUrl: "/images/banner4.jpg" },
  { id: "2", title: "Dolor sit amet consectetur", updated_at: "11 June 2026", progress: 40, imageUrl: "/images/baby-clothing.png" },
  { id: "3", title: "Consectetur amet", updated_at: "8 June 2026", progress: 85, imageUrl: "/images/bathing.png" },
  { id: "4", title: "Ipsum dolor sit", updated_at: "20 May 2026", progress: 90, imageUrl: "/images/bedding.png" },
];

export default function ListHub() {
  const router = useRouter();
  const [lists, setLists] = useState<UserList[]>([]);

  useEffect(() => {
    // Load lists from LocalStorage or default mock lists
    const saved = localStorage.getItem("anita_user_lists");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with default images/progress if missing
          const formatted = parsed.map((item, idx) => ({
            id: item.id || (idx + 1).toString(),
            title: item.title || "Lorem ipsum dolor",
            updated_at: item.updated_at || "10 July 2026",
            progress: item.progress || (idx % 2 === 0 ? 65 : 40),
            imageUrl: item.imageUrl || defaultLists[idx % defaultLists.length].imageUrl,
          }));
          setLists(formatted);
        } else {
          setLists(defaultLists);
        }
      } catch (e) {
        setLists(defaultLists);
      }
    } else {
      setLists(defaultLists);
      localStorage.setItem("anita_user_lists", JSON.stringify(defaultLists));
    }
  }, []);

  const saveLists = (updated: UserList[]) => {
    setLists(updated);
    localStorage.setItem("anita_user_lists", JSON.stringify(updated));
  };

  const handleCreateNewList = () => {
    const title = prompt("Enter a title for your new list:");
    if (!title) return;

    const sampleImages = ["/images/banner4.jpg", "/images/baby-clothing.png", "/images/bathing.png", "/images/bedding.png"];
    const newList: UserList = {
      id: Date.now().toString(),
      title,
      updated_at: new Date().toLocaleDateString(),
      progress: 30,
      imageUrl: sampleImages[lists.length % sampleImages.length],
    };

    const updated = [newList, ...lists];
    saveLists(updated);
  };

  const handleRename = (id: string) => {
    const list = lists.find((l) => l.id === id);
    const newTitle = prompt("Enter new title for list:", list?.title);
    if (!newTitle) return;

    const updated = lists.map((l) => (l.id === id ? { ...l, title: newTitle } : l));
    saveLists(updated);
  };

  const handleConvertToRegistry = (id: string) => {
    alert("List converted to Registry successfully!");
    router.push("/hub/registries");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this list?")) {
      const updated = lists.filter((item) => item.id !== id);
      saveLists(updated);
    }
  };

  return (
    <div className="w-full bg-[#EBE7DF] py-10 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
        
        {/* Top Navigation Bar: Back Button Left + My Lists Heading Right */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#CEBFA7]/40 pb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/hub"
              className="w-[38px] h-[38px] bg-[#C77065] text-[#F8F8F2] flex items-center justify-center font-bold text-lg rounded-none hover:bg-[#b05d52] transition-colors cursor-pointer text-decoration-none"
              aria-label="Back to My hub"
            >
              ‹
            </Link>
            <Link
              href="/hub"
              className="font-sans text-xs font-semibold text-[#2D1A14] hover:text-[#C77065] transition-colors"
            >
              Back to My hub
            </Link>
          </div>

          <h1 className="font-accent text-4xl md:text-[52px] font-normal text-[#2D1A14] leading-tight">
            <span className="font-accent italic">My</span> lists
          </h1>
        </div>

        {/* Description Paragraph & Create New List CTA Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-2">
          <p className="font-accent text-xl md:text-[26px] font-normal text-[#2D1A14] max-w-3xl leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Bibendum odio sit amet aliquam sit ultrices{" "}
            <span className="font-accent italic">nibh feugiat lacus.</span>
          </p>

          <div className="flex items-center gap-3 flex-shrink-0 select-none">
            <span className="font-sans text-xs font-semibold text-[#2D1A14]">
              Create new list
            </span>
            <button
              onClick={handleCreateNewList}
              className="w-[42px] h-[42px] bg-[#C77065] text-[#F8F8F2] flex items-center justify-center font-bold text-2xl rounded-none hover:bg-[#b05d52] transition-colors cursor-pointer border-none"
              aria-label="Create new list"
            >
              +
            </button>
          </div>
        </div>

        {/* Main Content Area: 4-Column Cards Grid OR Centered Empty State */}
        {lists.length === 0 ? (
          /* Empty State strictly matching Figma Screenshot 'List hub page with no lists (Desktop)' */
          <div className="w-full py-20 flex flex-col items-center justify-center text-center gap-4 bg-[#EBE7DF] border border-[#CEBFA7] my-4 p-8">
            <h2 className="font-accent text-2xl md:text-3xl font-normal text-[#2D1A14]">
              You currently have no lists yet.
            </h2>
            <p className="font-sans text-xs md:text-sm text-[#2D1A14]/75 max-w-md leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Arcu arcu fusce vitae mi mauris imperdiet dui velit eget.
            </p>
            <button
              onClick={handleCreateNewList}
              className="mt-4 px-8 py-3 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer"
            >
              Create your first list
            </button>
          </div>
        ) : (
          /* 4-Column Cards Grid matching Figma Screenshot 'List hub page with active lists (Desktop)' */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {lists.map((list) => (
              <ListCard
                key={list.id}
                id={list.id}
                title={list.title}
                editedDate={`Edited ${list.updated_at}`}
                progress={list.progress}
                imageUrl={list.imageUrl}
                onRename={() => handleRename(list.id)}
                onConvertToRegistry={() => handleConvertToRegistry(list.id)}
                onDelete={() => handleDelete(list.id)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
