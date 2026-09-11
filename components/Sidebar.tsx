"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "cn";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  GraduationCap,
  LayoutDashboard,
  Video,
  BrainCircuit,
  Library,
  DoorOpen,
  FolderKanban,
  Trophy,
  User,
  LogOut,
  VideoOff,
  Monitor,
} from "lucide-react";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const learningNav = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Doubt Sessions", href: "/doubts", icon: Video },
  { label: "Practice Quizzes", href: "/quizzes", icon: BrainCircuit },
  { label: "Digital Library", href: "/library", icon: Library },
];

const campusNav = [
  { label: "Faculty Cabins", href: "/faculty-cabins", icon: DoorOpen },
  { label: "Project Showcase", href: "/projects", icon: FolderKanban },
  { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { label: "Profile & Settings", href: "/profile", icon: User },
];

function NavItem({
  href,
  icon: Icon,
  label,
  active,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 px-3 py-2 text-sm transition-colors outline-none",
        active
          ? "border-l-4 border-slate-950 bg-slate-100 font-bold text-slate-950"
          : "border-l-4 border-transparent font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-950"
      )}
    >
      <Icon
        className={cn(
          "size-4 shrink-0 transition-colors",
          active
            ? "text-slate-950"
            : "text-slate-400 group-hover:text-slate-600",
        )}
      />
      <span className="tracking-tight">{label}</span>
    </Link>
  );
}

// Loading skeleton for sidebar profile
const LoadingProfileSkeleton = () => (
  <div className="p-4">
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
    <div className="mt-3 flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold tracking-tight text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900">
      <LogOut className="size-4" />
      <span className="text-slate-400">Loading...</span>
    </div>
  </div>
);

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user session and metadata
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
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Get display name from user metadata or email
  const getUserDisplayName = () => {
    if (loading || !user) return "Loading...";
    return user.user_metadata?.full_name || user.email?.split('@')[0] || "User";
  };

  // Get user role from metadata or default to Student
  const getUserRole = () => {
    if (loading || !user) return 'Student';
    return user.user_metadata?.role || 'Student';
  };

  // Get registration number from metadata
  const getUserRegistrationNumber = () => {
    if (loading || !user) return "Unknown";
    return user?.user_metadata?.registration_number || "Unknown";
  };

  // Determine navigation based on user role
  const navItems = getUserRole() === 'faculty' ? [...learningNav, ...campusNav] : learningNav;

  if (loading) {
    return (
      <aside
        className={cn(
          "flex h-full w-64 flex-col bg-white border-r border-slate-200",
          className,
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-5 py-5">
          <GraduationCap className="size-6 text-slate-950 shrink-0" />
          <div>
            <h1 className="text-base font-semibold tracking-tight text-slate-950 leading-tight">
              CampusConnect
            </h1>
            <p className="font-mono text-[10px] font-medium tracking-wider text-slate-500 uppercase mt-0.5">
              Scaler SST
            </p>
          </div>
        </div>

        <Separator className="bg-slate-100" />

        {/* Loading Navigation Skeleton */}
        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
          <div className="flex flex-col gap-1">
            <p className="mb-2 px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Loading...
            </p>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2">
                <div className="size-4 rounded bg-slate-200/50 animate-pulse" />
                <div className="h-4 w-24 rounded bg-slate-200/50 animate-pulse" />
              </div>
            ))}
          </div>
        </nav>

        <Separator className="bg-slate-100" />

        <LoadingProfileSkeleton />
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col bg-white border-r border-slate-200",
        className,
      )}
    >
      {/* ── Brand Header ────────────────────────── */}
      <div className="flex items-center gap-3 px-5 py-5">
        <GraduationCap className="size-6 text-slate-950 shrink-0" />
        <div>
          <h1 className="text-base font-semibold tracking-tight text-slate-950 leading-tight">
            CampusConnect
          </h1>
          <p className="font-mono text-[10px] font-medium tracking-wider text-slate-500 uppercase mt-0.5">
            Scaler SST
          </p>
        </div>
      </div>

      <Separator className="bg-slate-100" />

      {/* ── Navigation ──────────────────────────── */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {/* Learning Group */}
        <div className="flex flex-col gap-1">
          <p className="mb-2 px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Learning
          </p>
          {learningNav.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={pathname === item.href}
            />
          ))}
        </div>

        {/* Campus Group (Faculty Only) */}
        {getUserRole() === 'faculty' && (
          <div className="flex flex-col gap-1">
            <p className="mb-2 px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Campus
            </p>
            {campusNav.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={pathname === item.href}
              />
            ))}
          </div>
        )}
      </nav>

      <Separator className="bg-slate-100" />

      {/* ── Profile Footer ────────────────────────── */}
      <div className="p-4">
        <Link
          href="/profile"
          className="group flex items-center gap-3 rounded-md border border-slate-200 bg-white p-3 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors group-hover:bg-slate-200 group-hover:text-slate-900">
            <User className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold tracking-tight text-slate-950">
              {getUserDisplayName()}
            </p>
            <p className="font-mono text-[10px] uppercase text-slate-500 tracking-wider mt-0.5">
              B.TECH CSE · REG: {getUserRegistrationNumber()}
            </p>
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold tracking-tight text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-950 cursor-pointer"
        >
          <LogOut className="size-4" />
          Log Out
        </button>
      </div>
    </aside>
  );
}