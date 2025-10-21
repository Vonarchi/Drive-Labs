# RLS Policy Documentation (Drive Labs)

## Overview
This document describes the Row Level Security (RLS) policies implemented for the Drive Labs Orchestrator database. These policies ensure multi-tenant data isolation by restricting access based on the authenticated user's ID.

## Policy Matrix

| Table       | Select                | Insert                | Update                | Delete                |
|-------------|-----------------------|-----------------------|-----------------------|-----------------------|
| jobs        | owner only            | owner only            | owner only            | owner only            |
| job_events  | owner only            | owner only            | (n/a)                 | (n/a)                 |
| artifacts   | owner only            | owner only            | (n/a)                 | (n/a)                 |

## Roles

### `authenticated`
- **Scope**: Subject to RLS policies
- **Access**: Can only read/write data where `owner_id = auth.uid()`
- **Use Case**: Frontend applications, user dashboards, API calls with user tokens

### `service_role`
- **Scope**: Bypasses RLS entirely
- **Access**: Can read/write all data regardless of owner_id
- **Use Case**: Server-side operations, admin functions, data migrations

## Rationale

- **Data Protection**: Protect tenant data from unauthorized access
- **Multi-tenancy**: Prevent cross-user reads/writes by default
- **Security First**: Fail-safe approach - deny access unless explicitly allowed
- **Performance**: Efficient queries with proper indexing on owner_id

## Policy Details

### Jobs Table
```sql
-- Users can only access their own jobs
CREATE POLICY "Users can view their own jobs" ON jobs
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert their own jobs" ON jobs
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own jobs" ON jobs
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own jobs" ON jobs
  FOR DELETE USING (auth.uid() = owner_id);
```

### Job Events Table
```sql
-- Users can only access their own job events
CREATE POLICY "Users can view their own job events" ON job_events
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert their own job events" ON job_events
  FOR INSERT WITH CHECK (auth.uid() = owner_id);
```

### Artifacts Table
```sql
-- Users can only access their own artifacts
CREATE POLICY "Users can view their own artifacts" ON artifacts
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert their own artifacts" ON artifacts
  FOR INSERT WITH CHECK (auth.uid() = owner_id);
```

## Testing

### Basic RLS Verification
```sql
-- as authenticated user context
select * from jobs;        -- returns only caller's rows
insert into jobs (run_id, project_spec, owner_id) values ('test', '{}'::jsonb, auth.uid());
```

### Comprehensive Test Suite
```sql
-- Test 1: Verify data isolation
SELECT 'User A jobs' as test, count(*) FROM jobs WHERE owner_id = auth.uid();
SELECT 'Total jobs' as test, count(*) FROM jobs;

-- Test 2: Verify insert with correct owner_id
INSERT INTO jobs (run_id, project_spec, owner_id) 
VALUES ('test-' || extract(epoch from now()), '{"name":"test"}', auth.uid())
RETURNING run_id, owner_id, auth.uid() as current_user;

-- Test 3: Verify cross-user access is blocked
-- This should return 0 rows if RLS is working
SELECT count(*) FROM jobs WHERE owner_id != auth.uid();
```

### Service Role Testing
```sql
-- As service_role (bypasses RLS)
SET LOCAL role = 'service_role';
SELECT count(*) FROM jobs;  -- should return all rows
```

## Implementation Notes

### Indexes
```sql
-- Performance optimization for RLS queries
CREATE INDEX idx_jobs_owner_id ON jobs(owner_id);
CREATE INDEX idx_job_events_owner_id ON job_events(owner_id);
CREATE INDEX idx_artifacts_owner_id ON artifacts(owner_id);
```

### Migration Strategy
1. **Add columns** with nullable owner_id
2. **Enable RLS** on all tables
3. **Create policies** for authenticated users
4. **Backfill data** with appropriate owner_id values
5. **Make owner_id NOT NULL** after backfill
6. **Test thoroughly** with both user and service role contexts

### Common Patterns

#### Server-Side Operations
```typescript
// Use service role for server operations
const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false }
});

// All operations bypass RLS
await supabase.from('jobs').select('*');
```

#### Client-Side Operations
```typescript
// Use user token for client operations
const supabase = createClient(url, anonKey);

// Operations are subject to RLS
await supabase.from('jobs').select('*'); // Only user's jobs
```

## Troubleshooting

### Common Issues

1. **"No rows returned"** - Check if user is authenticated and owner_id is set correctly
2. **"Permission denied"** - Verify RLS policies are enabled and user has correct role
3. **"Service role required"** - Use service role key for admin operations

### Debug Queries
```sql
-- Check current user context
SELECT auth.uid() as current_user_id, current_user as current_role;

-- Check RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('jobs', 'job_events', 'artifacts');

-- Check policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename IN ('jobs', 'job_events', 'artifacts');
```

## Security Considerations

- **Never expose service role key** to client-side code
- **Always validate user context** before database operations
- **Use least privilege principle** - only grant necessary permissions
- **Regular audit** of RLS policies and data access patterns
- **Monitor for policy violations** and unauthorized access attempts
