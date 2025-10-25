import pino from 'pino';

// Create logger instance
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    }
  } : undefined,
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      headers: {
        'user-agent': req.headers['user-agent'],
        'content-type': req.headers['content-type'],
        'content-length': req.headers['content-length'],
      },
      remoteAddress: req.remoteAddress,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
      headers: {
        'content-type': res.headers['content-type'],
        'content-length': res.headers['content-length'],
      },
    }),
  },
});

// Request logging middleware
export function logRequest(req: any, res: any, next?: any) {
  const start = Date.now();
  
  logger.info({
    req,
    msg: 'Incoming request'
  });

  if (res) {
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.info({
        req,
        res,
        duration,
        msg: 'Request completed'
      });
    });
  }
}

// API endpoint logging
export function logApiCall(endpoint: string, method: string, data: any, result: any) {
  logger.info({
    endpoint,
    method,
    requestSize: JSON.stringify(data).length,
    responseSize: JSON.stringify(result).length,
    timestamp: new Date().toISOString(),
    msg: 'API call completed'
  });
}

// Error logging
export function logError(error: Error, context: any = {}) {
  logger.error({
    err: error,
    ...context,
    msg: 'Error occurred'
  });
}

// Security event logging
export function logSecurityEvent(event: string, details: any) {
  logger.warn({
    securityEvent: event,
    ...details,
    msg: 'Security event detected'
  });
}
