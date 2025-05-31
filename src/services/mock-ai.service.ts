// Mock AI service for testing without API keys
export class MockAIService {
  static async analyzeJobPosting(jobDescription: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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

  static async generateResume(profileData: any, options: any = {}) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      personalInfo: {
        fullName: profileData.full_name || "John Doe",
        email: profileData.email || "john.doe@email.com",
        phone: profileData.phone || "(555) 123-4567",
        location: `${profileData.city || "San Francisco"}, ${profileData.state || "CA"}`,
        linkedin: profileData.linkedin_url || "",
        portfolio: profileData.portfolio_url || ""
      },
      summary: "Experienced software engineer with a passion for creating innovative solutions and delivering high-quality applications. Proven track record of working with modern technologies and agile methodologies.",
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
            "Led a team of 5 developers on critical project deliveries",
            "Implemented automated testing reducing bugs by 60%"
          ]
        },
        {
          title: "Software Engineer",
          company: "StartUp Ventures",
          location: "San Francisco, CA", 
          startDate: "06/2020",
          endDate: "12/2021",
          description: "Full-stack development with modern JavaScript frameworks",
          achievements: [
            "Built 3 major features serving 10,000+ users",
            "Collaborated with design team to improve UX",
            "Mentored 2 junior developers"
          ]
        }
      ],
      education: [
        {
          degree: "Bachelor of Science",
          fieldOfStudy: "Computer Science",
          institution: profileData.school_name || "University of Technology",
          graduationYear: profileData.graduation_year || "2020",
          gpa: "3.8",
          honors: ["Dean's List", "Computer Science Honor Society"]
        }
      ],
      skills: {
        technical: ["JavaScript", "TypeScript", "React.js", "Node.js", "Python", "AWS"],
        soft: ["Leadership", "Problem Solving", "Communication", "Team Collaboration"],
        languages: ["English (Native)", "Spanish (Conversational)"],
        certifications: ["AWS Certified Developer", "Scrum Master Certified"]
      },
      projects: [
        {
          name: "E-commerce Platform",
          description: "Full-stack e-commerce solution with payment integration",
          technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
          url: "https://github.com/example/ecommerce"
        },
        {
          name: "Task Management App", 
          description: "Real-time collaborative task management application",
          technologies: ["Next.js", "Socket.io", "MongoDB"],
          url: "https://github.com/example/taskapp"
        }
      ],
      matchScore: 92
    };
  }

  static async generateCoverLetter(profileData: any, jobDescription: string) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return `Dear Hiring Manager,

I am writing to express my strong interest in the Software Engineer position at your company. With over ${profileData.years_experience || '3'} years of experience in full-stack development and a passion for creating innovative solutions, I am excited about the opportunity to contribute to your team.

In my current role as Senior Software Engineer at Tech Solutions Inc., I have successfully led the development of multiple web applications using React.js and Node.js, technologies that align perfectly with your requirements. My experience includes implementing performance optimizations that increased application efficiency by 40% and leading cross-functional teams to deliver critical projects on time.

What particularly excites me about this opportunity is the chance to work with cutting-edge technologies and contribute to meaningful projects. My background in ${profileData.field_of_study || 'Computer Science'} and hands-on experience with modern development practices position me well to make an immediate impact on your team.

I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to your company's continued success. Thank you for considering my application.

Best regards,
${profileData.full_name || 'Your Name'}`;
  }
}
