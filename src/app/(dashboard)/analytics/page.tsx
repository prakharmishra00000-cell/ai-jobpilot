'use client';

import React from 'react';
import { BarChart3, TrendingUp, Sparkles, Award, Lightbulb, Target } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Job Search Analytics & Insights <BarChart3 className="w-5 h-5 text-indigo-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Data-driven outcomes analytics to optimize your response rate and shortlist probability.
          </p>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Response Rate</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">16.7%</p>
          <p className="text-[11px] text-slate-400 mt-1">+4.2% vs industry avg</p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Interview Rate</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400 mt-1">7.1%</p>
          <p className="text-[11px] text-slate-400 mt-1">3 interviews scheduled</p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Avg Application Fit</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1">88.4%</p>
          <p className="text-[11px] text-slate-400 mt-1">High quality targeting</p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Top Performing Source</p>
          <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">LinkedIn</p>
          <p className="text-[11px] text-emerald-400 mt-1">22% response rate</p>
        </div>
      </div>

      {/* AI Intelligence Feedback Loop Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-800/50 space-y-4 shadow-xl">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" /> AI Application Intelligence Recommendation
        </h3>

        <div className="space-y-2 text-xs text-slate-300">
          <p className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 leading-relaxed">
            💡 <strong>Highest Conversion Pattern:</strong> Your strongest response rate (25%+) is coming from <em>AI Full Stack Developer</em> and <em>Frontend AI Developer</em> positions requiring <strong>React + Next.js + Generative AI APIs</strong>.
          </p>
          <p className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 leading-relaxed">
            💡 <strong>Optimization Tip:</strong> Applications requiring 3+ years of professional corporate experience have a lower shortlist probability for your profile (0-1 yrs). Prioritize 0–2 year roles to maximize interview conversion.
          </p>
        </div>
      </div>
    </div>
  );
}
