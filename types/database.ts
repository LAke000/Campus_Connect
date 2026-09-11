// ============================================================
// Campus Connect — Strict TypeScript Database Types
// Auto-mirrors: supabase/migrations/001_initial_schema.sql
// ============================================================

/** Shared UUID branded type (runtime: plain string) */
export type UUID = string;

// ── Enum-like unions matching CHECK constraints ──────────────

export type UserRole = "student" | "mentor" | "faculty";

export type SessionStatus = "open" | "active" | "completed";

export type ProjectDifficulty = "Easy" | "Medium" | "Hard";

export type FacultyCabinStatus =
  | "available"
  | "in_meeting"
  | "away"
  | "offline";

/** Shape stored in quiz_questions.options (JSONB) */
export type QuizOptionList = string[];

// ── Row interfaces (1 : 1 with database columns) ────────────

export interface User {
  id: UUID;
  full_name: string;
  role: UserRole;
  avatar_url: string | null;
  created_at: string; // ISO-8601 timestamptz
}

export interface Session {
  id: UUID;
  host_id: UUID;
  topic: string;
  scheduled_time: string;
  meeting_url: string | null;
  status: SessionStatus;
  created_at: string;
}

export interface Project {
  id: UUID;
  title: string;
  description: string;
  difficulty: ProjectDifficulty;
  points_awarded: number;
  created_at: string;
}

export interface StudentScore {
  id: UUID;
  student_id: UUID;
  project_id: UUID | null;
  score: number;
  updated_at: string;
}

export interface QuizQuestion {
  id: UUID;
  subject: string;
  question_text: string;
  options: QuizOptionList;
  correct_answer: string;
  points: number;
  created_at: string;
}

export interface QuizSubmission {
  id: UUID;
  student_id: UUID;
  question_id: UUID;
  selected_option: string;
  is_correct: boolean;
  created_at: string;
}

export interface LibraryNote {
  id: UUID;
  course_name: string;
  subject: string;
  title: string;
  file_url: string | null;
  content_markdown: string | null;
  lecture_date: string; // ISO-8601 date (YYYY-MM-DD)
  uploader_id: UUID | null;
  created_at: string;
}

export interface FacultyCabin {
  id: UUID;
  faculty_id: UUID;
  cabin_number: string;
  office_hours: string;
  is_available: boolean;
  status: FacultyCabinStatus;
  updated_at: string;
}

// ── Insert types (omit server-generated columns) ─────────────

export type UserInsert = Omit<User, "id" | "created_at"> & {
  id?: UUID;
  role?: UserRole;
  created_at?: string;
};

export type SessionInsert = Omit<Session, "id" | "created_at"> & {
  id?: UUID;
  scheduled_time?: string;
  status?: SessionStatus;
  created_at?: string;
};

export type ProjectInsert = Omit<Project, "id" | "created_at"> & {
  id?: UUID;
  difficulty?: ProjectDifficulty;
  points_awarded?: number;
  created_at?: string;
};

export type StudentScoreInsert = Omit<StudentScore, "id" | "updated_at"> & {
  id?: UUID;
  score?: number;
  updated_at?: string;
};

export type QuizQuestionInsert = Omit<QuizQuestion, "id" | "created_at"> & {
  id?: UUID;
  points?: number;
  created_at?: string;
};

export type QuizSubmissionInsert = Omit<QuizSubmission, "id" | "created_at"> & {
  id?: UUID;
  created_at?: string;
};

export type LibraryNoteInsert = Omit<LibraryNote, "id" | "created_at"> & {
  id?: UUID;
  created_at?: string;
};

export type FacultyCabinInsert = Omit<FacultyCabin, "id" | "updated_at"> & {
  id?: UUID;
  is_available?: boolean;
  status?: FacultyCabinStatus;
  updated_at?: string;
};

// ── Update types (all fields optional except id) ─────────────

export type UserUpdate = Partial<Omit<User, "id">> & { id: UUID };
export type SessionUpdate = Partial<Omit<Session, "id">> & { id: UUID };
export type ProjectUpdate = Partial<Omit<Project, "id">> & { id: UUID };
export type StudentScoreUpdate = Partial<Omit<StudentScore, "id">> & { id: UUID };
export type QuizQuestionUpdate = Partial<Omit<QuizQuestion, "id">> & { id: UUID };
export type QuizSubmissionUpdate = Partial<Omit<QuizSubmission, "id">> & { id: UUID };
export type LibraryNoteUpdate = Partial<Omit<LibraryNote, "id">> & { id: UUID };
export type FacultyCabinUpdate = Partial<Omit<FacultyCabin, "id">> & { id: UUID };

// ── Supabase-compatible Database type map ────────────────────

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: UserInsert;
        Update: Partial<Omit<User, "id">>;
      };
      sessions: {
        Row: Session;
        Insert: SessionInsert;
        Update: Partial<Omit<Session, "id">>;
      };
      projects: {
        Row: Project;
        Insert: ProjectInsert;
        Update: Partial<Omit<Project, "id">>;
      };
      student_scores: {
        Row: StudentScore;
        Insert: StudentScoreInsert;
        Update: Partial<Omit<StudentScore, "id">>;
      };
      quiz_questions: {
        Row: QuizQuestion;
        Insert: QuizQuestionInsert;
        Update: Partial<Omit<QuizQuestion, "id">>;
      };
      quiz_submissions: {
        Row: QuizSubmission;
        Insert: QuizSubmissionInsert;
        Update: Partial<Omit<QuizSubmission, "id">>;
      };
      library_notes: {
        Row: LibraryNote;
        Insert: LibraryNoteInsert;
        Update: Partial<Omit<LibraryNote, "id">>;
      };
      faculty_cabins: {
        Row: FacultyCabin;
        Insert: FacultyCabinInsert;
        Update: Partial<Omit<FacultyCabin, "id">>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
