# 0002 Add Job Status Tracking

**Summary:** Adds status tracking and timestamps to jobs table for better pipeline monitoring.

## Changes
- `ALTER TABLE jobs ADD COLUMN status text DEFAULT 'pending'`
- `ALTER TABLE jobs ADD COLUMN started_at timestamptz`
- `ALTER TABLE jobs ADD COLUMN completed_at timestamptz`
- `ALTER TABLE jobs ADD COLUMN error_message text`
- `CREATE INDEX idx_jobs_status ON jobs(status)`
- `CREATE INDEX idx_jobs_owner_status ON jobs(owner_id, status)`

## Why
- Track pipeline execution progress
- Enable job monitoring and debugging
- Support retry logic for failed jobs
- Provide better user experience with status updates

## Rollout
- Apply migration in staging first
- Update application code to set status values
- Deploy to production after verification
- Monitor job status updates

## Verification
```sql
-- Check status column exists
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'jobs' AND column_name = 'status';

-- Test status updates
UPDATE jobs SET status = 'running', started_at = now() 
WHERE run_id = 'test-job';

-- Verify indexes
SELECT indexname FROM pg_indexes 
WHERE tablename = 'jobs' AND indexname LIKE '%status%';
```

## Rollback
```sql
-- Drop indexes
DROP INDEX IF EXISTS idx_jobs_owner_status;
DROP INDEX IF EXISTS idx_jobs_status;

-- Drop columns
ALTER TABLE jobs DROP COLUMN IF EXISTS error_message;
ALTER TABLE jobs DROP COLUMN IF EXISTS completed_at;
ALTER TABLE jobs DROP COLUMN IF EXISTS started_at;
ALTER TABLE jobs DROP COLUMN IF EXISTS status;
```
