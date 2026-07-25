"use client";

import React, { useState } from "react";
import { useTranslation } from "@/lib/i18n/context";

export function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Use type assertion since we know items is an array of objects
  const faqs = t("faq.items") as unknown as Array<{q: string, a: string}>;

  return (
    <section id="faq" className="py-20 bg-[#12121a]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          <div className="md:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("faq.title")}</h2>
            <p className="text-[#8888a0] mb-8">{t("faq.subtitle")}</p>
            
            <div className="p-6 rounded-2xl glass border-[#22223a] shadow-lg">
              <h3 className="font-bold text-lg mb-2">Vous avez d'autres questions ?</h3>
              <p className="text-[#8888a0] text-sm mb-6">Notre équipe est disponible sur WhatsApp pour répondre à toutes vos interrogations.</p>
              <a 
                href="https://wa.me/237659605092?text=Bonjour,%20j'ai%20une%20question%20concernant%20vos%20services." 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#06b6d4] font-medium hover:text-[#7c3aed] transition-colors"
              >
                Discuter avec nous
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="space-y-4">
              {Array.isArray(faqs) && faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`border border-[#22223a] rounded-xl overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "bg-[#12121a] shadow-md border-[#3a3a52]" : "bg-[#0a0a0f] hover:border-[#3a3a52]"
                  }`}
                >
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className={`font-semibold transition-colors ${openIndex === index ? "text-[#f0f0f5]" : "text-[#d0d0d5]"}`}>
                      {faq.q}
                    </span>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? "bg-[#7c3aed]/20 text-[#7c3aed] rotate-180" : "bg-[#12121a] text-[#8888a0]"}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </span>
                  </button>
                  
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-[#8888a0] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
