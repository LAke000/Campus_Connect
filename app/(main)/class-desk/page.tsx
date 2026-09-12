"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  Clock,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  FileText,
  UploadCloud,
  Download,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  Search,
  Check,
  Award,
  Video,
  UserCheck,
  MapPin,
  AlertTriangle,
  Beaker,
} from "lucide-react";
import {
  TimetableSlot,
  ContinuousAssessment,
  LabManualRecord,
  ClassLectureNote,
  CourseProgress,
} from "@/types/classDesk";

const MOCK_TIMETABLE: TimetableSlot[] = [
  {
    id: "slot-1",
    courseCode: "CSE316",
    courseName: "Operating Systems & Kernels",
    type: "lecture",
    startTime: "09:00 AM",
    endTime: "09:50 AM",
    block: "Block 34",
    room: "Room 412",
    instructor: "Dr. Rajesh K. Sharma",
    instructorCabin: "Block 34-402",
    attendanceStatus: "present",
  },
  {
    id: "slot-2",
    courseCode: "CSE325",
    courseName: "Distributed Systems & Cloud",
    type: "lecture",
    startTime: "10:00 AM",
    endTime: "10:50 AM",
    block: "Block 34",
    room: "Room 308",
    instructor: "Dr. Sandeep Kaur",
    instructorCabin: "Block 34-315",
    isHappeningNow: true,
    timeRemainingMinutes: 28,
    attendanceStatus: "scheduled",
  },
  {
    id: "slot-3",
    courseCode: "INT219",
    courseName: "Front-End Web Engineering Lab",
    type: "lab",
    startTime: "11:00 AM",
    endTime: "12:40 PM",
    block: "Block 38",
    room: "Mac Lab 2",
    instructor: "Prof. Vikram Aditya",
    instructorCabin: "Block 38-104",
    isUpcoming: true,
    attendanceStatus: "scheduled",
  },
  {
    id: "slot-4",
    courseCode: "MTH302",
    courseName: "Applied Probability & Linear Algebra",
    type: "tutorial",
    startTime: "02:00 PM",
    endTime: "02:50 PM",
    block: "Block 33",
    room: "Room 201",
    instructor: "Dr. Priya Sengupta",
    instructorCabin: "Block 33-210",
    attendanceStatus: "scheduled",
  },
  {
    id: "slot-5",
    courseCode: "CSE408",
    courseName: "Design & Analysis of Algorithms",
    type: "lecture",
    startTime: "03:00 PM",
    endTime: "03:50 PM",
    block: "Block 34",
    room: "Room 501",
    instructor: "Dr. Arvind Patel",
    instructorCabin: "Block 34-512",
    attendanceStatus: "scheduled",
  },
];

const MOCK_ASSESSMENTS: ContinuousAssessment[] = [
  {
    id: "ca-1",
    courseCode: "CSE316",
    courseName: "Operating Systems",
    title: "CA-2: Multithreaded CPU Scheduler Implementation in C",
    type: "assignment",
    typeLabel: "Programming Project",
    maxMarks: 30,
    weightagePercent: 15,
    dueDate: "Sep 18, 2026",
    dueTime: "11:59 PM",
    status: "pending",
  },
  {
    id: "ca-2",
    courseCode: "CSE325",
    courseName: "Distributed Systems",
    title: "CA-1: Raft Consensus Protocol Simulation Report",
    type: "assignment",
    typeLabel: "Technical Report",
    maxMarks: 25,
    obtainedMarks: 24,
    weightagePercent: 10,
    dueDate: "Sep 05, 2026",
    status: "graded",
    feedback: "Exceptional edge-case analysis on leader election partitions.",
  },
  {
    id: "ca-3",
    courseCode: "INT219",
    courseName: "Front-End Web Engineering",
    title: "Mid-Term Evaluation: SSR Streaming Architecture with Next.js",
    type: "lab_eval",
    typeLabel: "Live Coding & Viva",
    maxMarks: 40,
    weightagePercent: 20,
    dueDate: "Sep 22, 2026",
    dueTime: "05:00 PM",
    status: "pending",
  },
];

