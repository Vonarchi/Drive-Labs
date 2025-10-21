# 0001 Add Owner ID and RLS

**Summary:** Introduces `owner_id` to `jobs`, `job_events`, `artifacts`, enables RLS, and adds least-privilege policies.

## Changes
- `ALTER TABLE jobs ADD COLUMN owner_id uuid`
- `ALTER TABLE job_events ADD COLUMN owner_id uuid`
- `ALTER TABLE artifacts ADD COLUMN owner_id uuid`
- `ALTER TABLE jobs ENABLE ROW LEVEL SECURITY`
- `ALTER TABLE job_events ENABLE ROW LEVEL SECURITY`
- `ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY`
- `CREATE POLICY` statements for each table/operation
- `CREATE INDEX` on owner_id columns

## Why
- Enforce multi-tenant isolation by user (`auth.uid()`)
- Prepare for user dashboards and API usage without service key
- Secure data access based on authenticated user identity

## Rollout
- Apply migration in staging environment first
- Backfill `owner_id` for legacy rows if needed
- Flip NOT NULL constraint (commented out in migration)
- Smoke test with an authenticated user token

## Verification
```sql
-- As authenticated user A
SELECT count(*) FROM jobs;        -- only A's rows
INSERT INTO jobs (run_id, project_spec, owner_id) 
VALUES ('test', '{}'::jsonb, auth.uid()); -- succeeds

-- As user B
SELECT count(*) FROM jobs WHERE owner_id != auth.uid(); -- returns 0

-- As service role
SET LOCAL role = 'service_role';
SELECT count(*) FROM jobs;  -- all rows
```

## Rollback
```sql
-- Disable RLS
ALTER TABLE artifacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE jobs DISABLE ROW LEVEL SECURITY;

-- Drop indexes
DROP INDEX IF EXISTS idx_artifacts_owner_id;
DROP INDEX IF EXISTS idx_job_events_owner_id;
DROP INDEX IF EXISTS idx_jobs_owner_id;

-- Drop columns
ALTER TABLE artifacts DROP COLUMN IF EXISTS owner_id;
ALTER TABLE job_events DROP COLUMN IF EXISTS owner_id;
ALTER TABLE jobs DROP COLUMN IF EXISTS owner_id;
```
