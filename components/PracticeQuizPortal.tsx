"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import {
  ChevronRight,
  GraduationCap,
  Layers,
  Calendar,
  Compass,
  Sparkles,
  BookOpen,
  Info,
  CheckCircle2,
  Building
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Subject, Chapter, AcademicYearNumber } from "@/types/curriculum";
import { useCurriculumNav, UseCurriculumNavOptions } from "@/hooks/useCurriculumNav";
import { FacultyDomainBar } from "./FacultyDomainBar";
import { DegreePicker } from "./DegreePicker";
import { SpecializationBranchPicker } from "./SpecializationBranchPicker";
import { DynamicCurriculumView } from "./DynamicCurriculumView";
import { SubjectList } from "./SubjectList";
import { QuizRunner } from "./QuizRunner";


export interface PracticeQuizPortalProps extends UseCurriculumNavOptions {
  className?: string;
}

const yearGliderSpring: Transition = {
  type: "spring",
  stiffness: 450,
  damping: 32,
  mass: 0.8
};

const yearLabels: Record<AcademicYearNumber, { title: string; ordinal: string; badge: string }> = {
  1: { title: "1st Year", ordinal: "Freshman", badge: "Foundation" },
  2: { title: "2nd Year", ordinal: "Sophomore", badge: "Core Systems" },
  3: { title: "3rd Year", ordinal: "Junior", badge: "Advanced Topics" },
  4: { title: "4th Year", ordinal: "Senior", badge: "Capstone & Specialization" }
};

export function PracticeQuizPortal({
  initialFacultyId = "faculty-engineering",
  initialDegreeId = "degree-btech",
  initialBranchId = "branch-btech-cse",
  initialYearIndex = 1, // Default to 2nd Year (CSE205 Data Structures)
  taxonomy,
  className
}: PracticeQuizPortalProps) {
  // ── Unified Cascading Navigation State Hook ─────────────────
  const {
    selectedFacultyId,
    selectedDegreeId,
    selectedBranchId,
    selectedYearIndex,
    currentFaculty,
    currentDegree,
    currentBranch,
    currentYear,
    availableFaculties,
    availableDegrees,
    availableBranches,
    availableYears,
    setFaculty,
    setDegree,
    setBranch,
    setYearIndex
  } = useCurriculumNav({
    initialFacultyId,
    initialDegreeId,
    initialBranchId,
    initialYearIndex,
    taxonomy
  });

  // ── Active Quiz Runner Session State ─────────────────────────
  const [activeQuizSession, setActiveQuizSession] = useState<{
    subject: Subject;
    chapter: Chapter;
  } | null>(null);

  // Callback to start a practice quiz test
  const handleStartPracticeQuiz = (subject: Subject, chapter: Chapter) => {
    setActiveQuizSession({ subject, chapter });
  };

  // If a test session is active, render the dedicated CBT test runner
  if (activeQuizSession) {
    return (
      <div className="w-full min-h-screen bg-slate-50/70 py-6">
        <QuizRunner
          subject={activeQuizSession.subject}
          chapter={activeQuizSession.chapter}
          onExit={() => setActiveQuizSession(null)}
          onComplete={(results) => {
            console.log("Assessment completed successfully:", results);
          }}
        />
      </div>
    );
  }

  const hasBranchQuizContent = currentBranch.hasContent;

  return (
    <div className={cn("w-full min-h-screen bg-slate-50/70 text-slate-900 pb-24", className)}>
      {/* ── 1. Top-Level Sticky Faculty Domain Bar (Tier 1) ───── */}
      <FacultyDomainBar
        faculties={availableFaculties}
        selectedFacultyId={selectedFacultyId}
        onSelectFaculty={setFaculty}
      />

      {/* ── 2. Dynamic Cascading Breadcrumb Bar ───────────────── */}
      <div className="bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <nav
            aria-label="Cascading Curriculum Path"
            className="flex items-center space-x-2 text-xs font-medium text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5"
          >
            {/* Institution */}
            <div className="flex items-center text-slate-600 gap-1 font-semibold">
              <Building className="w-3.5 h-3.5 text-slate-700" />
              <span>LPU Academic Hub</span>
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

            {/* Faculty */}
            <div className="flex items-center text-slate-800 font-semibold gap-1">
              <span>{currentFaculty.name}</span>
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

            {/* Degree */}
            <div className="flex items-center text-slate-800 font-semibold gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-slate-700" />
              <span>{currentDegree.code}</span>
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

            {/* Branch */}
            <div className="flex items-center text-slate-800 font-semibold gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>{currentBranch.shortName || currentBranch.name}</span>
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

            {/* Year */}
            <div className="flex items-center text-blue-700 font-bold gap-1 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100/80">
              <Calendar className="w-3 h-3 text-blue-600" />
              <span>{yearLabels[currentYear.year]?.title || `Year ${currentYear.year}`}</span>
            </div>
          </nav>
        </div>
      </div>

      {/* ── Main Interactive Canvas ────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 space-y-6">
        {/* ── 3. Header & Meta Banner ─────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-slate-900 text-white font-mono text-[10px] uppercase tracking-wider mb-2">
              <Compass className="w-3 h-3 text-blue-400" />
              <span>LPU Enterprise CBT • Diagnostic Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Curriculum Practice & Diagnostic Tests
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
              Targeted chapter-wise assessments mapped to official Lovely Professional University syllabi.
            </p>
          </div>

          {/* Quick Context Summary Tag */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-white border border-slate-200 px-3.5 py-2 rounded-lg shadow-2xs self-start md:self-auto shrink-0">
            {hasBranchQuizContent ? (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            )}
            <span>Domain: <strong>{currentFaculty.code}</strong></span>
            <span className="text-slate-300">|</span>
            <span>{currentDegree.code} ({currentDegree.durationYears}Y)</span>
            <span className="text-slate-300">|</span>
            <span>{currentBranch.code}</span>
          </div>
        </div>

        {/* ── 4. Degree Picker Row (Tier 2) ───────────────────── */}
        {availableDegrees.length > 1 && (
          <DegreePicker
            degrees={availableDegrees}
            selectedDegreeId={selectedDegreeId}
            onSelectDegree={setDegree}
          />
        )}

        {/* ── 5. Specialization Branch Picker (Tier 3) ────────── */}
        <SpecializationBranchPicker
          branches={availableBranches}
          selectedBranchId={selectedBranchId}
          onSelectBranch={setBranch}
          degreeCode={currentDegree.code}
        />

        {/* ── 6. Dynamic Curriculum & Year Progression View (Tier 4, 5 & 6) ── */}
        <div className="pt-2">
          <DynamicCurriculumView
            branch={currentBranch}
            degreeCode={currentDegree.code}
            selectedYearIndex={selectedYearIndex}
            onSelectYearIndex={setYearIndex}
            onStartPracticeQuiz={handleStartPracticeQuiz}
            onSwitchToActiveBranch={() => setBranch("branch-btech-cse")}
          />
        </div>
      </div>
    </div>
  );
}

export default PracticeQuizPortal;




