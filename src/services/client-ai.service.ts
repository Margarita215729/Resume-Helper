// Client-side AI service adapter for static hosting
import type { ProfileData } from '@/types/profile';
import type { ResumeData } from '@/types/resume';

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
  template?: string;
  style?: string;
  format?: 'professional' | 'modern' | 'creative' | 'ats-friendly';
}

// Client-side AI service that works in static environments
export class ClientAIService {
  private static apiKey: string | null = null;
  private static endpoint: string = 'https://models.github.ai/inference';
  private static modelName: string = 'gpt-4o-mini';

  static initialize() {
    // In static hosting, we'll use environment variables injected at build time
    this.apiKey = process.env.NEXT_PUBLIC_GITHUB_TOKEN || null;
    this.endpoint = process.env.NEXT_PUBLIC_GITHUB_MODEL_ENDPOINT || this.endpoint;
    this.modelName = process.env.NEXT_PUBLIC_GITHUB_MODEL_NAME || this.modelName;
  }

  static async analyzeJobPosting(jobDescription: string): Promise<JobAnalysis> {
    try {
      if (!this.apiKey) {
        return this.getMockJobAnalysis(jobDescription);
      }

      const response = await fetch(`${this.endpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.modelName,
          messages: [
            {
              role: 'system',
              content: 'You are an expert HR analyst. Return only valid JSON.'
            },
            {
              role: 'user',
              content: `Analyze this job posting and return JSON with title, company, description, requirements, preferredSkills, experience, salary, location, and recommendations: ${jobDescription}`
            }
          ],
          temperature: 0.3,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No response from AI service');
      }

      return JSON.parse(content);
    } catch (error) {
      console.warn('AI service failed, using mock data:', error);
      return this.getMockJobAnalysis(jobDescription);
    }
  }

  static async generateResume(profileData: ProfileData, options: ResumeGenerationOptions = {}): Promise<ResumeData> {
    try {
      if (!this.apiKey) {
        return this.getMockResume(profileData);
      }

      const response = await fetch(`${this.endpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.modelName,
          messages: [
            {
              role: 'system',
              content: 'You are a professional resume writer. Generate a complete resume in JSON format.'
            },
            {
              role: 'user',
              content: `Generate a resume for: ${JSON.stringify(profileData)}`
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No response from AI service');
      }

      return JSON.parse(content);
    } catch (error) {
      console.warn('AI service failed, using mock resume:', error);
      return this.getMockResume(profileData);
    }
  }

  static async generateCoverLetter(profileData: ProfileData, jobDescription: string): Promise<string> {
    try {
      if (!this.apiKey) {
        return this.getMockCoverLetter(profileData, jobDescription);
      }

      const response = await fetch(`${this.endpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.modelName,
          messages: [
            {
              role: 'system',
              content: 'You are a professional cover letter writer.'
            },
            {
              role: 'user',
              content: `Write a cover letter for ${JSON.stringify(profileData)} applying to: ${jobDescription}`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || this.getMockCoverLetter(profileData, jobDescription);
    } catch (error) {
      console.warn('AI service failed, using mock cover letter:', error);
      return this.getMockCoverLetter(profileData, jobDescription);
    }
  }

  // Mock data methods for fallback
  private static getMockJobAnalysis(jobDescription: string): JobAnalysis {
    return {
      title: "Software Engineer",
      company: "Tech Company",
      description: "Exciting opportunity for a skilled developer",
      requirements: [
        "JavaScript/TypeScript",
        "React.js",
        "Node.js",
        "Database management",
        "Problem-solving skills"
      ],
      preferredSkills: [
        "Next.js",
        "AWS",
        "Docker",
        "GraphQL"
      ],
      experience: "2-5 years",
      salary: "$80,000 - $120,000",
      location: "Remote",
      matchScore: 85,
      recommendations: [
        "Highlight your React.js experience",
        "Mention any cloud platform experience",
        "Showcase problem-solving projects"
      ]
    };
  }

  private static getMockResume(profileData: ProfileData): ResumeData {
    return {
      personalInfo: {
        fullName: profileData.full_name || "John Doe",
        email: profileData.email || "john.doe@email.com",
        phone: profileData.phone || "(555) 123-4567",
        location: `${profileData.city || "San Francisco"}, ${profileData.state || "CA"}`,
        linkedin: profileData.linkedin_url || "",
        portfolio: profileData.portfolio_url || ""
      },
      summary: "Experienced software engineer with a passion for creating innovative solutions and delivering high-quality applications.",
      experience: [
        {
          title: "Senior Software Engineer",
          company: "Tech Solutions Inc.",
          location: "San Francisco, CA",
          startDate: "01/2022",
          endDate: "Present",
          description: "Lead development of web applications using React and Node.js",
          achievements: [
            "Increased application performance by 40% through optimization",
            "Led a team of 5 developers on critical project deliveries"
          ]
        }
      ],
      education: [
        {
          degree: "Bachelor of Science",
          fieldOfStudy: "Computer Science",
          institution: profileData.school_name || "University of Technology",
          graduationYear: profileData.graduation_year || "2020"
        }
      ],
      skills: {
        technical: ["JavaScript", "TypeScript", "React.js", "Node.js", "Python"],
        soft: ["Leadership", "Problem Solving", "Communication"],
        languages: ["English (Native)"]
      },
      projects: [
        {
          name: "E-commerce Platform",
          description: "Full-stack e-commerce solution with payment integration",
          technologies: ["React", "Node.js", "PostgreSQL"],
          url: "https://github.com/example/ecommerce"
        }
      ]
    } as ResumeData;
  }

  private static getMockCoverLetter(profileData: ProfileData, jobDescription: string): string {
    return `Dear Hiring Manager,

I am writing to express my strong interest in the position at your company. With my background in software development and passion for creating innovative solutions, I am excited about the opportunity to contribute to your team.

My experience includes working with modern web technologies and delivering high-quality applications. I believe my skills align well with your requirements.

Thank you for considering my application.

Best regards,
${profileData.full_name || 'Your Name'}`;
  }
}

// Initialize the service
if (typeof window !== 'undefined') {
  ClientAIService.initialize();
}
