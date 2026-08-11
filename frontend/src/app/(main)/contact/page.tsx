"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#EBE7DF] py-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-[#CEBFA7]/40 pb-6">
          <span className="font-sans text-xs font-bold tracking-widest text-[#2D1A14] uppercase">
            CONTACT US
          </span>
          <h1 className="font-accent text-4xl md:text-[52px] text-[#2D1A14] font-normal leading-tight">
            We'd love to <span className="font-accent italic">hear from you</span>
          </h1>
          <p className="font-sans text-sm text-[#2D1A14]/80 max-w-2xl leading-relaxed mt-1">
            Have a question about your registry, consultation booking, or product recommendations? Send us a message and Anita's team will get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Details */}
          <div className="flex flex-col gap-6 font-sans text-sm text-[#2D1A14]/90 leading-relaxed">
            <div className="bg-[#EBE7DF] border border-[#CEBFA7] p-6 flex flex-col gap-3">
              <h3 className="font-accent text-xl text-[#2D1A14] font-normal">General Inquiries</h3>
              <p className="font-sans text-xs text-[#2D1A14]/75">
                Email: <span className="font-bold text-[#C77065]">hello@anitaslist.com</span>
              </p>
              <p className="font-sans text-xs text-[#2D1A14]/75">
                Hours: Monday – Friday, 9:00am – 6:00pm GMT
              </p>
            </div>

            <div className="bg-[#EBE7DF] border border-[#CEBFA7] p-6 flex flex-col gap-3">
              <h3 className="font-accent text-xl text-[#2D1A14] font-normal">Private Consultations</h3>
              <p className="font-sans text-xs text-[#2D1A14]/75">
                To book a 1-on-1 consultation with Anita, mention your preferred dates and due date in the form message.
              </p>
            </div>
          </div>

          {/* Right Contact Form */}
          <form onSubmit={handleSubmit} className="bg-[#EBE7DF] border border-[#CEBFA7] p-8 flex flex-col gap-5">
            <h3 className="font-accent text-2xl text-[#2D1A14] font-normal">Send a Message</h3>

            {submitted ? (
              <div className="p-4 bg-[#8B9A6B] text-white font-sans text-xs font-bold">
                ✓ Thank you for contacting Anita's List! We have received your message and will respond shortly.
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-xs font-bold uppercase text-[#2D1A14]">Your Name</label>
                  <input type="text" required className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs focus:outline-none" placeholder="Jane Doe" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-sans text-xs font-bold uppercase text-[#2D1A14]">Email Address</label>
                  <input type="email" required className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs focus:outline-none" placeholder="jane@example.com" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-sans text-xs font-bold uppercase text-[#2D1A14]">Message</label>
                  <textarea rows={4} required className="bg-[#EBE7DF] border border-[#CEBFA7] p-3 text-xs focus:outline-none" placeholder="How can we help you?" />
                </div>

                <button type="submit" className="px-6 py-3 bg-[#C77065] text-[#F8F8F2] font-accent text-sm font-medium rounded-none hover:bg-[#b05d52] transition-colors border-none cursor-pointer">
                  Send Message
                </button>
              </>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}
