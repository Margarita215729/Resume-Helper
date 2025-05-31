// Azure AI Inference Service for GitHub Models
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import OpenAI from 'openai';
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
    if (this.isGitHubModels()) {
      // Use Azure AI Inference SDK for GitHub Models
      const client = this.getAzureClient();
      const modelName = this.getModelName();

      const response = await client.path("/chat/completions").post({
        body: {
          messages,
          model: modelName,
          ...options
        }
      });

      if (isUnexpected(response)) {
        throw new Error(`GitHub Models API error: ${response.body.error?.message || 'Unknown error'}`);
      }

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
      const client = this.getOpenAIClient();
      const modelName = this.getModelName();

      return await client.chat.completions.create({
        model: modelName,
        messages,
        ...options
      });
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

      // Ensure the resume has all required fields
      if (!generatedResume.personalInfo || !generatedResume.experience) {
        throw new Error('Generated resume is missing required fields');
      }

      return generatedResume;
    } catch (error) {
      console.error('Error generating resume:', error);
      throw new Error('Failed to generate resume');
    }
  }

  /**
   * Generate a cover letter based on profile and job information
   */
  static async generateCoverLetter(
    profileData: ProfileData,
    jobDescription: string,
    companyName?: string
  ): Promise<string> {
    try {
      const prompt = `
        Create a compelling cover letter based on the following information:

        **Candidate Profile:**
        ${JSON.stringify(profileData, null, 2)}

        **Job Description:**
        "${jobDescription}"

        **Company:** ${companyName || 'The hiring company'}

        Please write a professional cover letter that:
        1. Highlights relevant experience and skills that match the job requirements
        2. Demonstrates knowledge of the company and position
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
   * Build the resume generation prompt
   */
  private static buildResumePrompt(
    profileData: ProfileData,
    jobAnalysis: JobAnalysis | null,
    template: string,
    focusAreas: string[]
  ): string {
    const jobContext = jobAnalysis ? `
      **Job Requirements Analysis:**
      - Position: ${jobAnalysis.title} at ${jobAnalysis.company}
      - Required Skills: ${jobAnalysis.requirements.join(', ')}
      - Preferred Skills: ${jobAnalysis.preferredSkills.join(', ')}
      - Experience Level: ${jobAnalysis.experience}
      ${jobAnalysis.salary ? `- Salary Range: ${jobAnalysis.salary}` : ''}
      ${jobAnalysis.location ? `- Location: ${jobAnalysis.location}` : ''}
    ` : '';

    const focusContext = focusAreas.length > 0 ? `
      **Focus Areas:** Emphasize these areas: ${focusAreas.join(', ')}
    ` : '';

    return `
      Create a ${template} resume in JSON format based on the following information:

      **Candidate Profile:**
      ${JSON.stringify(profileData, null, 2)}

      ${jobContext}
      ${focusContext}

      **Instructions:**
      1. Use the exact JSON structure from the candidate profile
      2. Enhance and reorganize content to best match the job requirements
      3. Write compelling bullet points that quantify achievements where possible
      4. Prioritize relevant skills and experience
      5. Ensure ATS compatibility with clear formatting
      6. Keep descriptions concise but impactful
      7. Maintain professional language throughout

      **Template Style: ${template}**
      - Professional: Clean, corporate, traditional formatting
      - Creative: Innovative, design-focused, unique elements
      - Modern: Contemporary, tech-savvy, streamlined
      - ATS-friendly: Optimized for applicant tracking systems

      Return only valid JSON matching the resume data structure.
    `;
  }
}
