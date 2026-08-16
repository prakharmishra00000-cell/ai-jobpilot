import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Briefcase, FileCheck, CheckCircle2, Star, Code2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white antialiased">
      {/* Top Header Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              JobPilot <span className="text-xs bg-indigo-500/20 text-indigo-400 font-mono px-1.5 py-0.5 rounded border border-indigo-500/30">AI</span>
            </span>
          </Link>

          {/* Developer Tag */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-indigo-300 text-xs font-semibold">
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
              Developed by Prakhar Mishra
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
            >
              Sign In
            </Link>
            <Link
              href="/onboarding"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
            >
              Analyze My Portfolio
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-800/50 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-amber-400" /> Powered by Google Gemini AI & 15 Multi-Source Job Adapters
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Your Autonomous Job Search & <br />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
            Application Agent
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Find better opportunities, understand your multi-factor AI fit score, personalize every application, and track your entire job search from one intelligent workspace.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-600/30 hover:scale-105"
          >
            <span>Analyze My Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-800 transition-all hover:scale-105"
          >
            Start Job Search Dashboard
          </Link>
        </div>

        {/* Feature Pill Highlights */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Permitted & Responsible</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Multi-Source Deduplication</span>
          <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400" /> Multi-Factor AI Fit Scoring</span>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 px-6 max-w-6xl mx-auto border-t border-slate-800/80 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Built as a Complete Career Operating System</h2>
          <p className="text-xs text-slate-400">Everything required from portfolio extraction to application CRM tracking.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">AI Portfolio Extraction</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Analyzes candidate resumes, portfolio links, and GitHub repos to extract skills, project complexity, and portfolio strength metrics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Multi-Source Discovery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Queries Remotive, JSearch (LinkedIn/Indeed), Adzuna, and company career feeds with automatic deduplication.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Assisted Application CRM</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates customized cover letters and application answers while opening original job platform links.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-400">JobPilot AI — Autonomous Job Search & Application Agent</p>
        <p className="mt-1 text-indigo-400 font-medium">Developed by Prakhar Mishra</p>
      </footer>
    </div>
  );
}
