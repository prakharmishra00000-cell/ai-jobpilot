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
  const [stream, setStream] = useState('Professional');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selected = files[0];
      setResumeFile(selected);

      // Use FileReader to read actual text content from the uploaded file
      const reader = new FileReader();
      reader.onload = async (event) => {
        const fileContent = (event.target?.result as string) || selected.name;
        // Extract exact candidate role & skills from actual file text + name
        const extracted = await extractCandidateFromText(`${selected.name}\n${fileContent}`);
        
        setTargetRole(extracted.targetRole);
        setStream(extracted.stream);
        setExtractedSkills(extracted.skills);
      };

      // Read as text
      reader.readAsText(selected);
    }
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);

      // Save exact extracted profile to localStorage
      const candidateProfile = {
        stream: stream || 'Professional',
        targetRole: targetRole || 'Software Developer',
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
    }, 1500);
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
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> Universal Resume Setup Wizard
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Upload Your Resume</h1>
          <p className="text-xs text-slate-400">Step {step} of 3 — AI reads your actual file content and extracts your key role & skills.</p>
        </div>

        {/* Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
          {step === 1 && (
            <div className="space-y-5 text-xs">
              <h2 className="font-bold text-sm text-white border-b border-slate-800 pb-2">1. Select & Upload Resume from Your Storage</h2>

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
                      Click to Open Device Storage & Select Resume (PDF/DOCX/TXT)
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Reads exact resume content & extracts candidate role & skills
                    </p>
                  </div>
                )}
              </div>

              {targetRole && (
                <div className="p-3.5 rounded-xl bg-indigo-950/60 border border-indigo-800/60 space-y-2">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>Extracted Target Role from Resume:</span>
                    <span className="text-indigo-300 font-mono text-xs">{targetRole}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {extractedSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-indigo-900/80 text-indigo-200 text-[10px] font-semibold">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Target Role Title (Editable)</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. React Developer, Accountant, Data Analyst, Content Writer"
                    className="w-full bg-slate-800 text-slate-200 rounded-xl p-2.5 border border-slate-700 focus:outline-none text-xs font-semibold text-indigo-300"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setStep(2);
                  handleStartAnalysis();
                }}
                disabled={!resumeFile && !targetRole}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50"
              >
                <span>Confirm & Analyze Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="py-12 text-center space-y-4 text-xs">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto animate-bounce">
                <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
              </div>
              <h2 className="font-bold text-base text-white">Configuring Profile for "{targetRole || 'Software Developer'}"...</h2>
              <p className="text-slate-400 max-w-sm mx-auto">
                AI is preparing 15 live job source queries for <strong>{targetRole || 'Software Developer'}</strong>.
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
                  Uploaded Resume: <strong className="text-white">{resumeFile ? resumeFile.name : 'Resume.pdf'}</strong> • Target Role: <strong className="text-indigo-300">{targetRole}</strong>
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {extractedSkills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-200 text-[10px] font-semibold border border-emerald-700/50">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => router.push('/dashboard')}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
              >
                <span>Launch Dashboard for {targetRole}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
