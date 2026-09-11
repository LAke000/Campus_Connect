"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/libs/supabase";

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  department: string;
  academic_year?: number;
  specialization?: string;
  is_available: boolean;
  is_mentor_verified?: boolean;
}

type ActiveTab = "faculty" | "mentors";

export default function DoubtsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>("faculty");
  const [facultyList, setFacultyList] = useState<Profile[]>([]);
  const [mentorList, setMentorList] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [connectingId, setConnectingId] = useState<string | null>(null);

  const tabs: { key: ActiveTab; label: string }[] = [
    { key: "faculty", label: "Program Faculty" },
    { key: "mentors", label: "Senior Peer Mentors (3rd & 4th Year)" },
  ];

  useEffect(() => {
    async function fetchDoubtsData() {
      setIsLoading(true);
      try {
        let userDepartment = "Computer Science";

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          if (session.user.user_metadata?.department) {
            userDepartment = session.user.user_metadata.department;
          } else {
            const { data: userProfile } = await supabase
              .from("profiles")
              .select("department")
              .eq("id", session.user.id)
              .maybeSingle();

            if (userProfile?.department) {
              userDepartment = userProfile.department;
            }
          }
        }

        // Query 1 (Faculty): Fetch profiles where role = 'faculty' and department = userDepartment
        const { data: facultyData, error: facultyError } = await supabase
          .from("profiles")
          .select("*")
          .eq("role", "faculty")
          .eq("department", userDepartment);

        if (facultyError) {
          console.error("Error fetching faculty profiles:", facultyError);
        } else if (facultyData) {
          setFacultyList(facultyData as Profile[]);
        }

        // Query 2 (Mentors): Fetch profiles where role = 'student', academic_year >= 3, and is_mentor_verified = true
        const { data: mentorData, error: mentorError } = await supabase
          .from("profiles")
          .select("*")
          .eq("role", "student")
          .gte("academic_year", 3)
          .eq("is_mentor_verified", true);

        if (mentorError) {
          console.error("Error fetching mentor profiles:", mentorError);
        } else if (mentorData) {
          setMentorList(mentorData as Profile[]);
        }
      } catch (err) {
        console.error("Unexpected error fetching doubt clearing data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDoubtsData();
  }, []);

  const handleConnect = async (profile: Profile) => {
    if (connectingId) return;

    setConnectingId(profile.id);

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
          hostId: profile.id,
          title: `Doubt Session with ${profile.full_name}`,
          department: profile.department || "Computer Science",
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
      console.error("Error creating doubt room:", err);
      alert(err?.message || "Failed to initiate doubt clearing session. Please try again.");
    } finally {
      setConnectingId(null);
    }
  };

  const currentList = activeTab === "faculty" ? facultyList : mentorList;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <header>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Live Doubt Clearing
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Connect with departmental faculty and verified senior peers for instant 1-on-1 code walkthroughs.
          </p>
        </header>

        <div className="mt-6 inline-flex items-center rounded-lg border border-slate-200 bg-slate-100 p-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={
                  isActive
                    ? "bg-slate-900 text-white font-medium text-xs px-4 py-2 rounded-md transition-colors"
                    : "text-slate-600 hover:text-slate-900 text-xs px-4 py-2 rounded-md transition-colors"
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-slate-100 border border-slate-200 rounded-md h-48"
              />
            ))
          ) : currentList.length > 0 ? (
            currentList.map((profile) => (
              <div
                key={profile.id}
                className="flex flex-col justify-between rounded-md border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 tracking-tight">
                        {profile.full_name}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        {profile.department}
                        {profile.academic_year ? ` · Year ${profile.academic_year}` : ""}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center text-[10px] font-semibold font-mono uppercase px-2 py-0.5 rounded-sm border ${
                        profile.is_available
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {profile.is_available ? "Available" : "Offline"}
                    </span>
                  </div>
                  {profile.specialization && (
                    <p className="text-xs text-slate-600 line-clamp-2">
                      <span className="font-medium text-slate-700">Specialization:</span>{" "}
                      {profile.specialization}
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 truncate max-w-[180px]">
                    {profile.email}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleConnect(profile)}
                    disabled={!profile.is_available || connectingId === profile.id}
                    className="text-xs font-semibold px-3 py-1.5 rounded bg-slate-900 text-white hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {connectingId === profile.id ? "Connecting..." : "Connect"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 rounded-md border border-dashed border-slate-200 bg-white/50 text-center">
              <p className="text-sm font-semibold text-slate-900">
                No {activeTab === "faculty" ? "faculty members" : "peer mentors"} found
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                {activeTab === "faculty"
                  ? "There are currently no faculty members listed for your department."
                  : "Verified 3rd and 4th year mentors will appear here when available."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


