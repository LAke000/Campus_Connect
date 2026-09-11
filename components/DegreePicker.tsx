"use client";

import React from "react";
import { motion, type Transition } from "motion/react";
import { GraduationCap, Award, BookMarked, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { DegreeCourse } from "@/types/curriculum";

export interface DegreePickerProps {
  degrees: DegreeCourse[];
  selectedDegreeId: string;
  onSelectDegree: (degreeId: string) => void;
  className?: string;
}

const degreePillSpring: Transition = {
  type: "spring",
  stiffness: 450,
  damping: 32,
  mass: 0.7
};

export function DegreePicker({
  degrees,
  selectedDegreeId,
  onSelectDegree,
  className
}: DegreePickerProps) {
  if (!degrees || degrees.length === 0) return null;

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5 text-slate-600" />
          <span>Select Degree Program</span>
        </label>
        <span className="text-xs text-slate-400 font-mono">
          {degrees.length} Degree {degrees.length === 1 ? "Option" : "Options"}
        </span>
      </div>

      <div className="relative bg-slate-100/90 p-1.5 rounded-xl border border-slate-200/90 flex flex-wrap sm:flex-nowrap gap-1.5 overflow-x-auto scrollbar-none">
        {degrees.map((degree) => {
          const isActive = degree.id === selectedDegreeId;

          return (
            <motion.button
              key={degree.id}
              onClick={() => onSelectDegree(degree.id)}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "relative flex-1 min-w-[140px] px-4 py-2.5 rounded-lg text-left transition-colors duration-200 cursor-pointer select-none z-10 flex items-center justify-between gap-3",
                isActive ? "text-slate-950 font-bold" : "text-slate-600 hover:text-slate-900"
              )}
            >
              {/* Animated active pill */}
              {isActive && (
                <motion.div
                  layoutId="activeDegreePill"
                  transition={degreePillSpring}
                  className="absolute inset-0 bg-white rounded-lg shadow-sm border border-slate-300/70 z-[-1]"
                />
              )}

              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={cn(
                    "w-7 h-7 rounded-md flex items-center justify-center text-xs font-mono font-extrabold shrink-0 transition-colors",
                    isActive
                      ? "bg-slate-900 text-white"
                      : "bg-slate-200 text-slate-700"
                  )}
                >
                  {degree.code.substring(0, 3)}
                </div>

                <div className="min-w-0 truncate">
                  <div className="text-xs sm:text-sm font-bold truncate leading-tight">
                    {degree.code}
                  </div>
                  <div className="text-[10px] text-slate-500 font-normal truncate">
                    {degree.name}
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100/80 text-slate-600 shrink-0 border border-slate-200/50">
                {degree.durationYears}Y
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default DegreePicker;
