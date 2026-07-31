"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Direction de l'entrée */
  direction?: Direction;
  /** Délai en secondes */
  delay?: number;
  /** Distance du déplacement en px */
  distance?: number;
  /** Une seule fois (par défaut true) */
  once?: boolean;
  /** Partie de l'élément qui doit être visible pour déclencher (0-1) */
  amount?: number;
  /** Durée en secondes */
  duration?: number;
  /** Tag HTML sous-jacent (div par défaut) */
  as?: "div" | "section" | "span" | "li" | "p" | "h2" | "h3";
}

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
};

/**
 * Fait apparaître un élément lorsqu'il entre dans le viewport.
 * Remplace les anciennes classes CSS `animate-fade-in-up` / `delay-*`
 * qui se déclenchaient au montage plutôt qu'au scroll.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  distance = 28,
  once = true,
  amount = 0.2,
  duration = 0.6,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, ...offsetFor(direction, distance) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.01 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}
