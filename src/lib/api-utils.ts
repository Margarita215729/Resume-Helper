import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../auth';
import { z } from 'zod';
import { logError, logInfo } from './logger';

export async function requireAuth(request: NextRequest) {
  const session = await auth();
  
  if (!session?.user) {
    logInfo('Unauthorized API access attempt', { 
      url: request.url,
      userAgent: request.headers.get('user-agent'),
      ip: request.ip 
    });
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  logInfo('Authenticated API access', { 
    userId: session.user.id,
    email: session.user.email,
    url: request.url 
  });
  
  return session;
}

export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T | NextResponse {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    return NextResponse.json(
      { 
        error: 'Validation failed', 
        details: result.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
        }))
      },
      { status: 400 }
    );
  }
  
  return result.data;
}

export function sanitizeHtml(input: string): string {
  // Basic HTML sanitization - in production, use a library like DOMPurify
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof z.ZodError) {
    logError('Validation error', error, { issues: error.issues });
    return NextResponse.json(
      { error: 'Validation failed', details: error.issues },
      { status: 400 }
    );
  }
  
  if (error instanceof Error) {
    logError('API Error', error);
    // Don't expose internal error messages in production
    const message = process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : error.message;
      
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
  
  logError('Unknown API error', undefined, { error: String(error) });
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
