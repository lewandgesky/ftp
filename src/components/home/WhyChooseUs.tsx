"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/* ─── Icons ──────────────────────────────────────────── */

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

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

/* ─── Comparison item type ───────────────────────────── */

interface ComparisonItem {
  criterion: string;
  human: string;
  ai: string;
}

interface NewsItem {
  badge: string;
  flag: string;
  title: string;
  desc: string;
  source: string;
  sourceLabel: string;
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
      {/* Dark background with subtle gradient */}
      <div className="absolute inset-0 bg-[#1a2332]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e2d3d] via-[#1a2332] to-[#0f1923]" />
      {/* Decorative glow orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#c8944e] blur-[200px] opacity-[0.04] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#ef4444] blur-[180px] opacity-[0.03] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* ── Section header ─────────────────────────── */}
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c8944e]/10 border border-[#c8944e]/20 text-sm text-[#c8944e] font-medium mb-6">
            <ShieldIcon />
            <span>100% Humain</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            {t("whyChooseUs.title")}
          </h2>
          <p className="text-[#8899aa] max-w-2xl mx-auto text-lg">
            {t("whyChooseUs.subtitle")}
          </p>
        </Reveal>

        {/* ── Comparison grid ────────────────────────── */}
        <div className="max-w-5xl mx-auto mb-24">
          {/* Column headers */}
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-4 mb-6 px-2">
              <div className="hidden md:block" />
              <div className="hidden md:flex items-center justify-center gap-2 text-[#10b981] font-semibold text-sm uppercase tracking-wider">
                <div className="w-8 h-8 rounded-full bg-[#10b981]/10 flex items-center justify-center">
                  <CheckIcon />
                </div>
                {t("whyChooseUs.humanLabel")}
              </div>
              <div className="hidden md:flex items-center justify-center gap-2 text-[#ef4444]/70 font-semibold text-sm uppercase tracking-wider">
                <div className="w-8 h-8 rounded-full bg-[#ef4444]/10 flex items-center justify-center">
                  <XIcon />
                </div>
                {t("whyChooseUs.aiLabel")}
              </div>
            </div>
          </Reveal>

          {/* Comparison rows */}
          <Stagger className="space-y-3" stagger={0.08}>
            {Array.isArray(comparison) && comparison.map((item, index) => (
              <StaggerItem key={index}>
                <div className="group grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-3 md:gap-4 p-4 md:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-[#c8944e]/20 transition-all duration-300">
                  {/* Criterion */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#c8944e]/10 flex items-center justify-center text-[#c8944e] font-bold text-sm shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <span className="font-semibold text-white text-sm md:text-base">
                      {item.criterion}
                    </span>
                  </div>

                  {/* Human advantage */}
                  <div className="flex items-start gap-2.5 pl-12 md:pl-0">
                    {/* Mobile label */}
                    <span className="md:hidden text-[10px] font-bold uppercase tracking-wider text-[#10b981] shrink-0 mt-0.5">FTP</span>
                    <div className="w-5 h-5 rounded-full bg-[#10b981]/15 flex items-center justify-center shrink-0 mt-0.5 hidden md:flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <span className="text-sm text-[#a3b5c7] leading-relaxed">
                      {item.human}
                    </span>
                  </div>

                  {/* AI weakness */}
                  <div className="flex items-start gap-2.5 pl-12 md:pl-0">
                    {/* Mobile label */}
                    <span className="md:hidden text-[10px] font-bold uppercase tracking-wider text-[#ef4444]/60 shrink-0 mt-0.5">IA</span>
                    <div className="w-5 h-5 rounded-full bg-[#ef4444]/10 flex items-center justify-center shrink-0 mt-0.5 hidden md:flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </div>
                    <span className="text-sm text-[#6b7b8d] leading-relaxed">
                      {item.ai}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* ── AI News / Alerts ───────────────────────── */}
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/20 text-sm text-[#ef4444] font-medium mb-6">
            <AlertIcon />
            <span>Alerte</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            {t("whyChooseUs.newsTitle")}
          </h3>
          <p className="text-[#8899aa] max-w-xl mx-auto">
            {t("whyChooseUs.newsSubtitle")}
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto mb-16" stagger={0.12}>
          {Array.isArray(news) && news.map((item, index) => (
            <StaggerItem key={index}>
              <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-[#ef4444]/20 transition-all duration-300 h-full flex flex-col">
                {/* Badge + Flag */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{item.flag}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ef4444]/10 text-[#ef4444] text-[11px] font-bold uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-[#8899aa] leading-relaxed flex-1 mb-4">
                  {item.desc}
                </p>

                {/* Source link */}
                <a
                  href={item.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#c8944e] hover:text-[#d4a96a] font-medium transition-colors group/link"
                >
                  <ExternalLinkIcon />
                  <span className="underline underline-offset-2 decoration-[#c8944e]/30 group-hover/link:decoration-[#d4a96a]">
                    {item.sourceLabel}
                  </span>
                </a>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* ── CTA ────────────────────────────────────── */}
        <Reveal className="text-center">
          <div className="max-w-lg mx-auto p-8 rounded-2xl bg-gradient-to-br from-[#c8944e]/10 to-transparent border border-[#c8944e]/20">
            <p className="text-[#8899aa] text-sm mb-4">
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
