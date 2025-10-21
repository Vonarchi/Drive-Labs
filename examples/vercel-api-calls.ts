// Vercel Frontend API Calls
// Example of calling Supabase Edge Functions from Vercel-deployed frontend

import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Get authenticated user's token
async function getAuthToken() {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.access_token) {
    throw new Error('User not authenticated')
  }
  
  return session.access_token
}

// ==============================================
// Direct API Calls (as mentioned in your message)
// ==============================================

export async function getJobsDirect() {
  const token = await getAuthToken()
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL!.split('//')[1].split('.')[0]
  
  const response = await fetch(`https://${projectRef}.functions.supabase.co/get-jobs`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to fetch jobs')
  }
  
  return response.json()
}

export async function getJobEventsDirect(runId: string) {
  const token = await getAuthToken()
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL!.split('//')[1].split('.')[0]
  
  const response = await fetch(`https://${projectRef}.functions.supabase.co/get-job-events?run_id=${runId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to fetch job events')
  }
  
  return response.json()
}

export async function getArtifactsDirect(runId: string) {
  const token = await getAuthToken()
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL!.split('//')[1].split('.')[0]
  
  const response = await fetch(`https://${projectRef}.functions.supabase.co/get-artifacts?run_id=${runId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to fetch artifacts')
  }
  
  return response.json()
}

export async function getPipelineStatusDirect(runId: string) {
  const token = await getAuthToken()
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL!.split('//')[1].split('.')[0]
  
  const response = await fetch(`https://${projectRef}.functions.supabase.co/get-pipeline-status?run_id=${runId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to fetch pipeline status')
  }
  
  return response.json()
}

// ==============================================
// React Hook Examples
// ==============================================

import { useState, useEffect } from 'react'

export function useJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true)
        const { jobs } = await getJobsDirect()
        setJobs(jobs)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  return { jobs, loading, error }
}

export function usePipelineStatus(runId: string) {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!runId) return

    async function fetchStatus() {
      try {
        setLoading(true)
        const pipelineStatus = await getPipelineStatusDirect(runId)
        setStatus(pipelineStatus)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [runId])

  return { status, loading, error }
}

// ==============================================
// Usage Examples
// ==============================================

// In a React component
export function JobsList() {
  const { jobs, loading, error } = useJobs()

  if (loading) return <div>Loading jobs...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2>Your Jobs</h2>
      {jobs.map((job: any) => (
        <div key={job.run_id}>
          <h3>{job.project_spec.name}</h3>
          <p>Status: {job.status}</p>
          <PipelineDetails runId={job.run_id} />
        </div>
      ))}
    </div>
  )
}

export function PipelineDetails({ runId }: { runId: string }) {
  const { status, loading, error } = usePipelineStatus(runId)

  if (loading) return <div>Loading pipeline details...</div>
  if (error) return <div>Error: {error}</div>
  if (!status) return null

  return (
    <div>
      <h4>Pipeline Status</h4>
      <p>Events: {status.summary.total_events}</p>
      <p>Artifacts: {status.summary.total_artifacts}</p>
      
      {status.events.map((event: any, index: number) => (
        <div key={index}>
          {event.bot_name}: {event.event_type}
        </div>
      ))}
    </div>
  )
}

// ==============================================
// Environment Variables Required
// ==============================================

/*
# .env.local (for local development)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Set the same in Vercel Dashboard:
# Settings → Environment Variables
*/

// ==============================================
// Key Points
// ==============================================

/*
1. RLS automatically scopes results to the authenticated user
2. No need to pass owner_id - it's handled by RLS policies
3. JWT token provides user context to Edge Functions
4. Edge Functions run with user permissions, not service role
5. All data access is automatically filtered by owner_id
*/
