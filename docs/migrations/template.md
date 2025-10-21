# Migration NNNN: [Description]

## Summary
Brief description of what this migration does and why it's needed.

## Changes
- **Tables**: List of tables affected
- **Columns**: New/modified/deleted columns
- **Indexes**: New indexes or constraints
- **Policies**: RLS policy changes
- **Functions**: New or modified functions

## Why
- **Business Need**: Why this change is necessary
- **Technical Need**: Technical justification
- **Security**: Security implications
- **Performance**: Performance considerations

## Rollout Plan
1. **Staging**: Apply in staging environment first
2. **Testing**: Specific tests to run
3. **Production**: Production deployment steps
4. **Verification**: How to verify success
5. **Monitoring**: What to watch for

## Verification
```sql
-- Test queries to verify migration worked
-- Include both positive and negative test cases
-- Test with different user roles
```

## Rollback
```sql
-- SQL commands to undo the migration
-- Should be safe to run multiple times
-- Include cleanup of any temporary data
```

## Files
- **Migration**: `migrations/NNNN_description.sql`
- **Rollback**: `migrations/NNNN_description_rollback.sql`
- **Verification**: `migrations/verify_NNNN.sql` (if needed)

## Dependencies
- **Requires**: List of other migrations that must be applied first
- **Conflicts**: Any migrations this conflicts with
- **Timing**: Any timing considerations

## Performance Impact
- **Query Performance**: Expected impact on queries
- **Storage**: Storage requirements
- **Index Usage**: Index performance implications
- **RLS Overhead**: RLS policy performance impact

## Security Considerations
- **Data Exposure**: Any new data exposure risks
- **Access Control**: Changes to access patterns
- **Audit Trail**: What gets logged
- **Compliance**: Any compliance implications

## Testing Checklist
- [ ] Migration applies successfully
- [ ] Rollback works correctly
- [ ] RLS policies work as expected
- [ ] Performance is acceptable
- [ ] No data loss or corruption
- [ ] Edge Functions still work
- [ ] Client applications still work

## Notes
- **Special Considerations**: Any special handling needed
- **Known Issues**: Any known problems or limitations
- **Future Work**: Related work that might be needed later
