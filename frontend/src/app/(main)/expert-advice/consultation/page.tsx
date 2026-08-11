import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function ConsultationPage() {
  return (
    <div className="bg-cream min-h-screen">
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-coral">
              Private Services
            </span>
            <h1 className="font-accent italic text-5xl md:text-6xl text-brown-dark font-bold leading-tight">
              1-on-1 Consultations
            </h1>
            <p className="font-sans text-lg text-brown-dark/70 leading-relaxed">
              Get personalized advice tailored to your unique lifestyle, budget, and family needs. Whether you need a complete nursery setup plan or just a quick registry review, Anita is here to help.
            </p>
            <ul className="space-y-4 my-4">
              {[
                "Personalized Registry Curation",
                "Nursery Design & Safety Audit",
                "Product Recommendations based on Lifestyle",
                "Postpartum Essentials Planning"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-olive/20 flex items-center justify-center text-olive flex-shrink-0">
                    ✓
                  </div>
                  <span className="font-sans text-brown-dark font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Button variant="coral" size="lg" rounded="full" className="px-8">
                Book a Session
              </Button>
            </div>
          </div>
          
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/hero-3.jpg"
              alt="Consultation with Anita"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
