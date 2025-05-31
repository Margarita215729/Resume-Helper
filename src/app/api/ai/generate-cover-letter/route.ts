import { NextRequest, NextResponse } from 'next/server';
import { AIResumeService } from '@/services/ai-resume.service';

export async function POST(request: NextRequest) {
  try {
    const { profileData, jobDescription } = await request.json();

    if (!profileData || !jobDescription) {
      return NextResponse.json(
        { error: 'Profile data and job description are required' },
        { status: 400 }
      );
    }

    const coverLetter = await AIResumeService.generateCoverLetter(profileData, jobDescription);

    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error('Error generating cover letter:', error);
    return NextResponse.json(
      { error: 'Failed to generate cover letter' },
      { status: 500 }
    );
  }
}
