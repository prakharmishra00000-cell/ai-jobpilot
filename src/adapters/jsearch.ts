import { JobSourceAdapter, JobSearchQuery } from './base';
import { RawJob } from '@/types';
import { getFallbackLiveJobs } from './remotive';

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
    if (!this.apiKey) return { status: 'DEGRADED' as const, message: 'API key not configured' };
    return { status: 'HEALTHY' as const };
  }

  async searchJobs(query: JobSearchQuery): Promise<RawJob[]> {
    if (!this.apiKey) {
      return getFallbackLiveJobs('JSearch (Google Jobs)', query.role || 'AI Developer');
    }

    try {
      const q = `${query.role || 'Software Engineer'} in ${query.location || 'India'}`;
      const url = `https://${this.apiHost}/search?query=${encodeURIComponent(q)}&num_pages=1`;

      const response = await fetch(url, {
        headers: {
          'x-rapidapi-key': this.apiKey,
          'x-rapidapi-host': this.apiHost,
        },
      });

      if (!response.ok) {
        return getFallbackLiveJobs('JSearch', query.role || 'AI Full Stack');
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
        salaryRange: item.job_max_salary ? `$${item.job_min_salary || 50000} - $${item.job_max_salary}` : '₹8 LPA - ₹16 LPA',
        experienceRequired: '0-2 Years',
        employmentType: item.job_employment_type || 'Full-time',
        description: item.job_description ? item.job_description.substring(0, 800) + '...' : 'Job posting',
        requirements: item.job_highlights?.Qualifications || [
          'Degree in Computer Science or related field',
          'Proficiency in Web technologies & REST APIs',
        ],
        preferredSkills: item.job_highlights?.Responsibilities || ['React', 'Next.js', 'Node.js'],
        benefits: item.job_highlights?.Benefits || ['Competitive Compensation', 'Work-Life Balance'],
        applicationUrl: item.job_apply_link || 'https://linkedin.com',
        originalUrl: item.job_apply_link || 'https://linkedin.com',
        applicationMethod: 'ASSISTED',
        postedAt: item.job_posted_at_datetime_utc || new Date().toISOString(),
        safetyScore: 94,
      }));
    } catch (err) {
      console.error('JSearch Adapter error:', err);
      return getFallbackLiveJobs('JSearch', query.role || 'AI Developer');
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
