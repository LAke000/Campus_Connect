// ============================================================
// Campus Connect — Animation Design System
// Engine: motion (v13+) for React 19 / Next.js 16
// Philosophy: Subtle, physics-based springs. Never jarring.
// ============================================================

import type { Transition, Variants } from "motion/react";

// ── Physical spring presets ─────────────────────────────────

export const springPresets = {
  // Snappy layout transitions
  snappy: { type: "spring", stiffness: 500, damping: 40, mass: 1 },
  // Smooth tab indicator glide
  glide: { type: "spring", stiffness: 380, damping: 32 },
  // Subtle card hover response
  tactile: { type: "spring", stiffness: 400, damping: 25 },
} as const;

// ── Spring Presets ───────────────────────────────────────────

/** Snappy interactive feedback (buttons, toggles) */
export const springSnap: Transition = {
  ...springPresets.snappy,
};

/** Smooth entrance for cards & panels */
export const springSmooth: Transition = {
  ...springPresets.glide,
};

/** Gentle float for modals & dialogs */
export const springGentle: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 22,
  mass: 1.2,
};

/** Quick micro-interaction (icon rotations, check marks) */
export const springMicro: Transition = {
  ...springPresets.tactile,
};

// ── Duration Presets (for non-spring tweens) ─────────────────

export const durationFast = 0.15;
export const durationNormal = 0.25;
export const durationSlow = 0.4;

// ── Fade + Slide Variants ────────────────────────────────────

/** Fade in from below (cards, list items) */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSmooth,
  },
};

/** Fade in from above (dropdown menus) */
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSmooth,
  },
};

/** Fade in with subtle scale (dialogs, modals) */
export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springGentle,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: durationFast },
  },
};

// ── Stagger Container ────────────────────────────────────────

/** Wrap children that use fadeInUp / fadeInDown to stagger them */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

/** Wider stagger for larger grid layouts */
export const staggerContainerWide: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// ── Card Hover State ─────────────────────────────────────────

export const cardHover = {
  rest: { scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
  hover: {
    scale: 1.02,
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    transition: springSnap,
  },
  tap: { scale: 0.98 },
} satisfies Variants;

// ── Tab / Page Transitions ───────────────────────────────────

export const tabSwitch: Variants = {
  enter: {
    opacity: 1,
    x: 0,
    transition: { ...springSmooth, duration: durationNormal },
  },
  exitLeft: {
    opacity: 0,
    x: -20,
    transition: { duration: durationFast },
  },
  exitRight: {
    opacity: 0,
    x: 20,
    transition: { duration: durationFast },
  },
};

// ── Sheet / Sidebar Slide ────────────────────────────────────

export const slideInFromLeft: Variants = {
  hidden: { x: "-100%" },
  visible: { x: 0, transition: springSmooth },
  exit: { x: "-100%", transition: { duration: durationNormal } },
};

export const slideInFromRight: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: springSmooth },
  exit: { x: "100%", transition: { duration: durationNormal } },
};
