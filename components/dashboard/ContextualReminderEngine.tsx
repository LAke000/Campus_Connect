"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ReminderItem,
  ReminderModule,
  ReminderUrgency,
} from "@/types/dashboard";
import {
  Bell,
  Plus,
  Check,
  CheckCircle2,
  Clock,
  AlertTriangle,
  AlertCircle,
  Info,
  BrainCircuit,
  BookOpen,
  DoorOpen,
  Users,
  X,
  Trash2,
  Calendar,
} from "lucide-react";

const INITIAL_REMINDERS: ReminderItem[] = [
  {
    id: "rem-1",
    title: "DSA Diagnostic Quiz #3 Submission",
    module: "quizzes",
    moduleLabel: "Practice Quizzes",
    dueDate: "Today",
    dueTime: "05:00 PM",
    urgency: "critical",
    completed: false,
  },
  {
    id: "rem-2",
    title: "Finish Reading OS Three Easy Pieces (Ch 4)",
    module: "library",
    moduleLabel: "Digital Library",
    dueDate: "Today",
    dueTime: "08:30 PM",
    urgency: "moderate",
    completed: false,
  },
  {
    id: "rem-3",
    title: "Dr. Sharma Cabin Walk-In Token #3",
    module: "cabins",
    moduleLabel: "Faculty Cabin Walk-In",
    dueDate: "Tomorrow",
    dueTime: "11:00 AM",
    urgency: "low",
    completed: false,
  },
  {
    id: "rem-4",
    title: "DP on Trees Peer Study Pod @ Central Library",
    module: "pods",
    moduleLabel: "Study Pods",
    dueDate: "Sep 16",
    dueTime: "04:00 PM",
    urgency: "moderate",
    completed: false,
  },
];

export function ContextualReminderEngine() {
  const [reminders, setReminders] = useState<ReminderItem[]>(INITIAL_REMINDERS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState("");
  const [newModule, setNewModule] = useState<ReminderModule>("quizzes");
  const [newDueDate, setNewDueDate] = useState("Today");
  const [newDueTime, setNewDueTime] = useState("06:00 PM");
  const [newUrgency, setNewUrgency] = useState<ReminderUrgency>("moderate");

  // Complete & dismiss reminder with animation
  const handleDismiss = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  // Add reminder
  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const moduleLabelMap: Record<ReminderModule, string> = {
      quizzes: "Practice Quizzes",
      library: "Digital Library",
      cabins: "Faculty Cabin Walk-In",
      pods: "Study Pods",
    };

    const newReminder: ReminderItem = {
      id: `rem-${Date.now()}`,
      title: newTitle.trim().slice(0, 60),
      module: newModule,
      moduleLabel: moduleLabelMap[newModule],
      dueDate: newDueDate,
      dueTime: newDueTime,
      urgency: newUrgency,
      completed: false,
    };

    setReminders((prev) => [newReminder, ...prev]);
    setNewTitle("");
    setIsModalOpen(false);
  };

  const getModuleIcon = (mod: ReminderModule) => {
    switch (mod) {
      case "quizzes":
        return <BrainCircuit className="size-3 text-emerald-600 dark:text-emerald-400" />;
      case "library":
        return <BookOpen className="size-3 text-blue-600 dark:text-blue-400" />;
      case "cabins":
        return <DoorOpen className="size-3 text-amber-600 dark:text-amber-400" />;
      case "pods":
        return <Users className="size-3 text-purple-600 dark:text-purple-400" />;
    }
  };

  const getUrgencyBadge = (urgency: ReminderUrgency) => {
    switch (urgency) {
      case "critical":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-[10px] font-bold uppercase tracking-wider">
            <AlertCircle className="size-3 text-rose-600 dark:text-rose-400" />
            <span>CRITICAL</span>
          </span>
        );
      case "moderate":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300 text-[10px] font-bold uppercase tracking-wider">
            <AlertTriangle className="size-3 text-amber-600 dark:text-amber-400" />
            <span>MODERATE</span>
          </span>
        );
      case "low":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-[10px] font-medium uppercase tracking-wider">
            <Info className="size-3 text-slate-500 dark:text-slate-400" />
            <span>LOW</span>
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
            <Bell className="size-3.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
            Smart Contextual Reminders
          </h3>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {reminders.length}
          </span>
        </div>

        {/* Add Reminder Action */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
        >
          <Plus className="size-3.5" />
          <span>New</span>
        </button>
      </div>

      {/* Reminders List with Exit Animations */}
      <div className="space-y-2">
        {reminders.length === 0 ? (
          <div className="py-6 text-center text-slate-400 text-xs">
            <CheckCircle2 className="size-6 text-emerald-500 mx-auto mb-1.5" />
            <p className="font-semibold text-slate-700 dark:text-slate-300">All caught up!</p>
            <p className="text-[11px] text-slate-400">No active academic reminders pending.</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {reminders.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, scale: 0.95, marginBottom: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex items-start gap-2.5 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                {/* Instant Dismiss Checkbox */}
                <button
                  type="button"
                  onClick={() => handleDismiss(item.id)}
                  title="Mark Complete"
                  className="mt-0.5 size-4 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 flex items-center justify-center text-transparent hover:text-emerald-600 hover:border-emerald-500 transition-all cursor-pointer shrink-0"
                >
                  <Check className="size-3 stroke-[3]" />
                </button>

                {/* Reminder Body */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400">
                      {getModuleIcon(item.module)}
                      {item.moduleLabel}
                    </span>
                    {getUrgencyBadge(item.urgency)}
                  </div>

                  <p className="text-xs font-semibold text-slate-900 dark:text-white leading-snug line-clamp-1">
                    {item.title}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="size-2.5" />
                      {item.dueDate} · {item.dueTime}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* ── Add Reminder Modal ────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Create Contextual Reminder
                </h4>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              <form onSubmit={handleAddReminder} className="space-y-3">
                {/* Title */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    <label>Reminder Title:</label>
                    <span className="font-mono text-slate-400">{newTitle.length}/60</span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={60}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. DSA Quiz #3 Submission Due"
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-950 dark:focus:ring-white shadow-2xs"
                  />
                </div>

                {/* Target Platform Module */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Platform Module:
                  </label>
                  <select
                    value={newModule}
                    onChange={(e) => setNewModule(e.target.value as ReminderModule)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="quizzes">Practice Quizzes (DSA, OS, DBMS)</option>
                    <option value="library">Digital Library (Course Books & Notes)</option>
                    <option value="cabins">Faculty Cabin Walk-In</option>
                    <option value="pods">Study Pods & Peer Bounties</option>
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Due Date:
                    </label>
                    <input
                      type="text"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      placeholder="Today / Tomorrow"
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Time:
                    </label>
                    <input
                      type="text"
                      value={newDueTime}
                      onChange={(e) => setNewDueTime(e.target.value)}
                      placeholder="05:00 PM"
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Urgency */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Urgency:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["critical", "moderate", "low"] as ReminderUrgency[]).map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setNewUrgency(u)}
                        className={`py-1 text-[10px] font-mono font-bold uppercase rounded-lg border transition-colors cursor-pointer ${
                          newUrgency === u
                            ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white"
                            : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newTitle.trim()}
                    className="px-4 py-1.5 text-xs font-bold bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950 rounded-xl transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
                  >
                    Schedule
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
