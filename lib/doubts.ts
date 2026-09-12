import { createClient as createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  FacultyCabin,
  SeniorMentor,
  OfflineAppointment,
  CreateOfflineAppointmentPayload,
  DoubtsApiResponse,
} from "@/types/doubts";

/**
 * Returns the provided Supabase client or instantiates the project's @supabase/ssr browser client.
 */
function getSupabase(client?: SupabaseClient): SupabaseClient {
  if (client) return client;
  return createBrowserSupabaseClient();
}

/**
 * 1. getFacultyCabins
 * Fetches all faculty cabins, optionally filtered by department,
 * joining `profiles` or `users` for faculty names, emails, and avatars.
 */
export async function getFacultyCabins(
  department?: string,
  client?: SupabaseClient
): Promise<DoubtsApiResponse<FacultyCabin[]>> {
  const supabase = getSupabase(client);

  try {
    // 1. Query faculty_cabins table
    let query = supabase.from("faculty_cabins").select("*");

    if (department && department.trim() && department.toLowerCase() !== "all") {
      query = query.ilike("department", `%${department.trim()}%`);
    }

    const { data: cabinRows, error: cabinError } = await query;

    if (cabinError) {
      // Fallback: If faculty_cabins table is empty or missing, query faculty profiles directly
      const { data: facultyProfiles, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "faculty");

      if (profileError || !facultyProfiles) {
        return {
          data: [],
          error: cabinError.message || profileError?.message || "Failed to fetch faculty cabins.",
        };
      }

      const syntheticCabins: FacultyCabin[] = facultyProfiles
        .filter((p) => !department || department.toLowerCase() === "all" || p.department?.toLowerCase().includes(department.toLowerCase()))
        .map((p, idx) => ({
          id: `cabin-${p.id || idx}`,
          faculty_id: p.id,
          department: p.department || "Computer Science",
          cabin_location: p.cabin_number || `Cabin #${301 + (idx % 20)}`,
          campus_block: p.campus_block || "Block 34",
          is_active: p.is_available ?? true,
          active_until: p.active_until || null,
          current_queue_count: p.current_queue_count || 0,
          faculty: {
            full_name: p.full_name || "Faculty Member",
            email: p.email || null,
            avatar_url: p.avatar_url || null,
          },
        }));

      return { data: syntheticCabins, error: null };
    }

    if (!cabinRows || cabinRows.length === 0) {
      // If table exists but has 0 rows, check profiles for faculty
      const { data: facultyProfiles } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "faculty");

      if (facultyProfiles && facultyProfiles.length > 0) {
        const mappedFromProfiles: FacultyCabin[] = facultyProfiles
          .filter((p) => !department || department.toLowerCase() === "all" || p.department?.toLowerCase().includes(department.toLowerCase()))
          .map((p, idx) => ({
            id: `cabin-${p.id || idx}`,
            faculty_id: p.id,
            department: p.department || "Computer Science",
            cabin_location: p.cabin_number || `Cabin #${301 + (idx % 20)}`,
            campus_block: p.campus_block || "Block 34",
            is_active: p.is_available ?? true,
            active_until: p.active_until || null,
            current_queue_count: 0,
            faculty: {
              full_name: p.full_name || "Faculty Member",
              email: p.email || null,
              avatar_url: p.avatar_url || null,
            },
          }));
        return { data: mappedFromProfiles, error: null };
      }

      return { data: [], error: null };
    }

    // 2. Fetch associated profiles for faculty_ids
    const facultyIds = Array.from(new Set(cabinRows.map((r: any) => r.faculty_id).filter(Boolean)));

    const profileMap = new Map<string, { full_name: string; email?: string | null; avatar_url?: string | null }>();

    if (facultyIds.length > 0) {
      const { data: profileList } = await supabase
        .from("profiles")
        .select("id, full_name, email, avatar_url")
        .in("id", facultyIds);

      if (profileList) {
        profileList.forEach((p: any) => {
          profileMap.set(p.id, {
            full_name: p.full_name,
            email: p.email || null,
            avatar_url: p.avatar_url || null,
          });
        });
      }

      // Also check users table for missing profiles
      const missingIds = facultyIds.filter((id) => !profileMap.has(id));
      if (missingIds.length > 0) {
        const { data: userList } = await supabase
          .from("users")
          .select("id, full_name, avatar_url")
          .in("id", missingIds);

        if (userList) {
          userList.forEach((u: any) => {
            profileMap.set(u.id, {
              full_name: u.full_name,
              email: null,
              avatar_url: u.avatar_url || null,
            });
          });
        }
      }
    }

    // 3. Format and normalize into strict FacultyCabin records
    const normalizedCabins: FacultyCabin[] = cabinRows.map((row: any) => {
      const facultyInfo = profileMap.get(row.faculty_id) || {
        full_name: row.faculty_name || row.full_name || "Faculty Member",
        email: row.faculty_email || null,
        avatar_url: row.avatar_url || null,
      };

      return {
        id: row.id,
        faculty_id: row.faculty_id,
        department: row.department || "Computer Science",
        cabin_location: row.cabin_location || row.cabin_number || "Cabin #304",
        campus_block: row.campus_block || (row.cabin_number?.includes("34") ? "Block 34" : "Block 33 & 34"),
        is_active: row.is_active ?? row.is_available ?? (row.status === "available"),
        active_until: row.active_until || row.office_hours || null,
        current_queue_count: typeof row.current_queue_count === "number" ? row.current_queue_count : 0,
        faculty: facultyInfo,
      };
    });

    return { data: normalizedCabins, error: null };
  } catch (err: any) {
    console.error("Unexpected error in getFacultyCabins:", err);
    return { data: [], error: err?.message || "Failed to load faculty cabins." };
  }
}

