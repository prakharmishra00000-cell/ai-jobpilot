'use client';

import React, { useState } from 'react';
import { Settings, Sliders, ShieldCheck, Save, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [targetRoles, setTargetRoles] = useState('AI Full Stack Developer, Full Stack Engineer, Frontend AI Developer');
  const [locations, setLocations] = useState('India, Remote, Bengaluru, Delhi NCR, Worldwide Remote');
  const [salary, setSalary] = useState('₹6 LPA+ ($60,000+ USD)');
  const [experience, setExperience] = useState('Fresher / 0-1 years');
  const [verifyLinkEnabled, setVerifyLinkEnabled] = useState(true);
  const [notifyOnApply, setNotifyOnApply] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Job Search Preferences & Settings <Settings className="w-5 h-5 text-indigo-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Customize your target roles, verification link settings, and application tracking notifications.
          </p>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 text-xs shadow-xl">
        <h2 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Sliders className="w-4 h-4 text-indigo-400" /> Target Career Preferences
        </h2>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-200 block">Target Job Roles (Comma-separated)</label>
            <input
              type="text"
              value={targetRoles}
              onChange={(e) => setTargetRoles(e.target.value)}
              className="w-full bg-slate-800 text-slate-200 rounded-xl p-3 border border-slate-700 focus:outline-none focus:border-indigo-500"
              placeholder="e.g. AI Full Stack Developer, Full Stack Engineer"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-200 block">Preferred Locations</label>
            <input
              type="text"
              value={locations}
              onChange={(e) => setLocations(e.target.value)}
              className="w-full bg-slate-800 text-slate-200 rounded-xl p-3 border border-slate-700 focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Remote, India, Worldwide Remote"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-200 block">Minimum Target Salary</label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full bg-slate-800 text-slate-200 rounded-xl p-3 border border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-200 block">Experience Level</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full bg-slate-800 text-slate-200 rounded-xl p-3 border border-slate-700 focus:outline-none focus:border-indigo-500"
              >
                <option value="Fresher / 0-1 years">Fresher / 0-1 years</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
          </div>
        </div>

        {/* NEW SETTING: Application Verification Links */}
        <div className="pt-4 border-t border-slate-800 space-y-4">
          <h2 className="font-bold text-sm text-white flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-emerald-400" /> Application Link Verification & Notifications
          </h2>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Always Provide Official Verification Link for Every Applied Job</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  When a job is applied (manually or automatically), JobPilot AI attaches the original job platform URL so you can verify submission directly on the target site.
                </p>
              </div>
              <input
                type="checkbox"
                checked={verifyLinkEnabled}
                onChange={(e) => setVerifyLinkEnabled(e.target.checked)}
                className="w-4 h-4 accent-indigo-500 shrink-0"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Send Immediate Verification Notification on Apply</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Receive an immediate notification containing the direct official job link as soon as an application is completed or prepared.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifyOnApply}
                onChange={(e) => setNotifyOnApply(e.target.checked)}
                className="w-4 h-4 accent-indigo-500 shrink-0"
              />
            </div>
          </div>
        </div>

        {/* Compliance Footer */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>All application links are verified authentic before delivery.</span>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saved ? '✓ Preferences & Link Rules Saved' : 'Save Preferences'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
