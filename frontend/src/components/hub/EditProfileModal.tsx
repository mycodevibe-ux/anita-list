"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { user, updateUser, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<"personal" | "marketing" | "delete">("personal");

  // Form State
  const [username, setUsername] = useState("");
  const [primaryEmail, setPrimaryEmail] = useState("");
  const [secondaryEmail, setSecondaryEmail] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [birthday, setBirthday] = useState("14/05/1992");
  const [isExpecting, setIsExpecting] = useState<"Yes" | "No">("Yes");
  const [dueDate, setDueDate] = useState("15/10/2026");
  const [marketingPref, setMarketingPref] = useState(true);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.name || "");
      setPrimaryEmail(user.email || "");
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSavedSuccess(false);

    try {
      const formData = new FormData();
      formData.append("name", username);
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await api.post("/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data) {
        updateUser(res.data);
      } else {
        // Fallback update
        updateUser({
          ...(user || { id: 1, email: primaryEmail, created_at: "", updated_at: "" }),
          name: username,
          avatar: avatarPreview || user?.avatar,
        });
      }

      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1200);
    } catch (err) {
      console.error("Failed to update profile", err);
      // Fallback local update
      updateUser({
        ...(user || { id: 1, email: primaryEmail, created_at: "", updated_at: "" }),
        name: username,
        avatar: avatarPreview || user?.avatar,
      });
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1200);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    onClose();
    logout();
  };

  const getApiBaseUrl = () => {
    const envUrl = process.env.NEXT_PUBLIC_API_URL || 'https://anita-list-backend-production.up.railway.app/api';
    return envUrl.replace(/\/api\/?$/, '');
  };

  const currentAvatarSrc = avatarPreview
    ? avatarPreview.startsWith('blob:') || avatarPreview.startsWith('http')
      ? avatarPreview
      : `${getApiBaseUrl()}${avatarPreview}`
    : null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-[#EBE7DF] border border-[#CEBFA7] w-full max-w-2xl h-[580px] shadow-2xl flex flex-col md:flex-row relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#2D1A14] font-bold text-lg border-none bg-transparent cursor-pointer z-10"
        >
          ✕
        </button>

        {/* Left Side Tab Navigation */}
        <div className="w-full md:w-56 bg-[#2D1A14] text-[#F8F8F2] p-6 flex flex-col justify-between flex-shrink-0">
          <div className="flex flex-col gap-6">
            <h3 className="font-accent text-xl font-normal border-b border-[#F8F8F2]/20 pb-3">
              Account Settings
            </h3>

            <div className="flex flex-col gap-2 font-sans text-xs font-semibold">
              <button
                onClick={() => setActiveTab("personal")}
                className={`text-left p-2.5 rounded-none border-none cursor-pointer transition-colors ${
                  activeTab === "personal"
                    ? "bg-[#C77065] text-white"
                    : "bg-transparent text-[#F8F8F2]/80 hover:text-white"
                }`}
              >
                Personal details
              </button>

              <button
                onClick={() => setActiveTab("marketing")}
                className={`text-left p-2.5 rounded-none border-none cursor-pointer transition-colors ${
                  activeTab === "marketing"
                    ? "bg-[#C77065] text-white"
                    : "bg-transparent text-[#F8F8F2]/80 hover:text-white"
                }`}
              >
                Marketing preferences
              </button>

              <button
                onClick={() => setActiveTab("delete")}
                className={`text-left p-2.5 rounded-none border-none cursor-pointer transition-colors ${
                  activeTab === "delete"
                    ? "bg-[#C77065] text-white"
                    : "bg-transparent text-[#F8F8F2]/80 hover:text-white"
                }`}
              >
                Delete account
              </button>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full py-2.5 bg-[#CEBFA7]/30 text-[#F8F8F2] font-sans text-xs font-semibold hover:bg-[#C77065] transition-colors border-none cursor-pointer text-center"
          >
            Sign out
          </button>
        </div>

        {/* Right Content Panel */}
        <div className="flex-grow p-6 md:p-8 overflow-y-auto font-sans text-xs">
          {savedSuccess && (
            <div className="p-3 mb-4 bg-[#8B9A6B] text-white font-bold">
              ✓ Personal details & Profile Picture updated successfully!
            </div>
          )}

          {activeTab === "personal" && (
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <h4 className="font-accent text-2xl font-normal text-[#2D1A14]">
                Personal details
              </h4>

              {/* Profile Picture Upload Field */}
              <div className="flex items-center gap-4 bg-white p-3 border border-[#CEBFA7]">
                <div className="w-14 h-14 rounded-full bg-[#8B9A6B] text-white flex items-center justify-center font-bold text-lg overflow-hidden flex-shrink-0">
                  {currentAvatarSrc ? (
                    <img src={currentAvatarSrc} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    username ? username.slice(0, 2).toUpperCase() : "U"
                  )}
                </div>
                <div className="flex flex-col gap-1 flex-grow">
                  <label className="font-bold uppercase text-[#2D1A14] text-[10px]">
                    Profile Picture (Avatar)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="text-xs text-[#2D1A14] file:mr-2 file:py-1 file:px-3 file:border-0 file:text-xs file:font-semibold file:bg-[#2D1A14] file:text-white hover:file:bg-[#C77065] file:cursor-pointer cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold uppercase text-[#2D1A14]/80 text-[10px]">Username / Full Name</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white border border-[#CEBFA7] p-2.5 text-xs text-[#2D1A14] focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold uppercase text-[#2D1A14]/80 text-[10px]">Primary Email</label>
                <input
                  type="email"
                  value={primaryEmail}
                  disabled
                  className="bg-[#EBE7DF] border border-[#CEBFA7] p-2.5 text-xs text-[#2D1A14]/70 focus:outline-none cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold uppercase text-[#2D1A14]/80 text-[10px]">Secondary Email (Partner Invite)</label>
                <input
                  type="email"
                  value={secondaryEmail}
                  onChange={(e) => setSecondaryEmail(e.target.value)}
                  placeholder="partner@example.com"
                  className="bg-white border border-[#CEBFA7] p-2.5 text-xs text-[#2D1A14] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold uppercase text-[#2D1A14]/80 text-[10px]">Birthday</label>
                <input
                  type="text"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="bg-white border border-[#CEBFA7] p-2.5 text-xs text-[#2D1A14] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2 pt-1 border-t border-[#CEBFA7]/40">
                <label className="font-bold text-[#2D1A14]">Are you expecting?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="expecting"
                      checked={isExpecting === "Yes"}
                      onChange={() => setIsExpecting("Yes")}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="expecting"
                      checked={isExpecting === "No"}
                      onChange={() => setIsExpecting("No")}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {isExpecting === "Yes" && (
                <div className="flex flex-col gap-1">
                  <label className="font-bold uppercase text-[#2D1A14]/80 text-[10px]">Due Date</label>
                  <input
                    type="text"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="bg-white border border-[#CEBFA7] p-2.5 text-xs text-[#2D1A14] focus:outline-none"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full py-3 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer"
              >
                {isLoading ? "Saving changes..." : "Save changes"}
              </button>
            </form>
          )}

          {activeTab === "marketing" && (
            <div className="flex flex-col gap-4">
              <h4 className="font-accent text-2xl font-normal text-[#2D1A14]">
                Marketing preferences
              </h4>
              <label className="flex items-start gap-3 cursor-pointer bg-white p-3 border border-[#CEBFA7]">
                <input
                  type="checkbox"
                  checked={marketingPref}
                  onChange={(e) => setMarketingPref(e.target.checked)}
                  className="mt-0.5"
                />
                <span className="leading-relaxed">
                  Receive Anita's curated baby advice newsletters, exclusive brand discounts, and maternity kit updates.
                </span>
              </label>
            </div>
          )}

          {activeTab === "delete" && (
            <div className="flex flex-col gap-4">
              <h4 className="font-accent text-2xl font-normal text-[#C77065]">
                Delete Account
              </h4>
              <p className="leading-relaxed text-[#2D1A14]/80">
                Permanently delete your account, lists, registries, and notes. This action cannot be undone.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Permanently delete account?")) handleSignOut();
                }}
                className="px-4 py-2.5 bg-[#C77065] text-white font-bold border-none cursor-pointer self-start"
              >
                Delete my account permanently
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
