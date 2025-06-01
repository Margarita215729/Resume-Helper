import { NextRequest, NextResponse } from 'next/server';
import { AIResumeService } from '@/services/ai-resume.service';
import { requireAuth, validateInput, handleApiError, sanitizeHtml } from '@/lib/api-utils';
import { z } from 'zod';

const analyzeJobSchema = z.object({
  jobDescription: z.string().min(10, 'Job description must be at least 10 characters').max(10000, 'Job description is too long'),
});

export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const session = await requireAuth(request);
    if (session instanceof NextResponse) {
      return session;
    }

    const body = await request.json();
    
    // Validate input
    const validatedData = validateInput(analyzeJobSchema, body);
    if (validatedData instanceof NextResponse) {
      return validatedData;
    }

    // Sanitize input
    const sanitizedJobDescription = sanitizeHtml(validatedData.jobDescription);

    const analysis = await AIResumeService.analyzeJobPosting(sanitizedJobDescription);

    return NextResponse.json(analysis);
  } catch (error) {
    return handleApiError(error);
  }
}
