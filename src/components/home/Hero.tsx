"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        <iframe
          className="absolute top-1/2 left-1/2 w-[300vw] h-[300vh] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60"
          src="https://www.youtube.com/embed/sYEBhFw6eq0?autoplay=1&mute=1&loop=1&playlist=sYEBhFw6eq0&controls=0&showinfo=0&disablekb=1&fs=0&modestbranding=1"
          allow="autoplay; encrypted-media"
          frameBorder="0"
        />
        {/* Light overlay to ensure text is readable on top of the video since we are using a light theme */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#8b5cf6]/30 text-sm text-[#22d3ee] font-medium mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22d3ee] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22d3ee]"></span>
            </span>
            {t("hero.badge")}
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up delay-100">
            {t("hero.title")} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#818cf8] to-[#22d3ee]">
              {t("hero.titleHighlight")}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#94a3b8] mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            {t("hero.subtitle")}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <Link href="/commander" className="w-full sm:w-auto">
              <Button size="lg" variant="glow" className="w-full text-base h-13 px-10 text-white font-semibold">
                {t("hero.cta")}
              </Button>
            </Link>
            <Link href="#templates" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full text-base h-13 px-10 border-[#475569] hover:border-[#8b5cf6]/50 hover:bg-[#8b5cf6]/5">
                {t("hero.ctaSecondary")}
              </Button>
            </Link>
          </div>
          
          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in-up delay-400">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#f1f5f9]">50+</div>
              <div className="text-xs md:text-sm text-[#64748b]">{t("hero.statsReports") || "Rapports livrés"}</div>
            </div>
            <div className="text-center border-x border-[#334155]">
              <div className="text-2xl md:text-3xl font-bold text-[#f1f5f9]">100%</div>
              <div className="text-xs md:text-sm text-[#64748b]">{t("hero.statsSatisfaction") || "Satisfaction"}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#f1f5f9]">48h</div>
              <div className="text-xs md:text-sm text-[#64748b]">{t("hero.statsDelivery") || "Délai moyen"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
