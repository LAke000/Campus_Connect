"use client";

import React from "react";
import { motion, type Transition } from "motion/react";
import {
  Terminal,
  Brain,
  Database,
  Cpu,
  Wrench,
  Building2,
  Plane,
  Dna,
  Layers,
  Sparkles,
  CheckCircle2,
  Compass
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SpecializationBranch } from "@/types/curriculum";

export interface SpecializationBranchPickerProps {
  branches: SpecializationBranch[];
  selectedBranchId: string;
  onSelectBranch: (branchId: string) => void;
  degreeCode?: string;
  className?: string;
}

const hoverSpring: Transition = {
  type: "spring",
  stiffness: 450,
  damping: 25
};

// Branch Icon Helper
export function getBranchIcon(identifier: string) {
  const s = identifier.toLowerCase();
  if (s.includes("ai") || s.includes("machine learning") || s.includes("aiml")) return Brain;
  if (s.includes("data science") || s.includes("ds") || s.includes("data") || s.includes("analytics"))
    return Database;
  if (s.includes("ece") || s.includes("electronic") || s.includes("communication") || s.includes("vlsi"))
    return Cpu;
  if (s.includes("me") || s.includes("mech") || s.includes("mechanical") || s.includes("thermal"))
    return Wrench;
  if (s.includes("ce") || s.includes("civil") || s.includes("structural"))
    return Building2;
  if (s.includes("aero") || s.includes("aerospace") || s.includes("flight"))
    return Plane;
  if (s.includes("bio") || s.includes("biotech") || s.includes("pharm"))
    return Dna;
  if (s.includes("cse") || s.includes("computer") || s.includes("software") || s.includes("code"))
    return Terminal;
  return Layers;
}

export function SpecializationBranchPicker({
  branches,
  selectedBranchId,
  onSelectBranch,
  degreeCode = "B.Tech",
  className
}: SpecializationBranchPickerProps) {
  if (!branches || branches.length === 0) {
    return (
      <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-500">
        No specializations configured for this degree.
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-slate-600" />
          <span>Select Specialization Branch ({degreeCode})</span>
        </label>
        <span className="text-xs text-slate-400 font-mono">
          {branches.length} Disciplines Prescribed
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {branches.map((branch) => {
          const isSelected =
            branch.id === selectedBranchId ||
            branch.code.toLowerCase() === selectedBranchId.toLowerCase();
          const IconComponent = getBranchIcon(branch.code || branch.shortName || branch.name);
          const years = branch.academicYears || branch.years || [];

          return (
            <motion.button
              key={branch.id}
              onClick={() => onSelectBranch(branch.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={hoverSpring}
              className={cn(
                "group relative flex items-center gap-3 p-3.5 rounded-xl border text-left cursor-pointer transition-colors duration-200 select-none overflow-hidden",
                isSelected
                  ? "bg-white border-slate-900 shadow-md ring-2 ring-slate-900/90"
                  : "bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs text-slate-700"
              )}
            >
              {/* Left Accent Strip when selected */}
              {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-900" />
              )}

              {/* Icon Container */}
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200",
                  isSelected
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 group-hover:bg-slate-200/80 group-hover:text-slate-900"
                )}
              >
                <IconComponent className="w-5 h-5" />
              </div>

              {/* Text Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1.5 mb-0.5">
                  <span
                    className={cn(
                      "text-xs font-bold truncate",
                      isSelected ? "text-slate-950 font-extrabold" : "text-slate-800"
                    )}
                  >
                    {branch.shortName || branch.name}
                  </span>
                  <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-100 text-slate-500 shrink-0">
                    {branch.code}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                  <span>{years.length} Years</span>
                  <span>•</span>
                  {branch.hasContent ? (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active CBT
                    </span>
                  ) : (
                    <span className="text-slate-400">Syllabus Mapped</span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default SpecializationBranchPicker;
