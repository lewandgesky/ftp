"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useTranslation } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { ScrollHint } from "@/components/motion/ScrollHint";

export function Hero() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  const ease = [0.22, 1, 0.36, 1] as const;

  // Container qui orchestre l'entrée du Hero (visible dès le chargement)
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.12, delayChildren: 0.1 },
    },
  };

  const item: Variants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.6, ease },
    },
  };

  // Titre animé mot par mot
  const titleWords = t("hero.title").split(" ");

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-[#d4cdc5] text-sm text-[#c8944e] font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8944e] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8944e]"></span>
            </span>
            {t("hero.badge")}
          </motion.div>

          {/* Titre mot par mot */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-[#1e2d3d] flex flex-wrap justify-center gap-x-[0.25em]">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                variants={item}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
            <br className="hidden md:block" />
            <motion.span
              variants={item}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8944e] via-[#d4a96a] to-[#e0bc82]"
            >
              {t("hero.titleHighlight")}
            </motion.span>
          </h1>

          {/* Sous-titre */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-[#6b7b8d] mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/commander" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="glow"
                className="w-full text-base h-13 px-10 text-white font-semibold"
              >
                {t("hero.cta")}
              </Button>
            </Link>
            <Link href="#templates" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full text-base h-13 px-10 border-[#d4cdc5] hover:border-[#c8944e]/50 hover:bg-[#c8944e]/5"
              >
                {t("hero.ctaSecondary")}
              </Button>
            </Link>
          </motion.div>

          {/* Stats avec compteurs animés */}
          <motion.div
            variants={item}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#1e2d3d]">
                <AnimatedCounter value={50} suffix="+" />
              </div>
              <div className="text-xs md:text-sm text-[#9ca3af]">
                {t("hero.statsReports") || "Rapports livrés"}
              </div>
            </div>
            <div className="text-center border-x border-[#d4cdc5]">
              <div className="text-2xl md:text-3xl font-bold text-[#1e2d3d]">
                <AnimatedCounter value={100} suffix="%" />
              </div>
              <div className="text-xs md:text-sm text-[#9ca3af]">
                {t("hero.statsSatisfaction") || "Satisfaction"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#1e2d3d]">
                <AnimatedCounter value={48} suffix="h" />
              </div>
              <div className="text-xs md:text-sm text-[#9ca3af]">
                {t("hero.statsDelivery") || "Délai moyen"}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <ScrollHint />
    </section>
  );
}
