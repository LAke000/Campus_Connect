"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Bell,
  Sun,
  Moon,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Layers,
  ChevronRight,
  User,
  Calendar,
  BookOpen,
  BrainCircuit,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface TopNavbarProps {
  userName?: string;
  userInitials?: string;
  className?: string;
}

const navTabs = [
  { label: "Dashboard", href: "/" },
  { label: "Courses", href: "/quizzes" }, // Routes to curriculum
  { label: "Timetable", href: "/doubts" }, // Active doubt & session rooms
  { label: "Practice Quizzes", href: "/quizzes" },
  { label: "Digital Library", href: "/library" },
  { label: "Results", href: "/profile" },
];

export function TopNavbar({
  userName = "Shourya",
  userInitials = "SV",
  className
}: TopNavbarProps) {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasSynced, setHasSynced] = useState(false);

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

      {/* ── Center: Pill-Style Navigation Tabs ─────────────────── */}
      <nav
        aria-label="Portal Navigation"
        className="hidden lg:flex items-center bg-[#F2F2EE] dark:bg-neutral-800/60 p-1 rounded-full border border-[#E7E7E3] dark:border-neutral-700/50"
      >
        {navTabs.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={cn(
                "relative px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer select-none",
                isActive
                  ? "text-[#161716] dark:text-white font-semibold"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              )}
            >
              {/* Animated Floating Pill Glider */}
              {isActive && (
                <motion.div
                  layoutId="activeHeaderNav"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-full shadow-xs border border-[#E7E7E3] dark:border-neutral-700 z-[-1]"
                />
              )}
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>

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

