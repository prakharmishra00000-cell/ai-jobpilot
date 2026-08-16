'use client';

import React from 'react';
import {
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Briefcase,
  FileCheck,
  MessageSquare,
  User,
  ArrowRight,
  ExternalLink,
  Check,
  Lock,
} from 'lucide-react';
import Link from 'next/link';

export default function PlatformGuidePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-indigo-800/50 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              JobPilot AI — Verification, Platforms & Operational Guide
            </h1>
            <p className="text-xs text-slate-300">
              How to verify live applications, supported platform integrations, and Render cloud deployment behavior.
            </p>
          </div>
        </div>
      </div>

      {/* QUESTION 1: How do I verify the AI is really working and not misguiding? */}
      <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs shadow-lg">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" /> 1. How to Verify the AI is Really Finding & Applying to Jobs
        </h2>

        <p className="text-slate-300 leading-relaxed">
          JobPilot AI provides <strong>3 layers of live verification</strong> so you can prove the AI is processing real jobs and preparing actual submissions:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <h3 className="font-bold text-indigo-300 text-xs">A. Live Audit Trail</h3>
            <p className="text-[11px] text-slate-400 leading-snug">
              Every job scan, fit score calculation, and application package generated is logged live with exact timestamps inside your <strong>Dashboard Activity Log</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <h3 className="font-bold text-indigo-300 text-xs">B. Verifiable Job URLs</h3>
            <p className="text-[11px] text-slate-400 leading-snug">
              Every job card features a <em>View Original Job</em> button linking directly to the actual company career page, LinkedIn, Indeed, or Remotive URL.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <h3 className="font-bold text-indigo-300 text-xs">C. CRM Stored Documents</h3>
            <p className="text-[11px] text-slate-400 leading-snug">
              Inside <strong>/applications</strong>, inspect the exact cover letters generated, stored resume versions, and application answers prepared per job.
            </p>
          </div>
        </div>
      </section>

      {/* QUESTION 2: Render Deployment & No Public API Platforms */}
      <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs shadow-lg">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <Zap className="w-5 h-5 text-amber-400" /> 2. After Adding API Keys in Render, Do Users Need to Connect Platforms Manually?
        </h2>

        <div className="space-y-3 text-slate-300 leading-relaxed">
          <p>
            <strong>No! Users never need to manually connect platforms or input API keys.</strong> Once you set your environment variables on Render (`GEMINI_API_KEY`, `JSEARCH_API_KEY`, etc.), the entire server handles discovery and scoring automatically.
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="font-bold text-white text-xs">How JobPilot AI Handles Platforms Without Open Auto-Apply APIs:</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Major job portals like LinkedIn, Indeed, Internshala, and Naukri do not offer free open-access auto-apply APIs for third-party scripts. Attempting to use unauthorized headless bots to bypass logins causes user accounts to get permanently banned.
            </p>
            <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
              Instead, JobPilot AI uses <strong>Assisted Application Mode</strong>: AI generates the tailored cover letter, custom answers, and resume emphasis points, then provides a 1-click button that opens the original job page. The candidate pastes the pre-generated text and submits in seconds—safely and legally!
            </p>
          </div>
        </div>
      </section>

      {/* QUESTION 3: All Supported Platforms Matrix */}
      <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs shadow-lg">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <Briefcase className="w-5 h-5 text-indigo-400" /> 3. Full List of Supported Job Platforms
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold">
                <th className="py-2.5 px-3">Platform</th>
                <th className="py-2.5 px-3">Access Mechanism</th>
                <th className="py-2.5 px-3">Application Mode</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">Remotive Jobs</td>
                <td className="py-2.5 px-3 text-slate-400">Direct Public API Feed</td>
                <td className="py-2.5 px-3 text-emerald-400 font-semibold">Direct Feed / Assisted</td>
                <td className="py-2.5 px-3"><span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">● Active</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">Greenhouse Career Boards</td>
                <td className="py-2.5 px-3 text-slate-400">Direct Public JSON Feed</td>
                <td className="py-2.5 px-3 text-emerald-400 font-semibold">Autonomous / Assisted</td>
                <td className="py-2.5 px-3"><span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">● Active</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">Lever Career Boards</td>
                <td className="py-2.5 px-3 text-slate-400">Direct Public JSON Feed</td>
                <td className="py-2.5 px-3 text-emerald-400 font-semibold">Autonomous / Assisted</td>
                <td className="py-2.5 px-3"><span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">● Active</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">Adzuna Employment Portal</td>
                <td className="py-2.5 px-3 text-slate-400">Official API</td>
                <td className="py-2.5 px-3 text-emerald-400 font-semibold">Assisted Mode</td>
                <td className="py-2.5 px-3"><span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">● Active</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">LinkedIn</td>
                <td className="py-2.5 px-3 text-slate-400">JSearch Aggregator</td>
                <td className="py-2.5 px-3 text-indigo-300 font-semibold">Assisted Apply Mode</td>
                <td className="py-2.5 px-3"><span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">● Active</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">Indeed</td>
                <td className="py-2.5 px-3 text-slate-400">JSearch Aggregator</td>
                <td className="py-2.5 px-3 text-indigo-300 font-semibold">Assisted Apply Mode</td>
                <td className="py-2.5 px-3"><span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">● Active</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">Internshala & Naukri</td>
                <td className="py-2.5 px-3 text-slate-400">Public Page Aggregation</td>
                <td className="py-2.5 px-3 text-indigo-300 font-semibold">Assisted Apply Mode</td>
                <td className="py-2.5 px-3"><span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">● Active</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">Wellfound & Glassdoor</td>
                <td className="py-2.5 px-3 text-slate-400">Public Page Aggregation</td>
                <td className="py-2.5 px-3 text-indigo-300 font-semibold">Assisted Apply Mode</td>
                <td className="py-2.5 px-3"><span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">● Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Operational 4 Steps */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <BookOpen className="w-5 h-5 text-indigo-400" /> 4. Operational Summary for End-Users
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" /> Step 1: Upload Resume & Portfolio
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Upload resume PDF or enter portfolio/GitHub URLs. AI extracts 12 skill categories and calculates your Portfolio Strength rating.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-400" /> Step 2: Jobs Discovery & AI Scoring
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Click <em>Run Job Scan Now</em>. Jobs are deduplicated, matched against candidate profile, and assigned an 8-factor AI Fit Score (0-100%).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Step 3: Application Materials Generator
            </h3>
            <p className="text-slate-300 leading-relaxed">
              AI generates tailored cover letters and QA answers (*"Why join us?"*, *"Why suitable?"*). Click <em>Open Platform & Apply</em> to submit.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-violet-400" /> Step 4: Application CRM & 24/7 Auto
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Track submitted applications inside Applications CRM. Enable 24/7 background automation to continuously discover newly posted jobs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
