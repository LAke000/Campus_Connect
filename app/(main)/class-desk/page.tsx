"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  X,
  Map,
  Loader2,
  Copy,
  Info,
  PenTool,
  Image,
  ArrowRight,
  Send,
  Lock,
} from "lucide-react";
import {
  TimetableSlot,
  ContinuousAssessment,
  LabManualRecord,
  ClassLectureNote,
  CourseProgress,
  ScribeRole,
} from "@/types/classDesk";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

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
  
  // New Interactive States
  const [selectedLecture, setSelectedLecture] = useState<TimetableSlot | null>(null);
  const [selectedCourseProgress, setSelectedCourseProgress] = useState<CourseProgress | null>(null);
  const [notesFilter, setNotesFilter] = useState<string | null>(null);
  
  const [selectedAssignmentForSubmit, setSelectedAssignmentForSubmit] = useState<ContinuousAssessment | null>(null);
  const [selectedAssignmentForRubric, setSelectedAssignmentForRubric] = useState<ContinuousAssessment | null>(null);
  const [selectedLabSpace, setSelectedLabSpace] = useState<LabManualRecord | null>(null);
  
  const [selectedNoteReader, setSelectedNoteReader] = useState<ClassLectureNote | null>(null);
  const [isAuthoringNote, setIsAuthoringNote] = useState(false);
  const [caughtUpNotes, setCaughtUpNotes] = useState<Record<string, boolean>>({});
  const [notesList, setNotesList] = useState<ClassLectureNote[]>(MOCK_LECTURE_NOTES);
  
  const [downloadingLabs, setDownloadingLabs] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [githubRepoUrl, setGithubRepoUrl] = useState<string>("");
  const [copiedLabCode, setCopiedLabCode] = useState<boolean>(false);
  
  const router = useRouter();

  // Handle Escape Key to close modals/drawers
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedLecture(null);
        setSelectedCourseProgress(null);
        setSelectedAssignmentForSubmit(null);
        setSelectedAssignmentForRubric(null);
        setSelectedLabSpace(null);
        setSelectedNoteReader(null);
        setIsAuthoringNote(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Handle Toast Timeout
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleDownloadLab = (e: React.MouseEvent, lab: LabManualRecord) => {
    e.stopPropagation();
    setDownloadingLabs(prev => ({ ...prev, [lab.id]: true }));
    setTimeout(() => {
      setDownloadingLabs(prev => ({ ...prev, [lab.id]: false }));
      setToastMessage(`Downloaded ${lab.courseCode}_Lab_Manual.pdf`);
    }, 1000);
  };

  const copyLabCode = () => {
    navigator.clipboard.writeText(`// Starter Code\n#include <stdio.h>\n#include <pthread.h>\n\nint main() {\n    // Implement solution here\n    return 0;\n}`);
    setCopiedLabCode(true);
    setTimeout(() => setCopiedLabCode(false), 2000);
  };

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
                      onClick={() => setSelectedLecture(slot)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${
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
                      onClick={() => setSelectedCourseProgress(course)}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all hover:-translate-y-0.5"
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
                    onClick={() => { if (ca.status === "graded") setSelectedAssignmentForRubric(ca); }}
                    className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border flex flex-col justify-between space-y-4 transition-all ${
                      ca.status === "graded" 
                        ? "border-emerald-200 dark:border-emerald-900/50 cursor-pointer hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-800"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
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

                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 leading-snug hover:text-blue-600 transition-colors">
                        {ca.title}
                      </h3>

                      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="size-3.5" />
                        <span>Due: {ca.dueDate} {ca.dueTime && `(${ca.dueTime})`}</span>
                      </div>

                      {ca.feedback && (
                        <div className="mt-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 text-xs text-slate-600 dark:text-slate-300">
                          <p className="font-semibold text-[11px] text-emerald-600 dark:text-emerald-400 mb-0.5 flex items-center gap-1.5">
                            <Award className="size-3.5" />
                            Grade: {ca.obtainedMarks} / {ca.maxMarks} Marks
                            <span className="ml-auto text-[9px] uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 px-1.5 py-0.5 rounded">View Rubric</span>
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Max: {ca.maxMarks} pts
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isSubmitted) {
                            setSelectedAssignmentForSubmit(ca);
                            setGithubRepoUrl("");
                          }
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSubmitted
                            ? "bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700 bg-emerald-50! text-emerald-700! border-emerald-200! dark:bg-emerald-950/30! dark:text-emerald-400! dark:border-emerald-800/50!"
                            : "bg-slate-900 hover:bg-slate-800 text-white shadow-sm dark:bg-white dark:text-slate-900 hover:scale-[1.02] active:scale-[0.98]"
                        }`}
                      >
                        {isSubmitted ? (
                          <>
                            <CheckCircle2 className="size-3.5" />
                            <span>Submitted (Under Review)</span>
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
                  onClick={() => setSelectedLabSpace(lab)}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 hover:scale-[1.002] transition-all"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-black text-slate-900 dark:text-white px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 shrink-0">
                        {lab.courseCode} · Lab #{lab.labNumber}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                        {lab.title}
                      </h3>
                      {lab.status === "verified" && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                          {lab.grade || "Verified"}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                      <strong>Aim:</strong> {lab.experimentAim}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono mt-1">
                      <span className="flex items-center gap-1"><MapPin className="size-3"/> Venue: {lab.block} ({lab.room})</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="size-3"/> {lab.submissionDeadline}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleDownloadLab(e, lab)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer active:scale-95"
                    >
                      {downloadingLabs[lab.id] ? <Loader2 className="size-3.5 animate-spin" /> : <Download className="size-3.5" />}
                      <span>{downloadingLabs[lab.id] ? "Downloading..." : "Download Manual"}</span>
                    </button>
                    <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <ExternalLink className="size-3.5" />
                    </div>
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
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  Class Representative & Scribe-Verified Notes
                  {notesFilter && (
                     <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-[10px] inline-flex items-center gap-1">
                       Filtered: {notesFilter}
                       <button onClick={(e) => { e.stopPropagation(); setNotesFilter(null); }} className="hover:opacity-70 cursor-pointer"><X className="size-3"/></button>
                     </span>
                  )}
                </h2>
                <span className="text-xs text-slate-500">Peer verified within 24h</span>
              </div>
              <button 
                onClick={() => setIsAuthoringNote(true)}
                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm active:scale-95"
              >
                <PenTool className="size-3.5" />
                <span className="hidden sm:inline">Scribe Lecture Note</span>
                <span className="sm:hidden">Scribe</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(notesFilter ? notesList.filter(n => n.courseCode === notesFilter) : notesList).map((note) => (
                <div
                  key={note.id}
                  onClick={() => setSelectedNoteReader(note)}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between cursor-pointer hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 hover:scale-[1.01] transition-all"
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setToastMessage(`Downloaded ${note.courseCode}_L${note.lectureNumber}_Notes.pdf`);
                      }}
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

      {/* ── Slide-over Drawer for Lecture Details ── */}
      <AnimatePresence>
        {selectedLecture && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLecture(null)}
              className="fixed inset-0 bg-slate-950/20 dark:bg-slate-950/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-sm uppercase tracking-wider font-mono font-bold text-slate-900 dark:text-white">Lecture Details</h2>
                <button
                  onClick={() => setSelectedLecture(null)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="size-4 text-slate-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-3">
                    {selectedLecture.courseCode}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                    {selectedLecture.courseName}
                  </h3>
                  
                  {/* Topic / Unit Coverage Mock Display */}
                  <div className="mt-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-2">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                      {selectedLecture.courseCode === "CSE316" ? "Virtual Memory Paging & TLB Miss Handling" : 
                       selectedLecture.courseCode === "CSE325" ? "Vector Clocks, Lamport Timestamps" : 
                       selectedLecture.courseCode === "INT219" ? "SSR Streaming Architecture with Next.js" : 
                       "Current Week Topic Module"}
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 font-mono">
                      {selectedLecture.courseCode === "CSE316" ? "Unit 3: Memory Virtualization" : 
                       selectedLecture.courseCode === "CSE325" ? "Unit 2: Logical Time" : 
                       "Ongoing Syllabus Segment"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Instructor Info</h4>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      <UserCheck className="size-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedLecture.instructor}</p>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">Cabin: {selectedLecture.instructorCabin || "Not assigned"}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Venue & Time</h4>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <Clock className="size-4 shrink-0 text-slate-400" />
                      <span className="font-medium">{selectedLecture.startTime} - {selectedLecture.endTime}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <MapPin className="size-4 shrink-0 text-slate-400" />
                      <span className="font-medium">{selectedLecture.block}, {selectedLecture.room}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3 bg-slate-50 dark:bg-slate-900/50">
                <button
                  onClick={() => {
                    const blockMatch = selectedLecture.block.match(/\d+/);
                    const roomMatch = selectedLecture.room.match(/\d+/);
                    if (blockMatch && roomMatch) {
                      router.push(`/campus-locator?block=${blockMatch[0]}&room=${roomMatch[0]}`);
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors cursor-pointer shadow-sm active:scale-[0.98]"
                >
                  <Map className="size-4" />
                  Locate Room
                </button>
                
                <button
                  onClick={() => {
                    setActiveTab("notes");
                    setNotesFilter(selectedLecture.courseCode);
                    setSelectedLecture(null);
                  }}
                  className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer active:scale-[0.98]"
                >
                  <BookOpen className="size-4" />
                  View Course Notes
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Modal for Course Syllabus Roadmap ── */}
      <AnimatePresence>
        {selectedCourseProgress && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourseProgress(null)}
              className="fixed inset-0 bg-slate-950/20 dark:bg-slate-950/40 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]"
              >
                <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 shrink-0">
                  <div>
                    <span className="font-mono text-[10px] font-black text-slate-500 uppercase tracking-wider">
                      {selectedCourseProgress.courseCode}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mt-0.5">
                      Course Syllabus Roadmap
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedCourseProgress(null)}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <X className="size-5 text-slate-500" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto">
                  <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-5 space-y-7 pb-4">
                    {[1, 2, 3, 4, 5, 6].map((unit) => {
                      const isCompleted = unit < selectedCourseProgress.currentUnit;
                      const isInProgress = unit === selectedCourseProgress.currentUnit;
                      const isUpcoming = unit > selectedCourseProgress.currentUnit;
                      
                      // Highlight mid-term between unit 3 and 4
                      const showMidTermBoundary = unit === 3;

                      return (
                        <React.Fragment key={unit}>
                          <div className="relative pl-6">
                            {/* Roadmap Node */}
                            <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-2 bg-white dark:bg-slate-900 flex items-center justify-center ${
                              isCompleted ? "border-emerald-500" :
                              isInProgress ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30" :
                              "border-slate-300 dark:border-slate-700"
                            }`}>
                              {isCompleted && <Check className="size-3 text-emerald-500" />}
                              {isInProgress && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 bg-white dark:bg-slate-900">
                              <div>
                                <h4 className={`text-sm font-bold ${isInProgress ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
                                  Unit {unit}: {["Foundations", "Core Concepts", "Advanced Mechanics", "Architecture", "Systems Integration", "Practical Applications"][unit - 1]}
                                </h4>
                                <p className="text-xs text-slate-500 mt-1">
                                  {isInProgress ? "Currently covering in lectures & labs" :
                                   isCompleted ? "Assessed in previous evaluations" :
                                   "Scheduled for upcoming weeks"}
                                </p>
                              </div>
                              <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0 w-fit ${
                                isCompleted ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900" :
                                isInProgress ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-100 dark:border-blue-900" :
                                "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                              }`}>
                                {isCompleted ? "Completed" : isInProgress ? "In Progress" : "Upcoming"}
                              </span>
                            </div>
                          </div>

                          {showMidTermBoundary && (
                            <div className="relative pl-6 py-2 -my-2">
                              <div className="absolute left-0 right-0 h-px bg-transparent border-t-2 border-dashed border-rose-300 dark:border-rose-800/60 top-1/2 -ml-[11px] -mr-6" />
                              <div className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-[10px] font-bold text-rose-600 dark:text-rose-400 font-mono tracking-wider">
                                <AlertTriangle className="size-3" />
                                MID-TERM EXAMINATIONS BOUNDARY
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Mock Toast Notification ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-2xl"
          >
            <CheckCircle2 className="size-5 text-emerald-400 dark:text-emerald-600" />
            <span className="text-sm font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Assignment Submission Modal ── */}
      <AnimatePresence>
        {selectedAssignmentForSubmit && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAssignmentForSubmit(null)}
              className="fixed inset-0 bg-slate-950/20 dark:bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="font-mono text-[10px] font-black text-slate-500 uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {selectedAssignmentForSubmit.courseCode} · {selectedAssignmentForSubmit.typeLabel}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mt-2">
                      Submit Solution
                    </h2>
                  </div>
                  <button onClick={() => setSelectedAssignmentForSubmit(null)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <X className="size-5 text-slate-500" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Deadline Countdown */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                      <Clock className="size-5 text-amber-600 dark:text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-amber-900 dark:text-amber-100">Submission ends in 3 Days, 12 Hrs</p>
                      <p className="text-xs text-amber-700 dark:text-amber-400">Due exactly on {selectedAssignmentForSubmit.dueDate} {selectedAssignmentForSubmit.dueTime && `at ${selectedAssignmentForSubmit.dueTime}`}</p>
                    </div>
                  </div>

                  {/* Drop zone */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Upload Documents (PDF, ZIP, DOCX)</label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                      <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        <UploadCloud className="size-6" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Drag & drop files here</p>
                        <p className="text-xs text-slate-500">or click to browse from device</p>
                      </div>
                    </div>
                  </div>

                  {/* Github Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <GithubIcon className="size-3.5" />
                      Repository URL (Optional)
                    </label>
                    <input 
                      type="url" 
                      placeholder="https://github.com/username/project" 
                      value={githubRepoUrl}
                      onChange={(e) => setGithubRepoUrl(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3">
                  <button onClick={() => setSelectedAssignmentForSubmit(null)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      handleToggleSubmit(selectedAssignmentForSubmit.id);
                      setSelectedAssignmentForSubmit(null);
                      setToastMessage("Assignment Submitted Successfully!");
                    }} 
                    className="px-6 py-2.5 rounded-xl text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-white transition-colors cursor-pointer shadow-md flex items-center gap-2"
                  >
                    Confirm Submit
                    <CheckCircle2 className="size-4" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Faculty Rubric Modal ── */}
      <AnimatePresence>
        {selectedAssignmentForRubric && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAssignmentForRubric(null)}
              className="fixed inset-0 bg-slate-950/20 dark:bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-emerald-50/50 dark:bg-emerald-950/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                      <Award className="size-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-mono">Evaluated By Faculty</p>
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-0.5">
                        {"24/25"} <span className="text-sm text-slate-500 font-sans font-medium">Marks</span>
                      </h2>
                    </div>
                  </div>
                  <button onClick={() => setSelectedAssignmentForRubric(null)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer self-start">
                    <X className="size-5 text-slate-500" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Feedback block */}
                  {selectedAssignmentForRubric.feedback && (
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 relative">
                      <Info className="size-4 text-blue-500 absolute top-4 left-4" />
                      <div className="pl-6">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Instructor Feedback</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 italic">"{selectedAssignmentForRubric.feedback}"</p>
                      </div>
                    </div>
                  )}

                  {/* Rubric Breakdown */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">
                      Rubric Breakdown
                    </h4>
                    <div className="space-y-3">
                      {[
                        { crit: "Logic & Algorithm Design", score: 9, max: 10, perf: "Excellent" },
                        { crit: "Code Quality & Documentation", score: 5, max: 5, perf: "Flawless" },
                        { crit: "Edge Cases & Validation", score: 5, max: 5, perf: "Flawless" },
                        { crit: "Viva / Execution Presentation", score: 5, max: 5, perf: "Flawless" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{item.crit}</span>
                            <span className="font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
                              {item.score}/{item.max}
                              <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">{item.perf}</span>
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all ${item.score === item.max ? "bg-emerald-500" : "bg-blue-500"}`} 
                              style={{ width: `${(item.score / item.max) * 100}%` }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Lab Workspace Modal ── */}
      <AnimatePresence>
        {selectedLabSpace && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLabSpace(null)}
              className="fixed inset-0 bg-slate-950/20 dark:bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]"
              >
                <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="font-mono text-[10px] font-black text-slate-500 uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded inline-flex items-center gap-1.5">
                      <Beaker className="size-3" />
                      Lab Workspace · {selectedLabSpace.courseCode} · Ex #{selectedLabSpace.labNumber}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mt-2 pr-8">
                      {selectedLabSpace.title}
                    </h2>
                  </div>
                  <button onClick={() => setSelectedLabSpace(null)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer self-start">
                    <X className="size-5 text-slate-500" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-8">
                  {/* Aim */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Experiment Aim</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-l-2 border-blue-500 pl-4 py-1">
                      {selectedLabSpace.experimentAim}
                    </p>
                  </div>

                  {/* Starter Code */}
                  <div className="space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Starter Snippet</h4>
                      <button 
                        onClick={copyLabCode}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                      >
                        {copiedLabCode ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                        {copiedLabCode ? "Copied!" : "Copy Code"}
                      </button>
                    </div>
                    <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                      <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-800 bg-slate-900/50">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="ml-2 text-[10px] font-mono text-slate-500">main.c</span>
                      </div>
                      <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                        <code className="text-purple-400">#include</code> <span className="text-emerald-300">&lt;stdio.h&gt;</span>{"\n"}
                        <code className="text-purple-400">#include</code> <span className="text-emerald-300">&lt;pthread.h&gt;</span>{"\n\n"}
                        <span className="text-slate-500 italic">// Implement dead-lock free logic here</span>{"\n"}
                        <code className="text-blue-400">int</code> <span className="text-amber-200">main</span>() {"{"}{"\n"}
                        {"    "}<span className="text-slate-500 italic">// Initialize mutexes/semaphores</span>{"\n"}
                        {"    "}<code className="text-purple-400">return</code> <span className="text-rose-300">0</span>;{"\n"}
                        {"}"}
                      </pre>
                    </div>
                  </div>

                  {/* Submission Checklist */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Submission Checklist</h4>
                    <div className="space-y-2">
                      {["Source code complies without warnings (gcc -Wall).", "Output screenshots attached.", "GitHub repository linked.", "Proper variable naming & comments included."].map((req, i) => (
                        <label key={i} className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 cursor-pointer group">
                          <div className="pt-0.5">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-slate-900 dark:focus:ring-white transition-colors cursor-pointer" />
                          </div>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            {req}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between gap-3">
                  <div className="text-xs text-slate-500 flex flex-col justify-center">
                    <span className="font-bold">Deadline</span>
                    <span>{selectedLabSpace.submissionDeadline}</span>
                  </div>
                  <button 
                    onClick={() => {
                        setSelectedLabSpace(null);
                        setToastMessage("Project Workspace Saved");
                    }} 
                    className="px-6 py-2.5 rounded-xl text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer shadow-md flex items-center gap-2"
                  >
                    Save Progress
                    <CheckCircle2 className="size-4" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Lecture Note Reader Modal ── */}
      <AnimatePresence>
        {selectedNoteReader && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNoteReader(null)}
              className="fixed inset-0 bg-slate-950/20 dark:bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]"
              >
                 <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <div>
                    <span className="font-mono text-[10px] font-black text-slate-500 uppercase tracking-wider bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {selectedNoteReader.courseCode} · Lecture {selectedNoteReader.lectureNumber}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mt-2">
                       {selectedNoteReader.topicCovered}
                    </h2>
                  </div>
                  <button onClick={() => setSelectedNoteReader(null)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer self-start">
                    <X className="size-5 text-slate-500" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-8">
                   {/* Core Takeaways */}
                   <div className="space-y-3">
                     <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                       <CheckCircle2 className="size-4 text-emerald-500" />
                       Core Takeaways
                     </h4>
                     <ul className="space-y-2">
                       <li className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                         <span className="text-emerald-500 font-bold mt-0.5">•</span>
                         Understood the trade-offs between different caching strategies.
                       </li>
                       <li className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                         <span className="text-emerald-500 font-bold mt-0.5">•</span>
                         Visualized the exact control flow for the algorithm.
                       </li>
                       <li className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                         <span className="text-emerald-500 font-bold mt-0.5">•</span>
                         Identified edge cases discussed by the professor during QA.
                       </li>
                     </ul>
                   </div>

                   {/* Simulated Whiteboard */}
                   <div className="space-y-3">
                     <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                       <Video className="size-4 text-blue-500" />
                       Whiteboard Snapshots
                     </h4>
                     <div className="h-48 w-full rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center relative overflow-hidden group">
                       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 dark:opacity-5" />
                       <div className="text-center z-10">
                         <Image className="size-8 text-slate-400 mx-auto mb-2" />
                         <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Slide 1 of 4</p>
                       </div>
                       <button className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-slate-900 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <ChevronRight className="size-4 rotate-180" />
                       </button>
                       <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-slate-900 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <ChevronRight className="size-4" />
                       </button>
                     </div>
                   </div>
                </div>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3">
                   <button 
                    onClick={() => {
                      setCaughtUpNotes(p => ({ ...p, [selectedNoteReader.id]: true }));
                      setSelectedNoteReader(null);
                      setToastMessage("Marked as Caught Up!");
                    }}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-md flex items-center gap-2 ${
                      caughtUpNotes[selectedNoteReader.id]
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}
                   >
                     {caughtUpNotes[selectedNoteReader.id] ? <CheckCircle2 className="size-4" /> : <ArrowRight className="size-4" />}
                     {caughtUpNotes[selectedNoteReader.id] ? "Caught Up" : "Mark as Caught Up"}
                   </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Scribe Note Modal ── */}
      <AnimatePresence>
        {isAuthoringNote && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAuthoringNote(false)}
              className="fixed inset-0 bg-slate-950/20 dark:bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      <PenTool className="size-4" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      Scribe a Lecture Note
                    </h2>
                  </div>
                  <button onClick={() => setIsAuthoringNote(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <X className="size-5 text-slate-500" />
                  </button>
                </div>

                <div className="p-6 space-y-5">
                   <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl flex items-start gap-3">
                     <Lock className="size-4 text-amber-600 mt-0.5 shrink-0" />
                     <p className="text-xs text-amber-800 dark:text-amber-400 leading-snug">
                       <strong>Role Gate:</strong> You must be the assigned Course Scribe or CR to officially publish a note to the class board.
                     </p>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1.5">
                       <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Course Subject</label>
                       <select className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500">
                         <option>CSE316 - Operating Systems</option>
                         <option>CSE325 - Distributed Systems</option>
                         <option>INT219 - Front-End Web</option>
                       </select>
                     </div>
                     <div className="space-y-1.5">
                       <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Lecture No.</label>
                       <input type="number" placeholder="e.g. 15" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500" />
                     </div>
                   </div>

                   <div className="space-y-1.5">
                     <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Topic Covered</label>
                     <input type="text" placeholder="e.g. Semaphores and Deadlocks" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500" />
                   </div>

                   <div className="space-y-1.5">
                     <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Upload PDF Note & Whiteboard Snaps</label>
                     <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                        <UploadCloud className="size-5 text-slate-400" />
                        <p className="text-xs text-slate-500 font-bold">Drag files here</p>
                     </div>
                   </div>
                </div>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3">
                  <button onClick={() => setIsAuthoringNote(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                        const newNote: ClassLectureNote = {
                          id: `note-${Date.now()}`,
                          courseCode: "CSE316",
                          courseName: "Operating Systems",
                          lectureNumber: 19,
                          lectureDate: "Sep 12, 2026",
                          periodTime: "Unknown",
                          topicCovered: "New Scribed Topic",
                          associatedUnit: "Current",
                          isMissedClass: false,
                          verifiedBy: {
                            name: "You (Scribe)",
                            role: "Course Scribe" as ScribeRole,
                            section: "K23AB",
                            timestamp: "Just now",
                          },
                          downloadUrl: "#",
                          summary: "Freshly scribed notes on the latest algorithms.",
                          tags: ["New", "Update"],
                          fileSize: "1.2 MB",
                        };
                        setNotesList([newNote, ...notesList]);
                        setIsAuthoringNote(false);
                        setToastMessage("Note published successfully!");
                    }}
                    className="px-6 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer shadow-md flex items-center gap-2"
                  >
                    Publish Note
                    <Send className="size-4" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
