# Edge Functions Deployment

## Prerequisites

1. **Supabase Project** - You need a Supabase project created
2. **Project Reference** - Get from your Supabase dashboard
3. **Supabase CLI** - Already installed via Homebrew

## Get Your Project Reference

### Option 1: From Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **General**
4. Copy the **Reference ID**

### Option 2: From Project URL
Your project URL looks like: `https://supabase.com/dashboard/project/YOUR_PROJECT_REF`
Copy the `YOUR_PROJECT_REF` part.

## Deploy Functions

### Option 1: Deploy All Functions (Recommended)
```bash
# Make script executable
chmod +x scripts/deploy-functions.sh

# Deploy all functions
./scripts/deploy-functions.sh YOUR_PROJECT_REF
```

### Option 2: Deploy Individual Functions
```bash
# Deploy get-jobs function
supabase functions deploy get-jobs --project-ref YOUR_PROJECT_REF

# Deploy get-job-events function
supabase functions deploy get-job-events --project-ref YOUR_PROJECT_REF

# Deploy get-artifacts function
supabase functions deploy get-artifacts --project-ref YOUR_PROJECT_REF

# Deploy get-pipeline-status function
supabase functions deploy get-pipeline-status --project-ref YOUR_PROJECT_REF
```

## Set Environment Variables

In your Supabase project dashboard, go to **Settings** → **Edge Functions** and set:

```env
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

## Test Functions

### Test get-jobs Function
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://YOUR_PROJECT_REF.supabase.co/functions/v1/get-jobs
```

### Test get-job-events Function
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "https://YOUR_PROJECT_REF.supabase.co/functions/v1/get-job-events?run_id=test-run-123"
```

### Test get-artifacts Function
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "https://YOUR_PROJECT_REF.supabase.co/functions/v1/get-artifacts?run_id=test-run-123"
```

### Test get-pipeline-status Function
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "https://YOUR_PROJECT_REF.supabase.co/functions/v1/get-pipeline-status?run_id=test-run-123"
```

## Function URLs

After deployment, your functions will be available at:

- **get-jobs**: `https://YOUR_PROJECT_REF.supabase.co/functions/v1/get-jobs`
- **get-job-events**: `https://YOUR_PROJECT_REF.supabase.co/functions/v1/get-job-events`
- **get-artifacts**: `https://YOUR_PROJECT_REF.supabase.co/functions/v1/get-artifacts`
- **get-pipeline-status**: `https://YOUR_PROJECT_REF.supabase.co/functions/v1/get-pipeline-status`

## Authentication

All functions require a valid JWT token in the Authorization header:

```typescript
// Example usage in your app
const response = await fetch('https://YOUR_PROJECT_REF.supabase.co/functions/v1/get-jobs', {
  headers: {
    'Authorization': `Bearer ${userToken}`,
    'Content-Type': 'application/json'
  }
});
```

## Troubleshooting

### Function Not Found
```bash
# Check if function exists
supabase functions list --project-ref YOUR_PROJECT_REF

# Redeploy if needed
supabase functions deploy FUNCTION_NAME --project-ref YOUR_PROJECT_REF
```

### Authentication Errors
- Ensure you're using a valid JWT token
- Check that the token hasn't expired
- Verify the user is authenticated in your app

### RLS Errors
- Make sure you've applied the database migrations
- Verify RLS policies are enabled
- Check that the user has the correct permissions

## Monitoring

### View Function Logs
```bash
# View logs for specific function
supabase functions logs FUNCTION_NAME --project-ref YOUR_PROJECT_REF

# View all function logs
supabase functions logs --project-ref YOUR_PROJECT_REF
```

### Supabase Dashboard
- Go to **Edge Functions** in your Supabase dashboard
- View function metrics and logs
- Monitor performance and errors

## Update Functions

To update functions after making changes:

```bash
# Update specific function
supabase functions deploy FUNCTION_NAME --project-ref YOUR_PROJECT_REF

# Update all functions
./scripts/deploy-functions.sh YOUR_PROJECT_REF
```

## Production Considerations

1. **Environment Variables** - Set all required env vars in Supabase dashboard
2. **Rate Limiting** - Consider implementing rate limiting
3. **Monitoring** - Set up alerts for function errors
4. **Security** - Never expose service role keys in functions
5. **Performance** - Monitor function execution times and optimize as needed
