"use client";

import React from "react";
import Link from "next/link";
import { DashboardPanel } from "@/components/hub/DashboardPanel";

export default function NotesPage() {
  return (
    <div className="w-full py-12 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/hub" className="text-gray-medium hover:text-text-dark text-sm font-semibold transition-colors">
          &larr; Back to Hub
        </Link>
      </div>

      <DashboardPanel
        title="All My Notes"
        viewAllHref="/hub"
        actionText="Back to Hub"
      >
        <div className="flex-grow flex items-center justify-center text-sm font-sans text-gray-medium italic py-12">
          Notes list coming soon...
        </div>
      </DashboardPanel>
    </div>
  );
}
