"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Transition, type Variants } from "motion/react";
import {
  Calendar,
  Layers,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronRight,
  FileCode,
  GraduationCap,
  Clock,
  Compass
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SpecializationBranch,
  AcademicYear,
  Subject,
  Chapter,
  AcademicYearNumber,
  getChapterQuestionCount
} from "@/types/curriculum";
import ChapterAccordion, { getSubjectIcon } from "./ChapterAccordion";
import { CurriculumInAssembly } from "./CurriculumInAssembly";

export interface DynamicCurriculumViewProps {
  branch: SpecializationBranch;
  degreeCode?: string;
  selectedYearIndex: number;
  onSelectYearIndex: (index: number) => void;
  onStartPracticeQuiz: (subject: Subject, chapter: Chapter) => void;
  onSwitchToActiveBranch?: () => void;
  className?: string;
}

const yearGliderSpring: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30
};

const cardStaggerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }),
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2 }
  }
};

const yearMetadata: Record<AcademicYearNumber, { title: string; subtitle: string; badge: string }> = {
  1: {
    title: "1st Year",
    subtitle: "Freshman • Engineering Sciences & Foundation",
    badge: "Foundation"
  },
  2: {
    title: "2nd Year",
    subtitle: "Sophomore • Core Disciplines & Systems",
    badge: "Core Systems"
  },
  3: {
    title: "3rd Year",
    subtitle: "Junior • Advanced Paradigms & Specialization",
    badge: "Specialized"
  },
  4: {
    title: "4th Year",
    subtitle: "Senior • Capstone Projects & Industry Internship",
    badge: "Capstone"
  }
};

export function DynamicCurriculumView({
  branch,
  degreeCode = "B.Tech",
  selectedYearIndex,
  onSelectYearIndex,
  onStartPracticeQuiz,
  onSwitchToActiveBranch,
  className
}: DynamicCurriculumViewProps) {
  const years = branch.academicYears || branch.years || [];
  const activeYear: AcademicYear = years[selectedYearIndex] || years[0] || {
    year: 1,
    label: "Year 1",
    semesters: [1, 2],
    subjects: []
  };

  const subjects = activeYear.subjects || [];
  const hasActiveSubjects = subjects.length > 0;
  const currentMeta = yearMetadata[activeYear.year] || {
    title: `Year ${activeYear.year}`,
    subtitle: activeYear.label || "Academic Progression Stage",
    badge: "Core"
  };

  // Compute total credits and question bank size for the active year
  const totalYearCredits = subjects.reduce((acc, s) => acc + (s.credits || 0), 0);
  const totalQuestionsInYear = subjects.reduce(
    (acc, sub) =>
      acc + (sub.chapters || []).reduce((chAcc, ch) => chAcc + getChapterQuestionCount(ch), 0),
    0
  );

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* ── 1. Year Tabs (1st Year, 2nd Year, 3rd Year, 4th Year) ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-600" />
            <span>Academic Progression Stage ({years.length} Academic Years)</span>
          </label>
          <span className="text-xs text-slate-400 font-mono">
            Active: <strong className="text-slate-800">{currentMeta.title}</strong>
          </span>
        </div>

        <div className="relative bg-slate-200/80 p-1.5 rounded-2xl border border-slate-300/70 shadow-inner overflow-x-auto scrollbar-none">
          <div className="flex min-w-max gap-1.5 sm:gap-2">
            {years.map((yearItem, index) => {
              const isActive = index === selectedYearIndex;
              const meta = yearMetadata[yearItem.year] || {
                title: `Year ${yearItem.year}`,
                subtitle: yearItem.label,
                badge: "Active"
              };
              const yearSubjects = yearItem.subjects || [];

              return (
                <button
                  key={`year-nav-tab-${yearItem.year}`}
                  onClick={() => onSelectYearIndex(index)}
                  className={cn(
                    "relative px-4 sm:px-6 py-3 rounded-xl text-left transition-colors duration-200 whitespace-nowrap cursor-pointer z-10 flex items-center justify-between gap-3 sm:gap-6 select-none",
                    isActive ? "text-slate-950 font-bold" : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  {/* Framer Motion activeYearIndicator Glider */}
                  {isActive && (
                    <motion.div
                      layoutId="activeYearIndicator"
                      transition={yearGliderSpring}
                      className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-300/80 z-[-1]"
                    />
                  )}

                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-extrabold transition-colors",
                        isActive
                          ? "bg-slate-900 text-white shadow-2xs"
                          : "bg-slate-300/70 text-slate-700"
                      )}
                    >
                      0{yearItem.year}
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm font-bold leading-tight">
                        {meta.title}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {yearSubjects.length} {yearSubjects.length === 1 ? "Subject" : "Subjects"}
                      </div>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "text-[10px] font-mono px-2 py-0.5 rounded-full border hidden md:inline-block",
                      isActive
                        ? "bg-blue-50 text-blue-700 border-blue-200/80"
                        : "bg-slate-200/60 text-slate-600 border-transparent"
                    )}
                  >
                    {meta.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 2. Context & Credit Banner ──────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-bold text-[10px]">
              {branch.code}
            </span>
            <span>{degreeCode} Program</span>
            <span>•</span>
            <span className="font-semibold text-slate-800">{currentMeta.title}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-950 tracking-tight">
            {branch.name}
          </h2>
          <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
            {currentMeta.subtitle}. Official syllabus schema and credit distribution prescribed by the Board of Studies.
          </p>
        </div>

        {/* Aggregate Stats Badges */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap sm:flex-nowrap">
          <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/90 text-center">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Total Credits</div>
            <div className="text-sm font-extrabold text-slate-900 font-mono">{totalYearCredits} Credits</div>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/90 text-center">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Prescribed Units</div>
            <div className="text-sm font-extrabold text-slate-900 font-mono">{subjects.length} Courses</div>
          </div>
          {totalQuestionsInYear > 0 && (
            <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <div className="text-[10px] font-mono uppercase text-emerald-600 font-bold">Active MCQs</div>
              <div className="text-sm font-extrabold text-emerald-700 font-mono">{totalQuestionsInYear} Verified</div>
            </div>
          )}
        </div>
      </div>

      {/* ── 3. Branch-Specific Subject Engine Grid ─────────────── */}
      {hasActiveSubjects ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
              <BookOpen className="w-3.5 h-3.5 text-slate-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                Prescribed Subject Modules ({subjects.length} Units Map Ready)
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Semester {activeYear.year * 2 - 1} & {activeYear.year * 2}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${branch.id}-${activeYear.year}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              {subjects.map((subject, index) => (
                <motion.div
                  key={`${activeYear.year}-${subject.code}`}
                  variants={cardStaggerVariants}
                  custom={index}
                  layout
                >
                  <ChapterAccordion
                    subject={subject}
                    initiallyExpanded={index === 0 && subject.chapters.length > 0}
                    onStartQuiz={onStartPracticeQuiz}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* ── 4. Empty & Loading State: Curriculum In Assembly ─── */
        <CurriculumInAssembly
          branchName={branch.name}
          degreeCode={degreeCode}
          yearLabel={currentMeta.title}
          estimatedRelease="Academic Term 2026.2"
          onExploreActive={onSwitchToActiveBranch}
        />
      )}
    </div>
  );
}

export default DynamicCurriculumView;
