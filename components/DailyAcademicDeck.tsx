"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import {
  Video,
  Clock,
  FileText,
  BookOpen,
  BrainCircuit,
  ArrowRight,
  ArrowUpRight,
  UploadCloud,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Users,
  Target,
  FileUp,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DailyAcademicDeckProps {
  onUploadAssignment?: () => void;
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      mass: 0.8
    }
  }
};

export function DailyAcademicDeck({
  onUploadAssignment,
  className
}: DailyAcademicDeckProps) {
  return (
    <section className={cn("w-full space-y-4 select-none", className)}>
      {/* ── 1. Section Header ───────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-1">
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500 block">
            TODAY&apos;S PRIORITIES
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C1D1F] dark:text-white tracking-tight leading-snug">
            Active Modules & Submissions
          </h2>
        </div>

        <Link
          href="/doubts"
          className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white flex items-center gap-1.5 transition-colors group self-start sm:self-auto font-mono"
        >
          <span>View Full Schedule</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* ── 2. 4-Column Structured Priority Cards ───────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* ── Card 1: Next Live Lecture ────────────────────────── */}
        <motion.div
          variants={cardItemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-4 group"
        >
          <div className="space-y-2.5">
            {/* Subject Code Badge & Live Indicator */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wide bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-2 py-0.5 rounded-md border border-neutral-200/60 dark:border-neutral-700/60">
                CSE316 · Operating Systems
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            </div>

            {/* Timing & Room Location Readout */}
            <div className="text-[11px] font-mono font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>Starts in 25 mins · Hall 301</span>
            </div>

            {/* Lecture Topic & Faculty */}
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-[#1C1D1F] dark:text-white leading-snug group-hover:text-[#4E5952] transition-colors">
                Process Synchronization & Mutex
              </h3>
              <p className="text-xs text-neutral-500 font-normal">
                Prof. Ananya Sen · Lecture Hall 301
              </p>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
            <span className="text-[11px] font-mono text-neutral-400">Room Ready</span>
            <Link
              href="/doubts"
              className="font-medium text-[#1C1D1F] dark:text-white hover:underline flex items-center gap-1"
            >
              <span>Join Lecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* ── Card 2: Pending Assignment Deadline ───────────────── */}
        <motion.div
          variants={cardItemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-4 group"
        >
          <div className="space-y-2.5">
            {/* Course Badge & Urgency Pill */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wide bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-2 py-0.5 rounded-md border border-neutral-200/60 dark:border-neutral-700/60">
                MTH166 · Discrete Structures
              </span>
            </div>

            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 border border-rose-200/80 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-[10px] font-mono font-bold">
              <Clock className="w-3 h-3 text-rose-600 dark:text-rose-400 animate-pulse" />
              <span>Due Tonight at 23:59</span>
            </div>

            {/* Assignment Problem Details */}
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-[#1C1D1F] dark:text-white leading-snug group-hover:text-[#4E5952] transition-colors">
                Recurrence Relations Problem Set
              </h3>
              <p className="text-xs text-neutral-500 font-normal">
                Master Theorem & Generating Functions (PS-04)
              </p>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
            <span className="text-[11px] font-mono text-neutral-400">PDF / LaTeX</span>
            <button
              onClick={onUploadAssignment}
              className="font-semibold text-rose-700 dark:text-rose-400 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
            >
              <FileUp className="w-3.5 h-3.5" />
              <span>Upload Solution</span>
            </button>
          </div>
        </motion.div>

        {/* ── Card 3: Digital Library Active Issued Book ────────── */}
        <motion.div
          variants={cardItemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-4 group"
        >
          <div className="space-y-2.5">
            {/* Library Category Badge */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wide bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-2 py-0.5 rounded-md border border-neutral-200/60 dark:border-neutral-700/60">
                Central Library · Level 4
              </span>
              <span className="text-[10px] font-mono text-neutral-400 font-medium">
                OPAC Issue
              </span>
            </div>

            {/* Miniature Thumbnail + Book Details */}
            <div className="flex gap-3 items-center">
              <img
                src="https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?q=80&w=800&auto=format&fit=crop"
                alt="Introduction to Algorithms"
                className="w-10 h-14 object-cover rounded-md border border-neutral-200 dark:border-neutral-700 shrink-0 shadow-2xs"
              />
              <div className="min-w-0 flex-1 space-y-0.5">
                <h3 className="text-xs font-bold text-[#1C1D1F] dark:text-white leading-tight truncate group-hover:text-[#4E5952] transition-colors">
                  Introduction to Algorithms
                </h3>
                <p className="text-[11px] text-neutral-500 font-mono truncate">
                  Cormen, Leiserson (CLRS)
                </p>
                <div className="text-[10px] font-mono text-neutral-400">
                  Shelf 4B-105
                </div>
              </div>
            </div>

            {/* Return Countdown */}
            <div className="text-[11px] font-mono text-amber-700 dark:text-amber-400 flex items-center gap-1.5 pt-0.5">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>Return in 3 days · Renewal available</span>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
            <span className="text-[11px] font-mono text-neutral-400">42% Read</span>
            <Link
              href="/library"
              className="font-medium text-[#1C1D1F] dark:text-white hover:underline flex items-center gap-1"
            >
              <span>E-Reader</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* ── Card 4: Daily Practice Quiz Challenge ────────────── */}
        <motion.div
          variants={cardItemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-4 group"
        >
          <div className="space-y-2.5">
            {/* Daily Badge & Status */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wide bg-[#1C1D1F] text-white px-2 py-0.5 rounded-md">
                Today&apos;s Daily 20
              </span>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +50 XP
              </span>
            </div>

            {/* Quiz Topic */}
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-[#1C1D1F] dark:text-white leading-snug group-hover:text-[#4E5952] transition-colors">
                Binary Trees & BST Traversals
              </h3>
              <p className="text-xs text-neutral-500 font-mono">
                CSE205 Data Structures · 20 MCQs
              </p>
            </div>

            {/* Mini Progress Meter showing class average */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>Class Average</span>
                <span className="font-bold text-neutral-800 dark:text-neutral-200">84% (18/20)</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[84%]" />
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
            <span className="text-[11px] font-mono text-neutral-400">12 mins test</span>
            <Link
              href="/quizzes"
              className="font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Start Daily 20</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default DailyAcademicDeck;
