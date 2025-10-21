// Client-side usage examples for Drive Labs Edge Functions
// This shows how to integrate the Edge Functions in your frontend application

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for authentication
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Edge Functions base URL
const EDGE_FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_URL + '/functions/v1';

// Helper function to get authenticated headers
async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.access_token) {
    throw new Error('User not authenticated');
  }

  return {
    'Authorization': `Bearer ${session.access_token}`,
    'Content-Type': 'application/json'
  };
}

// ==============================================
// Get User's Jobs
// ==============================================
export async function getUserJobs() {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${EDGE_FUNCTIONS_URL}/get-jobs`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch jobs');
    }

    const { jobs } = await response.json();
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

// ==============================================
// Get Job Events
// ==============================================
export async function getJobEvents(runId: string) {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${EDGE_FUNCTIONS_URL}/get-job-events?run_id=${runId}`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch job events');
    }

    const { events } = await response.json();
    return events;
  } catch (error) {
    console.error('Error fetching job events:', error);
    throw error;
  }
}

// ==============================================
// Get Job Artifacts
// ==============================================
export async function getJobArtifacts(runId: string) {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${EDGE_FUNCTIONS_URL}/get-artifacts?run_id=${runId}`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch artifacts');
    }

    const { artifacts } = await response.json();
    return artifacts;
  } catch (error) {
    console.error('Error fetching artifacts:', error);
    throw error;
  }
}

// ==============================================
// Get Complete Pipeline Status
// ==============================================
export async function getPipelineStatus(runId: string) {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${EDGE_FUNCTIONS_URL}/get-pipeline-status?run_id=${runId}`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch pipeline status');
    }

    const pipelineStatus = await response.json();
    return pipelineStatus;
  } catch (error) {
    console.error('Error fetching pipeline status:', error);
    throw error;
  }
}

// ==============================================
// React Hook Example
// ==============================================
import { useState, useEffect } from 'react';

export function useUserJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const userJobs = await getUserJobs();
        setJobs(userJobs);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return { jobs, loading, error };
}

export function usePipelineStatus(runId: string) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!runId) return;

    async function fetchStatus() {
      try {
        setLoading(true);
        const pipelineStatus = await getPipelineStatus(runId);
        setStatus(pipelineStatus);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();
  }, [runId]);

  return { status, loading, error };
}

// ==============================================
// React Component Example
// ==============================================
import React from 'react';

export function JobsList() {
  const { jobs, loading, error } = useUserJobs();

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Your Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.run_id}>
              <h3>{job.project_spec.name}</h3>
              <p>Status: {job.status}</p>
              <p>Created: {new Date(job.created_at).toLocaleString()}</p>
              <PipelineDetails runId={job.run_id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function PipelineDetails({ runId }: { runId: string }) {
  const { status, loading, error } = usePipelineStatus(runId);

  if (loading) return <div>Loading pipeline details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!status) return null;

  return (
    <div>
      <h4>Pipeline Status</h4>
      <p>Events: {status.summary.total_events}</p>
      <p>Artifacts: {status.summary.total_artifacts}</p>
      
      {status.events.length > 0 && (
        <div>
          <h5>Recent Events</h5>
          <ul>
            {status.events.slice(-3).map((event, index) => (
              <li key={index}>
                {event.bot_name}: {event.event_type}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {status.artifacts.length > 0 && (
        <div>
          <h5>Artifacts</h5>
          <ul>
            {status.artifacts.map((artifact, index) => (
              <li key={index}>
                <a href={artifact.url} target="_blank" rel="noopener noreferrer">
                  {artifact.kind} - Download
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ==============================================
// Usage in Next.js API Route
// ==============================================
// pages/api/jobs.ts or app/api/jobs/route.ts

export async function GET(request: Request) {
  try {
    // Get user from Supabase auth
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch jobs using Edge Function
    const jobs = await getUserJobs();
    
    return Response.json({ jobs });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
