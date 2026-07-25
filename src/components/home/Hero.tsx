"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden gradient-mesh">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-[#7c3aed]/30 text-sm text-[#06b6d4] font-medium mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06b6d4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#06b6d4]"></span>
            </span>
            {t("hero.badge")}
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up delay-100">
            {t("hero.title")} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]">
              {t("hero.titleHighlight")}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#8888a0] mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            {t("hero.subtitle")}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <Link href="/commander" className="w-full sm:w-auto">
              <Button size="lg" variant="glow" className="w-full text-base h-12 px-8">
                {t("hero.cta")}
              </Button>
            </Link>
            <Link href="#templates" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full text-base h-12 px-8 border-[#3a3a52]">
                {t("hero.ctaSecondary")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-[#7c3aed] rounded-full blur-[80px] opacity-20 animate-pulse-glow"></div>
      <div className="absolute top-1/3 right-10 w-32 h-32 bg-[#06b6d4] rounded-full blur-[100px] opacity-20 animate-pulse-glow delay-1000"></div>
    </section>
  );
}
