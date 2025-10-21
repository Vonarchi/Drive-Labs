# Vercel Frontend Integration

## Overview

This guide shows how to integrate your Drive Labs Edge Functions with a Vercel-deployed frontend application using Supabase authentication and RLS.

## Architecture

```
Frontend (Vercel) → Supabase Edge Functions → Supabase Database (RLS)
```

- **Frontend**: Deployed on Vercel
- **Authentication**: Supabase Auth with JWT tokens
- **API**: Supabase Edge Functions with RLS
- **Database**: Supabase with Row Level Security

## Frontend Setup

### 1. Install Dependencies

```bash
npm install @supabase/supabase-js
# or
pnpm add @supabase/supabase-js
```

### 2. Environment Variables

Create `.env.local` for local development:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Set the same variables in Vercel Dashboard:
- Go to your Vercel project
- Settings → Environment Variables
- Add the Supabase credentials

### 3. Supabase Client Setup

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Edge Functions Integration

### 1. Authentication Helper

```typescript
// lib/auth.ts
import { supabase } from './supabase'

export async function getAuthToken() {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.access_token) {
    throw new Error('User not authenticated')
  }
  
  return session.access_token
}
```

### 2. Edge Functions Client

```typescript
// lib/edge-functions.ts
import { getAuthToken } from './auth'

const EDGE_FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_URL + '/functions/v1'

async function callEdgeFunction(functionName: string, params?: Record<string, string>) {
  const token = await getAuthToken()
  
  const url = new URL(`${EDGE_FUNCTIONS_URL}/${functionName}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }
  
  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Function call failed')
  }
  
  return response.json()
}

// API functions
export async function getUserJobs() {
  return callEdgeFunction('get-jobs')
}

export async function getJobEvents(runId: string) {
  return callEdgeFunction('get-job-events', { run_id: runId })
}

export async function getJobArtifacts(runId: string) {
  return callEdgeFunction('get-artifacts', { run_id: runId })
}

export async function getPipelineStatus(runId: string) {
  return callEdgeFunction('get-pipeline-status', { run_id: runId })
}
```

## React Components

### 1. Jobs List Component

```typescript
// components/JobsList.tsx
'use client'

import { useState, useEffect } from 'react'
import { getUserJobs } from '@/lib/edge-functions'

interface Job {
  run_id: string
  project_spec: { name: string }
  status: string
  created_at: string
  owner_id: string
}

export function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true)
        const { jobs } = await getUserJobs()
        setJobs(jobs)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch jobs')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  if (loading) return <div>Loading jobs...</div>
  if (error) return <div>Error: {error}</div>

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
  )
}
```

### 2. Pipeline Details Component

```typescript
// components/PipelineDetails.tsx
'use client'

import { useState, useEffect } from 'react'
import { getPipelineStatus } from '@/lib/edge-functions'

interface PipelineStatus {
  job: any
  events: any[]
  artifacts: any[]
  summary: {
    total_events: number
    total_artifacts: number
    status: string
  }
}

export function PipelineDetails({ runId }: { runId: string }) {
  const [status, setStatus] = useState<PipelineStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStatus() {
      try {
        setLoading(true)
        const pipelineStatus = await getPipelineStatus(runId)
        setStatus(pipelineStatus)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch pipeline status')
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [runId])

  if (loading) return <div>Loading pipeline details...</div>
  if (error) return <div>Error: {error}</div>
  if (!status) return null

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
  )
}
```

## Authentication Flow

### 1. Sign Up/Sign In

```typescript
// components/Auth.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignUp() {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      alert('Check your email for the confirmation link!')
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignIn() {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp} disabled={loading}>
        Sign Up
      </button>
      <button onClick={handleSignIn} disabled={loading}>
        Sign In
      </button>
      <button onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  )
}
```

### 2. Protected Route

```typescript
// components/ProtectedRoute.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Auth } from './Auth'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div>Loading...</div>
  if (!user) return <Auth />

  return <>{children}</>
}
```

## Main App Component

```typescript
// app/page.tsx
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { JobsList } from '@/components/JobsList'

export default function Home() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Drive Labs Orchestrator</h1>
        <JobsList />
      </div>
    </ProtectedRoute>
  )
}
```

## Vercel Deployment

### 1. Deploy to Vercel

```bash
# Deploy to Vercel
vercel --prod
```

### 2. Set Environment Variables

In Vercel Dashboard:
1. Go to your project
2. Settings → Environment Variables
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Update Supabase Auth Settings

In Supabase Dashboard:
1. Go to Authentication → Settings
2. Add your Vercel domain to **Site URL**
3. Add your Vercel domain to **Redirect URLs**

## Testing

### 1. Local Testing

```bash
# Start development server
npm run dev

# Test authentication
# Test Edge Functions calls
```

### 2. Production Testing

```bash
# Deploy to Vercel
vercel --prod

# Test on production URL
# Verify RLS is working
```

## Security Benefits

- **RLS Enforcement**: Users only see their own data
- **JWT Authentication**: Secure token-based auth
- **Edge Functions**: Server-side validation
- **Vercel Security**: Built-in security features

## Troubleshooting

### Common Issues

1. **CORS Errors**: Check Supabase auth settings
2. **RLS Errors**: Verify user is authenticated
3. **Function Errors**: Check Edge Function logs
4. **Token Expiry**: Implement token refresh

### Debug Tools

```typescript
// Debug authentication
console.log('User:', await supabase.auth.getUser())

// Debug Edge Function calls
console.log('Response:', await getUserJobs())
```

This setup provides a complete, secure, multi-tenant application with Vercel frontend and Supabase backend! 🚀
