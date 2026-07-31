"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslation } from "@/lib/i18n/context";

/**
 * Indicateur "Scrolle pour découvrir" en bas du Hero, avec une
 * flèche qui rebondit. Utilise la clé de traduction hero.scrollHint
 * déjà présente en FR et EN mais jusqu'ici jamais rendue.
 */
export function ScrollHint() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      aria-hidden
    >
      <span className="text-xs font-medium text-[#6b7b8d] tracking-wide uppercase">
        {t("hero.scrollHint")}
      </span>
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : { y: [0, 8, 0] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
        }
        className="flex items-center justify-center w-9 h-9 rounded-full border border-[#d4cdc5] bg-white/50 backdrop-blur-sm text-[#c8944e]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