const MOCK_LAB_MANUALS: LabManualRecord[] = [
  {
    id: "lab-1",
    courseCode: "CSE316",
    courseName: "Operating Systems Lab",
    labNumber: 4,
    title: "Process Synchronization with Semaphores & Mutexes",
    experimentAim: "Implement the Dining Philosophers Problem without deadlock using POSIX pthreads.",
    block: "Block 34",
    room: "Lab 412",
    status: "verified",
    grade: "O (Outstanding)",
    submissionDeadline: "Completed on Sep 10",
  },
  {
    id: "lab-2",
    courseCode: "INT219",
    courseName: "Front-End Engineering Lab",
    labNumber: 6,
    title: "Optimistic UI Updates with TanStack Query & Supabase Realtime",
    experimentAim: "Build a latency-compensated real-time voting channel with rollback safety.",
    block: "Block 38",
    room: "Mac Lab 2",
    status: "in_progress",
    submissionDeadline: "Due Sep 16, 2026",
  },
  {
    id: "lab-3",
    courseCode: "CSE408",
    courseName: "Algorithms Lab",
    labNumber: 5,
    title: "Network Flow Optimization using Edmonds-Karp Max Flow",
    experimentAim: "Compute max bipartite matching for campus internship allocation graph.",
    block: "Block 34",
    room: "Lab 502",
    status: "pending",
    submissionDeadline: "Due Sep 24, 2026",
  },
];

const MOCK_LECTURE_NOTES: ClassLectureNote[] = [
  {
    id: "note-1",
    courseCode: "CSE316",
    courseName: "Operating Systems",
    lectureNumber: 18,
    lectureDate: "Sep 11, 2026",
    periodTime: "09:00 AM - 09:50 AM",
    topicCovered: "Virtual Memory Paging, TLB Miss Handling & Page Replacement Algorithms",
    associatedUnit: "Unit 3: Memory Virtualization",
    isMissedClass: false,
    verifiedBy: {
      name: "Amanjot Singh",
      role: "CR",
      section: "K23AB",
      timestamp: "Sep 11, 01:20 PM",
    },
    downloadUrl: "#",
    summary: "Comprehensive breakdown of LRU vs Second-Chance Clock algorithm with handwritten trace tables.",
    tags: ["TLB", "Page Faults", "Clock Algorithm"],
    fileSize: "4.2 MB",
  },
  {
    id: "note-2",
    courseCode: "CSE325",
    courseName: "Distributed Systems",
    lectureNumber: 14,
    lectureDate: "Sep 10, 2026",
    periodTime: "10:00 AM - 10:50 AM",
    topicCovered: "Vector Clocks, Lamport Timestamps & Causality Violation Detection",
    associatedUnit: "Unit 2: Logical Time & Coordination",
    isMissedClass: true,
    missedReason: "Approved Hackathon Duty Leave",
    verifiedBy: {
      name: "Divyansh Mehra",
      role: "Course Scribe",
      section: "K23AB",
      timestamp: "Sep 10, 06:15 PM",
    },
    downloadUrl: "#",
    summary: "Notes, whiteboard diagrams, and exam problem walkthrough for vector clock tick matrices.",
    tags: ["Lamport", "Vector Clocks", "Causality"],
    fileSize: "6.8 MB",
  },
];

