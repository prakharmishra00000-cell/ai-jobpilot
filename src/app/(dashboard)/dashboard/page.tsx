'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Zap,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Clock,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Search,
  ChevronRight,
  Award,
} from 'lucide-react';

export default function DashboardPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [automationActive, setAutomationActive] = useState(true);

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 2500);
  };

  const topJobs = [
    {
      id: 'remotive-101',
      title: 'AI Full Stack Developer',
      company: 'Cognitive Web Systems',
      location: 'Remote (India / Global)',
      salary: '₹10 LPA - ₹18 LPA ($60,000 - $90,000)',
      fitScore: 94,
      shortlistProb: 78,
      posted: '18m ago',
      source: 'LinkedIn via JSearch',
      matchedSkills: ['React', 'Next.js', 'Node.js', 'AI APIs', 'TypeScript'],
      originalUrl: 'https://linkedin.com/jobs/view/101',
    },
    {
      id: 'remotive-102',
      title: 'Frontend AI Web Developer',
      company: 'HyperScale AI',
      location: 'Bengaluru / Remote',
      salary: '₹8 LPA - ₹15 LPA',
      fitScore: 91,
      shortlistProb: 82,
      posted: '45m ago',
      source: 'Indeed via Adzuna',
      matchedSkills: ['React', 'Tailwind CSS', 'Next.js', 'Framer Motion'],
      originalUrl: 'https://indeed.com/viewjob?jk=102',
    },
    {
      id: 'remotive-104',
      title: 'Full Stack Engineer (React + Node + AI)',
      company: 'FlowTech Cloud',
      location: 'Worldwide Remote',
      salary: '$75,000 - $110,000 / year',
      fitScore: 88,
      shortlistProb: 75,
      posted: '4h ago',
      source: 'Remotive',
      matchedSkills: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
      originalUrl: 'https://wellfound.com/jobs/104',
    },
  ];

  const activityLogs = [
    { time: '20:05', action: 'Found new job on LinkedIn via JSearch: AI Full Stack Developer' },
    { time: '20:06', action: 'Calculated 8-Factor AI Fit Score: 94% (High Shortlist Probability)' },
    { time: '20:06', action: 'Customized resume v1.4 & generated tailored cover letter' },
    { time: '20:07', action: 'Assisted application package prepared for manual/one-click submission' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              GOOD EVENING, PRAKHAR 👋
            </h1>
            <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ● {automationActive ? 'ACTIVE 24/7' : 'PAUSED'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Your AI Job Agent is continuously scanning connected platforms, ranking fit scores, and tracking responses.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleRunScan}
            disabled={isScanning}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning Live APIs...' : 'Run Job Scan Now'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Jobs Found</span>
            <Briefcase className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">1,284</p>
          <p className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +142 discovered today
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>High Fit Match</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-2">176</p>
          <p className="text-[11px] text-slate-400 mt-1">Fit score &gt;= 80%</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Applications Tracked</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400 mt-2">42</p>
          <p className="text-[11px] text-slate-400 mt-1">Assisted & Auto submitted</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Employer Responses</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-2">7</p>
          <p className="text-[11px] text-emerald-400 font-medium mt-1">16.7% response rate</p>
        </div>
      </div>

      {/* Top Opportunities Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              🔥 TOP OPPORTUNITIES <span className="text-xs font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/50">Ranked by AI Fit</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Jobs evaluated by multi-factor score and estimated shortlist probability</p>
          </div>
          <Link href="/jobs" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            View All Discovered Jobs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {topJobs.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-4 group shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors">
                      {job.title}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {job.source}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-300 mt-0.5">
                    {job.company} • <span className="text-slate-400">{job.location}</span> • <span className="text-emerald-400 font-medium">{job.salary}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-amber-400 flex items-center gap-1 justify-end">
                      <Sparkles className="w-3.5 h-3.5" /> {job.fitScore}% FIT
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">Shortlist Prob: {job.shortlistProb}%</p>
                  </div>
                </div>
              </div>

              {/* Matched Skills Pill List */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400 font-medium mr-1">Matching Skills:</span>
                {job.matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-medium bg-indigo-950/80 text-indigo-300 border border-indigo-800/50 px-2.5 py-0.5 rounded-full"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Discovered {job.posted}
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={job.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700/60"
                  >
                    <span>View Original</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <Link
                    href={`/jobs/${job.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-indigo-600/30"
                  >
                    <span>Analyze & Apply</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Funnel & Activity Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Funnel */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" /> Application Funnel
          </h3>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-semibold text-slate-300">
                <span>Jobs Found</span>
                <span>1,284</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full w-full" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold text-slate-300">
                <span>Shortlisted (Fit &gt; 80%)</span>
                <span>176</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full w-[45%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold text-slate-300">
                <span>Applied</span>
                <span>42</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full w-[25%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold text-slate-300">
                <span>Responses</span>
                <span>7</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-[12%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Transparent Activity Log Feed */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" /> Transparent Activity Log
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Live Audit Trail</span>
          </div>

          <div className="space-y-2.5">
            {activityLogs.map((log, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/40 text-xs flex items-start gap-3">
                <span className="font-mono text-indigo-400 text-[11px] shrink-0">{log.time}</span>
                <p className="text-slate-300 leading-snug">{log.action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
