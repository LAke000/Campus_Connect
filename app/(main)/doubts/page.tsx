"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import {
  FacultyCabin,
  SeniorMentor,
  OfflineAppointment,
  CreateOfflineAppointmentPayload,
} from "@/types/doubts";
import {
  getFacultyCabins,
  getSeniorMentors,
  toggleFacultyCabinStatus,
  createOfflineAppointment,
} from "@/lib/doubts";
import {
  DoorOpen,
  Users,
  GraduationCap,
  Sparkles,
  MapPin,
  Compass,
  Video,
  Clock,
  Footprints,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ArrowRight,
  Search,
  Star,
  UserCheck,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  X,
  ChevronRight,
  User,
  Building2,
  ShieldCheck,
  Activity,
  Layers,
} from "lucide-react";

const supabase = createClient();

type DoubtTab = "cabins" | "mentors";

// Sample fallback faculty cabins (tailored to LPU Block 33 & 34)
const SAMPLE_FACULTY_CABINS: FacultyCabin[] = [
  {
    id: "fc-1",
    faculty_id: "prof-arvind-sharma",
    department: "Computer Science & Engineering",
    cabin_location: "Cabin #304 · 3rd Floor",
    campus_block: "Block 34",
    is_active: true,
    active_until: "05:30 PM",
    current_queue_count: 2,
    faculty: {
      full_name: "Dr. Arvind Sharma",
      email: "arvind.sharma@lpu.co.in",
      avatar_url: null,
    },
  },
  {
    id: "fc-2",
    faculty_id: "prof-meenakshi-sundaram",
    department: "Computer Science (AI & ML)",
    cabin_location: "Cabin #412 · 4th Floor",
    campus_block: "Block 34",
    is_active: true,
    active_until: "06:00 PM",
    current_queue_count: 1,
    faculty: {
      full_name: "Dr. Meenakshi Sundaram",
      email: "meenakshi.s@lpu.co.in",
      avatar_url: null,
    },
  },
  {
    id: "fc-3",
    faculty_id: "prof-rajesh-verma",
    department: "Computer Science & Engineering",
    cabin_location: "Cabin #218 · 2nd Floor",
    campus_block: "Block 33",
    is_active: true,
    active_until: "04:30 PM",
    current_queue_count: 0,
    faculty: {
      full_name: "Prof. Rajesh K. Verma",
      email: "rajesh.verma@lpu.co.in",
      avatar_url: null,
    },
  },
  {
    id: "fc-4",
    faculty_id: "prof-priya-nair",
    department: "Computer Applications & IT",
    cabin_location: "Cabin #105 · 1st Floor",
    campus_block: "Block 38",
    is_active: false,
    active_until: "03:00 PM",
    current_queue_count: 0,
    faculty: {
      full_name: "Dr. Priya Nair",
      email: "priya.nair@lpu.co.in",
      avatar_url: null,
    },
  },
];

// Sample fallback senior mentors
const SAMPLE_SENIOR_MENTORS: SeniorMentor[] = [
  {
    id: "sm-1",
    student_id: "student-rohan",
    department: "Computer Science & Engineering",
    specialization: "Full Stack & System Design",
    academic_year: 4,
    expertise_tags: ["Next.js", "System Design", "PostgreSQL", "Docker"],
    rating: 4.9,
    preferred_zone: "Block 34 Nescafe Plaza",
    is_available: true,
    student: {
      full_name: "Rohan Malhotra",
      email: "rohan.m@lpu.in",
      avatar_url: null,
    },
  },
  {
    id: "sm-2",
    student_id: "student-ananya",
    department: "Computer Science (AI/ML)",
    specialization: "AI / Deep Learning",
    academic_year: 3,
    expertise_tags: ["PyTorch", "Computer Vision", "NLP", "Python"],
    rating: 4.8,
    preferred_zone: "Central Library 3rd Floor",
    is_available: true,
    student: {
      full_name: "Ananya Gupta",
      email: "ananya.g@lpu.in",
      avatar_url: null,
    },
  },
  {
    id: "sm-3",
    student_id: "student-kabir",
    department: "Computer Science & Engineering",
    specialization: "DSA & Algorithms",
    academic_year: 4,
    expertise_tags: ["Dynamic Programming", "Graphs", "LeetCode Hard", "C++"],
    rating: 4.95,
    preferred_zone: "UniMall Open Terrace",
    is_available: true,
    student: {
      full_name: "Kabir Mehta",
      email: "kabir.mehta@lpu.in",
      avatar_url: null,
    },
  },
];

