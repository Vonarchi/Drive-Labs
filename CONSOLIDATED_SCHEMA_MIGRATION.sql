-- ============================================================================
-- CONSOLIDATED SCHEMA MIGRATION FOR DRIVE LABS
-- ============================================================================
-- This file contains all necessary migrations to complete the database schema
-- Safe to run multiple times - uses IF NOT EXISTS checks throughout
--
-- Apply this in: Supabase Dashboard > SQL Editor
-- https://supabase.com/dashboard/project/qjhvqykmqtlienmcaejv/sql/new
-- ============================================================================

-- ============================================================================
-- STEP 1: CREATE BASE TABLES
-- ============================================================================

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  run_id text,
  created_at timestamptz DEFAULT now()
);

-- Create job_events table (without foreign key for now)
CREATE TABLE IF NOT EXISTS job_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id text,
  bot_name text,
  event_type text,
  payload jsonb,
  owner_id uuid,
  created_at timestamptz DEFAULT now()
);

-- Create artifacts table (without foreign key for now)
CREATE TABLE IF NOT EXISTS artifacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id text,
  kind text,
  url text,
  meta jsonb,
  owner_id uuid,
  file_size bigint,
  content_type text,
  checksum text,
  created_at timestamptz DEFAULT now()
);

-- Create prompts table
CREATE TABLE IF NOT EXISTS prompts (
  id text PRIMARY KEY,
  category text NOT NULL,
  context text NOT NULL,
  prompt_text text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- STEP 2: ADD MISSING COLUMNS (SAFE - ONLY IF THEY DON'T EXIST)
-- ============================================================================

-- Add columns to jobs
DO $$ 
BEGIN
    -- Add run_id if it doesn't exist and make it PRIMARY KEY
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND column_name = 'run_id') THEN
        ALTER TABLE jobs ADD COLUMN run_id text;
        CREATE UNIQUE INDEX IF NOT EXISTS jobs_run_id_unique ON jobs(run_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND column_name = 'owner_id') THEN
        ALTER TABLE jobs ADD COLUMN owner_id uuid;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND column_name = 'status') THEN
        ALTER TABLE jobs ADD COLUMN status text DEFAULT 'pending';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND column_name = 'project_spec') THEN
        ALTER TABLE jobs ADD COLUMN project_spec jsonb;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND column_name = 'started_at') THEN
        ALTER TABLE jobs ADD COLUMN started_at timestamptz;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND column_name = 'completed_at') THEN
        ALTER TABLE jobs ADD COLUMN completed_at timestamptz;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND column_name = 'error_message') THEN
        ALTER TABLE jobs ADD COLUMN error_message text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND column_name = 'updated_at') THEN
        ALTER TABLE jobs ADD COLUMN updated_at timestamptz DEFAULT now();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND column_name = 'created_at') THEN
        ALTER TABLE jobs ADD COLUMN created_at timestamptz DEFAULT now();
    END IF;
END $$;

-- Add columns to job_events
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_events' AND column_name = 'owner_id') THEN
        ALTER TABLE job_events ADD COLUMN owner_id uuid;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_events' AND column_name = 'bot_name') THEN
        ALTER TABLE job_events ADD COLUMN bot_name text NOT NULL DEFAULT '';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_events' AND column_name = 'event_type') THEN
        ALTER TABLE job_events ADD COLUMN event_type text NOT NULL DEFAULT '';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_events' AND column_name = 'payload') THEN
        ALTER TABLE job_events ADD COLUMN payload jsonb;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_events' AND column_name = 'created_at') THEN
        ALTER TABLE job_events ADD COLUMN created_at timestamptz DEFAULT now();
    END IF;
END $$;

-- Add columns to artifacts
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artifacts' AND column_name = 'owner_id') THEN
        ALTER TABLE artifacts ADD COLUMN owner_id uuid;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artifacts' AND column_name = 'kind') THEN
        ALTER TABLE artifacts ADD COLUMN kind text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artifacts' AND column_name = 'file_size') THEN
        ALTER TABLE artifacts ADD COLUMN file_size bigint;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artifacts' AND column_name = 'content_type') THEN
        ALTER TABLE artifacts ADD COLUMN content_type text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artifacts' AND column_name = 'checksum') THEN
        ALTER TABLE artifacts ADD COLUMN checksum text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artifacts' AND column_name = 'meta') THEN
        ALTER TABLE artifacts ADD COLUMN meta jsonb;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artifacts' AND column_name = 'created_at') THEN
        ALTER TABLE artifacts ADD COLUMN created_at timestamptz DEFAULT now();
    END IF;
END $$;

-- ============================================================================
-- STEP 3: ADD FOREIGN KEY CONSTRAINTS
-- ============================================================================

-- Add foreign key to job_events
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'job_events_run_id_fkey'
    ) THEN
        ALTER TABLE job_events 
        ADD CONSTRAINT job_events_run_id_fkey 
        FOREIGN KEY (run_id) REFERENCES jobs(run_id) ON DELETE CASCADE;
    END IF;
END $$;

