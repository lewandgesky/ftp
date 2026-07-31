"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Barre de progression de lecture fixée en haut de la page.
 * Se remplit proportionnellement au défilement vertical.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[60] bg-gradient-to-r from-[#c8944e] via-[#d4a96a] to-[#e0bc82] shadow-[0_0_12px_rgba(200,148,78,0.6)]"
    />
  );
}
