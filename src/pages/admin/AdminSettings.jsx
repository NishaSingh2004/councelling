import React, { useState } from 'react';
import { Settings, Save, ShieldAlert, Key, Sliders, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminSettings() {
  const { addNotification } = useApp();
  const [profile, setProfile] = useState({
    name: 'Vanshika Singh',
    email: 'vanshika@vanshikacounselling.com',
    title: 'Lead Clinical Psychologist & Founder',
    price: 1500
  });

  const [systemConfigs, setSystemConfigs] = useState({
    sessionLength: '50 Minutes',
    videoQuality: 'High Definition (1080p)',
    notifyEmail: true,
    notifySms: true
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    addNotification('Therapist profile settings saved.', 'success');
  };

  const handleSystemSave = (e) => {
    e.preventDefault();
    addNotification('System telehealth settings saved.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
          Settings & Configurations
        </h1>
        <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
          Configure clinical parameters, calendar slot defaults, and session video features.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Profile Details (Col-7) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleProfileSave} className="premium-card p-6 md:p-8 space-y-6">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-beige-100 dark:border-sage-800 pb-4">
              Therapist Profile Details
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">Professional Title Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full px-4 py-3 bg-beige-50 dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="w-full px-4 py-3 bg-beige-50 dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">Bio Subtitle Designation</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({...profile, title: e.target.value})}
                  className="w-full px-4 py-3 bg-beige-50 dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">Default Consultation Hourly Fee (₹)</label>
                <input
                  type="number"
                  value={profile.price}
                  onChange={(e) => setProfile({...profile, price: parseFloat(e.target.value)})}
                  className="w-full px-4 py-3 bg-beige-50 dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Save className="h-4.5 w-4.5" />
              <span>Save Profile Changes</span>
            </button>
          </form>
        </div>

        {/* Clinical Prefs (Col-5) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Telehealth Configuration */}
          <form onSubmit={handleSystemSave} className="premium-card p-6 space-y-5">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-beige-100 dark:border-sage-800 pb-3">
              Telehealth Workspace
            </h3>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-950 dark:text-beige-200 uppercase">Default Session Duration</label>
                <select
                  value={systemConfigs.sessionLength}
                  onChange={(e) => setSystemConfigs({...systemConfigs, sessionLength: e.target.value})}
                  className="w-full px-3 py-2.5 bg-beige-50 dark:bg-sage-950 border border-beige-200 dark:border-sage-800 rounded-lg text-xs text-stone-750 dark:text-sage-300 focus:outline-none"
                >
                  <option value="30 Minutes">30 Minutes</option>
                  <option value="50 Minutes">50 Minutes (Standard)</option>
                  <option value="60 Minutes">60 Minutes</option>
                  <option value="90 Minutes">90 Minutes</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-950 dark:text-beige-200 uppercase">Video Stream Protocol</label>
                <select
                  value={systemConfigs.videoQuality}
                  onChange={(e) => setSystemConfigs({...systemConfigs, videoQuality: e.target.value})}
                  className="w-full px-3 py-2.5 bg-beige-50 dark:bg-sage-950 border border-beige-200 dark:border-sage-800 rounded-lg text-xs text-stone-750 dark:text-sage-300 focus:outline-none"
                >
                  <option value="Standard Quality (480p)">Standard (Low Bandwidth)</option>
                  <option value="High Quality (720p)">High Quality (720p)</option>
                  <option value="High Definition (1080p)">Full HD (1080p - HIPAA recommended)</option>
                </select>
              </div>

              <div className="space-y-2.5 pt-2 font-bold">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-950 dark:text-beige-100">
                  <input
                    type="checkbox"
                    checked={systemConfigs.notifyEmail}
                    onChange={(e) => setSystemConfigs({...systemConfigs, notifyEmail: e.target.checked})}
                    className="rounded border-beige-300 dark:border-sage-850 text-sage-600 focus:ring-sage-500"
                  />
                  <span>Email summaries of intake forms</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-950 dark:text-beige-100">
                  <input
                    type="checkbox"
                    checked={systemConfigs.notifySms}
                    onChange={(e) => setSystemConfigs({...systemConfigs, notifySms: e.target.checked})}
                    className="rounded border-beige-300 dark:border-sage-850 text-sage-600 focus:ring-sage-500"
                  />
                  <span>SMS alert notifications for queues</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-beige-100 hover:bg-beige-200 dark:bg-sage-800 dark:hover:bg-sage-700 text-stone-750 dark:text-white rounded-lg text-xs font-semibold transition-all"
            >
              Update Preferences
            </button>
          </form>

          {/* Security alerts */}
          <div className="p-4 bg-amber-50/50 dark:bg-amber-950/15 border border-amber-500/10 rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4" />
              <span>HIPAA Portal Regulations</span>
            </h4>
            <p className="text-[10px] text-slate-950 dark:text-beige-200 leading-normal font-bold">
              Automatic screen lockout occurs after 15 minutes of idle time. Auditing records trace all clinical note edits to guarantee medical records compliance under federal rules.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
