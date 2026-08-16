'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Sparkles,
  Inbox,
  ArrowRight,
} from 'lucide-react';

interface ResponseItem {
  id: string;
  company: string;
  jobTitle: string;
  sender: string;
  type: string;
  sentiment: string;
  date: string;
  summary: string;
  recommendedAction: string;
  originalUrl: string;
}

export default function ResponsesPage() {
  const [responses, setResponses] = useState<ResponseItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('jobpilot_responses');
    if (saved) {
      try {
        setResponses(JSON.parse(saved));
      } catch (e) {
        setResponses([]);
      }
    } else {
      setResponses([]);
    }
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Employer Responses & AI Classifier <MessageSquare className="w-5 h-5 text-indigo-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time classification of incoming emails, recruiter outreach, and interview invitations.
          </p>
        </div>
      </div>

      {/* Responses List or Authentic Empty State */}
      {responses.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-indigo-950 text-indigo-400 border border-indigo-800/50 flex items-center justify-center mx-auto">
            <Inbox className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-white">No Responses Detected Yet</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Once you submit job applications, incoming recruiter replies, interview invitations, and status updates will be automatically parsed, classified, and shown here in real-time.
            </p>
          </div>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/30"
          >
            <Sparkles className="w-4 h-4" />
            <span>Discover & Apply to Jobs</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {responses.map((item) => (
            <div key={item.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">{item.company} — {item.jobTitle}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">From: {item.sender} • {item.date}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 font-bold text-[10px] border border-emerald-800">
                  {item.type}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
