"use client";

import { useState, useEffect } from "react";
import { 
  FileText, 
  Plus, 
  Save, 
  Download, 
  Eye, 
  Wand2, 
  Upload, 
  Trash2,
  Edit3,
  Copy,
  Settings,
  Sparkles,
  X
} from "lucide-react";
import type { ResumeData, PersonalInfo, Experience, Education, Project } from "@/types/resume";
import type { ProfileData } from "@/types/profile";
import { PDFExportService } from "@/services/pdf-export.service";
import { DOCXExportService } from "@/services/docx-export.service";

// Default data structures
const defaultPersonalInfo: PersonalInfo = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  portfolio: ""
};

const defaultResume: ResumeData = {
  personalInfo: defaultPersonalInfo,
  summary: "",
  experience: [],
  education: [],
  skills: {
    technical: [],
    soft: [],
    languages: [],
    certifications: []
  },
  projects: []
};

interface JobAnalysisState {
  isAnalyzing: boolean;
  analysis: unknown | null;
  error: string | null;
}

interface AIGenerationState {
  isGenerating: boolean;
  error: string | null;
}

export default function Builder() {
  const [resume, setResume] = useState<ResumeData>(defaultResume);
  const [activeSection, setActiveSection] = useState("personal");
  const [jobDescription, setJobDescription] = useState("");
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [jobAnalysis, setJobAnalysis] = useState<JobAnalysisState>({
    isAnalyzing: false,
    analysis: null,
    error: null
  });
  const [aiGeneration, setAIGeneration] = useState<AIGenerationState>({
    isGenerating: false,
    error: null
  });
  const [showJobMatcher, setShowJobMatcher] = useState(false);

  // Load profile data from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('profileData');
    if (savedProfile) {
      try {
        setProfileData(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Error loading profile data:', error);
      }
    }
  }, []);

  // AI Functions
  const analyzeJob = async () => {
    if (!jobDescription.trim()) return;

    setJobAnalysis({ isAnalyzing: true, analysis: null, error: null });

    try {
      const response = await fetch('/api/ai/analyze-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze job');
      }

      const analysis = await response.json();
      setJobAnalysis({ isAnalyzing: false, analysis, error: null });
    } catch (error) {
      setJobAnalysis({ 
        isAnalyzing: false, 
        analysis: null, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };

  const generateAIResume = async () => {
    setAIGeneration({ isGenerating: true, error: null });

    try {
      const options = {
        jobDescription: jobDescription || undefined,
        template: 'professional' as const,
        includeSkillsMatrix: true,
        includeCoverLetter: false
      };

      const response = await fetch('/api/ai/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileData, options })
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }

      const generatedResume = await response.json();
      setResume(generatedResume);
      setAIGeneration({ isGenerating: false, error: null });
    } catch (error) {
      setAIGeneration({ 
        isGenerating: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };

  // Export Functions
  const exportToPDF = async () => {
    try {
      await PDFExportService.downloadPDF(resume, `${resume.personalInfo?.fullName || 'resume'}.pdf`);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      alert('Failed to export PDF. Please try again.');
    }
  };

  const exportToDOCX = async () => {
    try {
      await DOCXExportService.downloadDOCX(resume, `${resume.personalInfo?.fullName || 'resume'}.docx`);
    } catch (error) {
      console.error('Error exporting to DOCX:', error);
      alert('Failed to export DOCX. Please try again.');
    }
  };

  // Resume editing functions
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResume(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  // Experience functions
  const addExperience = () => {
    const newExperience: Experience = {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      achievements: []
    };
    
    setResume(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | string[]) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (index: number) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addAchievement = (expIndex: number) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? { 
          ...exp, 
          achievements: [...(exp.achievements || []), ""] 
        } : exp
      )
    }));
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? { 
          ...exp, 
          achievements: (exp.achievements || []).map((ach, j) => 
            j === achIndex ? value : ach
          )
        } : exp
      )
    }));
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? { 
          ...exp, 
          achievements: (exp.achievements || []).filter((_, j) => j !== achIndex)
        } : exp
      )
    }));
  };

  // Education functions
  const addEducation = () => {
    const newEducation: Education = {
      degree: "",
      institution: "",
      graduationYear: "",
      fieldOfStudy: "",
      gpa: "",
      honors: []
    };
    
    setResume(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (index: number, field: keyof Education, value: string | string[]) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index: number) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  // Project functions
  const addProject = () => {
    const newProject: Project = {
      name: "",
      description: "",
      technologies: [],
      url: ""
    };
    
    setResume(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const removeProject = (index: number) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  // Skills functions
  const updateSkills = (category: keyof typeof resume.skills, skills: string[]) => {
    setResume(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: skills
      }
    }));
  };

  const addSkill = (category: keyof typeof resume.skills) => {
    const currentSkills = resume.skills[category] || [];
    updateSkills(category, [...currentSkills, ""]);
  };

  const updateSkill = (category: keyof typeof resume.skills, index: number, value: string) => {
    const currentSkills = resume.skills[category] || [];
    const updatedSkills = currentSkills.map((skill, i) => i === index ? value : skill);
    updateSkills(category, updatedSkills);
  };

  const removeSkill = (category: keyof typeof resume.skills, index: number) => {
    const currentSkills = resume.skills[category] || [];
    const updatedSkills = currentSkills.filter((_, i) => i !== index);
    updateSkills(category, updatedSkills);
  };

  const sections = [
    { id: "personal", label: "Personal Info", icon: FileText },
    { id: "summary", label: "Summary", icon: FileText },
    { id: "experience", label: "Experience", icon: FileText },
    { id: "education", label: "Education", icon: FileText },
    { id: "skills", label: "Skills", icon: FileText },
    { id: "projects", label: "Projects", icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FileText className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Resume Builder
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={generateAIResume}
                disabled={aiGeneration.isGenerating}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {aiGeneration.isGenerating ? 'Generating...' : 'AI Generate'}
              </button>
              <button className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 dark:text-gray-300">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
              <button className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 dark:text-gray-300">
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
              <div className="flex space-x-2">
                <button 
                  onClick={exportToPDF}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </button>
                <button 
                  onClick={exportToDOCX}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  DOCX
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
          <div className="p-4">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
              Sections
            </h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-md transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <section.icon className="h-4 w-4 mr-3" />
                  {section.label}
                </button>
              ))}
            </nav>

            {/* AI Job Matcher */}
            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={() => setShowJobMatcher(!showJobMatcher)}
                className="w-full flex items-center px-3 py-2 text-left rounded-md text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                <Wand2 className="h-4 w-4 mr-3" />
                Job Matcher
              </button>
              
              {showJobMatcher && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Job Description
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={4}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    placeholder="Paste job description here..."
                  />
                  <button
                    onClick={analyzeJob}
                    disabled={jobAnalysis.isAnalyzing || !jobDescription.trim()}
                    className="w-full mt-2 px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                  >
                    {jobAnalysis.isAnalyzing ? 'Analyzing...' : 'Analyze Job'}
                  </button>
                  
                  {jobAnalysis.analysis && (
                    <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded text-xs text-green-700 dark:text-green-300">
                      Job analyzed! Use AI Generate to create tailored resume.
                    </div>
                  )}
                  
                  {jobAnalysis.error && (
                    <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded text-xs text-red-700 dark:text-red-300">
                      {jobAnalysis.error}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {aiGeneration.error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-700 dark:text-red-300">{aiGeneration.error}</p>
              </div>
            )}

            {activeSection === "personal" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={resume.personalInfo.fullName}
                      onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={resume.personalInfo.email}
                      onChange={(e) => updatePersonalInfo("email", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={resume.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={resume.personalInfo.location}
                      onChange={(e) => updatePersonalInfo("location", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="New York, NY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={resume.personalInfo.linkedin || ""}
                      onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Portfolio
                    </label>
                    <input
                      type="url"
                      value={resume.personalInfo.portfolio || ""}
                      onChange={(e) => updatePersonalInfo("portfolio", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="https://portfolio.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === "summary" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                  Professional Summary
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Summary
                  </label>
                  <textarea
                    value={resume.summary}
                    onChange={(e) => setResume(prev => ({ ...prev, summary: e.target.value }))}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Write a brief summary of your professional background and key achievements..."
                  />
                </div>
              </div>
            )}

            {activeSection === "experience" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Work Experience
                  </h3>
                  <button
                    onClick={addExperience}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </button>
                </div>
                {resume.experience.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No experience added yet. Click "Add Experience" to get started.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {resume.experience.map((exp, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Experience {index + 1}
                          </h4>
                          <button
                            onClick={() => removeExperience(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Job Title
                            </label>
                            <input
                              type="text"
                              value={exp.title}
                              onChange={(e) => updateExperience(index, "title", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="Software Engineer"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Company
                            </label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(index, "company", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Location
                            </label>
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) => updateExperience(index, "location", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="City, State"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Start Date
                              </label>
                              <input
                                type="text"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="MM/YYYY"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                End Date
                              </label>
                              <input
                                type="text"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="MM/YYYY or Present"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description
                          </label>
                          <textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(index, "description", e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Brief description of your role and responsibilities..."
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Key Achievements
                            </label>
                            <button
                              onClick={() => addAchievement(index)}
                              className="text-blue-600 hover:text-blue-700 text-sm"
                            >
                              + Add Achievement
                            </button>
                          </div>
                          {exp.achievements?.map((achievement, achIndex) => (
                            <div key={achIndex} className="flex items-center gap-2 mb-2">
                              <input
                                type="text"
                                value={achievement}
                                onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Describe a key achievement..."
                              />
                              <button
                                onClick={() => removeAchievement(index, achIndex)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSection === "education" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Education
                  </h3>
                  <button
                    onClick={addEducation}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </button>
                </div>
                {resume.education.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No education added yet. Click "Add Education" to get started.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {resume.education.map((edu, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Education {index + 1}
                          </h4>
                          <button
                            onClick={() => removeEducation(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Degree
                            </label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateEducation(index, "degree", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="Bachelor of Science"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Field of Study
                            </label>
                            <input
                              type="text"
                              value={edu.fieldOfStudy || ""}
                              onChange={(e) => updateEducation(index, "fieldOfStudy", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="Computer Science"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Institution
                            </label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => updateEducation(index, "institution", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="University Name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Graduation Year
                            </label>
                            <input
                              type="text"
                              value={edu.graduationYear}
                              onChange={(e) => updateEducation(index, "graduationYear", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="2024"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              GPA (Optional)
                            </label>
                            <input
                              type="text"
                              value={edu.gpa || ""}
                              onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="3.8/4.0"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSection === "skills" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                  Skills
                </h3>
                <div className="space-y-6">
                  {["technical", "soft", "languages", "certifications"].map((category) => (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                          {category === "technical" ? "Technical Skills" : 
                           category === "soft" ? "Soft Skills" :
                           category === "languages" ? "Languages" : "Certifications"}
                        </label>
                        <button
                          onClick={() => addSkill(category as keyof typeof resume.skills)}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          + Add Skill
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {(resume.skills[category as keyof typeof resume.skills] || []).map((skill, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={skill}
                              onChange={(e) => updateSkill(category as keyof typeof resume.skills, index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder={`Enter ${category.slice(0, -1)}`}
                            />
                            <button
                              onClick={() => removeSkill(category as keyof typeof resume.skills, index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "projects" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Projects
                  </h3>
                  <button
                    onClick={addProject}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </button>
                </div>
                {resume.projects.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No projects added yet. Click "Add Project" to get started.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {resume.projects.map((project, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Project {index + 1}
                          </h4>
                          <button
                            onClick={() => removeProject(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Project Name
                            </label>
                            <input
                              type="text"
                              value={project.name}
                              onChange={(e) => updateProject(index, "name", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="Project Name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Project URL (Optional)
                            </label>
                            <input
                              type="url"
                              value={project.url || ""}
                              onChange={(e) => updateProject(index, "url", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="https://github.com/user/project"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description
                          </label>
                          <textarea
                            value={project.description}
                            onChange={(e) => updateProject(index, "description", e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Describe your project and what it accomplishes..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Technologies Used
                          </label>
                          <input
                            type="text"
                            value={project.technologies.join(", ")}
                            onChange={(e) => updateProject(index, "technologies", e.target.value.split(", ").filter(t => t.trim()))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="React, Node.js, MongoDB, etc. (comma-separated)"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
