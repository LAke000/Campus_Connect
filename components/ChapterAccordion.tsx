"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  Code2,
  Cpu,
  Shield,
  Brain,
  Database,
  Calculator,
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Subject, Chapter } from "@/types/curriculum";

// ── Icons Helper (extracted for reuse) ────────────────────────
export const getSubjectIcon = (code: string) => {
  if (code.startsWith("CSE205") || code.startsWith("CSE320")) return Code2;
  if (code.startsWith("CSE316") || code.startsWith("CSE211")) return Cpu;
  if (code.startsWith("MTH")) return Calculator;
  if (code.startsWith("PHY") || code.startsWith("ECE")) return Sparkles;
  if (code.startsWith("CSE23") || code.startsWith("CSE35")) return Shield;
  if (code.startsWith("CSE11") || code.startsWith("CSE22")) return Database;
  return BookOpen;
};

export interface ChapterAccordionProps {
  subject: Subject;
  initiallyExpanded?: boolean;
  onStartQuiz: (subject: Subject, chapter: Chapter) => void;
}

const accordionVariants = {
  collapsed: { height: 0, opacity: 0, overflow: "hidden" },
  expanded: { height: "auto", opacity: 1 },
};

const accordionTransition = { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] };

export default function ChapterAccordion({
  subject,
  initiallyExpanded = false,
  onStartQuiz
}: ChapterAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const IconComponent = getSubjectIcon(subject.code);
  const hasPracticeUnits = subject.chapters.length > 0;

  const totalQuestions = subject.chapters.reduce(
    (acc, ch) => acc + ch.quizQuestions.length,
    0
  );

  return (
    <motion.div
      layout
      className={cn(
        "Modern-card bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all duration-300 relative",
        isExpanded && "border-slate-900 border-2"
      )}
    >
      {/* ── Subject Card Header (non-expanded part) ───────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs font-extrabold bg-slate-900 text-white px-2.5 py-1 rounded-sm">
              {subject.code}
            </span>
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {subject.credits} Credits • {subject.chapters.length} Units
            </span>
          </div>
          <h4 className="font-extrabold text-lg text-slate-950 leading-tight">
            {subject.name}
          </h4>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0 mt-3 sm:mt-0">
          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            <IconComponent className="w-6 h-6" />
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-white text-slate-600 flex items-center justify-center transition-all cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Content (Metadata / Active Units Summary) ──────────────── */}
      <div className="pt-4 pb-2 text-xs flex items-center justify-between">
        {hasPracticeUnits ? (
          <div className="flex items-center gap-1.5 text-emerald-600 font-semibold px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
            <CheckCircle2 className="w-4 h-4" />
            <span>Interactive Practice Units Active • {totalQuestions} Verified MCQs</span>
          </div>
        ) : (
          <span className="text-slate-500 font-mono text-[11px] bg-slate-100 px-2.5 py-1 rounded">
            Syllabus Content Generation in progress...
          </span>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "font-semibold flex items-center gap-1 text-[11px] rounded px-2.5 py-1 transition-colors",
            isExpanded ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:text-slate-900"
          )}
        >
          {isExpanded ? `Unit Tree` : `View Unit Tree`}{" "}
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* ── Animated Accordion Content: Chapter List ────────────────── */}
      <AnimatePresence>
        {isExpanded && hasPracticeUnits && (
          <motion.div
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={accordionVariants}
            transition={accordionTransition}
            className="pt-5 border-t border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono">
                Interactive Practice Units
              </span>
              <span className="text-[11px] text-emerald-600 font-medium">
                Active Question Banks Available
              </span>
            </div>

            <div className="space-y-3.5">
              {subject.chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="Modern-chapter-card border border-slate-200 hover:border-slate-300 rounded-xl p-4 sm:p-5 bg-slate-50/70 hover:bg-white transition-all duration-300 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold bg-slate-200 text-slate-800 px-2.5 py-1 rounded">
                      Unit {chapter.chapterNumber}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                      CBT Engine • {chapter.quizQuestions.length} Questions (MCQ)
                    </span>
                  </div>

                  <h5 className="font-extrabold text-sm text-slate-950">
                    {chapter.title}
                  </h5>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {chapter.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-blue-700 font-medium bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                      <Zap className="w-3.5 h-3.5 text-blue-600" />
                      <span>Diagnostics Ready • Soft Spring Physics</span>
                    </div>

                    <button
                      onClick={() => onStartQuiz(subject, chapter)}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-sm flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                    >
                      <span>Start Practice Quiz (20 Questions)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
