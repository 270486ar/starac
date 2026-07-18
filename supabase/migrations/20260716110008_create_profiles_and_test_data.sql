/*
# Create profiles, test_attempts, bookmarks, and leaderboard tables

1. New Tables
- `profiles`: Stores user profile data (full name, role, class, board, phone). Linked to auth.users.
- `test_attempts`: Records each test attempt by a student (test_id, score, answers, time_taken, status).
- `bookmarks`: Stores bookmarked questions by students.
- `leaderboard`: Aggregated leaderboard entries (total_score, tests_completed, rank).
2. Security
- Enable RLS on all tables.
- profiles: users can read/update own profile; anyone authenticated can read (for leaderboard display).
- test_attempts: owner-scoped CRUD (students see only their own attempts).
- bookmarks: owner-scoped CRUD.
- leaderboard: readable by all authenticated users (for ranking display), writable by owner.
3. Indexes
- test_attempts: user_id, test_id
- bookmarks: user_id, question_id
- leaderboard: total_score (descending)
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  class_name text,
  board text,
  phone text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_profiles" ON profiles;
CREATE POLICY "select_profiles" ON profiles FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Test attempts table
CREATE TABLE IF NOT EXISTS test_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  test_id text NOT NULL,
  test_title text NOT NULL,
  board text,
  class_name text,
  subject text,
  score numeric NOT NULL DEFAULT 0,
  total_marks numeric NOT NULL DEFAULT 0,
  percentage numeric NOT NULL DEFAULT 0,
  correct_count integer NOT NULL DEFAULT 0,
  wrong_count integer NOT NULL DEFAULT 0,
  total_questions integer NOT NULL DEFAULT 0,
  time_taken integer NOT NULL DEFAULT 0,
  answers jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'completed' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE test_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_attempts" ON test_attempts;
CREATE POLICY "select_own_attempts" ON test_attempts FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_attempts" ON test_attempts;
CREATE POLICY "insert_own_attempts" ON test_attempts FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_attempts" ON test_attempts;
CREATE POLICY "update_own_attempts" ON test_attempts FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_attempts" ON test_attempts;
CREATE POLICY "delete_own_attempts" ON test_attempts FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_test_attempts_user_id ON test_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_test_attempts_test_id ON test_attempts(test_id);

-- Bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id text NOT NULL,
  question_text text NOT NULL,
  subject text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, question_id)
);

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_bookmarks" ON bookmarks;
CREATE POLICY "select_own_bookmarks" ON bookmarks FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_bookmarks" ON bookmarks;
CREATE POLICY "insert_own_bookmarks" ON bookmarks FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_bookmarks" ON bookmarks;
CREATE POLICY "delete_own_bookmarks" ON bookmarks FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id);

-- Leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  class_name text,
  board text,
  total_score numeric NOT NULL DEFAULT 0,
  tests_completed integer NOT NULL DEFAULT 0,
  best_percentage numeric NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_leaderboard" ON leaderboard;
CREATE POLICY "select_leaderboard" ON leaderboard FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_own_leaderboard" ON leaderboard;
CREATE POLICY "insert_own_leaderboard" ON leaderboard FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_leaderboard" ON leaderboard;
CREATE POLICY "update_own_leaderboard" ON leaderboard FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_leaderboard_total_score ON leaderboard(total_score DESC);
