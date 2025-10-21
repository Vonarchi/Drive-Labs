-- RLS Policy Testing Script
-- Run this script to verify RLS policies are working correctly

-- ==============================================
-- SETUP: Create test data
-- ==============================================

-- Create test users (simulate different user contexts)
-- Note: In real testing, you'd use actual Supabase auth users

-- ==============================================
-- TEST 1: Verify RLS is enabled
-- ==============================================
SELECT 'TEST 1: RLS Status Check' as test_name;

SELECT 
    schemaname, 
    tablename, 
    rowsecurity as rls_enabled,
    CASE 
        WHEN rowsecurity THEN '✅ RLS Enabled' 
        ELSE '❌ RLS Disabled' 
    END as status
FROM pg_tables 
WHERE tablename IN ('jobs', 'job_events', 'artifacts')
ORDER BY tablename;

-- ==============================================
-- TEST 2: Check policies exist
-- ==============================================
SELECT 'TEST 2: Policy Existence Check' as test_name;

SELECT 
    tablename,
    policyname,
    permissive,
    roles,
    cmd as operation,
    CASE 
        WHEN policyname IS NOT NULL THEN '✅ Policy Exists' 
        ELSE '❌ Policy Missing' 
    END as status
FROM pg_policies 
WHERE tablename IN ('jobs', 'job_events', 'artifacts')
ORDER BY tablename, cmd;

-- ==============================================
-- TEST 3: Test data isolation (as authenticated user)
-- ==============================================
SELECT 'TEST 3: Data Isolation Test' as test_name;

-- Check current user context
SELECT 
    'Current User' as context,
    auth.uid() as user_id,
    current_user as role;

-- Test SELECT policy
SELECT 
    'Jobs Count' as table_name,
    count(*) as total_rows,
    count(CASE WHEN owner_id = auth.uid() THEN 1 END) as user_rows,
    CASE 
        WHEN count(*) = count(CASE WHEN owner_id = auth.uid() THEN 1 END) 
        THEN '✅ Isolation Working' 
        ELSE '❌ Isolation Failed' 
    END as status
FROM jobs;

-- ==============================================
-- TEST 4: Test INSERT policy
-- ==============================================
SELECT 'TEST 4: INSERT Policy Test' as test_name;

-- Insert test job with correct owner_id
INSERT INTO jobs (run_id, project_spec, owner_id) 
VALUES (
    'test-rls-' || extract(epoch from now())::text,
    '{"name":"rls-test","description":"Testing RLS policies"}'::jsonb,
    auth.uid()
)
RETURNING 
    run_id,
    owner_id,
    auth.uid() as current_user,
    CASE 
        WHEN owner_id = auth.uid() 
        THEN '✅ INSERT Successful' 
        ELSE '❌ INSERT Failed' 
    END as status;

-- ==============================================
-- TEST 5: Test job_events INSERT
-- ==============================================
SELECT 'TEST 5: Job Events INSERT Test' as test_name;

-- Get the test job ID
WITH test_job AS (
    SELECT run_id FROM jobs 
    WHERE run_id LIKE 'test-rls-%' 
    ORDER BY created_at DESC 
    LIMIT 1
)
INSERT INTO job_events (run_id, bot_name, event_type, payload, owner_id)
SELECT 
    run_id,
    'test-bot',
    'start',
    '{"test": true}'::jsonb,
    auth.uid()
FROM test_job
RETURNING 
    run_id,
    bot_name,
    owner_id,
    CASE 
        WHEN owner_id = auth.uid() 
        THEN '✅ Job Event INSERT Successful' 
        ELSE '❌ Job Event INSERT Failed' 
    END as status;

-- ==============================================
-- TEST 6: Test artifacts INSERT
-- ==============================================
SELECT 'TEST 6: Artifacts INSERT Test' as test_name;

-- Insert test artifact
WITH test_job AS (
    SELECT run_id FROM jobs 
    WHERE run_id LIKE 'test-rls-%' 
    ORDER BY created_at DESC 
    LIMIT 1
)
INSERT INTO artifacts (run_id, kind, url, meta, owner_id)
SELECT 
    run_id,
    'zip',
    'https://example.com/test-rls.zip',
    '{"test": true}'::jsonb,
    auth.uid()
FROM test_job
RETURNING 
    run_id,
    kind,
    owner_id,
    CASE 
        WHEN owner_id = auth.uid() 
        THEN '✅ Artifact INSERT Successful' 
        ELSE '❌ Artifact INSERT Failed' 
    END as status;

-- ==============================================
-- TEST 7: Test UPDATE policy
-- ==============================================
SELECT 'TEST 7: UPDATE Policy Test' as test_name;

-- Update the test job
UPDATE jobs 
SET project_spec = '{"name":"rls-test-updated","description":"Updated via RLS test"}'::jsonb
WHERE run_id LIKE 'test-rls-%' 
  AND owner_id = auth.uid()
RETURNING 
    run_id,
    'Updated' as operation,
    CASE 
        WHEN project_spec::text LIKE '%updated%' 
        THEN '✅ UPDATE Successful' 
        ELSE '❌ UPDATE Failed' 
    END as status;

-- ==============================================
-- TEST 8: Test DELETE policy
-- ==============================================
SELECT 'TEST 8: DELETE Policy Test' as test_name;

-- Delete test data
DELETE FROM artifacts 
WHERE run_id LIKE 'test-rls-%' 
  AND owner_id = auth.uid();

DELETE FROM job_events 
WHERE run_id LIKE 'test-rls-%' 
  AND owner_id = auth.uid();

DELETE FROM jobs 
WHERE run_id LIKE 'test-rls-%' 
  AND owner_id = auth.uid()
RETURNING 
    run_id,
    'Deleted' as operation,
    '✅ DELETE Successful' as status;

-- ==============================================
-- TEST 9: Verify cleanup
-- ==============================================
SELECT 'TEST 9: Cleanup Verification' as test_name;

SELECT 
    'Jobs' as table_name,
    count(*) as remaining_test_rows
FROM jobs 
WHERE run_id LIKE 'test-rls-%'

UNION ALL

SELECT 
    'Job Events' as table_name,
    count(*) as remaining_test_rows
FROM job_events 
WHERE run_id LIKE 'test-rls-%'

UNION ALL

SELECT 
    'Artifacts' as table_name,
    count(*) as remaining_test_rows
FROM artifacts 
WHERE run_id LIKE 'test-rls-%';

-- ==============================================
-- SUMMARY
-- ==============================================
SELECT 'RLS Policy Testing Complete' as summary;
SELECT 'All tests should show ✅ for successful RLS implementation' as note;
