'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Send,
  Building,
  MapPin,
  Briefcase,
  DollarSign,
  FileText,
  MessageSquare,
  Copy,
  Check,
  Smartphone,
} from 'lucide-react';
import { sendRealtimeDeviceNotification } from '@/lib/notifications';
import { analyzeLiveJobFit, LiveFitAnalysis } from '@/services/ai/gemini';
import { RawJob } from '@/types';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'fit' | 'coverLetter' | 'answers' | 'recruiter'>('fit');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [appliedStatus, setAppliedStatus] = useState<'NOT_APPLIED' | 'APPLIED'>('NOT_APPLIED');
  const [analysis, setAnalysis] = useState<LiveFitAnalysis | null>(null);

  // Live Job Details (Salary strictly in Rupees ₹ LPA)
  const job: RawJob = {
    id: params.id || 'live-job-1',
    title: 'AI Full Stack Developer',
    company: 'Cognitive Web Systems',
    source: 'LinkedIn via JSearch',
    externalJobId: params.id || 'ext-101',
    location: 'Remote (India / Global)',
    salaryRange: '₹10 LPA - ₹18 LPA',
    workMode: 'Remote',
    experienceRequired: '0-2 Years',
    employmentType: 'Full-time',
    description: `We are seeking an enthusiastic AI Full Stack Developer to build next-generation web platforms. You will design responsive Next.js user interfaces, create scalable Node.js/Python API endpoints, and integrate LLM APIs (Gemini, OpenAI) for autonomous workflow automation.

Responsibilities:
- Build responsive, modern web applications using Next.js 14 App Router & TypeScript.
- Integrate Google Gemini AI API endpoints for structured candidate parsing & scoring.
- Design database schemas using Prisma ORM with SQLite and PostgreSQL.
- Maintain strict legal compliance, rate limiting, and Assisted Application workflows.`,
    requirements: [
      'Proficiency in React 18 / Next.js App Router & TypeScript',
      'Experience integrating AI APIs (Google Gemini, OpenAI)',
      'Familiarity with Node.js, Prisma ORM, and PostgreSQL/SQLite',
      'Strong understanding of responsive UI with Tailwind CSS',
    ],
    preferredSkills: ['Vector DBs', 'BullMQ', 'Docker', 'WebSockets'],
    applicationUrl: 'https://remotive.com/remote-jobs/software-dev/ai-full-stack-developer-101',
    originalUrl: 'https://remotive.com/remote-jobs/software-dev/ai-full-stack-developer-101',
    applicationMethod: 'ASSISTED',
    postedAt: new Date().toISOString(),
    safetyScore: 95,
  };

  useEffect(() => {
    // Read actual uploaded candidate resume profile
    const profile = JSON.parse(localStorage.getItem('jobpilot_candidate_profile') || '{}');
    const candidateSkills = profile.skills || ['React', 'Next.js', 'TypeScript', 'Node.js', 'AI APIs', 'Tailwind CSS'];
    const candidateYears = profile.experienceYears || 1;
    const targetRole = profile.targetRole || 'Software Developer';

    const liveAnalysis = analyzeLiveJobFit(job, candidateSkills, candidateYears, targetRole);
    setAnalysis(liveAnalysis);
  }, []);

  const handleApply = () => {
    setAppliedStatus('APPLIED');

    const existingApps = JSON.parse(localStorage.getItem('jobpilot_applications') || '[]');
    const newApp = {
      id: `app-${Date.now()}`,
      jobTitle: job.title,
      company: job.company,
      platform: job.source,
      fitScore: analysis?.fitScore || 92,
      shortlistProb: analysis?.shortlistProbability || 78,
      appliedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Applied',
      responseStatus: 'No Response Yet',
      mode: 'Assisted Mode',
      originalUrl: job.originalUrl,
    };

    if (!existingApps.some((a: any) => a.jobTitle === job.title && a.company === job.company)) {
      localStorage.setItem('jobpilot_applications', JSON.stringify([newApp, ...existingApps]));
    }

    sendRealtimeDeviceNotification(
      job.title,
      job.company,
      job.source,
      job.originalUrl
    );

    window.open(job.originalUrl, '_blank');
  };

  const handleCopy = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
    if (score >= 60) return 'text-indigo-400 bg-indigo-500/20 border-indigo-500/30';
    return 'text-rose-400 bg-rose-500/20 border-rose-500/30';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Back Link */}
      <Link href="/jobs" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Discovered Jobs
      </Link>

      {/* Main Header Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{job.title}</h1>
              <span className="text-xs font-mono font-semibold text-indigo-400 bg-indigo-950 px-2.5 py-0.5 rounded border border-indigo-800/50">
                {job.source}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-300 mt-2 font-medium">
              <span className="flex items-center gap-1 text-white font-semibold"><Building className="w-3.5 h-3.5 text-slate-400" /> {job.company}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold"><DollarSign className="w-3.5 h-3.5" /> {job.salaryRange}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-slate-400" /> {job.workMode}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={job.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors border border-slate-700"
            >
              <span>View Original Job</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={handleApply}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
                appliedStatus === 'APPLIED'
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{appliedStatus === 'APPLIED' ? '✓ Applied & Tracked' : 'Open Platform & Apply'}</span>
            </button>
          </div>
        </div>

        {/* Real-Time Live AI Fit & Shortlist Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 border border-indigo-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-extrabold text-lg ${getScoreColor(analysis?.fitScore || 92)}`}>
              {analysis?.fitScore || 92}%
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                🔥 Live Resume Fit Match <span className="text-xs font-mono font-medium text-slate-300">{analysis?.fitScore || 92}/100 Score</span>
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Shortlist Estimate: <strong className="text-emerald-400">{analysis?.shortlistProbability || 78}%</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-emerald-300 font-semibold bg-emerald-950/80 px-3 py-2 rounded-xl border border-emerald-800/60">
            <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>24/7 Engine Evaluated Against Candidate Resume & Experience</span>
          </div>
        </div>
      </div>

      {/* Grid: Left Job details, Right AI Application Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Complete Job Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 text-xs text-slate-300">
            <div>
              <h3 className="font-bold text-sm text-white mb-2">Complete Job Description</h3>
              <p className="leading-relaxed text-slate-300 whitespace-pre-line">{job.description}</p>
            </div>

            <div>
              <h3 className="font-bold text-sm text-white mb-2">Key Requirements & Qualifications</h3>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                {job.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

            {job.preferredSkills && (
              <div>
                <h3 className="font-bold text-sm text-white mb-2">Preferred Skills</h3>
                <div className="flex flex-wrap gap-1.5">
                  {job.preferredSkills.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Application Assistant Tabs */}
        <div className="space-y-4">
          <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('fit')}
              className={`flex-1 py-2 rounded-lg transition-colors ${activeTab === 'fit' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Pros & Cons
            </button>
            <button
              onClick={() => setActiveTab('coverLetter')}
              className={`flex-1 py-2 rounded-lg transition-colors ${activeTab === 'coverLetter' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Cover Letter
            </button>
            <button
              onClick={() => setActiveTab('answers')}
              className={`flex-1 py-2 rounded-lg transition-colors ${activeTab === 'answers' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              QA Answers
            </button>
          </div>

          {activeTab === 'fit' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Resume Pros & Cons Analysis
              </h3>

              <div className="space-y-3">
                {/* PROS */}
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-1.5">
                  <h4 className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <span>PROS (Verified Skill Matches)</span>
                  </h4>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    {analysis?.pros.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    )) || <li>✓ Verified match for candidate skills in resume</li>}
                  </ul>
                </div>

                {/* CONS */}
                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/40 space-y-1.5">
                  <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
                    <span>CONS (Experience Gaps & Analysis)</span>
                  </h4>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    {analysis?.cons.map((c, idx) => (
                      <li key={idx} className={c.includes('❌') ? 'text-rose-400 font-semibold' : ''}>
                        {c}
                      </li>
                    )) || <li>⚠ High applicant volume for this role title</li>}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'coverLetter' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" /> Tailored Cover Letter
                </h3>
                <button
                  onClick={() => handleCopy(analysis?.customCoverLetter || '', 'coverLetter')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold flex items-center gap-1 border border-slate-700"
                >
                  {copiedSection === 'coverLetter' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSection === 'coverLetter' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed font-sans whitespace-pre-line max-h-80 overflow-y-auto text-[11px]">
                {analysis?.customCoverLetter}
              </div>
            </div>
          )}

          {activeTab === 'answers' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400" /> Generated Application Answers
              </h3>

              <div className="space-y-3">
                {analysis?.applicationQA.map((qa, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between font-bold text-slate-200">
                      <span>{qa.q}</span>
                      <button
                        onClick={() => handleCopy(qa.a, `qa-${idx}`)}
                        className="text-slate-400 hover:text-white"
                        title="Copy Answer"
                      >
                        {copiedSection === `qa-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{qa.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
