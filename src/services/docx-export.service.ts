import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  AlignmentType,
  UnderlineType,
  BorderStyle,
  ShadingType,
  convertInchesToTwip,
  Tab,
  TabStopPosition,
  TabStopType
} from 'docx';
import { saveAs } from 'file-saver';
import type { ResumeData } from '@/types/resume';

export interface DOCXExportOptions {
  template?: 'professional' | 'modern' | 'creative' | 'ats-friendly';
  includeColors?: boolean;
  fontSize?: number;
  primaryColor?: string;
}

export class DOCXExportService {
  
  /**
   * Export resume data to DOCX format
   */
  static async exportToDOCX(
    resumeData: ResumeData,
    options: DOCXExportOptions = {}
  ): Promise<Blob> {
    const {
      template = 'professional',
      includeColors = true,
      fontSize = 11,
      primaryColor = '2E5BBA'
    } = options;

    try {
      const doc = new Document({
        sections: [{
          properties: {
            page: {
              margin: {
                top: convertInchesToTwip(0.75),
                right: convertInchesToTwip(0.75),
                bottom: convertInchesToTwip(0.75),
                left: convertInchesToTwip(0.75),
              },
            },
          },
          children: [
            ...this.createHeader(resumeData, includeColors, primaryColor),
            ...this.createSummary(resumeData, includeColors, primaryColor),
            ...this.createExperience(resumeData, includeColors, primaryColor),
            ...this.createEducation(resumeData, includeColors, primaryColor),
            ...this.createSkills(resumeData, includeColors, primaryColor),
            ...this.createProjects(resumeData, includeColors, primaryColor),
          ],
        }],
      });

      return await Packer.toBlob(doc);
    } catch (error) {
      console.error('Error creating DOCX:', error);
      throw new Error('Failed to generate DOCX document');
    }
  }

