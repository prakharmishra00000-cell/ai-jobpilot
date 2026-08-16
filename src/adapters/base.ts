import { RawJob, JobPreferences } from '@/types';

export interface JobSearchQuery {
  role?: string;
  location?: string;
  workMode?: string;
  employmentType?: string;
  experienceLevel?: string;
  technologies?: string[];
  limit?: number;
}

export interface JobSourceAdapter {
  sourceName: string;
  adapterType: 'api' | 'feed' | 'assisted';
  mode: 'AUTONOMOUS' | 'ASSISTED';
  isConfigured(): boolean;
  searchJobs(query: JobSearchQuery): Promise<RawJob[]>;
  getJobDetails(jobId: string): Promise<RawJob | null>;
  getOriginalUrl(job: RawJob): string;
  checkHealth(): Promise<{ status: 'HEALTHY' | 'DEGRADED' | 'UNAVAILABLE'; message?: string }>;
}
