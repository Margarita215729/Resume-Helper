# 🚀 Resume Helper v2

AI-powered resume generator that creates personalized resumes and cover letters for every job application. Never forget your skills again!

## ✨ Features

- **📝 Comprehensive Skills Assessment** - Detailed questionnaire covering all professional areas
- **🤖 AI-Powered Job Analysis** - Automatically extracts requirements from job postings
- **🎯 Smart Skill Matching** - Matches your abilities with job requirements
- **📄 Tailored Resume Generation** - Creates optimized resumes for each application
- **💌 Personalized Cover Letters** - Generates compelling cover letters
- **🌍 Multi-Industry Support** - Works for tech, hospitality, cleaning, laboratory work, and more
- **📱 Mobile Friendly** - Responsive design for all devices
- **⚡ Lightning Fast** - Generate resumes in seconds

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Context** for state management
- **React Hooks** for modern patterns

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/resume-helper-v2.git
cd resume-helper-v2
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 How to Use

### 1. Complete Your Profile

- Navigate to the **Questionnaire** page
- Answer comprehensive questions about:
  - Personal information
  - Professional experience
  - Technical skills
  - Soft skills
  - Education
  - Languages
  - Certifications
  - Work preferences

### 2. Generate Tailored Resumes

- Go to the **Resume Generator** page
- Paste any job posting text
- Optional: Add company name
- Click "Generate Tailored Resume & Cover Letter"

### 3. Review and Download

- Review the AI-generated analysis
- Check your tailored resume
- Review the personalized cover letter
- Download as PDF (coming soon)

## 🎯 Perfect For

- **Software Developers** - Backend, frontend, full-stack positions
- **Hospitality Workers** - Host, server, receptionist roles
- **Cleaning Staff** - Housekeeping, maintenance positions
- **Laboratory Assistants** - Research, testing roles
- **Interns** - Any field internship applications
- **Career Changers** - Transitioning between industries

## 🔮 Upcoming Features

- [ ] **Real AI Integration** (OpenAI GPT-4)
- [ ] **PDF Export** with professional templates
- [ ] **Google Cloud Storage** integration
- [ ] **Multiple Resume Templates**
- [ ] **Resume History & Management**
- [ ] **LinkedIn Integration**
- [ ] **ATS Optimization Scoring**
- [ ] **Multi-language Support** (Russian/English)
- [ ] **Cover Letter Templates**
- [ ] **Skills Database Expansion**

## 🏗️ Architecture

```
src/
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home page
│   ├── questionnaire/     # Questionnaire page
│   └── resume-generator/  # Resume generator page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Navigation.tsx    # Main navigation
│   ├── Questionnaire.tsx # Skills assessment form
│   └── ResumeGenerator.tsx # AI resume generator
├── context/              # React Context for state
├── lib/                  # Utility functions
└── types/               # TypeScript definitions
```

## 🧪 Testing

### Manual Testing Workflow

1. **Complete Profile**:
   - Navigate to <http://localhost:3000>
   - Click "Start Questionnaire"
   - Fill out comprehensive profile (27+ questions)
   - Verify progress tracking and navigation

2. **Generate Resume**:
   - Go to "Try Generator"
   - Use this sample job posting:

```
Senior Frontend Developer at TechCorp
San Francisco, CA

Requirements:
- 5+ years React.js experience
- TypeScript proficiency
- Next.js framework knowledge
- State management (Redux/Context)
- Modern CSS frameworks
- Testing frameworks experience
- CS degree preferred

We offer competitive salary, remote work options, and excellent benefits.
```

3. **Verify Features**:
   - Check AI job analysis results
   - Review generated resume quality
   - Test copy-to-clipboard functionality
   - Verify error handling and fallback systems

### Expected Results

- ✅ Job posting analysis extracts key requirements
- ✅ Resume highlights relevant skills from your profile
- ✅ Cover letter personalizes content for the specific role
- ✅ Copy buttons work for both resume and cover letter
- ✅ Error messages appear for invalid inputs
- ✅ Loading states show during AI processing

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# GitHub Models API (optional - has fallback)
GITHUB_TOKEN=your_github_token_here
GITHUB_MODEL_ENDPOINT=https://models.github.ai/inference
GITHUB_MODEL_NAME=openai/o4-mini

# Next.js
NODE_ENV=development
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## 📊 Current Status

✅ **MVP Complete** - Core functionality working
✅ **Error Handling** - Robust fallback systems  
✅ **UX Improvements** - Loading states, success/error messages
✅ **Copy Functionality** - Easy export for immediate use
⚠️ **PDF Export** - Planned for Phase 2
⚠️ **User Accounts** - Planned for Phase 3

---

**Made with ❤️ for job seekers everywhere** 🌟