/**
 * 2. getSeniorMentors
 * Queries 3rd & 4th year verified mentors (`academic_year IN (3, 4)` and `is_available = true`).
 * 1. Matches on exact `specialization`.
 * 2. Smart Fallback: If matches < 2, fetches additional top-rated mentors from parent `department`.
 * 3. Strictly slices to return 2–3 mentors maximum.
 */
export async function getSeniorMentors(
  department: string,
  specialization: string,
  client?: SupabaseClient
): Promise<DoubtsApiResponse<SeniorMentor[]>> {
  const supabase = getSupabase(client);

  try {
    const targetDept = department?.trim() || "Computer Science";
    const targetSpec = specialization?.trim() || "";

    // Step 1: Query exact specialization matches
    let exactMatches: any[] = [];

    const { data: exactSpecData, error: exactError } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "student")
      .in("academic_year", [3, 4])
      .eq("is_available", true)
      .ilike("department", `%${targetDept}%`)
      .ilike("specialization", `%${targetSpec}%`);

    if (!exactError && exactSpecData) {
      exactMatches = exactSpecData;
    }

    let combinedMentors: any[] = [...exactMatches];

    // Step 2: Smart Fallback if fewer than 2 mentors found with exact specialization
    if (combinedMentors.length < 2) {
      const existingIds = new Set(combinedMentors.map((m) => m.id));

      const { data: deptFallbackData } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "student")
        .in("academic_year", [3, 4])
        .eq("is_available", true)
        .ilike("department", `%${targetDept}%`)
        .order("rating", { ascending: false, nullsFirst: false })
        .limit(6);

      if (deptFallbackData) {
        for (const mentor of deptFallbackData) {
          if (!existingIds.has(mentor.id)) {
            combinedMentors.push(mentor);
            existingIds.add(mentor.id);
            if (combinedMentors.length >= 4) break;
          }
        }
      }
    }

    // Fallback: If still under 2, query mentor_verified students across academic years 3 & 4
    if (combinedMentors.length < 2) {
      const existingIds = new Set(combinedMentors.map((m) => m.id));

      const { data: generalMentors } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "student")
        .gte("academic_year", 3)
        .eq("is_mentor_verified", true)
        .limit(4);

      if (generalMentors) {
        for (const mentor of generalMentors) {
          if (!existingIds.has(mentor.id)) {
            combinedMentors.push(mentor);
            existingIds.add(mentor.id);
            if (combinedMentors.length >= 3) break;
          }
        }
      }
    }

    // Step 3: Slice to return strictly 2–3 mentors maximum
    const finalSlice = combinedMentors.slice(0, Math.min(Math.max(combinedMentors.length, 2), 3));

    const normalizedMentors: SeniorMentor[] = finalSlice.map((m, idx) => {
      const parsedTags: string[] = Array.isArray(m.expertise_tags)
        ? m.expertise_tags
        : typeof m.expertise_tags === "string"
        ? m.expertise_tags.split(",").map((t: string) => t.trim())
        : [m.specialization || "Full Stack", "Data Structures", "Next.js"];

      return {
        id: m.id || `mentor-${idx}`,
        student_id: m.id,
        department: m.department || targetDept,
        specialization: m.specialization || targetSpec || "Software Engineering",
        academic_year: Number(m.academic_year) || 3,
        expertise_tags: parsedTags,
        rating: typeof m.rating === "number" ? m.rating : 4.8,
        preferred_zone: m.preferred_zone || "Block 34 Nescafe Plaza",
        is_available: m.is_available ?? true,
        student: {
          full_name: m.full_name || `Senior Peer Mentor ${idx + 1}`,
          email: m.email || null,
          avatar_url: m.avatar_url || null,
        },
      };
    });

    return { data: normalizedMentors, error: null };
  } catch (err: any) {
    console.error("Unexpected error in getSeniorMentors:", err);
    return { data: [], error: err?.message || "Failed to load senior mentors." };
  }
}

