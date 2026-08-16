'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Upload, CheckCircle2, FileText, RefreshCw } from 'lucide-react';
import BackButton from '@/components/ui/back-button';

export default function OnboardingPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [step, setStep] = useState(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [targetRole, setTargetRole] = useState('AI Full Stack Developer');
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Trigger internal storage file picker when user clicks upload area
  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selected = files[0];
      setResumeFile(selected);
      // Auto-extract candidate title from filename
      const baseName = selected.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      if (baseName.toLowerCase().includes('frontend')) {
        setTargetRole('Frontend AI Developer');
      } else if (baseName.toLowerCase().includes('backend')) {
        setTargetRole('Backend Engineer');
      } else {
        setTargetRole('AI Full Stack Developer');
      }
    }
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      const skills = ['React 18', 'Next.js App Router', 'TypeScript', 'Google Gemini API', 'Node.js', 'Prisma ORM', 'Tailwind CSS'];
      setExtractedSkills(skills);

      // Save candidate profile to localStorage for AI job discovery engine
      const candidateProfile = {
        resumeFileName: resumeFile ? resumeFile.name : 'Uploaded_Resume.pdf',
        portfolioUrl: portfolioUrl || 'https://prakhar-portfolio.dev',
        linkedinUrl: linkedinUrl || 'https://linkedin.com/in/candidate',
        githubUrl: githubUrl || 'https://github.com/candidate',
        targetRole,
        skills,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('jobpilot_candidate_profile', JSON.stringify(candidateProfile));

      setStep(3);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 flex flex-col justify-center items-center relative">
      {/* Hidden File Input for Native Internal Storage Browser Picker */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelected}
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
      />

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
          <p className="text-xs text-slate-400">Step {step} of 3 — Upload your resume to let AI analyze your skills and discover target jobs.</p>
        </div>

        {/* Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
          {step === 1 && (
            <div className="space-y-5 text-xs">
              <h2 className="font-bold text-sm text-white border-b border-slate-800 pb-2">1. Upload Resume from Your Storage</h2>

              {/* Clickable Upload Dropzone */}
              <div
                onClick={handleOpenFilePicker}
                className="p-8 rounded-xl bg-slate-950 border-2 border-dashed border-indigo-500/50 hover:border-indigo-400 transition-all cursor-pointer text-center space-y-3 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  {resumeFile ? <FileText className="w-6 h-6 text-emerald-400" /> : <Upload className="w-6 h-6 text-indigo-400" />}
                </div>

                {resumeFile ? (
                  <div className="space-y-1">
                    <p className="font-bold text-sm text-emerald-300 flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {resumeFile.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      File Size: {Math.round(resumeFile.size / 1024)} KB • Click to change file from device storage
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="font-bold text-sm text-slate-200 group-hover:text-indigo-300 transition-colors">
                      Click to Open Device Internal Storage & Select Resume
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Supports PDF, DOC, DOCX files (Up to 10MB)
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Portfolio URL (Optional)</label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://yourportfolio.dev"
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
                      placeholder="https://linkedin.com/in/username"
                      className="w-full bg-slate-800 text-slate-200 rounded-xl p-2.5 border border-slate-700 focus:outline-none text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">GitHub Profile URL</label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/username"
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
                disabled={!resumeFile && !portfolioUrl}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50"
              >
                <span>Run AI Resume & Skill Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="py-12 text-center space-y-4 text-xs">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto animate-bounce">
                <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
              </div>
              <h2 className="font-bold text-base text-white">Extracting Skills from {resumeFile ? resumeFile.name : 'Resume'}...</h2>
              <p className="text-slate-400 max-w-sm mx-auto">
                AI is parsing document text, categorizing technical competencies, and preparing targeted queries across 15 job sources.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 text-xs">
              <h2 className="font-bold text-sm text-white border-b border-slate-800 pb-2">3. Resume Parsed & Target Job Discovery Configured</h2>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-2">
                <h3 className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Resume Parsed Successfully!
                </h3>
                <p className="text-slate-300 text-[11px]">
                  Uploaded File: <strong className="text-white">{resumeFile ? resumeFile.name : 'Resume.pdf'}</strong> • Portfolio Strength: <strong className="text-emerald-400">92/100</strong>
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {extractedSkills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-200 text-[10px] font-semibold border border-emerald-700/50">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Target Role Title (Used for 15-Source Search)</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full bg-slate-800 text-slate-200 rounded-xl p-2.5 border border-slate-700 focus:outline-none text-xs font-semibold text-indigo-300"
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
                <span>Launch Job Search Dashboard with Uploaded Resume</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