  /**
   * Create header section with personal information
   */
  private static createHeader(
    resumeData: ResumeData, 
    includeColors: boolean, 
    primaryColor: string
  ): Paragraph[] {
    const paragraphs: Paragraph[] = [];

    if (resumeData.personalInfo?.fullName) {
      // Name
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: resumeData.personalInfo.fullName,
              bold: true,
              size: 32,
              color: includeColors ? primaryColor : '000000',
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
        })
      );

      // Contact information
      const contactInfo = [
        resumeData.personalInfo.email,
        resumeData.personalInfo.phone,
        resumeData.personalInfo.location,
      ].filter(Boolean);

      if (contactInfo.length > 0) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: contactInfo.join(' • '),
                size: 20,
                color: '666666',
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
          })
        );
      }

      // LinkedIn and Portfolio
      const links = [
        resumeData.personalInfo.linkedin,
        resumeData.personalInfo.portfolio,
      ].filter(Boolean);

      if (links.length > 0) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: links.join(' • '),
                size: 20,
                color: includeColors ? primaryColor : '000000',
                underline: {
                  type: UnderlineType.SINGLE,
                },
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
          })
        );
      }
    }

    return paragraphs;
  }

  /**
   * Create professional summary section
   */
  private static createSummary(
    resumeData: ResumeData,
    includeColors: boolean,
    primaryColor: string
  ): Paragraph[] {
    const paragraphs: Paragraph[] = [];

    if (resumeData.summary) {
      paragraphs.push(
        this.createSectionHeader('PROFESSIONAL SUMMARY', includeColors, primaryColor)
      );

      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: resumeData.summary,
              size: 22,
            }),
          ],
          spacing: { after: 240 },
        })
      );
    }

    return paragraphs;
  }

  /**
   * Create experience section
   */
  private static createExperience(
    resumeData: ResumeData,
    includeColors: boolean,
    primaryColor: string
  ): Paragraph[] {
    const paragraphs: Paragraph[] = [];

    if (resumeData.experience && resumeData.experience.length > 0) {
      paragraphs.push(
        this.createSectionHeader('PROFESSIONAL EXPERIENCE', includeColors, primaryColor)
      );

      for (const exp of resumeData.experience) {
        // Job title and company
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: exp.title,
                bold: true,
                size: 24,
              }),
              new TextRun({
                text: ` | ${exp.company}`,
                size: 24,
              }),
            ],
            spacing: { before: 120, after: 60 },
          })
        );

        // Dates and location
        const dateLocation = `${exp.startDate} - ${exp.endDate}${exp.location ? ' | ' + exp.location : ''}`;
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: dateLocation,
                size: 20,
                color: '666666',
                italics: true,
              }),
            ],
            spacing: { after: 120 },
          })
        );

        // Description
        if (exp.description) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.description,
                  size: 22,
                }),
              ],
              spacing: { after: 80 },
            })
          );
        }

        // Achievements
        if (exp.achievements && exp.achievements.length > 0) {
          for (const achievement of exp.achievements) {
            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: `• ${achievement}`,
                    size: 22,
                  }),
                ],
                indent: { left: convertInchesToTwip(0.25) },
                spacing: { after: 60 },
              })
            );
          }
        }

        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: '' })],
            spacing: { after: 120 },
          })
        );
      }
    }

    return paragraphs;
  }

  /**
   * Create education section
   */
  private static createEducation(
    resumeData: ResumeData,
    includeColors: boolean,
    primaryColor: string
  ): Paragraph[] {
    const paragraphs: Paragraph[] = [];

    if (resumeData.education && resumeData.education.length > 0) {
      paragraphs.push(
        this.createSectionHeader('EDUCATION', includeColors, primaryColor)
      );

      for (const edu of resumeData.education) {
        // Degree and institution
        const degreeText = `${edu.degree}${edu.fieldOfStudy ? ' in ' + edu.fieldOfStudy : ''} | ${edu.institution}`;
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: degreeText,
                bold: true,
                size: 24,
              }),
            ],
            spacing: { before: 120, after: 60 },
          })
        );

        // Year and GPA
        const details = [
          edu.graduationYear,
          edu.gpa ? `GPA: ${edu.gpa}` : null,
        ].filter(Boolean);

        if (details.length > 0) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: details.join(' | '),
                  size: 20,
                  color: '666666',
                  italics: true,
                }),
              ],
              spacing: { after: 80 },
            })
          );
        }

        // Honors
        if (edu.honors && edu.honors.length > 0) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `Honors: ${edu.honors.join(', ')}`,
                  size: 22,
                }),
              ],
              spacing: { after: 120 },
            })
          );
        }
      }
    }

    return paragraphs;
  }

  /**
   * Create skills section
   */
  private static createSkills(
    resumeData: ResumeData,
    includeColors: boolean,
    primaryColor: string
  ): Paragraph[] {
    const paragraphs: Paragraph[] = [];

    if (resumeData.skills) {
      paragraphs.push(
        this.createSectionHeader('SKILLS', includeColors, primaryColor)
      );

      const skillCategories = [
        { label: 'Technical Skills', skills: resumeData.skills.technical },
        { label: 'Soft Skills', skills: resumeData.skills.soft },
        { label: 'Languages', skills: resumeData.skills.languages },
        { label: 'Certifications', skills: resumeData.skills.certifications },
      ];

      for (const category of skillCategories) {
        if (category.skills && category.skills.length > 0) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${category.label}: `,
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: category.skills.join(', '),
                  size: 22,
                }),
              ],
              spacing: { after: 120 },
            })
          );
        }
      }
    }

    return paragraphs;
  }

  /**
   * Create projects section
   */
  private static createProjects(
    resumeData: ResumeData,
    includeColors: boolean,
    primaryColor: string
  ): Paragraph[] {
    const paragraphs: Paragraph[] = [];

    if (resumeData.projects && resumeData.projects.length > 0) {
      paragraphs.push(
        this.createSectionHeader('PROJECTS', includeColors, primaryColor)
      );

      for (const project of resumeData.projects) {
        // Project name
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: project.name,
                bold: true,
                size: 24,
              }),
            ],
            spacing: { before: 120, after: 60 },
          })
        );

        // Description
        if (project.description) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: project.description,
                  size: 22,
                }),
              ],
              spacing: { after: 80 },
            })
          );
        }

        // Technologies
        if (project.technologies && project.technologies.length > 0) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Technologies: ',
                  bold: true,
                  size: 20,
                }),
                new TextRun({
                  text: project.technologies.join(', '),
                  size: 20,
                  color: '666666',
                }),
              ],
              spacing: { after: 80 },
            })
          );
        }

        // URL
        if (project.url) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `URL: ${project.url}`,
                  size: 20,
                  color: includeColors ? primaryColor : '000000',
                  underline: {
                    type: UnderlineType.SINGLE,
                  },
                }),
              ],
              spacing: { after: 120 },
            })
          );
        }
      }
    }

    return paragraphs;
  }

  /**
   * Create section header with styling
   */
  private static createSectionHeader(
    title: string,
    includeColors: boolean,
    primaryColor: string
  ): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: title,
          bold: true,
          size: 26,
          color: includeColors ? primaryColor : '000000',
        }),
      ],
      spacing: { before: 240, after: 120 },
      border: {
        bottom: {
          style: BorderStyle.SINGLE,
          size: 6,
          color: includeColors ? primaryColor : '000000',
        },
      },
    });
  }

  /**
   * Generate and download DOCX file
   */
  static async downloadDOCX(
    resumeData: ResumeData,
    filename: string = 'resume.docx',
    options: DOCXExportOptions = {}
  ): Promise<void> {
    try {
      const blob = await this.exportToDOCX(resumeData, options);
      saveAs(blob, filename);
    } catch (error) {
      console.error('Error downloading DOCX:', error);
      throw new Error('Failed to download DOCX document');
    }
  }

  /**
   * Import resume from DOCX file
   */
  static async importFromDOCX(file: File): Promise<string> {
    try {
      // This is a placeholder for DOCX import functionality
      // In a real implementation, you would use mammoth.js or similar
      const arrayBuffer = await file.arrayBuffer();
      
      // For now, return a placeholder
      return "DOCX import functionality would be implemented here using mammoth.js or similar library";
    } catch (error) {
      console.error('Error importing DOCX:', error);
      throw new Error('Failed to import DOCX document');
    }
  }
}
