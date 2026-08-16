'use client';

import React from 'react';
import { MessageSquare, Sparkles, CheckCircle2, Calendar, Mail, ArrowUpRight } from 'lucide-react';

export default function ResponsesPage() {
  const responses = [
    {
      id: 'res-1',
      company: 'HyperScale AI',
      jobTitle: 'Frontend AI Web Developer',
      type: 'Interview Invitation',
      confidence: 96,
      date: '14 Aug 2026, 6:42 PM',
      snippet: 'Hi Prakhar, thank you for submitting your application for the Frontend AI Web Developer role! We were impressed by your JobPilot AI project and would love to invite you for a 30-minute technical interview.',
      actionText: 'Schedule Technical Interview',
    },
    {
      id: 'res-2',
      company: 'Apex Data Labs',
      jobTitle: 'Junior Software Engineer',
      type: 'Technical Assessment Received',
      confidence: 92,
      date: '12 Aug 2026, 3:15 PM',
      snippet: 'Hi Prakhar, please find attached the link to our online coding assessment (React + Next.js). Please complete it within 48 hours.',
      actionText: 'Open Coding Assessment',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Employer & Recruiter Responses <MessageSquare className="w-5 h-5 text-emerald-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            AI classifies incoming communication (Interview Requests, Assessments, Confirmations).
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {responses.map((res) => (
          <div key={res.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                    🎯 {res.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Confidence: {res.confidence}%</span>
                </div>
                <h3 className="font-bold text-base text-white mt-1">{res.company}</h3>
                <p className="text-xs text-slate-400">{res.jobTitle}</p>
              </div>

              <span className="text-xs text-slate-400 font-mono">{res.date}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
              "{res.snippet}"
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-indigo-600/30">
                <span>{res.actionText}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
