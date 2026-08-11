"use client";

import React, { useState } from "react";
import Link from "next/link";

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! Welcome to Anita's AI Advice Hub. What baby essentials or pushchairs can I help you choose today?",
      products: [],
    },
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    setInputVal("");

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText, products: [] },
      {
        sender: "bot",
        text: "Based on your request, Anita recommends compact, high-performance pushchairs with strong suspension for smooth city & travel use:",
        products: [
          { id: "1", name: "Bugaboo Fox 5 Renew", price: "£1,299.00", link: "/products/1/pushchairs/1", image: "/images/banner4.jpg" },
          { id: "2", name: "Stokke YOYO3 Lightweight", price: "£450.00", link: "/products/1/pushchairs/1", image: "/images/baby-clothing.png" },
        ],
      },
    ]);
  };

  return (
    <>
      {/* Floating Olive Chat Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 w-12 h-12 rounded-full bg-[#8B9A6B] text-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 z-50 focus:outline-none border-none cursor-pointer"
        aria-label="Open AI advice hub chat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          )}
        </svg>
      </button>

      {/* AI Advice Chatbot Popup Window matching User Flow 1 */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 w-80 md:w-96 bg-[#EBE7DF] border border-[#CEBFA7] shadow-2xl z-50 flex flex-col rounded-none overflow-hidden select-none">
          {/* Header Bar */}
          <div className="bg-[#2D1A14] text-[#F8F8F2] p-4 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#8B9A6B] animate-pulse" />
              <span className="font-accent text-lg font-normal">Anita's AI Advice Hub</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#F8F8F2]/80 hover:text-white border-none bg-transparent cursor-pointer text-sm font-bold"
            >
              ✕
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="p-4 flex flex-col gap-4 max-h-80 overflow-y-auto font-sans text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col gap-2 ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`p-3 max-w-[85%] leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#C77065] text-white"
                      : "bg-white border border-[#CEBFA7] text-[#2D1A14]"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Recommended Product Cards inside Chatbot reply */}
                {msg.products && msg.products.length > 0 && (
                  <div className="flex flex-col gap-2 w-full mt-1">
                    <span className="font-sans text-[10px] font-bold text-[#8B9A6B] uppercase">
                      RECOMMENDED PUSHCHAIRS:
                    </span>
                    {msg.products.map((p) => (
                      <Link
                        key={p.id}
                        href={p.link}
                        onClick={() => setIsOpen(false)}
                        className="bg-white border border-[#CEBFA7] p-2 flex items-center gap-3 hover:border-[#C77065] transition-colors text-decoration-none"
                      >
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-cover bg-[#D4C8B5]" />
                        <div className="flex flex-col gap-0.5 overflow-hidden">
                          <span className="font-accent text-xs text-[#2D1A14] truncate font-normal">{p.name}</span>
                          <span className="font-sans text-[10px] text-[#C77065] font-bold">{p.price}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Prompt Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-[#CEBFA7] bg-[#EBE7DF] flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask Anita's AI advice..."
              className="flex-grow bg-white border border-[#CEBFA7] px-3 py-2 text-xs text-[#2D1A14] placeholder-[#2D1A14]/50 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#C77065] text-[#F8F8F2] font-accent text-xs font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};