export default function DoubtsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DoubtTab>("cabins");
  const [facultyCabins, setFacultyCabins] = useState<FacultyCabin[]>([]);
  const [seniorMentors, setSeniorMentors] = useState<SeniorMentor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // User session and role state
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>("student");
  const [userDept, setUserDept] = useState<string>("Computer Science");
  const [userSpec, setUserSpec] = useState<string>("Full Stack");

  // Faculty Duty Bar State (if currentUser.role === 'faculty')
  const [isCabinActive, setIsCabinActive] = useState<boolean>(true);
  const [facultyQueueCount, setFacultyQueueCount] = useState<number>(2);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<boolean>(false);

  // Video Connect Trigger state
  const [connectingId, setConnectingId] = useState<string | null>(null);

  // Walk-In Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [selectedTarget, setSelectedTarget] = useState<{
    hostId: string;
    hostName: string;
    type: "faculty_cabin" | "mentor_meetup";
    location: string;
    department: string;
    queueCount: number;
  } | null>(null);
  const [bookingTopic, setBookingTopic] = useState<string>("");
  const [expectedArrival, setExpectedArrival] = useState<string>("Next 15 mins");
  const [isSubmittingBooking, setIsSubmittingBooking] = useState<boolean>(false);
  const [bookingSuccessData, setBookingSuccessData] = useState<OfflineAppointment | null>(null);

  // Load User and Doubt Datasets
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      let dept = "Computer Science";
      let spec = "Full Stack";
      let role = "student";

      if (session?.user) {
        setCurrentUser(session.user);
        role = session.user.user_metadata?.role || "student";
        setUserRole(role);

        if (session.user.user_metadata?.department) {
          dept = session.user.user_metadata.department;
        } else {
          const { data: userProfile } = await supabase
            .from("profiles")
            .select("department, specialization, role")
            .eq("id", session.user.id)
            .maybeSingle();

          if (userProfile) {
            if (userProfile.department) dept = userProfile.department;
            if (userProfile.specialization) spec = userProfile.specialization;
            if (userProfile.role) role = userProfile.role;
            setUserRole(role);
          }
        }
        setUserDept(dept);
        setUserSpec(spec);
      }

      // 1. Fetch Faculty Cabins
      const { data: cabinsData } = await getFacultyCabins(dept);
      if (cabinsData && cabinsData.length > 0) {
        setFacultyCabins(cabinsData);
      } else {
        setFacultyCabins(SAMPLE_FACULTY_CABINS);
      }

      // 2. Fetch Senior Mentors
      const { data: mentorsData } = await getSeniorMentors(dept, spec);
      if (mentorsData && mentorsData.length > 0) {
        setSeniorMentors(mentorsData);
      } else {
        setSeniorMentors(SAMPLE_SENIOR_MENTORS);
      }
    } catch (err) {
      console.error("Error loading doubts page data:", err);
      setFacultyCabins(SAMPLE_FACULTY_CABINS);
      setSeniorMentors(SAMPLE_SENIOR_MENTORS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Faculty Status Toggle (Duty Bar)
  const handleToggleCabinStatus = async () => {
    if (!currentUser || isUpdatingStatus) return;
    setIsUpdatingStatus(true);
    try {
      const newStatus = !isCabinActive;
      setIsCabinActive(newStatus);
      await toggleFacultyCabinStatus(currentUser.id, newStatus);
    } catch (err) {
      console.error("Error toggling cabin status:", err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Step through queue
  const handleNextStudentInQueue = () => {
    if (facultyQueueCount > 0) {
      setFacultyQueueCount((prev) => Math.max(prev - 1, 0));
    }
  };

  // Handle Live Video Call creation (Existing Fallback)
  const handleLiveConnect = async (hostId: string, hostName: string, dept: string) => {
    if (connectingId) return;
    setConnectingId(hostId);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (session?.access_token) {
        headers["Authorization"] = `Bearer ${session.access_token}`;
      }

      const res = await fetch("/api/rooms/create", {
        method: "POST",
        headers,
        body: JSON.stringify({
          hostId,
          title: `Doubt Session with ${hostName}`,
          department: dept || "Computer Science",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create doubt room.");
      }

      if (data.redirectUrl) {
        router.push(data.redirectUrl);
      }
    } catch (err: any) {
      console.error("Error initiating doubt room:", err);
      alert(err?.message || "Failed to initiate live doubt session. Please try again.");
    } finally {
      setConnectingId(null);
    }
  };

  // Open Walk-In / Meetup Booking Modal
  const openBookingModal = (
    hostId: string,
    hostName: string,
    type: "faculty_cabin" | "mentor_meetup",
    location: string,
    department: string,
    queueCount: number
  ) => {
    setSelectedTarget({ hostId, hostName, type, location, department, queueCount });
    setBookingTopic("");
    setExpectedArrival("Next 15 mins");
    setBookingSuccessData(null);
    setBookingModalOpen(true);
  };

  // Submit Offline Appointment Booking
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTarget || !bookingTopic.trim()) return;

    setIsSubmittingBooking(true);
    try {
      const fullTopic = `[${expectedArrival}] ${bookingTopic.trim()}`;
      
      const payload: CreateOfflineAppointmentPayload = {
        requester_id: currentUser?.id || "guest-student",
        host_id: selectedTarget.hostId,
        appointment_type: selectedTarget.type,
        topic: fullTopic,
        meetup_location: selectedTarget.location,
        status: "queued",
      };

      const { data, error } = await createOfflineAppointment(payload);
      if (error || !data) {
        throw new Error(error || "Failed to book slot");
      }

      setBookingSuccessData(data);

      // Refresh cabin queue count locally
      if (selectedTarget.type === "faculty_cabin") {
        setFacultyCabins((prev) =>
          prev.map((c) =>
            c.faculty_id === selectedTarget.hostId
              ? { ...c, current_queue_count: c.current_queue_count + 1 }
              : c
          )
        );
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      alert(err?.message || "Could not complete booking. Please try again.");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // Filter lists based on search query
  const filteredCabins = useMemo(() => {
    if (!searchQuery.trim()) return facultyCabins;
    const q = searchQuery.toLowerCase().trim();
    return facultyCabins.filter(
      (c) =>
        c.faculty.full_name.toLowerCase().includes(q) ||
        c.cabin_location.toLowerCase().includes(q) ||
        c.campus_block.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q)
    );
  }, [facultyCabins, searchQuery]);

  const filteredMentors = useMemo(() => {
    if (!searchQuery.trim()) return seniorMentors;
    const q = searchQuery.toLowerCase().trim();
    return seniorMentors.filter(
      (m) =>
        m.student.full_name.toLowerCase().includes(q) ||
        m.specialization.toLowerCase().includes(q) ||
        m.preferred_zone.toLowerCase().includes(q) ||
        m.expertise_tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [seniorMentors, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F9F9F8] dark:bg-[#141415] text-[#1C1D1F] dark:text-[#F6F6F4]">
      <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
        {/* ── 1. Page Header ───────────────────────────────── */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-neutral-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Live Doubt Clearing
              </h1>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                In-Person & Online
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1">
              Connect with departmental faculty and verified senior peers for offline 1-on-1 walkthroughs.
            </p>
          </div>
        </header>

        {/* ── 2. Role-Based Faculty Duty Bar ───────────────── */}
        {userRole === "faculty" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-sm border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <DoorOpen className="size-5 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-tight">My Cabin Office Hours</h3>
                  <span
                    className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      isCabinActive
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        isCabinActive ? "bg-emerald-400 animate-pulse" : "bg-slate-400"
                      }`}
                    />
                    {isCabinActive ? "Available in Cabin" : "Away / In Meeting"}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 font-mono">
                  Block 34 · Cabin #304 · Active until 05:30 PM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Current Queue Live Pill */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs font-mono">
                <Users className="size-3.5 text-blue-400" />
                <span>
                  Waiting: <strong>{facultyQueueCount}</strong> students
                </span>
              </div>

              {/* Step Next Student Action */}
              {facultyQueueCount > 0 && (
                <button
                  type="button"
                  onClick={handleNextStudentInQueue}
                  className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Next Student
                </button>
              )}

              {/* Toggle Duty Switch */}
              <button
                type="button"
                onClick={handleToggleCabinStatus}
                disabled={isUpdatingStatus}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-slate-950 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
              >
                {isCabinActive ? (
                  <>
                    <ToggleRight className="size-4 text-emerald-600" />
                    <span>Set Away</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="size-4 text-slate-400" />
                    <span>Go Active</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 3. Tab Switcher Bar with Sliding layoutId Pill ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Segmented Pill Switcher */}
          <div className="inline-flex items-center rounded-xl bg-slate-100 dark:bg-neutral-900 p-1 border border-slate-200/80 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => setActiveTab("cabins")}
              className={`relative px-4 py-2 text-xs font-bold transition-colors cursor-pointer rounded-lg ${
                activeTab === "cabins"
                  ? "text-slate-950 dark:text-white"
                  : "text-slate-500 hover:text-slate-800 dark:text-neutral-400"
              }`}
            >
              {activeTab === "cabins" && (
                <motion.div
                  layoutId="activeDoubtTab"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-lg shadow-xs"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <DoorOpen className="size-3.5" />
                Active Faculty Cabins ({facultyCabins.length})
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("mentors")}
              className={`relative px-4 py-2 text-xs font-bold transition-colors cursor-pointer rounded-lg ${
                activeTab === "mentors"
                  ? "text-slate-950 dark:text-white"
                  : "text-slate-500 hover:text-slate-800 dark:text-neutral-400"
              }`}
            >
              {activeTab === "mentors" && (
                <motion.div
                  layoutId="activeDoubtTab"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-lg shadow-xs"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <ShieldCheck className="size-3.5" />
                Expert Senior Guidance ({seniorMentors.length})
              </span>
            </button>
          </div>

          {/* Quick Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeTab === "cabins" ? "Professors or Cabins..." : "Mentors or Topics..."}`}
              className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 dark:focus:ring-white transition-all shadow-xs"
            />
          </div>
        </div>

        {/* ── 4. Main Tab Content (Cards Grid) ─────────────── */}
        <AnimatePresence mode="wait">
          {activeTab === "cabins" ? (
            /* ── TAB 1: Active Faculty Cabins View ─────────── */
            <motion.div
              key="cabins-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-44 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 p-5 animate-pulse"
                    />
                  ))}
                </div>
              ) : filteredCabins.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {filteredCabins.map((cabin, idx) => {
                    const isAvailable = cabin.is_active;

                    return (
                      <motion.div
                        key={cabin.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.25,
                          delay: idx * 0.05,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        whileHover={{ y: -2 }}
                        className="flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-neutral-700 transition-all group"
                      >
                        {/* Card Top: Professor Info & Status */}
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {cabin.faculty.full_name}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                                {cabin.department}
                              </p>
                            </div>

                            {/* Status Indicator */}
                            <span
                              className={`inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                                isAvailable
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                                  : "bg-slate-100 text-slate-500 border-slate-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700"
                              }`}
                            >
                              <span
                                className={`size-1.5 rounded-full ${
                                  isAvailable ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                                }`}
                              />
                              {isAvailable ? "AVAILABLE IN CABIN" : "AWAY"}
                            </span>
                          </div>

                          {/* Location Badge & Hours */}
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <span className="font-mono text-xs bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 font-semibold px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-neutral-700 flex items-center gap-1.5">
                              <DoorOpen className="size-3 text-blue-600 dark:text-blue-400" />
                              {cabin.cabin_location} ({cabin.campus_block})
                            </span>

                            {cabin.active_until && (
                              <span className="font-mono text-[11px] text-slate-500 dark:text-neutral-400 flex items-center gap-1">
                                <Clock className="size-3 text-slate-400" />
                                Until {cabin.active_until}
                              </span>
                            )}
                          </div>

                          {/* Live Waiting Queue Counter */}
                          <div className="flex items-center justify-between text-xs pt-1">
                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-neutral-400">
                              <Users className="size-3.5 text-slate-400" />
                              <span>
                                Queue:{" "}
                                <strong className="text-slate-900 dark:text-white font-semibold">
                                  {cabin.current_queue_count}{" "}
                                  {cabin.current_queue_count === 1 ? "student" : "students"}
                                </strong>
                              </span>
                            </div>

                            <span className="font-mono text-[10px] text-slate-400">
                              Est. wait: ~{cabin.current_queue_count * 8} mins
                            </span>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="pt-4 mt-3 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                          <div className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-neutral-400">
                            <MapPin className="size-3.5 text-slate-400" />
                            <span className="hidden sm:inline">{cabin.campus_block}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Live Video Connect Fallback */}
                            <button
                              type="button"
                              onClick={() =>
                                handleLiveConnect(
                                  cabin.faculty_id,
                                  cabin.faculty.full_name,
                                  cabin.department
                                )
                              }
                              disabled={connectingId === cabin.faculty_id}
                              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors shadow-sm active:scale-[0.98] cursor-pointer disabled:opacity-50"
                              title="Instant Online Video Doubt Room"
                            >
                              <Video className="size-3.5 text-slate-500 dark:text-neutral-400" />
                              <span className="hidden sm:inline">Online</span>
                            </button>

                            {/* Primary Book Walk-In Slot Button */}
                            <button
                              type="button"
                              onClick={() =>
                                openBookingModal(
                                  cabin.faculty_id,
                                  cabin.faculty.full_name,
                                  "faculty_cabin",
                                  `${cabin.cabin_location}, ${cabin.campus_block}`,
                                  cabin.department,
                                  cabin.current_queue_count
                                )
                              }
                              disabled={!isAvailable}
                              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-slate-950 dark:bg-white hover:bg-slate-800 dark:hover:bg-neutral-200 text-white dark:text-slate-900 transition-all shadow-sm active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <span>Book Walk-In Slot</span>
                              <ChevronRight className="size-3.5 text-slate-400 dark:text-slate-500" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl border border-dashed border-slate-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 text-center">
                  <DoorOpen className="size-8 text-slate-400 mb-2" />
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    No faculty cabins match your search
                  </p>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
                    Try clearing search queries or check back during scheduled cabin office hours.
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            /* ── TAB 2: Expert Senior Guidance View ────────── */
            <motion.div
              key="mentors-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-48 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 p-5 animate-pulse"
                    />
                  ))}
                </div>
              ) : filteredMentors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {filteredMentors.map((mentor, idx) => (
                    <motion.div
                      key={mentor.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: idx * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{ y: -2 }}
                      className="flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-neutral-700 transition-all group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight transition-colors">
                                {mentor.student.full_name}
                              </h3>
                              <CheckCircle2 className="size-4 text-sky-600 dark:text-sky-500 shrink-0" />
                            </div>
                            <p className="text-xs text-slate-500 dark:text-neutral-400 font-medium mt-0.5">
                              Year {mentor.academic_year} · {mentor.department}
                            </p>
                          </div>

                          {/* Star Rating Badge */}
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-xs font-mono font-medium text-slate-700 dark:text-neutral-300 shadow-sm">
                            <Star className="size-3 text-amber-500 fill-amber-500" />
                            {mentor.rating.toFixed(1)}
                          </span>
                        </div>

                        {/* Specialization & Meetup Zone */}
                        <div className="space-y-1.5 text-xs text-slate-600 dark:text-neutral-400">
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {mentor.specialization}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-neutral-400 font-medium">
                            <MapPin className="size-3.5 text-slate-400 shrink-0" />
                            <span>Zone: {mentor.preferred_zone}</span>
                          </div>
                        </div>

                        {/* Expertise Tag Chips */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {mentor.expertise_tags.map((tag, tagIdx) => (
                            <span
                              key={tagIdx}
                              className="bg-slate-100/80 dark:bg-neutral-800/80 text-slate-600 dark:text-neutral-400 text-[11px] font-medium px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-neutral-700/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-4 mt-3 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                        {/* Live Online Video Connect */}
                        <button
                          type="button"
                          onClick={() =>
                            handleLiveConnect(
                              mentor.student_id,
                              mentor.student.full_name,
                              mentor.department
                            )
                          }
                          disabled={connectingId === mentor.student_id}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 text-xs font-medium transition-all shadow-sm active:scale-[0.98] cursor-pointer disabled:opacity-50"
                        >
                          <Video className="size-3.5 text-slate-500 dark:text-neutral-400" />
                          <span>Video</span>
                        </button>

                        {/* Request In-Person Meetup */}
                        <button
                          type="button"
                          onClick={() =>
                            openBookingModal(
                              mentor.student_id,
                              mentor.student.full_name,
                              "mentor_meetup",
                              mentor.preferred_zone,
                              mentor.department,
                              0
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-950 dark:bg-white hover:bg-slate-800 dark:hover:bg-neutral-200 text-white dark:text-slate-900 text-xs font-medium transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                        >
                          <span>Request 1-on-1</span>
                          <ChevronRight className="size-3.5 text-slate-400 dark:text-slate-500" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl border border-dashed border-slate-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 text-center">
                  <Sparkles className="size-8 text-slate-400 mb-2" />
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    No senior mentors currently listed
                  </p>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
                    Verified senior mentors appear when available for walk-in meetups.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 5. Walk-In & Meetup Booking Modal ────────────── */}
        <AnimatePresence>
          {bookingModalOpen && selectedTarget && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setBookingModalOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                className="relative w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-6 shadow-2xl z-10 space-y-5"
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                      {selectedTarget.type === "faculty_cabin"
                        ? "Book Walk-In Cabin Slot"
                        : "Request 1-on-1 Guidance"}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                      <span className="font-semibold text-slate-700 dark:text-neutral-300">Target:</span> {selectedTarget.hostName}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="size-3 text-slate-400" />
                      {selectedTarget.location}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {bookingSuccessData ? (
                  /* Success Confirmation Screen */
                  <div className="py-4 text-center space-y-4">
                    <div className="size-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="size-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        Digital Queue Pass Issued!
                      </h4>
                      <div className="mt-3 inline-block px-5 py-2.5 rounded-xl bg-slate-950 dark:bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] transform transition-transform hover:scale-105">
                        <span className="font-mono text-2xl font-black text-white dark:text-slate-950 tracking-tight">
                          #{bookingSuccessData.queue_number.toString().padStart(2, '0')}
                        </span>
                      </div>
                      <div className="mt-4 text-xs text-slate-600 dark:text-neutral-400 space-y-1">
                        <p><strong>Host:</strong> {selectedTarget.hostName}</p>
                        <p><strong>Meetup:</strong> {selectedTarget.location}</p>
                        <p><strong>Est. Wait:</strong> ~{selectedTarget.queueCount * 6} mins</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setBookingModalOpen(false)}
                      className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
                    >
                      <CheckCircle2 className="size-3.5" />
                      Done & Close
                    </button>
                  </div>
                ) : (
                  /* Form Booking View */
                  <form onSubmit={handleSubmitBooking} className="space-y-5 flex flex-col">
                    {/* Telemetry info */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-800/60 border border-slate-100 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-neutral-300">
                      <span>
                        Current Queue: <strong>{selectedTarget.queueCount} ahead</strong>
                      </span>
                      <span>
                        Est. Wait: <strong>~{selectedTarget.queueCount * 6} mins</strong>
                      </span>
                    </div>

                    {/* Topic Input */}
                    <div className="space-y-1.5 focus-within:text-slate-900 dark:focus-within:text-white">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-neutral-300 transition-colors">
                        <label>Query Scope / Subject (Required):</label>
                        <span className={`font-mono font-normal ${bookingTopic.length > 120 ? "text-rose-500" : "text-slate-400"}`}>
                          {bookingTopic.length}/120
                        </span>
                      </div>
                      <textarea
                        required
                        maxLength={120}
                        rows={3}
                        value={bookingTopic}
                        onChange={(e) => setBookingTopic(e.target.value)}
                        placeholder="Briefly describe your doubt (e.g., AVL tree rotation logic)..."
                        className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 dark:focus:ring-white transition-all shadow-xs resize-none"
                      />
                    </div>

                    {/* Expected Arrival Time Selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                        Expected Arrival:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Next 15 mins", "Next 30 mins", "Within 1 hour"].map((timeVal) => {
                          const isActive = expectedArrival === timeVal;
                          return (
                            <button
                              key={timeVal}
                              type="button"
                              onClick={() => setExpectedArrival(timeVal)}
                              className={`py-1.5 px-2 text-[11px] font-semibold rounded-lg border transition-colors ${
                                isActive
                                  ? "bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-900 shadow-xs"
                                  : "bg-white dark:bg-neutral-800 border-slate-200 dark:border-neutral-700 text-slate-600 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-800"
                              }`}
                            >
                              {timeVal}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-3 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-end gap-2 mt-auto">
                      <button
                        type="button"
                        onClick={() => setBookingModalOpen(false)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmittingBooking || !bookingTopic.trim() || bookingTopic.length > 120}
                        className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-slate-900 text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-slate-900/10 dark:shadow-white/10 flex items-center gap-1.5"
                      >
                        {isSubmittingBooking ? (
                          <>
                            <RefreshCw className="size-3.5 animate-spin" />
                            <span>Issuing Pass...</span>
                          </>
                        ) : (
                          <span>Confirm Walk-In Request</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}



