// filepath: /Users/Gret/Desktop/Resumes_Helper/src/data/questions.ts
import type { ProfileQuestion } from "@/types/profile";

export const profileQuestions: ProfileQuestion[] = [
  // ===== BASIC INFORMATION (1-15) =====
  {
    id: 'full_name',
    category: 'basic_info',
    question: 'What is your full name?',
    type: 'text',
    required: true,
    placeholder: 'e.g., John Michael Smith'
  },
  {
    id: 'email',
    category: 'basic_info',
    question: 'What is your email address?',
    type: 'text',
    required: true,
    placeholder: 'example@email.com'
  },
  {
    id: 'phone',
    category: 'basic_info',
    question: 'What is your phone number?',
    type: 'text',
    required: true,
    placeholder: '+1 (555) 123-4567'
  },
  {
    id: 'location',
    category: 'basic_info',
    question: 'What is your current location?',
    type: 'text',
    required: false,
    placeholder: 'City, State, ZIP code'
  },
  {
    id: 'professional_summary',
    category: 'basic_info',
    question: 'Provide a brief professional summary (2-3 sentences)',
    type: 'textarea',
    required: false,
    placeholder: 'Describe your professional background and key achievements'
  },
  {
    id: 'linkedin_profile',
    category: 'basic_info',
    question: 'What is your LinkedIn profile URL?',
    type: 'text',
    required: false,
    placeholder: 'https://linkedin.com/in/yourprofile'
  },
  {
    id: 'work_authorization',
    category: 'basic_info',
    question: 'What is your work authorization status in the US?',
    type: 'single_select',
    options: ['US Citizen', 'Green Card Holder', 'H1B Visa', 'OPT/CPT', 'TN Visa', 'Other Work Visa', 'Require Sponsorship'],
    required: true
  },
  {
    id: 'years_experience',
    category: 'basic_info',
    question: 'How many years of total work experience do you have?',
    type: 'single_select',
    options: ['0-1 years', '1-2 years', '2-5 years', '5-10 years', '10-15 years', '15+ years'],
    required: false
  },
  {
    id: 'portfolio_website',
    category: 'basic_info',
    question: 'Do you have a portfolio or personal website?',
    type: 'text',
    required: false,
    placeholder: 'https://yourportfolio.com'
  },
  {
    id: 'github_profile',
    category: 'basic_info',
    question: 'What is your GitHub profile URL?',
    type: 'text',
    required: false,
    placeholder: 'https://github.com/yourusername'
  },
  {
    id: 'languages',
    category: 'basic_info',
    question: 'What languages do you speak and at what level?',
    type: 'multiselect',
    options: ['English (Native)', 'English (Fluent)', 'English (Conversational)', 'English (Basic)', 'Spanish', 'French', 'German', 'Chinese (Mandarin)', 'Chinese (Cantonese)', 'Japanese', 'Korean', 'Arabic', 'Portuguese', 'Italian', 'Russian', 'Hindi'],
    required: true,
    allowOther: true
  },
  {
    id: 'willing_to_relocate',
    category: 'basic_info',
    question: 'Are you willing to relocate for work?',
    type: 'single_select',
    options: ['Yes, anywhere in the US', 'Yes, within my state', 'Yes, within my region', 'No, local only'],
    required: false
  },
  {
    id: 'remote_work_preference',
    category: 'basic_info',
    question: 'What is your remote work preference?',
    type: 'single_select',
    options: ['Remote only', 'Hybrid preferred', 'On-site preferred', 'No preference'],
    required: false
  },
  {
    id: 'salary_expectation',
    category: 'basic_info',
    question: 'What is your salary expectation range?',
    type: 'range',
    scale: { min: 30000, max: 300000, step: 5000 },
    required: false,
    helpText: 'Annual salary in USD'
  },
  {
    id: 'availability',
    category: 'basic_info',
    question: 'When are you available to start?',
    type: 'single_select',
    options: ['Immediately', 'Within 2 weeks', 'Within 1 month', 'Within 2 months', 'More than 2 months'],
    required: false
  },

  // ===== EDUCATION (16-35) =====
  {
    id: 'highest_education',
    category: 'education',
    question: 'What is your highest level of education?',
    type: 'single_select',
    options: ['High School Diploma/GED', 'Some College', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctoral Degree', 'Professional Degree (JD, MD, etc.)', 'Trade/Vocational Certification'],
    required: true
  },
  {
    id: 'degree_field',
    category: 'education',
    question: 'What field did you study?',
    type: 'text',
    required: false,
    placeholder: 'e.g., Computer Science, Business Administration'
  },
  {
    id: 'university_name',
    category: 'education',
    question: 'What institution did you attend?',
    type: 'text',
    required: false,
    placeholder: 'University/College name'
  },
  {
    id: 'graduation_year',
    category: 'education',
    question: 'What year did you graduate?',
    type: 'single_select',
    options: ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', 'Before 2015', 'Current Student'],
    required: false
  },
  {
    id: 'gpa',
    category: 'education',
    question: 'What was your GPA? (if 3.5 or higher)',
    type: 'text',
    required: false,
    placeholder: '3.8/4.0'
  },
  {
    id: 'relevant_coursework',
    category: 'education',
    question: 'List any relevant coursework',
    type: 'textarea',
    required: false,
    placeholder: 'Data Structures, Algorithms, Database Systems...'
  },
  {
    id: 'academic_achievements',
    category: 'education',
    question: 'Any academic honors, awards, or achievements?',
    type: 'textarea',
    required: false,
    placeholder: 'Dean\'s List, Summa Cum Laude, Phi Beta Kappa...'
  },
  {
    id: 'additional_education',
    category: 'education',
    question: 'Do you have additional degrees or certifications?',
    type: 'textarea',
    required: false,
    placeholder: 'List other degrees, certifications, or continuing education'
  },
  {
    id: 'study_abroad',
    category: 'education',
    question: 'Did you study abroad or participate in exchange programs?',
    type: 'textarea',
    required: false,
    placeholder: 'Country, institution, duration'
  },
  {
    id: 'research_experience',
    category: 'education',
    question: 'Do you have research experience?',
    type: 'textarea',
    required: false,
    placeholder: 'Research projects, publications, thesis work'
  },
  {
    id: 'extracurricular_activities',
    category: 'education',
    question: 'What extracurricular activities were you involved in?',
    type: 'multiselect',
    options: ['Student Government', 'Greek Life', 'Sports Teams', 'Academic Clubs', 'Volunteer Organizations', 'Professional Societies', 'Honor Societies', 'Arts/Music Groups', 'Debate Team', 'Student Publications'],
    required: false,
    allowOther: true
  },
  {
    id: 'leadership_roles',
    category: 'education',
    question: 'Did you hold any leadership positions in school?',
    type: 'textarea',
    required: false,
    placeholder: 'Club president, team captain, committee chair...'
  },
  {
    id: 'internships',
    category: 'education',
    question: 'Did you complete any internships?',
    type: 'textarea',
    required: false,
    placeholder: 'Company, role, duration, key responsibilities'
  },
  {
    id: 'study_groups',
    category: 'education',
    question: 'Were you involved in study groups or tutoring?',
    type: 'multiselect',
    options: ['Led study groups', 'Participated in study groups', 'Tutored other students', 'Received tutoring', 'Peer mentor', 'Teaching assistant'],
    required: false
  },
  {
    id: 'capstone_project',
    category: 'education',
    question: 'Did you complete a capstone or senior project?',
    type: 'textarea',
    required: false,
    placeholder: 'Project title, description, outcomes'
  },
  {
    id: 'continuing_education',
    category: 'education',
    question: 'Are you currently pursuing any continuing education?',
    type: 'textarea',
    required: false,
    placeholder: 'Online courses, certifications, additional degrees'
  },
  {
    id: 'educational_goals',
    category: 'education',
    question: 'Do you have any future educational goals?',
    type: 'textarea',
    required: false,
    placeholder: 'Plans for additional degrees, certifications, or training'
  },
  {
    id: 'scholarships',
    category: 'education',
    question: 'Did you receive any scholarships or grants?',
    type: 'textarea',
    required: false,
    placeholder: 'Scholarship names, amounts, criteria'
  },
  {
    id: 'academic_projects',
    category: 'education',
    question: 'What significant academic projects did you complete?',
    type: 'textarea',
    required: false,
    placeholder: 'Major projects, group work, presentations'
  },
  {
    id: 'learning_disabilities',
    category: 'education',
    question: 'Did you overcome any learning challenges or disabilities?',
    type: 'textarea',
    required: false,
    placeholder: 'Only include if it demonstrates resilience or unique perspective'
  },

  // ===== TECHNICAL SKILLS (36-70) =====
  {
    id: 'programming_languages',
    category: 'technical_skills',
    question: 'Rate your proficiency in programming languages',
    type: 'skill_matrix',
    matrix: {
      items: ['JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB'],
      scale: { min: 1, max: 5, labels: ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'web_technologies',
    category: 'technical_skills',
    question: 'Rate your proficiency in web technologies',
    type: 'skill_matrix',
    matrix: {
      items: ['HTML/CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'jQuery', 'Bootstrap', 'Tailwind CSS', 'SASS/SCSS'],
      scale: { min: 1, max: 5, labels: ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'databases',
    category: 'technical_skills',
    question: 'Rate your proficiency with databases',
    type: 'skill_matrix',
    matrix: {
      items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 'SQL Server', 'SQLite', 'Redis', 'Cassandra', 'DynamoDB', 'Firebase'],
      scale: { min: 1, max: 5, labels: ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'cloud_platforms',
    category: 'technical_skills',
    question: 'Rate your experience with cloud platforms',
    type: 'skill_matrix',
    matrix: {
      items: ['AWS', 'Google Cloud', 'Microsoft Azure', 'Heroku', 'DigitalOcean', 'Vercel', 'Netlify'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'devops_tools',
    category: 'technical_skills',
    question: 'Rate your proficiency with DevOps and deployment tools',
    type: 'skill_matrix',
    matrix: {
      items: ['Docker', 'Kubernetes', 'Jenkins', 'GitLab CI/CD', 'GitHub Actions', 'Terraform', 'Ansible', 'Chef', 'Puppet'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'mobile_development',
    category: 'technical_skills',
    question: 'Rate your mobile development experience',
    type: 'skill_matrix',
    matrix: {
      items: ['React Native', 'Flutter', 'iOS (Swift)', 'Android (Kotlin/Java)', 'Xamarin', 'Ionic', 'Cordova'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'testing_frameworks',
    category: 'technical_skills',
    question: 'Rate your experience with testing frameworks',
    type: 'skill_matrix',
    matrix: {
      items: ['Jest', 'Mocha', 'Jasmine', 'Cypress', 'Selenium', 'PyTest', 'JUnit', 'TestNG', 'Postman'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'version_control',
    category: 'technical_skills',
    question: 'Rate your version control experience',
    type: 'skill_matrix',
    matrix: {
      items: ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'SVN', 'Mercurial'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'data_analysis',
    category: 'technical_skills',
    question: 'Rate your data analysis and visualization skills',
    type: 'skill_matrix',
    matrix: {
      items: ['Excel', 'Tableau', 'Power BI', 'D3.js', 'Matplotlib', 'Seaborn', 'Pandas', 'NumPy', 'SciPy', 'R'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'machine_learning',
    category: 'technical_skills',
    question: 'Rate your machine learning and AI experience',
    type: 'skill_matrix',
    matrix: {
      items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'NLP', 'Deep Learning', 'Computer Vision'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },

  // ===== WORK EXPERIENCE & CAREER HISTORY (71-110) =====
  {
    id: 'current_employment_status',
    category: 'work_experience',
    question: 'What is your current employment status?',
    type: 'single_select',
    options: ['Employed full-time', 'Employed part-time', 'Self-employed/Freelancer', 'Unemployed (actively seeking)', 'Student', 'Between jobs', 'Career change'],
    required: true
  },
  {
    id: 'current_job_title',
    category: 'work_experience',
    question: 'What is your current or most recent job title?',
    type: 'text',
    required: false,
    placeholder: 'e.g., Software Engineer, Marketing Manager'
  },
  {
    id: 'current_company',
    category: 'work_experience',
    question: 'What is your current or most recent company?',
    type: 'text',
    required: false,
    placeholder: 'Company name'
  },
  {
    id: 'employment_duration',
    category: 'work_experience',
    question: 'How long have you been/were you in your current/most recent role?',
    type: 'single_select',
    options: ['Less than 6 months', '6 months - 1 year', '1-2 years', '2-3 years', '3-5 years', '5+ years'],
    required: false
  },
  {
    id: 'primary_responsibilities',
    category: 'work_experience',
    question: 'What are/were your primary responsibilities?',
    type: 'textarea',
    required: false,
    placeholder: 'Describe your main duties and responsibilities'
  },
  {
    id: 'key_achievements',
    category: 'work_experience',
    question: 'What are your key achievements in your current/recent role?',
    type: 'textarea',
    required: false,
    placeholder: 'Quantifiable achievements, awards, recognitions'
  },
  {
    id: 'industries_worked',
    category: 'work_experience',
    question: 'What industries have you worked in?',
    type: 'multiselect',
    options: [
      'Technology/Software',
      'Healthcare/Medical',
      'Finance/Banking',
      'Education',
      'Retail/E-commerce',
      'Manufacturing',
      'Consulting',
      'Media/Entertainment',
      'Non-profit',
      'Government',
      'Real Estate',
      'Hospitality/Tourism',
      'Transportation/Logistics',
      'Energy/Utilities',
      'Agriculture',
      'Construction',
      'Legal Services',
      'Marketing/Advertising'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'company_sizes_worked',
    category: 'work_experience',
    question: 'What size companies have you worked for?',
    type: 'multiselect',
    options: ['Startup (1-10 employees)', 'Small (11-50 employees)', 'Medium (51-200 employees)', 'Large (201-1000 employees)', 'Enterprise (1000+ employees)', 'Fortune 500'],
    required: false
  },
  {
    id: 'management_experience',
    category: 'work_experience',
    question: 'Do you have management or leadership experience?',
    type: 'experience_matrix',
    matrix: {
      items: ['Direct reports', 'Team leadership', 'Project management', 'Budget responsibility', 'Cross-functional teams', 'Vendor management'],
      scale: { min: 0, max: 4, labels: ['None', '1-2 years', '3-5 years', '5-10 years', '10+ years'] }
    },
    required: false
  },
  {
    id: 'remote_work_experience',
    category: 'work_experience',
    question: 'How much remote work experience do you have?',
    type: 'single_select',
    options: ['No remote experience', 'Some remote work', '1-2 years remote', '3-5 years remote', '5+ years remote', 'Fully remote for entire career'],
    required: false
  },
  {
    id: 'freelance_consulting',
    category: 'work_experience',
    question: 'Have you done freelance or consulting work?',
    type: 'textarea',
    required: false,
    placeholder: 'Describe freelance projects, clients, duration'
  },
  {
    id: 'career_progression',
    category: 'work_experience',
    question: 'Describe your career progression and growth',
    type: 'textarea',
    required: false,
    placeholder: 'How you\'ve advanced in your career, promotions, skill development'
  },
  {
    id: 'career_gaps',
    category: 'work_experience',
    question: 'Do you have any gaps in your employment history?',
    type: 'textarea',
    required: false,
    placeholder: 'Explain any gaps and what you did during that time'
  },
  {
    id: 'reason_for_leaving',
    category: 'work_experience',
    question: 'Why are you looking for a new opportunity?',
    type: 'multiselect',
    options: [
      'Career advancement',
      'Better compensation',
      'New challenges',
      'Company restructuring',
      'Relocation',
      'Work-life balance',
      'Industry change',
      'Skill development',
      'Company culture',
      'Remote work opportunities'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'international_experience',
    category: 'work_experience',
    question: 'Do you have international work experience?',
    type: 'textarea',
    required: false,
    placeholder: 'Countries worked in, duration, cultural adaptability'
  },
  {
    id: 'startup_experience',
    category: 'work_experience',
    question: 'Do you have startup experience?',
    type: 'textarea',
    required: false,
    placeholder: 'Startup roles, early-stage companies, entrepreneurial experience'
  },
  {
    id: 'client_facing_experience',
    category: 'work_experience',
    question: 'Rate your client-facing experience',
    type: 'experience_matrix',
    matrix: {
      items: ['Customer service', 'Sales presentations', 'Client meetings', 'Account management', 'Public speaking', 'Training/workshops'],
      scale: { min: 0, max: 4, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'cross_functional_collaboration',
    category: 'work_experience',
    question: 'Describe your cross-functional collaboration experience',
    type: 'textarea',
    required: false,
    placeholder: 'Working with different departments, stakeholder management'
  },
  {
    id: 'crisis_management',
    category: 'work_experience',
    question: 'Have you handled crisis situations or high-pressure scenarios?',
    type: 'textarea',
    required: false,
    placeholder: 'Examples of crisis management, problem-solving under pressure'
  },
  {
    id: 'innovation_projects',
    category: 'work_experience',
    question: 'Have you led or contributed to innovation projects?',
    type: 'textarea',
    required: false,
    placeholder: 'New product development, process improvements, creative solutions'
  },

  // ===== INDUSTRY-SPECIFIC EXPERIENCE (111-160) =====
  {
    id: 'healthcare_experience',
    category: 'industry_specific',
    question: 'Do you have healthcare industry experience?',
    type: 'multiselect',
    options: [
      'Patient care',
      'Medical records',
      'Healthcare IT',
      'Clinical research',
      'Medical devices',
      'Pharmaceuticals',
      'Healthcare administration',
      'Telemedicine',
      'Mental health',
      'Public health'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'finance_experience',
    category: 'industry_specific',
    question: 'Do you have finance industry experience?',
    type: 'multiselect',
    options: [
      'Investment banking',
      'Commercial banking',
      'Insurance',
      'Financial planning',
      'Risk management',
      'Accounting',
      'Auditing',
      'Tax preparation',
      'Cryptocurrency',
      'Trading',
      'Credit analysis',
      'Compliance'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'education_experience',
    category: 'industry_specific',
    question: 'Do you have education sector experience?',
    type: 'multiselect',
    options: [
      'K-12 teaching',
      'Higher education',
      'Online education',
      'Curriculum development',
      'Educational technology',
      'Training and development',
      'Academic administration',
      'Student services',
      'Educational research',
      'Special education'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'retail_experience',
    category: 'industry_specific',
    question: 'Do you have retail/e-commerce experience?',
    type: 'multiselect',
    options: [
      'Customer service',
      'Sales',
      'Inventory management',
      'E-commerce platforms',
      'Visual merchandising',
      'Buyer/purchasing',
      'Store management',
      'Supply chain',
      'Point of sale systems',
      'Digital marketing'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'manufacturing_experience',
    category: 'industry_specific',
    question: 'Do you have manufacturing experience?',
    type: 'multiselect',
    options: [
      'Production line work',
      'Quality control',
      'Lean manufacturing',
      'Six Sigma',
      'Equipment maintenance',
      'Safety protocols',
      'Inventory control',
      'Process improvement',
      'Automation',
      'Supply chain management'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'hospitality_experience',
    category: 'industry_specific',
    question: 'Do you have hospitality industry experience?',
    type: 'multiselect',
    options: [
      'Hotel management',
      'Restaurant service',
      'Event planning',
      'Tourism',
      'Catering',
      'Front desk operations',
      'Housekeeping',
      'Food and beverage',
      'Customer relations',
      'Booking systems'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'construction_experience',
    category: 'industry_specific',
    question: 'Do you have construction/trades experience?',
    type: 'multiselect',
    options: [
      'General construction',
      'Electrical work',
      'Plumbing',
      'HVAC',
      'Carpentry',
      'Project management',
      'Safety management',
      'Blueprint reading',
      'Equipment operation',
      'Quality inspection'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'transportation_experience',
    category: 'industry_specific',
    question: 'Do you have transportation/logistics experience?',
    type: 'multiselect',
    options: [
      'Truck driving',
      'Logistics coordination',
      'Warehouse operations',
      'Fleet management',
      'Route planning',
      'Inventory tracking',
      'Shipping/receiving',
      'Supply chain',
      'DOT compliance',
      'Freight brokerage'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'legal_experience',
    category: 'industry_specific',
    question: 'Do you have legal industry experience?',
    type: 'multiselect',
    options: [
      'Paralegal work',
      'Legal research',
      'Document preparation',
      'Client communication',
      'Court procedures',
      'Case management',
      'Legal writing',
      'Compliance',
      'Contract review',
      'Litigation support'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'nonprofit_experience',
    category: 'industry_specific',
    question: 'Do you have non-profit sector experience?',
    type: 'multiselect',
    options: [
      'Fundraising',
      'Grant writing',
      'Volunteer coordination',
      'Program management',
      'Community outreach',
      'Event planning',
      'Donor relations',
      'Social media',
      'Budget management',
      'Impact measurement'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'government_experience',
    category: 'industry_specific',
    question: 'Do you have government sector experience?',
    type: 'multiselect',
    options: [
      'Public administration',
      'Policy development',
      'Regulatory compliance',
      'Public safety',
      'Social services',
      'Military service',
      'Government contracting',
      'Public records',
      'Community planning',
      'Emergency management'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'media_experience',
    category: 'industry_specific',
    question: 'Do you have media/entertainment experience?',
    type: 'multiselect',
    options: [
      'Content creation',
      'Video production',
      'Audio production',
      'Journalism',
      'Social media management',
      'Digital marketing',
      'Event production',
      'Graphic design',
      'Photography',
      'Broadcasting'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'agriculture_experience',
    category: 'industry_specific',
    question: 'Do you have agriculture/farming experience?',
    type: 'multiselect',
    options: [
      'Crop production',
      'Livestock management',
      'Farm equipment operation',
      'Agricultural research',
      'Food processing',
      'Organic farming',
      'Agricultural sales',
      'Farm management',
      'Sustainable practices',
      'Agricultural technology'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'energy_experience',
    category: 'industry_specific',
    question: 'Do you have energy/utilities experience?',
    type: 'multiselect',
    options: [
      'Power generation',
      'Renewable energy',
      'Oil and gas',
      'Utility operations',
      'Energy efficiency',
      'Grid management',
      'Environmental compliance',
      'Safety protocols',
      'Equipment maintenance',
      'Project development'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'real_estate_experience',
    category: 'industry_specific',
    question: 'Do you have real estate experience?',
    type: 'multiselect',
    options: [
      'Sales/leasing',
      'Property management',
      'Real estate development',
      'Appraisal',
      'Mortgage lending',
      'Commercial real estate',
      'Property inspection',
      'Real estate law',
      'Market analysis',
      'Construction management'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'security_experience',
    category: 'industry_specific',
    question: 'Do you have security industry experience?',
    type: 'multiselect',
    options: [
      'Physical security',
      'Cybersecurity',
      'Loss prevention',
      'Security consulting',
      'Emergency response',
      'Risk assessment',
      'Surveillance systems',
      'Access control',
      'Compliance auditing',
      'Incident investigation'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'personal_services_experience',
    category: 'industry_specific',
    question: 'Do you have personal services experience?',
    type: 'multiselect',
    options: [
      'Childcare/Nanny',
      'Elder care',
      'House cleaning',
      'Personal training',
      'Beauty/cosmetology',
      'Pet care',
      'Tutoring',
      'Personal shopping',
      'Home maintenance',
      'Life coaching'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'laboratory_experience',
    category: 'industry_specific',
    question: 'Do you have laboratory experience?',
    type: 'multiselect',
    options: [
      'Clinical lab work',
      'Research lab',
      'Quality control testing',
      'Lab equipment operation',
      'Sample preparation',
      'Data analysis',
      'Lab safety protocols',
      'Instrument calibration',
      'Lab management',
      'Technical writing'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'sales_marketing_experience',
    category: 'industry_specific',
    question: 'Rate your sales and marketing experience',
    type: 'experience_matrix',
    matrix: {
      items: ['B2B sales', 'B2C sales', 'Digital marketing', 'Content marketing', 'SEO/SEM', 'Social media marketing', 'Email marketing', 'Lead generation', 'CRM systems', 'Market research'],
      scale: { min: 0, max: 4, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'customer_service_skills',
    category: 'industry_specific',
    question: 'Rate your customer service experience',
    type: 'experience_matrix',
    matrix: {
      items: ['Phone support', 'Email support', 'Live chat', 'In-person service', 'Complaint resolution', 'Technical support', 'Upselling', 'Customer retention', 'CRM usage', 'Service metrics'],
      scale: { min: 0, max: 4, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },

  // ===== SOFT SKILLS & PERSONAL ATTRIBUTES (161-185) =====
  {
    id: 'communication_skills',
    category: 'soft_skills',
    question: 'Rate your communication abilities',
    type: 'skill_matrix',
    matrix: {
      items: ['Written communication', 'Verbal communication', 'Presentation skills', 'Active listening', 'Interpersonal skills', 'Cross-cultural communication'],
      scale: { min: 1, max: 5, labels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'] }
    },
    required: false
  },
  {
    id: 'leadership_skills',
    category: 'soft_skills',
    question: 'Rate your leadership abilities',
    type: 'skill_matrix',
    matrix: {
      items: ['Team leadership', 'Decision making', 'Delegation', 'Motivation', 'Conflict resolution', 'Strategic thinking'],
      scale: { min: 1, max: 5, labels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'] }
    },
    required: false
  },
  {
    id: 'problem_solving_skills',
    category: 'soft_skills',
    question: 'Rate your problem-solving abilities',
    type: 'skill_matrix',
    matrix: {
      items: ['Analytical thinking', 'Creative problem solving', 'Critical thinking', 'Research skills', 'Troubleshooting', 'Innovation'],
      scale: { min: 1, max: 5, labels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'] }
    },
    required: false
  },
  {
    id: 'work_style_preferences',
    category: 'soft_skills',
    question: 'What describes your work style?',
    type: 'multiselect',
    options: [
      'Detail-oriented',
      'Big picture thinker',
      'Collaborative',
      'Independent worker',
      'Fast-paced',
      'Methodical',
      'Creative',
      'Analytical',
      'Results-driven',
      'Process-oriented',
      'Flexible',
      'Structured'
    ],
    required: false
  },
  {
    id: 'personality_traits',
    category: 'soft_skills',
    question: 'What personality traits best describe you?',
    type: 'multiselect',
    options: [
      'Adaptable',
      'Ambitious',
      'Confident',
      'Dependable',
      'Empathetic',
      'Enthusiastic',
      'Honest',
      'Patient',
      'Persistent',
      'Positive',
      'Proactive',
      'Reliable',
      'Resilient',
      'Self-motivated'
    ],
    required: false
  },
  {
    id: 'time_management',
    category: 'soft_skills',
    question: 'How do you manage your time and priorities?',
    type: 'multiselect',
    options: [
      'To-do lists',
      'Calendar blocking',
      'Priority matrices',
      'Project management tools',
      'Time tracking',
      'Delegation',
      'Automation',
      'Batch processing',
      'Pomodoro technique',
      'GTD methodology'
    ],
    required: false
  },
  {
    id: 'stress_management',
    category: 'soft_skills',
    question: 'How do you handle stress and pressure?',
    type: 'multiselect',
    options: [
      'Exercise/physical activity',
      'Meditation/mindfulness',
      'Time management',
      'Seeking support',
      'Problem-solving',
      'Deep breathing',
      'Work-life balance',
      'Positive self-talk',
      'Breaking tasks down',
      'Taking breaks'
    ],
    required: false
  },
  {
    id: 'learning_style',
    category: 'soft_skills',
    question: 'How do you prefer to learn new things?',
    type: 'multiselect',
    options: [
      'Hands-on practice',
      'Reading documentation',
      'Video tutorials',
      'Formal training',
      'Mentoring',
      'Trial and error',
      'Group discussions',
      'Online courses',
      'Workshops/seminars',
      'Peer learning'
    ],
    required: false
  },
  {
    id: 'conflict_resolution',
    category: 'soft_skills',
    question: 'How do you approach conflict resolution?',
    type: 'textarea',
    required: false,
    placeholder: 'Describe your approach to resolving workplace conflicts'
  },
  {
    id: 'teamwork_examples',
    category: 'soft_skills',
    question: 'Provide examples of successful teamwork',
    type: 'textarea',
    required: false,
    placeholder: 'Describe situations where you collaborated effectively with others'
  },
  {
    id: 'adaptability_examples',
    category: 'soft_skills',
    question: 'Describe a time you had to adapt to significant change',
    type: 'textarea',
    required: false,
    placeholder: 'How you handled change, new processes, or unexpected situations'
  },
  {
    id: 'leadership_examples',
    category: 'soft_skills',
    question: 'Provide examples of leadership or taking initiative',
    type: 'textarea',
    required: false,
    placeholder: 'Times you led a project, team, or took charge of a situation'
  },
  {
    id: 'cultural_awareness',
    category: 'soft_skills',
    question: 'How would you rate your cultural awareness and diversity experience?',
    type: 'skill_matrix',
    matrix: {
      items: ['Cross-cultural communication', 'Working with diverse teams', 'International experience', 'Language skills', 'Cultural sensitivity', 'Inclusive practices'],
      scale: { min: 1, max: 5, labels: ['Limited', 'Basic', 'Moderate', 'Strong', 'Extensive'] }
    },
    required: false
  },
  {
    id: 'emotional_intelligence',
    category: 'soft_skills',
    question: 'Rate your emotional intelligence abilities',
    type: 'skill_matrix',
    matrix: {
      items: ['Self-awareness', 'Self-regulation', 'Empathy', 'Social skills', 'Motivation', 'Relationship management'],
      scale: { min: 1, max: 5, labels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'] }
    },
    required: false
  },
  {
    id: 'networking_skills',
    category: 'soft_skills',
    question: 'How do you approach professional networking?',
    type: 'multiselect',
    options: [
      'Industry events',
      'LinkedIn connections',
      'Professional associations',
      'Alumni networks',
      'Conferences',
      'Meetups',
      'Online communities',
      'Mentorship programs',
      'Volunteer work',
      'Social events'
    ],
    required: false
  },

  // ===== CAREER GOALS & PREFERENCES (186-200) =====
  {
    id: 'career_goals',
    category: 'career_goals',
    question: 'What are your short-term career goals (1-2 years)?',
    type: 'textarea',
    required: false,
    placeholder: 'Describe what you want to achieve in the next 1-2 years'
  },
  {
    id: 'long_term_goals',
    category: 'career_goals',
    question: 'What are your long-term career goals (5-10 years)?',
    type: 'textarea',
    required: false,
    placeholder: 'Describe your long-term career aspirations'
  },
  {
    id: 'ideal_role',
    category: 'career_goals',
    question: 'Describe your ideal job or role',
    type: 'textarea',
    required: false,
    placeholder: 'What would your perfect job look like?'
  },
  {
    id: 'company_culture_preferences',
    category: 'career_goals',
    question: 'What type of company culture do you prefer?',
    type: 'multiselect',
    options: [
      'Collaborative',
      'Competitive',
      'Innovative',
      'Traditional',
      'Fast-paced',
      'Relaxed',
      'Data-driven',
      'Creative',
      'Hierarchical',
      'Flat organization',
      'Family-friendly',
      'Diverse & inclusive'
    ],
    required: false
  },
  {
    id: 'work_environment_preferences',
    category: 'career_goals',
    question: 'What work environment do you prefer?',
    type: 'multiselect',
    options: [
      'Open office',
      'Private office',
      'Co-working space',
      'Home office',
      'Hybrid workspace',
      'Outdoor work',
      'Travel required',
      'Client sites',
      'Laboratory',
      'Warehouse/factory'
    ],
    required: false
  },
  {
    id: 'job_security_vs_growth',
    category: 'career_goals',
    question: 'How important is job security vs. growth opportunities?',
    type: 'single_select',
    options: [
      'Prefer job security',
      'Slightly prefer security',
      'Balanced approach',
      'Slightly prefer growth',
      'Prefer growth opportunities'
    ],
    required: false
  },
  {
    id: 'work_life_balance_importance',
    category: 'career_goals',
    question: 'How important is work-life balance to you?',
    type: 'single_select',
    options: [
      'Not important',
      'Somewhat important',
      'Important',
      'Very important',
      'Extremely important'
    ],
    required: false
  },
  {
    id: 'professional_development_interests',
    category: 'career_goals',
    question: 'What areas would you like to develop professionally?',
    type: 'multiselect',
    options: [
      'Technical skills',
      'Leadership abilities',
      'Communication skills',
      'Project management',
      'Industry knowledge',
      'Certifications',
      'Advanced degree',
      'Entrepreneurship',
      'Public speaking',
      'International experience'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'mentorship_interests',
    category: 'career_goals',
    question: 'Are you interested in mentoring or being mentored?',
    type: 'multiselect',
    options: [
      'Being mentored',
      'Mentoring others',
      'Peer mentoring',
      'Reverse mentoring',
      'Group mentoring',
      'Not interested in mentoring'
    ],
    required: false
  },
  {
    id: 'industry_change_interest',
    category: 'career_goals',
    question: 'Are you open to changing industries?',
    type: 'single_select',
    options: [
      'No, want to stay in current industry',
      'Open to related industries',
      'Open to any industry',
      'Actively seeking industry change',
      'Undecided'
    ],
    required: false
  },
  {
    id: 'entrepreneurial_interests',
    category: 'career_goals',
    question: 'Do you have entrepreneurial interests?',
    type: 'multiselect',
    options: [
      'Starting own business',
      'Joining early-stage startup',
      'Franchise ownership',
      'Consulting/freelancing',
      'Side business',
      'Investment opportunities',
      'No entrepreneurial interests'
    ],
    required: false
  },
  {
    id: 'values_priorities',
    category: 'career_goals',
    question: 'What values are most important to you in work?',
    type: 'multiselect',
    options: [
      'Making a difference',
      'Financial success',
      'Work-life balance',
      'Creativity',
      'Stability',
      'Recognition',
      'Autonomy',
      'Collaboration',
      'Learning',
      'Innovation',
      'Helping others',
      'Environmental impact'
    ],
    required: false
  },
  {
    id: 'deal_breakers',
    category: 'career_goals',
    question: 'What are absolute deal-breakers in a job?',
    type: 'multiselect',
    options: [
      'Long commute',
      'Extensive travel',
      'Poor work-life balance',
      'Toxic culture',
      'Limited growth',
      'Low compensation',
      'Unethical practices',
      'Micromanagement',
      'No remote work',
      'Boring work'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'success_definition',
    category: 'career_goals',
    question: 'How do you define career success?',
    type: 'textarea',
    required: false,
    placeholder: 'What does success mean to you personally and professionally?'
  },
  {
    id: 'unique_value_proposition',
    category: 'career_goals',
    question: 'What makes you unique as a candidate?',
    type: 'textarea',
    required: false,
    placeholder: 'What unique combination of skills, experiences, or perspectives do you bring?'
  }
];
