"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Transition, type Variants } from "motion/react";
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
  ArrowRight,
  Gauge,
  Tag,
  Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Subject, Chapter, QuizQuestion, getChapterQuestions } from "@/types/curriculum";

// ── Subject Icon Resolver ──────────────────────────────────────
export const getSubjectIcon = (code: string) => {
  const c = code.toUpperCase();
  if (c.startsWith("CSE205") || c.startsWith("CSE320") || c.startsWith("CSE202")) return Code2;
  if (c.startsWith("CSE316") || c.startsWith("CSE211") || c.startsWith("ECE")) return Cpu;
  if (c.startsWith("MTH")) return Calculator;
  if (c.startsWith("PHY") || c.startsWith("CHE")) return Sparkles;
  if (c.startsWith("CSE23") || c.startsWith("CSE35") || c.startsWith("CSE412")) return Shield;
  if (c.startsWith("CSE22") || c.startsWith("CSE310") || c.startsWith("CSE361")) return Database;
  if (c.startsWith("CSE214") || c.startsWith("CSE34") || c.startsWith("CSE437") || c.startsWith("CSE44")) return Brain;
  return BookOpen;
};

// Helper to extract core topic tags from chapter title & description
function getTopicTags(chapter: Chapter): string[] {
  const desc = chapter.description || "";
  const parts = desc
    .split(/[,;&•]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 3 && s.length < 35);

  if (parts.length >= 3) {
    return parts.slice(0, 5);
  }

  // Curated fallbacks based on unit title
  const title = chapter.title.toLowerCase();
  if (title.includes("array") || title.includes("linked list") || title.includes("asymptotic")) {
    return ["Big-O / Omega", "Contiguous Arrays", "Singly Linked Lists", "Doubly Linked Lists", "Floyd's Cycle"];
  }
  if (title.includes("stack") || title.includes("queue") || title.includes("recursion")) {
    return ["Stack LIFO", "Circular Queues", "Postfix Evaluation", "Recursion Stack Frames", "Deque Operations"];
  }
  if (title.includes("tree") || title.includes("bst") || title.includes("heap")) {
    return ["Binary Search Trees", "AVL Rotations", "Max-Heaps", "DFS / BFS Traversals", "Min Priority Queue"];
  }
  if (title.includes("graph") || title.includes("sort") || title.includes("search")) {
    return ["QuickSort & MergeSort", "Dijkstra Algorithm", "Kruskal & Prim MST", "Disjoint Set Union (DSU)", "Graph Traversals"];
  }

  return [chapter.title.substring(0, 20), "Core Syllabus Unit", "Diagnostic CBT Ready"];
}

export interface ChapterAccordionProps {
  subject: Subject;
  initiallyExpanded?: boolean;
  onStartQuiz: (subject: Subject, chapter: Chapter) => void;
}

const accordionTransition: Transition = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1]
};

