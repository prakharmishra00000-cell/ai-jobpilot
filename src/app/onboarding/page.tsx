'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Upload, CheckCircle2 } from 'lucide-react';
import BackButton from '@/components/ui/back-button';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [portfolioUrl, setPortfolioUrl] = useState('https://prakhar-portfolio.dev');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/in/prakhar-dev');
  const [githubUrl, setGithubUrl] = useState('https://github.com/prakhar-dev');
  const [targetRole, setTargetRole] = useState('AI Full Stack Developer');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 flex flex-col justify-center items-center relative">
      {/* Top Back Button */}
      <div className="absolute top-6 left-6">
        <BackButton label="Back to Home" />
      </div>

      <div className="w-full max-w-2xl space-y-6">
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 text-xs font-semibold border border-indigo-800/50">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Candidate AI Setup Wizard
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Set Up Your Candidate Profile</h1>
          <p className="text-xs text-slate-400">Step {step} of 3 — Let AI analyze your portfolio, skills, and job preferences.</p>
        </div>

        {/* Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
          {step === 1 && (
            <div className="space-y-5 text-xs">
              <h2 className="font-bold text-sm text-white border-b border-slate-800 pb-2">1. Connect Your Portfolio & Resume</h2>

              <div className="p-6 rounded-xl bg-slate-950 border border-dashed border-slate-700 text-center space-y-2">
                <Upload className="w-8 h-8 text-indigo-400 mx-auto" />
                <p className="font-semibold text-slate-200">Drag & Drop Resume (PDF) or click to browse</p>
                <p className="text-[11px] text-slate-400">Prakhar_Sharma_Resume_2026.pdf uploaded (Parsed)</p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Portfolio URL</label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    className="w-full bg-slate-800 text-slate-200 rounded-xl p-2.5 border border-slate-700 focus:outline-none text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full bg-slate-800 text-slate-200 rounded-xl p-2.5 border border-slate-700 focus:outline-none text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">GitHub Profile URL</label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="w-full bg-slate-800 text-slate-200 rounded-xl p-2.5 border border-slate-700 focus:outline-none text-xs"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setStep(2);
                  handleStartAnalysis();
                }}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
              >
                <span>Run AI Profile Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="py-12 text-center space-y-4 text-xs">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto animate-bounce">
                <Sparkles className="w-6 h-6 animate-spin" />
              </div>
              <h2 className="font-bold text-base text-white">Analyzing Portfolio & Extracting Skills...</h2>
              <p className="text-slate-400 max-w-sm mx-auto">
                AI is processing your projects, categorizing technical skills, and building your candidate profile.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 text-xs">
              <h2 className="font-bold text-sm text-white border-b border-slate-800 pb-2">3. Confirm Career Directions & Target Roles</h2>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
                <h3 className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI Profile Analysis Complete!
                </h3>
                <p className="text-slate-300 text-[11px]">
                  Portfolio Strength: <strong>88/100</strong> • Extracted 12 Skills (React, Next.js, Gemini API, Node.js)
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Target Role Title</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full bg-slate-800 text-slate-200 rounded-xl p-2.5 border border-slate-700 focus:outline-none text-xs font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-slate-300">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Preferred Mode</span>
                    <span className="font-bold text-white">Remote + Hybrid</span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Minimum Target Salary</span>
                    <span className="font-bold text-emerald-400">₹6 LPA+ ($60k+)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push('/dashboard')}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
              >
                <span>Launch Job Search Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
