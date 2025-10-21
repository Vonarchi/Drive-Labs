# Drive Labs — Schema & Policy Docs

This directory contains comprehensive documentation for the Drive Labs database schema, migrations, and security policies.

## Directory Structure

```
docs/
├── README.md                    # This file
├── migrations/                  # Database migration documentation
│   ├── 0001_add_owner_and_rls.md
│   └── ...
├── policies/                    # RLS policy documentation
│   ├── README.md               # Complete RLS guide
│   ├── role-matrix.md          # Role-based access matrix
│   ├── quick-reference.md      # Developer quick start
│   ├── test_rls_policies.sql   # Comprehensive testing
│   ├── supabase-dashboard-queries.sql
│   └── dashboard-one-liners.sql
├── setup/                      # Setup and deployment guides
│   ├── quick-start.md
│   └── local-development.md
├── integration/                # Frontend integration guides
│   └── vercel-frontend.md
└── deployment/                 # Deployment documentation
    └── edge-functions.md
```

## Conventions

### Migrations
- **Format**: `NNNN_description.sql` + `docs/migrations/NNNN_description.md`
- **Include**: Summary, Changes, Why, Rollout, Verification, Rollback
- **Naming**: Sequential numbers with descriptive names

### Policies
- **Role Matrix**: Per-table access control documentation
- **Testing**: Comprehensive test suites for RLS verification
- **Dashboard Queries**: SQL queries for Supabase dashboard

### Edge Functions
- **Location**: `supabase/functions/`
- **Documentation**: Function-specific README files
- **Examples**: Client integration examples

## Quick Reference

### Database Migrations
```bash
# Apply migration
supabase db push

# Apply specific migration
\i migrations/0001_add_owner_and_rls.sql

# Verify migration
\i migrations/verify_rls.sql
```

### RLS Policies
```sql
-- Check RLS status
SELECT relname as table, relrowsecurity as rls_enabled
FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname='public' AND c.relkind='r';

-- List policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies WHERE schemaname='public';
```

### Edge Functions
```bash
# Deploy functions
supabase functions deploy --project-ref YOUR_PROJECT_REF

# Test function
curl -H "Authorization: Bearer <token>" \
  https://YOUR_PROJECT_REF.supabase.co/functions/v1/get-jobs
```

## Documentation Standards

### Migration Documentation
Each migration follows the format:
- **Summary**: One-liner description
- **Changes**: List of DDL statements
- **Why**: Business/security rationale
- **Rollout**: Staging steps, backfill notes
- **Verification**: Exact SQL to prove it works
- **Rollback**: Reversible SQL steps

### Policy Documentation
Each policy section should include:
- **Role Matrix**: Clear table of permissions
- **Policy Details**: SQL policy definitions
- **Security Principles**: Underlying security concepts
- **Testing Scenarios**: How to verify policies work
- **Troubleshooting**: Common issues and solutions

### Edge Function Documentation
Each function should include:
- **Purpose**: What the function does
- **Authentication**: How auth is handled
- **Parameters**: Input parameters and validation
- **Response**: Output format and examples
- **Error Handling**: Error responses and codes

## Security Guidelines

### RLS Best Practices
1. **Always enable RLS** on user data tables
2. **Use `auth.uid()`** for user context
3. **Test with different roles** before deployment
4. **Monitor for policy violations**
5. **Document all access patterns**

### Edge Function Security
1. **Validate JWT tokens** in all functions
2. **Use anon key** with user context
3. **Never expose service role** in functions
4. **Handle errors gracefully**
5. **Log security events**

## Testing

### RLS Testing
```sql
-- Run comprehensive test suite
\i docs/policies/test_rls_policies.sql

-- Quick verification
SELECT auth.uid() as user_id, count(*) as my_jobs FROM jobs;
```

### Edge Function Testing
```bash
# Test with authentication
curl -H "Authorization: Bearer <token>" \
  https://YOUR_PROJECT_REF.supabase.co/functions/v1/get-jobs

# Test error handling
curl https://YOUR_PROJECT_REF.supabase.co/functions/v1/get-jobs
# Should return 401 Unauthorized
```

## Maintenance

### Regular Tasks
- **Review RLS policies** quarterly
- **Test migrations** in staging before production
- **Monitor function performance** and errors
- **Update documentation** when making changes

### Adding New Features
1. **Create migration** with proper documentation
2. **Update RLS policies** if needed
3. **Add Edge Functions** if required
4. **Update role matrix** documentation
5. **Test thoroughly** before deployment

## Getting Help

### Documentation
- **Migration Guide**: `docs/migrations/`
- **RLS Policies**: `docs/policies/`
- **Edge Functions**: `supabase/functions/`

### Quick Links
- **Setup**: `docs/setup/quick-start.md`
- **Integration**: `docs/integration/vercel-frontend.md`
- **Deployment**: `docs/deployment/edge-functions.md`

### Troubleshooting
- **RLS Issues**: `docs/policies/quick-reference.md`
- **Function Issues**: `supabase/functions/README.md`
- **Database Issues**: `docs/migrations/0001_add_owner_and_rls.md`
