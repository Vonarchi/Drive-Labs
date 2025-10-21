# Quick Start Guide

## Option 1: With Docker (Recommended)

### Prerequisites
1. **Install Docker Desktop**: https://www.docker.com/products/docker-desktop/
2. **Start Docker Desktop** and wait for it to be ready

### Start Development
```bash
# 1. Start Supabase locally
supabase start

# 2. Apply database migrations
supabase db reset

# 3. Deploy Edge Functions
supabase functions deploy

# 4. Start your app (in another terminal)
npm run dev
```

### Access Services
- **Supabase Studio**: http://localhost:54323
- **API**: http://localhost:54321
- **Your App**: http://localhost:3000

## Option 2: Cloud Development (No Docker)

### Prerequisites
1. **Supabase project** created at https://supabase.com
2. **Project credentials** from your dashboard

### Setup
```bash
# 1. Link to your cloud project
supabase link --project-ref your-project-ref

# 2. Apply migrations to cloud
supabase db push

# 3. Deploy Edge Functions to cloud
supabase functions deploy

# 4. Set environment variables
cp .env.example .env.local
# Edit .env.local with your cloud credentials

# 5. Start your app
npm run dev
```

### Environment Variables
```env
# Cloud Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Option 3: Hybrid Development

### Use Cloud Database + Local App
```bash
# 1. Use cloud database
# Set cloud credentials in .env.local

# 2. Deploy functions to cloud
supabase functions deploy

# 3. Start local app
npm run dev
```

## Next Steps

### 1. Apply Database Migrations
```sql
-- Run in Supabase SQL Editor (cloud) or local Studio
\i migrations/0001_add_owner_and_rls.sql
```

### 2. Test RLS Policies
```sql
-- Run verification queries
\i migrations/verify_rls.sql
```

### 3. Test Edge Functions
```bash
# Test with curl
curl -H "Authorization: Bearer <token>" \
  https://your-project.supabase.co/functions/v1/get-jobs
```

### 4. Start Building
- **Frontend**: Use `examples/client-usage.ts` as reference
- **Backend**: Your Express server is ready
- **Database**: RLS policies are configured
- **Functions**: Edge Functions are deployed

## Troubleshooting

### Docker Issues
```bash
# Check if Docker is running
docker ps

# If not running, start Docker Desktop
# Then retry: supabase start
```

### Port Conflicts
```bash
# Check what's using port 3000
lsof -i :3000

# Kill if needed
kill -9 <PID>
```

### Database Issues
```bash
# Reset local database
supabase db reset

# Or check status
supabase status
```

## Development Tips

1. **Use Supabase Studio** for database management
2. **Test RLS policies** with different user contexts
3. **Monitor Edge Function logs** in Supabase Dashboard
4. **Use TypeScript** for type safety
5. **Follow RLS best practices** from documentation

## Ready to Code!

Your Drive Labs Orchestrator is now ready for development:

- ✅ **Database**: RLS policies configured
- ✅ **API**: Express server with Supabase integration
- ✅ **Functions**: Edge Functions with authentication
- ✅ **Documentation**: Complete setup and usage guides
- ✅ **Examples**: Client-side integration patterns

Start building your multi-tenant application! 🚀
