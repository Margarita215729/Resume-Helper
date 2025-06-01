import { NextRequest, NextResponse } from 'next/server';

// Configure for dynamic runtime
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const healthChecks = {
    timestamp: new Date().toISOString(),
    status: 'healthy',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    checks: {
      database: 'healthy', // Add actual DB check when implemented
      ai_service: await checkAIService(),
      memory: checkMemoryUsage(),
      uptime: process.uptime(),
    }
  };

  const isHealthy = Object.values(healthChecks.checks).every(
    check => check === 'healthy' || typeof check === 'number'
  );

  return NextResponse.json(
    healthChecks, 
    { status: isHealthy ? 200 : 503 }
  );
}

async function checkAIService(): Promise<string> {
  try {
    // Simple check - verify environment variables exist
    const hasGithubToken = !!process.env.GITHUB_TOKEN;
    const hasAzureConfig = !!(process.env.AZURE_OPENAI_ENDPOINT && process.env.AZURE_OPENAI_API_KEY);
    
    if (hasGithubToken || hasAzureConfig) {
      return 'healthy';
    } else {
      return 'degraded';
    }
  } catch (error) {
    return 'unhealthy';
  }
}

function checkMemoryUsage(): string {
  const memUsage = process.memoryUsage();
  const heapUsedMB = memUsage.heapUsed / 1024 / 1024;
  
  // Flag as unhealthy if using more than 512MB
  return heapUsedMB > 512 ? 'degraded' : 'healthy';
}
