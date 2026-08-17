'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileCheck,
  Filter,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Trash2,
  Zap,
} from 'lucide-react';
import { jobSourceRegistry } from '@/adapters/registry';
import { analyzeLiveJobFit, EXACT_PRAKHAR_RESUME_SKILLS } from '@/services/ai/gemini';

interface ApplicationItem {
  id: string;
  jobTitle: string;
  company: string;
  platform: string;
  fitScore: number;
  shortlistProb: number;
  appliedAt: string;
  status: string;
  responseStatus: string;
  mode: string;
  originalUrl: string;
  isUserSubmitted?: boolean;
}

export default function ApplicationsPage() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const syncLiveJobsIntoCRM = async () => {
    setIsLoading(true);
    try {
      const candidateProfile = JSON.parse(localStorage.getItem('jobpilot_candidate_profile') || 'null') || {
        targetRole: 'AI FULL-STACK WEB DEVELOPER',
        skills: EXACT_PRAKHAR_RESUME_SKILLS,
        experienceYears: 1,
        branch: 'Mechanical Engineering',
        graduationYear: '2026',
      };

      const candidateSkills = candidateProfile.skills || EXACT_PRAKHAR_RESUME_SKILLS;
      const candidateYears = candidateProfile.experienceYears || 1;
      const roleQuery = candidateProfile.targetRole || 'AI FULL-STACK WEB DEVELOPER';
      
      const liveJobs = await jobSourceRegistry.searchAllSources({ role: roleQuery });

      // Read existing saved user applications
      const saved = localStorage.getItem('jobpilot_applications');
      const existingApps: ApplicationItem[] = saved ? JSON.parse(saved) : [];
      const existingIds = new Set(existingApps.map(a => a.id));

      const newDiscoveredApps: ApplicationItem[] = [];

      liveJobs.forEach((job, idx) => {
        const appId = `live-crm-${job.id || idx}`;
        if (!existingIds.has(appId)) {
          const liveFit = analyzeLiveJobFit(job, candidateSkills, candidateYears, roleQuery, candidateProfile.branch, candidateProfile.graduationYear);

          newDiscoveredApps.push({
            id: appId,
            jobTitle: job.title,
            company: job.company,
            platform: job.source,
            fitScore: liveFit.fitScore,
            shortlistProb: liveFit.shortlistProbability,
            appliedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            status: 'Ready to Apply (Direct Link Active)',
            responseStatus: 'Awaiting Candidate Action',
            mode: '24/7 Engine Live Sync',
            originalUrl: job.originalUrl || job.applicationUrl,
            isUserSubmitted: false,
          });
        }
      });

      const updatedCombinedApps = [...newDiscoveredApps, ...existingApps];
      setApplications(updatedCombinedApps);
      localStorage.setItem('jobpilot_applications', JSON.stringify(updatedCombinedApps));
    } catch (err) {
      console.error('Error syncing live jobs into CRM:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    syncLiveJobsIntoCRM();
  }, []);

  const handleClearCache = () => {
    localStorage.removeItem('jobpilot_applications');
    syncLiveJobsIntoCRM();
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Application Confirmed':
      case 'Applied':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'Ready to Apply (Direct Link Active)':
        return 'bg-indigo-950 text-indigo-300 border-indigo-800';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const filteredApplications = applications.filter((app) => {
    return filterStatus === 'All' || app.status === filterStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Applications CRM & 24/7 Engine Sync <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            24/7 Automation Engine automatically syncs newly discovered live jobs across 15 connected sources into your CRM.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={syncLiveJobsIntoCRM}
            disabled={isLoading}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Sync Live Jobs Now</span>
          </button>

          <button
            onClick={handleClearCache}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700/60"
            title="Reset cached CRM data and reload fresh live jobs"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span>Reset CRM</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Application Statuses</option>
            <option value="Ready to Apply (Direct Link Active)">Ready to Apply (Direct Link Active)</option>
            <option value="Applied">Applied</option>
            <option value="Application Confirmed">Application Confirmed</option>
          </select>
        </div>

        <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 24/7 Engine Live Updating CRM ({applications.length} Openings Tracked)
        </span>
      </div>

      {/* Applications Table */}
      {isLoading ? (
        <div className="py-16 text-center text-xs text-slate-400 flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
          <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" /> Querying 15 job platforms and syncing live jobs into CRM...
        </div>
      ) : (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Job & Company</th>
                  <th className="py-3.5 px-4">Platform Source</th>
                  <th className="py-3.5 px-4">Fit & Shortlist</th>
                  <th className="py-3.5 px-4">Date Added</th>
                  <th className="py-3.5 px-4">Application Status</th>
                  <th className="py-3.5 px-4">Official Verification Link</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-white text-xs hover:text-indigo-300 transition-colors">
                        <Link href={`/jobs/${app.id}`}>{app.jobTitle}</Link>
                      </div>
                      <div className="text-[11px] text-slate-400">{app.company}</div>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-300">
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] border border-slate-700">
                        {app.platform}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className={`font-extrabold ${app.fitScore >= 80 ? 'text-amber-400' : app.fitScore >= 60 ? 'text-indigo-400' : 'text-rose-400'}`}>
                        {app.fitScore}% FIT
                      </div>
                      <div className="text-[10px] text-slate-400">Prob: {app.shortlistProb}%</div>
                    </td>
                    <td className="py-4 px-4 text-slate-400 font-mono text-[11px]">
                      {app.appliedAt}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium">
                      <a
                        href={app.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 text-[11px] font-semibold inline-flex items-center gap-1 border border-emerald-800/60 transition-colors"
                        title="Verify submission on official platform page"
                      >
                        <span>🔗 Open & Apply on Platform</span>
                        <ExternalLink className="w-3 h-3 text-emerald-400" />
                      </a>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/jobs/${app.id}`}
                          className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                          title="View Application Details"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
