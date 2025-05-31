import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import type { ResumeData } from '@/types/resume';

export interface PDFExportOptions {
  template?: 'professional' | 'modern' | 'creative' | 'ats-friendly';
  fontSize?: number;
  margin?: number;
  includeColors?: boolean;
  primaryColor?: { r: number; g: number; b: number };
}

export class PDFExportService {
  
  /**
   * Export resume data to PDF format
   */
  static async exportToPDF(
    resumeData: ResumeData,
    options: PDFExportOptions = {}
  ): Promise<Uint8Array> {
    const {
      template = 'professional',
      fontSize = 11,
      margin = 50,
      includeColors = true,
      primaryColor = { r: 0.2, g: 0.3, b: 0.7 }
    } = options;

    const pdfDoc = await PDFDocument.create();
    
    // Add fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    let page = pdfDoc.addPage([612, 792]); // Letter size
    const { width, height } = page.getSize();
    
    let yPosition = height - margin;
    const lineHeight = fontSize + 2;
    const sectionSpacing = 15;
    
    // Colors
    const primaryRgb = includeColors ? rgb(primaryColor.r, primaryColor.g, primaryColor.b) : rgb(0, 0, 0);
    const textColor = rgb(0.1, 0.1, 0.1);
    const grayColor = rgb(0.4, 0.4, 0.4);

    // Helper function to add text
    const addText = (
      text: string,
      x: number,
      y: number,
      options: {
        font?: typeof font | typeof boldFont;
        size?: number;
        color?: typeof textColor;
        maxWidth?: number;
      } = {}
    ) => {
      const { font: textFont = font, size = fontSize, color = textColor, maxWidth = width - 2 * margin } = options;
      
      // Handle text wrapping
      const words = text.split(' ');
      let line = '';
      let currentY = y;
      
      for (const word of words) {
        const testLine = line + (line ? ' ' : '') + word;
        const testWidth = textFont.widthOfTextAtSize(testLine, size);
        
        if (testWidth > maxWidth && line) {
          page.drawText(line, {
            x,
            y: currentY,
            size,
            font: textFont,
            color
          });
          line = word;
          currentY -= lineHeight;
        } else {
          line = testLine;
        }
      }
      
      if (line) {
        page.drawText(line, {
          x,
          y: currentY,
          size,
          font: textFont,
          color
        });
        currentY -= lineHeight;
      }
      
      return currentY;
    };

    // Helper function to add section header
    const addSectionHeader = (title: string, y: number) => {
      if (includeColors) {
        // Add colored line
        page.drawRectangle({
          x: margin,
          y: y - 2,
          width: width - 2 * margin,
          height: 1,
          color: primaryRgb
        });
      }
      
      return addText(title.toUpperCase(), margin, y - 8, {
        font: boldFont,
        size: fontSize + 1,
        color: primaryRgb
      });
    };

    // Check if we need a new page
    const checkNewPage = (requiredSpace: number) => {
      if (yPosition - requiredSpace < margin) {
        page = pdfDoc.addPage([612, 792]);
        yPosition = height - margin;
      }
    };

    try {
      // Header with name and contact info
      if (resumeData.personalInfo?.fullName) {
        checkNewPage(60);
        yPosition = addText(resumeData.personalInfo.fullName, margin, yPosition, {
          font: boldFont,
          size: fontSize + 6,
          color: primaryRgb
        }) - 5;
        
        const contactInfo = [
          resumeData.personalInfo.email,
          resumeData.personalInfo.phone,
          resumeData.personalInfo.location,
          resumeData.personalInfo.linkedin,
        ].filter(Boolean).join(' • ');
        
        yPosition = addText(contactInfo, margin, yPosition, {
          size: fontSize - 1,
          color: grayColor
        }) - sectionSpacing;
      }

      // Professional Summary
      if (resumeData.summary) {
        checkNewPage(40);
        yPosition = addSectionHeader('Professional Summary', yPosition) - 10;
        yPosition = addText(resumeData.summary, margin, yPosition) - sectionSpacing;
      }

      // Experience
      if (resumeData.experience && resumeData.experience.length > 0) {
        checkNewPage(60);
        yPosition = addSectionHeader('Professional Experience', yPosition) - 10;
        
        for (const exp of resumeData.experience) {
          checkNewPage(80);
          
          // Job title and dates
          const titleLine = `${exp.title} | ${exp.company}`;
          yPosition = addText(titleLine, margin, yPosition, {
            font: boldFont
          }) - 2;
          
          const dateLine = `${exp.startDate} - ${exp.endDate}${exp.location ? ' | ' + exp.location : ''}`;
          yPosition = addText(dateLine, margin, yPosition, {
            size: fontSize - 1,
            color: grayColor
          }) - 5;
          
          // Description
          if (exp.description) {
            yPosition = addText(exp.description, margin, yPosition) - 3;
          }
          
          // Achievements
          if (exp.achievements && exp.achievements.length > 0) {
            for (const achievement of exp.achievements) {
              yPosition = addText(`• ${achievement}`, margin + 10, yPosition) - 2;
            }
          }
          
          yPosition -= 10;
        }
      }

      // Education
      if (resumeData.education && resumeData.education.length > 0) {
        checkNewPage(60);
        yPosition = addSectionHeader('Education', yPosition) - 10;
        
        for (const edu of resumeData.education) {
          checkNewPage(40);
          
          const eduLine = `${edu.degree}${edu.fieldOfStudy ? ' in ' + edu.fieldOfStudy : ''} | ${edu.institution}`;
          yPosition = addText(eduLine, margin, yPosition, {
            font: boldFont
          }) - 2;
          
          const eduDetails = [
            edu.graduationYear,
            edu.gpa ? `GPA: ${edu.gpa}` : null
          ].filter(Boolean).join(' | ');
          
          if (eduDetails) {
            yPosition = addText(eduDetails, margin, yPosition, {
              size: fontSize - 1,
              color: grayColor
            }) - 2;
          }
          
          if (edu.honors && edu.honors.length > 0) {
            yPosition = addText(`Honors: ${edu.honors.join(', ')}`, margin, yPosition, {
              size: fontSize - 1
            }) - 2;
          }
          
          yPosition -= 8;
        }
      }

      // Skills
      if (resumeData.skills) {
        checkNewPage(60);
        yPosition = addSectionHeader('Skills', yPosition) - 10;
        
        const skillCategories = [
          { label: 'Technical Skills', skills: resumeData.skills.technical },
          { label: 'Soft Skills', skills: resumeData.skills.soft },
          { label: 'Languages', skills: resumeData.skills.languages },
          { label: 'Certifications', skills: resumeData.skills.certifications }
        ];
        
        for (const category of skillCategories) {
          if (category.skills && category.skills.length > 0) {
            checkNewPage(30);
            yPosition = addText(`${category.label}:`, margin, yPosition, {
              font: boldFont,
              size: fontSize - 1
            }) - 2;
            yPosition = addText(category.skills.join(', '), margin + 10, yPosition, {
              size: fontSize - 1
            }) - 8;
          }
        }
      }

      // Projects
      if (resumeData.projects && resumeData.projects.length > 0) {
        checkNewPage(60);
        yPosition = addSectionHeader('Projects', yPosition) - 10;
        
        for (const project of resumeData.projects) {
          checkNewPage(50);
          
          yPosition = addText(project.name, margin, yPosition, {
            font: boldFont
          }) - 2;
          
          if (project.description) {
            yPosition = addText(project.description, margin, yPosition) - 2;
          }
          
          if (project.technologies && project.technologies.length > 0) {
            yPosition = addText(`Technologies: ${project.technologies.join(', ')}`, margin, yPosition, {
              size: fontSize - 1,
              color: grayColor
            }) - 2;
          }
          
          if (project.url) {
            yPosition = addText(`URL: ${project.url}`, margin, yPosition, {
              size: fontSize - 1,
              color: primaryRgb
            }) - 2;
          }
          
          yPosition -= 8;
        }
      }

      return await pdfDoc.save();
      
    } catch (error) {
      console.error('Error creating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  }

  /**
   * Generate and download PDF
   */
  static async downloadPDF(
    resumeData: ResumeData,
    filename: string = 'resume.pdf',
    options: PDFExportOptions = {}
  ): Promise<void> {
    try {
      const pdfBytes = await this.exportToPDF(resumeData, options);
      
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      throw new Error('Failed to download PDF');
    }
  }
}
