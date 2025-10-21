-- Migration: 0006 Add Artifact Metadata (Safe)
-- Summary: Adds metadata columns to artifacts table safely

-- Add metadata columns only if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artifacts' AND column_name = 'file_size') THEN
        ALTER TABLE artifacts ADD COLUMN file_size bigint;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artifacts' AND column_name = 'content_type') THEN
        ALTER TABLE artifacts ADD COLUMN content_type text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artifacts' AND column_name = 'checksum') THEN
        ALTER TABLE artifacts ADD COLUMN checksum text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artifacts' AND column_name = 'created_at') THEN
        ALTER TABLE artifacts ADD COLUMN created_at timestamptz DEFAULT now();
    END IF;
END $$;

-- Create indexes for performance (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_artifacts_created_at') THEN
        CREATE INDEX idx_artifacts_created_at ON artifacts(created_at);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_artifacts_owner_created') THEN
        CREATE INDEX idx_artifacts_owner_created ON artifacts(owner_id, created_at);
    END IF;
END $$;

-- Add check constraint for file_size (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_artifacts_file_size') THEN
        ALTER TABLE artifacts ADD CONSTRAINT check_artifacts_file_size 
          CHECK (file_size IS NULL OR file_size >= 0);
    END IF;
END $$;
