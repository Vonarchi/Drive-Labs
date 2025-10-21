# Drive Labs Orchestrator

A TypeScript-based orchestrator for managing development pipelines with bots, templates, and automated workflows.

## Quick Start

### Prerequisites
- **Docker Desktop** (for local Supabase) or **Supabase Cloud Project**
- **Node.js >= 20**
- **pnpm** (recommended) or npm

### Option 1: Local Development (Docker)
```bash
# 1. Start Supabase locally
supabase start

# 2. Apply database migrations
supabase db reset

# 3. Deploy Edge Functions
supabase functions deploy

# 4. Start your app
pnpm dev
```

### Option 2: Cloud Development
```bash
# 1. Link to your Supabase project
supabase link --project-ref your-project-ref

# 2. Apply migrations
supabase db push

# 3. Deploy functions
supabase functions deploy

# 4. Start your app
pnpm dev
```

### Quick Tests
```bash
# Test health endpoint
pnpm run test:ping

# Test pipeline endpoint
pnpm run test:run
```

### Setup Guides
- **Quick Start**: `docs/setup/quick-start.md` - Get started quickly
- **Local Development**: `docs/setup/local-development.md` - Complete local setup

## Installing Dependencies

```bash
# Install all dependencies
pnpm install

# Add new dependencies
pnpm add @supabase/supabase-js
pnpm add -D @types/express

# Add development dependencies
pnpm add -D typescript tsx
```

## Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Compile TypeScript to JavaScript
- `pnpm start` - Run production build
- `pnpm run test:ping` - Test health endpoint
- `pnpm run test:run` - Test pipeline endpoint
- `pnpm run lint` - Run ESLint

## API Endpoints

- `GET /health` - Health check
- `POST /pipeline/run` - Run development pipeline
  - **Body**: `{ "projectSpec": { "name": "project-name" } }`
  - **Headers**: `x-user-id: user-123` (for Supabase Auth integration)
  - **Response**: `{ "runId": "string", "finalState": {...} }`
- `POST /api/generate-app` - Generate application ZIP

## Documentation

### Schema & Policy Docs
- **Main Docs**: `docs/README.md` - Complete documentation index
- **Migrations**: `docs/migrations/` - Database migration documentation
- **RLS Policies**: `docs/policies/` - Row Level Security documentation
- **Edge Functions**: `supabase/functions/` - Edge Function documentation

### Database Setup
The project requires Supabase with specific tables and RLS policies.

#### Required Tables
- `jobs` - Pipeline execution records
- `job_events` - Bot execution logs
- `artifacts` - Generated project files

#### Apply Migrations
```sql
-- Run in Supabase SQL Editor
\i migrations/0001_add_owner_and_rls.sql
```

#### RLS Documentation
- **Role Matrix**: `docs/policies/role-matrix.md` - Complete access control matrix
- **Quick Reference**: `docs/policies/quick-reference.md` - Developer quick start guide
- **Test Suite**: `docs/policies/test_rls_policies.sql` - Comprehensive RLS testing
- **Dashboard Queries**: `docs/policies/supabase-dashboard-queries.sql` - Supabase SQL Editor queries

### Edge Functions
- **Functions**: `supabase/functions/` - Deno Edge Functions with RLS
- **Client Examples**: `examples/client-usage.ts` - Frontend integration examples
- **Vercel Integration**: `examples/vercel-api-calls.ts` - Vercel frontend examples
- **Deployment**: `supabase functions deploy` - Deploy to Supabase

### Frontend Integration
- **Vercel Guide**: `docs/integration/vercel-frontend.md` - Complete Vercel setup
- **API Calls**: Direct calls to `https://<project-ref>.functions.supabase.co/get-jobs`
- **RLS Automatic**: Results automatically scoped to authenticated user

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (default: development)
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key for server-side operations

## Deployment

### Vercel
The project includes a `vercel.json` configuration for easy deployment:

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install",
  "functions": {
    "api/*.js": { "runtime": "nodejs20.x" }
  }
}
```

Deploy with:
```bash
vercel --prod
```

## Requirements

- Node.js >= 20
- pnpm (recommended) or npm
