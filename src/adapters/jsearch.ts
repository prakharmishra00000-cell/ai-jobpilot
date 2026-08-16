import { JobSourceAdapter, JobSearchQuery } from './base';
import { RawJob } from '@/types';

export class JSearchAdapter implements JobSourceAdapter {
  sourceName = 'JSearch (LinkedIn/Indeed Aggregator)';
  adapterType: 'api' | 'feed' | 'assisted' = 'api';
  mode: 'AUTONOMOUS' | 'ASSISTED' = 'ASSISTED';

  private apiKey = process.env.JSEARCH_API_KEY || '';
  private apiHost = process.env.JSEARCH_API_HOST || 'jsearch.p.rapidapi.com';

  isConfigured(): boolean {
    return Boolean(this.apiKey);
  }

  async checkHealth() {
    if (!this.apiKey) return { status: 'DEGRADED' as const, message: 'JSEARCH_API_KEY required' };
    return { status: 'HEALTHY' as const };
  }

  async searchJobs(query: JobSearchQuery): Promise<RawJob[]> {
    if (!this.apiKey) {
      console.log('JSearch API key not provided in server env.');
      return [];
    }

    try {
      const q = `${query.role || 'Software Engineer'} in ${query.location || 'Remote'}`;
      const url = `https://${this.apiHost}/search?query=${encodeURIComponent(q)}&num_pages=1`;

      const response = await fetch(url, {
        headers: {
          'x-rapidapi-key': this.apiKey,
          'x-rapidapi-host': this.apiHost,
        },
      });

      if (!response.ok) {
        console.warn(`JSearch API responded with ${response.status}`);
        return [];
      }

      const data = await response.json();
      const items: any[] = data.data || [];

      return items.map((item, idx) => ({
        id: `jsearch-${item.job_id || idx}`,
        source: 'LinkedIn / Indeed via JSearch',
        externalJobId: item.job_id || `jsearch-${idx}`,
        title: item.job_title || 'Software Engineer',
        company: item.employer_name || 'Tech Employer',
        companyUrl: item.employer_website || undefined,
        location: `${item.job_city || ''} ${item.job_country || 'Remote'}`.trim(),
        workMode: item.job_is_remote ? 'Remote' : 'Hybrid',
        salaryRange: item.job_max_salary ? `$${item.job_min_salary || 50000} - $${item.job_max_salary}` : 'Competitive',
        experienceRequired: '0-2 Years',
        employmentType: item.job_employment_type || 'Full-time',
        description: item.job_description ? item.job_description.substring(0, 1000) : 'Live job posting',
        requirements: item.job_highlights?.Qualifications || [
          'Degree in Computer Science or related experience',
          'Proficiency in Web technologies & REST APIs',
        ],
        preferredSkills: item.job_highlights?.Responsibilities || ['React', 'Next.js', 'Node.js'],
        benefits: item.job_highlights?.Benefits || ['Competitive Compensation', 'Health Coverage'],
        applicationUrl: item.job_apply_link || 'https://linkedin.com',
        originalUrl: item.job_apply_link || 'https://linkedin.com',
        applicationMethod: 'ASSISTED',
        postedAt: item.job_posted_at_datetime_utc || new Date().toISOString(),
        safetyScore: 95,
      }));
    } catch (err) {
      console.error('JSearch Adapter error:', err);
      return [];
    }
  }

  async getJobDetails(jobId: string): Promise<RawJob | null> {
    const jobs = await this.searchJobs({ limit: 10 });
    return jobs.find(j => j.id === jobId) || null;
  }

  getOriginalUrl(job: RawJob): string {
    return job.originalUrl || job.applicationUrl;
  }
}
