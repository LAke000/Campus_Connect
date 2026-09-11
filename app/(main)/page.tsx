"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DoubtSessionCard } from "@/components/DoubtSessionCard";
import {
  Video,
  Flame,
  FileText,
  DoorOpen,
  ArrowRight,
  BrainCircuit,
  Clock,
  BookOpen,
  LogOut,
  Video as VideoIcon,
  BrainCircuit as BrainCircuitIcon,
  VideoOff,
  Monitor,
} from "lucide-react";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Student Dashboard Components
const StudentQuickActions = () => (
  <div className="grid grid-cols-2 gap-4">
    <Button className="bg-slate-950 text-white hover:bg-slate-800 font-semibold shadow-sm h-12">
      <Video className="mr-2 h-4 w-4" />
      Join Active Room
    </Button>
    <Button
      variant="outline"
      className="border-slate-200 bg-slate-50 text-slate-900 hover:bg-slate-100 font-semibold h-12"
    >
      <BrainCircuit className="mr-2 h-4 w-4" />
      Take Daily Quiz
    </Button>
  </div>
);

const StudentDashboardEmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="space-y-4 max-w-md">
      <div className="text-slate-400 mb-4">
        <VideoOff className="h-12 w-12 mx-auto" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">No active sessions</h3>
      <p className="text-sm text-slate-500">
        You&apos;re not currently in any active doubt rooms. Join a room to start learning.
      </p>
    </div>
  </div>
);

const StudentQuizEmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="space-y-4 max-w-md">
      <div className="text-slate-400 mb-4">
        <FileText className="h-12 w-12 mx-auto" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">Your diagnostic history is empty</h3>
      <p className="text-sm text-slate-500">
        Complete your first diagnostic quiz to track your learning progress and identify knowledge gaps.
      </p>
    </div>
  </div>
);

// Faculty Dashboard Components
const FacultyQuickActions = () => (
  <div className="grid grid-cols-2 gap-4">
    <Button className="bg-slate-950 text-white hover:bg-slate-800 font-semibold shadow-sm h-12">
      <DoorOpen className="mr-2 h-4 w-4" />
      Start Doubt Room
    </Button>
    <Button
      variant="outline"
      className="border-slate-200 bg-slate-50 text-slate-900 hover:bg-slate-100 font-semibold h-12"
    >
      <FileText className="mr-2 h-4 w-4" />
      Upload Resource
    </Button>
  </div>
);

const FacultyDashboardEmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="space-y-4 max-w-md">
      <div className="text-slate-400 mb-4">
        <Video className="h-12 w-12 mx-auto" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">No pending requests</h3>
      <p className="text-sm text-slate-500">
        No doubt session requests at the moment. Check back later or start a new session.
      </p>
    </div>
  </div>
);

// Faculty Cabin Status Component
const FacultyCabinStatus = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "In Class":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "Away":
        return "bg-slate-50 text-slate-500 border-slate-200";
      default:
        return "bg-slate-50 text-slate-500 border-slate-200";
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500 animate-pulse";
      case "In Class":
        return "bg-slate-500";
      case "Away":
        return "bg-slate-300";
      default:
        return "bg-slate-300";
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 bg-white shadow-sm hover:bg-slate-50 transition-colors">
      <div className="relative">
        <div className={`w-3 h-3 rounded-full ${getStatusDotColor(status)}`} />
        <div className="absolute inset-0 w-3 h-3 rounded-full animate-ping opacity-75" style={{ animationDuration: '2s' }} />
      </div>
      <Badge
        variant="outline"
        className={`font-mono text-xs uppercase font-medium tracking-wider px-3 py-1 rounded-md border ${getStatusColor(status)}`}
      >
        {status}
      </Badge>
    </div>
  );
};

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();

  // Fetch user session and extract role, full_name, and registration_number
  const fetchUser = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push("/login");
        return;
      }

      setUser(data.user);
    } catch (err) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (loading || !user) return "Loading...";
    return user.user_metadata?.full_name || user?.email?.split('@')[0] || "User";
  };

  // Get user role from metadata
  const getUserRole = () => {
    if (loading || !user) return 'Student';
    return user?.user_metadata?.role || 'Student';
  };

  // Get registration number from metadata
  const getUserRegistrationNumber = () => {
    if (loading || !user) return "Unknown";
    return user?.user_metadata?.registration_number || "Unknown";
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Update time every minute for greeting
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Get dynamic greeting based on local timezone
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Format today's date
  const formatDate = () => {
    const today = currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return today.toUpperCase();
  };

  const isFaculty = getUserRole() === 'faculty';

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 280, damping: 24, mass: 0.8 },
    },
  };

  if (loading) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-[1440px] px-6 py-8 mx-auto flex flex-col gap-8"
      >
        <motion.section variants={itemVariants}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              <div className="h-8 w-48 rounded bg-slate-200/50 animate-pulse" />
              <div className="h-5 w-64 rounded bg-slate-200/50 animate-pulse" />
            </div>
            <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white p-3 shadow-sm animate-pulse">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-200/50" />
              <div className="min-w-0 flex-1">
                <div className="h-4 w-32 rounded bg-slate-200/50" />
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-5 w-16 rounded-full bg-slate-200/50" />
                  <div className="h-3 w-12 rounded bg-slate-200/50" />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section variants={itemVariants}>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-full border border-slate-200 bg-white shadow-sm rounded-md">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex size-8 rounded bg-slate-200/50 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-20 rounded bg-slate-200/50 animate-pulse" />
                    <div className="h-6 w-12 rounded bg-slate-200/50 animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-[1440px] px-6 py-8 mx-auto flex flex-col gap-8"
    >
      <motion.section variants={itemVariants}>
        <div className="flex flex-col gap-1">
          <h1 className="font-extrabold text-2xl tracking-tight text-slate-950">
            {getGreeting()}, {getUserDisplayName()}!
          </h1>
          <p className="mt-1 font-mono text-xs uppercase tracking-wider text-slate-500">
            {formatDate()} ·{" "}
            <span className="text-slate-950">
              {getUserRole()} — {getUserRegistrationNumber()}
            </span>
          </p>
        </div>
      </motion.section>

      <motion.section variants={itemVariants}>
        {isFaculty ? (
          <FacultyQuickActions />
        ) : (
          <StudentQuickActions />
        )}
      </motion.section>

      <section className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-6">
          <motion.section variants={itemVariants}>
            {isFaculty ? (
              FacultyDashboardEmptyState()
            ) : (
              <div className="space-y-6">
                {false ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <DoubtSessionCard />
                    <DoubtSessionCard />
                  </div>
                ) : (
                  StudentDashboardEmptyState()
                )}
              </div>
            )}
          </motion.section>

          <motion.section variants={itemVariants}>
            {isFaculty ? (
              <div className="space-y-4">
                <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-950">
                  <DoorOpen className="size-4 text-slate-600" />
                  My Cabin Status
                </h2>
                <FacultyCabinStatus status="Available" />
              </div>
            ) : (
              StudentQuizEmptyState()
            )}
          </motion.section>
        </div>
      </section>
    </motion.div>
  );
}
