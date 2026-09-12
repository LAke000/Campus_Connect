// ============================================================
// Campus Connect — Strict TypeScript Types for Student Dashboard
// ============================================================

export type ReminderModule =
  | "quizzes"
  | "library"
  | "cabins"
  | "pods";

export type ReminderUrgency = "critical" | "moderate" | "low";

export interface LandmarkSlide {
  id: string;
  title: string;
  tag: string;
  description: string;
  imageUrl: string;
  actionLabel: string;
  actionHref: string;
  badgeBg?: string;
}

export interface ReminderItem {
  id: string;
  title: string;
  module: ReminderModule;
  moduleLabel: string;
  dueDate: string; // ISO string or human formatted
  dueTime: string; // e.g. "05:00 PM"
  urgency: ReminderUrgency;
  completed?: boolean;
}

export interface LibraryRecentItem {
  id: string;
  title: string;
  subjectCode: string;
  chapterOrSection: string;
  lastOpenedTimestamp: string;
  progressPercent: number;
  readUrl: string;
}

export interface QuizProgressItem {
  id: string;
  title: string;
  subjectCode: string;
  yearProgram: string;
  currentScore: number;
  totalQuestions: number;
  progressPercent: number;
  lastActive: string;
  continueUrl: string;
}

export interface DoubtSessionHistoryItem {
  id: string;
  hostName: string;
  hostRole: "Professor" | "Associate Professor" | "Senior Peer Mentor";
  location: string;
  topic: string;
  status: "resolved" | "no_show" | "scheduled";
  date: string;
  time: string;
  followUpHref: string;
}

export interface UserPlatformMetrics {
  karmaPoints: number;
  dswHours: number;
  lmsSyncStatus: "synced" | "syncing" | "pending";
  lmsLastSyncedAt: string;
  completedQuizzesCount: number;
  libraryNotesReadCount: number;
  resolvedDoubtsCount: number;
}
