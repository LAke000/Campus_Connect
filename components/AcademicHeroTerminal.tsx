"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  RefreshCw,
  CheckCircle2,
  FileDown,
  GraduationCap,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface AcademicHeroTerminalProps {
  studentName?: string;
  programTitle?: string;
  section?: string;
  rollNumber?: string;
  syncTime?: string;
  gpa?: string;
  attendance?: string;
  credits?: string;
  sessionEyebrow?: string;
  portraitUrl?: string;
  campusLocation?: string;
  onSyncLMS?: () => void;
  onDownloadTranscript?: () => void;
  className?: string;
}

export function AcademicHeroTerminal({
  studentName = "Aarav Sharma",
  programTitle = "B.Tech CSE (AI & Data Engineering)",
  section = "Section K22CS",
  rollNumber = "Roll #42",
  syncTime = "UMS Synced 4m ago",
  gpa = "8.94 / 10.0",
  attendance = "89.2% (Safe Margin: +8 Lectures)",
  credits = "94 / 160",
  sessionEyebrow = "ACADEMIC CONTEXT · SEMESTER V (AUTUMN 2026)",
  portraitUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  campusLocation = "Active on Campus · Uni-Mall Hub · Library Stacks Floor 3",
  onSyncLMS,
  onDownloadTranscript,
  className
}: AcademicHeroTerminalProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasSynced, setHasSynced] = useState(false);

  const handleSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    onSyncLMS?.();
    setTimeout(() => {
      setIsSyncing(false);
      setHasSynced(true);
      setTimeout(() => setHasSynced(false), 3000);
    }, 1200);
  };

  return (
    <section
      className={cn(
        "relative w-full bg-white dark:bg-neutral-900 rounded-[28px] border border-[#E7E7E3] dark:border-neutral-800 shadow-[0_2px_16px_rgba(0,0,0,0.02)] p-6 sm:p-8 lg:p-10 overflow-hidden select-none",
        className
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ── Left Column (Student Briefing) 7 cols ────────────────── */}
        <div className="lg:col-span-7 space-y-5">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-[0.14em] font-mono uppercase text-neutral-400 dark:text-neutral-500 font-semibold">
              {sessionEyebrow}
            </span>
            <span className="text-neutral-300">•</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-[#2F3B34] dark:text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Portal Live
            </span>
          </div>

          {/* Headline & Operational Status */}
          <div className="space-y-1.5">
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white leading-[1.15]">
              {studentName}
            </h1>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
              <span>{programTitle}</span>
              <span className="text-neutral-300">•</span>
              <span>{section}</span>
              <span className="text-neutral-300">•</span>
              <span>{rollNumber}</span>
              <span className="text-neutral-300">•</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                {hasSynced ? "Synced Just Now" : syncTime}
              </span>
            </div>
          </div>

          {/* Hairline Divider */}
          <div className="h-px w-full bg-[#E7E7E3] dark:bg-neutral-800" />

          {/* Academic Performance Snapshot (3 Horizontal Stats with Monospace Figures) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Cumulative GPA
              </div>
              <div className="text-sm sm:text-base font-semibold font-mono tabular-nums text-neutral-900 dark:text-white">
                {gpa}
              </div>
              <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">
                Top 2% in School
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Net Attendance
              </div>
              <div className="text-sm sm:text-base font-semibold font-mono tabular-nums text-neutral-900 dark:text-white">
                {attendance}
              </div>
              <div className="text-[10px] text-neutral-500 font-mono">
                UGC Compliant (&gt;75%)
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Credits Earned
              </div>
              <div className="text-sm sm:text-base font-semibold font-mono tabular-nums text-neutral-900 dark:text-white">
                {credits}
              </div>
              <div className="text-[10px] text-neutral-500 font-mono">
                On Track for Honors
              </div>
            </div>
          </div>

          {/* Action Cluster */}
          <div className="flex items-center gap-3 pt-2 flex-wrap sm:flex-nowrap">
            {/* Primary CTA: Dark slate pill ("Sync LMS Submissions →") */}
            <motion.button
              onClick={handleSync}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-full bg-[#161716] hover:bg-[#2F3B34] text-white font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <RefreshCw className={cn("w-3.5 h-3.5 text-neutral-300", isSyncing && "animate-spin")} />
              <span>{isSyncing ? "Syncing Submissions..." : "Sync LMS Submissions"}</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </motion.button>

            {/* Secondary CTA: Understated hairline border ("Download Grade Transcript") */}
            <motion.button
              onClick={onDownloadTranscript}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-full border border-[#E7E7E3] dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-[#F8F8F6] dark:hover:bg-neutral-700 text-[#161716] dark:text-neutral-200 font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-neutral-400" />
              <span>Download Grade Transcript</span>
            </motion.button>
          </div>
        </div>

        {/* ── Right Column (Campus Identity Frame) 5 cols ─────────── */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden border border-[#E7E7E3] dark:border-neutral-800 bg-[#F8F8F6] dark:bg-neutral-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] group">
            {/* Student Portrait Image */}
            <img
              src={portraitUrl}
              alt={studentName}
              className="w-full h-full object-cover object-center grayscale-[12%] group-hover:scale-103 transition-transform duration-300"
            />

            {/* Subtle Gradient Shadow Base */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Anchored Live Status Pill at the bottom edge */}
            <div className="absolute bottom-3 inset-x-3 backdrop-blur-md bg-white/95 dark:bg-neutral-900/95 border border-[#E7E7E3] dark:border-neutral-800 rounded-xl px-3.5 py-2 shadow-sm flex items-center gap-2 text-xs select-none">
              <div className="relative flex items-center justify-center shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="absolute w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
              </div>

              <div className="min-w-0 flex-1 truncate font-mono text-[11px] text-[#161716] dark:text-white">
                {campusLocation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AcademicHeroTerminal;
