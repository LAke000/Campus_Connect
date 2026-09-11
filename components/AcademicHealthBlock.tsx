"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Quote,
  CheckCircle2,
  ShieldCheck,
  Award,
  ArrowRight,
  TrendingUp,
  Clock,
  Calendar,
  Sparkles,
  Percent
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface AcademicHealthBlockProps {
  studentName?: string;
  mentorName?: string;
  mentorDesignation?: string;
  mentorNote?: string;
  mentorAvatarUrl?: string;
  attendancePercentage?: number;
  totalDelivered?: number;
  totalAttended?: number;
  safeMarginHours?: number;
  className?: string;
}

export function AcademicHealthBlock({
  studentName = "Aarav",
  mentorName = "Dr. Preeti Sharma",
  mentorDesignation = "Head of AI & Machine Learning Department · Senior Faculty Advisor",
  mentorNote = "Aarav is maintaining consistent problem-solving velocity in Data Structures & Systems Programming. Recommended to target upcoming ACM ICPC regional qualifiers and submit the Capstone Phase-1 draft on schedule.",
  mentorAvatarUrl = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  attendancePercentage = 88,
  totalDelivered = 240,
  totalAttended = 212,
  safeMarginHours = 32,
  className
}: AcademicHealthBlockProps) {
  // Circular donut math
  const radius = 46;
  const circumference = 2 * Math.PI * radius; // ~289.02
  const progressOffset = circumference * (1 - attendancePercentage / 100);

  return (
    <section className={cn("w-full space-y-4 select-none", className)}>
      {/* ── Section Header ─────────────────────────────────────── */}
      <div className="flex items-center justify-between pb-1">
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500 block">
            MENTORSHIP & COMPLIANCE
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C1D1F] dark:text-white tracking-tight leading-snug">
            Academic Standing & Guidance
          </h2>
        </div>

        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 hidden sm:inline-block">
          Dean&apos;s Advisory Ledger
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* ── Left Card: Muted Sage Faculty Mentor Testimonial (7 cols) ── */}
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="lg:col-span-7 bg-[#4E5952] text-white rounded-[28px] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-6 relative overflow-hidden group"
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="space-y-4 relative z-10">
            {/* Header Badge & Quote Glyph */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-200 bg-white/10 px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                Faculty Mentor Review
              </span>

              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-neutral-200">
                <Quote className="w-4 h-4" />
              </div>
            </div>

            {/* Mentor Evaluation Quote */}
            <blockquote className="text-sm sm:text-base text-neutral-100 font-serif leading-relaxed italic">
              &ldquo;{mentorNote}&rdquo;
            </blockquote>
          </div>

          {/* Mentor Signature & Credentials */}
          <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <img
                src={mentorAvatarUrl}
                alt={mentorName}
                className="w-11 h-11 rounded-full object-cover border-2 border-white/40 shrink-0 shadow-xs"
              />
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white leading-tight">
                  {mentorName}
                </h4>
                <p className="text-[11px] text-neutral-300 truncate max-w-xs sm:max-w-sm">
                  {mentorDesignation}
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-[10px] font-mono font-semibold text-emerald-300 self-start sm:self-auto shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Verified Endorsement</span>
            </div>
          </div>
        </motion.div>

        {/* ── Right Card: Attendance Donut Gauge (5 cols) ────────── */}
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="lg:col-span-5 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-[28px] p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-5 group"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 dark:text-neutral-500 block">
                COMPLIANCE TRACKER
              </span>
              <h3 className="text-base font-bold text-[#1C1D1F] dark:text-white tracking-tight">
                Attendance Standing
              </h3>
            </div>

            <div className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Safe Zone</span>
            </div>
          </div>

          {/* Donut Gauge & Metrics Row */}
          <div className="flex items-center justify-center sm:justify-start gap-6 py-1">
            {/* Circular SVG Donut Progress Ring */}
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
                {/* Background Ring Track */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-neutral-100 dark:stroke-neutral-800"
                  strokeWidth="10"
                  fill="none"
                />
                {/* Active Progress Stroke */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-[#4E5952] dark:stroke-neutral-200"
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: progressOffset }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              {/* Center Donut Readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black font-mono tracking-tight text-[#1C1D1F] dark:text-white tabular-nums leading-none">
                  {attendancePercentage}%
                </span>
                <span className="text-[9px] font-mono text-neutral-400 uppercase mt-0.5">
                  Attendance
                </span>
              </div>
            </div>

            {/* Metric Breakdown Stats */}
            <div className="space-y-2 min-w-0">
              <div>
                <div className="text-xs text-neutral-500 font-mono">Lectures Attended</div>
                <div className="text-sm font-extrabold text-[#1C1D1F] dark:text-white font-mono tabular-nums">
                  {totalAttended} <span className="text-neutral-400 font-normal">/ {totalDelivered}</span>
                </div>
              </div>

              <div>
                <div className="text-xs text-neutral-500 font-mono">Permitted Leave Margin</div>
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                  +{safeMarginHours} Hours buffer (&gt;75%)
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Summary Legend */}
          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
            <span className="text-[11px] text-neutral-500 font-mono">
              75% Mandatory UGC / LPU Threshold
            </span>
            <Link
              href="/profile"
              className="font-medium text-[#1C1D1F] dark:text-white hover:underline flex items-center gap-1"
            >
              <span>Full Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AcademicHealthBlock;
