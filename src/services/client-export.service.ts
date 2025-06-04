// Client-side export service for static hosting
import type { ResumeData } from '@/types/resume';

export interface ExportOptions {
  template?: 'professional' | 'modern' | 'creative' | 'ats-friendly';
  includeColors?: boolean;
}

export class ClientExportService {
  static async exportToPDF(resumeData: ResumeData, options: ExportOptions = {}): Promise<void> {
    try {
      // Use browser print functionality for PDF export
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error('Popup blocked');
      }

      const htmlContent = this.generatePrintableHTML(resumeData, options);
      
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Trigger print dialog
      printWindow.focus();
      printWindow.print();
      
      // Close the window after printing
      setTimeout(() => {
        printWindow.close();
      }, 1000);
      
    } catch (error) {
      console.error('PDF export error:', error);
      // Fallback: copy resume content to clipboard
      this.copyToClipboard(resumeData);
      alert('PDF export failed. Resume content has been copied to clipboard.');
    }
  }

  static async exportToDOCX(resumeData: ResumeData, options: ExportOptions = {}): Promise<void> {
    try {
      // Generate plain text content for download
      const textContent = this.generateTextContent(resumeData);
      
      // Create downloadable file
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('DOCX export error:', error);
      // Fallback: copy to clipboard
      this.copyToClipboard(resumeData);
      alert('DOCX export failed. Resume content has been copied to clipboard.');
    }
  }

  private static generatePrintableHTML(resumeData: ResumeData, options: ExportOptions): string {
    const { template = 'professional', includeColors = true } = options;
    
    const styles = `
      <style>
        @media print {
          body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
          .no-print { display: none; }
          .page-break { page-break-before: always; }
        }
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          color: #333;
          max-width: 8.5in;
          margin: 0 auto;
          padding: 20px;
        }
        .header { 
          text-align: center; 
          margin-bottom: 30px; 
          border-bottom: 2px solid ${includeColors ? '#2563eb' : '#000'};
          padding-bottom: 20px;
        }
        .name { 
          font-size: 24px; 
          font-weight: bold; 
          color: ${includeColors ? '#2563eb' : '#000'};
          margin-bottom: 10px;
        }
        .contact { font-size: 14px; margin: 5px 0; }
        .section { margin: 20px 0; }
        .section-title { 
          font-size: 18px; 
          font-weight: bold; 
          color: ${includeColors ? '#2563eb' : '#000'};
          border-bottom: 1px solid #ccc;
          padding-bottom: 5px;
          margin-bottom: 15px;
        }
        .experience-item, .education-item, .project-item { 
          margin-bottom: 20px; 
        }
        .job-title, .degree { 
          font-weight: bold; 
          font-size: 16px;
        }
        .company, .institution { 
          font-style: italic; 
          color: #666;
        }
        .date-location { 
          font-size: 14px; 
          color: #666; 
          margin: 5px 0;
        }
        .description { margin: 10px 0; }
        .achievements { 
          list-style-type: disc; 
          margin-left: 20px; 
        }
        .skills-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
          gap: 15px; 
        }
        .skill-category { margin-bottom: 15px; }
        .skill-category-title { 
          font-weight: bold; 
          color: ${includeColors ? '#2563eb' : '#000'};
          margin-bottom: 5px;
        }
        .skill-list { 
          list-style: none; 
          padding: 0; 
        }
        .skill-list li { 
          display: inline-block; 
          background: ${includeColors ? '#f1f5f9' : '#f0f0f0'};
          padding: 3px 8px; 
          margin: 2px; 
          border-radius: 3px; 
          font-size: 14px;
        }
      </style>
    `;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${resumeData.personalInfo.fullName} - Resume</title>
        ${styles}
      </head>
      <body>
        ${this.generateResumeHTML(resumeData)}
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          };
        </script>
      </body>
      </html>
    `;
  }

  private static generateResumeHTML(resumeData: ResumeData): string {
    return `
      <div class="header">
        <div class="name">${resumeData.personalInfo.fullName}</div>
        <div class="contact">${resumeData.personalInfo.email}</div>
        <div class="contact">${resumeData.personalInfo.phone}</div>
        <div class="contact">${resumeData.personalInfo.location}</div>
        ${resumeData.personalInfo.linkedin ? `<div class="contact">${resumeData.personalInfo.linkedin}</div>` : ''}
        ${resumeData.personalInfo.portfolio ? `<div class="contact">${resumeData.personalInfo.portfolio}</div>` : ''}
      </div>

      ${resumeData.summary ? `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <div class="description">${resumeData.summary}</div>
        </div>
      ` : ''}

      ${resumeData.experience && resumeData.experience.length > 0 ? `
        <div class="section">
          <div class="section-title">Professional Experience</div>
          ${resumeData.experience.map(exp => `
            <div class="experience-item">
              <div class="job-title">${exp.title}</div>
              <div class="company">${exp.company}</div>
              <div class="date-location">${exp.startDate} - ${exp.endDate} | ${exp.location}</div>
              <div class="description">${exp.description}</div>
              ${exp.achievements && exp.achievements.length > 0 ? `
                <ul class="achievements">
                  ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${resumeData.education && resumeData.education.length > 0 ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${resumeData.education.map(edu => `
            <div class="education-item">
              <div class="degree">${edu.degree} in ${edu.fieldOfStudy}</div>
              <div class="institution">${edu.institution}</div>
              <div class="date-location">${edu.graduationYear}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${resumeData.skills ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills-grid">
            ${resumeData.skills.technical && resumeData.skills.technical.length > 0 ? `
              <div class="skill-category">
                <div class="skill-category-title">Technical Skills</div>
                <ul class="skill-list">
                  ${resumeData.skills.technical.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            ${resumeData.skills.soft && resumeData.skills.soft.length > 0 ? `
              <div class="skill-category">
                <div class="skill-category-title">Soft Skills</div>
                <ul class="skill-list">
                  ${resumeData.skills.soft.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            ${resumeData.skills.languages && resumeData.skills.languages.length > 0 ? `
              <div class="skill-category">
                <div class="skill-category-title">Languages</div>
                <ul class="skill-list">
                  ${resumeData.skills.languages.map(lang => `<li>${lang}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        </div>
      ` : ''}

      ${resumeData.projects && resumeData.projects.length > 0 ? `
        <div class="section">
          <div class="section-title">Projects</div>
          ${resumeData.projects.map(project => `
            <div class="project-item">
              <div class="job-title">${project.name}</div>
              <div class="description">${project.description}</div>
              ${project.technologies && project.technologies.length > 0 ? `
                <div class="skills">
                  <strong>Technologies:</strong> ${project.technologies.join(', ')}
                </div>
              ` : ''}
              ${project.url ? `<div class="contact">URL: ${project.url}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;
  }

  private static generateTextContent(resumeData: ResumeData): string {
    let content = '';
    
    // Header
    content += `${resumeData.personalInfo.fullName.toUpperCase()}\n`;
    content += `${resumeData.personalInfo.email}\n`;
    content += `${resumeData.personalInfo.phone}\n`;
    content += `${resumeData.personalInfo.location}\n`;
    if (resumeData.personalInfo.linkedin) content += `${resumeData.personalInfo.linkedin}\n`;
    if (resumeData.personalInfo.portfolio) content += `${resumeData.personalInfo.portfolio}\n`;
    content += '\n';
    
    // Summary
    if (resumeData.summary) {
      content += 'PROFESSIONAL SUMMARY\n';
      content += '===================\n';
      content += `${resumeData.summary}\n\n`;
    }
    
    // Experience
    if (resumeData.experience && resumeData.experience.length > 0) {
      content += 'PROFESSIONAL EXPERIENCE\n';
      content += '======================\n';
      resumeData.experience.forEach(exp => {
        content += `${exp.title}\n`;
        content += `${exp.company} | ${exp.startDate} - ${exp.endDate} | ${exp.location}\n`;
        content += `${exp.description}\n`;
        if (exp.achievements && exp.achievements.length > 0) {
          exp.achievements.forEach(achievement => {
            content += `• ${achievement}\n`;
          });
        }
        content += '\n';
      });
    }
    
    // Education
    if (resumeData.education && resumeData.education.length > 0) {
      content += 'EDUCATION\n';
      content += '=========\n';
      resumeData.education.forEach(edu => {
        content += `${edu.degree} in ${edu.fieldOfStudy}\n`;
        content += `${edu.institution} | ${edu.graduationYear}\n\n`;
      });
    }
    
    // Skills
    if (resumeData.skills) {
      content += 'SKILLS\n';
      content += '======\n';
      if (resumeData.skills.technical) {
        content += `Technical: ${resumeData.skills.technical.join(', ')}\n`;
      }
      if (resumeData.skills.soft) {
        content += `Soft Skills: ${resumeData.skills.soft.join(', ')}\n`;
      }
      if (resumeData.skills.languages) {
        content += `Languages: ${resumeData.skills.languages.join(', ')}\n`;
      }
      content += '\n';
    }
    
    // Projects
    if (resumeData.projects && resumeData.projects.length > 0) {
      content += 'PROJECTS\n';
      content += '========\n';
      resumeData.projects.forEach(project => {
        content += `${project.name}\n`;
        content += `${project.description}\n`;
        if (project.technologies) {
          content += `Technologies: ${project.technologies.join(', ')}\n`;
        }
        if (project.url) {
          content += `URL: ${project.url}\n`;
        }
        content += '\n';
      });
    }
    
    return content;
  }

  private static copyToClipboard(resumeData: ResumeData): void {
    const textContent = this.generateTextContent(resumeData);
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textContent).catch(err => {
        console.error('Failed to copy to clipboard:', err);
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = textContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }
}
