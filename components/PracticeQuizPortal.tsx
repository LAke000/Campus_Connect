"use client";

import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  ChevronRight,
  GraduationCap,
  Layers,
  Calendar,
  Terminal,
  Shield,
  Brain,
  Database,
  Compass
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Course,
  Program,
  AcademicYear,
  Subject,
  Chapter,
  AcademicYearNumber
} from "@/types/curriculum";
import { lpuCurriculumData } from "@/lib/lpuCurriculumData";
import { SubjectList } from "./SubjectList";
import { QuizRunner } from "./QuizRunner";

export interface PracticeQuizPortalProps {
  courseData?: Course;
  initialProgramId?: string;
  initialYearIndex?: number;
}

const yearTabTransition = {
  type: "spring" as const,
  stiffness: 450,
  damping: 35
};

const yearLabels: Record<AcademicYearNumber, { title: string; ordinal: string; badge: string }> = {
  1: { title: "1st Year", ordinal: "Freshman", badge: "Foundation" },
  2: { title: "2nd Year", ordinal: "Sophomore", badge: "Core Systems" },
  3: { title: "3rd Year", ordinal: "Junior", badge: "Advanced Topics" },
  4: { title: "4th Year", ordinal: "Senior", badge: "Capstone & Specialization" }
};

export function PracticeQuizPortal({
  courseData = lpuCurriculumData,
  initialProgramId = "prog-btech-cse-core",
  initialYearIndex = 1, // Default to 2nd Year (index 1) which has rich CSE205 data
}: PracticeQuizPortalProps) {
  // ── State Management ──────────────────────────────────────────
  const [selectedProgramId, setSelectedProgramId] = useState<string>(initialProgramId);
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(initialYearIndex);
  const [activeQuizSession, setActiveQuizSession] = useState<{
    subject: Subject;
    chapter: Chapter;
  } | null>(null);

  // ── Derived Data ──────────────────────────────────────────────
  const activeProgram: Program = useMemo(() => {
    return (
      courseData.programs.find((p) => p.id === selectedProgramId) ||
      courseData.programs[0]
    );
  }, [courseData, selectedProgramId]);

  const activeYear: AcademicYear = useMemo(() => {
    return (
      activeProgram.years[selectedYearIndex] ||
      activeProgram.years[0]
    );
  }, [activeProgram, selectedYearIndex]);

  // Helper for program icons
  const getProgramIcon = (specialization: string) => {
    switch (specialization.toLowerCase()) {
      case "ai & machine learning":
      case "ai/ml":
        return Brain;
      case "cyber security":
        return Shield;
      case "data science":
        return Database;
      default:
        return Terminal;
    }
  };

  // Callback for starting a quiz
  const handleStartPracticeQuiz = (subject: Subject, chapter: Chapter) => {
    setActiveQuizSession({ subject, chapter });
  };

  // If a quiz session is active, render the test-taking engine
  if (activeQuizSession) {
    return (
      <div className="w-full min-h-screen bg-slate-50/70 py-6">
        <QuizRunner
          subject={activeQuizSession.subject}
          chapter={activeQuizSession.chapter}
          onExit={() => setActiveQuizSession(null)}
          onComplete={(results) => {
            console.log("Assessment completed:", results);
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/70 text-slate-900 pb-20">
      {/* ── Top Header & Breadcrumb Bar ────────────────────────── */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-2 text-xs md:text-sm font-medium text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5"
          >
            <div className="flex items-center text-slate-700 font-semibold gap-1.5">
              <GraduationCap className="w-4 h-4 text-slate-900" />
              <span>{courseData.name}</span>
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

            <div className="flex items-center text-slate-700 gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>{activeProgram.name}</span>
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

            <div className="flex items-center text-blue-600 font-semibold gap-1.5 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>{yearLabels[activeYear.year]?.title || `Year ${activeYear.year}`}</span>
            </div>
          </nav>
        </div>
      </div>

      {/* ── Hero / Selector Controls ───────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-slate-900 text-white font-mono text-[10px] uppercase tracking-wider mb-2.5">
              <Compass className="w-3 h-3 text-blue-400" />
              <span>LPU CBT Portal • Practice Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Curriculum Practice & Diagnostic Tests
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
              Targeted chapter-wise assessments mapped to official Lovely Professional University B.Tech syllabi.
            </p>
          </div>

          {/* Program Quick Selector Badge */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-white border border-slate-200 px-3.5 py-2 rounded-lg shadow-2xs self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Category: <strong>{courseData.category}</strong></span>
            <span className="text-slate-300">|</span>
            <span>{activeProgram.years.length} Academic Years</span>
          </div>
        </div>

        {/* ── Step 3: Top Program Selector Row ───────────────────── */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Select Specialization Branch
            </label>
            <span className="text-xs text-slate-400">
              {courseData.programs.length} Specializations Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {courseData.programs.map((program) => {
              const isSelected = program.id === selectedProgramId;
              const IconComponent = getProgramIcon(program.specialization);

              return (
                <button
                  key={program.id}
                  onClick={() => {
                    setSelectedProgramId(program.id);
                    // Keep year index within bound
                    if (selectedYearIndex >= program.years.length) {
                      setSelectedYearIndex(0);
                    }
                  }}
                  className={cn(
                    "relative flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer",
                    isSelected
                      ? "bg-white border-slate-900 shadow-md ring-1 ring-slate-900"
                      : "bg-white/70 hover:bg-white border-slate-200 hover:border-slate-300 text-slate-700 shadow-2xs"
                  )}
                >
                  <div
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                      isSelected
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600"
                    )}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {program.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      Spec: {program.specialization}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Step 4: Year Tabs with Smooth Framer Motion Glider ── */}
        <div className="mt-8 mb-10">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Academic Progression Stage
            </label>
            <span className="text-xs text-slate-500">
              Showing: <span className="font-semibold text-slate-800">{activeYear.label}</span>
            </span>
          </div>

          <div className="relative bg-slate-200/70 p-1.5 rounded-xl border border-slate-200/90 shadow-inner overflow-x-auto scrollbar-none">
            <div className="flex min-w-max gap-1 sm:gap-2">
              {activeProgram.years.map((yearItem, index) => {
                const isActive = index === selectedYearIndex;
                const meta = yearLabels[yearItem.year];

                return (
                  <button
                    key={`year-tab-${yearItem.year}`}
                    onClick={() => {
                      setSelectedYearIndex(index);
                    }}
                    className={cn(
                      "relative px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap cursor-pointer z-10 flex items-center gap-2",
                      isActive
                        ? "text-slate-950 font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {/* Active Glider Background Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeYearTab"
                        transition={yearTabTransition}
                        className="absolute inset-0 bg-white rounded-lg shadow-sm border border-slate-300/60 z-[-1]"
                      />
                    )}

                    <span className="font-mono text-xs opacity-75">
                      0{yearItem.year}.
                    </span>
                    <span>{meta?.title || `Year ${yearItem.year}`}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Main Subject Accordion List ─────────────────────── */}
        <div className="mt-8">
          <SubjectList
            activeYear={activeYear}
            programLabel={activeProgram.name}
            onStartPracticeQuiz={handleStartPracticeQuiz}
          />
        </div>
      </div>
    </div>
  );
}

export default PracticeQuizPortal;

