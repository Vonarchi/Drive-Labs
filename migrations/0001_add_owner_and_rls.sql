-- 0001_add_owner_and_rls
-- Summary: Introduces `owner_id` to `jobs`, `job_events`, `artifacts`, enables RLS, and adds least-privilege policies.

-- Add owner_id columns to all three tables
ALTER TABLE jobs ADD COLUMN owner_id uuid;
ALTER TABLE job_events ADD COLUMN owner_id uuid;
ALTER TABLE artifacts ADD COLUMN owner_id uuid;

-- Enable Row Level Security on all tables
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;

-- Create policies for jobs table
CREATE POLICY "Users can view their own jobs" ON jobs
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert their own jobs" ON jobs
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own jobs" ON jobs
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own jobs" ON jobs
  FOR DELETE USING (auth.uid() = owner_id);

-- Create policies for job_events table
CREATE POLICY "Users can view their own job events" ON job_events
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert their own job events" ON job_events
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own job events" ON job_events
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own job events" ON job_events
  FOR DELETE USING (auth.uid() = owner_id);

-- Create policies for artifacts table
CREATE POLICY "Users can view their own artifacts" ON artifacts
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert their own artifacts" ON artifacts
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own artifacts" ON artifacts
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own artifacts" ON artifacts
  FOR DELETE USING (auth.uid() = owner_id);

-- Make owner_id NOT NULL after adding the column
-- Note: This assumes you'll backfill existing data first
-- ALTER TABLE jobs ALTER COLUMN owner_id SET NOT NULL;
-- ALTER TABLE job_events ALTER COLUMN owner_id SET NOT NULL;
-- ALTER TABLE artifacts ALTER COLUMN owner_id SET NOT NULL;

-- Add indexes for better performance
CREATE INDEX idx_jobs_owner_id ON jobs(owner_id);
CREATE INDEX idx_job_events_owner_id ON job_events(owner_id);
CREATE INDEX idx_artifacts_owner_id ON artifacts(owner_id);

-- Add comments for documentation
COMMENT ON COLUMN jobs.owner_id IS 'User ID of the job owner for multi-tenant isolation';
COMMENT ON COLUMN job_events.owner_id IS 'User ID of the job event owner for multi-tenant isolation';
COMMENT ON COLUMN artifacts.owner_id IS 'User ID of the artifact owner for multi-tenant isolation';