export function ChapterAccordion({
  subject,
  initiallyExpanded = false,
  onStartQuiz
}: ChapterAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const IconComponent = getSubjectIcon(subject.code);
  const chapters = subject.chapters || [];
  const hasPracticeUnits = chapters.length > 0;

  const totalQuestions = chapters.reduce(
    (acc, ch) => acc + getChapterQuestions(ch).length,
    0
  );

  return (
    <motion.div
      layout
      className={cn(
        "Modern-card bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all duration-300 relative",
        isExpanded && "border-slate-900 border-2 ring-1 ring-slate-900/10 shadow-sm"
      )}
    >
      {/* ── Subject Header (Expand Trigger) ─────────────────────────── */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 cursor-pointer select-none"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-extrabold bg-slate-900 text-white px-2.5 py-0.5 rounded-sm shadow-2xs">
              {subject.code}
            </span>
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {subject.credits} Credits • {chapters.length} {chapters.length === 1 ? "Unit" : "Units"}
            </span>
            {subject.semester && (
              <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 hidden sm:inline-block">
                Semester {subject.semester}
              </span>
            )}
          </div>
          <h4 className="font-extrabold text-base sm:text-lg text-slate-950 leading-tight">
            {subject.name}
          </h4>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <IconComponent className="w-5 h-5" />
          </div>

          <button
            type="button"
            className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-white text-slate-600 flex items-center justify-center transition-all cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ── Subject Summary Strip ─────────────────────────────────── */}
      <div className="pt-3.5 pb-1 text-xs flex items-center justify-between">
        {hasPracticeUnits && totalQuestions > 0 ? (
          <div className="flex items-center gap-1.5 text-emerald-600 font-semibold px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100/90 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Practice Units Active • {totalQuestions} Verified MCQs</span>
          </div>
        ) : (
          <span className="text-slate-500 font-mono text-[11px] bg-slate-100 px-2.5 py-1 rounded">
            Prescribed Syllabus Mapped • Practice Question Banks in Curation
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className={cn(
            "font-semibold flex items-center gap-1 text-[11px] rounded px-2.5 py-1 transition-colors cursor-pointer",
            isExpanded ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          )}
        >
          {isExpanded ? "Collapse Units" : `View ${chapters.length} Units`}
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 ml-0.5" /> : <ChevronDown className="w-3.5 h-3.5 ml-0.5" />}
        </button>
      </div>

      {/* ── Framer Motion Animated Chapter Expand Content ─────────── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={accordionTransition}
            className="pt-4 border-t border-slate-200 space-y-4"
          >
            {hasPracticeUnits ? (
              <div className="space-y-3.5">
                {chapters.map((chapter) => {
                  const questions = getChapterQuestions(chapter);
                  const questionCount = questions.length;
                  const unitNum = chapter.number ?? chapter.chapterNumber ?? 1;

                  // Difficulty distribution metrics
                  const easyCount = questions.filter((q) => q.difficulty === "Easy").length;
                  const medCount = questions.filter((q) => q.difficulty === "Medium").length;
                  const hardCount = questions.filter((q) => q.difficulty === "Hard").length;
                  const topics = getTopicTags(chapter);

                  return (
                    <motion.div
                      key={chapter.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-slate-200/90 hover:border-slate-300 rounded-xl p-4 sm:p-5 bg-slate-50/70 hover:bg-white transition-all duration-200 space-y-3 shadow-2xs"
                    >
                      {/* Chapter Top Bar: Unit Number, Question Count & Difficulty Distribution */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/50">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold bg-slate-900 text-white px-2.5 py-0.5 rounded">
                            Unit {unitNum}
                          </span>
                          <h5 className="font-extrabold text-sm sm:text-base text-slate-950">
                            {chapter.title}
                          </h5>
                        </div>

                        {/* Difficulty Distribution Badge */}
                        {questionCount > 0 ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[10px] font-mono text-slate-700 shrink-0 self-start sm:self-auto shadow-2xs">
                            <Gauge className="w-3 h-3 text-blue-600" />
                            <span>
                              <strong>{questionCount} MCQs:</strong> {easyCount} Easy | {medCount} Med | {hardCount} Hard
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-400">
                            Syllabus Prescribed
                          </span>
                        )}
                      </div>

                      {/* Chapter Description */}
                      <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                        {chapter.description}
                      </p>

                      {/* Core Syllabus Topics Tag List */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] font-mono font-semibold text-slate-400 flex items-center gap-1 mr-1">
                          <Tag className="w-3 h-3" /> Topics:
                        </span>
                        {topics.map((tag, tIdx) => (
                          <span
                            key={`${chapter.id}-tag-${tIdx}`}
                            className="text-[10px] font-mono bg-white border border-slate-200/80 text-slate-700 px-2 py-0.5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Bottom Launcher Bar */}
                      <div className="pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 text-[11px] text-blue-700 font-medium bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100/80">
                          <Zap className="w-3.5 h-3.5 text-blue-600" />
                          <span>Computer Based Test (CBT) Engine Ready</span>
                        </div>

                        {questionCount > 0 ? (
                          <button
                            onClick={() => onStartQuiz(subject, chapter)}
                            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shrink-0 shadow-sm hover:shadow"
                          >
                            <Rocket className="w-3.5 h-3.5 text-blue-300" />
                            <span>Launch Practice Quiz ({questionCount} Questions)</span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                          </button>
                        ) : (
                          <span className="text-xs font-mono text-slate-400 italic">
                            Practice Questions in preparation
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-500">
                Course chapters and learning outcomes mapped according to LPU curriculum guidelines.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ChapterAccordion;


