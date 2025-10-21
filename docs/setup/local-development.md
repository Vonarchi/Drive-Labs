# Local Development Setup

## Prerequisites

### 1. Docker Desktop
Supabase local development requires Docker Desktop:

**Install Docker Desktop:**
```bash
# macOS (Homebrew)
brew install --cask docker

# Or download from: https://www.docker.com/products/docker-desktop/
```

**Start Docker Desktop:**
- Open Docker Desktop application
- Wait for it to fully start (green status)
- Verify: `docker --version`

### 2. Supabase CLI
Already installed via Homebrew:
```bash
brew install supabase/tap/supabase
```

## Local Development

### Start Supabase
```bash
# Start all services (requires Docker)
supabase start

# Check status
supabase status

# Stop services
supabase stop
```

### Access Local Services
Once started, you'll have access to:

| Service | URL | Description |
|---------|-----|-------------|
| **API** | http://localhost:54321 | Supabase API |
| **Studio** | http://localhost:54323 | Database management UI |
| **Database** | postgresql://postgres:postgres@localhost:54322/postgres | Direct DB access |
| **Edge Functions** | http://localhost:54321/functions/v1/ | Your functions |

### Environment Variables
Create `.env.local` for local development:
```env
# Local Supabase
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-local-service-role-key

# Get these from: supabase status
```

## Database Setup

### Apply Migrations
```bash
# Apply all migrations
supabase db reset

# Or apply specific migration
supabase db push
```

### Run RLS Tests
```bash
# Connect to local database
supabase db shell

# Run verification queries
\i migrations/verify_rls.sql
```

## Edge Functions

### Deploy Functions
```bash
# Deploy all functions to local
supabase functions deploy

# Deploy specific function
supabase functions deploy get-jobs

# Test function locally
curl -H "Authorization: Bearer <token>" \
  http://localhost:54321/functions/v1/get-jobs
```

### Function Development
```bash
# Watch for changes and auto-reload
supabase functions serve

# Deploy to production
supabase functions deploy --project-ref your-project-ref
```

## Development Workflow

### 1. Start Services
```bash
# Start Supabase (requires Docker)
supabase start

# Start your app
npm run dev
```

### 2. Database Changes
```bash
# Make changes in Studio (http://localhost:54323)
# Or create migration files

# Apply changes
supabase db push
```

### 3. Test Edge Functions
```bash
# Test locally
curl -H "Authorization: Bearer <token>" \
  http://localhost:54321/functions/v1/get-jobs

# Deploy to production when ready
supabase functions deploy --project-ref your-project-ref
```

## Troubleshooting

### Docker Issues
```bash
# Check Docker status
docker --version
docker ps

# Restart Docker Desktop if needed
# Or restart via: Docker Desktop > Restart
```

### Supabase Issues
```bash
# Check Supabase status
supabase status

# Reset everything
supabase stop
supabase start

# Check logs
supabase logs
```

### Port Conflicts
If ports are in use:
```bash
# Check what's using ports
lsof -i :54321
lsof -i :54323

# Kill processes if needed
kill -9 <PID>
```

## Production Deployment

### Link to Remote Project
```bash
# Link to your Supabase project
supabase link --project-ref your-project-ref

# Deploy functions
supabase functions deploy

# Deploy migrations
supabase db push
```

### Environment Variables
Set these in your Supabase project dashboard:
- `SUPABASE_URL` - Your project URL
- `SUPABASE_ANON_KEY` - Your anon key

## Alternative: Cloud Development

If you can't run Docker locally, you can develop against your cloud Supabase project:

1. **Use cloud database** for development
2. **Deploy functions** directly to cloud
3. **Test with cloud RLS** policies
4. **Use Supabase Studio** (cloud version)

This approach works but requires internet connection and uses your cloud resources.
