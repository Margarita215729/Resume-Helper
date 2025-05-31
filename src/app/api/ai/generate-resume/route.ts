import { NextRequest, NextResponse } from 'next/server';
import { AIResumeService } from '@/services/ai-resume.service';

export async function POST(request: NextRequest) {
  try {
    const { profileData, options } = await request.json();

    if (!profileData) {
      return NextResponse.json(
        { error: 'Profile data is required' },
        { status: 400 }
      );
    }

    const resume = await AIResumeService.generateResume(profileData, options);

    return NextResponse.json(resume);
  } catch (error) {
    console.error('Error generating resume:', error);
    return NextResponse.json(
      { error: 'Failed to generate resume' },
      { status: 500 }
    );
  }
}
