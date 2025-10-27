import { NextResponse } from "next/server";
import { generateProjectFiles } from "@/lib/generator";
import { TemplateInputZ } from "@/lib/schemas";
import archiver from "archiver";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const spec = TemplateInputZ.parse(body);
    const files = await generateProjectFiles(spec);

    // Generate run_id for tracking
    const runId = `build-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Create ZIP file
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    // Add files to archive
    for (const file of files) {
      archive.append(file.data, { name: file.path });
    }

    // Finalize the archive
    await archive.finalize();

    // Convert archive to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of archive) {
      chunks.push(chunk as Buffer);
    }
    const buffer = Buffer.concat(chunks);

    // Save job to Supabase
    try {
      const { error } = await supabase.from('jobs').insert({
        run_id: runId,
        project_spec: spec,
        status: 'completed',
        completed_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Failed to save job to Supabase:", error);
        // Don't fail the request if DB save fails
      }

      // Save as artifact
      await supabase.from('artifacts').insert({
        run_id: runId,
        kind: 'project-zip',
        url: `download://${spec.name}-starter.zip`,
        meta: {
          filename: `${spec.name}-starter.zip`,
          size: buffer.length,
          type: 'application/zip',
        },
        created_at: new Date().toISOString(),
      });

    } catch (dbError) {
      console.error("Database error:", dbError);
      // Continue even if DB operations fail
    }

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${spec.name}-starter.zip"`,
      },
    });

  } catch (error) {
    console.error("Build API Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate project", 
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}