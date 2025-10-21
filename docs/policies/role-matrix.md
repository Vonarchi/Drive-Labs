# RLS Policy Role Matrix

## Overview
This document defines the Row Level Security (RLS) policies and role-based access control for the Drive Labs database.

## Role Definitions

| Role | Description | Use Case |
|------|-------------|----------|
| `authenticated` | Logged-in users | Frontend applications, user dashboards |
| `service_role` | Server-side operations | Backend services, admin functions |
| `anon` | Anonymous users | Public access (currently disabled) |

## Policy Matrix

### Jobs Table

| Role | Select | Insert | Update | Delete | Notes |
|------|--------|--------|--------|--------|-------|
| `authenticated` | ✅ Own only | ✅ Own only | ✅ Own only | ✅ Own only | `owner_id = auth.uid()` |
| `service_role` | ✅ All | ✅ All | ✅ All | ✅ All | Bypasses RLS |
| `anon` | ❌ None | ❌ None | ❌ None | ❌ None | No policies defined |

### Job Events Table

| Role | Select | Insert | Update | Delete | Notes |
|------|--------|--------|--------|--------|-------|
| `authenticated` | ✅ Own only | ✅ Own only | ❌ N/A | ❌ N/A | Events are immutable |
| `service_role` | ✅ All | ✅ All | ✅ All | ✅ All | Bypasses RLS |
| `anon` | ❌ None | ❌ None | ❌ None | ❌ None | No policies defined |

### Artifacts Table

| Role | Select | Insert | Update | Delete | Notes |
|------|--------|--------|--------|--------|-------|
| `authenticated` | ✅ Own only | ✅ Own only | ❌ N/A | ❌ N/A | Artifacts are immutable |
| `service_role` | ✅ All | ✅ All | ✅ All | ✅ All | Bypasses RLS |
| `anon` | ❌ None | ❌ None | ❌ None | ❌ None | No policies defined |

## Policy Details

### Jobs Policies
```sql
-- Users can view their own jobs
CREATE POLICY "Users can view their own jobs" ON jobs
  FOR SELECT USING (auth.uid() = owner_id);

-- Users can insert their own jobs
CREATE POLICY "Users can insert their own jobs" ON jobs
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Users can update their own jobs
CREATE POLICY "Users can update their own jobs" ON jobs
  FOR UPDATE USING (auth.uid() = owner_id);

-- Users can delete their own jobs
CREATE POLICY "Users can delete their own jobs" ON jobs
  FOR DELETE USING (auth.uid() = owner_id);
```

### Job Events Policies
```sql
-- Users can view their own job events
CREATE POLICY "Users can view their own job events" ON job_events
  FOR SELECT USING (auth.uid() = owner_id);

-- Users can insert their own job events
CREATE POLICY "Users can insert their own job events" ON job_events
  FOR INSERT WITH CHECK (auth.uid() = owner_id);
```

### Artifacts Policies
```sql
-- Users can view their own artifacts
CREATE POLICY "Users can view their own artifacts" ON artifacts
  FOR SELECT USING (auth.uid() = owner_id);

-- Users can insert their own artifacts
CREATE POLICY "Users can insert their own artifacts" ON artifacts
  FOR INSERT WITH CHECK (auth.uid() = owner_id);
```

## Security Principles

### 1. Least Privilege
- Users can only access their own data
- No cross-user data access allowed
- Service role has full access for admin operations

### 2. Fail-Safe Defaults
- No anonymous access policies
- RLS enabled by default
- Explicit deny for unknown roles

### 3. Data Isolation
- `owner_id` column enforces tenant boundaries
- `auth.uid()` provides user context
- Policies automatically filter by ownership

## Testing Scenarios

### Authenticated User Tests
```sql
-- Should return only user's jobs
SELECT count(*) FROM jobs;

-- Should succeed
INSERT INTO jobs (run_id, project_spec, owner_id) 
VALUES ('test', '{}'::jsonb, auth.uid());

-- Should return 0 (no cross-user access)
SELECT count(*) FROM jobs WHERE owner_id != auth.uid();
```

### Service Role Tests
```sql
-- Should return all jobs
SET LOCAL role = 'service_role';
SELECT count(*) FROM jobs;

-- Should succeed
INSERT INTO jobs (run_id, project_spec, owner_id) 
VALUES ('admin-test', '{}'::jsonb, 'any-user-id');
```

### Anonymous User Tests
```sql
-- Should return 0 (no access)
SET LOCAL role = 'anon';
SELECT count(*) FROM jobs;
```

## Monitoring

### Policy Violations
Monitor for unauthorized access attempts:
```sql
-- Check for potential violations
SELECT count(*) FROM jobs WHERE owner_id IS NULL;
```

### Performance Impact
Monitor query performance with RLS:
```sql
-- Check query execution plans
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM jobs WHERE owner_id = auth.uid();
```

## Maintenance

### Adding New Tables
When adding new tables with RLS:
1. Add `owner_id uuid` column
2. Enable RLS: `ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;`
3. Create policies following the same pattern
4. Add index on `owner_id` for performance
5. Update this role matrix

### Policy Updates
When modifying policies:
1. Test in staging environment
2. Verify all role combinations
3. Update this documentation
4. Deploy during maintenance window

## Troubleshooting

### Common Issues
- **"No rows returned"**: Check if user is authenticated
- **"Permission denied"**: Verify RLS policies are enabled
- **"Service role required"**: Use service role for admin operations

### Debug Queries
```sql
-- Check current user context
SELECT auth.uid() as user_id, current_user as role;

-- Check RLS status
SELECT tablename, rowsecurity FROM pg_tables 
WHERE tablename IN ('jobs', 'job_events', 'artifacts');

-- Check policies
SELECT tablename, policyname, cmd FROM pg_policies 
WHERE tablename IN ('jobs', 'job_events', 'artifacts');
```
