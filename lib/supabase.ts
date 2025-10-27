import { createClient } from '@supabase/supabase-js';

// Create Supabase client for server-side operations
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key for server-side operations
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Types for our database tables
export type JobStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface Job {
  run_id: string;
  project_spec: any; // jsonb
  owner_id?: string;
  status: JobStatus;
  started_at?: string;
  completed_at?: string;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface JobEvent {
  id: string;
  run_id: string;
  bot_name: string;
  event_type: string;
  payload?: any; // jsonb
  owner_id?: string;
  created_at: string;
}

export interface Artifact {
  id: string;
  run_id: string;
  kind: string;
  url?: string;
  meta?: any; // jsonb
  owner_id?: string;
  file_size?: number;
  content_type?: string;
  checksum?: string;
  created_at: string;
}

