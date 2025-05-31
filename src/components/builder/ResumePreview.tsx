"use client";

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ResumeData } from '@/types/resume';

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: 'professional' | 'modern' | 'creative' | 'ats-friendly';
}

export const ResumePreview = ({ resumeData, template }: ResumePreviewProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getTemplateStyles = () => {
    switch (template) {
      case 'modern':
        return {
          container: 'bg-gradient-to-br from-blue-50 to-indigo-50',
          header: 'bg-blue-600 text-white',
          accent: 'text-blue-600',
          section: 'border-l-4 border-blue-600'
        };
      case 'creative':
        return {
          container: 'bg-gradient-to-br from-purple-50 to-pink-50',
          header: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
          accent: 'text-purple-600',
          section: 'border-l-4 border-purple-600'
        };
      case 'ats-friendly':
        return {
          container: 'bg-white',
          header: 'bg-gray-100 text-gray-900',
          accent: 'text-gray-700',
          section: 'border-b border-gray-200'
        };
      default: // professional
        return {
          container: 'bg-white',
          header: 'bg-gray-900 text-white',
          accent: 'text-gray-700',
          section: 'border-l-4 border-gray-700'
        };
    }
  };

  const styles = getTemplateStyles();

  if (!isVisible) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Resume Preview</h3>
        <p className="text-gray-500 mb-4">
          See how your resume will look with the {template} template
        </p>
        <Button onClick={() => setIsVisible(true)} variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          Show Preview
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-medium">Resume Preview - {template}</h3>
        <Button onClick={() => setIsVisible(false)} variant="ghost" size="sm">
          <EyeOff className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4">
        <div className={`max-w-2xl mx-auto ${styles.container} shadow-lg`} style={{ aspectRatio: '8.5/11', minHeight: '600px' }}>
          {/* Header */}
          <div className={`${styles.header} p-6`}>
            <h1 className="text-2xl font-bold mb-2">
              {resumeData.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="text-sm opacity-90 space-y-1">
              {resumeData.personalInfo.email && <div>{resumeData.personalInfo.email}</div>}
              {resumeData.personalInfo.phone && <div>{resumeData.personalInfo.phone}</div>}
              {resumeData.personalInfo.location && <div>{resumeData.personalInfo.location}</div>}
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Professional Summary */}
            {resumeData.summary && (
              <div className={`${styles.section} pl-4`}>
                <h2 className={`text-lg font-semibold mb-2 ${styles.accent}`}>Professional Summary</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{resumeData.summary}</p>
              </div>
            )}

            {/* Experience */}
            {resumeData.experience.length > 0 && (
              <div className={`${styles.section} pl-4`}>
                <h2 className={`text-lg font-semibold mb-3 ${styles.accent}`}>Work Experience</h2>
                <div className="space-y-4">
                  {resumeData.experience.slice(0, 2).map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-gray-900">{exp.title}</h3>
                        <span className="text-xs text-gray-500">
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {exp.company} • {exp.location}
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {exp.description.substring(0, 150)}...
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {(resumeData.skills.technical?.length || resumeData.skills.soft?.length) && (
              <div className={`${styles.section} pl-4`}>
                <h2 className={`text-lg font-semibold mb-2 ${styles.accent}`}>Skills</h2>
                <div className="grid grid-cols-2 gap-4">
                  {resumeData.skills.technical?.length && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 mb-1">Technical</h4>
                      <div className="flex flex-wrap gap-1">
                        {resumeData.skills.technical.slice(0, 6).map((skill, index) => (
                          <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {resumeData.skills.soft?.length && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 mb-1">Soft Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {resumeData.skills.soft.slice(0, 4).map((skill, index) => (
                          <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && (
              <div className={`${styles.section} pl-4`}>
                <h2 className={`text-lg font-semibold mb-2 ${styles.accent}`}>Education</h2>
                {resumeData.education.slice(0, 2).map((edu, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{edu.degree}</h3>
                        <p className="text-xs text-gray-600">{edu.institution}</p>
                      </div>
                      <span className="text-xs text-gray-500">{edu.graduationYear}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            This is a preview. The actual exported resume will include all sections and details.
          </p>
        </div>
      </div>
    </div>
  );
};
