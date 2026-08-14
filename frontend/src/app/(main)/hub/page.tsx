"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { UserProfileBanner } from "@/components/hub/UserProfileBanner";
import { DashboardPanel } from "@/components/hub/DashboardPanel";
import { ListItemRow } from "@/components/hub/ListItemRow";

const defaultLists = [
  { id: "1", title: "Lorem ipsum dolor" },
  { id: "2", title: "Dolor sit amet consectetur" },
  { id: "3", title: "Consectetur amet" },
  { id: "4", title: "Ipsum dolor sit" },
];

export default function HubDashboard() {
  const router = useRouter();

  const [lists, setLists] = useState(defaultLists);

  const [registries, setRegistries] = useState([
    { id: "r1", title: "Lorem ipsum dolor", type: "gold" as const },
    { id: "r2", title: "Amet consectetur", type: "olive" as const },
    { id: "r3", title: "Consectetur amet", type: "gold" as const },
    { id: "r4", title: "Ipsum dolor sit", type: "olive" as const },
  ]);

  const [dates, setDates] = useState([
    { id: "d1", title: "Baby Due Date", date: "15/10/2026" },
    { id: "d2", title: "20-Week Ultrasound Scan", date: "01/06/2026" },
    { id: "d3", title: "Nursery Setup Target Date", date: "20/08/2026" },
    { id: "d4", title: "Hospital Bag Packing Date", date: "01/09/2026" },
  ]);

  const [notes, setNotes] = useState([
    { id: "n1", title: "Stroller comparison notes (Bugaboo vs Stokke)" },
    { id: "n2", title: "Nursery color palette ideas" },
    { id: "n3", title: "Hospital bag packing list reminder" },
    { id: "n4", title: "Questions for Anita consultation" },
  ]);

  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [newDateTitle, setNewDateTitle] = useState("");
  const [newDateVal, setNewDateVal] = useState("");

  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");

  const [viewDetailModal, setViewDetailModal] = useState<{
    type: "date" | "note";
    title: string;
    detail: string;
  } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("anita_user_lists");
    if (saved) {
      try {
        setLists(JSON.parse(saved));
      } catch (e) {
        setLists(defaultLists);
      }
    } else {
      localStorage.setItem("anita_user_lists", JSON.stringify(defaultLists));
    }
  }, []);

  const handleCreateNewList = () => {
    const title = prompt("Enter a title for your new list:");
    if (!title) return;

    const newList = {
      id: Date.now().toString(),
      title,
      updated_at: new Date().toLocaleDateString(),
    };

    const updated = [newList, ...lists];
    setLists(updated);
    localStorage.setItem("anita_user_lists", JSON.stringify(updated));
  };

  const handleAddKeyDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDateTitle.trim()) return;

    const newDate = {
      id: `d_${Date.now()}`,
      title: newDateTitle,
      date: newDateVal || new Date().toLocaleDateString(),
    };

    setDates([newDate, ...dates]);
    setNewDateTitle("");
    setNewDateVal("");
    setIsDateModalOpen(false);
  };

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;

    const newNote = {
      id: `n_${Date.now()}`,
      title: newNoteTitle,
    };

    setNotes([newNote, ...notes]);
    setNewNoteTitle("");
    setIsNoteModalOpen(false);
  };

  const handleDeleteList = (id: string) => {
    const updated = lists.filter((item) => item.id !== id);
    setLists(updated);
    localStorage.setItem("anita_user_lists", JSON.stringify(updated));
  };

  const handleDeleteRegistry = (id: string) => {
    setRegistries((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteDate = (id: string) => {
    setDates((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((item) => item.id !== id));
  };

  const { user } = useAuth();
  const userName = user?.name || "Anne Johnson";
  const avatarInitials = user?.name 
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AJ";
  const avatarUrl = user?.avatar;

  return (
    <div className="w-full bg-[#EBE7DF] py-10 px-6 md:px-12 lg:px-16 select-none min-h-screen">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
        
        {/* Top Profile Welcome Banner */}
        <UserProfileBanner userName={userName} avatarText={avatarInitials} avatarUrl={avatarUrl} />

        {/* 2x2 Dashboard Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border border-[#CEBFA7] bg-[#EBE7DF] p-6 md:p-8 relative">
          
          {/* Panel 1: My Lists */}
          <DashboardPanel
            title="My lists"
            actionText="Create new list"
            onActionClick={handleCreateNewList}
            viewAllHref="/hub/lists"
            viewAllText="View all lists"
            className="border-b lg:border-r border-[#CEBFA7] pb-8 lg:pb-0 lg:pr-8"
          >
            {lists.map((list) => (
              <ListItemRow
                key={list.id}
                title={list.title}
                buttonLabel="View list"
                onButtonClick={() => router.push(`/hub/lists/${list.id}`)}
                onDeleteClick={() => handleDeleteList(list.id)}
              />
            ))}
          </DashboardPanel>

          {/* Panel 2: My Registries */}
          <DashboardPanel
            title="My registries"
            viewAllHref="/hub/registries"
            viewAllText="View all registries"
            className="border-b border-[#CEBFA7] pb-8 lg:pb-0"
            legend={
              <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-[#2D1A14] select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-[#8B9A6B]" />
                  <span>My registries</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-[#D4A359]" />
                  <span>Registries shared with me</span>
                </div>
              </div>
            }
          >
            {registries.map((reg) => (
              <ListItemRow
                key={reg.id}
                title={reg.title}
                colorIndicator={reg.type}
                buttonLabel="View registry"
                onButtonClick={() => router.push(`/hub/registries/${reg.id}`)}
                onDeleteClick={reg.type === "olive" ? () => handleDeleteRegistry(reg.id) : undefined}
              />
            ))}
          </DashboardPanel>

          {/* Panel 3: My Key Dates */}
          <DashboardPanel
            title="My key dates"
            actionText="Add new key date"
            onActionClick={() => setIsDateModalOpen(true)}
            viewAllHref="/hub/dates"
            viewAllText="View all dates"
            className="lg:border-r border-[#CEBFA7] lg:pr-8"
          >
            {dates.map((dt) => (
              <ListItemRow
                key={dt.id}
                title={dt.title}
                subtitle={dt.date}
                buttonLabel="View details"
                onButtonClick={() => setViewDetailModal({
                  type: "date",
                  title: dt.title,
                  detail: `Target Date: ${dt.date}`,
                })}
                onDeleteClick={() => handleDeleteDate(dt.id)}
              />
            ))}
          </DashboardPanel>

          {/* Panel 4: My Notes */}
          <DashboardPanel
            title="My notes"
            actionText="Add new note"
            onActionClick={() => setIsNoteModalOpen(true)}
            viewAllHref="/hub/notes"
            viewAllText="View all notes"
          >
            {notes.map((note) => (
              <ListItemRow
                key={note.id}
                title={note.title}
                buttonLabel="View note"
                onButtonClick={() => setViewDetailModal({
                  type: "note",
                  title: note.title,
                  detail: "Personal research and reminder note saved in your Anita's List dashboard.",
                })}
                onDeleteClick={() => handleDeleteNote(note.id)}
              />
            ))}
          </DashboardPanel>

        </div>

      </div>

      {/* POP-UP MODAL: Add New Key Date */}
      {isDateModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#EBE7DF] border border-[#CEBFA7] w-full max-w-md p-6 flex flex-col gap-5 shadow-2xl relative select-none">
            <div className="flex justify-between items-center border-b border-[#CEBFA7]/40 pb-3">
              <h3 className="font-accent text-2xl font-normal text-[#2D1A14]">Key date</h3>
              <button
                onClick={() => setIsDateModalOpen(false)}
                className="text-[#2D1A14] font-bold text-lg border-none bg-transparent cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddKeyDateSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
                  Event / Milestone Title
                </label>
                <input
                  type="text"
                  value={newDateTitle}
                  onChange={(e) => setNewDateTitle(e.target.value)}
                  placeholder="e.g. Baby Due Date"
                  required
                  className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs font-sans text-[#2D1A14] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
                  Date
                </label>
                <input
                  type="text"
                  value={newDateVal}
                  onChange={(e) => setNewDateVal(e.target.value)}
                  placeholder="e.g. 15/10/2026"
                  className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs font-sans text-[#2D1A14] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDateModalOpen(false)}
                  className="px-5 py-2.5 bg-transparent text-[#2D1A14] font-sans text-xs font-semibold hover:underline border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer"
                >
                  Add new key date
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POP-UP MODAL: Add New Note */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#EBE7DF] border border-[#CEBFA7] w-full max-w-md p-6 flex flex-col gap-5 shadow-2xl relative select-none">
            <div className="flex justify-between items-center border-b border-[#CEBFA7]/40 pb-3">
              <h3 className="font-accent text-2xl font-normal text-[#2D1A14]">New note</h3>
              <button
                onClick={() => setIsNoteModalOpen(false)}
                className="text-[#2D1A14] font-bold text-lg border-none bg-transparent cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNoteSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
                  Note Content / Free-text
                </label>
                <textarea
                  rows={4}
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Enter your personal note here..."
                  required
                  className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs font-sans text-[#2D1A14] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNoteModalOpen(false)}
                  className="px-5 py-2.5 bg-transparent text-[#2D1A14] font-sans text-xs font-semibold hover:underline border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer"
                >
                  Add new note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POP-UP MODAL: View Item Details */}
      {viewDetailModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#EBE7DF] border border-[#CEBFA7] w-full max-w-md p-6 flex flex-col gap-5 shadow-2xl relative select-none">
            <div className="flex justify-between items-center border-b border-[#CEBFA7]/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{viewDetailModal.type === "date" ? "📅" : "📝"}</span>
                <span className="font-sans text-xs font-bold tracking-widest text-[#8B9A6B] uppercase">
                  {viewDetailModal.type === "date" ? "KEY DATE DETAIL" : "NOTE DETAIL"}
                </span>
              </div>
              <button
                onClick={() => setViewDetailModal(null)}
                className="text-[#2D1A14] font-bold text-lg border-none bg-transparent cursor-pointer hover:text-[#C77065]"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-accent text-2xl font-normal text-[#2D1A14]">
                {viewDetailModal.title}
              </h3>
              
              <div className="bg-white border border-[#CEBFA7] p-4 flex flex-col gap-1 shadow-sm">
                <span className="font-sans text-[10px] font-bold text-[#8B9A6B] uppercase">
                  {viewDetailModal.type === "date" ? "TARGET DATE" : "NOTE CONTENT"}
                </span>
                <p className="font-sans text-sm text-[#2D1A14] leading-relaxed">
                  {viewDetailModal.detail}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setViewDetailModal(null)}
                className="px-6 py-2.5 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
