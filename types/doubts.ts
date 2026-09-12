// ============================================================
// Campus Connect — Strict TypeScript Types for Offline Doubts
// ============================================================

export type AppointmentType = "faculty_cabin" | "mentor_meetup";

export type AppointmentStatus =
  | "queued"
  | "in_progress"
  | "completed"
  | "cancelled";

/** Profile details for faculty members */
export interface FacultyProfile {
  full_name: string;
  email?: string | null;
  avatar_url?: string | null;
}

/** Profile details for student senior mentors */
export interface StudentProfile {
  full_name: string;
  email?: string | null;
  avatar_url?: string | null;
}

/**
 * 1. Faculty Cabin
 * Represents in-person faculty cabin availability, location, and active queue.
 */
export interface FacultyCabin {
  id: string;
  faculty_id: string;
  department: string;
  cabin_location: string;
  campus_block: string;
  is_active: boolean;
  active_until: string | null;
  current_queue_count: number;
  faculty: FacultyProfile;
}

/**
 * 2. Senior Mentor
 * Represents 3rd & 4th year verified student mentors available for 1-on-1 offline meetups.
 */
export interface SeniorMentor {
  id: string;
  student_id: string;
  department: string;
  specialization: string;
  academic_year: number;
  expertise_tags: string[];
  rating: number;
  preferred_zone: string;
  is_available: boolean;
  student: StudentProfile;
}

/**
 * 3. Offline Appointment
 * Represents a queued or active offline session with a faculty member or senior mentor.
 */
export interface OfflineAppointment {
  id: string;
  requester_id: string;
  host_id: string;
  appointment_type: AppointmentType | string;
  topic: string;
  status: AppointmentStatus | string;
  queue_number: number;
  meetup_location: string;
  created_at: string;
  requester?: StudentProfile;
  host?: FacultyProfile | StudentProfile;
}

/**
 * Input payload for scheduling/queuing a new offline doubt session.
 */
export interface CreateOfflineAppointmentPayload {
  requester_id: string;
  host_id: string;
  appointment_type: AppointmentType | string;
  topic: string;
  meetup_location: string;
  status?: AppointmentStatus | string;
}

/** Standard API / Helper Response Wrapper */
export interface DoubtsApiResponse<T> {
  data: T | null;
  error: string | null;
}
