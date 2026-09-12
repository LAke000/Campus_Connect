"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LibraryRecentItem,
  QuizProgressItem,
  DoubtSessionHistoryItem,
  UserPlatformMetrics,
} from "@/types/dashboard";
import {
  BookOpen,
  BrainCircuit,
  Video,
  DoorOpen,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Flame,
  Award,
  RefreshCw,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Terminal,
  Binary,
  BookmarkCheck,
} from "lucide-react";

// Mock recent activities with rich LPU context
const RECENT_LIBRARY_ITEMS: LibraryRecentItem[] = [
  {
    id: "lib-1",
    title: "Operating Systems: Three Easy Pieces",
    subjectCode: "CSE316",
    chapterOrSection: "Chapter 4: Process Virtualization & Memory Models",
    lastOpenedTimestamp: "2 hours ago",
    progressPercent: 68,
    readUrl: "/library",
  },
  {
    id: "lib-2",
    title: "Introduction to Algorithms (CLRS)",
    subjectCode: "CSE205",
    chapterOrSection: "Chapter 12: Binary Search Trees & AVL Rotations",
    lastOpenedTimestamp: "Yesterday at 09:15 PM",
    progressPercent: 45,
    readUrl: "/library",
  },
];

const ACTIVE_QUIZZES: QuizProgressItem[] = [
  {
    id: "quiz-1",
    title: "Advanced Data Structures & Graph Traversal",
    subjectCode: "CSE205",
    yearProgram: "B.Tech CSE • Year 2",
    currentScore: 14,
    totalQuestions: 20,
    progressPercent: 70,
    lastActive: "Active Now",
    continueUrl: "/quizzes",
  },
];

const RECENT_DOUBTS: DoubtSessionHistoryItem[] = [
  {
    id: "doubt-1",
    hostName: "Dr. Arvind Sharma",
    hostRole: "Professor",
    location: "Block 34, Cabin #304",
    topic: "Red-Black Tree Insertion & Double Rotation Invariants",
    status: "resolved",
    date: "Sep 10, 2026",
    time: "03:45 PM",
    followUpHref: "/doubts",
  },
  {
    id: "doubt-2",
    hostName: "Rohan Malhotra",
    hostRole: "Senior Peer Mentor",
    location: "Block 34 Nescafe Plaza (1-on-1)",
    topic: "Next.js SSR vs Server Actions Architecture Walkthrough",
    status: "resolved",
    date: "Sep 08, 2026",
    time: "05:15 PM",
    followUpHref: "/doubts",
  },
];

const USER_METRICS: UserPlatformMetrics = {
  karmaPoints: 140,
  dswHours: 4.5,
  lmsSyncStatus: "synced",
  lmsLastSyncedAt: "10 mins ago",
  completedQuizzesCount: 18,
  libraryNotesReadCount: 42,
  resolvedDoubtsCount: 9,
};

export function RecentActivityCommandCenter() {
  return (
    <div className="space-y-6">
      {/* ── Section Header ───────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="size-4 text-amber-500" />
            Your Recent Activity
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
            Continuous sync across Library, Daily Quizzes & Doubt Sessions
          </p>
        </div>

        <Link
          href="/profile"
          className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
        >
          <span>View Transcript</span>
          <ChevronRight className="size-3.5" />
        </Link>
      </div>

      {/* ── (a) Digital Library Access History ─────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <BookOpen className="size-3 text-blue-600 dark:text-blue-400" />
            Digital Library Reading History
          </span>
          <Link
            href="/library"
            className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            All Notes ({USER_METRICS.libraryNotesReadCount})
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {RECENT_LIBRARY_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              layout
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  {/* Subject Code Badge */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 shadow-2xs">
                    <Terminal className="size-3 text-slate-500" />
                    {item.subjectCode}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    {item.lastOpenedTimestamp}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {item.chapterOrSection}
                </p>
              </div>

              {/* Progress & CTA */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${item.progressPercent}%` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 font-semibold">
                    {item.progressPercent}%
                  </span>
                </div>

                <Link
                  href={item.readUrl}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white"
                >
                  <span>Resume</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── (b) Active In-Progress Quiz Tracker ────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <BrainCircuit className="size-3 text-emerald-600 dark:text-emerald-400" />
            In-Progress Diagnostic Quiz Tracker
          </span>

          {/* Session State Badge */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/70 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <BookmarkCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>In Progress · Autosaved</span>
          </span>
        </div>

        {ACTIVE_QUIZZES.map((quiz) => (
          <motion.div
            key={quiz.id}
            layout
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.2 }}
            className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 shadow-2xs">
                  <Binary className="size-3 text-slate-500" />
                  {quiz.subjectCode}
                </span>
                <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {quiz.yearProgram}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {quiz.title}
              </h4>

              {/* Progress Bar & Score Chip */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1 max-w-xs h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-900 dark:bg-white rounded-full transition-all"
                    style={{ width: `${quiz.progressPercent}%` }}
                  />
                </div>
                <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                  Current Score: {quiz.currentScore}/{quiz.totalQuestions} · {quiz.progressPercent}%
                </span>
              </div>
            </div>

            <Link
              href={quiz.continueUrl}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950 text-xs font-bold transition-all shadow-xs shrink-0 active:scale-95 cursor-pointer"
            >
              <span>Continue Quiz</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ── (c) Recent Doubt Meetings & Walk-Ins ───────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <DoorOpen className="size-3 text-purple-600 dark:text-purple-400" />
            Recent Doubt Meetings & Walk-Ins
          </span>
          <Link
            href="/doubts"
            className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Book New ({USER_METRICS.resolvedDoubtsCount} Completed)
          </Link>
        </div>

        <div className="space-y-2">
          {RECENT_DOUBTS.map((doubt) => (
            <motion.div
              key={doubt.id}
              layout
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.2 }}
              className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {doubt.hostName}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500">
                    ({doubt.hostRole})
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">·</span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {doubt.location}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 font-medium">
                  {doubt.topic}
                </p>

                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 pt-0.5">
                  <Clock className="size-2.5" />
                  <span>
                    {doubt.date} at {doubt.time}
                  </span>
                </div>
              </div>

              {/* Status Pill & Follow-up */}
              <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold tracking-wide">
                  <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{doubt.status === "resolved" ? "RESOLVED" : "NO-SHOW"}</span>
                </span>

                <Link
                  href={doubt.followUpHref}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Follow-Up
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── (d) Meaningful Platform Add-ons & Quick Metrics ─ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        {/* Peer Karma */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center gap-3">
          <div className="size-9 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center shrink-0">
            <Flame className="size-4.5" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Peer Karma
            </p>
            <p className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
              {USER_METRICS.karmaPoints} <span className="text-xs font-normal text-slate-400">pts</span>
            </p>
          </div>
        </div>

        {/* DSW Community Hours */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center gap-3">
          <div className="size-9 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center shrink-0">
            <Award className="size-4.5" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              DSW Service
            </p>
            <p className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
              {USER_METRICS.dswHours} <span className="text-xs font-normal text-slate-400">hrs</span>
            </p>
          </div>
        </div>

        {/* LMS Sync Health */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center gap-3">
          <div className="size-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center shrink-0">
            <RefreshCw className="size-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                LMS Sync
              </p>
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white font-mono">
              Synced · {USER_METRICS.lmsLastSyncedAt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
