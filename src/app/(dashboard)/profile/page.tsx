'use client';

import React from 'react';
import { User, Sparkles, Award, Code, FolderGit2, GraduationCap, CheckCircle2, TrendingUp } from 'lucide-react';

export default function ProfilePage() {
  const profileScores = [
    { label: 'Frontend Mastery', score: 94, color: 'bg-emerald-500' },
    { label: 'Backend Architecture', score: 82, color: 'bg-indigo-500' },
    { label: 'AI API Integration', score: 95, color: 'bg-amber-500' },
    { label: 'UI/UX & Responsiveness', score: 88, color: 'bg-violet-500' },
    { label: 'Project Complexity', score: 90, color: 'bg-sky-500' },
    { label: 'Recruiter Readiness', score: 89, color: 'bg-teal-500' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Candidate Profile & Portfolio Analysis <User className="w-5 h-5 text-indigo-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Structured candidate information extracted by AI from your uploaded resume, portfolio, and GitHub repositories.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <User className="w-4 h-4 text-indigo-400" /> Personal Information & Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Full Name</span>
                <span className="font-bold text-white text-sm">Prakhar Sharma</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Email Address</span>
                <span className="font-medium text-slate-200">prakhar@example.com</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Portfolio URL</span>
                <a href="https://prakhar-portfolio.dev" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                  https://prakhar-portfolio.dev
                </a>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">GitHub Profile</span>
                <a href="https://github.com/prakhar-dev" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                  https://github.com/prakhar-dev
                </a>
              </div>
            </div>
          </div>

          {/* Categorized Skills */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Code className="w-4 h-4 text-indigo-400" /> Verified Categorized Skills
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-semibold text-[11px] block mb-1.5">Frontend & Web</span>
                <div className="flex flex-wrap gap-1.5">
                  {['React 18', 'Next.js App Router', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Framer Motion'].map((s) => (
                    <span key={s} className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700 font-medium text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-semibold text-[11px] block mb-1.5">Backend, Databases & AI</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Node.js', 'Express', 'Google Gemini SDK', 'OpenAI API', 'REST APIs', 'PostgreSQL', 'Prisma ORM', 'SQLite', 'Redis'].map((s) => (
                    <span key={s} className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/50 font-medium text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Extracted Projects */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <FolderGit2 className="w-4 h-4 text-indigo-400" /> Extracted Portfolio Projects
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>JobPilot AI — Autonomous Job Search OS</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">High Complexity</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  Autonomous job search, fit scoring, application tracking, and recruiter outreach agent built with Next.js 14, Tailwind, and Gemini AI.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: AI Portfolio Analysis Dashboard */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Portfolio Strength
              </h3>
              <span className="text-xl font-extrabold text-amber-400 font-mono">88/100</span>
            </div>

            {/* Score category bars */}
            <div className="space-y-3 text-xs">
              {profileScores.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between font-medium text-slate-300 text-[11px]">
                    <span>{item.label}</span>
                    <span className="font-bold">{item.score}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="pt-3 border-t border-slate-800 text-xs space-y-2">
              <h4 className="font-bold text-emerald-400">AI Recommendations</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                💡 Adding 1 cloud-native microservices/Docker project will increase your enterprise recruiter response rates by 25%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
