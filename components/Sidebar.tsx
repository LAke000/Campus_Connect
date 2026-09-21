"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
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
  Compass,
  MapPin,
  CalendarCheck,
} from "lucide-react";

const supabase = createClient();

const learningNav = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Campus Locator", href: "/campus-locator", icon: Compass },
  { label: "Doubt Sessions", href: "/doubts", icon: Video },
  { label: "Practice Quizzes", href: "/quizzes", icon: BrainCircuit },
  { label: "Digital Library", href: "/library", icon: Library },
];

const experimentalNav = [
  { label: "Class Desk", href: "/class-desk", icon: CalendarCheck, badge: "BETA" },
];

const campusNav = [
  { label: "Faculty Cabins & Doubts", href: "/doubts", icon: DoorOpen },
  { label: "Profile & Settings", href: "/profile", icon: User },
];

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  badge,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex min-h-[42px] items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition-all outline-none active:scale-[0.98] select-none",
        active
          ? "bg-slate-950 text-white font-bold shadow-xs dark:bg-white dark:text-slate-950"
          : "text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-950 dark:hover:text-white"
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Icon
          className={cn(
            "size-4 shrink-0 transition-colors",
            active
              ? "text-white dark:text-slate-950"
              : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300",
          )}
        />
        <span className="tracking-tight truncate">{label}</span>
      </div>
      {badge && (
        <span
          className={cn(
            "rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold",
            active
              ? "bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-950"
              : "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
          )}
        >
          {badge}
        </span>
      )}
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
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (session?.user) {
          if (isMounted) setUser(session.user);
          return;
        }

        if (sessionError || !session) {
          const { data: userData } = await supabase.auth.getUser();
          if (userData?.user && isMounted) {
            setUser(userData.user);
            return;
          }
        }
      } catch (err) {
        console.warn("Sidebar auth fetch error:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;
      if (event === "SIGNED_OUT") {
        setUser(null);
        router.push("/login");
      } else if (session?.user) {
        setUser(session.user);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  // Handle logout
  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await supabase.auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
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
        "flex h-full w-full lg:w-64 flex-col bg-white dark:bg-neutral-900 border-r border-slate-200 dark:border-neutral-800",
        className,
      )}
    >
      {/* ── Brand Header ────────────────────────── */}
      <div className="flex items-center gap-3 px-5 py-5">
        <GraduationCap className="size-6 text-slate-950 dark:text-white shrink-0" />
        <div>
          <h1 className="text-base font-semibold tracking-tight text-slate-950 dark:text-white leading-tight">
            CampusConnect
          </h1>
          <p className="font-mono text-[10px] font-medium tracking-wider text-slate-500 dark:text-neutral-400 uppercase mt-0.5">
            LPU Academic Hub
          </p>
        </div>
      </div>

      <Separator className="bg-slate-100 dark:bg-neutral-800" />

      {/* ── Navigation ──────────────────────────── */}
      <nav className="flex-1 space-y-5 overflow-y-auto overscroll-contain px-3 py-4">
        {/* Learning Group */}
        <div className="flex flex-col gap-1">
          <p className="mb-1.5 px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-neutral-500">
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

        {/* Experimental Features Group */}
        <div className="flex flex-col gap-1">
          <div className="mb-1.5 flex items-center justify-between px-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-neutral-500">
              Experimental Features
            </p>
            <span className="rounded bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-amber-800 dark:text-amber-300">
              LABS
            </span>
          </div>
          {experimentalNav.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              active={pathname === item.href}
            />
          ))}
        </div>

        {/* Campus Group (Faculty Only) */}
        {getUserRole() === 'faculty' && (
          <div className="flex flex-col gap-1">
            <p className="mb-1.5 px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-neutral-500">
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

      <Separator className="bg-slate-100 dark:bg-neutral-800" />

      {/* ── Profile Footer ────────────────────────── */}
      <div className="p-4">
        <Link
          href="/profile"
          className="group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 shadow-xs transition-all hover:border-slate-300 dark:hover:border-neutral-700 hover:bg-slate-50 dark:hover:bg-neutral-800 active:scale-[0.98]"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 transition-colors group-hover:bg-slate-200 dark:group-hover:bg-neutral-700 group-hover:text-slate-900 dark:group-hover:text-white">
            <User className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold tracking-tight text-slate-950 dark:text-white">
              {getUserDisplayName()}
            </p>
            <p className="font-mono text-[10px] uppercase text-slate-500 dark:text-neutral-400 tracking-wider mt-0.5 truncate">
              B.TECH CSE · REG: {getUserRegistrationNumber()}
            </p>
          </div>
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2.5 text-sm font-semibold tracking-tight text-slate-700 dark:text-neutral-300 shadow-xs transition-all hover:bg-slate-50 dark:hover:bg-neutral-800 hover:text-slate-950 dark:hover:text-white active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LogOut className="size-4" />
          {isLoggingOut ? "Logging out..." : "Log Out"}
        </button>
      </div>
    </aside>
  );
}