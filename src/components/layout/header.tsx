'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, Sparkles, SlidersHorizontal, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: '1',
      title: '🔥 New High-Fit Job Found',
      desc: 'AI Full Stack Developer at Cognitive Web Systems (Fit: 94%)',
      time: '18m ago',
      type: 'high-fit',
    },
    {
      id: '2',
      title: '📩 Application Confirmation',
      desc: 'Applied to HyperScale AI (Assisted Mode Confirmed)',
      time: '1h ago',
      type: 'confirmation',
    },
    {
      id: '3',
      title: '⚡ Scan Completed',
      desc: 'Discovered 14 relevant listings across JSearch & Remotive',
      time: '2h ago',
      type: 'scan',
    },
  ];

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 lg:px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Search Input */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search discovered jobs, skills, companies..."
            className="w-full bg-slate-800/80 text-slate-200 text-xs rounded-xl pl-10 pr-4 py-2 border border-slate-700/60 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        {/* Source Health Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>3 Sources Synced</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700/80 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center border-2 border-slate-900">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Notifications
                </h4>
                <span className="text-[10px] text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded font-mono">
                  3 Unread
                </span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 transition-colors text-xs"
                  >
                    <div className="flex items-center justify-between font-semibold text-slate-200">
                      <span>{item.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-1 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 mt-2 border-t border-slate-800 text-center">
                <Link
                  href="/responses"
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  View All Activity & Responses →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick Settings Link */}
        <Link
          href="/settings"
          className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700/80 transition-colors"
          title="Settings & Setup Guide"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
}
