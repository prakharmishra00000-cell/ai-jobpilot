'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileCheck,
  Filter,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Briefcase,
  Sparkles,
} from 'lucide-react';

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
  originalUrl: string;
}

export default function ApplicationsPage() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [applications, setApplications] = useState<ApplicationItem[]>([]);

  useEffect(() => {
    // Load authentic submitted applications from localStorage / database
    const saved = localStorage.getItem('jobpilot_applications');
    if (saved) {
      try {
        setApplications(JSON.parse(saved));
      } catch (e) {
        setApplications([]);
      }
    } else {
      setApplications([]);
    }
  }, []);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Application Confirmed':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'Recruiter Contacted':
        return 'bg-indigo-950 text-indigo-300 border-indigo-800';
      case 'Applied':
        return 'bg-slate-800 text-slate-300 border-slate-700';
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
            Applications CRM & Official Verification <FileCheck className="w-5 h-5 text-indigo-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Every submission includes a direct official job platform link so you can instantly verify your application.
          </p>
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
            <option value="Applied">Applied</option>
            <option value="Application Confirmed">Application Confirmed</option>
            <option value="Recruiter Contacted">Recruiter Contacted</option>
            <option value="Interview">Interview Requested</option>
          </select>
        </div>

        <span className="text-xs text-slate-400 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Live Verification System Active
        </span>
      </div>

      {/* Applications List or Authentic Empty State */}
      {filteredApplications.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-indigo-950 text-indigo-400 border border-indigo-800/50 flex items-center justify-center mx-auto">
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-white">No Tracked Applications Yet</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              You haven't submitted any job applications yet. Go to <strong className="text-indigo-300">Discovered Jobs</strong> to find high-fit jobs across 15 platforms and submit applications with instant 1-click verification!
            </p>
          </div>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/30"
          >
            <Sparkles className="w-4 h-4" />
            <span>Discover High-Fit Jobs Across 15 Sources</span>
          </Link>
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
                  <th className="py-3.5 px-4">Applied Date</th>
                  <th className="py-3.5 px-4">Application Status</th>
                  <th className="py-3.5 px-4">Official Verification</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-white text-xs hover:text-indigo-300 transition-colors">
                        <Link href={`/applications/${app.id}`}>{app.jobTitle}</Link>
                      </div>
                      <div className="text-[11px] text-slate-400">{app.company}</div>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-300">
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] border border-slate-700">
                        {app.platform}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-extrabold text-amber-400">
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
                        <span>🔗 Verify Official Link</span>
                        <ExternalLink className="w-3 h-3 text-emerald-400" />
                      </a>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/applications/${app.id}`}
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
