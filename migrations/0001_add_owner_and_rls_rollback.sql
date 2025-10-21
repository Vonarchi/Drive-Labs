-- Rollback for 0001_add_owner_and_rls
-- This will disable RLS and remove owner_id columns

-- Disable Row Level Security
ALTER TABLE artifacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE jobs DISABLE ROW LEVEL SECURITY;

-- Drop indexes
DROP INDEX IF EXISTS idx_artifacts_owner_id;
DROP INDEX IF EXISTS idx_job_events_owner_id;
DROP INDEX IF EXISTS idx_jobs_owner_id;

-- Drop owner_id columns
ALTER TABLE artifacts DROP COLUMN IF EXISTS owner_id;
ALTER TABLE job_events DROP COLUMN IF EXISTS owner_id;
ALTER TABLE jobs DROP COLUMN IF EXISTS owner_id;
