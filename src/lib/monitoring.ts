// Initialize Azure Monitor only in production and server-side
// Temporarily disabled due to build issues with webpack and missing dependencies
// if (typeof window === 'undefined' && process.env.NODE_ENV === 'production' && process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
//   const { useAzureMonitor } = require('@azure/monitor-opentelemetry');
//   
//   useAzureMonitor({
//     connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
//     enableAutoCollectLogs: true,
//     enableAutoCollectExceptions: true,
//     enableAutoCollectRequests: true,
//     enableAutoCollectDependencies: true,
//     enableAutoCollectPerformance: true,
//   });
// }

console.log('Monitoring initialized (Azure Monitor disabled for build compatibility)');
