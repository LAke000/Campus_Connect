"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ListFilter, Search, BookOpen, Layers3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Subject, Chapter, AcademicYear } from "@/types/curriculum";
import ChapterAccordion from "./ChapterAccordion";

export interface SubjectListProps {
  activeYear: AcademicYear;
  programLabel: string;
  onStartPracticeQuiz: (subject: Subject, chapter: Chapter) => void;
}

// Fade and Slide Up Variants
const contentVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04, // stagger children subtly
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] // swift smooth ease
    }
  }),
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 }
  }
};

export function SubjectList({
  activeYear,
  programLabel,
  onStartPracticeQuiz
}: SubjectListProps) {
  const subjects = activeYear.subjects;
  const yearTitle = activeYear.label || `Year ${activeYear.year}`;

  return (
    <div className="w-full">
      {/* ── Context Banner ────────────────────────────────────── */}
      <div className="bg-white border text-center border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col items-center gap-2 mb-8">
        <Layers3 className="w-10 h-10 text-slate-400" />
        <p className="text-sm font-semibold text-slate-800">Showing modules for:</p>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight leading-snug max-w-2xl px-4">
          {programLabel} • {yearTitle} modules map
        </h2>
        <p className="text-xs text-slate-500 font-mono mt-1">
          Targeted chapter-wise assessments mapped to official B.Tech syllabi. Select a unit to begin test.
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
          <BookOpen className="w-4 h-4 text-slate-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
            Prescribed Subjects ({subjects.length} Units Map Ready)
          </h3>
        </div>
      </div>

      {/* ── Animated Subject Accordion List ─────────────────────── */}
      <AnimatePresence>
        <div className="space-y-4">
          {subjects.map((sub, index) => (
            <motion.div
              key={`${activeYear.year}-${sub.code}`} // key must change when switching year
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={index} // propagate stagger
              layout
            >
              <ChapterAccordion
                subject={sub}
                // Pre-expand first subject with chapters
                initiallyExpanded={index === activeYear.subjects.findIndex(s => s.chapters.length > 0)}
                onStartQuiz={onStartPracticeQuiz}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {subjects.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl bg-white/50 space-y-3">
          <Search className="w-12 h-12 text-slate-300 mx-auto" />
          <p className="text-base font-semibold text-slate-700">No subjects currently defined for this year</p>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">Syllabus definitions are dynamically generated based on standard curriculum timelines.</p>
        </div>
      )}
    </div>
  );
}

export default SubjectList;
