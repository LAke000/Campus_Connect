"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Award,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Users,
  Calendar,
  Layers,
  Clock,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface StudentHeroPulseProps {
  studentName?: string;
  registrationNumber?: string;
  section?: string;
  degree?: string;
  university?: string;
  session?: string;
  focusLine?: string;
  academicStanding?: string;
  mentorGroup?: string;
  location?: string;
  avatarUrl?: string;
  onViewTimetable?: () => void;
  onViewTranscript?: () => void;
  className?: string;
}

export function StudentHeroPulse({
  studentName = "Aarav Sharma",
  registrationNumber = "12104892",
  section = "Section K22CS",
  degree = "B.Tech Computer Science & Engineering",
  university = "LPU",
  session = "Academic Session 2026–2027 · Semester 5",
  focusLine = "Specializing in AI & Machine Learning · Focus on Distributed Systems & Algorithmic Problem Solving",
  academicStanding = "Academic Status: Excellent Standing (Dean's List Eligible)",
  mentorGroup = "Capstone Group 14",
  location = "Block 34 · Room 402 · Active Now",
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  onViewTimetable,
  onViewTranscript,
  className
}: StudentHeroPulseProps) {
  return (
    <section
      className={cn(
        "relative w-full bg-white dark:bg-neutral-900 rounded-[28px] border border-neutral-200/80 dark:border-neutral-800 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-6 sm:p-8 lg:p-10 overflow-hidden select-none",
        className
      )}
    >
      {/* Subtle Background Radial Halo */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-neutral-100/60 dark:bg-neutral-800/40 rounded-full blur-3xl pointer-events-none -mt-20 -z-0" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#4E5952]/5 rounded-full blur-3xl pointer-events-none -mb-20 -mr-20 -z-0" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ── Left Column: Student Snapshot & Fast Actions (7 cols) ── */}
        <div className="lg:col-span-7 space-y-5">
          {/* Eyebrow / Academic Session Tag */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-500 font-mono">
              {session}
            </span>
            <span className="text-neutral-300">•</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#4E5952] dark:text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active Term
            </span>
          </div>

          {/* Hero Headline & Subtitle */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-[#1C1D1F] dark:text-white tracking-tight leading-[1.12]">
              {studentName}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 font-mono">
              {degree} · {university}
            </p>
          </div>

          {/* Short Bio / Focus Line */}
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
            {focusLine}
          </p>

          {/* Action Button Row */}
          <div className="flex items-center gap-3 pt-1 flex-wrap sm:flex-nowrap">
            {/* Primary Solid Dark Pill */}
            <Link
              href="/doubts"
              onClick={onViewTimetable}
              className="px-5 py-2.5 rounded-full bg-[#1C1D1F] hover:bg-[#333336] text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98]"
            >
              <span>Today&apos;s Timetable</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Secondary Soft Translucent Border Button */}
            <Link
              href="/profile"
              onClick={onViewTranscript}
              className="px-5 py-2.5 rounded-full border border-neutral-300/80 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span>View Academic Transcript</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>
          </div>

          {/* Micro Status Pill Group */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-neutral-600 dark:text-neutral-300">
            {/* Assigned Mentor / Capstone Group Pill with Avatar Cluster */}
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/50 px-3 py-1.5 shadow-2xs">
              {/* Overlapping Mini Avatar Cluster */}
              <div className="flex items-center -space-x-1.5">
                <div className="w-4 h-4 rounded-full bg-[#4E5952] text-white flex items-center justify-center text-[8px] font-bold ring-1 ring-white dark:ring-neutral-900">
                  K
                </div>
                <div className="w-4 h-4 rounded-full bg-neutral-800 text-white flex items-center justify-center text-[8px] font-bold ring-1 ring-white dark:ring-neutral-900">
                  A
                </div>
                <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold ring-1 ring-white dark:ring-neutral-900">
                  S
                </div>
              </div>
              <span className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                {mentorGroup}
              </span>
            </div>

            {/* Status Readout Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/50 px-3 py-1.5 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                {academicStanding}
              </span>
            </div>
          </div>
        </div>

        {/* ── Right Column: Framed Identity & Quick Campus Stats (5 cols) ── */}
        <div className="lg:col-span-5 flex items-center justify-center relative py-4 sm:py-6">
          <div className="relative">
            {/* Soft Outer Decorative Light Rings */}
            <div className="absolute inset-0 -m-4 rounded-full border border-dashed border-neutral-200/90 dark:border-neutral-800/80 animate-[spin_60s_linear_infinite] pointer-events-none" />
            <div className="absolute inset-0 -m-8 rounded-full border border-neutral-100 dark:border-neutral-800/40 pointer-events-none" />

            {/* Architectural Circular Portrait Cutout */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-44 h-44 sm:w-52 sm:h-52 xl:w-56 xl:h-56 rounded-full p-1.5 bg-gradient-to-br from-neutral-200 via-neutral-100 to-white dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 shadow-xl shadow-neutral-900/5"
            >
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={avatarUrl}
                  alt={studentName}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Status Online Ring Indicator */}
              <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-500 border-3 border-white dark:border-neutral-900 shadow-md" />
            </motion.div>

            {/* ── Spatial Floating Badges Alongside Portrait ── */}

            {/* Top-Left Spatial Badge: Registration Number & Section */}
            <motion.div
              initial={{ opacity: 0, y: 8, x: -8 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              whileHover={{ scale: 1.04, y: -2 }}
              transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.15 }}
              className="absolute -top-3 sm:-top-4 -left-4 sm:-left-8 z-20 backdrop-blur-md bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl px-3.5 py-2.5 shadow-lg shadow-neutral-900/5 flex items-center gap-2.5 text-xs select-none"
            >
              <div className="w-7 h-7 rounded-xl bg-[#4E5952]/10 text-[#4E5952] dark:text-neutral-300 flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-mono font-bold text-[11px] text-neutral-900 dark:text-white leading-tight">
                  Reg: {registrationNumber}
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">
                  {section}
                </div>
              </div>
            </motion.div>

            {/* Bottom-Right Spatial Badge: Live Campus Location */}
            <motion.div
              initial={{ opacity: 0, y: -8, x: 8 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              whileHover={{ scale: 1.04, y: -2 }}
              transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.25 }}
              className="absolute -bottom-2 sm:-bottom-3 -right-3 sm:-right-8 z-20 backdrop-blur-md bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl px-3.5 py-2.5 shadow-lg shadow-neutral-900/5 flex items-center gap-2.5 text-xs select-none"
            >
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
              </div>
              <div className="min-w-0">
                <div className="font-mono font-bold text-[11px] text-neutral-900 dark:text-white leading-tight">
                  {location.split("·")[0]?.trim()} · {location.split("·")[1]?.trim()}
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                  Active Now on Campus
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudentHeroPulse;
