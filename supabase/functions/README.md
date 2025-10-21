# Supabase Edge Functions

This directory contains Deno Edge Functions for the Drive Labs Orchestrator that leverage Row Level Security (RLS) for multi-tenant data access.

## Functions Overview

| Function | Purpose | Endpoint | Parameters |
|----------|---------|----------|------------|
| `get-jobs` | List user's jobs | `/get-jobs` | None |
| `get-job-events` | Get events for a job | `/get-job-events?run_id=xxx` | `run_id` |
| `get-artifacts` | Get artifacts for a job | `/get-artifacts?run_id=xxx` | `run_id` |
| `get-pipeline-status` | Complete pipeline status | `/get-pipeline-status?run_id=xxx` | `run_id` |

## Authentication

All functions require a valid JWT token in the Authorization header:

```bash
curl -H "Authorization: Bearer <your-jwt-token>" \
  https://your-project.supabase.co/functions/v1/get-jobs
```

## Security Features

- **RLS Enforcement**: All queries automatically respect Row Level Security
- **JWT Validation**: Functions verify user authentication
- **Owner Isolation**: Users can only access their own data
- **No Service Role**: Uses anon key with user context

## Deployment

### Deploy All Functions
```bash
# From project root
supabase functions deploy

# Deploy specific function
supabase functions deploy get-jobs
```

### Environment Variables
Set these in your Supabase project:
- `SUPABASE_URL` - Your project URL
- `SUPABASE_ANON_KEY` - Your anon/public key

## Usage Examples

### Get User's Jobs
```typescript
const response = await fetch('https://your-project.supabase.co/functions/v1/get-jobs', {
  headers: {
    'Authorization': `Bearer ${userToken}`,
    'Content-Type': 'application/json'
  }
});

const { jobs } = await response.json();
```

### Get Job Events
```typescript
const response = await fetch(`https://your-project.supabase.co/functions/v1/get-job-events?run_id=${runId}`, {
  headers: {
    'Authorization': `Bearer ${userToken}`,
    'Content-Type': 'application/json'
  }
});

const { events } = await response.json();
```

### Get Complete Pipeline Status
```typescript
const response = await fetch(`https://your-project.supabase.co/functions/v1/get-pipeline-status?run_id=${runId}`, {
  headers: {
    'Authorization': `Bearer ${userToken}`,
    'Content-Type': 'application/json'
  }
});

const { job, events, artifacts, summary } = await response.json();
```

## Response Formats

### get-jobs
```json
{
  "jobs": [
    {
      "run_id": "my-app-1234567890",
      "project_spec": {"name": "my-app"},
      "status": "done",
      "owner_id": "user-uuid",
      "created_at": "2025-01-01T00:00:00Z"
    }
  ]
}
```

### get-job-events
```json
{
  "events": [
    {
      "run_id": "my-app-1234567890",
      "bot_name": "uiux-bot",
      "event_type": "start",
      "payload": {"step": "design"},
      "created_at": "2025-01-01T00:00:00Z"
    }
  ]
}
```

### get-artifacts
```json
{
  "artifacts": [
    {
      "run_id": "my-app-1234567890",
      "kind": "zip",
      "url": "https://storage.example.com/artifact.zip",
      "meta": {},
      "created_at": "2025-01-01T00:00:00Z"
    }
  ]
}
```

### get-pipeline-status
```json
{
  "job": { /* job object */ },
  "events": [ /* events array */ ],
  "artifacts": [ /* artifacts array */ ],
  "summary": {
    "total_events": 5,
    "total_artifacts": 1,
    "status": "done",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:05:00Z"
  }
}
```

## Error Handling

All functions return consistent error responses:

```json
{
  "error": "Error message description"
}
```

Common error codes:
- `401` - Missing or invalid bearer token
- `400` - Missing required parameters or other client errors
- `500` - Server errors

## Development

### Local Testing
```bash
# Start Supabase locally
supabase start

# Deploy functions locally
supabase functions deploy --local

# Test function
curl -H "Authorization: Bearer <token>" \
  http://localhost:54321/functions/v1/get-jobs
```

### Function Structure
Each function follows this pattern:
1. Extract and validate JWT token
2. Create Supabase client with user context
3. Query database (RLS automatically applied)
4. Return JSON response

## Security Considerations

- **Never expose service role key** in Edge Functions
- **Always validate JWT tokens** before database access
- **Use anon key** with user context for RLS enforcement
- **Handle errors gracefully** without exposing sensitive information
- **Rate limiting** should be implemented at the API gateway level

## Monitoring

Monitor function performance and errors in:
- Supabase Dashboard → Functions
- Function logs for debugging
- Database query performance with RLS
