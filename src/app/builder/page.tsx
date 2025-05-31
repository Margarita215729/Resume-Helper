"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { PersonalInfoForm } from '@/components/builder/PersonalInfoForm';
import { ExperienceForm } from '@/components/builder/ExperienceForm';
import { EducationForm } from '@/components/builder/EducationForm';
import { SkillsForm } from '@/components/builder/SkillsForm';
import { ProjectsForm } from '@/components/builder/ProjectsForm';
import { ProgressTracker } from '@/components/builder/ProgressTracker';
import { ResumePreview } from '@/components/builder/ResumePreview';
import { TipsComponent } from '@/components/builder/TipsComponent';
import { KeyboardShortcuts } from '@/components/builder/KeyboardShortcuts';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderOpen, 
  FileText, 
  Download, 
  Sparkles,
  Eye,
  Save,
  Upload,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import type { ResumeData, PersonalInfo, Experience, Education, Skills, Project } from '@/types/resume';

const SECTIONS = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'summary', label: 'Professional Summary', icon: FileText },
  { id: 'experience', label: 'Work Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState<SectionId>('personal');
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      languages: [],
      certifications: []
    },
    projects: []
  });

  // AI Enhancement States
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzingJob, setIsAnalyzingJob] = useState(false);
  const [isGeneratingResume, setIsGeneratingResume] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'docx'>('pdf');
  const [template, setTemplate] = useState<'professional' | 'modern' | 'creative' | 'ats-friendly'>('professional');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (hasUnsavedChanges) {
        saveToLocalStorage();
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [resumeData, hasUnsavedChanges]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('resume-builder-data');
    if (saved) {
      try {
        setResumeData(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load saved resume data:', error);
      }
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem('resume-builder-data', JSON.stringify(resumeData));
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
  };

  const updateResumeData = (updates: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...updates }));
    setHasUnsavedChanges(true);
  };

  const analyzeJobPosting = async () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzingJob(true);
    try {
      const response = await fetch('/api/ai/analyze-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription })
      });

      if (!response.ok) throw new Error('Failed to analyze job posting');

      const analysis = await response.json();
      
      // Show analysis results (you could create a modal for this)
      alert(`Job Analysis Complete!\n\nTitle: ${analysis.title}\nCompany: ${analysis.company}\nMatch Score: ${analysis.matchScore || 'N/A'}\n\nKey Requirements:\n${analysis.requirements?.slice(0, 3).join('\n') || 'None found'}`);
    } catch (error) {
      console.error('Job analysis failed:', error);
      alert('Failed to analyze job posting. Please try again.');
    } finally {
      setIsAnalyzingJob(false);
    }
  };

  const generateAIResume = async () => {
    setIsGeneratingResume(true);
    try {
      const response = await fetch('/api/ai/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileData: {}, // You could integrate with profile data here
          jobDescription: jobDescription || undefined,
          options: { template, includeSkillsMatrix: true }
        })
      });

      if (!response.ok) throw new Error('Failed to generate resume');

      const generatedResume = await response.json();
      
      // Update resume data with AI-generated content
      setResumeData(generatedResume);
      setHasUnsavedChanges(true);
      
      alert('AI Resume Generated Successfully! Review and customize as needed.');
    } catch (error) {
      console.error('Resume generation failed:', error);
      alert('Failed to generate resume. Please try again.');
    } finally {
      setIsGeneratingResume(false);
    }
  };

  const exportResume = async () => {
    setIsExporting(true);
    try {
      const endpoint = exportFormat === 'pdf' ? '/api/export/pdf' : '/api/export/docx';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData, template })
      });

      if (!response.ok) throw new Error(`Failed to export ${exportFormat.toUpperCase()}`);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export failed:', error);
      alert(`Failed to export ${exportFormat.toUpperCase()}. Please try again.`);
    } finally {
      setIsExporting(false);
    }
  };

  // Handler functions for keyboard shortcuts
  const handleSave = () => {
    saveToLocalStorage();
    alert('Resume saved successfully!');
  };

  const handleExport = (format: 'pdf' | 'docx' = 'pdf') => {
    setExportFormat(format);
    exportResume();
  };

  const handleSectionChange = (sectionId: string) => {
    if (sectionId === 'personal' || sectionId === 'summary' || sectionId === 'experience' || 
        sectionId === 'education' || sectionId === 'skills' || sectionId === 'projects') {
      setActiveSection(sectionId);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm
            personalInfo={resumeData.personalInfo}
            onChange={(personalInfo) => updateResumeData({ personalInfo })}
          />
        );
      case 'summary':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Professional Summary</h3>
            <Textarea
              value={resumeData.summary}
              onChange={(e) => updateResumeData({ summary: e.target.value })}
              placeholder="Write a compelling professional summary that highlights your key qualifications and career objectives..."
              rows={6}
            />
            <p className="text-sm text-gray-500">
              Tip: Include 2-3 sentences about your experience, key skills, and career goals.
            </p>
          </div>
        );
      case 'experience':
        return (
          <ExperienceForm
            experiences={resumeData.experience}
            onChange={(experience) => updateResumeData({ experience })}
          />
        );
      case 'education':
        return (
          <EducationForm
            education={resumeData.education}
            onChange={(education) => updateResumeData({ education })}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            skills={resumeData.skills}
            onChange={(skills) => updateResumeData({ skills })}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            projects={resumeData.projects}
            onChange={(projects) => updateResumeData({ projects })}
          />
        );
      default:
        return null;
    }
  };

  const isFormValid = () => {
    const { personalInfo, summary, experience } = resumeData;
    return (
      personalInfo.fullName &&
      personalInfo.email &&
      personalInfo.phone &&
      personalInfo.location &&
      summary.trim() &&
      experience.length > 0
    );
  };

  const getSectionValidation = () => {
    const { personalInfo, summary, experience, education, skills, projects } = resumeData;
    
    return {
      personal: {
        isCompleted: !!(personalInfo.fullName && personalInfo.email && personalInfo.phone && personalInfo.location),
        hasError: false
      },
      summary: {
        isCompleted: summary.trim().length > 20,
        hasError: false
      },
      experience: {
        isCompleted: experience.length > 0 && experience.every(exp => exp.title && exp.company && exp.description),
        hasError: false
      },
      education: {
        isCompleted: education.length > 0 && education.every(edu => edu.degree && edu.institution && edu.graduationYear),
        hasError: false
      },
      skills: {
        isCompleted: !!(skills.technical?.length || skills.soft?.length),
        hasError: false
      },
      projects: {
        isCompleted: projects.length > 0 && projects.every(proj => proj.name && proj.description),
        hasError: false
      }
    };
  };

  const sectionValidation = getSectionValidation();
  const progressSections = SECTIONS.map(section => ({
    id: section.id,
    label: section.label,
    ...sectionValidation[section.id]
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Resume Builder</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {lastSaved && (
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Last saved {lastSaved.toLocaleTimeString()}
                  </span>
                )}
                {hasUnsavedChanges && (
                  <span className="flex items-center gap-1 text-amber-600">
                    <AlertCircle className="h-3 w-3" />
                    Unsaved changes
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={saveToLocalStorage} variant="outline" size="sm">
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button onClick={() => setActiveSection('personal')} variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <ProgressTracker
              sections={progressSections}
              activeSection={activeSection}
              onSectionChange={(sectionId) => setActiveSection(sectionId as SectionId)}
            />

            {/* AI Enhancement Panel */}
            <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-500" />
                AI Enhancement
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Job Description (Optional)</label>
                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste a job description to tailor your resume..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={analyzeJobPosting}
                    disabled={!jobDescription.trim() || isAnalyzingJob}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    {isAnalyzingJob ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Eye className="h-4 w-4 mr-2" />
                    )}
                    Analyze Job
                  </Button>

                  <Button
                    onClick={generateAIResume}
                    disabled={isGeneratingResume}
                    variant="default"
                    size="sm"
                    className="w-full"
                  >
                    {isGeneratingResume ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4 mr-2" />
                    )}
                    Generate AI Resume
                  </Button>
                </div>
              </div>
            </div>

            {/* Export Panel */}
            <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
              <h3 className="font-medium text-gray-900 mb-4">Export Resume</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Template</label>
                  <Select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value as typeof template)}
                  >
                    <option value="professional">Professional</option>
                    <option value="modern">Modern</option>
                    <option value="creative">Creative</option>
                    <option value="ats-friendly">ATS-Friendly</option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Format</label>
                  <Select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'docx')}
                  >
                    <option value="pdf">PDF</option>
                    <option value="docx">Word Document</option>
                  </Select>
                </div>

                <Button
                  onClick={exportResume}
                  disabled={!isFormValid() || isExporting}
                  className="w-full"
                >
                  {isExporting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  Export {exportFormat.toUpperCase()}
                </Button>

                {!isFormValid() && (
                  <p className="text-xs text-red-500">
                    Complete required fields to export
                  </p>
                )}
              </div>
            </div>

            <TipsComponent activeSection={activeSection} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {renderSection()}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <ResumePreview resumeData={resumeData} template={template} />
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Component */}
      <KeyboardShortcuts 
        onSectionChange={handleSectionChange}
        onSave={handleSave}
        onExport={() => handleExport('pdf')}
      />
    </div>
  );
}