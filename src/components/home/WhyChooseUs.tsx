"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { motion, AnimatePresence } from "motion/react";

/* ─── Icons ──────────────────────────────────────────── */

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/* ─── Types ───────────────────────────────────────────── */

interface ComparisonItem {
  criterion: string;
  human: string;
  ai: string;
}

interface NewsItem {
  badge: string;
  flag: string;
  image?: string;
  title: string;
  desc: string;
  source: string;
  sourceLabel: string;
}

/* ─── Stacked Card Carousel ──────────────────────────── */

interface StackedCarouselProps {
  children: React.ReactNode[];
  className?: string;
}

function StackedCarousel({ children, className = "" }: StackedCarouselProps) {
  const [active, setActive] = useState(0);
  const total = children.length;

  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);

  // Show up to 3 stacked cards behind
  const getCardStyle = (index: number) => {
    const diff = (index - active + total) % total;
    if (diff === 0) {
      // Active card — front
      return {
        zIndex: 30,
        transform: "translateX(0) scale(1)",
        opacity: 1,
        filter: "none",
      };
    } else if (diff === 1) {
      // 1st behind — slightly right and down
      return {
        zIndex: 20,
        transform: "translateX(12px) translateY(10px) scale(0.96)",
        opacity: 0.7,
        filter: "brightness(0.95)",
      };
    } else if (diff === 2) {
      // 2nd behind
      return {
        zIndex: 10,
        transform: "translateX(24px) translateY(20px) scale(0.92)",
        opacity: 0.4,
        filter: "brightness(0.9)",
      };
    } else {
      // Hidden
      return {
        zIndex: 0,
        transform: "translateX(36px) translateY(30px) scale(0.88)",
        opacity: 0,
        filter: "brightness(0.85)",
      };
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 flex items-center justify-center bg-white rounded-full shadow-lg border border-[#d4cdc5] hover:border-[#c8944e] hover:shadow-xl transition-all duration-200 active:scale-95"
        aria-label="Précédent"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={next}
        className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 flex items-center justify-center bg-white rounded-full shadow-lg border border-[#d4cdc5] hover:border-[#c8944e] hover:shadow-xl transition-all duration-200 active:scale-95"
        aria-label="Suivant"
      >
        <ChevronRight />
      </button>

      {/* Card stack */}
      <div className="relative mx-6 md:mx-8" style={{ minHeight: "200px" }}>
        {children.map((child, index) => {
          const style = getCardStyle(index);
          return (
            <motion.div
              key={index}
              className="absolute inset-0 w-full"
              animate={style}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ pointerEvents: (index - active + total) % total === 0 ? "auto" : "none" }}
            >
              {child}
            </motion.div>
          );
        })}
      </div>

      {/* Dots indicator */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === active
                ? "bg-[#c8944e] w-6"
                : "bg-[#d4cdc5] hover:bg-[#c8944e]/50"
            }`}
            aria-label={`Aller à la carte ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────── */

export function WhyChooseUs() {
  const { t } = useTranslation();

  const comparison = t("whyChooseUs.comparison") as unknown as ComparisonItem[];
  const news = t("whyChooseUs.news") as unknown as NewsItem[];

  return (
    <section
      id="why-us"
      className="relative py-24 overflow-hidden"
    >
      {/* Light background */}
      <div className="absolute inset-0 bg-[#f5f0eb]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#ebe5de] via-[#f5f0eb] to-[#f5f0eb]" />
      {/* Decorative glow orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#c8944e] blur-[200px] opacity-[0.12] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#c8944e] blur-[180px] opacity-[0.08] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* ── Section header ─────────────────────────── */}
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-[#d4cdc5] text-sm text-[#c8944e] font-medium mb-6">
            <ShieldIcon />
            <span>100% Humain</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#1e2d3d]">
            {t("whyChooseUs.title")}
          </h2>
          <p className="text-[#6b7b8d] max-w-2xl mx-auto text-lg">
            {t("whyChooseUs.subtitle")}
          </p>
        </Reveal>

        {/* ── Comparison stacked carousel ─────────────── */}
        <div className="max-w-2xl mx-auto mb-24">
          <Reveal>
            {Array.isArray(comparison) && comparison.length > 0 && (
              <StackedCarousel>
                {comparison.map((item, index) => (
                  <div
                    key={index}
                    className="p-5 md:p-6 rounded-2xl bg-white border border-[#d4cdc5] shadow-md"
                  >
                    {/* Header: number + criterion */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c8944e] to-[#d4a96a] flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <span className="font-bold text-[#1e2d3d] text-base md:text-lg">
                        {item.criterion}
                      </span>
                    </div>

                    {/* REDAC row */}
                    <div className="flex items-start gap-3 mb-3 p-3 rounded-xl bg-[#10b981]/5 border border-[#10b981]/10">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-md shrink-0 mt-0.5">REDAC</span>
                      <span className="text-sm text-[#374151] leading-relaxed">
                        {item.human}
                      </span>
                    </div>

                    {/* IA row */}
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-[#ef4444]/5 border border-[#ef4444]/10">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#ef4444] bg-[#ef4444]/10 px-2 py-0.5 rounded-md shrink-0 mt-0.5">IA</span>
                      <span className="text-sm text-[#6b7280] leading-relaxed">
                        {item.ai}
                      </span>
                    </div>
                  </div>
                ))}
              </StackedCarousel>
            )}
          </Reveal>
        </div>

        {/* ── AI News / Alerts ───────────────────────── */}
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/20 text-sm text-[#ef4444] font-medium mb-6">
            <AlertIcon />
            <span>Alerte</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-[#1e2d3d]">
            {t("whyChooseUs.newsTitle")}
          </h3>
          <p className="text-[#6b7b8d] max-w-xl mx-auto">
            {t("whyChooseUs.newsSubtitle")}
          </p>
        </Reveal>

        {/* News stacked carousel */}
        <div className="max-w-2xl mx-auto mb-16">
          <Reveal>
            {Array.isArray(news) && news.length > 0 && (
              <StackedCarousel>
                {news.map((item, index) => (
                  <div
                    key={index}
                    className="p-5 md:p-6 rounded-2xl bg-white border border-[#d4cdc5] shadow-md"
                  >
                    {/* Title + badge */}
                    <div className="flex items-start gap-2 mb-4">
                      <div className="flex-1 min-w-0">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#ef4444]/10 text-[#ef4444] text-[10px] font-bold uppercase tracking-wider mb-2">
                          {item.badge}
                        </span>
                        <h4 className="text-base md:text-lg font-bold text-[#1e2d3d] leading-snug">
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    {/* Split: Image + Text */}
                    <div className="flex gap-4 mb-4">
                      {/* Image representation */}
                      <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-xl bg-gradient-to-br from-[#f5f0eb] to-[#ebe5de] border border-[#d4cdc5] flex flex-col items-center justify-center text-center relative overflow-hidden">
                        {item.image ? (
                          <Image 
                            src={item.image} 
                            alt={item.title} 
                            fill 
                            className="object-cover"
                          />
                        ) : (
                          <>
                            <span className="text-3xl md:text-4xl mb-1 relative z-10">{item.flag}</span>
                            <span className="text-[8px] font-bold text-[#c8944e] uppercase tracking-widest relative z-10">Officiel</span>
                          </>
                        )}
                        {/* Tiny watermark text effect */}
                        <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center -rotate-45 font-mono text-xs whitespace-nowrap z-0 pointer-events-none">
                          AI GENERATED AI GENERATED
                        </div>
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#6b7b8d] leading-relaxed line-clamp-4">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Source link */}
                    <a
                      href={item.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c8944e] hover:text-[#d4a96a] transition-colors group/link"
                    >
                      <ExternalLinkIcon />
                      <span className="underline underline-offset-2 decoration-[#c8944e]/30 group-hover/link:decoration-[#d4a96a]">
                        {item.sourceLabel}
                      </span>
                    </a>
                  </div>
                ))}
              </StackedCarousel>
            )}
          </Reveal>
        </div>

        {/* ── CTA ────────────────────────────────────── */}
        <Reveal className="text-center">
          <div className="max-w-lg mx-auto p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#c8944e]/20 shadow-sm">
            <p className="text-[#6b7b8d] text-sm mb-4">
              {t("whyChooseUs.ctaSubtext")}
            </p>
            <Link href="/commander">
              <Button
                size="lg"
                variant="glow"
                className="text-base h-13 px-10 text-white font-semibold"
              >
                {t("whyChooseUs.cta")}
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
