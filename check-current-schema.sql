-- Check current table structure
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name IN ('jobs', 'job_events', 'artifacts')
ORDER BY table_name, ordinal_position;

