"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import {
  BookOpen,
  BrainCircuit,
  Video,
  Flame,
  ArrowUpRight,
  ArrowRight,
  Clock,
  Calendar,
  Sparkles,
  CheckCircle2,
  Bookmark,
  DoorOpen,
  Award,
  Layers,
  GraduationCap,
  FileText,
  ChevronRight,
  Users,
  Compass,
  Monitor
} from "lucide-react";
import { cn } from "@/lib/utils";

import { StudentHeroPulse } from "@/components/StudentHeroPulse";
import { DailyAcademicDeck } from "@/components/DailyAcademicDeck";
import { SemesterRoadmap } from "@/components/SemesterRoadmap";
import { StudentUtilitiesRow } from "@/components/StudentUtilitiesRow";
import { AcademicHealthBlock } from "@/components/AcademicHealthBlock";


// Initialize Supabase client


const supabase = createClient(

  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();

  // Fetch user session
  const fetchUser = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        // For development fallback if no auth session active
        setUser({
          user_metadata: {
            full_name: "Shourya Verma",
            registration_number: "12204891",
            role: "Student",
            department: "Computer Science & Engineering"
          }
        });
        return;
      }

      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        setUser({
          user_metadata: {
            full_name: "Shourya Verma",
            registration_number: "12204891",
            role: "Student",
            department: "Computer Science & Engineering"
          }
        });
        return;
      }

      setUser(data.user);
    } catch (err) {
      setUser({
        user_metadata: {
          full_name: "Shourya Verma",
          registration_number: "12204891",
          role: "Student",
          department: "Computer Science & Engineering"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getUserDisplayName = () => {
    return user?.user_metadata?.full_name || "Shourya";
  };

  const getUserRegNumber = () => {
    return user?.user_metadata?.registration_number || "12204891";
  };

  const getUserDepartment = () => {
    return user?.user_metadata?.department || "B.Tech Computer Science & Engineering";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 320, damping: 26, mass: 0.8 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 select-none"
    >
      {/* ── 1. Hero Header Pulse Component (Ethan Cole Reference) ── */}
      <motion.div variants={itemVariants}>
        <StudentHeroPulse
          studentName={getUserDisplayName()}
          registrationNumber={getUserRegNumber()}
          section="Section K22CS"
          degree={getUserDepartment()}
          university="LPU"
          session="Academic Session 2026–2027 · Semester 5"
          focusLine="Specializing in AI & Machine Learning · Focus on Distributed Systems & Algorithmic Problem Solving"
          academicStanding="Academic Status: Excellent Standing (Dean's List Eligible)"
          mentorGroup="Capstone Group 14"
          location="Block 34 · Room 402 · Active Now"
        />
      </motion.div>

      {/* ── 2. Today's Academic Priority Deck (4-Column Structured Deck) ── */}
      <motion.section variants={itemVariants}>
        <DailyAcademicDeck />
      </motion.section>

      {/* ── 3. Semester Milestones Roadmap (5-Stage Connected Progress Line) ── */}
      <motion.section variants={itemVariants}>
        <SemesterRoadmap currentWeek={8} totalWeeks={14} />
      </motion.section>

      {/* ── 4. Daily Student Utilities Row (4 Minimal Micro-Border Cards) ── */}
      <motion.section variants={itemVariants}>
        <StudentUtilitiesRow />
      </motion.section>

      {/* ── 5. Academic Health & Guidance Block (Mentor Note & Attendance Donut) ── */}
      <motion.section variants={itemVariants}>
        <AcademicHealthBlock
          studentName={getUserDisplayName()}
          attendancePercentage={88}
          totalDelivered={240}
          totalAttended={212}
          safeMarginHours={32}
        />
      </motion.section>

      {/* ── 6. Main Activity Feed & Enrolled Disciplines ───────── */}



      <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Feed: Enrolled Course Modules (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 rounded-[28px] border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#1C1D1F] dark:text-white tracking-tight">
                Prescribed Semester Curriculum (Year 2)
              </h2>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                5 Core Modules · 20 Credits Registered
              </p>
            </div>
            <Link
              href="/quizzes"
              className="text-xs font-semibold text-[#4E5952] dark:text-neutral-300 hover:text-neutral-900 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {[
              {
                code: "CSE205",
                name: "Data Structures & Algorithms",
                credits: 4,
                units: 4,
                activeCBT: true,
                desc: "Asymptotic complexity, linked lists, BST trees, Dijkstra & Kruskal algorithms."
              },
              {
                code: "CSE316",
                name: "Operating Systems",
                credits: 4,
                units: 4,
                activeCBT: false,
                desc: "Process scheduling, virtual memory, demand paging, concurrency semaphores."
              },
              {
                code: "MTH401",
                name: "Discrete Mathematics",
                credits: 4,
                units: 4,
                activeCBT: false,
                desc: "Graph theory, combinatorics, recurrence relations, boolean algebra."
              },
              {
                code: "CSE202",
                name: "Object Oriented Programming (C++)",
                credits: 4,
                units: 4,
                activeCBT: false,
                desc: "Polymorphism, templates, STL containers, dynamic memory allocation."
              }
            ].map((course) => (
              <div
                key={course.code}
                className="p-4 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 hover:bg-white dark:hover:bg-neutral-800 hover:border-neutral-300 transition-all flex items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200">
                      {course.code}
                    </span>
                    <span className="text-xs font-bold text-[#1C1D1F] dark:text-white truncate">
                      {course.name}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 line-clamp-1">
                    {course.desc}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-xs font-mono">
                  <span className="text-neutral-400 hidden sm:inline">{course.credits} Credits</span>
                  {course.activeCBT ? (
                    <Link
                      href="/quizzes"
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[11px] border border-emerald-200/80 hover:bg-emerald-100 transition-colors"
                    >
                      Take Quiz
                    </Link>
                  ) : (
                    <span className="text-neutral-400 text-[11px]">Syllabus</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Feed: Study Desk & Reading Log (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-neutral-900 rounded-[28px] border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1C1D1F] dark:text-white tracking-tight">
                  Study Desk & Reading Log
                </h2>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">
                  Synchronized from Digital Vault
                </p>
              </div>
              <Link
                href="/library"
                className="text-xs font-semibold text-[#4E5952] dark:text-neutral-300 hover:text-neutral-900 flex items-center gap-1"
              >
                <span>Library</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: "Introduction to Algorithms (CLRS)",
                  author: "Cormen, Leiserson",
                  progress: 42,
                  dept: "CSE",
                  shelf: "Shelf 4B-105"
                },
                {
                  title: "Clean Code",
                  author: "Robert C. Martin",
                  progress: 78,
                  dept: "CSE",
                  shelf: "Shelf 4B-102"
                },
                {
                  title: "Designing Data-Intensive Applications",
                  author: "Martin Kleppmann",
                  progress: 65,
                  dept: "Data Science",
                  shelf: "Digital Only"
                }
              ].map((book) => (
                <div
                  key={book.title}
                  className="p-3.5 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1C1D1F] dark:text-white truncate max-w-[200px]">
                      {book.title}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                      {book.progress}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4E5952] dark:bg-neutral-300 rounded-full"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                    <span>{book.author}</span>
                    <span>{book.shelf}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
            <span className="font-mono">Central Library Level 4 Section A</span>
            <Link
              href="/library"
              className="font-semibold text-neutral-900 dark:text-white hover:underline"
            >
              Open E-Vault
            </Link>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

