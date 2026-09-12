"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  CheckCircle2,
  Clock,
  Sparkles,
  Calendar,
  GraduationCap,
  Layers,
  ChevronRight,
  ArrowRight,
  Target,
  Award,
  Check,
  Flag,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MilestoneStage {
  id: string;
  stepNumber: number;
  code: string;
  title: string;
  dateRange: string;
  status: "completed" | "in-progress" | "pending";
  resultSummary: string;
  description: string;
  scoreBadge?: string;
  deliverables?: string[];
}

const semesterStages: MilestoneStage[] = [
  {
    id: "stage-ca1",
    stepNumber: 1,
    code: "CA1",
    title: "Continuous Assessment 1",
    dateRange: "Aug 18 – Aug 24",
    status: "completed",
    resultSummary: "Completed · 28/30 Marks",
    scoreBadge: "Scored 93%",
    description: "Diagnostic CBT tests & in-class submissions verified.",
    deliverables: ["Diagnostic MCQs (CSE205)", "Lab Practical Sheet 01"]
  },
  {
    id: "stage-mte",
    stepNumber: 2,
    code: "MTE",
    title: "Mid-Term Examinations",
    dateRange: "Sep 22 – Sep 30",
    status: "completed",
    resultSummary: "Completed · Scored 91%",
    scoreBadge: "Dean's List (91%)",
    description: "Theory & practical mid-term evaluations across 5 courses.",
    deliverables: ["CSE205 Data Structures (94%)", "MEC212 Applied Thermo (88%)"]
  },
  {
    id: "stage-ca2",
    stepNumber: 3,
    code: "CA2",
    title: "Continuous Assessment 2",
    dateRange: "Oct 20 – Oct 28",
    status: "in-progress",
    resultSummary: "Current Active Week (Week 8)",
    scoreBadge: "Active Now",
    description: "Technical lab evaluations, case studies & online CBTs.",
    deliverables: ["Operating Systems Lab Viva", "MTH401 Problem Set 04"]
  },
  {
    id: "stage-capstone",
    stepNumber: 4,
    code: "CAPSTONE",
    title: "Capstone Project Demo",
    dateRange: "Nov 14 · Week 11",
    status: "pending",
    resultSummary: "Upcoming Submission",
    scoreBadge: "Nov 14",
    description: "Phase-1 architecture demo & mentor review session.",
    deliverables: ["Architecture Design Doc (ADD)", "GitHub Working Prototype"]
  },
  {
    id: "stage-ete",
    stepNumber: 5,
    code: "ETE",
    title: "End-Term Examinations",
    dateRange: "Dec 02 – Dec 18",
    status: "pending",
    resultSummary: "Final Term Board Exams",
    scoreBadge: "Dec 02",
    description: "Final comprehensive practicals & university board exams.",
    deliverables: ["5 Theory Written Papers", "External Practical Viva"]
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const nodeVariants: Variants = {
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

export interface SemesterRoadmapProps {
  currentWeek?: number;
  totalWeeks?: number;
  className?: string;
}

export function SemesterRoadmap({
  currentWeek = 8,
  totalWeeks = 14,
  className
}: SemesterRoadmapProps) {
  const [selectedStageId, setSelectedStageId] = useState<string>("stage-ca2");

  const progressPercentage = Math.round((currentWeek / totalWeeks) * 100);

  return (
    <section className={cn("w-full space-y-3.5 select-none", className)}>
      {/* ── 1. Section Header & Progress Summary ───────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-1">
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500 block">
            SEMESTER MILESTONES
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#161716] dark:text-white tracking-[-0.03em] leading-snug">
            Roadmap to End-Term Examinations · Week {currentWeek} of {totalWeeks}
          </h2>
        </div>

        {/* Term Progression Pill */}
        <div className="flex items-center gap-2 text-xs font-mono self-start sm:self-auto">
          <span className="text-neutral-500 font-medium">Semester Progress:</span>
          <span className="font-semibold text-[#161716] dark:text-white bg-[#F8F8F6] dark:bg-neutral-800 px-2.5 py-0.5 rounded border border-[#E7E7E3] dark:border-neutral-700">
            {progressPercentage}% Complete (Stage 3 of 5)
          </span>
        </div>
      </div>

      {/* ── 2. Desktop Horizontal Connected Progress Roadmap ──── */}
      <div className="hidden md:block bg-white dark:bg-neutral-900 border border-[#E7E7E3] dark:border-neutral-800 rounded-[28px] p-6 sm:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.02)] relative overflow-hidden">
        {/* ── Connected Progress Track Line ── */}
        <div className="relative mb-6 pt-3 px-6 z-10">
          {/* Base Inactive Line Track */}
          <div className="absolute top-[26px] left-10 right-10 h-0.5 bg-neutral-200 dark:bg-neutral-800 -z-0" />

          {/* Active Liquid Completed Progress Line (Reaches Stage 3) */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "52%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[26px] left-10 h-0.5 bg-[#2F3B34] dark:bg-emerald-500 -z-0 shadow-xs"
          />

          {/* 5 Connected Milestone Nodes Row */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-5 gap-3"
          >
            {semesterStages.map((stage) => {
              const isSelected = selectedStageId === stage.id;
              const isCompleted = stage.status === "completed";
              const isInProgress = stage.status === "in-progress";

              return (
                <motion.div
                  key={stage.id}
                  variants={nodeVariants}
                  onClick={() => setSelectedStageId(stage.id)}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="flex flex-col items-center text-center cursor-pointer group select-none"
                >
                  {/* Node Circle Station */}
                  <div className="relative mb-3 flex items-center justify-center">
                    {/* Pulsing Active Halo for Stage 3 */}
                    {isInProgress && (
                      <span className="absolute -inset-1.5 rounded-full bg-emerald-400/40 animate-ping opacity-60" />
                    )}

                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 border z-10",
                        isCompleted
                          ? "bg-[#2F3B34] border-[#2F3B34] text-white shadow-xs"
                          : isInProgress
                          ? "bg-[#161716] border-[#161716] text-white ring-4 ring-[#2F3B34]/20 shadow-md scale-105"
                          : "bg-white dark:bg-neutral-800 border-[#E7E7E3] dark:border-neutral-700 text-neutral-400 group-hover:border-neutral-400"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : isInProgress ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      ) : (
                        <span>0{stage.stepNumber}</span>
                      )}
                    </div>
                  </div>

                  {/* Stage Card Details */}
                  <div
                    className={cn(
                      "w-full p-3 rounded-xl border transition-all duration-200 text-left space-y-1.5",
                      isSelected
                        ? "bg-[#F8F8F6] dark:bg-neutral-800/80 border-[#E7E7E3] dark:border-neutral-700 shadow-2xs"
                        : "bg-white dark:bg-neutral-900 border-[#E7E7E3] dark:border-neutral-800 hover:bg-[#F8F8F6]/60"
                    )}
                  >
                    {/* Status Badge & Code */}
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-neutral-500">
                        {stage.code}
                      </span>
                      <span
                        className={cn(
                          "text-[9px] font-mono font-medium px-1.5 py-0.2 rounded uppercase",
                          isCompleted
                            ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : isInProgress
                            ? "bg-[#2F3B34] text-white"
                            : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800"
                        )}
                      >
                        {isCompleted ? "Done" : isInProgress ? "Active" : "Pending"}
                      </span>
                    </div>

                    {/* Milestone Title */}
                    <h4 className="text-xs font-semibold text-[#161716] dark:text-white leading-tight line-clamp-1">
                      {stage.title}
                    </h4>

                    {/* Date Window */}
                    <div className="text-[10px] text-neutral-400 font-mono">
                      {stage.dateRange}
                    </div>

                    {/* Score / Result Pill */}
                    <div className="text-[11px] font-mono font-medium text-neutral-600 dark:text-neutral-300 pt-1 border-t border-[#E7E7E3] dark:border-neutral-800 truncate">
                      {stage.resultSummary}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Selected Stage Deliverables Deep Dive Footer */}
        {(() => {
          const currentSelected =
            semesterStages.find((s) => s.id === selectedStageId) || semesterStages[2];
          return (
            <div className="mt-3 pt-3.5 border-t border-[#E7E7E3] dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs z-10 relative">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-medium uppercase bg-[#2F3B34] text-white px-2 py-0.5 rounded">
                  {currentSelected.code}
                </span>
                <span className="text-neutral-600 dark:text-neutral-300 font-normal">
                  {currentSelected.description}
                </span>
              </div>

              <div className="flex items-center gap-2 text-neutral-500 font-mono text-[11px]">
                {currentSelected.deliverables?.map((del, dIdx) => (
                  <span
                    key={dIdx}
                    className="px-2 py-0.5 rounded bg-[#F8F8F6] dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-[#E7E7E3] dark:border-neutral-700"
                  >
                    {del}
                  </span>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* ── 3. Mobile Responsive Vertical Connected Timeline (< 768px) ── */}
      <div className="block md:hidden bg-white dark:bg-neutral-900 border border-[#E7E7E3] dark:border-neutral-800 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="relative pl-6 space-y-5">
          {/* Vertical Track Line */}
          <div className="absolute top-3 bottom-3 left-2.5 w-0.5 bg-neutral-200 dark:bg-neutral-800" />

          {semesterStages.map((stage) => {
            const isCompleted = stage.status === "completed";
            const isInProgress = stage.status === "in-progress";

            return (
              <div key={stage.id} className="relative flex items-start gap-3.5">
                {/* Vertical Node Dot */}
                <div
                  className={cn(
                    "absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-bold border shrink-0 z-10",
                    isCompleted
                      ? "bg-[#2F3B34] border-[#2F3B34] text-white"
                      : isInProgress
                      ? "bg-[#161716] border-[#161716] text-white ring-2 ring-emerald-400"
                      : "bg-white border-neutral-300 text-neutral-400"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-2.5 h-2.5" />
                  ) : (
                    <span>0{stage.stepNumber}</span>
                  )}
                </div>

                {/* Vertical Stage Content Card */}
                <div className="flex-1 bg-[#F8F8F6] dark:bg-neutral-800/50 border border-[#E7E7E3] dark:border-neutral-800 rounded-xl p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#161716] dark:text-white">
                      {stage.title}
                    </span>
                    <span
                      className={cn(
                        "text-[9px] font-mono font-medium px-1.5 py-0.2 rounded uppercase",
                        isCompleted
                          ? "bg-emerald-50 text-emerald-800"
                          : isInProgress
                          ? "bg-[#2F3B34] text-white"
                          : "bg-neutral-200 text-neutral-600"
                      )}
                    >
                      {isCompleted ? "Completed" : isInProgress ? "In Progress" : "Pending"}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-neutral-500">
                    {stage.dateRange} · {stage.resultSummary}
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 pt-0.5 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


export default SemesterRoadmap;
