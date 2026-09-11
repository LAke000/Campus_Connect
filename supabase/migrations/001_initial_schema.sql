-- ============================================================
-- Campus Connect — Initial Schema Migration
-- Target: Supabase (PostgreSQL 15+)
-- Run in: Supabase SQL Editor or via supabase db push
-- ============================================================

-- 1. USERS
CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name   TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'student'
                CHECK (role IN ('student', 'mentor', 'faculty')),
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. SESSIONS (live peer-to-peer doubt calls)
CREATE TABLE IF NOT EXISTS sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic           TEXT NOT NULL,
  scheduled_time  TIMESTAMPTZ NOT NULL DEFAULT now(),
  meeting_url     TEXT,
  status          TEXT NOT NULL DEFAULT 'open'
                    CHECK (status IN ('open', 'active', 'completed')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. PROJECTS (challenges / golden mindset)
CREATE TABLE IF NOT EXISTS projects (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  description     TEXT NOT NULL,
  difficulty      TEXT NOT NULL DEFAULT 'Medium'
                    CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  points_awarded  INTEGER NOT NULL DEFAULT 50,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. STUDENT_SCORES (gamification & leaderboard)
CREATE TABLE IF NOT EXISTS student_scores (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id  UUID REFERENCES projects(id) ON DELETE SET NULL,
  score       INTEGER NOT NULL DEFAULT 0,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. QUIZ_QUESTIONS (MCQs & practice)
CREATE TABLE IF NOT EXISTS quiz_questions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject         TEXT NOT NULL,
  question_text   TEXT NOT NULL,
  options         JSONB NOT NULL,    -- e.g. ["A","B","C","D"]
  correct_answer  TEXT NOT NULL,
  points          INTEGER NOT NULL DEFAULT 10,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. QUIZ_SUBMISSIONS
CREATE TABLE IF NOT EXISTS quiz_submissions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id     UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  selected_option TEXT NOT NULL,
  is_correct      BOOLEAN NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. LIBRARY_NOTES (digital library & missed lecture notes)
CREATE TABLE IF NOT EXISTS library_notes (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_name       TEXT NOT NULL,
  subject           TEXT NOT NULL,
  title             TEXT NOT NULL,
  file_url          TEXT,
  content_markdown  TEXT,
  lecture_date      DATE NOT NULL,
  uploader_id       UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. FACULTY_CABINS (cabin location & office hours)
CREATE TABLE IF NOT EXISTS faculty_cabins (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faculty_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cabin_number  TEXT NOT NULL,
  office_hours  TEXT NOT NULL,
  is_available  BOOLEAN NOT NULL DEFAULT true,
  status        TEXT NOT NULL DEFAULT 'available'
                  CHECK (status IN ('available', 'in_meeting', 'away', 'offline')),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY  (permissive MVP policies)
-- ============================================================

ALTER TABLE users            ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions         ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects         ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_scores   ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_notes    ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty_cabins   ENABLE ROW LEVEL SECURITY;

-- Permissive "allow-all" policies for hackathon / MVP testing
CREATE POLICY "Allow all on users"            ON users            FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on sessions"         ON sessions         FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on projects"         ON projects         FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on student_scores"   ON student_scores   FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on quiz_questions"   ON quiz_questions   FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on quiz_submissions" ON quiz_submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on library_notes"    ON library_notes    FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on faculty_cabins"   ON faculty_cabins   FOR ALL USING (true) WITH CHECK (true);
