# Supabase Migrations

This directory contains SQL migration files for the Drive Labs database schema.

## Migration Files

### Applied Migrations
- **`20241201000001_add_owner_and_rls.sql`** - Adds owner_id columns and RLS policies
- **`20241201000002_add_job_status_tracking.sql`** - Adds job status tracking
- **`20241201000003_add_artifact_metadata.sql`** - Adds artifact metadata

### Rollback Files
- **`20241201000001_add_owner_and_rls_rollback.sql`** - Reverses owner_id and RLS
- **`20241201000002_add_job_status_tracking_rollback.sql`** - Reverses status tracking
- **`20241201000003_add_artifact_metadata_rollback.sql`** - Reverses artifact metadata

### Verification
- **`verify_rls.sql`** - Comprehensive RLS verification script

## Usage

### Apply Migrations
```bash
# Apply all pending migrations
supabase db push

# Apply specific migration
supabase db push --file migrations/20241201000001_add_owner_and_rls.sql
```

### Rollback Migrations
```bash
# Rollback to specific migration
supabase db reset --db-url "postgresql://..."

# Or manually run rollback SQL
psql -f migrations/20241201000001_add_owner_and_rls_rollback.sql
```

### Verify Migrations
```bash
# Run verification script
psql -f migrations/verify_rls.sql
```

## Migration Naming Convention

- **Format**: `YYYYMMDDHHMMSS_description.sql`
- **Example**: `20241201000001_add_owner_and_rls.sql`
- **Rollback**: `YYYYMMDDHHMMSS_description_rollback.sql`

## Migration Structure

Each migration should include:
1. **Header comment** with migration number and summary
2. **DDL statements** in logical order
3. **Indexes** for performance
4. **Constraints** for data integrity
5. **Comments** explaining complex operations

## Best Practices

### Before Creating Migrations
1. **Test in staging** environment first
2. **Backup production** database
3. **Plan rollback** strategy
4. **Document changes** in `docs/migrations/`

### Migration Content
1. **Use transactions** for atomicity
2. **Add indexes** for performance
3. **Include constraints** for data integrity
4. **Test thoroughly** before applying

### Rollback Strategy
1. **Always create rollback** files
2. **Test rollback** in staging
3. **Document rollback** steps
4. **Verify data integrity** after rollback

## Troubleshooting

### Common Issues
- **Migration fails**: Check for syntax errors and dependencies
- **RLS not working**: Verify policies are created correctly
- **Performance issues**: Check if indexes are created
- **Data loss**: Use rollback files to restore

### Debug Commands
```sql
-- Check migration status
SELECT * FROM supabase_migrations.schema_migrations;

-- Check RLS status
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- Check policies
SELECT tablename, policyname FROM pg_policies WHERE schemaname = 'public';
```

## Documentation

- **Migration Docs**: `docs/migrations/` - Detailed migration documentation
- **RLS Policies**: `docs/policies/` - Row Level Security documentation
- **Schema Docs**: `docs/README.md` - Complete schema documentation
