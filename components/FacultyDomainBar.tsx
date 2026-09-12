"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  type Transition,
} from "framer-motion";
import {
  Cpu,
  Briefcase,
  Terminal,
  Atom,
  Scale,
  GraduationCap,
  Sparkles,
  CheckCircle2,
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
  stiffness: 450,
  damping: 35,
  mass: 0.8,
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
  className,
}: FacultyDomainBarProps) {
  const barRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Directional Smart-Scroll State
  const [isHidden, setIsHidden] = useState(false);
  const [isElevated, setIsElevated] = useState(false);
  const lastScrollYRef = useRef(0);

  // 1. Framer Motion useScroll hook (tracks window scroll)
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollYRef.current;
    const diff = latest - previous;

    // Elevate bar with shadow past 20px
    setIsElevated(latest > 20);

    // At top of page (< 20px): always show
    if (latest < 20) {
      setIsHidden(false);
    } else if (diff > 0 && latest > 80) {
      // Scrolling down past 80px threshold: auto-hide
      setIsHidden(true);
    } else if (diff < 0) {
      // Scrolling up any distance: instantly reveal
      setIsHidden(false);
    }

    lastScrollYRef.current = latest;
  });

  // 2. DOM Scroll Container Fallback (for scrollable <main> wrappers)
  useEffect(() => {
    const findScrollParent = (): HTMLElement | null => {
      let el = barRef.current?.parentElement;
      while (el && el !== document.body) {
        const overflow = window.getComputedStyle(el).overflowY;
        if (overflow === "auto" || overflow === "scroll") {
          return el;
        }
        el = el.parentElement;
      }
      return null;
    };

    const container = findScrollParent();
    if (!container) return;

    const handleContainerScroll = () => {
      const current = container.scrollTop;
      const diff = current - lastScrollYRef.current;

      setIsElevated(current > 20);

      if (current < 20) {
        setIsHidden(false);
      } else if (diff > 0 && current > 80) {
        setIsHidden(true);
      } else if (diff < 0) {
        setIsHidden(false);
      }

      lastScrollYRef.current = current;
    };

    container.addEventListener("scroll", handleContainerScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleContainerScroll);
  }, []);

  // 3. Auto scroll active faculty pill into view on narrow screens
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
          inline: "center",
        });
      }
    }
  }, [selectedFacultyId]);

  return (
    <motion.nav
      ref={barRef}
      aria-label="Faculty Domains Navigation"
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isHidden ? "-110%" : "0%",
        opacity: isHidden ? 0 : 1,
      }}
      transition={{
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "sticky top-0 z-30 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 transition-shadow duration-200",
        isElevated
          ? "shadow-sm shadow-slate-200/50 dark:shadow-none"
          : "shadow-xs",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 gap-4">
          {/* Institution mini label */}
          <div className="hidden lg:flex items-center gap-2 pr-4 border-r border-slate-200 dark:border-slate-800 shrink-0">
            <div className="size-7 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black text-xs">
              LPU
            </div>
            <div className="text-[11px] leading-tight">
              <span className="font-extrabold text-slate-900 dark:text-white block font-mono">
                Disciplines
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[10px]">
                Academic Domains
              </span>
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
                    "group relative px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap cursor-pointer flex items-center gap-2 select-none shrink-0",
                    isActive
                      ? "text-slate-950 dark:text-white font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/70"
                  )}
                >
                  {/* Sliding Animated Indicator Pill beneath active tab */}
                  {isActive && (
                    <motion.div
                      layoutId="activeDisciplineIndicator"
                      transition={pillSpring}
                      className="absolute inset-0 bg-slate-100 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700 rounded-xl shadow-xs z-0"
                    >
                      {/* Subtle bottom indicator underline highlight */}
                      <span className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-900 dark:bg-white rounded-full shadow-xs" />
                    </motion.div>
                  )}

                  <span
                    className={cn(
                      "relative z-10 size-6 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                      isActive
                        ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-2xs"
                        : "bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-900"
                    )}
                  >
                    <IconComponent className="size-3.5" />
                  </span>

                  <span className="relative z-10">{faculty.name}</span>

                  {faculty.hasContent && (
                    <span
                      title="Interactive quiz banks available"
                      className="relative z-10 size-1.5 rounded-full bg-emerald-500 shrink-0"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default FacultyDomainBar;
