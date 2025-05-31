export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  subcategories: string[];
}

export interface DetailedSkill {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  experience: string; // в годах или проектах
  examples: string[]; // конкретные примеры использования
  keywords: string[]; // синонимы и связанные термины
  relevantFor: string[]; // типы вакансий, для которых релевантен
}

export interface ProfileQuestion {
  id: string;
  category: string;
  question: string;
  type: 'text' | 'multiselect' | 'scale' | 'textarea' | 'boolean' | 'skill_matrix' | 'experience_matrix' | 'range' | 'single_select';
  options?: string[];
  required: boolean;
  followUp?: string[]; // дополнительные вопросы на основе ответа
  allowOther?: boolean; // разрешить ввод "другой" опции
  additionalField?: {
    label: string;
    type: 'text' | 'textarea';
    placeholder?: string;
  };
  scale?: {
    min: number;
    max: number;
    minLabel?: string;
    maxLabel?: string;
    step?: number;
  };
  matrix?: {
    rows: string[];
    columns: string[];
    type: 'rating' | 'checkbox' | 'experience';
  };
  placeholder?: string;
  helpText?: string;
}

export interface UserProfile {
  id: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    preferredLocations: string[];
    languages: Array<{language: string; level: string}>;
    socialLinks: {
      linkedin?: string;
      github?: string;
      portfolio?: string;
      other?: Array<{name: string; url: string}>;
    };
  };
  
  workPreferences: {
    jobTypes: string[]; // full-time, part-time, contract, internship
    industries: string[];
    workEnvironments: string[]; // remote, office, hybrid
    salaryRange: {min: number; max: number; currency: string};
    availability: string;
  };

  detailedSkills: DetailedSkill[];
  
  experiences: Array<{
    id: string;
    type: 'work' | 'education' | 'project' | 'volunteer' | 'certification';
    title: string;
    organization: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
    skillsUsed: string[];
    relevantFor: string[];
  }>;

  personalQualities: Array<{
    trait: string;
    examples: string[];
    relevantFor: string[];
  }>;

  questionsAnswered: Array<{
    questionId: string;
    answer: unknown;
    timestamp: string;
  }>;

  completionStatus: {
    profileCompleted: boolean;
    skillsAssessed: boolean;
    experiencesAdded: boolean;
    personalitiesAssessed: boolean;
    percentComplete: number;
  };
}

export interface JobAnalysis {
  id: string;
  jobTitle: string;
  company: string;
  jobDescription: string;
  requirements: string[];
  preferredSkills: string[];
  jobType: string;
  location: string;
  salaryRange?: string;
  
  analysis: {
    matchingSkills: string[];
    missingSkills: string[];
    relevantExperiences: string[];
    keywordMatches: Array<{keyword: string; importance: number}>;
    overallMatchScore: number;
    recommendations: string[];
  };
  
  generatedResume?: {
    selectedSkills: DetailedSkill[];
    selectedExperiences: unknown[];
    customSummary: string;
    coverLetter: string;
  };
  
  createdAt: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  suitableFor: string[]; // типы вакансий
  layout: 'modern' | 'classic' | 'creative' | 'minimal' | 'tech';
  sections: string[];
  premium: boolean;
}

export interface ProfileData {
  [questionId: string]: unknown;
}
