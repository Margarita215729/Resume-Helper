import { QuestionnaireResponse } from '@/types/resume'

// AI Service для интеграции с GitHub Models
interface AIRequest {
    prompt: string
    maxTokens?: number
    temperature?: number
}

interface AIResponse {
    content: string
    usage?: {
        promptTokens: number
        completionTokens: number
        totalTokens: number
    }
}

interface JobAnalysis {
    title: string
    company: string
    requirements: string[]
    skills: string[]
    location: string
}

class AIService {
    private readonly apiKey: string
    private readonly endpoint: string
    private readonly modelName: string

    constructor() {
        this.apiKey = process.env.GITHUB_TOKEN || ''
        this.endpoint = process.env.GITHUB_MODEL_ENDPOINT || 'https://models.github.ai/inference'
        this.modelName = process.env.GITHUB_MODEL_NAME || 'openai/o4-mini'
    }

    async generateResponse(request: AIRequest): Promise<AIResponse> {
        if (!this.apiKey) {
            throw new Error('GitHub token is not configured')
        }

        try {
            const response = await fetch(`${this.endpoint}/v1/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: this.modelName,
                    messages: [
                        {
                            role: 'user',
                            content: request.prompt
                        }
                    ],
                    max_tokens: request.maxTokens || 1000,
                    temperature: request.temperature || 0.7,
                }),
            })

            if (!response.ok) {
                throw new Error(`AI API request failed: ${response.status} ${response.statusText}`)
            }

            const data = await response.json()

            return {
                content: data.choices[0]?.message?.content || '',
                usage: data.usage ? {
                    promptTokens: data.usage.prompt_tokens,
                    completionTokens: data.usage.completion_tokens,
                    totalTokens: data.usage.total_tokens,
                } : undefined
            }
        } catch (error) {
            console.error('AI Service Error:', error)
            throw new Error('Failed to generate AI response')
        }
    }

    async analyzeJobPosting(jobText: string): Promise<JobAnalysis> {
        const prompt = `Analyze this job posting and extract key information. Return a JSON object with the following structure:
{
  "title": "job title",
  "company": "company name",
  "requirements": ["requirement 1", "requirement 2"],
  "skills": ["skill 1", "skill 2"],
  "location": "location"
}

Job posting:
${jobText}`

        const response = await this.generateResponse({
            prompt,
            maxTokens: 500,
            temperature: 0.3
        })

        try {
            return JSON.parse(response.content)
        } catch {
            // Fallback parsing if JSON fails
            return {
                title: this.extractJobTitle(jobText),
                company: this.extractCompanyName(jobText),
                requirements: this.extractRequirements(jobText),
                skills: this.extractSkills(jobText),
                location: this.extractLocation(jobText)
            }
        }
    }

    async generateTailoredResume(
        jobAnalysis: JobAnalysis,
        userProfile: QuestionnaireResponse[]
    ): Promise<string> {
        const profileData = userProfile.map(q => `${q.question}: ${q.answer}`).join('\n')

        const prompt = `Create a tailored resume based on the job requirements and user profile.

Job Analysis:
- Title: ${jobAnalysis.title}
- Company: ${jobAnalysis.company}
- Requirements: ${jobAnalysis.requirements?.join(', ')}
- Skills: ${jobAnalysis.skills?.join(', ')}

User Profile:
${profileData}

Generate a professional resume in markdown format that highlights the most relevant skills and experience for this specific job. Focus on matching the job requirements with the user's background.`

        const response = await this.generateResponse({
            prompt,
            maxTokens: 1500,
            temperature: 0.5
        })

        return response.content
    }

    async generateCoverLetter(
        jobAnalysis: JobAnalysis,
        userProfile: QuestionnaireResponse[]
    ): Promise<string> {
        const userName = userProfile.find(q => q.question.includes('full name'))?.answer || 'Applicant'
        const experience = userProfile.find(q => q.question.includes('professional background'))?.answer || ''

        const prompt = `Write a professional cover letter for the following job application:

Job Details:
- Position: ${jobAnalysis.title}
- Company: ${jobAnalysis.company}
- Requirements: ${jobAnalysis.requirements?.join(', ')}

Applicant Name: ${userName}
Background: ${experience}

Create a compelling cover letter that shows enthusiasm for the role and demonstrates how the applicant's experience aligns with the job requirements. Keep it concise and professional.`

        const response = await this.generateResponse({
            prompt,
            maxTokens: 800,
            temperature: 0.6
        })

        return response.content
    }

    // Fallback extraction methods (same as before)
    private extractJobTitle(text: string): string {
        const lines = text.split('\n')
        return lines[0] || 'Position'
    }

    private extractCompanyName(text: string): string {
        const companyMatch = text.match(/at\s+([A-Z][a-zA-Z\s&]+)/i)
        return companyMatch?.[1] || 'Company'
    }

    private extractRequirements(text: string): string[] {
        const requirements: string[] = []
        const lowerText = text.toLowerCase()

        if (lowerText.includes('experience')) requirements.push('Professional experience required')
        if (lowerText.includes('bachelor')) requirements.push('Bachelor\'s degree preferred')
        if (lowerText.includes('team')) requirements.push('Team collaboration skills')
        if (lowerText.includes('communication')) requirements.push('Strong communication skills')

        return requirements
    }

    private extractSkills(text: string): string[] {
        const skills: string[] = []
        const lowerText = text.toLowerCase()

        const programmingLanguages = ['javascript', 'python', 'java', 'react', 'node.js', 'typescript', 'html', 'css']
        programmingLanguages.forEach(lang => {
            if (lowerText.includes(lang)) skills.push(lang)
        })

        if (lowerText.includes('leadership')) skills.push('Leadership')
        if (lowerText.includes('project management')) skills.push('Project Management')
        if (lowerText.includes('customer service')) skills.push('Customer Service')
        if (lowerText.includes('cleaning')) skills.push('Cleaning')
        if (lowerText.includes('host')) skills.push('Hospitality')

        return skills
    }

    private extractLocation(text: string): string {
        const locationMatch = text.match(/([A-Z][a-zA-Z\s]+,\s*[A-Z]{2})/i)
        return locationMatch?.[0] || 'Location not specified'
    }
}

export const aiService = new AIService()
