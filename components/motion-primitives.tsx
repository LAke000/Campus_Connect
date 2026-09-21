"use client";

// ============================================================
// Campus Connect — Reusable Motion Components
// Wrappers that apply the animation design system via props.
// ============================================================

import { type HTMLMotionProps, motion } from "motion/react";
import {
  cardHover,
  fadeInScale,
  fadeInUp,
  springSmooth,
  staggerContainer,
} from "@/lib/motion";

// ── MotionCard ───────────────────────────────────────────────
// Animates in with fadeInUp + interactive hover lift.

type MotionCardProps = HTMLMotionProps<"div">;

export function MotionCard({ children, ...props }: MotionCardProps) {
  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── MotionFadeIn ─────────────────────────────────────────────
// Generic fade-in-up wrapper. Works as a stagger child.

export function MotionFadeIn({ children, ...props }: MotionCardProps) {
  return (
    <motion.div variants={fadeInUp} {...props}>
      {children}
    </motion.div>
  );
}

// ── MotionStaggerList ────────────────────────────────────────
// Stagger container — each direct child should use MotionFadeIn.

export function MotionStaggerList({ children, ...props }: MotionCardProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── MotionDialog ─────────────────────────────────────────────
// Scale + fade for modal/dialog overlays. Pairs with AnimatePresence.

export function MotionDialog({ children, ...props }: MotionCardProps) {
  return (
    <motion.div
      variants={fadeInScale}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── MotionPage ───────────────────────────────────────────────
// Page-level enter transition for route changes.

export function MotionPage({ children, ...props }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springSmooth}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── ScrollContainer ──────────────────────────────────────────
// Reusable rubber-band overscroll container.
export { ScrollContainer } from "./ScrollContainer";

