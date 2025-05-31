import { NextRequest, NextResponse } from 'next/server';
import { AIResumeService } from '@/services/ai-resume.service';

export async function POST(request: NextRequest) {
  try {
    const { jobDescription } = await request.json();

    if (!jobDescription) {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      );
    }

    const analysis = await AIResumeService.analyzeJobPosting(jobDescription);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error analyzing job:', error);
    return NextResponse.json(
      { error: 'Failed to analyze job posting' },
      { status: 500 }
    );
  }
}
