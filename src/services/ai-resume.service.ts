import OpenAI from 'openai';
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import type { ProfileData } from '@/types/profile';
import type { ResumeData } from '@/types/resume';

// AI Service Configuration
class AIConfig {
  static getAzureClient() {
    const token = process.env.GITHUB_TOKEN;
    const endpoint = process.env.GITHUB_MODEL_ENDPOINT || "https://models.github.ai/inference";
    
    if (!token) {
      throw new Error('GITHUB_TOKEN is required for Azure AI Inference');
    }
    
    return ModelClient(
      endpoint,
      new AzureKeyCredential(token),
      { apiVersion: "2024-12-01-preview" }
    );
  }

  static getOpenAIClient(): OpenAI {
    // Fallback to Azure OpenAI or OpenAI for non-GitHub Models
    if (process.env.AZURE_OPENAI_API_KEY) {
      return new OpenAI({
        apiKey: process.env.AZURE_OPENAI_API_KEY,
        baseURL: process.env.AZURE_OPENAI_ENDPOINT ? 
          `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}` : 
          undefined,
        defaultQuery: process.env.AZURE_OPENAI_API_VERSION ? { 'api-version': process.env.AZURE_OPENAI_API_VERSION } : undefined,
        defaultHeaders: process.env.AZURE_OPENAI_API_KEY ? { 'api-key': process.env.AZURE_OPENAI_API_KEY } : undefined,
        timeout: 30000,
      });
    } else {
      return new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        timeout: 30000,
      });
    }
  }

  static getModelName(): string {
    if (process.env.GITHUB_TOKEN) {
      return process.env.GITHUB_MODEL_NAME || 'openai/o4-mini';
    } else if (process.env.AZURE_OPENAI_DEPLOYMENT_NAME) {
      return process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
    } else {
      return 'gpt-4o-mini';
    }
  }

  static isGitHubModels(): boolean {
    return !!process.env.GITHUB_TOKEN;
  }

  static async createChatCompletion(messages: any[], options: any = {}) {
    try {
      if (this.isGitHubModels()) {
        // Use Azure AI Inference SDK for GitHub Models
        console.log('Using GitHub Models with Azure AI Inference SDK');
        const client = this.getAzureClient();
        const modelName = this.getModelName();
        
        console.log('Model name:', modelName);
        console.log('Request body:', JSON.stringify({ messages, model: modelName, ...options }, null, 2));

        const response = await client.path("/chat/completions").post({
          body: {
            messages,
            model: modelName,
            ...options
          }
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (isUnexpected(response)) {
          console.error('Unexpected response body:', response.body);
          throw new Error(`GitHub Models API error: ${response.body.error?.message || 'Unknown error'}`);
        }

        console.log('Successful response body:', response.body);

        return {
          choices: response.body.choices.map(choice => ({
            message: {
              content: choice.message.content,
              role: choice.message.role
            }
          }))
        };
      } else {
        // Use OpenAI SDK for Azure OpenAI or OpenAI
        console.log('Using OpenAI SDK');
        const client = this.getOpenAIClient();
        const modelName = this.getModelName();

        return await client.chat.completions.create({
          model: modelName,
          messages,
          ...options
        });
      }
    } catch (error) {
      console.error('AIConfig.createChatCompletion error:', error);
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      throw error;
    }
  }
}

export interface JobAnalysis {
  title: string;
  company: string;
  description: string;
  requirements: string[];
  preferredSkills: string[];
  experience: string;
  salary?: string;
  location?: string;
  matchScore?: number;
  recommendations: string[];
}

export interface ResumeGenerationOptions {
  jobDescription?: string;
  template?: 'professional' | 'creative' | 'modern' | 'ats-friendly';
  includeSkillsMatrix?: boolean;
  includeCoverLetter?: boolean;
  focusAreas?: string[];
}

export class AIResumeService {
  
  /**
   * Analyze a job posting and extract key requirements
   */
  static async analyzeJobPosting(jobDescription: string): Promise<JobAnalysis> {
    try {
      const prompt = `
        Analyze the following job posting and extract structured information:

        Job Posting:
        "${jobDescription}"

        Please extract and return a JSON object with the following structure:
        {
          "title": "Job title",
          "company": "Company name if mentioned",
          "description": "Brief job description summary",
          "requirements": ["Required skill 1", "Required skill 2", ...],
          "preferredSkills": ["Preferred skill 1", "Preferred skill 2", ...],
          "experience": "Experience level required",
          "salary": "Salary range if mentioned",
          "location": "Location if mentioned",
          "recommendations": ["Recommendation 1 for applicants", "Recommendation 2", ...]
        }

        Focus on extracting specific technical skills, certifications, and experience requirements.
      `;

      const response = await AIConfig.createChatCompletion([
        {
          role: 'system',
          content: 'You are an expert HR analyst specializing in job posting analysis. Return only valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ], {
        temperature: 0.3
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from AI service');
      }

      return JSON.parse(content) as JobAnalysis;
    } catch (error: any) {
      console.error('Error analyzing job posting:', error);
      
      // Provide more specific error messages
      if (error.message?.includes('401') || error.message?.includes('unauthorized')) {
        throw new Error('AI service authentication failed. Please check your API credentials.');
      } else if (error.message?.includes('429') || error.message?.includes('rate limit')) {
        throw new Error('AI service rate limit exceeded. Please try again in a few minutes.');
      } else if (error.message?.includes('models')) {
        throw new Error('GitHub Models API access denied. Please ensure your token has "models" permission.');
      } else {
        throw new Error('Failed to analyze job posting. Please try again.');
      }
    }
  }

  /**
   * Generate a tailored resume based on profile data and job requirements
   */
  static async generateResume(
    profileData: ProfileData,
    options: ResumeGenerationOptions = {}
  ): Promise<ResumeData> {
    try {
      const { jobDescription, template = 'professional', focusAreas = [] } = options;

      let jobAnalysis: JobAnalysis | null = null;
      if (jobDescription) {
        jobAnalysis = await this.analyzeJobPosting(jobDescription);
      }

      const prompt = this.buildResumePrompt(profileData, jobAnalysis, template, focusAreas);

      const response = await AIConfig.createChatCompletion([
        {
          role: 'system',
          content: `You are an expert resume writer with 20+ years of experience helping professionals across all industries. You understand ATS systems, modern hiring practices, and what makes a resume stand out. Create compelling, tailored resumes that highlight relevant skills and achievements. Return only valid JSON.`
        },
        {
          role: 'user',
          content: prompt
        }
      ], {
        temperature: 0.4
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from AI service');
      }

      const generatedResume = JSON.parse(content) as ResumeData;
      
      // Calculate match score if job analysis is available
      if (jobAnalysis) {
        generatedResume.matchScore = this.calculateMatchScore(generatedResume, jobAnalysis);
      }

      return generatedResume;
    } catch (error) {
      console.error('Error generating resume:', error);
      throw new Error('Failed to generate resume');
    }
  }

  /**
   * Generate a cover letter based on profile data and job posting
   */
  static async generateCoverLetter(
    profileData: ProfileData,
    jobDescription: string
  ): Promise<string> {
    try {
      const jobAnalysis = await this.analyzeJobPosting(jobDescription);

      const prompt = `
        Generate a professional cover letter for the following job application:

        Job Details:
        - Company: ${jobAnalysis.company}
        - Position: ${jobAnalysis.title}
        - Requirements: ${jobAnalysis.requirements.join(', ')}

        Applicant Profile:
        - Name: ${profileData.full_name || 'Applicant'}
        - Email: ${profileData.email || ''}
        - Current Role: ${profileData.current_position || ''}
        - Years of Experience: ${profileData.years_experience || ''}
        - Key Skills: ${this.extractSkillsFromProfile(profileData).join(', ')}
        - Recent Achievement: ${profileData.top_achievement || ''}

        Create a compelling, personalized cover letter that:
        1. Addresses the specific role and company
        2. Highlights relevant experience and skills
        3. Shows enthusiasm for the position
        4. Is professional but engaging
        5. Is approximately 3-4 paragraphs
        6. Includes a strong opening and closing

        Format as plain text, ready to be copied into an application.
      `;

      const response = await AIConfig.createChatCompletion([
        {
          role: 'system',
          content: 'You are an expert career coach and cover letter writer. Create compelling, personalized cover letters that get results.'
        },
        {
          role: 'user',
          content: prompt
        }
      ], {
        temperature: 0.5
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error generating cover letter:', error);
      throw new Error('Failed to generate cover letter');
    }
  }

  /**
   * Build the prompt for resume generation
   */
  private static buildResumePrompt(
    profileData: ProfileData,
    jobAnalysis: JobAnalysis | null,
    template: string,
    focusAreas: string[]
  ): string {
    const skills = this.extractSkillsFromProfile(profileData);
    const experience = this.extractExperienceFromProfile(profileData);

    return `
      Create a professional resume in JSON format based on the following information:

      PROFILE DATA:
      - Name: ${profileData.full_name || ''}
      - Email: ${profileData.email || ''}
      - Phone: ${profileData.phone || ''}
      - Location: ${profileData.city || ''}, ${profileData.state || ''}
      - LinkedIn: ${profileData.linkedin_url || ''}
      - Portfolio: ${profileData.portfolio_url || ''}
      
      PROFESSIONAL SUMMARY:
      - Current Position: ${profileData.current_position || ''}
      - Years of Experience: ${profileData.years_experience || ''}
      - Industry Focus: ${profileData.target_industry || ''}
      - Career Goals: ${profileData.career_goals || ''}
      
      SKILLS:
      ${skills.map(skill => `- ${skill}`).join('\n')}
      
      EXPERIENCE:
      ${experience.map(exp => `- ${exp}`).join('\n')}
      
      EDUCATION:
      - Degree: ${profileData.education_level || ''}
      - Field of Study: ${profileData.field_of_study || ''}
      - Institution: ${profileData.school_name || ''}
      - Graduation: ${profileData.graduation_year || ''}

      ${jobAnalysis ? `
      TARGET JOB:
      - Position: ${jobAnalysis.title}
      - Company: ${jobAnalysis.company}
      - Required Skills: ${jobAnalysis.requirements.join(', ')}
      - Preferred Skills: ${jobAnalysis.preferredSkills.join(', ')}
      ` : ''}

      TEMPLATE STYLE: ${template}
      FOCUS AREAS: ${focusAreas.join(', ') || 'General professional focus'}

      Please return a JSON object with this exact structure:
      {
        "personalInfo": {
          "fullName": "string",
          "email": "string",
          "phone": "string",
          "location": "string",
          "linkedin": "string",
          "portfolio": "string"
        },
        "summary": "A compelling 2-3 sentence professional summary",
        "experience": [
          {
            "title": "Job title",
            "company": "Company name",
            "location": "City, State",
            "startDate": "MM/YYYY",
            "endDate": "MM/YYYY or Present",
            "description": "Brief role description",
            "achievements": ["Achievement 1", "Achievement 2", "Achievement 3"]
          }
        ],
        "education": [
          {
            "degree": "Degree type",
            "fieldOfStudy": "Field of study",
            "institution": "Institution name",
            "graduationYear": "YYYY",
            "gpa": "GPA if relevant",
            "honors": ["Honor 1", "Honor 2"]
          }
        ],
        "skills": {
          "technical": ["Technical skill 1", "Technical skill 2"],
          "soft": ["Soft skill 1", "Soft skill 2"],
          "languages": ["Language 1", "Language 2"],
          "certifications": ["Certification 1", "Certification 2"]
        },
        "projects": [
          {
            "name": "Project name",
            "description": "Project description",
            "technologies": ["Tech 1", "Tech 2"],
            "url": "project URL if available"
          }
        ]
      }

      Tailor the content to highlight skills and experiences most relevant to the target role.
      Use action verbs and quantify achievements where possible.
      Ensure all information is professional and ATS-friendly.
    `;
  }

  /**
   * Extract skills from profile data
   */
  private static extractSkillsFromProfile(profileData: ProfileData): string[] {
    const skills: string[] = [];
    
    // Extract from various skill-related fields
    Object.entries(profileData).forEach(([key, value]) => {
      if (key.includes('skill') || key.includes('technology') || key.includes('tool')) {
        if (Array.isArray(value)) {
          skills.push(...value);
        } else if (typeof value === 'string' && value.trim()) {
          skills.push(value);
        }
      }
    });

    return [...new Set(skills)]; // Remove duplicates
  }

  /**
   * Extract experience from profile data
   */
  private static extractExperienceFromProfile(profileData: ProfileData): string[] {
    const experience: string[] = [];
    
    Object.entries(profileData).forEach(([key, value]) => {
      if (key.includes('experience') || key.includes('project') || key.includes('work')) {
        if (Array.isArray(value)) {
          experience.push(...value.map(item => String(item)));
        } else if (typeof value === 'string' && value.trim()) {
          experience.push(value);
        }
      }
    });

    return experience;
  }

  /**
   * Calculate match score between resume and job requirements
   */
  private static calculateMatchScore(resume: ResumeData, jobAnalysis: JobAnalysis): number {
    const resumeSkills = [
      ...(resume.skills?.technical || []),
      ...(resume.skills?.soft || []),
      ...(resume.skills?.certifications || [])
    ].map(skill => skill.toLowerCase());

    const requiredSkills = jobAnalysis.requirements.map(req => req.toLowerCase());
    const preferredSkills = jobAnalysis.preferredSkills.map(pref => pref.toLowerCase());

    let matches = 0;
    let totalRequirements = requiredSkills.length + preferredSkills.length;

    // Check required skills (weighted more heavily)
    requiredSkills.forEach(skill => {
      if (resumeSkills.some(resumeSkill => resumeSkill.includes(skill) || skill.includes(resumeSkill))) {
        matches += 2; // Required skills count double
      }
    });

    // Check preferred skills
    preferredSkills.forEach(skill => {
      if (resumeSkills.some(resumeSkill => resumeSkill.includes(skill) || skill.includes(resumeSkill))) {
        matches += 1;
      }
    });

    // Calculate percentage (accounting for weighted scoring)
    const maxPossibleScore = (requiredSkills.length * 2) + preferredSkills.length;
    return Math.min(100, Math.round((matches / maxPossibleScore) * 100));
  }
}
