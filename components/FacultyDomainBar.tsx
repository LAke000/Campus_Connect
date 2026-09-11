"use client";

import React, { useRef, useEffect } from "react";
import { motion, type Transition } from "motion/react";
import {
  Cpu,
  Briefcase,
  Terminal,
  Atom,
  Scale,
  GraduationCap,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FacultyCategory, FacultyDomain } from "@/types/curriculum";

export interface FacultyDomainBarProps {
  faculties: FacultyCategory[];
  selectedFacultyId: string;
  onSelectFaculty: (facultyId: string) => void;
  className?: string;
}

const pillSpring: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 32,
  mass: 0.8
};

// Domain Icon Resolver
export function getFacultyDomainIcon(name: FacultyDomain | string) {
  switch (name) {
    case "Engineering & Technology":
      return Cpu;
    case "Management & Business":
      return Briefcase;
    case "Computer Applications & IT":
      return Terminal;
    case "Sciences & Humanities":
      return Atom;
    case "Law, Pharmacy & Design":
      return Scale;
    case "Doctoral Studies (Ph.D.)":
      return GraduationCap;
    default:
      return Sparkles;
  }
}

export function FacultyDomainBar({
  faculties,
  selectedFacultyId,
  onSelectFaculty,
  className
}: FacultyDomainBarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Auto scroll active faculty pill into view on narrow screens
  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const element = activeTabRef.current;
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      if (elementRect.left < containerRect.left || elementRect.right > containerRect.right) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    }
  }, [selectedFacultyId]);

  return (
    <nav
      aria-label="Faculty Domains Navigation"
      className={cn(
        "sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs transition-all",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 gap-4">
          {/* Institution mini label */}
          <div className="hidden lg:flex items-center gap-2 pr-4 border-r border-slate-200 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs">
              LPU
            </div>
            <div className="text-[11px] leading-tight">
              <span className="font-extrabold text-slate-900 block font-mono">Faculties</span>
              <span className="text-slate-500 text-[10px]">6 Core Domains</span>
            </div>
          </div>

          {/* Horizontal Scrollable Tabs */}
          <div
            ref={scrollContainerRef}
            className="flex-1 flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none scroll-smooth"
          >
            {faculties.map((faculty) => {
              const isActive = faculty.id === selectedFacultyId;
              const IconComponent = getFacultyDomainIcon(faculty.name);

              return (
                <button
                  key={faculty.id}
                  ref={isActive ? activeTabRef : undefined}
                  onClick={() => onSelectFaculty(faculty.id)}
                  className={cn(
                    "group relative px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-2 select-none shrink-0",
                    isActive
                      ? "text-slate-950 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  )}
                >
                  {/* Glowing Animated Pill beneath/around the active tab */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFacultyPill"
                      transition={pillSpring}
                      className="absolute inset-0 bg-slate-100 border border-slate-300/80 rounded-xl shadow-xs z-0"
                    >
                      {/* Subtle top indicator highlight */}
                      <span className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-900 rounded-full shadow-sm" />
                    </motion.div>
                  )}

                  <span
                    className={cn(
                      "relative z-10 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                      isActive
                        ? "bg-slate-900 text-white shadow-2xs"
                        : "bg-slate-200/80 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900"
                    )}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </span>

                  <span className="relative z-10">{faculty.name}</span>

                  {faculty.hasContent && (
                    <span
                      title="Interactive quiz banks available"
                      className="relative z-10 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default FacultyDomainBar;
