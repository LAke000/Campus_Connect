import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServerClient } from "@supabase/ssr";

interface CreateRoomPayload {
  hostId?: string;
  title?: string;
  department?: string;
}

function getDeptCode(department?: string): string {
  if (!department) return "cs";
  const normalized = department.trim().toLowerCase();
  if (normalized.includes("computer") || normalized === "cs" || normalized.includes("cse")) {
    return "cs";
  }
  if (normalized.includes("electric") || normalized.includes("ee") || normalized.includes("ece")) {
    return "ec";
  }
  if (normalized.includes("mechan") || normalized.includes("me")) {
    return "me";
  }
  if (normalized.includes("civil") || normalized.includes("ce")) {
    return "ce";
  }
  if (normalized.includes("math")) {
    return "math";
  }
  const clean = normalized.replace(/[^a-z0-9]/g, "").slice(0, 4);
  return clean || "cs";
}

function generateRoomSlug(department?: string): string {
  const deptCode = getDeptCode(department);
  const randomChars = crypto.randomBytes(3).toString("hex").toLowerCase(); // 6 hex characters
  return `campus-${deptCode}-${randomChars}`;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Initialize Supabase Server Client with cookie store
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll() {
          // No-op for read operations in Route Handlers
        },
      },
    });

    // 2. Verify authentication using cookies or Bearer token fallback
    let authenticatedUserId: string | null = null;
    let authUserMetadataName: string | null = null;

    const {
      data: { user: cookieUser },
    } = await supabase.auth.getUser();

    if (cookieUser) {
      authenticatedUserId = cookieUser.id;
      authUserMetadataName = cookieUser.user_metadata?.full_name || null;
    } else {
      const authHeader = req.headers.get("authorization");
      const token = authHeader ? authHeader.replace(/^Bearer\s+/i, "") : null;

      if (token) {
        const {
          data: { user: tokenUser },
          error: tokenAuthError,
        } = await supabase.auth.getUser(token);

        if (!tokenAuthError && tokenUser) {
          authenticatedUserId = tokenUser.id;
          authUserMetadataName = tokenUser.user_metadata?.full_name || null;
        }
      }
    }

    if (!authenticatedUserId) {
      return NextResponse.json(
        { error: "Unauthorized. An active session is required." },
        { status: 401 }
      );
    }

    // 3. Parse request payload
    let body: CreateRoomPayload = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const { hostId, title, department } = body;
    const targetHostId = hostId || authenticatedUserId;
    const targetDept = department?.trim() || "Computer Science";
    const roomTitle = title?.trim() || "1-on-1 Live Doubt Clearing";

    // 4. Fetch host's full name from profiles (with fallbacks)
    let hostName = authUserMetadataName || "Campus Host";

    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", targetHostId)
        .maybeSingle();

      if (profileData?.full_name) {
        hostName = profileData.full_name;
      } else {
        const { data: userData } = await supabase
          .from("users")
          .select("full_name")
          .eq("id", targetHostId)
          .maybeSingle();

        if (userData?.full_name) {
          hostName = userData.full_name;
        }
      }
    } catch (profileFetchError) {
      console.warn("Could not fetch profile full_name:", profileFetchError);
    }

    // 5. Generate unique, collision-resistant room slug
    const roomSlug = generateRoomSlug(targetDept);

    // 6. Insert record into doubt_rooms table
    const { data: roomData, error: insertError } = await supabase
      .from("doubt_rooms")
      .insert({
        room_slug: roomSlug,
        title: roomTitle,
        host_id: targetHostId,
        host_name: hostName,
        department: targetDept,
        status: "active",
      })
      .select("room_slug")
      .single();

    if (insertError) {
      console.error("Failed to insert doubt room into database:", insertError);
      return NextResponse.json(
        {
          error: "Failed to create doubt room.",
          details: insertError.message,
        },
        { status: 500 }
      );
    }

    const createdSlug = roomData?.room_slug || roomSlug;

    // 7. Return standard success response
    return NextResponse.json(
      {
        success: true,
        roomSlug: createdSlug,
        redirectUrl: `/doubts/${createdSlug}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unhandled error in /api/rooms/create:", error);
    return NextResponse.json(
      {
        error: "Internal server error occurred while creating doubt room.",
      },
      { status: 500 }
    );
  }
}
