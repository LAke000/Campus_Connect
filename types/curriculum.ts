/**
 * ============================================================
 * LPU B.Tech CSE Practice Quiz & Curriculum Architecture
 * Strict TypeScript Type Definitions
 * ============================================================
 */

export type QuizDifficulty = "Easy" | "Medium" | "Hard";

export type CourseCategory = "Technical";

export type AcademicYearNumber = 1 | 2 | 3 | 4;

/**
 * Enforces exactly 4 multiple-choice options for competitive/CBT exams.
 */
export type QuizOptions = [string, string, string, string];

/**
 * Represents a single quiz question with optional code snippets and step-by-step explanations.
 */
export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: QuizOptions;
  correctAnswerIndex: 0 | 1 | 2 | 3 | number;
  explanation: string;
  difficulty: QuizDifficulty;
}

/**
 * Represents a modular chapter/syllabus unit within a course subject.
 */
export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  description: string;
  quizQuestions: QuizQuestion[];
}

/**
 * Represents an academic subject with credits and syllabus chapters (e.g., CSE205).
 */
export interface Subject {
  id: string;
  code: string; // e.g., "CSE205", "CSE316"
  name: string;
  credits: number;
  chapters: Chapter[];
}

/**
 * Represents an academic year (1 through 4) with associated semesters and subjects.
 */
export interface AcademicYear {
  year: AcademicYearNumber;
  label: string; // e.g., "1st Year (Freshman)", "Year 2"
  semesters: string[]; // e.g., ["Semester 1", "Semester 2"]
  subjects: Subject[];
}

/**
 * Represents an academic program/degree branch (e.g., B.Tech CSE Core).
 */
export interface Program {
  id: string;
  name: string;
  specialization: string; // e.g., "Core", "Full Stack Web Development", "AI & ML"
  years: AcademicYear[];
}

/**
 * Represents top-level course classification (e.g., B.Tech Technical).
 */
export interface Course {
  id: string;
  name: string;
  category: CourseCategory;
  programs: Program[];
}
