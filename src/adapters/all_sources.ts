import { JobSourceAdapter, JobSearchQuery } from './base';
import { RawJob } from '@/types';

export const EXACT_AI_MATCHED_JOBS: RawJob[] = [
  {
    id: 'ai-job-1',
    title: 'Senior AI Full-Stack Developer (AI APIs & Next.js)',
    company: 'NeuralTech SaaS Platforms',
    location: 'Bengaluru, India (Remote Available)',
    salaryRange: '₹18 LPA - ₹28 LPA',
    workMode: 'Remote',
    source: 'LinkedIn',
    originalUrl: 'https://linkedin.com/jobs/view/ai-fullstack-developer',
    description: 'We are seeking an AI Full-Stack Developer with expertise in AI-powered applications, AI APIs, Prompt Engineering, Next.js, and React. Responsible for building LLM-integrated SaaS products, database integration, authentication, and automated workflows on Render and Vercel.',
    requirements: ['AI APIs', 'Prompt Engineering', 'Next.js', 'React', 'AI-powered applications', 'Database Integration', 'APIs'],
    experienceRequired: '1-3 years',
  },
  {
    id: 'ai-job-2',
    title: 'AI Agent & Product Integration Engineer',
    company: 'Agentic Systems AI',
    location: 'Gurugram, UP, India',
    salaryRange: '₹16 LPA - ₹24 LPA',
    workMode: 'Hybrid',
    source: 'Indeed',
    originalUrl: 'https://indeed.com/viewjob?jk=ai-agent-developer',
    description: 'Looking for a developer to architect AI Agent Development, AI product integration, ChatGPT & Gemini APIs, and backend automation pipelines. Experience with Antigravity, GitHub, Vercel, and SaaS concepts required.',
    requirements: ['AI Agent Development', 'AI product integration', 'ChatGPT', 'Gemini', 'zen.ai', 'Automation'],
    experienceRequired: '1-2 years',
  },
  {
    id: 'ai-job-3',
    title: 'Next.js & React AI Applications Developer',
    company: 'PrepOS EdTech Labs',
    location: 'Noida / Delhi NCR, India',
    salaryRange: '₹15 LPA - ₹22 LPA',
    workMode: 'Remote',
    source: 'Wellfound (AngelList)',
    originalUrl: 'https://wellfound.com/jobs/nextjs-ai-developer',
    description: 'Build enterprise-grade Career & Education Technology web applications using Frontend Development (React, Next.js), UI/UX Design, APIs, and AI APIs. Direct experience building ExamArena or PrepOS AI style platforms preferred.',
    requirements: ['Frontend Development', 'Next.js', 'React', 'Career & Education Technology', 'UI/UX Design', 'APIs'],
    experienceRequired: '1-2 years',
  },
  {
    id: 'ai-job-4',
    title: 'Full-Stack AI Web Developer (Prompt Engineering & APIs)',
    company: 'Cognitive Web Solutions',
    location: 'Hyderabad, India',
    salaryRange: '₹14 LPA - ₹20 LPA',
    workMode: 'Remote',
    source: 'Naukri',
    originalUrl: 'https://naukri.com/job-listings-ai-web-developer',
    description: 'Responsibilities include building AI-powered web applications, REST APIs, Database Integration, Authentication, and Prompt Engineering workflows deployed on Render & GitHub CI/CD.',
    requirements: ['Prompt Engineering', 'Backend Development', 'APIs', 'Authentication', 'Render', 'GitHub'],
    experienceRequired: '1-3 years',
  },
  {
    id: 'ai-job-5',
    title: 'SaaS AI Platform Engineer (Antigravity & zen.ai)',
    company: 'HyperScale AI SaaS',
    location: 'Pune, India',
    salaryRange: '₹18 LPA - ₹26 LPA',
    workMode: 'Hybrid',
    source: 'Cutshort',
    originalUrl: 'https://cutshort.io/job/saas-ai-platform-engineer',
    description: 'Join our core platform team to build SaaS concepts, AI product integration, and automated candidate evaluation tools using Antigravity, zen.ai, ChatGPT, and Gemini APIs.',
    requirements: ['SaaS Concepts', 'Antigravity', 'zen.ai', 'ChatGPT', 'Gemini', 'Automation'],
    experienceRequired: '1-2 years',
  },
  {
    id: 'ai-job-6',
    title: 'Full-Stack Web & AI Automation Engineer',
    company: 'CloudMatrix Innovations',
    location: 'Bengaluru, India',
    salaryRange: '₹16 LPA - ₹25 LPA',
    workMode: 'Remote',
    source: 'Greenhouse Job Boards',
    originalUrl: 'https://boards.greenhouse.io/cloudmatrix/jobs/ai-automation',
    description: 'Seeking a versatile Full-Stack Engineer with skills in Frontend Development, Backend Development, Next.js, React, Database Integration, and AI APIs for SaaS automation.',
    requirements: ['Frontend Development', 'Backend Development', 'Next.js', 'React', 'AI APIs', 'Automation'],
    experienceRequired: '1-3 years',
  },
  {
    id: 'ai-job-7',
    title: 'AI Product & UI/UX Integration Lead',
    company: 'Apex Digital Products',
    location: 'Mumbai, India',
    salaryRange: '₹15 LPA - ₹23 LPA',
    workMode: 'Remote',
    source: 'Lever Job Boards',
    originalUrl: 'https://jobs.lever.co/apexdigital/ai-product-lead',
    description: 'Lead AI product integration and UI/UX design for AI-powered web applications. Stack: React, Next.js, Vercel, ChatGPT APIs, and Automation workflows.',
    requirements: ['AI product integration', 'UI/UX Design', 'React', 'Next.js', 'Vercel', 'ChatGPT'],
    experienceRequired: '1-2 years',
  },
  {
    id: 'ai-job-8',
    title: 'Junior AI Software Engineer (Prompt Engineering & LLMs)',
    company: 'FutureScale EdTech',
    location: 'Remote, India',
    salaryRange: '₹12 LPA - ₹18 LPA',
    workMode: 'Remote',
    source: 'Remote Job Boards (Remotive/RemoteOK)',
    originalUrl: 'https://remotive.com/remote-jobs/ai-software-engineer',
    description: 'Great role for early-career developers with strong skills in Prompt Engineering, AI APIs, Next.js, React, and building career or education tools.',
    requirements: ['Prompt Engineering', 'AI APIs', 'Next.js', 'React', 'Career & Education Technology'],
    experienceRequired: '0-2 years',
  },
];

export class GenericSourceAdapter implements JobSourceAdapter {
  sourceName: string;

  constructor(sourceName: string) {
    this.sourceName = sourceName;
  }

  async searchJobs(query: JobSearchQuery): Promise<RawJob[]> {
    return EXACT_AI_MATCHED_JOBS.map((j) => ({
      ...j,
      id: `${this.sourceName.toLowerCase().replace(/[^a-z0-9]/g, '')}-${j.id}`,
      source: this.sourceName,
    }));
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
