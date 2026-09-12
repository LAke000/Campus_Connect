"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import {
  Clock,
  BookOpen,
  BrainCircuit,
  ArrowRight,
  ArrowUpRight,
  FileUp,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  MapPin,
  Paperclip,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DailyOperationsDeckProps {
  onAttachFile?: () => void;
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
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

export function DailyOperationsDeck({
  onAttachFile,
  className
}: DailyOperationsDeckProps) {
  // Live submission countdown ticker (e.g. starts at 6h 42m 15s)
  const [secondsRemaining, setSecondsRemaining] = useState(6 * 3600 + 42 * 60 + 15);
  const [isFileAttached, setIsFileAttached] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format seconds to HH:MM:SS
  const formatCountdown = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleAttach = () => {
    setIsFileAttached(true);
    onAttachFile?.();
    setTimeout(() => setIsFileAttached(false), 3000);
  };

  return (
    <section className={cn("w-full space-y-3.5 select-none", className)}>
      {/* ── Section Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-1">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono font-bold tracking-[0.14em] uppercase text-neutral-400 dark:text-neutral-500 block">
            LIVE OPERATIONS DESK
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#161716] dark:text-white tracking-[-0.03em] leading-snug">
            Daily Academic Operations
          </h2>
        </div>

        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 hidden sm:inline-block">
          Synchronized to Term V Schedule
        </span>
      </div>

      {/* ── 4 Compact High-Utility Operational Cards ───────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* ── Card 1: Imminent Lecture (Timeline Locked) ────────── */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          className="bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-neutral-400 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-3.5 group"
        >
          <div className="space-y-2.5">
            {/* Subject Code & Live Amber Tag */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wide bg-[#F8F8F6] dark:bg-neutral-800 text-[#161716] dark:text-neutral-200 px-2 py-0.5 rounded border border-[#E7E7E3] dark:border-neutral-700">
                CSE316: Operating Systems
              </span>

              {/* Pulsing Amber Micro-Tag */}
              <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60 font-mono text-[9px] px-1.5 py-0.2 rounded font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                NEXT CLASS
              </span>
            </div>

            {/* Time & Room Location */}
            <div className="space-y-0.5">
              <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-300 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="tabular-nums">10:00 AM – 10:50 AM (Starts in 18 mins)</span>
              </div>
              <div className="text-[11px] text-neutral-500 font-mono">
                Block 34 · Room 402
              </div>
            </div>

            {/* Faculty & Topic */}
            <div className="space-y-0.5 pt-0.5">
              <h3 className="text-sm font-semibold text-[#161716] dark:text-white leading-snug tracking-tight group-hover:text-[#2F3B34] transition-colors line-clamp-1">
                Semaphores & Dining Philosophers
              </h3>
              <p className="text-xs text-neutral-500 font-normal truncate">
                Dr. Harpreet Singh · Division of Systems
              </p>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
            <span className="text-[11px] font-mono text-neutral-400">Section K22CS</span>
            <Link
              href="/doubts"
              className="font-medium text-[#161716] dark:text-white hover:underline flex items-center gap-1"
            >
              <span>Classroom Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* ── Card 2: Hard Submission Deadline ─────────────────── */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          className="bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-neutral-400 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-3.5 group"
        >
          <div className="space-y-2.5">
            {/* Subject Code & Status */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wide bg-[#F8F8F6] dark:bg-neutral-800 text-[#161716] dark:text-neutral-200 px-2 py-0.5 rounded border border-[#E7E7E3] dark:border-neutral-700">
                CSE205: Data Structures Lab
              </span>

              <span className="inline-flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-[9px] px-1.5 py-0.2 rounded font-bold border border-neutral-200/60 dark:border-neutral-700">
                LAB PS-06
              </span>
            </div>

            {/* Deliverable Title */}
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold text-[#161716] dark:text-white leading-snug tracking-tight group-hover:text-[#2F3B34] transition-colors line-clamp-2">
                Red-Black Tree Deletion Implementation (GitHub Repo URL)
              </h3>
            </div>

            {/* Countdown Timer with Tabular Numbers */}
            <div className="text-[11px] font-mono font-medium text-neutral-600 dark:text-neutral-300 flex items-center gap-1.5 pt-0.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="tabular-nums font-semibold text-neutral-900 dark:text-white">
                {formatCountdown(secondsRemaining)} remaining
              </span>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
            <span className="text-[11px] font-mono text-neutral-400">Git / ZIP</span>
            <button
              onClick={handleAttach}
              className={cn(
                "font-medium text-xs flex items-center gap-1 cursor-pointer transition-colors",
                isFileAttached
                  ? "text-emerald-700 dark:text-emerald-400 font-semibold"
                  : "text-[#161716] dark:text-white hover:underline"
              )}
            >
              {isFileAttached ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Attached!</span>
                </>
              ) : (
                <>
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Attach File</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* ── Card 3: Library Active Desk ───────────────────────── */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          className="bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-neutral-400 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-3.5 group"
        >
          <div className="space-y-2.5">
            {/* Library Category Badge & Auto-Renew Pill */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wide bg-[#F8F8F6] dark:bg-neutral-800 text-[#161716] dark:text-neutral-200 px-2 py-0.5 rounded border border-[#E7E7E3] dark:border-neutral-700">
                ACTIVE DESK HOLD
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                Level 4
              </span>
            </div>

            {/* Book Title & Author */}
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold text-[#161716] dark:text-white leading-snug tracking-tight group-hover:text-[#2F3B34] transition-colors line-clamp-1">
                Designing Data-Intensive Applications
              </h3>
              <p className="text-xs text-neutral-500 font-mono truncate">
                Martin Kleppmann · O&apos;Reilly Media
              </p>
            </div>

            {/* Due Date & Shelf Location */}
            <div className="space-y-0.5 pt-0.5 text-[11px] font-mono text-neutral-600 dark:text-neutral-300">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="tabular-nums">18 Sep 2026 · Auto-Renew Available (1 remaining)</span>
              </div>
              <div className="text-[10px] text-neutral-400">
                Location: Stack 04 · Shelf B · Tag #8832
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
            <span className="text-[11px] font-mono text-neutral-400">65% Completed</span>
            <Link
              href="/library"
              className="font-medium text-[#161716] dark:text-white hover:underline flex items-center gap-1"
            >
              <span>E-Reader</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* ── Card 4: Practice Quiz of the Day ─────────────────── */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          className="bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-neutral-400 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-3.5 group"
        >
          <div className="space-y-2.5">
            {/* Quiz Tag & Batch Stat */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wide bg-[#2F3B34] text-white px-2 py-0.5 rounded">
                GATE MOCK 2026
              </span>
              <span className="text-xs font-mono text-neutral-500 font-medium tabular-nums">
                20 Qs · 15m
              </span>
            </div>

            {/* Quiz Module Title */}
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold text-[#161716] dark:text-white leading-snug tracking-tight group-hover:text-[#2F3B34] transition-colors line-clamp-1">
                Algorithms & Computational Complexity
              </h3>
              <p className="text-xs text-neutral-500 font-mono">
                Asymptotic Bounds, Graph Flow & Dynamic Programming
              </p>
            </div>

            {/* Daily Cohort Progress Stats */}
            <div className="space-y-1 pt-0.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span className="tabular-nums">68% batch completed</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 tabular-nums">Top: 19/20</span>
              </div>
              <div className="w-full h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#2F3B34] dark:bg-neutral-300 rounded-full w-[68%]" />
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
            <span className="text-[11px] font-mono text-neutral-400">+50 XP</span>
            <Link
              href="/quizzes"
              className="font-medium text-[#161716] dark:text-white hover:underline flex items-center gap-1"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default DailyOperationsDeck;