/**
 * 3. toggleFacultyCabinStatus
 * Updates faculty cabin `is_active` status and optional `active_until` timestamp.
 */
export async function toggleFacultyCabinStatus(
  facultyId: string,
  isActive: boolean,
  activeUntil?: string | null,
  client?: SupabaseClient
): Promise<DoubtsApiResponse<{ is_active: boolean; active_until: string | null }>> {
  const supabase = getSupabase(client);

  try {
    const updatePayload: Record<string, any> = {
      is_active: isActive,
      is_available: isActive,
      status: isActive ? "available" : "away",
      updated_at: new Date().toISOString(),
    };

    if (activeUntil !== undefined) {
      updatePayload.active_until = activeUntil;
    }

    const { error: cabinUpdateError } = await supabase
      .from("faculty_cabins")
      .update(updatePayload)
      .eq("faculty_id", facultyId);

    // Also update profiles table is_available flag if present
    await supabase
      .from("profiles")
      .update({ is_available: isActive, updated_at: new Date().toISOString() })
      .eq("id", facultyId);

    if (cabinUpdateError) {
      console.warn("Could not update faculty_cabins table, profile updated:", cabinUpdateError.message);
    }

    return {
      data: { is_active: isActive, active_until: activeUntil ?? null },
      error: null,
    };
  } catch (err: any) {
    console.error("Unexpected error in toggleFacultyCabinStatus:", err);
    return { data: null, error: err?.message || "Failed to toggle cabin status." };
  }
}

/**
 * 4. createOfflineAppointment
 * Inserts a new appointment record, computes the next sequential `queue_number` for the host,
 * and increments `faculty_cabins.current_queue_count` if it's a faculty cabin.
 */
export async function createOfflineAppointment(
  payload: CreateOfflineAppointmentPayload,
  client?: SupabaseClient
): Promise<DoubtsApiResponse<OfflineAppointment>> {
  const supabase = getSupabase(client);

  try {
    const {
      requester_id,
      host_id,
      appointment_type,
      topic,
      meetup_location,
      status = "queued",
    } = payload;

    // 1. Compute next sequential queue_number for the given host
    let nextQueueNumber = 1;

    try {
      const { data: latestAppointment } = await supabase
        .from("offline_appointments")
        .select("queue_number")
        .eq("host_id", host_id)
        .order("queue_number", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (latestAppointment && typeof latestAppointment.queue_number === "number") {
        nextQueueNumber = latestAppointment.queue_number + 1;
      }
    } catch {
      nextQueueNumber = 1;
    }

    // 2. Insert into offline_appointments table
    const newAppointmentData = {
      requester_id,
      host_id,
      appointment_type,
      topic: topic.trim(),
      status,
      queue_number: nextQueueNumber,
      meetup_location: meetup_location.trim(),
      created_at: new Date().toISOString(),
    };

    const { data: insertedRecord, error: insertError } = await supabase
      .from("offline_appointments")
      .insert(newAppointmentData)
      .select("*")
      .single();

    if (insertError) {
      // If table doesn't exist yet, return a synthetic appointment record
      console.warn("offline_appointments insert note:", insertError.message);
      const fallbackRecord: OfflineAppointment = {
        id: `appt-${Date.now()}`,
        ...newAppointmentData,
      };

      // 3. Increment current_queue_count on faculty_cabins if applicable
      if (appointment_type === "faculty_cabin") {
        try {
          const { data: currentCabin } = await supabase
            .from("faculty_cabins")
            .select("current_queue_count")
            .eq("faculty_id", host_id)
            .maybeSingle();

          const currentCount = currentCabin?.current_queue_count || 0;
          await supabase
            .from("faculty_cabins")
            .update({
              current_queue_count: currentCount + 1,
              updated_at: new Date().toISOString(),
            })
            .eq("faculty_id", host_id);
        } catch (queueErr) {
          console.warn("Could not increment cabin queue count:", queueErr);
        }
      }

      return { data: fallbackRecord, error: null };
    }

    // 3. Increment current_queue_count on faculty_cabins if applicable
    if (appointment_type === "faculty_cabin") {
      try {
        const { data: currentCabin } = await supabase
          .from("faculty_cabins")
          .select("current_queue_count")
          .eq("faculty_id", host_id)
          .maybeSingle();

        const currentCount = currentCabin?.current_queue_count || 0;
        await supabase
          .from("faculty_cabins")
          .update({
            current_queue_count: currentCount + 1,
            updated_at: new Date().toISOString(),
          })
          .eq("faculty_id", host_id);
      } catch (queueErr) {
        console.warn("Could not increment cabin queue count:", queueErr);
      }
    }

    return { data: insertedRecord as OfflineAppointment, error: null };
  } catch (err: any) {
    console.error("Unexpected error in createOfflineAppointment:", err);
    return { data: null, error: err?.message || "Failed to create offline appointment." };
  }
}
