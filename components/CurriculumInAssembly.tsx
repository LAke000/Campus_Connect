"use client";

import React from "react";
import { motion, type Transition } from "motion/react";
import {
  Cog,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Layers,
  Compass,
  Cpu,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CurriculumInAssemblyProps {
  branchName?: string;
  degreeCode?: string;
  yearLabel?: string;
  estimatedRelease?: string;
  onExploreActive?: () => void;
  className?: string;
}

const spinTransition: Transition = {
  repeat: Infinity,
  ease: "linear",
  duration: 20
};

const counterSpinTransition: Transition = {
  repeat: Infinity,
  ease: "linear",
  duration: 15
};

const pulseGlowTransition: Transition = {
  repeat: Infinity,
  repeatType: "reverse",
  duration: 3,
  ease: "easeInOut"
};

export function CurriculumInAssembly({
  branchName = "Specialization Branch",
  degreeCode = "B.Tech",
  yearLabel = "Academic Year",
  estimatedRelease = "Q3 Academic Session 2026",
  onExploreActive,
  className
}: CurriculumInAssemblyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "w-full relative overflow-hidden bg-white border border-slate-200/90 rounded-2xl p-8 sm:p-12 shadow-xs text-center",
        className
      )}
    >
      {/* Background blueprint dotted grid effect */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />

      {/* Ambient background glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
        transition={pulseGlowTransition}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-100/60 rounded-full blur-3xl pointer-events-none -z-0"
      />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        {/* Animated Engineering Gears Icon Container */}
        <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
          {/* Main Gear */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={spinTransition}
            className="absolute text-slate-800"
          >
            <Cog className="w-16 h-16 stroke-[1.5]" />
          </motion.div>

          {/* Secondary Interlocking Gear */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={counterSpinTransition}
            className="absolute -top-1 -right-1 text-blue-600"
          >
            <Cog className="w-8 h-8 stroke-[1.8]" />
          </motion.div>

          {/* Sparkle Center */}
          <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md z-10">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
          </div>
        </div>

        {/* Estimated Release Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-mono font-bold mb-4 shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
          <span>Curriculum In Assembly • {estimatedRelease}</span>
        </div>

        {/* Main Heading */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight leading-snug">
          {branchName} ({degreeCode})
        </h3>
        <p className="text-xs sm:text-sm font-medium text-slate-500 font-mono mt-1">
          {yearLabel} Syllabus Mapping & Question Bank Verification
        </p>

        {/* Informative Body Copy */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 max-w-md">
          Course frameworks for this specialization are mapped to official Lovely Professional University Board of Studies standards. Outcome-Based Education (OBE) units and computer-based diagnostic quizzes are currently being authored.
        </p>

        {/* Feature Checkpoints */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-6 w-full text-left">
          <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200/70 text-xs text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">LPU Academic Regulations Mapped</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200/70 text-xs text-slate-700">
            <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="truncate">Credit & Semester Allocations Ready</span>
          </div>
        </div>

        {/* CTA Action */}
        {onExploreActive && (
          <button
            onClick={onExploreActive}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all duration-200 shadow-sm hover:shadow cursor-pointer select-none"
          >
            <Compass className="w-4 h-4 text-blue-400" />
            <span>Switch to Active CSE Practice Banks</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default CurriculumInAssembly;
