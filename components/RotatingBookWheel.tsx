"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, type Transition } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  BookOpen,
  RotateCcw,
  Star,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Book } from "@/types/library";

export interface RotatingBookWheelProps {
  books: Book[];
  activeIndex: number;
  onSelectBook: (index: number) => void;
  isAutoPlaying?: boolean;
  onToggleAutoPlay?: () => void;
  radius?: number; // default: 210
  className?: string;
}

const wheelSpring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.8
};

export function RotatingBookWheel({
  books,
  activeIndex,
  onSelectBook,
  isAutoPlaying = true,
  onToggleAutoPlay,
  radius = 210,
  className
}: RotatingBookWheelProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [userInteractedTimeout, setUserInteractedTimeout] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalBooks = books.length;
  const angleStep = 360 / totalBooks;

  // ── Auto-Step Timer: Pauses for 2s at each book ───────────────
  useEffect(() => {
    if (!isAutoPlaying || isHovered || userInteractedTimeout || totalBooks === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      onSelectBook((activeIndex + 1) % totalBooks);
    }, 2500); // 2 seconds display + 0.5s transition pause

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex, isAutoPlaying, isHovered, userInteractedTimeout, totalBooks, onSelectBook]);

  // Pause auto timer temporarily on manual user interaction
  const handleManualSelect = (index: number) => {
    onSelectBook(index);
    setUserInteractedTimeout(true);
    setTimeout(() => {
      setUserInteractedTimeout(false);
    }, 5000); // 5s grace period before resuming auto-rotation
  };

  const handleNext = () => {
    handleManualSelect((activeIndex + 1) % totalBooks);
  };

  const handlePrev = () => {
    handleManualSelect((activeIndex - 1 + totalBooks) % totalBooks);
  };

  // Base rotation angle so active book is at 9 o'clock (180 degrees, facing left panel)
  const baseRotationAngle = 180 - activeIndex * angleStep;

  return (
    <div
      className={cn(
        "relative w-full max-w-[540px] h-[480px] sm:h-[540px] flex items-center justify-center select-none",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Background Orbital Rings & Ambient Focal Glow ─────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer Orbit Circle */}
        <div
          className="rounded-full border border-dashed border-slate-200/90 absolute opacity-70"
          style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
        />

        {/* Mid Orbit Circle */}
        <div
          className="rounded-full border border-slate-100 absolute opacity-60"
          style={{ width: `${radius * 1.4}px`, height: `${radius * 1.4}px` }}
        />

        {/* Focal Spotlight Glow at 9 o'clock Position */}
        <div
          className="absolute w-44 h-44 rounded-full bg-blue-500/15 blur-3xl -translate-x-1/2 pointer-events-none"
          style={{ left: `calc(50% - ${radius}px)` }}
        />

        {/* Center Compass Rose / Vault Emblem */}
        <div className="w-20 h-20 rounded-full bg-white/80 border border-slate-200/90 shadow-sm backdrop-blur-sm flex flex-col items-center justify-center text-center p-2 z-0">
          <BookOpen className="w-5 h-5 text-slate-700 mb-0.5" />
          <span className="text-[9px] font-mono font-bold uppercase text-slate-500 leading-none">
            {activeIndex + 1} of {totalBooks}
          </span>
        </div>
      </div>

      {/* ── Radial Arranged 3D Book Cards ──────────────────────── */}
      <div className="relative w-full h-full flex items-center justify-center">
        {books.map((book, index) => {
          // Calculate angle for each book relative to active rotation
          const currentAngleDeg = index * angleStep + baseRotationAngle;
          const currentAngleRad = (currentAngleDeg * Math.PI) / 180;

          // Polar to Cartesian conversion
          const x = radius * Math.cos(currentAngleRad);
          const y = radius * Math.sin(currentAngleRad);

          const isActive = index === activeIndex;
          // Calculate distance from 9 o'clock focal point
          const normalizedAngleDiff = Math.abs(((currentAngleDeg - 180 + 180) % 360) - 180);
          const isNearby = normalizedAngleDiff < 60;

          return (
            <motion.div
              key={book.id}
              onClick={() => handleManualSelect(index)}
              animate={{
                x,
                y,
                scale: isActive ? 1.18 : isNearby ? 0.95 : 0.82,
                opacity: isActive ? 1 : isNearby ? 0.8 : 0.55,
                zIndex: isActive ? 35 : Math.round(30 - normalizedAngleDiff / 10)
              }}
              transition={wheelSpring}
              whileHover={{ scale: isActive ? 1.22 : 1.02 }}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-shadow duration-300",
                isActive && "z-30"
              )}
              style={{
                perspective: "1000px"
              }}
            >
              {/* 3D Angled Book Cover Card with Realistic Spine Shadow */}
              <div
                className={cn(
                  "relative w-[100px] h-[146px] sm:w-[114px] sm:h-[166px] rounded-xl overflow-hidden bg-slate-900 border transition-all duration-300 transform-gpu",
                  isActive
                    ? "border-blue-500 ring-4 ring-blue-500/40 shadow-2xl shadow-blue-500/30"
                    : "border-slate-300/80 hover:border-slate-400 shadow-md hover:shadow-lg"
                )}
                style={{
                  transform: `rotateY(${isActive ? "0deg" : `${(x / radius) * 12}deg`}) rotateZ(${
                    isActive ? "0deg" : `${(y / radius) * 6}deg`
                  })`
                }}
              >
                {/* Book Cover Image */}
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />

                {/* Subtle Spine Shadow on Left Edge */}
                <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none" />

                {/* Spine highlight ridge */}
                <div className="absolute left-[6px] top-0 bottom-0 w-[1px] bg-white/20 pointer-events-none" />

                {/* Glossy Sheen Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />

                {/* Bottom Overlay Pill with Department & Rating */}
                <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between text-[10px] text-white">
                  <span className="font-medium truncate max-w-[60px]">
                    {book.department}
                  </span>
                  <span className="flex items-center gap-0.5 font-medium text-amber-300">
                    <svg className="w-2.5 h-2.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {book.rating.toFixed(1)}
                  </span>
                </div>


                {/* Active Indicator Floating Badge */}
                {isActive && (
                  <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-md animate-pulse" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Wheel Bottom Controls Bar: Prev, Next & Auto-Play ─────── */}
      <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-3 z-30">
        <button
          onClick={handlePrev}
          className="w-9 h-9 rounded-full bg-white/95 border border-slate-200 hover:border-slate-300 hover:bg-white text-slate-700 shadow-sm flex items-center justify-center transition-all cursor-pointer active:scale-95"
          title="Previous Book"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {onToggleAutoPlay && (
          <button
            onClick={onToggleAutoPlay}
            className={cn(
              "px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer",
              isAutoPlaying
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            )}
            title={isAutoPlaying ? "Pause 2s Auto-Rotation" : "Resume Auto-Rotation"}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3 h-3 text-blue-400" />
                <span>Auto (2s)</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-500" />
                <span>Paused</span>
              </>
            )}
          </button>
        )}

        <button
          onClick={handleNext}
          className="w-9 h-9 rounded-full bg-white/95 border border-slate-200 hover:border-slate-300 hover:bg-white text-slate-700 shadow-sm flex items-center justify-center transition-all cursor-pointer active:scale-95"
          title="Next Book"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default RotatingBookWheel;
