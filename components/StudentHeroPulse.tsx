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
        "relative w-full bg-white dark:bg-neutral-900 rounded-[28px] border border-[#E7E7E3] dark:border-neutral-800 shadow-[0_2px_16px_rgba(0,0,0,0.02)] p-6 sm:p-8 lg:p-10 overflow-hidden select-none",
        className
      )}
    >
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ── Left Column: Student Snapshot & Fast Actions (7 cols) ── */}
        <div className="lg:col-span-7 space-y-4">
          {/* Eyebrow / Academic Session Tag */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-500 font-mono">
              {session}
            </span>
            <span className="text-neutral-300">•</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2F3B34] dark:text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Active Term
            </span>
          </div>

          {/* Hero Headline & Subtitle */}
          <div className="space-y-0.5">
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-semibold text-[#161716] dark:text-white tracking-[-0.03em] leading-[1.12]">
              {studentName}
            </h1>
            <p className="text-xs sm:text-sm font-normal text-neutral-500 font-mono pt-0.5">
              {degree} · {university}
            </p>
          </div>

          {/* Short Bio / Focus Line */}
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
            {focusLine}
          </p>

          {/* Action Button Row */}
          <div className="flex items-center gap-2.5 pt-1 flex-wrap sm:flex-nowrap">
            {/* Primary Solid Dark Pill */}
            <Link
              href="/doubts"
              onClick={onViewTimetable}
              className="px-5 py-2.5 rounded-full bg-[#161716] hover:bg-[#2F3B34] text-white font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-[0.98]"
            >
              <span>Today&apos;s Timetable</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Secondary Soft Translucent Border Button */}
            <Link
              href="/profile"
              onClick={onViewTranscript}
              className="px-5 py-2.5 rounded-full border border-[#E7E7E3] dark:border-neutral-700 bg-[#F8F8F6] dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-[#161716] dark:text-neutral-200 font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span>View Academic Transcript</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>
          </div>

          {/* Micro Status Pill Group */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
            {/* Assigned Mentor / Capstone Group Pill with Avatar Cluster */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E7E7E3] dark:border-neutral-800 bg-[#F8F8F6] dark:bg-neutral-800/60 px-3 py-1 text-xs">
              <div className="flex items-center -space-x-1">
                <div className="w-4 h-4 rounded-full bg-[#2F3B34] text-white flex items-center justify-center text-[8px] font-bold ring-1 ring-white dark:ring-neutral-900">
                  K
                </div>
                <div className="w-4 h-4 rounded-full bg-neutral-700 text-white flex items-center justify-center text-[8px] font-bold ring-1 ring-white dark:ring-neutral-900">
                  A
                </div>
                <div className="w-4 h-4 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[8px] font-bold ring-1 ring-white dark:ring-neutral-900">
                  S
                </div>
              </div>
              <span className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                {mentorGroup}
              </span>
            </div>

            {/* Status Readout Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E7E7E3] dark:border-neutral-800 bg-[#F8F8F6] dark:bg-neutral-800/60 px-3 py-1 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2F3B34] dark:text-emerald-400" />
              <span className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                {academicStanding}
              </span>
            </div>
          </div>
        </div>

        {/* ── Right Column: Framed Identity & Quick Campus Stats (5 cols) ── */}
        <div className="lg:col-span-5 flex items-center justify-center relative py-4 sm:py-6">
          <div className="relative">
            {/* Architectural Circular Portrait Cutout */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-44 h-44 sm:w-52 sm:h-52 xl:w-56 xl:h-56 rounded-full p-1 bg-[#F2F2EE] dark:bg-neutral-800 shadow-md"
            >
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={avatarUrl}
                  alt={studentName}
                  className="w-full h-full object-cover object-center grayscale-[15%]"
                />
              </div>

              {/* Status Online Ring Indicator */}
              <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-900 shadow-xs" />
            </motion.div>

            {/* ── Spatial Floating Badges Alongside Portrait ── */}

            {/* Top-Left Spatial Badge: Registration Number & Section */}
            <motion.div
              initial={{ opacity: 0, y: 6, x: -6 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              whileHover={{ scale: 1.03, y: -1 }}
              transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.15 }}
              className="absolute -top-3 sm:-top-4 -left-4 sm:-left-8 z-20 backdrop-blur-md bg-white/95 dark:bg-neutral-900/95 border border-[#E7E7E3] dark:border-neutral-800 rounded-xl px-3 py-2 shadow-sm flex items-center gap-2 text-xs select-none"
            >
              <GraduationCap className="w-4 h-4 text-neutral-500" />
              <div className="min-w-0">
                <div className="font-mono font-bold text-[11px] text-[#161716] dark:text-white leading-tight">
                  Reg: {registrationNumber}
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">
                  {section}
                </div>
              </div>
            </motion.div>

            {/* Bottom-Right Spatial Badge: Live Campus Location */}
            <motion.div
              initial={{ opacity: 0, y: -6, x: 6 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              whileHover={{ scale: 1.03, y: -1 }}
              transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.25 }}
              className="absolute -bottom-2 sm:-bottom-3 -right-3 sm:-right-8 z-20 backdrop-blur-md bg-white/95 dark:bg-neutral-900/95 border border-[#E7E7E3] dark:border-neutral-800 rounded-xl px-3 py-2 shadow-sm flex items-center gap-2 text-xs select-none"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="min-w-0">
                <div className="font-mono font-bold text-[11px] text-[#161716] dark:text-white leading-tight">
                  {location.split("·")[0]?.trim()} · {location.split("·")[1]?.trim()}
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">
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

