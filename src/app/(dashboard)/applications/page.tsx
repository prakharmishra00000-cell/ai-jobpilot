'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileCheck,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Send,
} from 'lucide-react';

export default function ApplicationsPage() {
  const [filterStatus, setFilterStatus] = useState('All');

  const applicationsList = [
    {
      id: 'app-101',
      jobTitle: 'AI Full Stack Developer',
      company: 'Cognitive Web Systems',
      platform: 'LinkedIn',
      fitScore: 94,
      shortlistProb: 78,
      appliedAt: '15 Aug 2026',
      status: 'Applied',
      responseStatus: 'No Response Yet',
      mode: 'Assisted Mode',
      originalUrl: 'https://linkedin.com/jobs/view/101',
    },
    {
      id: 'app-102',
      jobTitle: 'Frontend AI Web Developer',
      company: 'HyperScale AI',
      platform: 'Indeed',
      fitScore: 91,
      shortlistProb: 82,
      appliedAt: '14 Aug 2026',
      status: 'Application Confirmed',
      responseStatus: 'Interview Invitation Received',
      mode: 'Assisted Mode',
      originalUrl: 'https://indeed.com/viewjob?jk=102',
    },
    {
      id: 'app-103',
      jobTitle: 'Junior Software Engineer',
      company: 'Apex Data Labs',
      platform: 'Internshala',
      fitScore: 88,
      shortlistProb: 75,
      appliedAt: '12 Aug 2026',
      status: 'Recruiter Contacted',
      responseStatus: 'Assessment Received',
      mode: 'Assisted Mode',
      originalUrl: 'https://internshala.com/job/detail/103',
    },
  ];

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

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Application CRM Tracker <span className="text-xs text-indigo-400 bg-indigo-950 font-mono px-2 py-0.5 rounded border border-indigo-800/50">42 Total</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track every submission, stored document versions, platform confirmation IDs, and employer responses.
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

        <span className="text-xs text-slate-400">
          Showing 3 recent applications
        </span>
      </div>

      {/* Table */}
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
                <th className="py-3.5 px-4">Response Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {applicationsList.map((app) => (
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
                    <div className="font-extrabold text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> {app.fitScore}%
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
                    {app.responseStatus.includes('Interview') ? (
                      <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                        🎯 {app.responseStatus}
                      </span>
                    ) : (
                      <span className="text-slate-400">{app.responseStatus}</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={app.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Open Original Job Platform"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <Link
                        href={`/applications/${app.id}`}
                        className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                        title="View Application History"
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
    </div>
  );
}
