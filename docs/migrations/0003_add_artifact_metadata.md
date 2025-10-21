# 0003 Add Artifact Metadata

**Summary:** Adds metadata column to artifacts table for storing additional file information.

## Changes
- `ALTER TABLE artifacts ADD COLUMN file_size bigint`
- `ALTER TABLE artifacts ADD COLUMN content_type text`
- `ALTER TABLE artifacts ADD COLUMN checksum text`
- `ALTER TABLE artifacts ADD COLUMN created_at timestamptz DEFAULT now()`
- `CREATE INDEX idx_artifacts_created_at ON artifacts(created_at)`
- `CREATE INDEX idx_artifacts_owner_created ON artifacts(owner_id, created_at)`

## Why
- Store file metadata for better artifact management
- Enable file integrity verification with checksums
- Support content-type based processing
- Track artifact creation timestamps

## Rollout
- Apply migration in staging first
- Update application code to populate metadata
- Deploy to production after verification
- Backfill metadata for existing artifacts if needed

## Verification
```sql
-- Check new columns exist
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'artifacts' 
AND column_name IN ('file_size', 'content_type', 'checksum', 'created_at');

-- Test metadata insertion
INSERT INTO artifacts (run_id, kind, url, meta, owner_id, file_size, content_type, checksum)
VALUES ('test', 'zip', 'https://example.com/file.zip', '{}', auth.uid(), 1024, 'application/zip', 'abc123');

-- Verify indexes
SELECT indexname FROM pg_indexes 
WHERE tablename = 'artifacts' AND indexname LIKE '%created%';
```

## Rollback
```sql
-- Drop indexes
DROP INDEX IF EXISTS idx_artifacts_owner_created;
DROP INDEX IF EXISTS idx_artifacts_created_at;

-- Drop columns
ALTER TABLE artifacts DROP COLUMN IF EXISTS created_at;
ALTER TABLE artifacts DROP COLUMN IF EXISTS checksum;
ALTER TABLE artifacts DROP COLUMN IF EXISTS content_type;
ALTER TABLE artifacts DROP COLUMN IF EXISTS file_size;
```
