"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { CampusLandmarkSlideshow } from "@/components/dashboard/CampusLandmarkSlideshow";
import { LiveClockAndCalendar } from "@/components/dashboard/LiveClockAndCalendar";
import { ContextualReminderEngine } from "@/components/dashboard/ContextualReminderEngine";
import { RecentActivityCommandCenter } from "@/components/dashboard/RecentActivityCommandCenter";
import {
  GraduationCap,
  Video,
  BrainCircuit,
  BookOpen,
  Compass,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles,
  User,
  Loader2,
} from "lucide-react";

const supabase = createClient();

interface DashboardProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  department: string;
  registration_number: string;
}

function getGreeting(date: Date) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function StudentDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<DashboardProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    let isMounted = true;

    async function loadStudentProfile() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session?.user) {
          router.push("/login");
          return;
        }

        const user = session.user;

        // Fetch full profile record from profiles
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (!isMounted) return;

        setProfile({
          id: user.id,
          full_name:
            profileData?.full_name ||
            user.user_metadata?.full_name ||
            user.email?.split("@")[0] ||
            "Student",
          email: user.email || "",
          role: profileData?.role || user.user_metadata?.role || "student",
          department:
            profileData?.department ||
            user.user_metadata?.department ||
            "School of Computer Science & Engineering",
          registration_number:
            profileData?.registration_number ||
            profileData?.reg_no ||
            user.user_metadata?.registration_number ||
            user.user_metadata?.reg_no ||
            "12204918",
        });
      } catch (err) {
        console.error("Dashboard profile load error:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadStudentProfile();

    return () => {
      isMounted = false;
    };
  }, [router]);

  // Live greeting updater
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" as const },
    },
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-3">
        <Loader2 className="size-8 animate-spin text-slate-900 dark:text-white" />
        <p className="font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold">
          Synchronizing LPU Academic Grid...
        </p>
      </div>
    );
  }

  const studentName = profile?.full_name || "Student";
  const studentReg = profile?.registration_number || "12204918";
  const studentDept = profile?.department || "School of Computer Science & Engineering";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-8"
    >
      {/* ── 1. Personalized Header & Quick Action Ribbon ── */}
      <motion.header
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {getGreeting(currentTime)}, {studentName}!
            </h1>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Active Session
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono flex flex-wrap items-center gap-2">
            <span>{studentDept}</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span>REG: {studentReg}</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">B.TECH CSE (Year 2)</span>
          </p>
        </div>

        {/* Quick Launch Pills */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          <Link
            href="/doubts"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950 text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <Video className="size-3.5" />
            <span>Join Doubt Room</span>
          </Link>

          <Link
            href="/quizzes"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <BrainCircuit className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Daily Quiz</span>
          </Link>
        </div>
      </motion.header>

      {/* ── 2. Primary Responsive Two-Column Command Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── Left Column (Primary Feed - 65% / 7.5 cols) ── */}
        <motion.div variants={itemVariants} className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* (0) Campus Landmark Showcase Carousel */}
          <CampusLandmarkSlideshow />

          {/* (3) "Your Recent Activity" Command Center */}
          <RecentActivityCommandCenter />
        </motion.div>

        {/* ── Right Column (Utility Sidebar - 35% / 4.5 cols) ── */}
        <motion.div variants={itemVariants} className="lg:col-span-5 xl:col-span-4 space-y-6">
          {/* (2) Glassmorphic Live Clock & Interactive Mini-Calendar */}
          <LiveClockAndCalendar />

          {/* (1) Smart Contextual Reminder Engine */}
          <ContextualReminderEngine />
        </motion.div>
      </div>
    </motion.div>
  );
}
