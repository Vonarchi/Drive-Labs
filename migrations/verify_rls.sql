-- Verification script for RLS policies
-- Run this after applying the migration to verify multi-tenant isolation

-- Test 1: As authenticated user A
-- This should only return rows where owner_id = auth.uid()
SELECT 'Test 1: User A can only see their own jobs' as test_name;
SELECT count(*) as job_count FROM jobs;
SELECT count(*) as event_count FROM job_events;
SELECT count(*) as artifact_count FROM artifacts;

-- Test 2: Insert as authenticated user
-- This should succeed and set owner_id = auth.uid()
INSERT INTO jobs (run_id, project_spec, owner_id) 
VALUES ('test-run-' || extract(epoch from now()), '{"name":"test"}', auth.uid())
RETURNING run_id, owner_id;

-- Test 3: Verify the inserted row has correct owner_id
SELECT 'Test 3: Verify inserted job has correct owner_id' as test_name;
SELECT run_id, owner_id, auth.uid() as current_user_id 
FROM jobs 
WHERE run_id LIKE 'test-run-%' 
ORDER BY created_at DESC 
LIMIT 1;

-- Test 4: Insert job event
INSERT INTO job_events (run_id, bot_name, event_type, payload, owner_id)
VALUES (
  (SELECT run_id FROM jobs WHERE run_id LIKE 'test-run-%' ORDER BY created_at DESC LIMIT 1),
  'test-bot',
  'start',
  '{"test": true}',
  auth.uid()
)
RETURNING run_id, bot_name, owner_id;

-- Test 5: Insert artifact
INSERT INTO artifacts (run_id, kind, url, meta, owner_id)
VALUES (
  (SELECT run_id FROM jobs WHERE run_id LIKE 'test-run-%' ORDER BY created_at DESC LIMIT 1),
  'zip',
  'https://example.com/test.zip',
  '{}',
  auth.uid()
)
RETURNING run_id, kind, owner_id;

-- Test 6: Verify all data is properly isolated
SELECT 'Test 6: Verify data isolation' as test_name;
SELECT 
  'jobs' as table_name,
  count(*) as total_rows,
  count(CASE WHEN owner_id = auth.uid() THEN 1 END) as user_rows
FROM jobs
UNION ALL
SELECT 
  'job_events' as table_name,
  count(*) as total_rows,
  count(CASE WHEN owner_id = auth.uid() THEN 1 END) as user_rows
FROM job_events
UNION ALL
SELECT 
  'artifacts' as table_name,
  count(*) as total_rows,
  count(CASE WHEN owner_id = auth.uid() THEN 1 END) as user_rows
FROM artifacts;

-- Cleanup test data
DELETE FROM artifacts WHERE run_id LIKE 'test-run-%';
DELETE FROM job_events WHERE run_id LIKE 'test-run-%';
DELETE FROM jobs WHERE run_id LIKE 'test-run-%';
