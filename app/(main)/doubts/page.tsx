"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  User,
  ArchiveX,
  Calendar,
  LogIn,
  MonitorPlay,
  Copy,
  Check,
  Settings,
  Headphones,
  Clock,
} from "lucide-react";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 24, mass: 0.8 },
  },
};

export default function DoubtsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [workspaceIdCopied, setWorkspaceIdCopied] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    fetchUser();
  }, []);

  const getUserDisplayName = () => {
    if (loading || !user) return "Loading...";
    return user.user_metadata?.full_name || user?.email?.split('@')[0] || "User";
  };

  const getUserRegistrationNumber = () => {
    if (loading || !user) return "Loading...";
    return user?.user_metadata?.registration_number || "Unknown";
  };

  const copyWorkspaceId = () => {
    navigator.clipboard.writeText("WKSP-8921");
    setWorkspaceIdCopied(true);
    setTimeout(() => setWorkspaceIdCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid max-w-[1440px] mx-auto gap-6 lg:grid-cols-[6.5fr_3.5fr] items-start"
          >
            {/* Left Column: Profile & Activity */}
            <div className="flex flex-col gap-6 w-full">
              {/* Profile Card */}
              <motion.div
                variants={itemVariants}
                className="bg-white border border-slate-200 shadow-sm p-6 rounded-md flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 shrink-0 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                    <User className="w-8 h-8 text-slate-400" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      {getUserDisplayName()}
                    </h1>
                    <p className="font-mono text-xs text-slate-500 tracking-wider uppercase mt-1">
                      B.TECH CSE · REG: {getUserRegistrationNumber()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="shrink-0 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold shadow-sm w-full md:w-auto h-11 px-5"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Workspace Settings
                </Button>
              </motion.div>

              {/* Recent Doubt Activity */}
              <motion.div
                variants={itemVariants}
                className="bg-white border border-slate-200 shadow-sm p-6 rounded-md flex flex-col"
              >
                <h2 className="font-bold text-lg text-slate-900 tracking-tight mb-6">
                  Recent Doubt Sessions
                </h2>
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                    <ArchiveX className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-slate-900 font-semibold text-sm">No recent activity</p>
                  <p className="text-slate-500 text-sm mt-1 max-w-sm leading-relaxed">
                    Your past doubt resolutions and recorded rooms will appear here.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Actions & Upcoming */}
            <div className="flex flex-col gap-6 w-full">
              {/* Quick Actions Panel */}
              <motion.div
                variants={itemVariants}
                className="bg-white border border-slate-200 shadow-sm p-6 rounded-md flex flex-col"
              >
                <h2 className="font-bold text-lg text-slate-900 tracking-tight mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <button className="flex flex-col items-center justify-center gap-2 bg-slate-50 border border-slate-200 hover:border-slate-400 transition-colors rounded-md p-4 group">
                    <Calendar className="w-5 h-5 text-slate-700 group-hover:text-slate-900 transition-colors" />
                    <span className="font-semibold text-xs text-slate-700 group-hover:text-slate-900 transition-colors tracking-tight">Schedule</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-2 bg-slate-50 border border-slate-200 hover:border-slate-400 transition-colors rounded-md p-4 group">
                    <LogIn className="w-5 h-5 text-slate-700 group-hover:text-slate-900 transition-colors" />
                    <span className="font-semibold text-xs text-slate-700 group-hover:text-slate-900 transition-colors tracking-tight">Join</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-2 bg-slate-50 border border-slate-200 hover:border-slate-400 transition-colors rounded-md p-4 group">
                    <MonitorPlay className="w-5 h-5 text-slate-700 group-hover:text-slate-900 transition-colors" />
                    <span className="font-semibold text-xs text-slate-700 group-hover:text-slate-900 transition-colors tracking-tight">Host</span>
                  </button>
                </div>

                <Separator className="mb-4 bg-slate-100" />

                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-md p-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Campus Workspace ID</span>
                    <span className="font-mono font-bold text-slate-900 tracking-wider">WKSP-8921</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyWorkspaceId}
                    className="h-8 w-8 p-0 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded shrink-0"
                  >
                    {workspaceIdCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </motion.div>

              {/* Upcoming Sessions */}
              <motion.div
                variants={itemVariants}
                className="bg-white border border-slate-200 shadow-sm p-6 rounded-md flex flex-col"
              >
                <h2 className="font-bold text-lg text-slate-900 tracking-tight mb-4">
                  Upcoming Rooms
                </h2>

                <div className="flex flex-col gap-3 mb-6">
                  {/* Mock Session 1 */}
                  <div className="flex flex-col p-4 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider font-semibold bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-sm">
                        CS201 · Data Structures
                      </span>
                      <div className="flex items-center text-slate-500 text-[11px] font-semibold uppercase tracking-wider font-mono">
                        <Clock className="w-3 h-3 mr-1" />
                        Today, 4:00 PM
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm text-slate-900 tracking-tight mt-1">
                      Algorithm Complexity & Big O Analysis
                    </h3>
                  </div>

                  {/* Mock Session 2 */}
                  <div className="flex flex-col p-4 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider font-semibold bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-sm">
                        MA203 · Linear Algebra
                      </span>
                      <div className="flex items-center text-slate-500 text-[11px] font-semibold uppercase tracking-wider font-mono">
                        <Clock className="w-3 h-3 mr-1" />
                        Tomorrow, 10:30 AM
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm text-slate-900 tracking-tight mt-1">
                      Eigenvalues and Eigenvectors Query
                    </h3>
                  </div>
                </div>

                <div className="mt-auto pt-2 border-t border-slate-100">
                  <button className="flex items-center justify-center w-full py-2 text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors group">
                    <Headphones className="w-4 h-4 mr-2 text-slate-400 group-hover:text-slate-700 transition-colors" />
                    Test Audio and Video
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
