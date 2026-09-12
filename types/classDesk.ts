// ============================================================
// Campus Connect — Strict TypeScript Types for Class Desk
// ============================================================

export type SlotType = "lecture" | "lab" | "tutorial";
export type AttendanceStatus = "present" | "absent" | "duty_leave" | "scheduled";

export interface TimetableSlot {
  id: string;
  courseCode: string;
  courseName: string;
  type: SlotType;
  startTime: string; // e.g. "09:00 AM"
  endTime: string;   // e.g. "09:50 AM"
  block: string;     // e.g. "Block 34"
  room: string;      // e.g. "Room 412"
  instructor: string;
  instructorCabin?: string;
  isHappeningNow?: boolean;
  isUpcoming?: boolean;
  timeRemainingMinutes?: number;
  attendanceStatus: AttendanceStatus;
}

export type AssessmentType = "assignment" | "class_test" | "teacher_eval" | "lab_eval";
export type SubmissionStatus = "submitted" | "graded" | "pending" | "overdue";

export interface ContinuousAssessment {
  id: string;
  courseCode: string;
  courseName: string;
  title: string;
  type: AssessmentType;
  typeLabel: string;
  maxMarks: number;
  obtainedMarks?: number;
  weightagePercent: number; // e.g. 10%
  dueDate: string;
  dueTime?: string;
  status: SubmissionStatus;
  promptDownloadUrl?: string;
  feedback?: string;
}

export interface LabManualRecord {
  id: string;
  courseCode: string;
  courseName: string;
  labNumber: number;
  title: string;
  experimentAim: string;
  block: string;
  room: string;
  status: "verified" | "submitted" | "in_progress" | "pending";
  grade?: string; // e.g. "A+"
  submissionDeadline: string;
  manualUrl?: string;
}

export interface TeacherAnnouncement {
  id: string;
  instructor: string;
  date: string;
  text: string;
  isImportant?: boolean;
}

export interface CourseProgress {
  courseCode: string;
  courseName: string;
  instructor: string;
  instructorCabin: string;
  currentUnit: number;
  totalUnits: number;
  syllabusPercent: number;
  completedTopicsCount: number;
  totalTopicsCount: number;
  nextMilestone: string;
  announcement?: TeacherAnnouncement;
}

export type ScribeRole = "CR" | "Section Lead" | "Core Team Member" | "Course Scribe" | "Admin";

export interface ScribeVerification {
  name: string;
  role: ScribeRole;
  section: string; // e.g. "Section K23AB"
  timestamp: string;
}

export interface ClassLectureNote {
  id: string;
  courseCode: string;
  courseName: string;
  lectureNumber: number;
  lectureDate: string; // e.g. "Sep 12, 2026"
  periodTime: string;  // e.g. "09:00 AM - 09:50 AM"
  topicCovered: string;
  associatedUnit: string; // e.g. "Unit 3: Memory Virtualization"
  isMissedClass: boolean; // True if student was absent/on leave
  missedReason?: string;  // e.g. "Marked Absent in UMS" | "Duty Leave Approved"
  verifiedBy: ScribeVerification;
  downloadUrl: string;
  summary: string;
  tags: string[];
  fileSize: string;
}

export interface AcademicResourceLink {
  id: string;
  title: string;
  category: "portal" | "datesheet" | "cabin" | "handbook";
  url: string;
  badge: string;
  description: string;
  isLive?: boolean;
}
