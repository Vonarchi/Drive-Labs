-- Supabase Dashboard: SQL Editor Queries
-- Use these queries in the Supabase SQL Editor to inspect RLS status and policies

-- ==============================================
-- RLS Status Check
-- ==============================================
-- Shows which tables have RLS enabled
SELECT 
    relname as table_name, 
    relrowsecurity as rls_enabled,
    CASE 
        WHEN relrowsecurity THEN '✅ RLS Enabled' 
        ELSE '❌ RLS Disabled' 
    END as status
FROM pg_class c 
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public' 
  AND c.relkind = 'r'
  AND relname IN ('jobs', 'job_events', 'artifacts')
ORDER BY relname;

-- ==============================================
-- Policy Inspection
-- ==============================================
-- Shows all RLS policies with details
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd as operation,
    qual as using_expression,
    with_check as with_check_expression
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('jobs', 'job_events', 'artifacts')
ORDER BY tablename, policyname;

-- ==============================================
-- Policy Summary
-- ==============================================
-- Quick overview of policies per table
SELECT 
    tablename,
    count(*) as policy_count,
    string_agg(DISTINCT cmd, ', ') as operations,
    string_agg(DISTINCT roles::text, ', ') as roles
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('jobs', 'job_events', 'artifacts')
GROUP BY tablename
ORDER BY tablename;

-- ==============================================
-- Index Check
-- ==============================================
-- Verify indexes exist for RLS performance
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('jobs', 'job_events', 'artifacts')
  AND indexname LIKE '%owner_id%'
ORDER BY tablename, indexname;

-- ==============================================
-- Column Check
-- ==============================================
-- Verify owner_id columns exist
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

-- ==============================================
-- Current User Context
-- ==============================================
-- Check current authentication context
SELECT 
    'Current User' as context_type,
    auth.uid() as user_id,
    current_user as database_role,
    session_user as session_role;

-- ==============================================
-- Data Access Test
-- ==============================================
-- Test what data the current user can see
SELECT 
    'jobs' as table_name,
    count(*) as total_rows,
    count(CASE WHEN owner_id = auth.uid() THEN 1 END) as user_rows,
    count(CASE WHEN owner_id != auth.uid() THEN 1 END) as other_user_rows
FROM jobs

UNION ALL

SELECT 
    'job_events' as table_name,
    count(*) as total_rows,
    count(CASE WHEN owner_id = auth.uid() THEN 1 END) as user_rows,
    count(CASE WHEN owner_id != auth.uid() THEN 1 END) as other_user_rows
FROM job_events

UNION ALL

SELECT 
    'artifacts' as table_name,
    count(*) as total_rows,
    count(CASE WHEN owner_id = auth.uid() THEN 1 END) as user_rows,
    count(CASE WHEN owner_id != auth.uid() THEN 1 END) as other_user_rows
FROM artifacts;

-- ==============================================
-- RLS Violation Check
-- ==============================================
-- Check for potential RLS violations (should return 0 rows if RLS is working)
SELECT 
    'Potential RLS Violation' as issue,
    'jobs' as table_name,
    count(*) as violation_count
FROM jobs
WHERE owner_id IS NULL

UNION ALL

SELECT 
    'Potential RLS Violation' as issue,
    'job_events' as table_name,
    count(*) as violation_count
FROM job_events
WHERE owner_id IS NULL

UNION ALL

SELECT 
    'Potential RLS Violation' as issue,
    'artifacts' as table_name,
    count(*) as violation_count
FROM artifacts
WHERE owner_id IS NULL;

-- ==============================================
-- Performance Check
-- ==============================================
-- Check query performance with RLS
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM jobs 
WHERE owner_id = auth.uid() 
LIMIT 10;

-- ==============================================
-- Quick Health Check
-- ==============================================
-- One-liner to check if RLS is properly configured
SELECT 
    CASE 
        WHEN count(*) = 3 THEN '✅ All tables have RLS enabled'
        ELSE '❌ Some tables missing RLS: ' || count(*) || '/3'
    END as rls_status
FROM pg_class c 
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public' 
  AND c.relkind = 'r'
  AND c.relname IN ('jobs', 'job_events', 'artifacts')
  AND c.relrowsecurity = true;
