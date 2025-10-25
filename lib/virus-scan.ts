import { logSecurityEvent } from './logger';

// Simple content-based virus scanning
// In production, you'd integrate with ClamAV or similar
export interface ScanResult {
  clean: boolean;
  threats: string[];
  scanTime: number;
}

// Known malicious patterns
const MALICIOUS_PATTERNS = [
  // Script injection patterns
  /<script[^>]*>.*?eval\s*\(.*?<\/script>/gi,
  /<script[^>]*>.*?document\.write.*?<\/script>/gi,
  /<script[^>]*>.*?innerHTML\s*=.*?<\/script>/gi,
  /javascript:\s*eval\s*\(/gi,
  /javascript:\s*document\.write/gi,
  
  // Shell injection patterns
  /;\s*rm\s+-rf/gi,
  /;\s*wget\s+/gi,
  /;\s*curl\s+/gi,
  /;\s*nc\s+/gi,
  /;\s*cat\s+\/etc\/passwd/gi,
  
  // SQL injection patterns
  /union\s+select.*?from/gi,
  /drop\s+table/gi,
  /delete\s+from/gi,
  /insert\s+into/gi,
  /update\s+.*?set/gi,
  
  // File system access patterns
  /\.\.\/\.\.\//gi,
  /\/etc\/passwd/gi,
  /\/etc\/shadow/gi,
  /\/proc\/self\/environ/gi,
  
  // Network patterns
  /fetch\s*\(\s*['"]http/gi,
  /XMLHttpRequest/gi,
  /WebSocket/gi,
  
  // Base64 encoded suspicious content
  /data:text\/html;base64,.*?<script/gi,
  /data:application\/javascript;base64,/gi,
];

// Suspicious file extensions
const SUSPICIOUS_EXTENSIONS = [
  '.exe', '.bat', '.cmd', '.com', '.scr', '.pif', '.vbs', '.js', '.jar',
  '.php', '.asp', '.aspx', '.jsp', '.py', '.pl', '.sh', '.ps1'
];

export async function scanContent(content: string, filename: string): Promise<ScanResult> {
  const startTime = Date.now();
  const threats: string[] = [];
  
  try {
    // Check file extension
    const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
    if (SUSPICIOUS_EXTENSIONS.includes(ext)) {
      threats.push(`Suspicious file extension: ${ext}`);
    }
    
    // Check content size
    if (content.length > 10 * 1024 * 1024) { // 10MB
      threats.push('File too large for scanning');
    }
    
    // Scan for malicious patterns
    for (const pattern of MALICIOUS_PATTERNS) {
      const matches = content.match(pattern);
      if (matches) {
        threats.push(`Malicious pattern detected: ${pattern.toString()}`);
        logSecurityEvent('malicious_content_detected', {
          filename,
          pattern: pattern.toString(),
          matches: matches.length,
          content: content.substring(0, 200) // Log first 200 chars
        });
      }
    }
    
    // Check for suspicious base64 content
    const base64Pattern = /data:([^;]+);base64,([A-Za-z0-9+/=]+)/gi;
    const base64Matches = content.match(base64Pattern);
    if (base64Matches) {
      for (const match of base64Matches) {
        const mimeType = match.match(/data:([^;]+);/)?.[1];
        if (mimeType && !['image/', 'text/', 'application/json'].some(type => mimeType.startsWith(type))) {
          threats.push(`Suspicious base64 content: ${mimeType}`);
        }
      }
    }
    
    // Check for excessive use of special characters (potential obfuscation)
    const specialCharRatio = (content.match(/[^\w\s]/g) || []).length / content.length;
    if (specialCharRatio > 0.3 && content.length > 1000) {
      threats.push('High ratio of special characters (potential obfuscation)');
    }
    
    const scanTime = Date.now() - startTime;
    
    return {
      clean: threats.length === 0,
      threats,
      scanTime
    };
    
  } catch (error) {
    logSecurityEvent('virus_scan_error', {
      filename,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return {
      clean: false,
      threats: ['Virus scan failed'],
      scanTime: Date.now() - startTime
    };
  }
}

// Scan multiple files
export async function scanFiles(files: Array<{ path: string; data: string }>): Promise<{
  allClean: boolean;
  results: Array<{ path: string; result: ScanResult }>;
  totalThreats: number;
}> {
  const results = await Promise.all(
    files.map(async (file) => ({
      path: file.path,
      result: await scanContent(file.data, file.path)
    }))
  );
  
  const allClean = results.every(r => r.result.clean);
  const totalThreats = results.reduce((sum, r) => sum + r.result.threats.length, 0);
  
  return {
    allClean,
    results,
    totalThreats
  };
}

// Integration point for ClamAV (placeholder)
export async function scanWithClamAV(content: string, filename: string): Promise<ScanResult> {
  // In production, this would:
  // 1. Write content to temp file
  // 2. Call ClamAV daemon or API
  // 3. Parse results
  // 4. Clean up temp file
  
  // For now, fall back to pattern-based scanning
  return scanContent(content, filename);
}
