'use client';

import React, { useState } from 'react';
import { Zap, Play, Pause, Sliders } from 'lucide-react';

export default function AutomationPage() {
  const [isActive, setIsActive] = useState(true);
  const [scanFrequency, setScanFrequency] = useState('30m');
  const [minFit, setMinFit] = useState(85);
  const [dailyLimit, setDailyLimit] = useState(20);
  const [outreachEnabled, setOutreachEnabled] = useState(true);

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

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            24/7 Automation Control Center <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure background workers, scan frequencies across all 15 connected platforms, and application limits.
          </p>
        </div>

        <div className="flex items-center gap-3">
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
              <h2 className="font-bold text-base text-white">AUTOMATION STATUS: {isActive ? 'ACTIVE' : 'PAUSED'}</h2>
              <p className="text-xs text-slate-400">Background workers polling all 15 connected job sources safely.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Scan Interval:</span>
            <span className="text-indigo-400 font-bold bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/50">Every 30 Minutes</span>
          </div>
        </div>

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
            <p className="text-[11px] text-slate-400">Only trigger alerts / assisted packages for jobs matching {minFit}% or higher.</p>
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
