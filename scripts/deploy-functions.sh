#!/bin/bash

# Deploy Drive Labs Edge Functions to Supabase
# Usage: ./scripts/deploy-functions.sh <YOUR_PROJECT_REF>

set -e

PROJECT_REF=$1

if [ -z "$PROJECT_REF" ]; then
    echo "❌ Error: Project reference required"
    echo "Usage: ./scripts/deploy-functions.sh <YOUR_PROJECT_REF>"
    echo ""
    echo "Get your project reference from:"
    echo "1. Supabase Dashboard → Settings → General"
    echo "2. Or from your project URL: https://supabase.com/dashboard/project/<PROJECT_REF>"
    exit 1
fi

echo "🚀 Deploying Edge Functions to project: $PROJECT_REF"
echo ""

# Deploy each function
echo "📦 Deploying get-jobs function..."
supabase functions deploy get-jobs --project-ref $PROJECT_REF

echo "📦 Deploying get-job-events function..."
supabase functions deploy get-job-events --project-ref $PROJECT_REF

echo "📦 Deploying get-artifacts function..."
supabase functions deploy get-artifacts --project-ref $PROJECT_REF

echo "📦 Deploying get-pipeline-status function..."
supabase functions deploy get-pipeline-status --project-ref $PROJECT_REF

echo ""
echo "✅ All functions deployed successfully!"
echo ""
echo "🔗 Function URLs:"
echo "  - get-jobs: https://$PROJECT_REF.supabase.co/functions/v1/get-jobs"
echo "  - get-job-events: https://$PROJECT_REF.supabase.co/functions/v1/get-job-events"
echo "  - get-artifacts: https://$PROJECT_REF.supabase.co/functions/v1/get-artifacts"
echo "  - get-pipeline-status: https://$PROJECT_REF.supabase.co/functions/v1/get-pipeline-status"
echo ""
echo "🧪 Test with curl:"
echo "curl -H 'Authorization: Bearer <your-jwt-token>' \\"
echo "  https://$PROJECT_REF.supabase.co/functions/v1/get-jobs"
