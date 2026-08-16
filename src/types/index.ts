// Core TypeScript Interfaces for JobPilot AI

export interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  resumeUrl?: string;
}

export interface EducationItem {
  degree: string;
  university: string;
  graduationYear?: string;
  relevantCoursework?: string[];
}

export interface CategorizedSkills {
  programmingLanguages: string[];
  frameworks: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  cloud: string[];
  aiMl: string[];
  apis: string[];
  automation: string[];
  devops: string[];
  tools: string[];
  softSkills: string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
  role?: string;
  complexity?: 'High' | 'Medium' | 'Standard';
  achievements?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  achievements: string[];
}

export interface PortfolioAnalysisResult {
  portfolioScore: number; // 0-100
  categories: {
    frontend: number;
    backend: number;
    aiIntegration: number;
    uiUx: number;
    projects: number;
    presentation: number;
    recruiterReadiness: number;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface CandidateProfileData {
  id?: string;
  personalInfo: PersonalInfo;
  education: EducationItem[];
  skills: CategorizedSkills;
  projects: ProjectItem[];
  experience: ExperienceItem[];
  certifications?: string[];
  careerDirection?: {
    targetRoles: string[];
    summary: string;
  };
  portfolioAnalysis?: PortfolioAnalysisResult;
  preferences: JobPreferences;
}

export interface JobPreferences {
  targetRoles: string[];
  preferredLocations: string[];
  workModes: ('Remote' | 'Hybrid' | 'On-site')[];
  employmentTypes: ('Full-time' | 'Internship' | 'Freelance' | 'Contract')[];
  minSalary: string;
  experienceLevel: string;
  technologies: string[];
  industries: string[];
}

export interface RawJob {
  id: string;
  source: string;
  sourceId?: string;
  externalJobId: string;
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  salaryRange?: string;
  experienceRequired?: string;
  employmentType?: string;
  description: string;
  requirements: string[];
  preferredSkills?: string[];
  benefits?: string[];
  applicationUrl: string;
  originalUrl: string;
  applicationMethod: 'DIRECT_API' | 'ASSISTED' | 'REDIRECT';
  postedAt: string;
  safetyScore?: number;
}

export interface FitScoreBreakdown {
  skillsMatch: number;      // 30%
  experienceMatch: number;  // 15%
  educationMatch: number;   // 10%
  projectRelevance: number; // 15%
  locationMatch: number;    // 5%
  technologyMatch: number;  // 10%
  roleMatch: number;        // 10%
  salaryMatch: number;      // 5%
}

export interface JobFitResult {
  jobId: string;
  fitScore: number;          // 0-100
  shortlistProbability: number; // 0-100
  confidence: 'High' | 'Medium' | 'Low';
  category: '🔥 Apply Immediately' | '🟢 Strong Match' | '🟡 Possible Match' | '🔴 Low Match';
  strengths: string[];
  missingRequirements: string[];
  skillBreakdown: {
    matched: string[];
    missing: string[];
  };
  explanation: string;
  breakdown: FitScoreBreakdown;
}

export interface SearchFilters {
  role?: string;
  query?: string;
  location?: string;
  workMode?: string;
  employmentType?: string;
  minFitScore?: number;
  source?: string;
  minSalary?: string;
  sortBy?: 'fitScore' | 'postedAt' | 'shortlistProb';
}

export interface AppNotification {
  id: string;
  type: 'JOB_DISCOVERED' | 'APPLICATION_SUBMITTED' | 'RESPONSE_RECEIVED' | 'ACTION_REQUIRED' | 'SYSTEM';
  title: string;
  message: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}
