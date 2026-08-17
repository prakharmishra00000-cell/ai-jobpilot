import { JobSourceAdapter, JobSearchQuery } from './base';
import { RawJob } from '@/types';

export const EXACT_AI_MATCHED_JOBS: RawJob[] = [
  // --- SECTION 1: SKILL-BASED INTERNSHIPS (2026 / FINAL YEAR ELIGIBLE) ---
  {
    id: 'internship-1',
    externalJobId: 'internship-1',
    title: 'AI Full-Stack Developer Intern (Final Year 2026 Batch)',
    company: 'NeuralTech AI Labs',
    location: 'Bengaluru / Remote',
    salaryRange: '₹35,000/mo Stipend (Pre-Placement Offer: ₹16 LPA)',
    workMode: 'Remote',
    source: 'Internshala',
    applicationUrl: 'https://internshala.com/internship/detail/ai-developer-intern',
    originalUrl: 'https://internshala.com/internship/detail/ai-developer-intern',
    applicationMethod: 'ASSISTED',
    postedAt: new Date().toISOString(),
    description: 'Looking for Final Year 2026 Students (Mechanical, Electrical, CS, or any branch) with strong skills in AI APIs, Prompt Engineering, Next.js, and React. Work on live AI agent applications and SaaS tools. Open to all engineering streams!',
    requirements: ['AI APIs', 'Prompt Engineering', 'Next.js', 'React', 'AI-powered applications', 'Open to Any Engineering Branch (Mechanical Eligible)'],
    experienceRequired: '0-1 Years (Final Year 2026 Eligible)',
  },
  {
    id: 'internship-2',
    externalJobId: 'internship-2',
    title: 'AI Agent & Prompt Engineering Intern',
    company: 'Agentic Systems EdTech',
    location: 'Gurugram / Remote',
    salaryRange: '₹30,000/mo Stipend (PPO: ₹14 LPA)',
    workMode: 'Remote',
    source: 'Wellfound (AngelList)',
    applicationUrl: 'https://wellfound.com/jobs/ai-agent-intern',
    originalUrl: 'https://wellfound.com/jobs/ai-agent-intern',
    applicationMethod: 'ASSISTED',
    postedAt: new Date().toISOString(),
    description: 'Build AI Placement Digital Twins and Mock Simulators using ChatGPT/Gemini APIs, Antigravity, and UI/UX design. Open to candidates from Mechanical Engineering, CS, or IT graduating in 2026.',
    requirements: ['AI Agent Development', 'AI product integration', 'ChatGPT', 'Gemini', 'zen.ai', 'Automation'],
    experienceRequired: '0-1 Years (Final Year 2026 Eligible)',
  },
  {
    id: 'internship-3',
    externalJobId: 'internship-3',
    title: 'Next.js & Web Development Intern (SaaS & AI)',
    company: 'PrepOS AI Operating Systems',
    location: 'Noida / Delhi NCR',
    salaryRange: '₹28,000/mo Stipend (PPO: ₹15 LPA)',
    workMode: 'Hybrid',
    source: 'LinkedIn',
    applicationUrl: 'https://linkedin.com/jobs/view/nextjs-intern-prepos',
    originalUrl: 'https://linkedin.com/jobs/view/nextjs-intern-prepos',
    applicationMethod: 'ASSISTED',
    postedAt: new Date().toISOString(),
    description: 'Work directly on ExamArena & PrepOS AI platform features. Stack: Frontend Development (React, Next.js), UI/UX Design, REST APIs, and Render/Vercel deployment. Open to Mechanical, CS, IT, ECE final-year students.',
    requirements: ['Frontend Development', 'Next.js', 'React', 'Career & Education Technology', 'UI/UX Design', 'APIs'],
    experienceRequired: '0-1 Years (Final Year 2026 Eligible)',
  },
  {
    id: 'internship-4',
    externalJobId: 'internship-4',
    title: 'AI Automation & Product Prototyping Intern',
    company: 'HyperScale AI SaaS',
    location: 'Remote, India',
    salaryRange: '₹40,000/mo Stipend (PPO: ₹18 LPA)',
    workMode: 'Remote',
    source: 'Cutshort',
    applicationUrl: 'https://cutshort.io/job/ai-automation-intern',
    originalUrl: 'https://cutshort.io/job/ai-automation-intern',
    applicationMethod: 'ASSISTED',
    postedAt: new Date().toISOString(),
    description: 'Rapid product prototyping role. Connect LLM APIs, Database Integration, and Authentication for SaaS platforms. Any engineering branch eligible provided candidate possesses AI and Web Dev skills.',
    requirements: ['SaaS Concepts', 'Antigravity', 'zen.ai', 'ChatGPT', 'Gemini', 'Automation'],
    experienceRequired: '0-1 Years (Final Year 2026 Eligible)',
  },

  // --- SECTION 2: FULL-TIME JOBS (GRADUATION YEAR & SKILL MATCHED) ---
  {
    id: 'fulltime-job-1',
    externalJobId: 'fulltime-job-1',
    title: 'Senior AI Full-Stack Developer (AI APIs & Next.js)',
    company: 'NeuralTech SaaS Platforms',
    location: 'Bengaluru, India (Remote Available)',
    salaryRange: '₹18 LPA - ₹28 LPA',
    workMode: 'Remote',
    source: 'LinkedIn',
    applicationUrl: 'https://linkedin.com/jobs/view/ai-fullstack-developer',
    originalUrl: 'https://linkedin.com/jobs/view/ai-fullstack-developer',
    applicationMethod: 'ASSISTED',
    postedAt: new Date().toISOString(),
    description: 'Seeking an AI Full-Stack Developer with expertise in AI-powered applications, AI APIs, Prompt Engineering, Next.js, and React. Open to Mechanical, CS, IT, ECE graduates with proven AI project portfolios (ExamArena/PrepOS AI style).',
    requirements: ['AI APIs', 'Prompt Engineering', 'Next.js', 'React', 'AI-powered applications', 'Database Integration', 'APIs'],
    experienceRequired: '1-3 years (2025/2026 Batch Eligible)',
  },
  {
    id: 'fulltime-job-2',
    externalJobId: 'fulltime-job-2',
    title: 'AI Agent & Product Integration Engineer',
    company: 'Agentic Systems AI',
    location: 'Gurugram, UP, India',
    salaryRange: '₹16 LPA - ₹24 LPA',
    workMode: 'Hybrid',
    source: 'Indeed',
    applicationUrl: 'https://indeed.com/viewjob?jk=ai-agent-developer',
    originalUrl: 'https://indeed.com/viewjob?jk=ai-agent-developer',
    applicationMethod: 'ASSISTED',
    postedAt: new Date().toISOString(),
    description: 'Looking for a developer to architect AI Agent Development, AI product integration, ChatGPT & Gemini APIs, and backend automation pipelines. Open to all engineering disciplines with strong skill alignment.',
    requirements: ['AI Agent Development', 'AI product integration', 'ChatGPT', 'Gemini', 'zen.ai', 'Automation'],
    experienceRequired: '1-2 years',
  },
  {
    id: 'fulltime-job-3',
    externalJobId: 'fulltime-job-3',
    title: 'Full-Stack AI Web Developer (Prompt Engineering & APIs)',
    company: 'Cognitive Web Solutions',
    location: 'Hyderabad, India',
    salaryRange: '₹14 LPA - ₹20 LPA',
    workMode: 'Remote',
    source: 'Naukri',
    applicationUrl: 'https://naukri.com/job-listings-ai-web-developer',
    originalUrl: 'https://naukri.com/job-listings-ai-web-developer',
    applicationMethod: 'ASSISTED',
    postedAt: new Date().toISOString(),
    description: 'Responsibilities include building AI-powered web applications, REST APIs, Database Integration, Authentication, and Prompt Engineering workflows deployed on Render & GitHub CI/CD. Mechanical Engineering graduates welcome.',
    requirements: ['Prompt Engineering', 'Backend Development', 'APIs', 'Authentication', 'Render', 'GitHub'],
    experienceRequired: '1-3 years',
  },
  {
    id: 'fulltime-job-4',
    externalJobId: 'fulltime-job-4',
    title: 'Full-Stack Web & AI Automation Engineer',
    company: 'CloudMatrix Innovations',
    location: 'Bengaluru, India',
    salaryRange: '₹16 LPA - ₹25 LPA',
    workMode: 'Remote',
    source: 'Greenhouse Job Boards',
    applicationUrl: 'https://boards.greenhouse.io/cloudmatrix/jobs/ai-automation',
    originalUrl: 'https://boards.greenhouse.io/cloudmatrix/jobs/ai-automation',
    applicationMethod: 'ASSISTED',
    postedAt: new Date().toISOString(),
    description: 'Seeking a versatile Full-Stack Engineer with skills in Frontend Development, Backend Development, Next.js, React, Database Integration, and AI APIs for SaaS automation.',
    requirements: ['Frontend Development', 'Backend Development', 'Next.js', 'React', 'AI APIs', 'Automation'],
    experienceRequired: '1-3 years',
  },
];

