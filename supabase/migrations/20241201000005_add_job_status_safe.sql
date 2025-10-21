-- Migration: 0005 Add Job Status Tracking (Safe)
-- Summary: Adds status tracking and timestamps to jobs table safely

-- Add status and timestamp columns only if they don't exist
DO $$ 
BEGIN
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
END $$;

-- Create indexes for performance (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_jobs_status') THEN
        CREATE INDEX idx_jobs_status ON jobs(status);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_jobs_owner_status') THEN
        CREATE INDEX idx_jobs_owner_status ON jobs(owner_id, status);
    END IF;
END $$;

-- Add check constraint for valid status values (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_jobs_status') THEN
        ALTER TABLE jobs ADD CONSTRAINT check_jobs_status 
          CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled'));
    END IF;
END $$;
