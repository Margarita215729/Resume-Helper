import { NextRequest, NextResponse } from 'next/server';
import { DOCXExportService } from '@/services/docx-export.service';
import type { ResumeData } from '@/types/resume';

export async function POST(request: NextRequest) {
  try {
    const { resumeData, template = 'professional' } = await request.json();

    if (!resumeData) {
      return NextResponse.json(
        { error: 'Resume data is required' },
        { status: 400 }
      );
    }

    const docxBuffer = await DOCXExportService.exportToDOCX(resumeData as ResumeData, {
      template: template as 'professional' | 'modern' | 'creative' | 'ats-friendly'
    });

    return new NextResponse(docxBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="resume.docx"',
      },
    });
  } catch (error) {
    console.error('DOCX export error:', error);
    return NextResponse.json(
      { error: 'Failed to export DOCX' },
      { status: 500 }
    );
  }
}
