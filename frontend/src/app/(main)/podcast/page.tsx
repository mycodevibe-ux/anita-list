"use client";

import React from "react";
import Link from "next/link";

const episodes = [
  {
    id: 1,
    number: "Episode 12",
    title: "Navigating Newborn Travel: Strollers, Car Seats & Flying with Baby",
    duration: "34 mins",
    guest: "With Travel Expert Sarah Jenkins",
    summary: "Anita discusses newborn travel safety, airplane bassinet bookings, and selecting compact strollers.",
  },
  {
    id: 2,
    number: "Episode 11",
    title: "Nursery Essentials vs. Unnecessary Clutter: What You Really Need",
    duration: "28 mins",
    guest: "Solo Episode by Anita",
    summary: "Anita breaks down popular nursery gadgets and shares her definitive list of non-negotiable newborn essentials.",
  },
  {
    id: 3,
    number: "Episode 10",
    title: "Sleep Training Myths & Safe Sleep Environments",
    duration: "42 mins",
    guest: "With Pediatric Sleep Specialist Dr. Emily Vance",
    summary: "Understanding room temperature, swaddling, Moses baskets, and establishing calm sleep routines.",
  },
];

export default function PodcastPage() {
  return (
    <div className="w-full bg-[#EBE7DF] py-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-[#CEBFA7]/40 pb-6">
          <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
            PODCAST
          </span>
          <h1 className="font-accent text-4xl md:text-[52px] text-[#2D1A14] font-normal leading-tight">
            Anita's List <span className="font-accent italic">Podcast</span>
          </h1>
          <p className="font-sans text-sm text-[#2D1A14]/80 max-w-2xl leading-relaxed mt-1">
            Listen to expert advice, maternity insights, product reviews, and real parent stories on the go. Available on Spotify, Apple Podcasts, and Google Podcasts.
          </p>
        </div>

        {/* Podcast Player Banner */}
        <div className="bg-[#2D1A14] text-[#F8F8F2] p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-xs font-bold tracking-widest text-[#8B9A6B] uppercase">
              LATEST EPISODE
            </span>
            <h2 className="font-accent text-2xl md:text-3xl font-normal">
              Episode 12: Navigating Newborn Travel & Stroller Selection
            </h2>
            <span className="font-sans text-xs text-[#F8F8F2]/70">Hosted by Maternity Nurse Anita</span>
          </div>

          <button
            onClick={() => alert("Playing Anita's List Podcast Episode 12")}
            className="px-8 py-3.5 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer flex-shrink-0 flex items-center gap-2"
          >
            <span>▶</span>
            <span>Listen Now (34m)</span>
          </button>
        </div>

        {/* Episodes List */}
        <div className="flex flex-col gap-6">
          <h2 className="font-accent text-2xl md:text-3xl text-[#2D1A14] font-normal">
            All Episodes
          </h2>

          <div className="flex flex-col gap-4">
            {episodes.map((ep) => (
              <div key={ep.id} className="bg-[#EBE7DF] border border-[#CEBFA7] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-xs font-bold text-[#8B9A6B] uppercase">
                    {ep.number} • {ep.duration} • {ep.guest}
                  </span>
                  <h3 className="font-accent text-xl text-[#2D1A14] font-normal">
                    {ep.title}
                  </h3>
                  <p className="font-sans text-xs text-[#2D1A14]/75">
                    {ep.summary}
                  </p>
                </div>

                <button
                  onClick={() => alert(`Playing ${ep.title}`)}
                  className="px-6 py-2.5 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer flex-shrink-0"
                >
                  Play episode ▶
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