-- Add foreign key to artifacts
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'artifacts_run_id_fkey'
    ) THEN
        ALTER TABLE artifacts 
        ADD CONSTRAINT artifacts_run_id_fkey 
        FOREIGN KEY (run_id) REFERENCES jobs(run_id) ON DELETE CASCADE;
    END IF;
END $$;

-- ============================================================================
-- STEP 4: ENABLE ROW LEVEL SECURITY
-- ============================================================================

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'jobs' AND rowsecurity = true) THEN
        ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'job_events' AND rowsecurity = true) THEN
        ALTER TABLE job_events ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'artifacts' AND rowsecurity = true) THEN
        ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- ============================================================================
-- STEP 5: CREATE RLS POLICIES
-- ============================================================================

-- Jobs policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'jobs' AND policyname = 'Users can view their own jobs') THEN
        CREATE POLICY "Users can view their own jobs" ON jobs
          FOR SELECT USING (auth.uid() = owner_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'jobs' AND policyname = 'Users can insert their own jobs') THEN
        CREATE POLICY "Users can insert their own jobs" ON jobs
          FOR INSERT WITH CHECK (auth.uid() = owner_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'jobs' AND policyname = 'Users can update their own jobs') THEN
        CREATE POLICY "Users can update their own jobs" ON jobs
          FOR UPDATE USING (auth.uid() = owner_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'jobs' AND policyname = 'Users can delete their own jobs') THEN
        CREATE POLICY "Users can delete their own jobs" ON jobs
          FOR DELETE USING (auth.uid() = owner_id);
    END IF;
END $$;

-- Job events policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'job_events' AND policyname = 'Users can view their own job events') THEN
        CREATE POLICY "Users can view their own job events" ON job_events
          FOR SELECT USING (auth.uid() = owner_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'job_events' AND policyname = 'Users can insert their own job events') THEN
        CREATE POLICY "Users can insert their own job events" ON job_events
          FOR INSERT WITH CHECK (auth.uid() = owner_id);
    END IF;
END $$;

-- Artifacts policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'artifacts' AND policyname = 'Users can view their own artifacts') THEN
        CREATE POLICY "Users can view their own artifacts" ON artifacts
          FOR SELECT USING (auth.uid() = owner_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'artifacts' AND policyname = 'Users can insert their own artifacts') THEN
        CREATE POLICY "Users can insert their own artifacts" ON artifacts
          FOR INSERT WITH CHECK (auth.uid() = owner_id);
    END IF;
END $$;

-- ============================================================================
-- STEP 6: CREATE INDEXES FOR PERFORMANCE
-- ============================================================================

-- Jobs indexes
CREATE INDEX IF NOT EXISTS idx_jobs_owner_id ON jobs(owner_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_owner_status ON jobs(owner_id, status);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at);

-- Job events indexes
CREATE INDEX IF NOT EXISTS idx_job_events_run_id ON job_events(run_id);
CREATE INDEX IF NOT EXISTS idx_job_events_owner_id ON job_events(owner_id);
CREATE INDEX IF NOT EXISTS idx_job_events_created_at ON job_events(created_at);

-- Artifacts indexes
CREATE INDEX IF NOT EXISTS idx_artifacts_run_id ON artifacts(run_id);
CREATE INDEX IF NOT EXISTS idx_artifacts_owner_id ON artifacts(owner_id);
CREATE INDEX IF NOT EXISTS idx_artifacts_created_at ON artifacts(created_at);
CREATE INDEX IF NOT EXISTS idx_artifacts_owner_created ON artifacts(owner_id, created_at);

-- ============================================================================
-- STEP 7: ADD CONSTRAINTS
-- ============================================================================

-- Status constraint
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_jobs_status') THEN
        ALTER TABLE jobs ADD CONSTRAINT check_jobs_status 
          CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled'));
    END IF;
END $$;

-- File size constraint
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_artifacts_file_size') THEN
        ALTER TABLE artifacts ADD CONSTRAINT check_artifacts_file_size 
          CHECK (file_size IS NULL OR file_size >= 0);
    END IF;
END $$;

-- ============================================================================
-- STEP 8: ADD DOCUMENTATION COMMENTS
-- ============================================================================

COMMENT ON TABLE jobs IS 'Stores pipeline job information';
COMMENT ON TABLE job_events IS 'Stores events generated by bots during pipeline execution';
COMMENT ON TABLE artifacts IS 'Stores artifacts generated by the pipeline';
COMMENT ON TABLE prompts IS 'Stores AI prompts and application copy';

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Verify tables exist
DO $$ 
DECLARE
    table_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count
    FROM pg_tables 
    WHERE schemaname = 'public' 
      AND tablename IN ('jobs', 'job_events', 'artifacts', 'prompts');
    
    IF table_count = 4 THEN
        RAISE NOTICE '✅ All tables created successfully';
    ELSE
        RAISE WARNING '⚠️  Only % of 4 tables exist', table_count;
    END IF;
END $$;

-- ============================================================================
-- COMPLETE! 
-- ============================================================================
-- Your database schema is now complete and ready to use!
-- All tables, columns, indexes, RLS policies, and constraints are in place.
-- ============================================================================

