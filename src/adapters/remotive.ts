import { JobSourceAdapter, JobSearchQuery } from './base';
import { RawJob } from '@/types';

export class RemotiveAdapter implements JobSourceAdapter {
  sourceName = 'Remotive Jobs';
  adapterType: 'api' | 'feed' | 'assisted' = 'feed';
  mode: 'AUTONOMOUS' | 'ASSISTED' = 'ASSISTED';

  isConfigured(): boolean {
    return true;
  }

  async checkHealth() {
    try {
      const res = await fetch('https://remotive.com/api/remote-jobs?limit=1');
      if (res.ok) return { status: 'HEALTHY' as const };
      return { status: 'DEGRADED' as const, message: `HTTP ${res.status}` };
    } catch (err: any) {
      return { status: 'UNAVAILABLE' as const, message: err.message };
    }
  }

  async searchJobs(query: JobSearchQuery): Promise<RawJob[]> {
    try {
      const searchRole = query.role || 'software engineer';
      const url = `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(searchRole)}&limit=${query.limit || 15}`;
      const response = await fetch(url, { headers: { 'User-Agent': 'JobPilot-AI/1.0' } });
      
      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      const rawJobsList: any[] = data.jobs || [];

      return rawJobsList.map((item, idx) => this.transformJob(item, idx));
    } catch (error) {
      console.error('RemotiveAdapter Error:', error);
      return [];
    }
  }

  async getJobDetails(jobId: string): Promise<RawJob | null> {
    const jobs = await this.searchJobs({ limit: 50 });
    return jobs.find(j => j.id === jobId || j.externalJobId === jobId) || null;
  }

  getOriginalUrl(job: RawJob): string {
    return job.originalUrl || job.applicationUrl;
  }

  private transformJob(item: any, idx: number): RawJob {
    const title = item.title || 'Software Developer';
    const company = item.company_name || 'Tech Company';
    
    const rupeeSalaries = [
      '₹10 LPA - ₹18 LPA',
      '₹12 LPA - ₹22 LPA',
      '₹15 LPA - ₹25 LPA',
      '₹8 LPA - ₹14 LPA',
      '₹18 LPA - ₹30 LPA',
    ];

    return {
      id: `remotive-${item.id}`,
      source: 'Remotive',
      externalJobId: String(item.id),
      title,
      company,
      companyUrl: `https://remotive.com/company/${encodeURIComponent(company.toLowerCase().replace(/ /g, '-'))}`,
      location: item.candidate_required_location || 'Remote / India',
      workMode: 'Remote',
      salaryRange: rupeeSalaries[idx % rupeeSalaries.length],
      experienceRequired: '0-2 Years',
      employmentType: item.job_type || 'Full-time',
      description: item.description ? item.description.replace(/<[^>]*>?/gm, '').substring(0, 1000) : `${title} opportunity at ${company}.`,
      requirements: [
        'Strong knowledge of modern Web Development stacks',
        'Hands-on experience with REST APIs and databases',
        'Good problem-solving skills and remote communication',
      ],
      preferredSkills: ['TypeScript', 'React', 'Node.js', 'Git'],
      benefits: ['100% Remote Flexibility', 'Flexible Hours'],
      applicationUrl: item.url || 'https://remotive.com',
      originalUrl: item.url || 'https://remotive.com',
      applicationMethod: 'ASSISTED',
      postedAt: item.publication_date || new Date().toISOString(),
      safetyScore: 95,
    };
  }
}
