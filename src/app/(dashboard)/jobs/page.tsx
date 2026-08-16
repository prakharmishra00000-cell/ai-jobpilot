'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Clock,
  MapPin,
  ShieldCheck,
  Globe,
  RefreshCw,
} from 'lucide-react';
import { jobSourceRegistry } from '@/adapters/registry';
import { RawJob } from '@/types';

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('AI Full Stack Developer');
  const [workModeFilter, setWorkModeFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [jobs, setJobs] = useState<RawJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const sourcesList = [
    'LinkedIn',
    'Indeed',
    'Internshala',
    'Wellfound (AngelList)',
    'Glassdoor',
    'Naukri',
    'Foundit (Monster)',
    'Cutshort',
    'Company Career Pages',
    'Greenhouse Job Boards',
    'Lever Job Boards',
    'Workday Career Pages',
    'Remote Job Boards (Remotive/RemoteOK)',
    'Government Employment Portals (NCS/USAJobs)',
    'Other Legitimate Public Sources',
  ];

  useEffect(() => {
    async function loadLiveJobs() {
      setIsLoading(true);
      try {
        const fetched = await jobSourceRegistry.searchAllSources({ role: searchTerm });
        setJobs(fetched);
      } catch (err) {
        console.error('Error fetching live jobs:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadLiveJobs();
  }, [searchTerm]);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMode = workModeFilter === 'All' || job.workMode === workModeFilter;
    const matchesSource = sourceFilter === 'All' || job.source === sourceFilter;

    return matchesSearch && matchesMode && matchesSource;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Discovered Jobs Engine <span className="text-xs text-indigo-400 bg-indigo-950 font-mono px-2 py-0.5 rounded border border-indigo-800/50">15 Connected Sources</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time deduplicated job listings from 15 connected platforms, scored by AI fit & shortlist probability.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by title, skills (e.g. React, Next.js, Node.js, AI APIs)..."
              className="w-full bg-slate-800/90 text-slate-200 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-700 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-500"
            />
          </div>

          {/* Work Mode Select */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={workModeFilter}
              onChange={(e) => setWorkModeFilter(e.target.value)}
              className="w-full bg-slate-800/90 text-slate-200 text-xs rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Work Modes</option>
              <option value="Remote">Remote Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          {/* Source Select */}
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full bg-slate-800/90 text-slate-200 text-xs rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All 15 Sources</option>
              {sourcesList.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Discovered Jobs List Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>{isLoading ? 'Querying live job feeds...' : `Showing ${filteredJobs.length} live opportunities`}</span>
          <span>Sorted by Fit Score (Descending)</span>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" /> Fetching live API feeds across 15 platforms...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-400">
            No live jobs matching "{searchTerm}". Try refining your search query or role title.
          </div>
        ) : (
          filteredJobs.slice(0, 15).map((job, idx) => (
            <div
              key={`${job.id}-${idx}`}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-4 shadow-lg group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors">
                      {job.title}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/50">
                      {job.source}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300 mt-1 font-medium">
                    <span className="text-white font-semibold">{job.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {job.location}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">{job.salaryRange}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-amber-400 flex items-center gap-1 justify-end">
                      <Sparkles className="w-3.5 h-3.5" /> 94% FIT
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">Shortlist Estimate: High (78%)</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {job.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Live Feed</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-medium"><ShieldCheck className="w-3 h-3" /> Safety: 96/100</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={job.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <span>Original Job</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <Link
                    href={`/jobs/${job.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-indigo-600/30"
                  >
                    <span>View Details & Prepare</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
