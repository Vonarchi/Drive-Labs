-- Migration: 0007 Verify Setup
-- Summary: Verifies that all migrations have been applied correctly

-- Check RLS is enabled
SELECT 
  'RLS Status' as check_type,
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('jobs', 'job_events', 'artifacts')
ORDER BY tablename;

-- Check policies exist
SELECT 
  'Policies' as check_type,
  schemaname,
  tablename,
  policyname,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('jobs', 'job_events', 'artifacts')
ORDER BY tablename, policyname;

-- Check owner_id columns exist
SELECT 
  'Columns' as check_type,
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('jobs', 'job_events', 'artifacts')
  AND column_name = 'owner_id'
ORDER BY table_name;

-- Check status columns exist
SELECT 
  'Status Columns' as check_type,
  table_name,
  column_name,
  data_type,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'jobs'
  AND column_name IN ('status', 'started_at', 'completed_at', 'error_message')
ORDER BY column_name;

-- Check artifact metadata columns exist
SELECT 
  'Artifact Columns' as check_type,
  table_name,
  column_name,
  data_type,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'artifacts'
  AND column_name IN ('file_size', 'content_type', 'checksum', 'created_at')
ORDER BY column_name;

-- Check indexes exist
SELECT 
  'Indexes' as check_type,
  indexname,
  tablename
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('jobs', 'job_events', 'artifacts')
  AND (indexname LIKE '%owner_id%' OR indexname LIKE '%status%' OR indexname LIKE '%created%')
ORDER BY tablename, indexname;
