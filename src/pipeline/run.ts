import type { ProjectSpec } from '../schemas/project_spec';
import { driveLabsPipeline } from '../pipelines/app_pipeline';

export async function runPipeline(spec: ProjectSpec, ownerId?: string) {
  try {
    // Call the main pipeline with owner_id support
    const result = await driveLabsPipeline(spec, ownerId);
    
    return {
      message: `Pipeline completed for ${spec.name}`,
      runId: result.runId,
      ownerId,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    console.error('Pipeline execution failed:', err);
    throw new Error(`Pipeline failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}
