import { JobSourceAdapter, JobSearchQuery } from './base';
import { RawJob } from '@/types';

export class AdzunaAdapter implements JobSourceAdapter {
  sourceName = 'Adzuna Official API';
  adapterType: 'api' | 'feed' | 'assisted' = 'api';
  mode: 'AUTONOMOUS' | 'ASSISTED' = 'ASSISTED';

  private appId = process.env.ADZUNA_APP_ID || '';
  private appKey = process.env.ADZUNA_APP_KEY || '';

  isConfigured(): boolean {
    return Boolean(this.appId && this.appKey);
  }

  async checkHealth() {
    if (!this.isConfigured()) return { status: 'DEGRADED' as const, message: 'App ID & Key required' };
    return { status: 'HEALTHY' as const };
  }

  async searchJobs(query: JobSearchQuery): Promise<RawJob[]> {
    if (!this.isConfigured()) {
      console.log('Adzuna credentials not set in server env.');
      return [];
    }

    try {
      const country = 'in'; // default country
      const role = encodeURIComponent(query.role || 'software engineer');
      const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${this.appId}&app_key=${this.appKey}&results_per_page=10&what=${role}`;

      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`Adzuna API responded with ${res.status}`);
        return [];
      }

      const data = await res.json();
      const results: any[] = data.results || [];

      return results.map((item) => ({
        id: `adzuna-${item.id}`,
        source: 'Adzuna Jobs',
        externalJobId: String(item.id),
        title: item.title ? item.title.replace(/<[^>]*>?/gm, '') : 'Software Developer',
        company: item.company?.display_name || 'Tech Company',
        location: item.location?.display_name || 'India',
        workMode: 'Hybrid',
        salaryRange: item.salary_min ? `₹${Math.round(item.salary_min / 100000)} LPA - ₹${Math.round((item.salary_max || item.salary_min * 1.5) / 100000)} LPA` : 'Competitive',
        experienceRequired: '0-2 years',
        employmentType: item.contract_time === 'full_time' ? 'Full-time' : 'Contract',
        description: item.description ? item.description.replace(/<[^>]*>?/gm, '').substring(0, 1000) : 'Adzuna live posting',
        requirements: ['Relevant Degree or Equivalent Experience', 'Strong understanding of Web Development', 'Good problem solving skills'],
        applicationUrl: item.redirect_url || 'https://adzuna.com',
        originalUrl: item.redirect_url || 'https://adzuna.com',
        applicationMethod: 'ASSISTED',
        postedAt: item.created || new Date().toISOString(),
        safetyScore: 93,
      }));
    } catch (err) {
      console.error('AdzunaAdapter error:', err);
      return [];
    }
  }

  async getJobDetails(jobId: string): Promise<RawJob | null> {
    const jobs = await this.searchJobs({});
    return jobs.find(j => j.id === jobId) || null;
  }

  getOriginalUrl(job: RawJob): string {
    return job.originalUrl || job.applicationUrl;
  }
}
