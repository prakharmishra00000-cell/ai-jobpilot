'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Bell, Sparkles, SlidersHorizontal, Code2, Smartphone } from 'lucide-react';
import BackButton from '@/components/ui/back-button';
import { requestNotificationPermission } from '@/lib/notifications';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: string;
  url: string;
}

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [devicePermission, setDevicePermission] = useState<boolean>(false);
  const [notifications] = useState<NotificationItem[]>([
    {
      id: 'init-1',
      title: '⚡ System Initialized',
      desc: '15 connected job sources active and polling live APIs.',
      time: 'Just now',
      type: 'system',
      url: '/jobs',
    },
  ]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setDevicePermission(Notification.permission === 'granted');
    }
  }, []);

  const handleEnableDeviceNotifications = async () => {
    const granted = await requestNotificationPermission();
    setDevicePermission(granted);
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 lg:px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Global Back Button & Search Input */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <BackButton label="Back" />

        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search discovered jobs, skills, companies..."
            className="w-full bg-slate-800/80 text-slate-200 text-xs rounded-xl pl-10 pr-4 py-2 border border-slate-700/60 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Action Controls & Developer Badge */}
      <div className="flex items-center gap-3">
        {/* Enable Real-time Device Push Notification Button */}
        <button
          onClick={handleEnableDeviceNotifications}
          className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
            devicePermission
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
              : 'bg-indigo-950/80 text-indigo-300 border-indigo-800/60 hover:bg-indigo-900'
          }`}
          title="Receive instant real-time notifications on your device when a job is applied"
        >
          <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
          <span>{devicePermission ? 'Device Push Active' : 'Enable Device Push Alerts'}</span>
        </button>

        {/* Developed by Prakhar Mishra Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-indigo-300 text-xs font-semibold">
          <Code2 className="w-3.5 h-3.5 text-indigo-400" />
          <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
            Developed by Prakhar Mishra
          </span>
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
              {notifications.length}
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Live System Notifications
                </h4>
                <span className="text-[10px] text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded font-mono">
                  Real-Time
                </span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    onClick={() => setShowNotifications(false)}
                    className="block p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 transition-colors text-xs group"
                  >
                    <div className="flex items-center justify-between font-semibold text-slate-200 group-hover:text-indigo-300">
                      <span>{item.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-1 leading-snug">{item.desc}</p>
                  </Link>
                ))}
              </div>

              <div className="pt-3 mt-2 border-t border-slate-800 text-right text-[11px]">
                <Link
                  href="/responses"
                  onClick={() => setShowNotifications(false)}
                  className="font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  View All Activity →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick Settings Link */}
        <Link
          href="/settings"
          className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700/80 transition-colors"
          title="Settings"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
}
