"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  /** Délai entre chaque enfant (en secondes) */
  stagger?: number;
  /** Délai avant le début de la cascade (en secondes) */
  delayChildren?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "ul";
}

/**
 * Conteneur qui anime ses enfants <StaggerItem> en cascade lorsqu'il
 * entre dans le viewport. Idéal pour les grilles (Services, Templates, FAQ).
 */
export function Stagger({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0,
  once = true,
  amount = 0.2,
  as = "div",
}: StaggerProps) {
  const MotionTag = motion[as] as typeof motion.div;

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  /** Distance du déplacement vertical en px */
  distance?: number;
  as?: "div" | "li" | "article";
  /** Handler de clic propagé à l'élément motion */
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export function StaggerItem({
  children,
  className,
  distance = 28,
  as = "div",
  onClick,
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const item: Variants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.01 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionTag className={className} variants={item} onClick={onClick}>
      {children}
    </MotionTag>
  );
}
