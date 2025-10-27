-- Migration: 0002 Add Missing Columns
-- Summary: Adds missing columns to existing tables safely

-- Add missing columns to jobs table
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND column_name = 'owner_id') THEN
        ALTER TABLE jobs ADD COLUMN owner_id uuid;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND column_name = 'status') THEN
        ALTER TABLE jobs ADD COLUMN status text DEFAULT 'pending';
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
    
    -- Change project_spec to jsonb if it's text
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND column_name = 'project_spec' AND data_type = 'text') THEN
        ALTER TABLE jobs ALTER COLUMN project_spec TYPE jsonb USING project_spec::jsonb;
    END IF;
END $$;

-- Add missing columns to job_events table
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_events' AND column_name = 'owner_id') THEN
        ALTER TABLE job_events ADD COLUMN owner_id uuid;
    END IF;
    
    -- Change payload to jsonb if it's text
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_events' AND column_name = 'payload' AND data_type = 'text') THEN
        ALTER TABLE job_events ALTER COLUMN payload TYPE jsonb USING payload::jsonb;
    END IF;
END $$;

-- Add missing columns to artifacts table
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artifacts' AND column_name = 'owner_id') THEN
        ALTER TABLE artifacts ADD COLUMN owner_id uuid;
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
    
    -- Change meta to jsonb if it's text
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artifacts' AND column_name = 'meta' AND data_type = 'text') THEN
        ALTER TABLE artifacts ALTER COLUMN meta TYPE jsonb USING meta::jsonb;
    END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_jobs_owner_id ON jobs(owner_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at);

CREATE INDEX IF NOT EXISTS idx_job_events_owner_id ON job_events(owner_id);
CREATE INDEX IF NOT EXISTS idx_job_events_created_at ON job_events(created_at);

CREATE INDEX IF NOT EXISTS idx_artifacts_owner_id ON artifacts(owner_id);
CREATE INDEX IF NOT EXISTS idx_artifacts_created_at ON artifacts(created_at);

