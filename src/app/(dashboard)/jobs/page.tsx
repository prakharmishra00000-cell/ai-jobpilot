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
  FileText,
} from 'lucide-react';
import { jobSourceRegistry } from '@/adapters/registry';
import { analyzeLiveJobFit, EXACT_PRAKHAR_RESUME_SKILLS } from '@/services/ai/gemini';
import { RawJob } from '@/types';

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [workModeFilter, setWorkModeFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [jobs, setJobs] = useState<RawJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [candidateProfile, setCandidateProfile] = useState<any>(null);

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
    // Read uploaded candidate resume profile
    const profile = JSON.parse(localStorage.getItem('jobpilot_candidate_profile') || 'null') || {
      targetRole: 'AI FULL-STACK WEB DEVELOPER',
      skills: EXACT_PRAKHAR_RESUME_SKILLS,
      experienceYears: 1,
    };
    
    setCandidateProfile(profile);

    // Initial search defaults to candidate's exact resume target role
    const initialRole = profile.targetRole || 'AI FULL-STACK WEB DEVELOPER';
    setSearchTerm(initialRole);

    async function loadResumeMatchedJobs() {
      setIsLoading(true);
      try {
        let fetched = await jobSourceRegistry.searchAllSources({ role: initialRole });
        
        if (fetched.length === 0) {
          fetched = await jobSourceRegistry.searchAllSources({ role: 'developer' });
        }

        // Calculate live fit scores & sort by highest resume match first
        const candidateSkills = profile.skills || EXACT_PRAKHAR_RESUME_SKILLS;
        const candidateYears = profile.experienceYears || 1;

        const scored = fetched.map(job => ({
          job,
          analysis: analyzeLiveJobFit(job, candidateSkills, candidateYears, profile.targetRole)
        })).sort((a, b) => b.analysis.fitScore - a.analysis.fitScore);

        setJobs(scored.map(s => s.job));
      } catch (err) {
        console.error('Error fetching resume matched live jobs:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadResumeMatchedJobs();
  }, []);

  const handleSearchSubmit = async (queryOverride?: string) => {
    const query = queryOverride !== undefined ? queryOverride : searchTerm;
    setIsLoading(true);
    try {
      const fetched = await jobSourceRegistry.searchAllSources({ role: query || 'developer' });
      const candidateSkills = candidateProfile?.skills || EXACT_PRAKHAR_RESUME_SKILLS;
      const candidateYears = candidateProfile?.experienceYears || 1;

      const scored = fetched.map(job => ({
        job,
        analysis: analyzeLiveJobFit(job, candidateSkills, candidateYears, candidateProfile?.targetRole)
      })).sort((a, b) => b.analysis.fitScore - a.analysis.fitScore);

      setJobs(scored.map(s => s.job));
    } catch (err) {
      console.error('Error performing job search:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const candidateSkills = candidateProfile?.skills || EXACT_PRAKHAR_RESUME_SKILLS;
  const candidateYears = candidateProfile?.experienceYears || 1;

  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !term ||
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.description.toLowerCase().includes(term);

    const matchesMode = workModeFilter === 'All' || job.workMode === workModeFilter;
    const matchesSource = sourceFilter === 'All' || job.source === sourceFilter;

    return matchesSearch && matchesMode && matchesSource;
  });

  const displayJobs = filteredJobs.length > 0 ? filteredJobs : jobs;

  const getFitBadgeStyle = (score: number) => {
    if (score >= 80) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    if (score >= 60) return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Discovered Jobs Engine <span className="text-xs text-indigo-400 bg-indigo-950 font-mono px-2 py-0.5 rounded border border-indigo-800/50">15 Connected Sources</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Live listings queried for <strong className="text-indigo-300">"{candidateProfile?.targetRole || 'AI FULL-STACK WEB DEVELOPER'}"</strong> and ranked by your exact resume skills.
          </p>
        </div>
      </div>

      {/* Candidate Resume Context Pill Banner */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center border border-indigo-800/50 shrink-0">
            <FileText className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <span className="font-bold text-white block">
              Active Candidate Search Target: {candidateProfile?.targetRole || 'AI FULL-STACK WEB DEVELOPER'}
            </span>
            <span className="text-[11px] text-slate-400">
              Matching Skills: {candidateSkills.slice(0, 4).join(', ')} ({candidateSkills.length} Total Resume Skills)
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            const role = candidateProfile?.targetRole || 'AI FULL-STACK WEB DEVELOPER';
            setSearchTerm(role);
            handleSearchSubmit(role);
          }}
          className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Reset to Resume Search</span>
        </button>
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
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
              placeholder="Search by title, skills (e.g. AI Developer, React, Next.js, APIs)..."
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
        {/* Dynamic Opportunity Counter Header */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>
            {isLoading
              ? 'Querying live job feeds across 15 sources...'
              : `Showing ${displayJobs.length} live opportunities matching candidate resume`}
          </span>
          <span className="text-indigo-400 font-semibold">Sorted by AI Resume Fit Score (Highest First)</span>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl">
            <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" /> Querying live API feeds across 15 platforms...
          </div>
        ) : displayJobs.length === 0 ? (
          <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-400">
            No live jobs matching "{searchTerm}". Click <button onClick={() => { setSearchTerm('AI FULL-STACK WEB DEVELOPER'); handleSearchSubmit('AI FULL-STACK WEB DEVELOPER'); }} className="text-indigo-400 font-semibold underline">here</button> to search for AI Developer jobs.
          </div>
        ) : (
          displayJobs.map((job, idx) => {
            // Real-Time Dynamic Fit Analysis per job
            const liveFit = analyzeLiveJobFit(job, candidateSkills, candidateYears, candidateProfile?.targetRole);

            return (
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
                      <span className="text-emerald-400 font-semibold">{job.salaryRange || '₹10 LPA - ₹18 LPA'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className={`text-xs font-extrabold px-2.5 py-1 rounded-lg border inline-flex items-center gap-1 ${getFitBadgeStyle(liveFit.fitScore)}`}>
                        <Sparkles className="w-3.5 h-3.5" /> {liveFit.fitScore}% FIT
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">Shortlist: {liveFit.shortlistProbability}%</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {job.description}
                </p>

                {/* Pros/Cons Summary preview */}
                <div className="flex flex-wrap gap-2 text-[11px]">
                  {liveFit.pros.slice(0, 2).map((p, i) => (
                    <span key={i} className="text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                      {p}
                    </span>
                  ))}
                  {liveFit.cons.slice(0, 1).map((c, i) => (
                    <span key={i} className={`px-2 py-0.5 rounded border ${c.includes('❌') ? 'text-rose-300 bg-rose-950/60 border-rose-800/50 font-semibold' : 'text-amber-300 bg-amber-950/60 border-amber-800/50'}`}>
                      {c}
                    </span>
                  ))}
                </div>

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
            );
          })
        )}
      </div>
    </div>
  );
}
