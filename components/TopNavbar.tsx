"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Bell,
  Sun,
  Moon,
  RefreshCw,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface TopNavbarProps {
  userName?: string;
  userInitials?: string;
  className?: string;
}

const dailyQuotes = [
  "The beautiful thing about learning is that no one can take it away from you.",
  "Innovation distinguishes between a leader and a follower.",
  "Education is the most powerful weapon which you can use to change the world.",
  "The only way to do great work is to love what you do.",
  "Live as if you were to die tomorrow. Learn as if you were to live forever.",
  "Technology is best when it brings people together.",
  "The future belongs to those who believe in the beauty of their dreams."
];

export function TopNavbar({
  userName = "Shourya",
  userInitials = "SV",
  className
}: TopNavbarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasSynced, setHasSynced] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState<number | null>(null);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setQuoteIndex(new Date().getDay());
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  const handleLmsSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setHasSynced(true);
      setTimeout(() => setHasSynced(false), 3000);
    }, 1200);
  };

  return (
    <header
      className={cn(
        "w-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-[#E7E7E3] dark:border-neutral-800 rounded-full px-4 sm:px-5 py-2 shadow-[0_2px_16px_rgba(0,0,0,0.02)] flex items-center justify-between gap-4 select-none z-30 transition-all",
        className
      )}
    >
      {/* ── Left: University / Portal Brandmark + Student Badge ── */}
      <div className="flex items-center gap-3 shrink-0">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-md bg-[#161716] text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-2xs group-hover:bg-[#2F3B34] transition-colors">
            LPU
          </div>
          <div className="hidden sm:block leading-none">
            <span className="text-xs font-semibold text-[#161716] dark:text-white tracking-tight block">
              CampusConnect
            </span>
            <span className="text-[10px] font-mono text-neutral-400">
              Academic Hub
            </span>
          </div>
        </Link>

        {/* Student Monogram Initials Badge */}
        <div className="hidden md:flex items-center gap-1.5 pl-3 border-l border-[#E7E7E3] dark:border-neutral-800">
          <div className="w-5 h-5 rounded-full bg-[#2F3B34]/10 border border-[#2F3B34]/20 text-[#2F3B34] dark:text-neutral-300 flex items-center justify-center text-[9px] font-mono font-bold">
            {userInitials}
          </div>
          <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate max-w-[80px]">
            {userName}
          </span>
        </div>
      </div>

      {/* ── Center: Daily Quote ─────────────────────────────────── */}
      <div
        aria-label="Quote of the day"
        className="hidden lg:flex min-w-0 flex-1 justify-center px-4"
      >
        <motion.div
          key={quoteIndex ?? "initial"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex min-w-0 max-w-xl items-center gap-2 text-center"
        >
          <Sparkles className="size-3.5 shrink-0 text-amber-500" />
          <p className="truncate text-xs italic text-neutral-500 dark:text-neutral-400">
            {dailyQuotes[quoteIndex ?? 0]}
          </p>
        </motion.div>
      </div>

      {/* ── Right: Notification, Dark Toggle & LMS Sync ────────── */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Notification Chime with Subtle Indicator */}
        <button
          className="relative w-8 h-8 rounded-full bg-[#F2F2EE] dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900" />
        </button>

        {/* Dark / Light Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-8 h-8 rounded-full bg-[#F2F2EE] dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* Pill-Shaped LMS Sync Primary Action */}
        <motion.button
          onClick={handleLmsSync}
          whileTap={{ scale: 0.94 }}
          className={cn(
            "px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs",
            hasSynced
              ? "bg-emerald-50 border border-emerald-300 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-700 dark:text-emerald-300"
              : "bg-[#2F3B34] hover:bg-[#242D28] text-white border border-[#2F3B34]"
          )}
          title="Sync with LPU UMS / LMS Database"
        >
          {hasSynced ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Synced</span>
            </>
          ) : (
            <>
              <RefreshCw
                className={cn(
                  "w-3.5 h-3.5 text-neutral-200",
                  isSyncing && "animate-spin"
                )}
              />
              <span>{isSyncing ? "Syncing..." : "LMS Sync"}</span>
            </>
          )}
        </motion.button>
      </div>
    </header>
  );
}

export default TopNavbar;

