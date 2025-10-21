# Database Migrations

This directory contains SQL migrations for the Drive Labs Orchestrator database schema.

## Migration 0001: Add Owner ID and RLS

**File:** `0001_add_owner_and_rls.sql`

### Summary
Introduces `owner_id` to `jobs`, `job_events`, `artifacts`, enables RLS, and adds least-privilege policies.

### Changes
- **Columns:** `owner_id uuid` (NOT NULL) on three tables
- **RLS:** enabled on all three tables
- **Policies:** per-table owner-based read/write access

### Why
- Enforce multi-tenant isolation by user (`auth.uid()`)
- Prepare for user dashboards and API usage without service key
- Secure data access based on authenticated user identity

### Rollout Plan
1. Apply migration in staging environment
2. Backfill `owner_id` for legacy rows if needed
3. Flip NOT NULL constraint (commented out in migration)
4. Smoke test with an authenticated user token

### Verification
Run `verify_rls.sql` to test:
- As authenticated user A: `select count(*) from jobs` → only A's rows
- As user B: Cannot read A's rows
- As service role: Can read/write all (bypass RLS)

### Rollback
Use `0001_add_owner_and_rls_rollback.sql` to:
- Disable RLS on all tables
- Drop owner_id columns
- Remove associated indexes

## Usage

### Apply Migration
```sql
-- Run in Supabase SQL Editor or via CLI
\i migrations/0001_add_owner_and_rls.sql
```

### Verify Migration
```sql
-- Run verification script
\i migrations/verify_rls.sql
```

### Rollback Migration
```sql
-- If rollback is needed
\i migrations/0001_add_owner_and_rls_rollback.sql
```

## Security Notes

- **Service Role:** Bypasses RLS and can access all data
- **Authenticated Users:** Can only access their own data via `auth.uid()`
- **Anonymous Users:** Cannot access any data (no policies for anonymous access)

## Testing

The verification script tests:
1. Data isolation between users
2. Proper owner_id assignment
3. RLS policy enforcement
4. CRUD operations with correct permissions
