import { NextResponse } from "next/server";
import { generateProjectFiles } from "@/lib/generator";
import { TemplateInputZ } from "@/lib/schemas";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const spec = TemplateInputZ.parse(body);
    const files = await generateProjectFiles(spec);

    // Return files as JSON for now (ZIP streaming has issues in Next.js)
    return NextResponse.json({
      success: true,
      fileCount: files.length,
      files: files.map(f => ({ 
        path: f.path, 
        size: f.data.length,
        content: f.data.substring(0, 200) + (f.data.length > 200 ? '...' : '')
      }))
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