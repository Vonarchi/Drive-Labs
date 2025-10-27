import { NextResponse } from "next/server";
import { generateProjectFiles } from "@/lib/generator";
import { TemplateInputZ } from "@/lib/schemas";
import archiver from "archiver";
import { Readable } from "stream";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const spec = TemplateInputZ.parse(body);
    const files = await generateProjectFiles(spec);

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