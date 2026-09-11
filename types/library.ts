/**
 * ============================================================================
 * University Digital Library & Knowledge Vault Data Models
 * Strict TypeScript Type Definitions
 * ============================================================================
 */

export type BookDepartment =
  | "CSE"
  | "ECE"
  | "AI & ML"
  | "Data Science"
  | "Mechanical"
  | "Civil"
  | "Aerospace"
  | "Biotechnology"
  | "General Engineering"
  | "Management & Business";

export type AvailabilityStatus = "Available" | "Issued" | "Digital Only";

/**
 * Represents an academic textbook, reference manual, or research monograph.
 */
export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  coverImage: string;
  isbn: string;
  department: BookDepartment | string;
  pages: number;
  rating: number; // e.g., 4.8 / 5.0
  synopsis: string;
  publishYear: number;
  availabilityStatus: AvailabilityStatus;
  publisher?: string;
  edition?: string;
  tags?: string[];
  callNumber?: string; // e.g., "QA76.6 .C66 2022"
  downloadUrl?: string;
  fileSize?: string;
}

/**
 * Tracks a user's reading session, desk bookmarks, and reading progress.
 */
export interface UserBookInteraction {
  bookId: string;
  lastAccessedDate: string; // ISO string or human-readable (e.g. "2026-09-11T14:30:00Z")
  progressPercentage: number; // 0 to 100
  isBookmarkedOnDesk: boolean;
  currentPage?: number;
  totalReadingMinutes?: number;
  notesCount?: number;
  highlightCount?: number;
}

/**
 * Daily study ledger logging reading volume, topics mastered, and streak continuity.
 */
export interface DailyLearningLog {
  date: string; // YYYY-MM-DD
  topicsCovered: string[];
  minutesRead: number;
  streakDays: number;
}

/**
 * Enriched Book entity joined with active user interaction state.
 */
export interface BookWithInteraction extends Book {
  interaction?: UserBookInteraction;
}

/**
 * Desk / Reading Workspace summary metrics.
 */
export interface LibraryDeskSummary {
  totalBooksOnDesk: number;
  currentlyReadingCount: number;
  completedBooksCount: number;
  currentStreakDays: number;
  totalMinutesReadThisWeek: number;
  topDepartments: string[];
}
