'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  FileCheck,
  Zap,
  MessageSquare,
  BarChart3,
  User,
  Settings,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Jobs Discovery', href: '/jobs', icon: Briefcase },
  { name: 'Applications CRM', href: '/applications', icon: FileCheck },
  { name: '24/7 Automation', href: '/automation', icon: Zap },
  { name: 'Responses', href: '/responses', icon: MessageSquare },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Candidate Profile', href: '/profile', icon: User },
  { name: 'Settings & Guide', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800/80 text-slate-300 min-h-screen sticky top-0 z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-lg text-white tracking-tight leading-none flex items-center gap-1.5">
              JobPilot <span className="text-xs bg-indigo-500/20 text-indigo-400 font-mono px-1.5 py-0.5 rounded border border-indigo-500/30">AI</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Autonomous Job Agent</p>
          </div>
        </Link>
      </div>

      {/* Mode Badge */}
      <div className="px-4 py-3 mx-3 mt-4 bg-slate-800/60 rounded-xl border border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-200">Live Agent Active</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded font-mono border border-emerald-800/50">
          Assisted Mode
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
                <span>{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-200" />}
            </Link>
          );
        })}
      </nav>

      {/* Safety & Compliance Badge */}
      <div className="m-3 p-3.5 bg-indigo-950/40 border border-indigo-800/40 rounded-xl">
        <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs mb-1">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>100% Compliant</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Uses authorized APIs & Assisted Apply. Zero bot bans, zero fake data.
        </p>
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-slate-800/80 flex items-center justify-between bg-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow">
            PS
          </div>
          <div className="truncate">
            <p className="text-xs font-semibold text-white truncate">Prakhar Sharma</p>
            <p className="text-[10px] text-slate-400 truncate">AI Full Stack Developer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
