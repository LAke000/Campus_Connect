"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/src/libs/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  PhoneOff,
  ShieldCheck,
  User,
  Loader2,
  AlertCircle,
  Video,
} from "lucide-react";

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

interface DoubtRoom {
  id: string;
  room_slug: string;
  title: string;
  host_id: string;
  host_name: string;
  department: string;
  status: string;
  created_at?: string;
}

export default function DoubtLiveRoomPage() {
  const params = useParams();
  const router = useRouter();

  const rawRoomId = params?.roomId;
  const roomId = Array.isArray(rawRoomId) ? rawRoomId[0] : (rawRoomId as string) || "";

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [roomData, setRoomData] = useState<DoubtRoom | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isHost, setIsHost] = useState(false);
  const [isJitsiReady, setIsJitsiReady] = useState(false);

  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<any>(null);

  // 1. Leave & Cleanup Handler
  const handleLeave = useCallback(async () => {
    if (jitsiApiRef.current) {
      try {
        jitsiApiRef.current.dispose();
      } catch (err) {
        console.error("Error disposing Jitsi instance:", err);
      }
      jitsiApiRef.current = null;
    }

    if (isHost && roomData) {
      try {
        await supabase
          .from("doubt_rooms")
          .update({ status: "ended" })
          .eq("id", roomData.id);
      } catch (err) {
        console.error("Failed to update room status on leave:", err);
      }
    }

    router.push("/doubts");
  }, [isHost, roomData, router]);

  // 2. Validate Room & Session Guard
  useEffect(() => {
    let isMounted = true;

    async function validateRoomAndSession() {
      if (!roomId) {
        router.push("/doubts");
        return;
      }

      setLoading(true);
      setErrorMsg(null);

      try {
        // Check active session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session?.user) {
          router.push("/login");
          return;
        }

        const user = session.user;
        if (isMounted) {
          setCurrentUser(user);
        }

        // Fetch room from doubt_rooms
        const { data: room, error: roomError } = await supabase
          .from("doubt_rooms")
          .select("*")
          .eq("room_slug", roomId)
          .maybeSingle();

        if (roomError || !room) {
          console.error("Room lookup failed:", roomError);
          if (isMounted) {
            setErrorMsg("Room not found or no longer active.");
          }
          setTimeout(() => {
            router.push("/doubts");
          }, 2000);
          return;
        }

        if (room.status === "ended") {
          if (isMounted) {
            setErrorMsg("This doubt session has ended.");
          }
          setTimeout(() => {
            router.push("/doubts");
          }, 2000);
          return;
        }

        if (isMounted) {
          setRoomData(room);
          setIsHost(user.id === room.host_id);
          setLoading(false);
        }
      } catch (err) {
        console.error("Unexpected error validating room:", err);
        if (isMounted) {
          setErrorMsg("An unexpected error occurred. Redirecting...");
        }
        setTimeout(() => {
          router.push("/doubts");
        }, 2000);
      }
    }

    validateRoomAndSession();

    return () => {
      isMounted = false;
    };
  }, [roomId, router]);

  // 3. Dynamically Load Jitsi Script
  useEffect(() => {
    if (loading || !roomData) return;

    let isMounted = true;

    const loadJitsiScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (window.JitsiMeetExternalAPI) {
          resolve();
          return;
        }

        const existingScript = document.getElementById("jitsi-external-api-script");
        if (existingScript) {
          existingScript.addEventListener("load", () => resolve());
          return;
        }

        const script = document.createElement("script");
        script.id = "jitsi-external-api-script";
        script.src = "https://meet.jit.si/external_api.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = (err) => reject(err);
        document.body.appendChild(script);
      });
    };

    loadJitsiScript()
      .then(() => {
        if (isMounted) {
          setIsJitsiReady(true);
        }
      })
      .catch((err) => {
        console.error("Failed to load Jitsi Meet script:", err);
        if (isMounted) {
          setErrorMsg("Failed to initialize video conference client.");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [loading, roomData]);

  // 4. Mount Jitsi Conference
  useEffect(() => {
    if (!isJitsiReady || !jitsiContainerRef.current || !roomData || !currentUser) {
      return;
    }

    // Clean up existing instance before recreating
    if (jitsiApiRef.current) {
      try {
        jitsiApiRef.current.dispose();
      } catch (err) {
        console.error("Error disposing previous Jitsi instance:", err);
      }
      jitsiApiRef.current = null;
    }

    const cleanSlug = roomId.replace(/[^a-zA-Z0-9]/g, "");
    const jitsiRoomName = `CampusConnect-${cleanSlug}`;
    const isHostUser = currentUser.id === roomData.host_id;

    const displayName =
      currentUser.user_metadata?.full_name ||
      currentUser.email?.split("@")[0] ||
      (isHostUser ? "Host Faculty" : "Student");

    const toolbarButtons = [
      "microphone",
      "camera",
      "desktop",
      "chat",
      "raisehand",
      "tileview",
      "hangup",
    ];

    const options = {
      roomName: jitsiRoomName,
      parentNode: jitsiContainerRef.current,
      width: "100%",
      height: "100%",
      userInfo: {
        displayName,
        email: currentUser.email || "",
      },
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        enableWelcomePage: false,
        prejoinPageEnabled: false,
        disableDeepLinking: true,
        disableInviteFunctions: true,
        remoteVideoMenu: {
          disableKick: !isHostUser,
          disableGrantModerator: !isHostUser,
        },
        disableRemoteMute: !isHostUser,
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: toolbarButtons,
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        SHOW_POWERED_BY: false,
        SHOW_BRAND_WATERMARK: false,
        SHOW_PROMOTIONAL_CLOSE_PAGE: false,
        DISABLE_TRANSCRIPTION_SUBTITLES: true,
        HIDE_DEEP_LINKING_LOGO: true,
      },
    };

    try {
      const api = new window.JitsiMeetExternalAPI("meet.jit.si", options);
      jitsiApiRef.current = api;

      api.addEventListeners({
        readyToClose: () => {
          handleLeave();
        },
        videoConferenceLeft: () => {
          handleLeave();
        },
      });
    } catch (initErr) {
      console.error("Error creating Jitsi API instance:", initErr);
      setErrorMsg("Failed to mount live video room.");
    }

    return () => {
      if (jitsiApiRef.current) {
        try {
          jitsiApiRef.current.dispose();
        } catch (err) {
          console.error("Error disposing on unmount:", err);
        }
        jitsiApiRef.current = null;
      }
    };
  }, [isJitsiReady, roomData, currentUser, roomId, handleLeave]);

  if (loading || errorMsg) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-slate-50 p-6 text-center">
        {errorMsg ? (
          <div className="flex flex-col items-center space-y-3 bg-white p-8 rounded-lg border border-slate-200 shadow-sm max-w-md">
            <AlertCircle className="w-10 h-10 text-red-500" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Room Notice</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{errorMsg}</p>
            <Button
              variant="outline"
              onClick={() => router.push("/doubts")}
              className="mt-2 text-xs font-semibold"
            >
              Back to Doubt Clearing
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-slate-900" />
            <p className="text-sm font-semibold text-slate-700">Connecting to secure doubt room...</p>
            <p className="font-mono text-xs text-slate-400 uppercase tracking-widest">{roomId}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-[calc(100vh-80px)] bg-slate-50 overflow-hidden">
      {/* Header Bar */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLeave}
            className="h-8 px-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            title="Back to Doubts"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline text-xs font-medium">Back</span>
          </Button>

          <div className="h-4 w-px bg-slate-200" />

          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-slate-700 hidden sm:block" />
            <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {roomData?.title || "Live Doubt Clearing"}
            </h1>
          </div>

          <span className="font-mono text-xs bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded font-semibold hidden md:inline">
            {roomId}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isHost ? (
            <Badge
              variant="outline"
              className="border-emerald-200 bg-emerald-50 text-emerald-700 font-mono text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1"
            >
              <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600" />
              HOST / FACULTY
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="border-blue-200 bg-blue-50 text-blue-700 font-mono text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1"
            >
              <User className="w-3 h-3 mr-1 text-blue-600" />
              STUDENT
            </Badge>
          )}

          <Button
            variant="destructive"
            size="sm"
            onClick={handleLeave}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs h-8 px-3 shadow-sm transition-colors"
          >
            <PhoneOff className="w-3.5 h-3.5 mr-1.5" />
            Leave Session
          </Button>
        </div>
      </header>

      {/* Video Viewport */}
      <main className="flex-1 p-2 sm:p-4 bg-slate-100 flex flex-col min-h-0">
        <div className="w-full h-full bg-slate-950 rounded-lg overflow-hidden border border-slate-800 shadow-inner relative flex items-center justify-center">
          {!isJitsiReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-slate-950 text-white z-10">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
              <p className="text-xs font-mono tracking-wider text-slate-300">
                Initializing WebRTC SFU Audio & Video Streams...
              </p>
            </div>
          )}
          <div
            id="jitsi-container"
            ref={jitsiContainerRef}
            className="w-full h-full relative"
          />
        </div>
      </main>
    </div>
  );
}
