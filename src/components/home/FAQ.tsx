"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "@/lib/i18n/context";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Use type assertion since we know items is an array of objects
  const faqs = t("faq.items") as unknown as Array<{ q: string; a: string }>;

  return (
    <section id="faq" className="py-20 bg-[#ebe5de]/80 backdrop-blur-md border-y border-white/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          <Reveal direction="left" className="md:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1e2d3d]">
              {t("faq.title")}
            </h2>
            <p className="text-[#6b7b8d] mb-8">{t("faq.subtitle")}</p>

            <div className="p-6 rounded-2xl glass border-[#d4cdc5] shadow-lg">
              <h3 className="font-bold text-lg mb-2 text-[#1e2d3d]">
                Vous avez d&apos;autres questions ?
              </h3>
              <p className="text-[#6b7b8d] text-sm mb-6">
                Notre équipe est disponible sur WhatsApp pour répondre à toutes
                vos interrogations.
              </p>
              <a
                href="https://wa.me/237659605092?text=Bonjour,%20j'ai%20une%20question%20concernant%20vos%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#c8944e] font-medium hover:text-[#d4a96a] transition-colors"
              >
                Discuter avec nous
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </Reveal>

          <Stagger as="div" className="md:w-2/3" stagger={0.1}>
            <div className="space-y-4">
              {Array.isArray(faqs) &&
                faqs.map((faq, index) => (
                  <StaggerItem key={index}>
                    <div
                      className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
                        openIndex === index
                          ? "bg-white shadow-md border-[#c8944e]/50"
                          : "bg-[#f5f0eb] hover:border-[#b8b0a6] border-[#d4cdc5]"
                      }`}
                    >
                      <button
                        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                        onClick={() =>
                          setOpenIndex(openIndex === index ? null : index)
                        }
                      >
                        <span
                          className={`font-semibold transition-colors ${
                            openIndex === index
                              ? "text-[#1e2d3d]"
                              : "text-[#4a5568]"
                          }`}
                        >
                          {faq.q}
                        </span>
                        <motion.span
                          animate={{ rotate: openIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                            openIndex === index
                              ? "bg-[#c8944e]/20 text-[#c8944e]"
                              : "bg-white text-[#9ca3af]"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {openIndex === index && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="text-[#6b7b8d] leading-relaxed px-6 pb-6">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </StaggerItem>
                ))}
            </div>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
