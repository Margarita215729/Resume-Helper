import { NextRequest, NextResponse } from 'next/server';
import { AIResumeService } from '@/services/ai-resume.service';
import { requireAuth, validateInput, handleApiError } from '@/lib/api-utils';
import { z } from 'zod';

const generateResumeSchema = z.object({
  profileData: z.object({
    personalInfo: z.object({
      fullName: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      location: z.string().optional(),
    }),
    experience: z.array(z.any()).optional(),
    education: z.array(z.any()).optional(),
    skills: z.array(z.string()).optional(),
    projects: z.array(z.any()).optional(),
  }),
  options: z.object({
    template: z.string().optional(),
    style: z.string().optional(),
  }).optional(),
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
    const validatedData = validateInput(generateResumeSchema, body);
    if (validatedData instanceof NextResponse) {
      return validatedData;
    }

    const resume = await AIResumeService.generateResume(
      validatedData.profileData, 
      validatedData.options
    );

    return NextResponse.json(resume);
  } catch (error) {
    return handleApiError(error);
  }
}
