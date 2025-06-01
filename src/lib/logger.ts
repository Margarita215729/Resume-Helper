// Server-side logger using winston
let logger: any = null;

// Initialize winston only on server side
if (typeof window === 'undefined') {
  const winston = require('winston');
  
  // Create logger configuration
  const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  );

  // Create logger instance
  logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    defaultMeta: { service: 'resume-helper' },
    transports: [
      // Console transport for development
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      }),
      
      // File transport for production
      ...(process.env.NODE_ENV === 'production' ? [
        new winston.transports.File({ 
          filename: 'logs/error.log', 
          level: 'error' 
        }),
        new winston.transports.File({ 
          filename: 'logs/combined.log' 
        })
      ] : [])
    ],
  });
}

// Create structured logging functions
export const logError = (message: string, error?: Error, metadata?: object) => {
  if (typeof window === 'undefined' && logger) {
    logger.error(message, {
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : undefined,
      ...metadata,
    });
  } else {
    // Fallback to console in browser
    console.error(message, error, metadata);
  }
};

export const logInfo = (message: string, metadata?: object) => {
  if (typeof window === 'undefined' && logger) {
    logger.info(message, metadata);
  } else {
    // Fallback to console in browser
    console.info(message, metadata);
  }
};

export const logWarn = (message: string, metadata?: object) => {
  if (typeof window === 'undefined' && logger) {
    logger.warn(message, metadata);
  } else {
    // Fallback to console in browser
    console.warn(message, metadata);
  }
};

// Export a safe logger that works in both environments
export { logger };

export const logWarning = (message: string, metadata?: object) => {
  logger.warn(message, metadata);
};

export const logDebug = (message: string, metadata?: object) => {
  logger.debug(message, metadata);
};
