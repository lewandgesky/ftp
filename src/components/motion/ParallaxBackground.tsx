"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Fond vidéo fullscreen avec un léger effet de parallaxe : la vidéo
 * descend plus lentement que le contenu et se zoom très légèrement
 * pour créer une sensation de profondeur au scroll.
 * Respecte prefers-reduced-motion (aucun mouvement).
 */
export function ParallaxBackground() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Parallaxe douce : la vidéo descend de ~120px sur tout le scroll,
  // avec un zoom subtil de 1 → 1.08.
  const y = useTransform(scrollY, [0, 1000], reduceMotion ? [0, 0] : [0, 120]);
  const scale = useTransform(
    scrollY,
    [0, 1000],
    reduceMotion ? [1, 1] : [1, 1.08]
  );

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        style={{ y, scale }}
        className="w-full h-full object-cover opacity-90 will-change-transform"
      >
        <source src="/videos/sea-storm.mp4" type="video/mp4" />
      </motion.video>
      {/* Overlay pour fondre la vidéo avec la palette chaude */}
      <div className="absolute inset-0 bg-[#ebe5de]/30 mix-blend-overlay" />
      {/* Voile pour garantir la lisibilité du texte par-dessus */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0eb]/40 via-[#f5f0eb]/20 to-[#f5f0eb]/60" />
    </div>
  );
}
