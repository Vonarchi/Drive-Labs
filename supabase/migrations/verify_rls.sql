-- Verification Script: RLS Policies
-- Summary: Comprehensive verification of RLS policies and owner_id functionality

-- Check RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('jobs', 'job_events', 'artifacts')
ORDER BY tablename;

-- Check policies exist
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('jobs', 'job_events', 'artifacts')
ORDER BY tablename, policyname;

-- Check owner_id columns exist
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('jobs', 'job_events', 'artifacts')
  AND column_name = 'owner_id'
ORDER BY table_name;

-- Check indexes exist
SELECT 
  indexname,
  tablename,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('jobs', 'job_events', 'artifacts')
  AND indexname LIKE '%owner_id%'
ORDER BY tablename, indexname;

-- Test RLS functionality (run as authenticated user)
-- This should only return the current user's data
SELECT 
  'jobs' as table_name,
  count(*) as total_rows,
  count(*) FILTER (WHERE owner_id = auth.uid()) as my_rows
FROM jobs
UNION ALL
SELECT 
  'job_events' as table_name,
  count(*) as total_rows,
  count(*) FILTER (WHERE owner_id = auth.uid()) as my_rows
FROM job_events
UNION ALL
SELECT 
  'artifacts' as table_name,
  count(*) as total_rows,
  count(*) FILTER (WHERE owner_id = auth.uid()) as my_rows
FROM artifacts;

-- Test insert permissions (run as authenticated user)
-- This should succeed
INSERT INTO jobs (run_id, project_spec, owner_id) 
VALUES ('test-rls-' || extract(epoch from now()), '{}'::jsonb, auth.uid())
RETURNING run_id, owner_id;

-- Test cross-user access (should return 0 rows)
SELECT count(*) as cross_user_jobs
FROM jobs 
WHERE owner_id != auth.uid();

-- Clean up test data
DELETE FROM jobs WHERE run_id LIKE 'test-rls-%';
