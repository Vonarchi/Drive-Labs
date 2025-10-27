# Supabase Schema Migration Guide

## Quick Fix: Apply Initial Schema

Your Supabase database needs the initial schema applied. Here's how to do it:

## Method 1: Via Supabase Dashboard (Easiest)

1. **Go to Supabase SQL Editor:**
   ```
   https://supabase.com/dashboard/project/qjhvqykmqtlienmcaejv/sql/new
   ```

2. **Copy the SQL from:** `supabase/migrations/20241201000001_initial_schema.sql`

3. **Paste and Run** in the SQL Editor

4. **Apply the other migrations in order:**
   - Run `supabase/migrations/20241201000004_complete_rls_setup.sql`
   - Run `supabase/migrations/20241201000005_add_job_status_safe.sql`
   - Run `supabase/migrations/20241201000006_add_artifact_metadata_safe.sql`

## Method 2: Via Supabase CLI (Recommended)

```bash
# Make sure you're linked
supabase link --project-ref qjhvqykmqtlienmcaejv

# Push migrations
supabase db push

# Verify
supabase db remote list
```

## Method 3: Via Direct SQL Connection

If you have `psql` installed:

```bash
# Using connection pooling
psql "postgresql://postgres.qjhvqykmqtlienmcaejv:XZLjvtYYDR7GTdxr@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require"

# Then run:
\i supabase/migrations/20241201000001_initial_schema.sql
\i supabase/migrations/20241201000004_complete_rls_setup.sql
\i supabase/migrations/20241201000005_add_job_status_safe.sql
\i supabase/migrations/20241201000006_add_artifact_metadata_safe.sql
```

## Migration Order

Apply these migrations **in this exact order**:

1. `20241201000001_initial_schema.sql` - Creates base tables
2. `20241201000004_complete_rls_setup.sql` - Adds RLS policies
3. `20241201000005_add_job_status_safe.sql` - Adds status tracking
4. `20241201000006_add_artifact_metadata_safe.sql` - Adds metadata

All migrations use `IF NOT EXISTS` checks, so they're safe to run multiple times.

## Verification

After applying migrations, verify with:

```sql
-- Check tables exist
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('jobs', 'job_events', 'artifacts', 'prompts');

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('jobs', 'job_events', 'artifacts');

-- Check policies
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('jobs', 'job_events', 'artifacts');
```

## What Gets Created

### Tables:
- ✅ `jobs` - Pipeline job tracking
- ✅ `job_events` - Bot event tracking  
- ✅ `artifacts` - Generated artifacts
- ✅ `prompts` - AI prompts and copy

### Security:
- ✅ RLS enabled on all user tables
- ✅ Owner-based policies
- ✅ Service role bypass capability

### Performance:
- ✅ Indexes on owner_id
- ✅ Indexes on created_at
- ✅ Composite indexes for common queries

## Quick Test

After applying, test with:

```javascript
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(url, serviceKey);

// Should work now
const { data, error } = await supabase
  .from('jobs')
  .insert({
    run_id: 'test-' + Date.now(),
    project_spec: { name: 'Test' },
    status: 'pending'
  });

console.log(error ? '❌ Failed' : '✅ Success');
```

