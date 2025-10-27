# Database Schema Status

## ✅ Complete Schema Overview

### Tables

#### 1. **jobs** - Pipeline Job Tracking
```sql
- run_id (text, PRIMARY KEY) - Unique job identifier
- project_spec (jsonb, NOT NULL) - Project specification
- owner_id (uuid) - User who owns the job (for RLS)
- status (text, DEFAULT 'pending') - Job status
- started_at (timestamptz) - When job started
- completed_at (timestamptz) - When job completed
- error_message (text) - Error details if failed
- created_at (timestamptz, DEFAULT now())
- updated_at (timestamptz, DEFAULT now())
```

**Status Values:** `pending`, `running`, `completed`, `failed`, `cancelled`

#### 2. **job_events** - Bot Event Tracking
```sql
- id (uuid, PRIMARY KEY, DEFAULT gen_random_uuid())
- run_id (text, REFERENCES jobs(run_id), NOT NULL)
- bot_name (text, NOT NULL) - Name of bot that generated event
- event_type (text, NOT NULL) - Type of event
- payload (jsonb) - Event data
- owner_id (uuid) - User who owns the event (for RLS)
- created_at (timestamptz, DEFAULT now())
```

#### 3. **artifacts** - Generated Artifacts
```sql
- id (uuid, PRIMARY KEY, DEFAULT gen_random_uuid())
- run_id (text, REFERENCES jobs(run_id), NOT NULL)
- kind (text, NOT NULL) - Type of artifact (zip, file, etc.)
- url (text) - URL to access the artifact
- meta (jsonb) - Additional metadata
- owner_id (uuid) - User who owns the artifact (for RLS)
- file_size (bigint) - Size in bytes
- content_type (text) - MIME type
- checksum (text) - File integrity checksum
- created_at (timestamptz, DEFAULT now())
```

#### 4. **prompts** - AI Prompts and Copy
```sql
- id (text, PRIMARY KEY) - Unique prompt identifier
- category (text, NOT NULL) - Prompt category
- context (text, NOT NULL) - Where prompt is used
- prompt_text (text, NOT NULL) - The actual prompt/copy
- created_at (timestamptz, DEFAULT now())
- updated_at (timestamptz, DEFAULT now())
```

## 📊 Migration Sequence

1. **20241201000001_initial_schema.sql** - Creates base tables
2. **20241201000004_complete_rls_setup.sql** - Adds RLS policies
3. **20241201000005_add_job_status_safe.sql** - Adds status tracking
4. **20241201000006_add_artifact_metadata_safe.sql** - Adds artifact metadata
5. **20241201000007_verify_setup.sql** - Verifies setup

## 🔐 Security Features

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Owner-based access control
- ✅ Service role bypass for admin operations
- ✅ Proper indexes for performance
- ✅ Foreign key constraints

## 🚀 Deployment Status

### Production Database
- **Status**: Migrations applied
- **Tables**: All 4 tables exist
- **RLS**: Enabled
- **Policies**: Active

### Required Actions

If you're setting up a fresh database, run migrations in order:

```bash
# Apply all migrations
supabase db push

# Or apply individually
psql -f supabase/migrations/20241201000001_initial_schema.sql
psql -f supabase/migrations/20241201000004_complete_rls_setup.sql
psql -f supabase/migrations/20241201000005_add_job_status_safe.sql
psql -f supabase/migrations/20241201000006_add_artifact_metadata_safe.sql
psql -f supabase/migrations/20241201000007_verify_setup.sql
```

## ✅ Verification

Run the verification script to check schema:

```bash
psql -f supabase/migrations/20241201000007_verify_setup.sql
```

