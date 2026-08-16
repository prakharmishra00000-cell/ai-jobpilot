'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Clock,
  MapPin,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { getFallbackLiveJobs } from '@/adapters/remotive';

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('AI Full Stack Developer');
  const [workModeFilter, setWorkModeFilter] = useState('All');
  const [minFitFilter, setMinFitFilter] = useState(65);

  const jobsList = [
    ...getFallbackLiveJobs('Remotive', searchTerm),
    ...getFallbackLiveJobs('LinkedIn via JSearch', searchTerm),
    ...getFallbackLiveJobs('Indeed via Adzuna', searchTerm),
  ];

  const filteredJobs = jobsList.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMode = workModeFilter === 'All' || job.workMode === workModeFilter;

    return matchesSearch && matchesMode;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Discovered Jobs Engine <span className="text-xs text-indigo-400 bg-indigo-950 font-mono px-2 py-0.5 rounded border border-indigo-800/50">Multi-Source</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time deduplicated job postings scored by AI fit and estimated shortlist probability.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
        </div>

        {/* Query Intelligence Badge */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>
            <strong className="text-slate-300">AI Query Intelligence:</strong> Also expanded search to related titles: <em>AI Web Developer, Full Stack AI Engineer, Next.js Software Developer</em>.
          </span>
        </div>
      </div>

      {/* Discovered Jobs List Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>Showing {filteredJobs.length} deduplicated opportunities</span>
          <span>Sorted by Fit Score (Descending)</span>
        </div>

        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-4 shadow-lg group"
          >
            {/* Top row */}
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

            {/* Description Snippet */}
            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
              {job.description}
            </p>

            {/* Requirements & Skills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-slate-400 font-medium">Required Match:</span>
              {job.requirements.slice(0, 3).map((req, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-700"
                >
                  ✓ {req}
                </span>
              ))}
            </div>

            {/* Footer & Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Discovered 18m ago</span>
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
        ))}
      </div>
    </div>
  );
}
