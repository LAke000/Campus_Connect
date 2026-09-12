"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import {
  BookOpen,
  Calculator,
  BrainCircuit,
  Receipt,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  FileCheck2,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface StudentUtilitiesRowProps {
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

const itemVariants: Variants = {
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

const utilities = [
  {
    id: "util-library",
    title: "Digital Library",
    description: "Access IEEE papers, core textbooks & OPAC shelf search.",
    icon: BookOpen,
    href: "/library",
    badge: "12 Volumes Active"
  },
  {
    id: "util-attendance",
    title: "Attendance Calculator",
    description: "Simulate leaves safely above the mandatory 75% limit.",
    icon: Calculator,
    href: "/profile",
    badge: "+32h Margin"
  },
  {
    id: "util-quizzes",
    title: "Practice Quizzes",
    description: "20-question topic CBT modules mapped by syllabus year.",
    icon: BrainCircuit,
    href: "/quizzes",
    badge: "8 Branches"
  },
  {
    id: "util-clearance",
    title: "Fee & Clearance",
    description: "Download fee receipts, admit cards & hostel clearance.",
    icon: Receipt,
    href: "/profile",
    badge: "Term Clear"
  }
];

export function StudentUtilitiesRow({ className }: StudentUtilitiesRowProps) {
  return (
    <section className={cn("w-full space-y-3.5 select-none", className)}>
      {/* ── Section Header ─────────────────────────────────────── */}
      <div className="flex items-center justify-between pb-1">
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500 block">
            STUDENT SERVICES
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#161716] dark:text-white tracking-[-0.03em] leading-snug">
            Daily Student Utilities
          </h2>
        </div>

        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 hidden sm:inline-block">
          One-Click Academic Tools
        </span>
      </div>

      {/* ── 4 Minimal Utility Cards with Clean Micro-Borders ───── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {utilities.map((util) => {
          const IconComponent = util.icon;

          return (
            <motion.div
              key={util.id}
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={util.href}
                className="group h-full bg-white dark:bg-neutral-900 border border-[#E7E7E3] dark:border-neutral-800 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-neutral-400 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-4 cursor-pointer block"
              >
                <div className="space-y-3">
                  {/* Standalone Icon & Badge Header */}
                  <div className="flex items-center justify-between">
                    <IconComponent className="w-5 h-5 text-[#161716] dark:text-neutral-200 group-hover:text-[#2F3B34] transition-colors" />

                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#F8F8F6] dark:bg-neutral-800 text-[#161716] dark:text-neutral-300 border border-[#E7E7E3] dark:border-neutral-700">
                      {util.badge}
                    </span>
                  </div>

                  {/* Title & 1-line Description */}
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-semibold text-[#161716] dark:text-white tracking-tight group-hover:text-[#2F3B34] transition-colors">
                      {util.title}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 font-normal">
                      {util.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Indicator */}
                <div className="pt-3 border-t border-[#E7E7E3] dark:border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-neutral-400 group-hover:text-[#161716] transition-colors">
                    Access Tool
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#161716] dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

export default StudentUtilitiesRow;

