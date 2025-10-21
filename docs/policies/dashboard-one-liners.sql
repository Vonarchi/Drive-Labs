-- Supabase Dashboard One-Liners
-- Copy and paste these individual queries in the Supabase SQL Editor

-- 1. Check RLS status
SELECT relname as table, relrowsecurity as rls_enabled FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace WHERE n.nspname='public' AND c.relkind='r';

-- 2. List all policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check FROM pg_policies WHERE schemaname='public' ORDER BY tablename, policyname;

-- 3. Check current user
SELECT auth.uid() as user_id, current_user as role;

-- 4. Test data access
SELECT 'jobs' as table, count(*) as total, count(CASE WHEN owner_id = auth.uid() THEN 1 END) as mine FROM jobs;

-- 5. Check indexes
SELECT tablename, indexname FROM pg_indexes WHERE schemaname='public' AND indexname LIKE '%owner_id%';

-- 6. Health check
SELECT CASE WHEN count(*) = 3 THEN '✅ RLS OK' ELSE '❌ RLS Missing' END FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace WHERE n.nspname='public' AND c.relkind='r' AND c.relname IN ('jobs','job_events','artifacts') AND c.relrowsecurity = true;
