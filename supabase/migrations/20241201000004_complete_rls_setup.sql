-- Migration: 0004 Complete RLS Setup
-- Summary: Completes RLS setup by adding missing columns and policies

-- Add owner_id columns only if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND column_name = 'owner_id') THEN
        ALTER TABLE jobs ADD COLUMN owner_id uuid;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_events' AND column_name = 'owner_id') THEN
        ALTER TABLE job_events ADD COLUMN owner_id uuid;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artifacts' AND column_name = 'owner_id') THEN
        ALTER TABLE artifacts ADD COLUMN owner_id uuid;
    END IF;
END $$;

-- Enable Row Level Security if not already enabled
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

-- Create policies for jobs table (only if they don't exist)
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

-- Create policies for job_events table (only if they don't exist)
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

-- Create policies for artifacts table (only if they don't exist)
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

-- Create indexes for performance (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_jobs_owner_id') THEN
        CREATE INDEX idx_jobs_owner_id ON jobs(owner_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_job_events_owner_id') THEN
        CREATE INDEX idx_job_events_owner_id ON job_events(owner_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_artifacts_owner_id') THEN
        CREATE INDEX idx_artifacts_owner_id ON artifacts(owner_id);
    END IF;
END $$;
