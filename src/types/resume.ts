export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements?: string[];
}

export interface Education {
  degree: string;
  fieldOfStudy?: string;
  institution: string;
  graduationYear: string;
  gpa?: string;
  honors?: string[];
}

export interface Skills {
  technical?: string[];
  soft?: string[];
  languages?: string[];
  certifications?: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  projects: Project[];
  matchScore?: number;
}

export interface Resume {
  id: string;
  title: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  createdAt: string;
  updatedAt: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  premium: boolean;
}
