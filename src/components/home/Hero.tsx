"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-[#d4cdc5] text-sm text-[#c8944e] font-medium mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8944e] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8944e]"></span>
            </span>
            {t("hero.badge")}
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up delay-100 text-[#1e2d3d]">
            {t("hero.title")} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8944e] via-[#d4a96a] to-[#e0bc82]">
              {t("hero.titleHighlight")}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#6b7b8d] mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            {t("hero.subtitle")}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <Link href="/commander" className="w-full sm:w-auto">
              <Button size="lg" variant="glow" className="w-full text-base h-13 px-10 text-white font-semibold">
                {t("hero.cta")}
              </Button>
            </Link>
            <Link href="#templates" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full text-base h-13 px-10 border-[#d4cdc5] hover:border-[#c8944e]/50 hover:bg-[#c8944e]/5">
                {t("hero.ctaSecondary")}
              </Button>
            </Link>
          </div>
          
          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in-up delay-400">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#1e2d3d]">50+</div>
              <div className="text-xs md:text-sm text-[#9ca3af]">{t("hero.statsReports") || "Rapports livrés"}</div>
            </div>
            <div className="text-center border-x border-[#d4cdc5]">
              <div className="text-2xl md:text-3xl font-bold text-[#1e2d3d]">100%</div>
              <div className="text-xs md:text-sm text-[#9ca3af]">{t("hero.statsSatisfaction") || "Satisfaction"}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#1e2d3d]">48h</div>
              <div className="text-xs md:text-sm text-[#9ca3af]">{t("hero.statsDelivery") || "Délai moyen"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
