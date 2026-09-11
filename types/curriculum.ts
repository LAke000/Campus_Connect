/**
 * ============================================================================
 * Enterprise University Taxonomy & Curriculum Data Models
 * Inspired by Lovely Professional University (LPU) Academic Architecture
 * ============================================================================
 * 
 * 6-Tier Hierarchical Taxonomy:
 * 1. FacultyCategory (Core academic faculties/disciplines)
 * 2. DegreeCourse (B.Tech, M.Tech, MBA, BCA, B.Pharm, Ph.D., etc.)
 * 3. SpecializationBranch (CSE, AI & ML, Data Science, ECE, ME, CE, etc.)
 * 4. AcademicYear (1st, 2nd, 3rd, 4th Year)
 * 5. Subject (ID, Code, Name, Credits, Semester, Chapters)
 * 6. Chapter (ID, Number, Title, Description, QuizQuestions)
 * 
 * Sub-tier:
 * - QuizQuestion (ID, Question, CodeSnippet, 4-tuple Options, CorrectIndex, Explanation, Difficulty)
 */

export type QuizDifficulty = "Easy" | "Medium" | "Hard";

/**
 * Enforces strictly 4 multiple-choice options for CBT/OAS exams.
 */
export type QuizOptions = [string, string, string, string];

/**
 * Tier 6 (Sub-tier): Atomic assessment unit for CBT & Diagnostic practice.
 */
export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: QuizOptions;
  correctAnswerIndex: 0 | 1 | 2 | 3;
  explanation: string;
  difficulty: QuizDifficulty;
}

/**
 * Tier 6: Modular chapter / syllabus module within a course subject.
 */
export interface Chapter {
  id: string;
  number: number;
  /** Backwards compatibility alias for `number` */
  chapterNumber?: number;
  title: string;
  description: string;
  questions: QuizQuestion[];
  /** Backwards compatibility alias for `questions` */
  quizQuestions?: QuizQuestion[];
  hasContent?: boolean;
}

/**
 * Tier 5: Subject / Course Unit with credit weighting, semester allocation, and syllabus units.
 */
export interface Subject {
  id: string;
  code: string; // e.g., "CSE205", "ECE213", "MEC107", "CHE110"
  name: string;
  credits: number;
  semester: number; // 1 through 8
  chapters: Chapter[];
  description?: string;
  hasContent?: boolean;
}

/**
 * Valid Academic Year levels for undergraduate / postgraduate curricula.
 */
export type AcademicYearNumber = 1 | 2 | 3 | 4;

/**
 * Tier 4: Academic progression level with mapped semesters and prescribed subjects.
 */
export interface AcademicYear {
  id?: string;
  year: AcademicYearNumber;
  label: string; // e.g., "1st Year (Freshman)", "Year 2"
  semesters: number[] | string[]; // e.g., [1, 2] or ["Semester 1", "Semester 2"]
  subjects: Subject[];
  hasContent?: boolean;
}

/**
 * Strict enumeration of supported B.Tech specializations under "Engineering & Technology".
 */
export type BTechSpecializationCode =
  | "CSE"
  | "AI_ML"
  | "DATA_SCIENCE"
  | "ECE"
  | "ME"
  | "CE"
  | "AEROSPACE"
  | "BIOTECH";

/**
 * Tier 3: Specialization stream or academic branch (e.g., Computer Science & Engineering).
 */
export interface SpecializationBranch {
  id: string;
  code: string; // e.g., "CSE", "AI_ML", "DATA_SCIENCE", "ECE", "ME", "CE", "AERO", "BT"
  name: string; // e.g., "Computer Science & Engineering (CSE)"
  shortName: string; // e.g., "CSE", "AI & ML", "Data Science", "ECE", "ME", "CE", "Aerospace", "Biotechnology"
  degreeCode?: string; // e.g., "B.Tech"
  facultyDomain?: FacultyDomain;
  description?: string;
  academicYears: AcademicYear[];
  /** Backwards compatibility alias for `academicYears` */
  years?: AcademicYear[];
  hasContent: boolean;
}

