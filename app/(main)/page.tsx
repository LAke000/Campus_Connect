"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, FileText, Video, VideoOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type DashboardProfile = {
  full_name: string | null;
  role: string | null;
  reg_no: string | null;
};

function getGreeting(date: Date) {
  const hour = date.getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate(date: Date) {
  return date
    .toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<DashboardProfile | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        router.push("/login");
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, role, reg_no")
        .eq("id", session.user.id)
        .maybeSingle();

      if (!isMounted) return;

      setProfile(
        profileError || !profileData
          ? {
              full_name: session.user.user_metadata?.full_name ?? null,
              role: session.user.user_metadata?.role ?? null,
              reg_no:
                session.user.user_metadata?.reg_no ??
                session.user.user_metadata?.registration_number ??
                null,
            }
          : profileData,
      );
      setCurrentTime(new Date());
      setIsLoading(false);
    }

    loadDashboard().catch((error) => {
      console.error("Dashboard loading error:", error);
      if (isMounted) setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [router]);

  useEffect(() => {
    const interval = window.setInterval(() => setCurrentTime(new Date()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  if (isLoading || !currentTime) {
    return <main className="min-h-screen bg-slate-50" />;
  }

  const fullName = profile?.full_name?.trim() || "Student";
  const role = profile?.role?.trim() || "STUDENT";
  const registrationNumber = profile?.reg_no?.trim() || "—";

  return (
    <main className="min-h-full bg-slate-50 px-6 py-10 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-5xl">
        <header>
          <h1 className="font-bold text-[32px] text-slate-900">
            {getGreeting(currentTime)}, {fullName}!
          </h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">
            {formatDate(currentTime)} • {role} — {registrationNumber}
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link
            href="/doubts"
            className="flex items-center justify-center gap-2 rounded-md bg-slate-950 py-3.5 font-medium text-white transition-colors hover:bg-slate-800"
          >
            <Video className="h-5 w-5" />
            Join Active Room
          </Link>
          <Link
            href="/quizzes"
            className="flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white py-3.5 font-medium text-slate-900 shadow-sm transition-colors hover:bg-slate-50"
          >
            <Activity className="h-5 w-5" />
            Take Daily Quiz
          </Link>
        </div>

        <section className="mt-24 text-center" aria-labelledby="active-sessions-heading">
          <VideoOff className="mx-auto h-12 w-12 text-slate-400" />
          <h2 id="active-sessions-heading" className="mt-4 text-xl font-bold text-slate-900">
            No active sessions
          </h2>
          <p className="mx-auto mt-2 max-w-md text-slate-500">
            You&apos;re not currently in any active doubt rooms. Join a room to start learning.
          </p>
        </section>

        <section className="mt-32 pb-12 text-center" aria-labelledby="diagnostic-history-heading">
          <FileText className="mx-auto h-12 w-12 text-slate-400" />
          <h2 id="diagnostic-history-heading" className="mt-4 text-xl font-bold text-slate-900">
            Your diagnostic history is empty
          </h2>
          <p className="mx-auto mt-2 max-w-md text-slate-500">
            Complete your first diagnostic quiz to track your learning progress and build your academic history.
          </p>
        </section>
      </div>
    </main>
  );
}
