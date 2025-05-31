import { NextRequest, NextResponse } from 'next/server';
import { PDFExportService } from '@/services/pdf-export.service';
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

    const pdfBytes = await PDFExportService.exportToPDF(resumeData as ResumeData, {
      template: template as 'professional' | 'modern' | 'creative' | 'ats-friendly',
      includeColors: template !== 'ats-friendly'
    });

    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF export error:', error);
    return NextResponse.json(
      { error: 'Failed to export PDF' },
      { status: 500 }
    );
  }
}
