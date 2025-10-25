import { TemplateInput } from './schemas';
import { logSecurityEvent } from './logger';

// Safety limits
export const SAFETY_LIMITS = {
  MAX_PAGES: 20,
  MAX_FILES: 100,
  MAX_FILE_SIZE: 1024 * 1024, // 1MB per file
  MAX_TOTAL_SIZE: 50 * 1024 * 1024, // 50MB total
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_FEATURES: 10,
  MAX_ASSETS: 50,
  MAX_ASSET_SIZE: 5 * 1024 * 1024, // 5MB per asset
};

// Validate spec size and content
export function validateSpecSafety(spec: TemplateInput): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check basic limits
  if (spec.name.length > SAFETY_LIMITS.MAX_NAME_LENGTH) {
    errors.push(`Project name too long (max ${SAFETY_LIMITS.MAX_NAME_LENGTH} chars)`);
  }

  if (spec.description && spec.description.length > SAFETY_LIMITS.MAX_DESCRIPTION_LENGTH) {
    errors.push(`Description too long (max ${SAFETY_LIMITS.MAX_DESCRIPTION_LENGTH} chars)`);
  }

  if (spec.pages.length > SAFETY_LIMITS.MAX_PAGES) {
    errors.push(`Too many pages (max ${SAFETY_LIMITS.MAX_PAGES})`);
  }

  if (spec.features.length > SAFETY_LIMITS.MAX_FEATURES) {
    errors.push(`Too many features (max ${SAFETY_LIMITS.MAX_FEATURES})`);
  }

  if (spec.assets.length > SAFETY_LIMITS.MAX_ASSETS) {
    errors.push(`Too many assets (max ${SAFETY_LIMITS.MAX_ASSETS})`);
  }

  // Check asset sizes
  let totalSize = 0;
  for (const asset of spec.assets) {
    if (asset.contents.length > SAFETY_LIMITS.MAX_ASSET_SIZE) {
      errors.push(`Asset ${asset.path} too large (max ${SAFETY_LIMITS.MAX_ASSET_SIZE} bytes)`);
    }
    totalSize += asset.contents.length;
  }

  if (totalSize > SAFETY_LIMITS.MAX_TOTAL_SIZE) {
    errors.push(`Total asset size too large (max ${SAFETY_LIMITS.MAX_TOTAL_SIZE} bytes)`);
  }

  // Check for suspicious content
  const suspiciousPatterns = [
    /<script[^>]*>.*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /eval\s*\(/gi,
    /document\.write/gi,
    /innerHTML\s*=/gi,
  ];

  for (const asset of spec.assets) {
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(asset.contents)) {
        errors.push(`Suspicious content detected in ${asset.path}`);
        logSecurityEvent('suspicious_content', {
          file: asset.path,
          pattern: pattern.toString(),
        });
      }
    }
  }

  // Check for valid file extensions
  const allowedExtensions = ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json', '.md', '.txt', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico'];
  for (const asset of spec.assets) {
    const ext = asset.path.substring(asset.path.lastIndexOf('.'));
    if (!allowedExtensions.includes(ext.toLowerCase())) {
      errors.push(`Unsupported file type: ${ext} in ${asset.path}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Validate generated files
export function validateGeneratedFiles(files: Array<{ path: string; data: string }>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (files.length > SAFETY_LIMITS.MAX_FILES) {
    errors.push(`Too many generated files (max ${SAFETY_LIMITS.MAX_FILES})`);
  }

  let totalSize = 0;
  for (const file of files) {
    if (file.data.length > SAFETY_LIMITS.MAX_FILE_SIZE) {
      errors.push(`File ${file.path} too large (max ${SAFETY_LIMITS.MAX_FILE_SIZE} bytes)`);
    }
    totalSize += file.data.length;
  }

  if (totalSize > SAFETY_LIMITS.MAX_TOTAL_SIZE) {
    errors.push(`Total generated size too large (max ${SAFETY_LIMITS.MAX_TOTAL_SIZE} bytes)`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Sanitize file path
export function sanitizeFilePath(path: string): string {
  // Remove any path traversal attempts
  return path
    .replace(/\.\./g, '')
    .replace(/\/+/g, '/')
    .replace(/^\/+/, '')
    .replace(/[^a-zA-Z0-9\/\-_\.]/g, '_');
}

// Rate limiting (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string, limit: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now();
  const key = ip;
  const current = rateLimitMap.get(key);

  if (!current || now > current.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= limit) {
    logSecurityEvent('rate_limit_exceeded', { ip, limit, windowMs });
    return false;
  }

  current.count++;
  return true;
}