const MOCK_COURSES: CourseProgress[] = [
  {
    courseCode: "CSE316",
    courseName: "Operating Systems",
    instructor: "Dr. Rajesh K. Sharma",
    instructorCabin: "Block 34-402",
    currentUnit: 3,
    totalUnits: 5,
    syllabusPercent: 68,
    completedTopicsCount: 22,
    totalTopicsCount: 32,
    nextMilestone: "Mid-Term Test: Sep 28",
  },
  {
    courseCode: "CSE325",
    courseName: "Distributed Systems",
    instructor: "Dr. Sandeep Kaur",
    instructorCabin: "Block 34-315",
    currentUnit: 2,
    totalUnits: 4,
    syllabusPercent: 55,
    completedTopicsCount: 16,
    totalTopicsCount: 28,
    nextMilestone: "CA-2 Assignment: Sep 25",
  },
  {
    courseCode: "INT219",
    courseName: "Front-End Web Engineering",
    instructor: "Prof. Vikram Aditya",
    instructorCabin: "Block 38-104",
    currentUnit: 4,
    totalUnits: 5,
    syllabusPercent: 82,
    completedTopicsCount: 28,
    totalTopicsCount: 34,
    nextMilestone: "Project Presentation: Oct 02",
  },
];

export default function ClassDeskPage() {
  const [activeTab, setActiveTab] = useState<"timetable" | "assessments" | "labs" | "notes">("timetable");
  const [submittedAssigments, setSubmittedAssignments] = useState<Record<string, boolean>>({});
  const [selectedDay, setSelectedDay] = useState<string>("Today (Friday)");

  const handleToggleSubmit = (id: string) => {
    setSubmittedAssignments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ── Page Header ── */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              Class Desk
            </h1>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Semester 4 · K23AB
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Live lectures, continuous assessment submissions, verified lecture notes, and lab manuals.
          </p>
        </div>

        {/* Attendance Safety Matrix Badge */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase font-bold text-slate-400">
              Overall Attendance
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                88.4%
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Safe (75%+ met)
              </span>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
          <Link
            href="/doubts"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Ask Doubt</span>
            <ChevronRight className="size-3" />
          </Link>
        </div>
      </header>

      {/* ── Sub Navigation Tabs ── */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px">
        {[
          { id: "timetable", label: "Today's Timetable", icon: Clock },
          { id: "assessments", label: "Assignments & CAs", icon: FileText },
          { id: "labs", label: "Lab Manuals", icon: Beaker },
          { id: "notes", label: "CR Verified Notes", icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "border-slate-950 dark:border-white text-slate-950 dark:text-white"
                  : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
              }`}
            >
              <Icon className="size-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Tab Content ── */}
      <AnimatePresence mode="wait">
        {/* 1. Timetable Tab */}
        {activeTab === "timetable" && (
          <motion.div
            key="timetable"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Daily Schedule Timeline (8 cols) */}
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                    Schedule for {selectedDay}
                  </h2>
                  <span className="text-xs text-slate-500">5 periods scheduled</span>
                </div>

                <div className="space-y-3">
                  {MOCK_TIMETABLE.map((slot) => (
                    <div
                      key={slot.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        slot.isHappeningNow
                          ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800 shadow-xs ring-1 ring-blue-400/30"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 shrink-0 font-mono text-center min-w-[70px]">
                            <span className="text-xs font-bold block">{slot.startTime}</span>
                            <span className="text-[10px] text-slate-400 block">{slot.endTime}</span>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs font-black text-slate-900 dark:text-white">
                                {slot.courseCode}
                              </span>
                              <span className="text-sm font-bold text-slate-900 dark:text-white">
                                {slot.courseName}
                              </span>
                              {slot.isHappeningNow && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white animate-pulse">
                                  Live Now ({slot.timeRemainingMinutes}m left)
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1 flex-wrap">
                              <span className="flex items-center gap-1">
                                <MapPin className="size-3 text-slate-400" />
                                {slot.block} · {slot.room}
                              </span>
                              <span>•</span>
                              <span>{slot.instructor}</span>
                              {slot.instructorCabin && (
                                <>
                                  <span>•</span>
                                  <span className="font-mono text-[11px]">Cabin: {slot.instructorCabin}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          {slot.attendanceStatus === "present" && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                              <CheckCircle2 className="size-3.5" />
                              Attended
                            </span>
                          )}
                          {slot.attendanceStatus === "scheduled" && (
                            <span className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                              Scheduled
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Syllabus Progress (4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                  Syllabus Trackers
                </h2>

                <div className="space-y-3">
                  {MOCK_COURSES.map((course) => (
                    <div
                      key={course.courseCode}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono text-xs font-black text-slate-900 dark:text-white">
                            {course.courseCode}
                          </span>
                          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            {course.courseName}
                          </h3>
                        </div>
                        <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                          {course.syllabusPercent}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-slate-900 dark:bg-white rounded-full transition-all duration-500"
                          style={{ width: `${course.syllabusPercent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <span>Unit {course.currentUnit} of {course.totalUnits}</span>
                        <span>{course.nextMilestone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. Continuous Assessments Tab */}
        {activeTab === "assessments" && (
          <motion.div
            key="assessments"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                Continuous Assessments & Quizzes
              </h2>
              <span className="text-xs text-slate-500">
                {MOCK_ASSESSMENTS.filter((a) => a.status === "pending").length} pending submission
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_ASSESSMENTS.map((ca) => {
                const isSubmitted = submittedAssigments[ca.id] || ca.status === "graded" || ca.status === "submitted";

                return (
                  <div
                    key={ca.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-slate-500">
                          {ca.courseCode} · {ca.typeLabel}
                        </span>
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {ca.weightagePercent}% Weight
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 leading-snug">
                        {ca.title}
                      </h3>

                      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="size-3.5" />
                        <span>Due: {ca.dueDate} {ca.dueTime && `(${ca.dueTime})`}</span>
                      </div>

                      {ca.feedback && (
                        <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                          <p className="font-semibold text-[11px] text-emerald-600 dark:text-emerald-400 mb-0.5">
                            Grade: {ca.obtainedMarks}/{ca.maxMarks} Marks
                          </p>
                          <p>{ca.feedback}</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Max: {ca.maxMarks} pts
                      </span>

                      <button
                        type="button"
                        onClick={() => handleToggleSubmit(ca.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSubmitted
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                            : "bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900"
                        }`}
                      >
                        {isSubmitted ? (
                          <>
                            <Check className="size-3.5" />
                            <span>Submitted</span>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="size-3.5" />
                            <span>Submit Solution</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 3. Lab Manuals Tab */}
        {activeTab === "labs" && (
          <motion.div
            key="labs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                Laboratory Manuals & Experiments
              </h2>
              <span className="text-xs text-slate-500">3 active practicals</span>
            </div>

            <div className="space-y-3">
              {MOCK_LAB_MANUALS.map((lab) => (
                <div
                  key={lab.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-black text-slate-900 dark:text-white px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                        {lab.courseCode} · Lab #{lab.labNumber}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {lab.title}
                      </h3>
                      {lab.status === "verified" && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200">
                          {lab.grade || "Verified"}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      <strong>Aim:</strong> {lab.experimentAim}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                      <span>Venue: {lab.block} ({lab.room})</span>
                      <span>•</span>
                      <span>{lab.submissionDeadline}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                    >
                      <Download className="size-3.5" />
                      <span>Download Manual</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 4. Verified Notes Tab */}
        {activeTab === "notes" && (
          <motion.div
            key="notes"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                Class Representative & Scribe-Verified Notes
              </h2>
              <span className="text-xs text-slate-500">Peer verified within 24h</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_LECTURE_NOTES.map((note) => (
                <div
                  key={note.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-black text-slate-900 dark:text-white">
                        {note.courseCode} · Lecture {note.lectureNumber}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{note.lectureDate}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {note.topicCovered}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {note.summary}
                    </p>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <UserCheck className="size-3.5 text-emerald-500" />
                      <span>
                        Verified by <strong>{note.verifiedBy.name}</strong> ({note.verifiedBy.role})
                      </span>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                    >
                      <Download className="size-3" />
                      <span>{note.fileSize}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
