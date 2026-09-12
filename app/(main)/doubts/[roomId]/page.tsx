"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const supabase = createClient();
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
  const [mediaState, setMediaState] = useState<
    "pending" | "prompt" | "requesting" | "granted" | "denied" | "not_found" | "not_readable" | "bypassed"
  >("pending");
  const [mediaBypassConfig, setMediaBypassConfig] = useState({ videoMuted: false, audioMuted: false });

  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<any>(null);

  // Pre-flight Media Access Guard with Robust Device Detection
  const handleRequestMediaAccess = async () => {
    setMediaState("requesting");
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      setMediaState("not_found");
      return;
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasVideo = devices.some((d) => d.kind === "videoinput");
      const hasAudio = devices.some((d) => d.kind === "audioinput");

      if (!hasVideo && !hasAudio) {
        setMediaState("not_found");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: hasVideo,
        audio: hasAudio,
      });

      // Stop tracks immediately as we just need browser permission granted
      stream.getTracks().forEach((track) => track.stop());
      setMediaState("granted");
      // Mute inherently missing hardware
      setMediaBypassConfig({ videoMuted: !hasVideo, audioMuted: !hasAudio });
    } catch (err: any) {
      console.error("Media error:", err.name, err.message);
      if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setMediaState("not_found");
      } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
        setMediaState("not_readable");
      } else {
        setMediaState("denied");
      }
    }
  };

  const handleBypassListenOnly = () => {
    setMediaBypassConfig({ videoMuted: true, audioMuted: true });
    setMediaState("bypassed");
  };

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
          setMediaState("prompt");
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
    if (loading || !roomData || (mediaState !== "granted" && mediaState !== "bypassed")) return;

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
  }, [loading, roomData, mediaState]);

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
        startWithAudioMuted: mediaBypassConfig.audioMuted,
        startWithVideoMuted: mediaBypassConfig.videoMuted,
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

      // Fix: Explicitly allow WebRTC media pass-through on the embedded iframe to resolve permission errors
      const iframe = api.getIFrame();
      if (iframe) {
        iframe.setAttribute(
          "allow",
          "camera *; microphone *; display-capture *; autoplay *; fullscreen *"
        );
      }

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

  if (loading || errorMsg || (mediaState !== "granted" && mediaState !== "bypassed")) {
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
        ) : loading || mediaState === "pending" ? (
          <div className="flex flex-col items-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-slate-900" />
            <p className="text-sm font-semibold text-slate-700">Connecting to secure doubt room...</p>
            <p className="font-mono text-xs text-slate-400 uppercase tracking-widest">{roomId}</p>
          </div>
        ) : mediaState === "denied" ? (
          <div className="flex flex-col items-center space-y-4 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-md max-w-md text-center">
            <div className="bg-rose-50 p-4 rounded-xl text-rose-600">
              <AlertCircle className="size-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Camera & Audio Blocked</h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                Your browser has blocked access to your camera and microphone. Please click the lock icon in your URL bar, allow permissions for this site, and try again.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full mt-2">
              <Button
                onClick={handleRequestMediaAccess}
                className="w-full text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={handleBypassListenOnly}
                className="w-full text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors border-slate-200 bg-white"
              >
                Continue Without Camera
              </Button>
            </div>
          </div>
        ) : mediaState === "not_found" ? (
           <div className="flex flex-col items-center space-y-4 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-md max-w-md text-center">
            <div className="bg-amber-50 p-4 rounded-xl text-amber-600">
              <PhoneOff className="size-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Media Devices Missing</h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                We couldn't detect a functioning camera or microphone connected to your device. You can still join using audio or listen-only mode.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full mt-2">
              <Button
                onClick={handleBypassListenOnly}
                className="w-full text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
              >
                Join in Listen-Only Mode
              </Button>
              <Button
                variant="outline"
                onClick={handleRequestMediaAccess}
                className="w-full text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors border-slate-200 bg-white"
              >
                Retry Hardware Discovery
              </Button>
            </div>
          </div>
        ) : mediaState === "not_readable" ? (
          <div className="flex flex-col items-center space-y-4 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-md max-w-md text-center">
            <div className="bg-amber-50 p-4 rounded-xl text-amber-600">
              <AlertCircle className="size-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Camera In Use</h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                Your webcam or microphone is currently being used by another application (like Zoom or Teams). Close the other app and try again.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full mt-2">
              <Button
                onClick={handleRequestMediaAccess}
                className="w-full text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={handleBypassListenOnly}
                className="w-full text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors border-slate-200 bg-white"
              >
                Join Without Camera
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-md max-w-md text-center">
            <div className="bg-slate-100 p-4 rounded-xl text-slate-700">
              <Video className="size-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Camera & Audio Setup</h2>
              <p className="text-sm text-slate-500 mt-2 font-medium">
                Campus Connect requires access to your camera and microphone to connect you to the live doubt session.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full mt-2">
              <Button
                onClick={handleRequestMediaAccess}
                disabled={mediaState === "requesting"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-sm active:scale-[0.98] py-2 h-auto"
              >
                {mediaState === "requesting" ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Requesting Access...
                  </>
                ) : (
                  "Allow Camera & Microphone"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleBypassListenOnly}
                className="w-full text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors border-slate-200 bg-white"
              >
                Continue Without Camera
              </Button>
            </div>
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
