"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { EditProfileModal } from "@/components/hub/EditProfileModal";

export interface UserProfileBannerProps {
  className?: string;
  userName: string;
  avatarText?: string;
  avatarUrl?: string;
}

export const UserProfileBanner: React.FC<UserProfileBannerProps> = ({
  className,
  userName = "Anne Johnson",
  avatarText = "AJ",
  avatarUrl,
}) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "w-full bg-[#EBE7DF] py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 select-none",
          className
        )}
      >
        {/* Left: User Avatar & Profile Info */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-[#8B9A6B] text-white flex items-center justify-center font-sans text-2xl font-bold overflow-hidden shadow-sm flex-shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl.startsWith('http') || avatarUrl.startsWith('blob:') ? avatarUrl : `${(process.env.NEXT_PUBLIC_API_URL || 'https://anita-list-backend-production.up.railway.app/api').replace(/\/api\/?$/, '')}${avatarUrl}`}
                alt="Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              avatarText
            )}
          </div>
          <div className="flex flex-col items-start gap-0.5">
            <h2 className="font-accent text-2xl md:text-3xl font-normal text-[#2D1A14]">
              {userName}
            </h2>
            {/* Step 1 Wireframe 9: Edit profile button triggers pop-up modal */}
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="font-sans text-xs text-[#2D1A14]/80 underline hover:text-[#C77065] transition-colors border-none bg-transparent cursor-pointer p-0"
            >
              Edit profile
            </button>
          </div>
        </div>

        {/* Right: Welcome Heading Statement */}
        <div className="text-left md:text-right">
          <h1 className="font-accent text-3xl md:text-[44px] font-normal text-[#2D1A14] leading-tight">
            <span className="font-accent italic">Welcome</span> to your hub
          </h1>
        </div>
      </div>

      {/* Wireframe 9 Pop-up Modal Window for Personal Details */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />
    </>
  );
};
