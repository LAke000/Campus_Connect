"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
} from "lucide-react";

interface CalendarEventDay {
  day: number;
  type: "quiz" | "doubt" | "pod";
  label: string;
}

export function LiveClockAndCalendar() {
  const [time, setTime] = useState<Date | null>(null);
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date(2026, 8, 12)); // Sep 2026
  const [selectedDay, setSelectedDay] = useState<number | null>(12);

  // 1-second interval for real-time digital clock
  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format Hours & Minutes & Seconds & Period
  const getClockData = (d: Date | null) => {
    if (!d) {
      return { hours: "12", minutes: "00", seconds: "00", period: "PM" };
    }
    let h = d.getHours();
    const period = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    const hours = h.toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const seconds = d.getSeconds().toString().padStart(2, "0");
    return { hours, minutes, seconds, period };
  };

  const formatDateHeaderStr = (d: Date | null) => {
    if (!d) return "Saturday, Sep 12, 2026";
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const { hours, minutes, seconds, period } = getClockData(time);

  // Days with active academic activities (dots)
  const scheduledDays: CalendarEventDay[] = [
    { day: 12, type: "quiz", label: "DSA Diagnostic Quiz (Active)" },
    { day: 14, type: "doubt", label: "Dr. Arvind Sharma Cabin Slot (11:00 AM)" },
    { day: 16, type: "pod", label: "DP on Trees Study Pod @ Library (4:00 PM)" },
    { day: 19, type: "quiz", label: "OS Process Management Mid-Term" },
    { day: 22, type: "doubt", label: "Senior Peer Code Review with Rohan" },
  ];

  // Calendar matrix calculation
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const monthName = currentMonthDate.toLocaleString("default", { month: "long" });

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const leadingBlanks = Array.from({ length: firstDayIndex }, (_, i) => i);

  const isToday = (dayNum: number) => {
    if (!time) return dayNum === 12;
    return (
      dayNum === time.getDate() &&
      month === time.getMonth() &&
      year === time.getFullYear()
    );
  };

  const getEventsForDay = (dayNum: number) => {
    return scheduledDays.filter((e) => e.day === dayNum);
  };

  const activeDayEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800/80 shadow-lg shadow-slate-200/40 dark:shadow-none rounded-2xl p-5 overflow-hidden space-y-4"
    >
      {/* ── 1. Real-Time Live Digital Clock ─────────────────── */}
      <div className="space-y-1.5 text-left">
        {/* Date Header with Clock Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Clock className="size-3.5 text-slate-400 dark:text-slate-500" />
            <span>{formatDateHeaderStr(time)}</span>
          </div>

          <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            IST · SYNC
          </span>
        </div>

        {/* Live Monospace Clock with Pulsing Colon */}
        <div className="flex items-baseline pt-1">
          <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums flex items-center">
            <span>{hours}</span>
            <span className="animate-pulse text-slate-400 dark:text-slate-500 mx-0.5">:</span>
            <span>{minutes}</span>
            <span className="animate-pulse text-slate-400 dark:text-slate-500 mx-0.5">:</span>
            <span className="text-slate-600 dark:text-slate-300 text-xl sm:text-2xl">{seconds}</span>
          </div>

          {/* AM / PM Indicator Chip */}
          <span className="font-mono text-xs font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 ml-1.5 shadow-2xs">
            {period}
          </span>
        </div>
      </div>

      {/* ── Hairline Divider ──────────────────────────────── */}
      <div className="border-t border-slate-200/60 dark:border-slate-800 pt-4" />

      {/* ── 2. Stacked Mini-Calendar Integration ───────────── */}
      <div className="space-y-3">
        {/* Month Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
            <CalendarIcon className="size-3.5 text-slate-500" />
            <span>
              {monthName} {year}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => setCurrentMonthDate(new Date(year, month - 1, 1))}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer active:scale-90"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => setCurrentMonthDate(new Date(year, month + 1, 1))}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer active:scale-90"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] font-bold text-slate-400 dark:text-slate-500">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>

        {/* Month Dates Grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {leadingBlanks.map((b) => (
            <div key={`blank-${b}`} className="size-7 sm:size-8" />
          ))}

          {daysArray.map((dayNum) => {
            const today = isToday(dayNum);
            const isSelected = selectedDay === dayNum;
            const events = getEventsForDay(dayNum);

            return (
              <button
                key={`day-${dayNum}`}
                type="button"
                onClick={() => setSelectedDay(dayNum)}
                className="relative flex flex-col items-center justify-center size-7 sm:size-8 mx-auto group cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <span
                  className={`flex size-6 sm:size-7 items-center justify-center rounded-full text-xs font-medium transition-all ${
                    today
                      ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold shadow-xs scale-105"
                      : isSelected
                      ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white font-bold ring-1 ring-slate-400"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {dayNum}
                </span>

                {/* Subtle Multi-colored Micro-dots */}
                {events.length > 0 && !today && (
                  <div className="absolute bottom-0 flex gap-0.5">
                    {events.map((ev, i) => (
                      <span
                        key={i}
                        className={`size-1 rounded-full ${
                          ev.type === "quiz"
                            ? "bg-emerald-500"
                            : ev.type === "doubt"
                            ? "bg-sky-500"
                            : "bg-indigo-500"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Day Activity Preview */}
        {selectedDay && activeDayEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-left space-y-1"
          >
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
              <span>{monthName} {selectedDay} Schedule</span>
              <span className="text-emerald-600 dark:text-emerald-400">{activeDayEvents.length} Event</span>
            </div>
            {activeDayEvents.map((ev, idx) => (
              <p key={idx} className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                • {ev.label}
              </p>
            ))}
          </motion.div>
        )}

        {/* Event Legend */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-500" /> Quizzes
          </span>
          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-sky-500" /> Doubt Slot
          </span>
          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-indigo-500" /> Study Pods
          </span>
        </div>
      </div>
    </motion.div>
  );
}
