# Migration Quick Reference

## Common Commands

### Apply Migrations
```bash
# Apply all pending migrations
supabase db push

# Apply to specific project
supabase db push --project-ref YOUR_PROJECT_REF

# Apply specific migration
supabase db push --file migrations/20241201000001_add_owner_and_rls.sql
```

### Check Migration Status
```bash
# List applied migrations
supabase migration list

# Check database status
supabase db diff
```

### Rollback Migrations
```bash
# Reset to specific migration
supabase db reset --db-url "postgresql://..."

# Or run rollback SQL manually
psql -f migrations/20241201000001_add_owner_and_rls_rollback.sql
```

### Verify Migrations
```bash
# Run verification script
psql -f migrations/verify_rls.sql

# Check RLS status
psql -c "SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';"
```

## Migration Files

| File | Purpose |
|------|---------|
| `20241201000001_add_owner_and_rls.sql` | Adds owner_id and RLS policies |
| `20241201000002_add_job_status_tracking.sql` | Adds job status tracking |
| `20241201000003_add_artifact_metadata.sql` | Adds artifact metadata |
| `verify_rls.sql` | RLS verification script |
| `template.sql` | Migration template |

## Quick Tests

### Test RLS
```sql
-- Check RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- Test user access
SELECT count(*) FROM jobs; -- Should only see own data
```

### Test Migrations
```sql
-- Check columns exist
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'jobs' AND column_name = 'owner_id';

-- Check indexes exist
SELECT indexname FROM pg_indexes 
WHERE tablename = 'jobs' AND indexname LIKE '%owner_id%';
```

## Troubleshooting

### Migration Fails
1. Check syntax errors
2. Verify dependencies
3. Check for conflicting changes
4. Use rollback if needed

### RLS Not Working
1. Verify policies exist
2. Check user authentication
3. Test with service role
4. Review policy conditions

### Performance Issues
1. Check if indexes exist
2. Verify query plans
3. Monitor slow queries
4. Add missing indexes
