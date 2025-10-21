# RLS Quick Reference Guide

## 🚀 Quick Start

### For Frontend Developers
```typescript
// Use user token - automatically respects RLS
const supabase = createClient(url, anonKey);

// Only returns user's own data
const { data: jobs } = await supabase.from('jobs').select('*');
```

### For Backend Developers
```typescript
// Use service role - bypasses RLS
const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false }
});

// Can access all data
const { data: allJobs } = await supabase.from('jobs').select('*');
```

## 📋 Policy Summary

| Table | What Users Can Do | What Service Role Can Do |
|-------|------------------|-------------------------|
| `jobs` | CRUD own records | CRUD all records |
| `job_events` | Read/Insert own | CRUD all records |
| `artifacts` | Read/Insert own | CRUD all records |

## 🔍 Common Queries

### Get User's Jobs
```sql
-- Automatically filtered by RLS
SELECT * FROM jobs;
```

### Get Job with Events
```sql
-- Both tables respect RLS
SELECT 
    j.run_id,
    j.project_spec,
    je.bot_name,
    je.event_type
FROM jobs j
LEFT JOIN job_events je ON j.run_id = je.run_id
WHERE j.run_id = 'your-run-id';
```

### Get Job Artifacts
```sql
-- Artifacts are filtered by owner_id
SELECT 
    a.run_id,
    a.kind,
    a.url,
    a.created_at
FROM artifacts a
WHERE a.run_id = 'your-run-id';
```

## ⚠️ Common Issues

### "No rows returned"
- ✅ **Check**: User is authenticated (`auth.uid()` is not null)
- ✅ **Check**: `owner_id` is set correctly in your data
- ✅ **Check**: RLS policies are enabled

### "Permission denied"
- ✅ **Check**: Using correct role (authenticated vs service_role)
- ✅ **Check**: RLS policies exist and are correct
- ✅ **Check**: User has proper permissions

### "Service role required"
- ✅ **Use**: Service role key for admin operations
- ✅ **Use**: Server-side only (never expose to client)

## 🧪 Testing RLS

### Run Test Suite
```sql
-- Execute the comprehensive test
\i docs/policies/test_rls_policies.sql
```

### Quick Test
```sql
-- Check if RLS is working
SELECT 
    auth.uid() as current_user,
    count(*) as my_jobs
FROM jobs;
```

### Supabase Dashboard Queries
```sql
-- Copy and paste these in Supabase SQL Editor
-- See: docs/policies/supabase-dashboard-queries.sql

-- Quick RLS status check
SELECT relname as table, relrowsecurity as rls_enabled
FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname='public' AND c.relkind='r';

-- List all policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname='public'
ORDER BY tablename, policyname;
```

## 🔧 Debugging

### Check Current Context
```sql
SELECT 
    auth.uid() as user_id,
    current_user as role,
    session_user as session_role;
```

### Check RLS Status
```sql
SELECT 
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename IN ('jobs', 'job_events', 'artifacts');
```

### Check Policies
```sql
SELECT 
    tablename,
    policyname,
    cmd as operation
FROM pg_policies 
WHERE tablename IN ('jobs', 'job_events', 'artifacts');
```

## 📚 Best Practices

1. **Always use owner_id** when inserting data
2. **Test with both roles** (authenticated and service_role)
3. **Never expose service role** to client-side code
4. **Use indexes** on owner_id for performance
5. **Monitor query performance** with RLS enabled

## 🆘 Need Help?

- **Full Documentation**: See `README.md` in this directory
- **Test Scripts**: Run `test_rls_policies.sql`
- **Migration Files**: Check `migrations/` directory
- **Issues**: Check Supabase logs for RLS violations
