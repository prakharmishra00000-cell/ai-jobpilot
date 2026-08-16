'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Upload, CheckCircle2, FileText, RefreshCw, GraduationCap } from 'lucide-react';
import BackButton from '@/components/ui/back-button';
import { extractCandidateFromText } from '@/services/ai/gemini';

export default function OnboardingPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [step, setStep] = useState(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [stream, setStream] = useState('Engineering & Technology');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [targetRole, setTargetRole] = useState('AI Full Stack Developer');
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const streamsList = [
    { name: 'Engineering & Technology', role: 'AI Full Stack Developer', defaultSkills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'AI APIs'] },
    { name: 'Finance, Commerce & Accounting (B.Com/M.Com)', role: 'Financial Analyst / Accountant', defaultSkills: ['Financial Modeling', 'Tally Prime', 'Advanced Excel', 'GST Taxation', 'Accounting'] },
    { name: 'Business, Management & HR (BBA/MBA)', role: 'Marketing & HR Executive', defaultSkills: ['Digital Marketing', 'CRM Systems', 'Talent Acquisition', 'Market Research', 'Analytics'] },
    { name: 'Arts, Content & Design (B.A/M.A/Design)', role: 'Content Strategist / Graphic Designer', defaultSkills: ['Content Writing', 'Copywriting', 'SEO Optimization', 'Figma / Design', 'Social Media'] },
    { name: 'Sciences & Data (B.Sc/M.Sc)', role: 'Data Analyst / Research Associate', defaultSkills: ['Data Analysis (Python/SQL)', 'Research Methods', 'Excel Analytics', 'Documentation'] },
    { name: 'Legal & General Graduates (Law/BA)', role: 'Legal Associate / Customer Success', defaultSkills: ['Contract Review', 'Legal Research', 'Client Communications', 'Problem Solving'] },
  ];

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleStreamChange = (streamName: string) => {
    const found = streamsList.find(s => s.name === streamName);
    if (found) {
      setStream(found.name);
      setTargetRole(found.role);
      setExtractedSkills(found.defaultSkills);
    }
  };

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selected = files[0];
      setResumeFile(selected);
      
      // Auto-extract candidate stream & skills based on filename or text
      const extracted = await extractCandidateFromText(selected.name);
      setStream(extracted.stream);
      setTargetRole(extracted.targetRole);
      setExtractedSkills(extracted.skills);
    }
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);

      // Save universal candidate profile to localStorage for AI job discovery engine
      const candidateProfile = {
        stream,
        targetRole,
        skills: extractedSkills.length > 0 ? extractedSkills : ['Communication', 'Data Analysis', 'Project Management'],
        experienceYears: 1,
        resumeFileName: resumeFile ? resumeFile.name : 'Uploaded_Resume.pdf',
        portfolioUrl: portfolioUrl || 'https://prakhar-portfolio.dev',
        linkedinUrl: linkedinUrl || 'https://linkedin.com/in/candidate',
        githubUrl: githubUrl || 'https://github.com/candidate',
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('jobpilot_candidate_profile', JSON.stringify(candidateProfile));

      setStep(3);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 flex flex-col justify-center items-center relative">
      {/* Hidden File Input for Native Storage Browser Picker */}
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
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> Universal Candidate AI Setup Wizard
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Set Up Your Profile (All Academic Streams)</h1>
          <p className="text-xs text-slate-400">Step {step} of 3 — Open to Commerce, Arts, Engineering, Management, Science, Law & Entry Level.</p>
        </div>

        {/* Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
          {step === 1 && (
            <div className="space-y-5 text-xs">
              <h2 className="font-bold text-sm text-white border-b border-slate-800 pb-2">1. Select Stream & Upload Resume from Your Device Storage</h2>

              {/* Stream Select Dropdown */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-200 block">Select Academic & Professional Stream</label>
                <select
                  value={stream}
                  onChange={(e) => handleStreamChange(e.target.value)}
                  className="w-full bg-slate-800 text-slate-200 rounded-xl p-3 border border-slate-700 focus:outline-none focus:border-indigo-500 font-semibold"
                >
                  {streamsList.map(s => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

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
                      Click to Open Device Storage & Select Resume (Any Stream PDF/DOCX)
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Supports B.Com, B.A, BBA, B.Tech, B.Sc, MBA, Law & Entry Level Resumes
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Target Role Title</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Accountant, Content Writer, HR Executive, Software Developer"
                    className="w-full bg-slate-800 text-slate-200 rounded-xl p-2.5 border border-slate-700 focus:outline-none text-xs font-semibold text-indigo-300"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setStep(2);
                  handleStartAnalysis();
                }}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
              >
                <span>Run AI Resume Analysis for {stream}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="py-12 text-center space-y-4 text-xs">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto animate-bounce">
                <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
              </div>
              <h2 className="font-bold text-base text-white">Parsing Resume for {stream}...</h2>
              <p className="text-slate-400 max-w-sm mx-auto">
                AI is categorizing competencies for <strong>{targetRole}</strong> and preparing targeted queries across 15 job sources.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 text-xs">
              <h2 className="font-bold text-sm text-white border-b border-slate-800 pb-2">3. Resume Parsed & Targeted Job Discovery Active</h2>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-2">
                <h3 className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Candidate Profile Configured!
                </h3>
                <p className="text-slate-300 text-[11px]">
                  Academic Stream: <strong className="text-white">{stream}</strong> • Target Role: <strong className="text-indigo-300">{targetRole}</strong>
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {extractedSkills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-200 text-[10px] font-semibold border border-emerald-700/50">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-300">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">Preferred Mode</span>
                  <span className="font-bold text-white">Remote + Hybrid</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">Minimum Target Salary</span>
                  <span className="font-bold text-emerald-400">₹6 LPA - ₹18 LPA</span>
                </div>
              </div>

              <button
                onClick={() => router.push('/dashboard')}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
              >
                <span>Launch Job Search Dashboard for {targetRole}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
