"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "motion/react";
import { createClient } from "@/lib/supabase/client";
import {
  User,
  Shield,
  KeyRound,
  GraduationCap,
  Award,
  Link as LinkIcon,
  FileText,
  HelpCircle,
  ChevronRight,
  Fingerprint,
  Mail,
  Building,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const supabase = createClient();

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

function ProfileSkeletonLoader() {
  return (
    <div className="max-w-4xl px-6 py-8 mx-auto flex flex-col gap-8 animate-pulse">
      {/* Header Banner Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="size-20 rounded-2xl bg-slate-200" />
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-7 w-48 rounded-lg bg-slate-200" />
            <div className="h-5 w-16 rounded-full bg-slate-200" />
          </div>
          <div className="h-4 w-64 rounded bg-slate-200" />
          <div className="h-3 w-80 rounded bg-slate-200" />
        </div>
      </div>

      {/* Security Section Skeleton */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <div className="h-5 w-40 rounded bg-slate-200" />
        <div className="h-16 w-full rounded-xl bg-slate-100" />
        <div className="h-16 w-full rounded-xl bg-slate-100" />
      </div>

      {/* Account Section Skeleton */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <div className="h-5 w-48 rounded bg-slate-200" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 w-full rounded-lg bg-slate-100" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function loadUserAndProfile() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        let currentUser = session?.user;

        if (sessionError || !currentUser) {
          const { data: userData, error: userError } = await supabase.auth.getUser();
          if (userError || !userData?.user) {
            if (isMounted) {
              setAuthLoading(false);
              setIsProfileLoading(false);
              router.push("/login");
            }
            return;
          }
          currentUser = userData.user;
        }

        if (!isMounted) return;
        setUser(currentUser);
        setAuthLoading(false);

        // Fetch supplementary profile data if available
        if (currentUser) {
          try {
            const { data: profileData } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", currentUser.id)
              .maybeSingle();

            if (isMounted && profileData) {
              setProfile(profileData);
            }
          } catch (profileErr) {
            console.warn("Supplementary profile lookup skipped:", profileErr);
          }
        }
      } catch (err) {
        console.error("Profile auth load error:", err);
      } finally {
        if (isMounted) {
          setAuthLoading(false);
          setIsProfileLoading(false);
        }
      }
    }

    loadUserAndProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;
      if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
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

  if (authLoading || isProfileLoading) {
    return <ProfileSkeletonLoader />;
  }

  const fullName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Student";

  const email = user?.email || profile?.email || "student@lpu.in";

  const registrationNumber =
    profile?.registration_number ||
    profile?.reg_no ||
    user?.user_metadata?.registration_number ||
    user?.user_metadata?.reg_no ||
    "123456";

  const role =
    profile?.role ||
    user?.user_metadata?.role ||
    "Student";

  const department =
    profile?.department ||
    profile?.program ||
    user?.user_metadata?.department ||
    user?.user_metadata?.program ||
    user?.user_metadata?.branch ||
    "B.Tech CSE";

  const institution =
    user?.user_metadata?.institution ||
    user?.user_metadata?.university ||
    "Lovely Professional University";

  const initialLetter = fullName.trim().charAt(0).toUpperCase() || "U";

  const accountSettingsItems = [
    {
      title: "Academic Program",
      desc: `${department} · ${institution}`,
      icon: Building,
      tag: "ACTIVE",
    },
    {
      title: "Academic Subscriptions",
      desc: "Enterprise Campus Tier Active",
      icon: Award,
      tag: "PRO",
    },
    {
      title: "Verified Badges",
      desc: "Dean's List · Problem Solving Elite",
      icon: CheckCircle2,
      tag: "2 Badges",
    },
    {
      title: "Linked Accounts",
      desc: email ? `Connected (${email})` : "Campus SSO Connected",
      icon: LinkIcon,
    },
    {
      title: "Privacy Policy",
      desc: "Data protection and campus audit logs",
      icon: FileText,
    },
    {
      title: "Help & Support",
      desc: "Reach out to the Campus Technical Support Desk",
      icon: HelpCircle,
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-4xl px-6 py-8 mx-auto flex flex-col gap-8"
    >
      {/* ── User Header Banner ──────────────────────────── */}
      <motion.section variants={itemVariants}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="relative flex size-20 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white font-bold text-2xl shadow-inner">
            {initialLetter}
            <div className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white text-white">
              <CheckCircle2 className="size-4" />
            </div>
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">
                {fullName}
              </h1>
              <Badge variant="secondary" className="bg-slate-100 text-slate-900 font-mono text-xs uppercase px-2.5 py-0.5">
                {role}
              </Badge>
            </div>
            
            <p className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <Mail className="size-4 text-slate-400" />
              {email}
            </p>

            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="size-3.5" />
                {department}
              </span>
              <span>•</span>
              <span className="font-semibold text-slate-900">
                Reg: {registrationNumber}
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Section 1: Security & Passkey Access ───────── */}
      <motion.section variants={itemVariants}>
        <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 text-slate-900">
              <Shield className="size-5 text-slate-900" />
              <CardTitle className="text-base font-bold tracking-tight">Security & Authentication</CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Manage your hardware security tokens and verified device credentials.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200/80 bg-slate-50/50">
              <div className="flex items-center gap-3.5">
                <div className="flex size-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-900 shadow-sm">
                  <Fingerprint className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-950">Biometric Authentication / Passkey</h4>
                  <p className="text-xs text-slate-500">Allow instant biometric access via TouchID or Windows Hello</p>
                </div>
              </div>
              
              <button
                type="button"
                role="switch"
                aria-checked={biometricsEnabled}
                onClick={() => setBiometricsEnabled(!biometricsEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 ${
                  biometricsEnabled ? 'bg-slate-900' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    biometricsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200/80 bg-slate-50/50">
              <div className="flex items-center gap-3.5">
                <div className="flex size-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-900 shadow-sm">
                  <KeyRound className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-950">Session Management</h4>
                  <p className="text-xs text-slate-500">Active session token issued via Supabase GoTrue Protocol</p>
                </div>
              </div>
              <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200 font-mono text-[10px]">
                ACTIVE
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* ── Section 2: Account & Academic Settings ──────── */}
      <motion.section variants={itemVariants}>
        <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-slate-900">
              <Building className="size-5 text-slate-900" />
              <CardTitle className="text-base font-bold tracking-tight">Account & Subscriptions</CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Configure your academic tier, integrations, and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {accountSettingsItems.map((item, index) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-slate-50/80 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-200 group-hover:text-slate-950 transition-colors">
                        <ItemIcon className="size-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 group-hover:text-slate-950">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.tag && (
                        <Badge variant="secondary" className="font-mono text-[10px] bg-slate-100 text-slate-700">
                          {item.tag}
                        </Badge>
                      )}
                      <ChevronRight className="size-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </motion.div>
  );
}
