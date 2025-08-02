'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useApp } from '@/context/AppContext'
import { JobPosting } from '@/types/resume'
import { useState } from 'react'

export default function ResumeGenerator() {
    const { state } = useApp()
    const [jobPostingText, setJobPostingText] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analyzedJob, setAnalyzedJob] = useState<JobPosting | null>(null)
    const [generatedResume, setGeneratedResume] = useState<string | null>(null)
    const [coverLetter, setCoverLetter] = useState<string | null>(null)

    const analyzeJobPosting = async () => {
        if (!jobPostingText.trim()) return

        setIsAnalyzing(true)

        try {
            // Simulate AI analysis - в реальном приложении здесь будет вызов к AI API
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Extract key information from job posting
            const mockAnalysis: JobPosting = {
                title: extractJobTitle(jobPostingText),
                company: companyName || extractCompanyName(jobPostingText),
                description: jobPostingText,
                requirements: extractRequirements(jobPostingText),
                preferredSkills: extractSkills(jobPostingText),
                location: extractLocation(jobPostingText)
            }

            setAnalyzedJob(mockAnalysis)

            // Generate tailored resume based on user's questionnaire data and job requirements
            const tailoredResume = generateTailoredResume(mockAnalysis, state.questionnaireData)
            setGeneratedResume(tailoredResume)

            // Generate cover letter
            const coverLetterText = generateCoverLetter(mockAnalysis, state.questionnaireData)
            setCoverLetter(coverLetterText)

        } catch (error) {
            console.error('Error analyzing job posting:', error)
        } finally {
            setIsAnalyzing(false)
        }
    }

    const extractJobTitle = (text: string): string => {
        // Simple extraction logic - в реальном приложении будет более сложная логика
        const lines = text.split('\n')
        return lines[0] || 'Position'
    }

    const extractCompanyName = (text: string): string => {
        // Simple extraction logic
        const companyMatch = text.match(/at\s+([A-Z][a-zA-Z\s&]+)/i)
        return companyMatch?.[1] || 'Company'
    }

    const extractRequirements = (text: string): string[] => {
        const requirements: string[] = []
        const lowerText = text.toLowerCase()

        if (lowerText.includes('experience')) requirements.push('Professional experience required')
        if (lowerText.includes('bachelor')) requirements.push('Bachelor\'s degree preferred')
        if (lowerText.includes('team')) requirements.push('Team collaboration skills')
        if (lowerText.includes('communication')) requirements.push('Strong communication skills')

        return requirements
    }

    const extractSkills = (text: string): string[] => {
        const skills: string[] = []
        const lowerText = text.toLowerCase()

        // Programming languages
        const programmingLanguages = ['javascript', 'python', 'java', 'react', 'node.js', 'typescript', 'html', 'css']
        programmingLanguages.forEach(lang => {
            if (lowerText.includes(lang)) skills.push(lang)
        })

        // Soft skills
        if (lowerText.includes('leadership')) skills.push('Leadership')
        if (lowerText.includes('project management')) skills.push('Project Management')
        if (lowerText.includes('customer service')) skills.push('Customer Service')
        if (lowerText.includes('cleaning')) skills.push('Cleaning')
        if (lowerText.includes('host')) skills.push('Hospitality')

        return skills
    }

    const extractLocation = (text: string): string => {
        const locationMatch = text.match(/([A-Z][a-zA-Z\s]+,\s*[A-Z]{2})/i)
        return locationMatch?.[0] || 'Location not specified'
    }

    const generateTailoredResume = (job: JobPosting, questionnaireData: any[]): string => {
        // Match user's skills with job requirements
        const relevantSkills = questionnaireData
            .filter(q => q.category === 'Technical Skills' || q.category === 'Soft Skills')
            .map(q => q.answer)
            .join(', ')

        const experience = questionnaireData.find(q => q.question.includes('professional background'))?.answer || ''
        const name = questionnaireData.find(q => q.question.includes('full name'))?.answer || 'Your Name'

        return `# ${name}

## Professional Summary
${experience}

## Key Skills Relevant to ${job.title}
${relevantSkills}

## Experience
[Tailored based on job requirements]

## Education
[Your education details]

## Languages
[Your language skills]

*This resume has been tailored specifically for the ${job.title} position at ${job.company}*`
    }

    const generateCoverLetter = (job: JobPosting, questionnaireData: any[]): string => {
        const name = questionnaireData.find(q => q.question.includes('full name'))?.answer || 'Your Name'
        const experience = questionnaireData.find(q => q.question.includes('professional background'))?.answer || ''

        return `Dear Hiring Manager,

I am writing to express my strong interest in the ${job.title} position at ${job.company}. 

${experience}

Based on the job requirements, I believe my skills and experience make me an excellent candidate for this role. I am particularly excited about the opportunity to contribute to your team and would welcome the chance to discuss how my background aligns with your needs.

Thank you for considering my application. I look forward to hearing from you soon.

Best regards,
${name}`
    }

    const exportToPDF = () => {
        // В реальном приложении здесь будет генерация PDF
        alert('PDF export functionality will be implemented with jsPDF')
    }

    if (!state.isOnboardingComplete) {
        return (
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Complete Your Profile First</CardTitle>
                    <CardDescription>
                        Please complete the questionnaire before generating resumes.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => window.location.href = '/questionnaire'}>
                        Go to Questionnaire
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>🚀 AI-Powered Resume Generator</CardTitle>
                    <CardDescription>
                        Paste a job posting and we'll create a tailored resume and cover letter for you
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Name (optional)
                        </label>
                        <Input
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Enter company name..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Posting Text *
                        </label>
                        <Textarea
                            value={jobPostingText}
                            onChange={(e) => setJobPostingText(e.target.value)}
                            placeholder="Paste the complete job posting here..."
                            rows={10}
                        />
                    </div>

                    <Button
                        onClick={analyzeJobPosting}
                        disabled={!jobPostingText.trim() || isAnalyzing}
                        className="w-full"
                    >
                        {isAnalyzing ? 'Analyzing Job Posting...' : 'Generate Tailored Resume & Cover Letter'}
                    </Button>
                </CardContent>
            </Card>

            {analyzedJob && (
                <Card>
                    <CardHeader>
                        <CardTitle>📊 Job Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-medium text-gray-900">Position:</h4>
                                <p className="text-gray-600">{analyzedJob.title}</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Company:</h4>
                                <p className="text-gray-600">{analyzedJob.company}</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Location:</h4>
                                <p className="text-gray-600">{analyzedJob.location}</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Key Skills:</h4>
                                <p className="text-gray-600">{analyzedJob.preferredSkills.join(', ')}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {generatedResume && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>📄 Tailored Resume</CardTitle>
                            <CardDescription>
                                Optimized for {analyzedJob?.title} at {analyzedJob?.company}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <pre className="whitespace-pre-wrap text-sm">{generatedResume}</pre>
                            </div>
                            <div className="mt-4 space-x-2">
                                <Button onClick={exportToPDF}>Download PDF</Button>
                                <Button variant="outline">Edit Resume</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>💌 Cover Letter</CardTitle>
                            <CardDescription>
                                Personalized for this specific opportunity
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <pre className="whitespace-pre-wrap text-sm">{coverLetter}</pre>
                            </div>
                            <div className="mt-4 space-x-2">
                                <Button onClick={exportToPDF}>Download PDF</Button>
                                <Button variant="outline">Edit Cover Letter</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
