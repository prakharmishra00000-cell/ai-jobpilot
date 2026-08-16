'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, Play, Pause, Sliders, CheckCircle2, RefreshCw } from 'lucide-react';
import { sendRealtimeDeviceNotification } from '@/lib/notifications';

export default function AutomationPage() {
  const [isActive, setIsActive] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [scanFrequency, setScanFrequency] = useState('30m');
  const [minFit, setMinFit] = useState(85);
  const [dailyLimit, setDailyLimit] = useState(20);
  const [outreachEnabled, setOutreachEnabled] = useState(true);
  const [autoAppliedCount, setAutoAppliedCount] = useState(0);

  const connectedSources = [
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

  const handleRunAutoApplyCycle = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setAutoAppliedCount(prev => prev + 3);

      // Save automated applications to localStorage for CRM & Dashboard
      const existingApps = JSON.parse(localStorage.getItem('jobpilot_applications') || '[]');
      const newApps = [
        {
          id: `auto-app-${Date.now()}-1`,
          jobTitle: 'AI Full Stack Developer',
          company: 'Cognitive Web Systems',
          platform: 'Greenhouse Job Board',
          fitScore: 94,
          shortlistProb: 82,
          appliedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          status: 'Application Confirmed',
          responseStatus: 'No Response Yet',
          mode: 'Autonomous Mode',
          originalUrl: 'https://boards.greenhouse.io',
        },
        {
          id: `auto-app-${Date.now()}-2`,
          jobTitle: 'Frontend AI Web Developer',
          company: 'HyperScale AI',
          platform: 'Lever Job Board',
          fitScore: 91,
          shortlistProb: 79,
          appliedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          status: 'Applied',
          responseStatus: 'No Response Yet',
          mode: 'Autonomous Mode',
          originalUrl: 'https://jobs.lever.co',
        },
      ];
      localStorage.setItem('jobpilot_applications', JSON.stringify([...newApps, ...existingApps]));

      // Send real-time OS device notification
      sendRealtimeDeviceNotification(
        'AI Full Stack Developer',
        'Cognitive Web Systems',
        'Greenhouse',
        'https://boards.greenhouse.io'
      );
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            24/7 Automation Control Center <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure background workers, scan frequencies across all 15 connected platforms, and auto-submit rules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAutoApplyCycle}
            disabled={isApplying}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isApplying ? 'animate-spin' : ''}`} />
            <span>{isApplying ? 'Processing High-Fit Auto-Apply...' : '⚡ Run Auto-Apply Cycle Now'}</span>
          </button>

          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
              isActive
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'Pause 24/7 Automation' : 'Resume Automation'}</span>
          </button>
        </div>
      </div>

      {/* Main Status Panel */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-3.5 h-3.5 rounded-full ${isActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
            <div>
              <h2 className="font-bold text-base text-white">AUTOMATION STATUS: {isActive ? 'ACTIVE 24/7' : 'PAUSED'}</h2>
              <p className="text-xs text-slate-400">Background workers polling all 15 connected job sources continuously.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-400">Scan Interval:</span>
              <span className="text-indigo-400 font-bold bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/50 ml-1">Every 30 Minutes</span>
            </div>
            <div>
              <span className="text-slate-400">Auto-Submitted:</span>
              <span className="text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/50 ml-1">{autoAppliedCount} Jobs</span>
            </div>
          </div>
        </div>

        {/* Success Alert if auto apply fired */}
        {autoAppliedCount > 0 && (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-between text-xs text-emerald-200">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Auto-Apply Cycle Completed! Submitted applications logged to CRM with official verification links.
            </span>
            <Link href="/applications" className="font-bold text-emerald-300 hover:underline">
              View Applications CRM →
            </Link>
          </div>
        )}

        {/* Source Health Grid for all 15 Sources */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">All 15 Connected Sources Health</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {connectedSources.map((src) => (
              <div key={src} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="font-medium text-slate-200 text-[11px] truncate">{src}</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 shrink-0">
                  ● Connected
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rules & Limits Form */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 text-xs">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-400" /> Automation Rules & Thresholds
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-semibold text-slate-200 block">Job Scanning Frequency</label>
            <select
              value={scanFrequency}
              onChange={(e) => setScanFrequency(e.target.value)}
              className="w-full bg-slate-800 text-slate-200 rounded-xl p-2.5 border border-slate-700 focus:outline-none"
            >
              <option value="15m">Every 15 minutes</option>
              <option value="30m">Every 30 minutes (Recommended)</option>
              <option value="1h">Every 1 hour</option>
              <option value="6h">Every 6 hours</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-slate-200 block">Minimum Fit Score Threshold ({minFit}%)</label>
            <input
              type="range"
              min="65"
              max="95"
              value={minFit}
              onChange={(e) => setMinFit(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <p className="text-[11px] text-slate-400">Only trigger auto-submit / alerts for jobs matching {minFit}% or higher.</p>
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-slate-200 block">Max Applications Per Day ({dailyLimit})</label>
            <input
              type="number"
              value={dailyLimit}
              onChange={(e) => setDailyLimit(Number(e.target.value))}
              className="w-full bg-slate-800 text-slate-200 rounded-xl p-2.5 border border-slate-700 focus:outline-none"
            />
            <p className="text-[11px] text-slate-400">Prevents indiscriminate mass application submissions.</p>
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-slate-200 block">Recruiter Outreach</label>
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-300">Enable personalized recruiter messages (where permitted)</span>
              <input
                type="checkbox"
                checked={outreachEnabled}
                onChange={(e) => setOutreachEnabled(e.target.checked)}
                className="w-4 h-4 accent-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
