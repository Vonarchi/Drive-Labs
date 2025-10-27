import { NextResponse } from "next/server";
import { logger, logApiCall, logError, logSecurityEvent } from "@/lib/logger";
import { checkRateLimit, validateGeneratedFiles } from "@/lib/safety";

export async function POST(req: Request) {
  const startTime = Date.now();
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  
  try {
    // Rate limiting
    if (!checkRateLimit(clientIP, 3, 60000)) { // 3 previews per minute
      logSecurityEvent('rate_limit_exceeded', { ip: clientIP, endpoint: '/api/preview/vercel' });
      return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 });
    }

    const { files, name } = await req.json();

    // Validate files
    if (!files || typeof files !== 'object') {
      return NextResponse.json({ error: "Invalid files provided" }, { status: 400 });
    }

    // Convert files to array format for validation
    const fileArray = Object.entries(files).map(([path, data]) => ({ path, data: data as string }));
    const fileValidation = validateGeneratedFiles(fileArray);
    
    if (!fileValidation.valid) {
      logSecurityEvent('preview_files_validation_failed', {
        ip: clientIP,
        errors: fileValidation.errors,
        fileCount: fileArray.length
      });
      
      return NextResponse.json({
        error: "Files validation failed",
        details: fileValidation.errors
      }, { status: 400 });
    }

    // Validate name - sanitize if needed
    const sanitizedName = name ? name.replace(/[^a-zA-Z0-9\-_]/g, '-').toLowerCase() : 'drive-labs-preview';
    if (sanitizedName.length > 50 || !/^[a-zA-Z0-9\-_]+$/.test(sanitizedName)) {
      logSecurityEvent('invalid_deployment_name', { ip: clientIP, name: sanitizedName });
      return NextResponse.json({ error: "Invalid deployment name" }, { status: 400 });
    }

    logger.info({
      endpoint: '/api/preview/vercel',
      clientIP,
      fileCount: fileArray.length,
      name: sanitizedName || 'drive-labs-preview',
      msg: 'Vercel preview request received'
    });

    const response = await fetch(`https://api.vercel.com/v13/deployments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: sanitizedName || "drive-labs-preview",
        files,
        target: "preview",
        teamId: process.env.VERCEL_ORG_ID,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      logError(new Error(`Vercel API error: ${response.status}`), {
        endpoint: '/api/preview/vercel',
        clientIP,
        vercelError: data
      });
      return NextResponse.json({ error: data }, { status: response.status });
    }

    const duration = Date.now() - startTime;
    logApiCall('/api/preview/vercel', 'POST', { 
      fileCount: fileArray.length, 
      name: name || 'drive-labs-preview' 
    }, {
      success: true,
      deploymentId: data?.id,
      previewUrl: data?.url,
      duration
    });

    return NextResponse.json({
      previewUrl: data?.url ? `https://${data.url}` : null,
      deploymentId: data?.id,
      message: "✅ Preview deployed successfully.",
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logError(error as Error, { 
      endpoint: '/api/preview/vercel', 
      clientIP, 
      duration 
    });
    
    return NextResponse.json(
      { 
        error: "Failed to deploy preview.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