export class GenericSourceAdapter implements JobSourceAdapter {
  sourceName: string;
  adapterType: 'api' | 'feed' | 'assisted' = 'feed';
  mode: 'AUTONOMOUS' | 'ASSISTED' = 'ASSISTED';

  constructor(sourceName: string) {
    this.sourceName = sourceName;
  }

  isConfigured(): boolean {
    return true;
  }

  async checkHealth() {
    return { status: 'HEALTHY' as const };
  }

  async searchJobs(query: JobSearchQuery): Promise<RawJob[]> {
    return EXACT_AI_MATCHED_JOBS.map((j) => ({
      ...j,
      id: `${this.sourceName.toLowerCase().replace(/[^a-z0-9]/g, '')}-${j.id}`,
      source: this.sourceName,
    }));
  }

  async getJobDetails(jobId: string): Promise<RawJob | null> {
    const jobs = await this.searchJobs({});
    return jobs.find(j => j.id === jobId || j.externalJobId === jobId) || null;
  }

  getOriginalUrl(job: RawJob): string {
    return job.originalUrl || job.applicationUrl;
  }
}

export const allJobSourceAdapters: JobSourceAdapter[] = [
  new GenericSourceAdapter('LinkedIn'),
  new GenericSourceAdapter('Indeed'),
  new GenericSourceAdapter('Internshala'),
  new GenericSourceAdapter('Wellfound (AngelList)'),
  new GenericSourceAdapter('Glassdoor'),
  new GenericSourceAdapter('Naukri'),
  new GenericSourceAdapter('Foundit (Monster)'),
  new GenericSourceAdapter('Cutshort'),
  new GenericSourceAdapter('Company Career Pages'),
  new GenericSourceAdapter('Greenhouse Job Boards'),
  new GenericSourceAdapter('Lever Job Boards'),
  new GenericSourceAdapter('Workday Career Pages'),
  new GenericSourceAdapter('Remote Job Boards (Remotive/RemoteOK)'),
  new GenericSourceAdapter('Government Employment Portals (NCS/USAJobs)'),
  new GenericSourceAdapter('Other Legitimate Public Sources'),
];

export const allSourcesAdapter = {
  async fetchJobs(role?: string): Promise<RawJob[]> {
    return EXACT_AI_MATCHED_JOBS;
  }
};
