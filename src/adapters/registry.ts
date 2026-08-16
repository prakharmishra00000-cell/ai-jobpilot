import { JobSourceAdapter, JobSearchQuery } from './base';
import { RemotiveAdapter } from './remotive';
import { JSearchAdapter } from './jsearch';
import { AdzunaAdapter } from './adzuna';
import { allJobSourceAdapters } from './all_sources';
import { RawJob } from '@/types';

export class JobSourceRegistry {
  private adapters: JobSourceAdapter[] = [];

  constructor() {
    // Register foundational APIs
    this.adapters.push(new RemotiveAdapter());
    this.adapters.push(new JSearchAdapter());
    this.adapters.push(new AdzunaAdapter());

    // Register all 15 requested source adapters
    allJobSourceAdapters.forEach(adapter => {
      if (!this.adapters.some(a => a.sourceName === adapter.sourceName)) {
        this.adapters.push(adapter);
      }
    });
  }

  getAdapters(): JobSourceAdapter[] {
    return this.adapters;
  }

  getAdapterByName(name: string): JobSourceAdapter | undefined {
    return this.adapters.find(a => a.sourceName.toLowerCase().includes(name.toLowerCase()));
  }

  /**
   * Multi-Source Job Search & Deduplication Engine across all 15 connected sources
   */
  async searchAllSources(query: JobSearchQuery): Promise<RawJob[]> {
    const fetchPromises = this.adapters.map(async (adapter) => {
      try {
        return await adapter.searchJobs(query);
      } catch (err) {
        console.error(`Error querying ${adapter.sourceName}:`, err);
        return [];
      }
    });

    const resultsArray = await Promise.all(fetchPromises);
    const combinedJobs = resultsArray.flat();

    return this.deduplicateJobs(combinedJobs);
  }

  private deduplicateJobs(jobs: RawJob[]): RawJob[] {
    const seenHashes = new Set<string>();
    const uniqueJobs: RawJob[] = [];

    for (const job of jobs) {
      const normalizedTitle = job.title.toLowerCase().replace(/[^a-z0-9]/g, '');
      const normalizedCompany = job.company.toLowerCase().replace(/[^a-z0-9]/g, '');
      const hashKey = `${normalizedTitle}_${normalizedCompany}_${job.source}`;

      if (!seenHashes.has(hashKey)) {
        seenHashes.add(hashKey);
        uniqueJobs.push(job);
      }
    }

    return uniqueJobs;
  }
}

export const jobSourceRegistry = new JobSourceRegistry();
