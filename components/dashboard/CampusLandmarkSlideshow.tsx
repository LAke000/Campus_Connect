"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LandmarkSlide } from "@/types/dashboard";
import {
  Compass,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Building2,
  BookOpen,
  ShoppingBag,
} from "lucide-react";

export const LPU_LANDMARK_SLIDES: LandmarkSlide[] = [
  {
    id: "central-library",
    title: "Shanti Devi Mittal Central Library",
    tag: "Resource Center • Open 24/7",
    description:
      "5 automated floors featuring 1.5M+ cataloged volumes, RFID self-kiosks, IEEE digital research bays, and quiet study zones.",
    imageUrl:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=85",
    actionLabel: "Access Digital Library",
    actionHref: "/library",
  },
  {
    id: "block-34-38",
    title: "Block 33, 34 & 38 Academic Hubs",
    tag: "CSE & Technology Block",
    description:
      "The innovation core for Scaler SST & CSE programs, housing Apple Mac labs, supercomputing clusters, and faculty cabin chambers.",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85",
    actionLabel: "View Doubt Sessions",
    actionHref: "/doubts",
  },
  {
    id: "unipolis-unimall",
    title: "Baldev Raj Mittal Unipolis & UniMall",
    tag: "Student Life & Cultural Center",
    description:
      "10,000+ capacity open amphitheater mega-canopy paired with the central 4-story retail, food, and banking arcade.",
    imageUrl:
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1400&q=85",
    actionLabel: "View Class Desk",
    actionHref: "/class-desk",
  },
];

export function CampusLandmarkSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Auto-advance timer (5 seconds)
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LPU_LANDMARK_SLIDES.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % LPU_LANDMARK_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + LPU_LANDMARK_SLIDES.length) % LPU_LANDMARK_SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartXRef.current - touchEndX;

    // Minimum swipe threshold of 45px
    if (Math.abs(deltaX) > 45) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  const currentSlide = LPU_LANDMARK_SLIDES[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[280px] sm:h-[300px] md:h-[320px] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-neutral-800 shadow-xs bg-slate-950 group select-none"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 transform-gpu"
        >
          {/* Background Image with Cinematic Gradient Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${currentSlide.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/65 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />

          {/* Slide Content */}
          <div className="relative z-10 h-full p-5 sm:p-7 md:p-8 flex flex-col justify-between text-white">
            {/* Top Tag */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-xs">
                <Sparkles className="size-3 text-amber-300" />
                {currentSlide.tag}
              </span>

              {/* Progress Count */}
              <span className="font-mono text-[11px] sm:text-xs text-white/80 font-semibold px-2 py-0.5 rounded bg-black/30 backdrop-blur-xs">
                {currentIndex + 1} / {LPU_LANDMARK_SLIDES.length}
              </span>
            </div>

            {/* Bottom Title & Description */}
            <div className="space-y-1.5 sm:space-y-2 max-w-xl">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                {currentSlide.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed">
                {currentSlide.description}
              </p>

              {/* Action Button */}
              <div className="pt-1.5 sm:pt-2 flex items-center gap-3">
                <Link
                  href={currentSlide.actionHref}
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>{currentSlide.actionLabel}</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Slide Controls */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 size-8 sm:size-9 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-md border border-white/10 flex items-center justify-center opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all cursor-pointer active:scale-90"
      >
        <ChevronLeft className="size-4" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 size-8 sm:size-9 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-md border border-white/10 flex items-center justify-center opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all cursor-pointer active:scale-90"
      >
        <ChevronRight className="size-4" />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5">
        {LPU_LANDMARK_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              currentIndex === idx
                ? "w-6 bg-white shadow-xs"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