/**
 * Valid Degree & Qualification Programs.
 */
export type DegreeCode =
  | "B.Tech"
  | "M.Tech"
  | "MBA"
  | "BBA"
  | "BCA"
  | "MCA"
  | "B.Sc"
  | "M.Sc"
  | "B.Pharm"
  | "M.Pharm"
  | "B.Des"
  | "LL.B"
  | "Ph.D."
  | string;

/**
 * Tier 2: Degree qualification course (e.g., B.Tech, M.Tech, MBA, BCA, B.Pharm, Ph.D.).
 */
export interface DegreeCourse {
  id: string;
  code: DegreeCode;
  name: string; // e.g., "Bachelor of Technology", "Master of Business Administration"
  facultyDomain: FacultyDomain;
  durationYears: number;
  specializations: SpecializationBranch[];
  /** Backwards compatibility alias for `specializations` */
  programs?: SpecializationBranch[];
  hasContent: boolean;
}

/**
 * The 6 Core Academic Domains of Lovely Professional University (LPU).
 */
export type FacultyDomain =
  | "Engineering & Technology"
  | "Management & Business"
  | "Computer Applications & IT"
  | "Sciences & Humanities"
  | "Law, Pharmacy & Design"
  | "Doctoral Studies (Ph.D.)";

export const FACULTY_DOMAINS: readonly FacultyDomain[] = [
  "Engineering & Technology",
  "Management & Business",
  "Computer Applications & IT",
  "Sciences & Humanities",
  "Law, Pharmacy & Design",
  "Doctoral Studies (Ph.D.)"
] as const;

/**
 * Tier 1: Top-level Faculty Category covering core academic domains.
 */
export interface FacultyCategory {
  id: string;
  name: FacultyDomain;
  code: string; // e.g., "FOET", "FOBM", "FOCA", "FOSH", "FOLPD", "FODS"
  tagline?: string;
  degreeCourses: DegreeCourse[];
  hasContent: boolean;
}

/**
 * Root University Taxonomy Container.
 */
export interface UniversityTaxonomy {
  institution: string; // "Lovely Professional University (LPU)"
  version: string;
  faculties: FacultyCategory[];
}

/**
 * ── Backwards Compatibility Types & Aliases ────────────────────────
 */
export type CourseCategory = "Technical" | "Management" | "Sciences" | "Doctoral";

export interface Program extends SpecializationBranch {
  specialization?: string;
}

export interface Course extends DegreeCourse {
  category?: CourseCategory;
}

/**
 * ── Helper Utility Types & Resolvers ───────────────────────────────
 */

/**
 * Null-safe count helper for questions in any chapter.
 */
export function getChapterQuestionCount(chapter: Chapter): number {
  if (chapter.questions && Array.isArray(chapter.questions)) {
    return chapter.questions.length;
  }
  if (chapter.quizQuestions && Array.isArray(chapter.quizQuestions)) {
    return chapter.quizQuestions.length;
  }
  return 0;
}

/**
 * Null-safe question retriever for any chapter.
 */
export function getChapterQuestions(chapter: Chapter): QuizQuestion[] {
  if (chapter.questions && Array.isArray(chapter.questions)) {
    return chapter.questions;
  }
  if (chapter.quizQuestions && Array.isArray(chapter.quizQuestions)) {
    return chapter.quizQuestions;
  }
  return [];
}

/**
 * Check if a subject has active questions for quizzes.
 */
export function subjectHasActiveQuiz(subject: Subject): boolean {
  if (!subject.chapters || subject.chapters.length === 0) return false;
  return subject.chapters.some((ch) => getChapterQuestionCount(ch) > 0);
}

/**
 * Check if a branch has active quiz content.
 */
export function branchHasActiveQuiz(branch: SpecializationBranch): boolean {
  if (!branch.hasContent) return false;
  const years = branch.academicYears || branch.years || [];
  return years.some((yr) =>
    yr.subjects.some((sub) => subjectHasActiveQuiz(sub))
  );
}

